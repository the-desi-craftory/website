"use client";
import { useState } from "react";
import { Product } from "@/lib/types";
import { BUSINESS_CONFIG } from "@/lib/config";

export default function OrderForm({ product, onClose }: { product: Product; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "", payment: "", address: "", special: ""
  });

  const fieldList = product.orderFields
    ? product.orderFields.split(",").map(f => f.trim()).filter(Boolean)
    : [];

  const [customFields, setCustomFields] = useState<Record<string, string>>(
    Object.fromEntries(fieldList.map(f => [f, ""]))
  );

  function buildUrl() {
    const customSection = fieldList.length
      ? "\n" + fieldList.map(f => `${f}: ${customFields[f] || "—"}`).join("\n")
      : "";

    const hasDiscount = !!(product.originalPrice && product.originalPrice > product.discountedPrice);
    const priceLine = hasDiscount
      ? `Price: ₹${product.discountedPrice} (base variant — was ₹${product.originalPrice})`
      : `Price: ₹${product.discountedPrice} (base variant)`;

    const imageLine = product.imageUrl ? `\nProduct Photo: ${product.imageUrl}` : "";

    const msg =
      `Hi! I would like to order:\n\n` +
      `Product: ${product.name} (${product.id})\n` +
      `${priceLine}\n${imageLine}\n` +
      `${customSection}\n\n` +
      `Full Name: ${form.name}\n` +
      `Payment Method: ${form.payment}\n\n` +
      `Shipping Address: ${form.address}\n` +
      `Special Request: ${form.special || "None"}\n\n` +
      `Note: Shipping cost will be borne by the customer. Final price and delivery date may vary based on custom requirements.`;

    return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  const customFieldsValid = fieldList.every(f => customFields[f]?.trim());
  const valid = !!(form.name.trim() && form.payment.trim() && form.address.trim() && customFieldsValid);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(61,53,48,0.72)",
      backdropFilter: "blur(4px)", zIndex: 1100,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        backgroundColor: "#FFF9F5", borderRadius: "20px", padding: "32px",
        maxWidth: "480px", width: "100%", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 64px rgba(61,53,48,0.3)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#3D3530", margin: 0 }}>
            Order Details
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#8A7F7A" }}>✕</button>
        </div>

        {/* Product summary */}
        <div style={{ backgroundColor: "#FAF7F2", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", border: "1px solid #F2D9D0" }}>
          <div style={{ fontWeight: 700, color: "#3D3530", fontSize: "0.9rem" }}>{product.name}</div>
          <div style={{ color: "#7A8F71", fontSize: "0.85rem", marginTop: "2px" }}>
            ₹{product.discountedPrice.toLocaleString("en-IN")} · base variant
          </div>
        </div>

        {/* Shipping notice */}
        <div style={{ backgroundColor: "#FFF3E0", border: "1px solid #FFD9A0", borderRadius: "10px", padding: "10px 14px", marginBottom: "20px", fontSize: "0.8rem", color: "#8A6A30" }}>
          📦 <strong>Shipping cost is borne by the customer</strong> and will be calculated based on your location.
        </div>

        {/* Product-specific fields */}
        {fieldList.map(f => (
          <div key={f} style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>{f} *</label>
            <input
              value={customFields[f]}
              onChange={e => setCustomFields(prev => ({ ...prev, [f]: e.target.value }))}
              placeholder={`Enter ${f.toLowerCase()}`}
              style={inputStyle}
            />
          </div>
        ))}

        {/* Standard fields */}
        {[
          { key: "name", label: "Full Name", placeholder: "Your full name", required: true },
          { key: "payment", label: "Preferred Payment Method", placeholder: "e.g. UPI, Bank Transfer, Cash on Delivery", required: true },
          { key: "address", label: "Shipping Address", placeholder: "Full address with pincode", required: true },
          { key: "special", label: "Special Request", placeholder: "Any special instructions (optional)", required: false },
        ].map(({ key, label, placeholder, required }) => (
          <div key={key} style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>{label} {required && "*"}</label>
            {key === "address" || key === "special" ? (
              <textarea
                value={form[key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            ) : (
              <input
                value={form[key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={placeholder}
                style={inputStyle}
              />
            )}
          </div>
        ))}

        <p style={{ fontSize: "0.72rem", color: "#A8A09A", margin: "0 0 16px", fontStyle: "italic" }}>
          * Required fields. Final price may vary based on your requirements.
        </p>

        <a
          href={valid ? buildUrl() : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => { if (!valid) e.preventDefault(); }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            backgroundColor: valid ? "#25D366" : "#A8C5A0",
            color: "#fff", padding: "14px", borderRadius: "12px",
            textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
            cursor: valid ? "pointer" : "not-allowed", transition: "background-color 0.2s",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {valid ? "Proceed to WhatsApp" : "Fill required fields to continue"}
        </a>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.78rem", fontWeight: 700,
  color: "#3D3530", marginBottom: "5px", letterSpacing: "0.02em",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: "10px",
  border: "1px solid #E8C4B8", backgroundColor: "#FAF7F2",
  fontSize: "0.88rem", color: "#3D3530", outline: "none",
  boxSizing: "border-box", fontFamily: "inherit",
};