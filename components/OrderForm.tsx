"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { BUSINESS_CONFIG } from "@/lib/config";

type FormState = {
  name: string;
  phone: string;
  payment: string;
  address: string;
  pincode: string;
  special: string;
  quantity: number;
  customFields: Record<string, string>;
};

const paymentOptions = [
  { value: "UPI", label: "UPI", help: "Fast and simple" },
  { value: "Bank transfer", label: "Bank transfer", help: "We will share details" },
  { value: "Cash on delivery", label: "Cash on delivery", help: "If available for your location" },
  { value: "Need help choosing", label: "I need help choosing", help: "We will guide you on WhatsApp" },
];

function getFieldList(product: Product): string[] {
  return product.orderFields
    ? product.orderFields.split(",").map((field) => field.trim()).filter(Boolean)
    : [];
}

export default function OrderForm({ product, onClose }: { product: Product; onClose: () => void }) {
  const fieldList = useMemo(() => getFieldList(product), [product]);
  const storageKey = `checkout-draft:${product.id}`;
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(() => {
    const emptyForm: FormState = {
      name: "",
      phone: "",
      payment: "",
      address: "",
      pincode: "",
      special: "",
      quantity: 1,
      customFields: Object.fromEntries(fieldList.map((field) => [field, ""])),
    };

    if (typeof window === "undefined") return emptyForm;

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return emptyForm;
      const parsed = JSON.parse(saved) as Partial<FormState>;
      return {
        ...emptyForm,
        ...parsed,
        quantity: Math.max(1, Number(parsed.quantity) || 1),
        customFields: { ...emptyForm.customFields, ...(parsed.customFields || {}) },
      };
    } catch {
      return emptyForm;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(form));
    } catch {
      // Draft recovery is an enhancement, not a requirement for checkout.
    }
  }, [form, storageKey]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const customFieldsValid = fieldList.every((field) => form.customFields[field]?.trim());
  const phoneDigits = form.phone.replace(/\D/g, "");
  const stepOneValid = Boolean(
    form.name.trim() &&
    phoneDigits.length >= 10 &&
    form.address.trim() &&
    /^\d{6}$/.test(form.pincode) &&
    customFieldsValid,
  );
  const valid = stepOneValid && Boolean(form.payment);
  const subtotal = product.discountedPrice * form.quantity;
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.discountedPrice);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function buildUrl() {
    const customSection = fieldList.length
      ? `\nCustomisation:\n${fieldList.map((field) => `${field}: ${form.customFields[field] || "—"}`).join("\n")}`
      : "";
    const priceLine = hasDiscount
      ? `Item price: ₹${product.discountedPrice.toLocaleString("en-IN")} each (was ₹${product.originalPrice!.toLocaleString("en-IN")})`
      : `Item price: ₹${product.discountedPrice.toLocaleString("en-IN")} each`;
    const imageLine = product.imageUrl ? `\nProduct Photo: ${product.imageUrl}` : "";
    const message =
      `Hi! I would like to order:\n\n` +
      `Product: ${product.name} (${product.id})\n` +
      `Quantity: ${form.quantity}\n` +
      `${priceLine}\n` +
      `Subtotal: ₹${subtotal.toLocaleString("en-IN")}${imageLine}\n` +
      `${customSection}\n\n` +
      `Full Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Payment preference: ${form.payment}\n` +
      `Shipping Address: ${form.address}\n` +
      `Pincode: ${form.pincode}\n` +
      `Special Request: ${form.special || "None"}\n\n` +
      `Please confirm the final price, shipping cost, and delivery date before payment.`;
    return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function finishCheckout() {
    setSubmitted(true);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // The WhatsApp handoff does not depend on localStorage.
    }
  }

  return (
    <div
      onClick={onClose}
      role="presentation"
      className="checkout-overlay"
      style={{
        position: "fixed", inset: 0, backgroundColor: "rgba(61,53,48,0.72)",
        backdropFilter: "blur(4px)", zIndex: 1100, display: "flex",
        alignItems: "center", justifyContent: "center", padding: "12px",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-form-title"
        className="checkout-dialog"
        style={{
          backgroundColor: "#F8F1EA", borderRadius: "20px", padding: "clamp(20px, 5vw, 32px)",
          maxWidth: "520px", width: "100%", maxHeight: "94vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(61,53,48,0.3)", position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "18px" }}>
          <div>
            <p style={{ color: "#5B6042", fontSize: "0.75rem", fontWeight: 700, margin: "0 0 6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {submitted ? "Order message ready" : `Step ${step} of 2`}
            </p>
            <h2 id="order-form-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.45rem", color: "#3F352D", margin: 0 }}>
              {submitted ? "Almost done!" : "Order this handmade piece"}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close order form" title="Close order form" style={closeButtonStyle}>✕</button>
        </div>
        {!submitted && (
          <div className="checkout-progress" aria-label={`Step ${step} of 2`}>
            <span style={{ width: step === 1 ? "50%" : "100%" }} />
          </div>
        )}

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 4px 8px" }}>
            <p style={{ color: "#3F352D", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 20px" }}>
              Your order details are ready in WhatsApp. Tap <strong>Send</strong> there to submit your request.
            </p>
            <p style={{ color: "#746B65", fontSize: "0.85rem", lineHeight: 1.6, margin: "0 0 24px" }}>
              We will confirm the final price, shipping cost, and delivery date before asking for payment.
            </p>
            <button onClick={onClose} style={{ ...primaryButtonStyle, backgroundColor: "#3F352D" }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ backgroundColor: "#FCF9F5", borderRadius: "12px", padding: "12px 16px", marginBottom: "18px", border: "1px solid #E7C3B5" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#3F352D", fontSize: "0.95rem" }}>{product.name}</div>
                  <div style={{ color: "#5B6042", fontSize: "0.85rem", marginTop: "3px" }}>
                    ₹{product.discountedPrice.toLocaleString("en-IN")} each · subtotal ₹{subtotal.toLocaleString("en-IN")}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #C98F7D", borderRadius: "10px", padding: "4px 8px", backgroundColor: "#F8F1EA" }}>
                  <button type="button" onClick={() => updateField("quantity", Math.max(1, form.quantity - 1))} aria-label="Decrease quantity" style={quantityButtonStyle}>−</button>
                  <strong aria-label={`Quantity ${form.quantity}`}>{form.quantity}</strong>
                  <button type="button" onClick={() => updateField("quantity", Math.min(20, form.quantity + 1))} aria-label="Increase quantity" style={quantityButtonStyle}>+</button>
                </div>
              </div>
            </div>

            {step === 1 ? (
              <>
                {fieldList.map((field) => (
                  <div key={field} style={fieldWrapperStyle}>
                    <label htmlFor={`custom-${field}`} style={labelStyle}>{field} *</label>
                    <input id={`custom-${field}`} value={form.customFields[field] || ""} onChange={(event) => setForm((current) => ({ ...current, customFields: { ...current.customFields, [field]: event.target.value } }))} placeholder={`Enter ${field.toLowerCase()}`} style={inputStyle} />
                  </div>
                ))}
                <div style={fieldWrapperStyle}>
                  <label htmlFor="order-name" style={labelStyle}>Your name *</label>
                  <input id="order-name" value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="e.g. Priya Sharma" style={inputStyle} />
                </div>
                <div style={fieldWrapperStyle}>
                  <label htmlFor="order-phone" style={labelStyle}>WhatsApp phone number *</label>
                  <input id="order-phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" style={inputStyle} />
                  <p style={helperStyle}>We use this only to contact you about this order.</p>
                </div>
                <div style={fieldWrapperStyle}>
                  <label htmlFor="order-address" style={labelStyle}>Delivery address *</label>
                  <textarea id="order-address" value={form.address} onChange={(event) => updateField("address", event.target.value)} autoComplete="street-address" placeholder="House number, street, area, city" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <div style={fieldWrapperStyle}>
                  <label htmlFor="order-pincode" style={labelStyle}>Pincode *</label>
                  <input id="order-pincode" value={form.pincode} onChange={(event) => updateField("pincode", event.target.value.replace(/\D/g, "").slice(0, 6))} type="text" inputMode="numeric" autoComplete="postal-code" placeholder="6-digit pincode" style={inputStyle} />
                </div>
                <button type="button" className="checkout-submit" onClick={() => setStep(2)} disabled={!stepOneValid} style={{ ...primaryButtonStyle, opacity: stepOneValid ? 1 : 0.55 }}>
                  Continue to review
                </button>
                {!stepOneValid && <p style={validationStyle}>Please complete your name, phone, address, pincode, and any product options.</p>}
              </>
            ) : (
              <>
                <div style={{ backgroundColor: "#E8E9C9", borderRadius: "12px", padding: "14px 16px", marginBottom: "18px" }}>
                  <strong style={{ color: "#3F352D", fontSize: "0.9rem" }}>Review your details</strong>
                  <p style={summaryTextStyle}>{form.name} · {form.phone}</p>
                  <p style={summaryTextStyle}>{form.address}, {form.pincode}</p>
                  <button type="button" onClick={() => setStep(1)} style={editButtonStyle}>Edit details</button>
                </div>
                <fieldset style={{ border: 0, padding: 0, margin: "0 0 16px" }}>
                  <legend style={labelStyle}>How would you prefer to pay? *</legend>
                  <div style={{ display: "grid", gap: "8px" }}>
                    {paymentOptions.map((option) => (
                      <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "10px", border: form.payment === option.value ? "2px solid #5B6042" : "1px solid #C98F7D", backgroundColor: form.payment === option.value ? "#E8E9C9" : "#FCF9F5", borderRadius: "10px", padding: "11px 12px", cursor: "pointer" }}>
                        <input type="radio" name="payment" value={option.value} checked={form.payment === option.value} onChange={(event) => updateField("payment", event.target.value)} />
                        <span><strong style={{ display: "block", color: "#3F352D", fontSize: "0.88rem" }}>{option.label}</strong><small style={{ color: "#746B65" }}>{option.help}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div style={fieldWrapperStyle}>
                  <label htmlFor="order-special" style={labelStyle}>Add a note <span style={{ fontWeight: 400, color: "#746B65" }}>(optional)</span></label>
                  <textarea id="order-special" value={form.special} onChange={(event) => updateField("special", event.target.value)} placeholder="Any gift message or special request" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <div style={{ backgroundColor: "#F4E7D7", border: "1px solid #D9B27F", borderRadius: "10px", padding: "11px 13px", marginBottom: "16px", fontSize: "0.8rem", color: "#80582B", lineHeight: 1.5 }}>
                  Shipping is calculated separately from your pincode. We will confirm the exact total before payment.
                </div>
                <a className="checkout-submit" href={valid ? buildUrl() : undefined} target="_blank" rel="noopener noreferrer" onClick={(event) => { if (!valid) event.preventDefault(); else finishCheckout(); }} style={{ ...primaryButtonStyle, display: "flex", textDecoration: "none", backgroundColor: valid ? "#1F6040" : "#B4B86F", cursor: valid ? "pointer" : "not-allowed" }}>
                  Review order in WhatsApp
                </a>
                <p style={{ ...helperStyle, textAlign: "center", marginTop: "10px" }}>Your message will be prepared. Tap Send in WhatsApp to submit your order.</p>
              </>
            )}
          </>
        )}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .checkout-overlay {
            padding: 20px 16px !important;
            align-items: center !important;
            justify-content: center !important;
            overflow-y: auto !important;
          }
          .checkout-dialog {
            width: 100% !important;
            max-width: 360px !important;
            height: min(calc(100dvh - 40px), 720px) !important;
            max-height: calc(100dvh - 40px) !important;
            aspect-ratio: 4 / 8 !important;
            border-radius: 16px !important;
            padding: 14px 18px 16px !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            min-width: 0 !important;
            min-height: 0 !important;
          }
          .checkout-dialog > div:first-child {
            gap: 10px !important;
            margin-bottom: 10px !important;
          }
          .checkout-dialog > div:first-child > button {
            width: 28px !important;
            height: 28px !important;
            font-size: 0.66rem !important;
          }
          .checkout-dialog h2 {
            font-size: 0.8rem !important;
            line-height: 1.3 !important;
          }
          .checkout-dialog > div:first-child p {
            font-size: 0.55rem !important;
            margin-bottom: 4px !important;
          }
          .checkout-dialog .checkout-progress {
            height: 4px !important;
            margin-bottom: 12px !important;
          }
          .checkout-dialog label,
          .checkout-dialog legend {
            font-size: 0.72rem !important;
            margin-bottom: 4px !important;
          }
          .checkout-dialog input,
          .checkout-dialog textarea {
            padding: 10px 12px !important;
            border-radius: 8px !important;
          }
          .checkout-dialog textarea {
            min-height: 56px;
          }
          .checkout-dialog small,
          .checkout-dialog p {
            font-size: 0.68rem !important;
            line-height: 1.45 !important;
          }
          .checkout-dialog strong {
            font-size: 0.78rem;
          }
          .checkout-dialog > div:nth-of-type(3) {
            padding: 10px 12px !important;
            margin-bottom: 12px !important;
            border-radius: 10px !important;
          }
          .checkout-dialog > div:nth-of-type(3) > div > div:first-child div:first-child {
            font-size: 0.78rem !important;
          }
          .checkout-dialog > div:nth-of-type(3) > div > div:first-child div:last-child {
            font-size: 0.68rem !important;
          }
          .checkout-dialog > div:nth-of-type(3) button {
            width: 28px !important;
            height: 28px !important;
            font-size: 1rem !important;
          }
          .checkout-dialog fieldset label {
            padding: 9px 10px !important;
            gap: 8px !important;
          }
          .checkout-dialog fieldset label strong {
            font-size: 0.72rem !important;
          }
          .checkout-dialog fieldset label small {
            font-size: 0.62rem !important;
          }
          .checkout-dialog .checkout-submit {
            min-height: 42px !important;
            padding: 10px !important;
            border-radius: 10px !important;
            font-size: 0.72rem !important;
          }
          .checkout-dialog > div[style*="text-align: center"] {
            padding-top: 14px !important;
          }
          .checkout-dialog > div[style*="text-align: center"] button {
            min-height: 42px !important;
            font-size: 0.72rem !important;
          }
          .checkout-submit {
            position: sticky;
            bottom: 10px;
            z-index: 2;
            margin-bottom: 8px;
            box-shadow: 0 -8px 18px rgba(61,53,48,0.08);
          }
        }
      `}</style>
    </div>
  );
}

const fieldWrapperStyle: React.CSSProperties = { marginBottom: "14px" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#3F352D", marginBottom: "6px" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "13px 14px", borderRadius: "10px", border: "1px solid #C98F7D", backgroundColor: "#FCF9F5", fontSize: "16px", color: "#3F352D", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const helperStyle: React.CSSProperties = { fontSize: "0.75rem", color: "#746B65", lineHeight: 1.5, margin: "5px 0 0" };
const validationStyle: React.CSSProperties = { color: "#9B4A3C", fontSize: "0.78rem", lineHeight: 1.4, margin: "8px 0 0", textAlign: "center" };
const summaryTextStyle: React.CSSProperties = { color: "#4F4D32", fontSize: "0.82rem", lineHeight: 1.5, margin: "5px 0 0" };
const primaryButtonStyle: React.CSSProperties = { width: "100%", minHeight: "48px", alignItems: "center", justifyContent: "center", border: 0, borderRadius: "12px", backgroundColor: "#3F352D", color: "#F8F1EA", padding: "13px 16px", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "inherit" };
const closeButtonStyle: React.CSSProperties = { width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #C98F7D", backgroundColor: "#FCF9F5", color: "#746B65", cursor: "pointer", fontSize: "1rem" };
const quantityButtonStyle: React.CSSProperties = { width: "32px", height: "32px", border: 0, background: "transparent", color: "#3F352D", fontSize: "1.2rem", cursor: "pointer" };
const editButtonStyle: React.CSSProperties = { border: 0, padding: 0, background: "transparent", color: "#5B6042", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", marginTop: "8px" };
