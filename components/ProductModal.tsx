"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Product } from "@/lib/types";
import OrderForm from "./OrderForm";

const WA_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const hasDiscount = !!(product.originalPrice && product.originalPrice > product.discountedPrice);
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice! - product.discountedPrice) / product.originalPrice!) * 100)
    : 0;
  const savings = hasDiscount ? product.originalPrice! - product.discountedPrice : 0;

  const fieldList = product.orderFields
    ? product.orderFields.split(",").map((f) => f.trim()).filter(Boolean)
    : [];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} style={{
        position: "fixed", inset: 0, backgroundColor: "rgba(61,53,48,0.72)",
        backdropFilter: "blur(4px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}>
        <div onClick={(e) => e.stopPropagation()} className="modal-grid" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" style={{
          backgroundColor: "#F8F1EA", borderRadius: "20px", overflow: "hidden",
          maxWidth: "700px", width: "100%", maxHeight: "92vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(61,53,48,0.3)",
          display: "grid", gridTemplateColumns: "1fr 1fr",
        }}>
          <div className="modal-mobile-header">
            <button type="button" onClick={onClose} aria-label="Go back from product details">← Back</button>
            <button type="button" onClick={onClose} aria-label="Close product details">✕</button>
          </div>
          {/* Image side */}
          <div className="modal-image" style={{
            display: "flex", flexDirection: "column",
            backgroundColor: "#FCF9F5",
          }}>
            {/* Image */}
            <div className="modal-image-frame" style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              flexShrink: 0,
            }}>
              {!imgError && product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill
                  style={{ objectFit: "cover" }} onError={() => setImgError(true)} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: "#5B6042", backgroundColor: "#E7C3B5" }}>Image unavailable</div>
              )}
              {hasDiscount && (
                <div className="product-card-discount-badge product-card-discount-badge--modal" style={{
                  position: "absolute", top: "14px", left: "14px",
                  backgroundColor: "#B86B4B", color: "#fff",
                  padding: "5px 12px", borderRadius: "6px",
                  fontSize: "0.78rem", fontWeight: 700,
                }}>{discountPct}% OFF</div>
              )}
            </div>

            {/* View more — below the image */}
            <button
              onClick={() => {
                const catParam = encodeURIComponent(product.category);
                const onProductsPage = window.location.pathname.includes("/products");
                if (onProductsPage) {
                  window.history.pushState({}, "", window.location.pathname + `?category=${catParam}`);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                  onClose();
                } else {
                  window.location.href = `${window.location.origin}/website/products/?category=${catParam}`;
                }
              }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                padding: "12px 16px", width: "100%",
                backgroundColor: "#FCF9F5",
                borderTop: "1px solid #E7C3B5", borderLeft: "none", borderRight: "none", borderBottom: "none",
                fontSize: "0.78rem", fontWeight: 700,
                color: "#5B6042", letterSpacing: "0.03em",
                cursor: "pointer", transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E7C3B5")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FCF9F5")}
            >
              View more {product.category} →
            </button>
          </div>

          {/* Details side */}
          <div className="modal-details" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="modal-details-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <button
                type="button"
                onClick={onClose}
                aria-label="Go back from product details"
                title="Go back"
                style={{
                  background: "transparent", border: "none", padding: "8px 0",
                  color: "#5B6042", cursor: "pointer", fontSize: "0.78rem",
                  fontWeight: 700, letterSpacing: "0.03em",
                }}
              >
                ← Back
              </button>
              <button onClick={onClose} aria-label="Close product details" title="Close product details" style={{
                background: "#FCF9F5", border: "1px solid #E7C3B5",
                borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer",
                fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#746B65",
              }}>✕</button>
            </div>

            {/* Category + ID */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{
                backgroundColor: "#E7C3B5", color: "#5B6042",
                padding: "3px 12px", borderRadius: "6px",
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>{product.category}</span>
              <span style={{ fontSize: "0.7rem", color: "#8F8780" }}>#{product.id}</span>
            </div>

            <h2 id="product-modal-title" style={{
              fontFamily: "'Playfair Display', serif", fontSize: "1.45rem",
              color: "#3F352D", margin: 0, lineHeight: 1.3,
            }}>{product.name}</h2>

            <details className="product-description product-modal-description">
              <summary>Read description</summary>
              <p>{product.description}</p>
            </details>

            {/* Make time */}
            {product.makeTime && (
              <div className="modal-make-time" style={{
                display: "flex", alignItems: "center", gap: "8px",
                backgroundColor: "#E8E9C9", borderRadius: "10px", padding: "10px 14px",
              }}>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#5B6042", textTransform: "uppercase", letterSpacing: "0.06em" }}>Estimated Make Time</div>
                  <div style={{ fontSize: "0.88rem", color: "#3F352D", fontWeight: 600 }}>{product.makeTime}</div>
                </div>
              </div>
            )}

            {/* Order fields info */}
            {fieldList.length > 0 && (
              <div className="modal-order-fields" style={{
                backgroundColor: "#F4E7D7", borderRadius: "10px", padding: "10px 14px",
                border: "1px solid #D9B27F",
              }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#80582B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                  We&apos;ll ask you for
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {fieldList.map((f) => (
                    <span key={f} style={{
                      backgroundColor: "#F8F1EA", border: "1px solid #D9B27F",
                      borderRadius: "6px", padding: "2px 10px",
                      fontSize: "0.75rem", color: "#80582B",
                    }}>{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Price block */}
            <div style={{ borderTop: "1px solid #E7C3B5", paddingTop: "12px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "4px" }}>
                <span style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "1.9rem", fontWeight: 800, letterSpacing: "0.01em",
                  fontVariantNumeric: "tabular-nums", color: "#3F352D",
                }}>₹{product.discountedPrice.toLocaleString("en-IN")}</span>
                {hasDiscount && (
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", color: "#8F8780", textDecoration: "line-through", fontVariantNumeric: "tabular-nums" }}>
                    ₹{product.originalPrice!.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  backgroundColor: "#F4DDE2", borderRadius: "8px",
                  padding: "4px 10px", marginBottom: "6px",
                }}>
                  <span style={{ fontSize: "0.78rem", color: "#8A4F5A", fontWeight: 700 }}>
                    You save ₹{savings.toLocaleString("en-IN")} ({discountPct}% off)
                  </span>
                </div>
              )}
            </div>

            {/* WhatsApp CTA */}
            <button onClick={() => setFormOpen(true)} className="product-modal-cta" aria-label={`Order ${product.name} now`}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                backgroundColor: "#1F6040", color: "#fff",
                padding: "13px", borderRadius: "12px",
                fontWeight: 700, fontSize: "0.92rem",
                transition: "background-color 0.2s", border: "none", cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#174A31")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1F6040")}
            >{WA_SVG} Order now</button>

            <p className="product-modal-price-note">
              100% handmade · Final price confirmed before payment
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 600px) { 
            .modal-overlay {
              padding: 20px 16px !important;
              align-items: center !important;
              justify-content: center !important;
              overflow-y: auto;
            }
            .modal-grid { 
              grid-template-columns: 1fr !important; 
              width: 100% !important;
              max-width: 360px !important;
              height: min(calc(100dvh - 40px), 720px) !important;
              max-height: calc(100dvh - 40px) !important;
              aspect-ratio: 4 / 8 !important;
              overflow-y: auto !important;
              overflow-x: hidden !important;
              min-width: 0 !important;
              min-height: 0 !important;
              border-radius: 16px !important;
            } 
            .modal-image {
              width: 100% !important;
              min-width: 0 !important;
            }
            .modal-mobile-header {
              display: flex !important;
              align-items: center;
              justify-content: space-between;
              padding: 8px 14px;
              background: #F8F1EA;
              border-bottom: 1px solid #E7C3B5;
            }
            .modal-mobile-header button {
              background: transparent;
              border: 0;
              padding: 6px 0;
              color: #5B6042;
              font-size: 0.68rem;
              font-weight: 700;
            }
            .modal-mobile-header button:last-child {
              font-size: 0.82rem;
              padding: 4px 8px;
            }
            .modal-image-frame {
              height: auto !important;
              aspect-ratio: 4 / 5 !important;
            }
            .modal-grid > * {
              min-width: 0 !important;
              max-width: 100% !important;
            }
            .modal-details {
              padding: 14px 18px 16px !important;
              gap: 6px !important;
            }
            .modal-details h2 { font-size: 0.8rem !important; }
            .modal-details .product-description { font-size: 0.58rem !important; }
            .modal-details > div:first-child button { font-size: 0.55rem !important; }
            .modal-details > div:first-child button:last-child {
              width: 28px !important;
              height: 28px !important;
              font-size: 0.66rem !important;
            }
            .modal-make-time,
            .modal-order-fields {
              padding: 8px 10px !important;
            }
            .modal-make-time div,
            .modal-order-fields div {
              font-size: 0.46rem !important;
            }
            .modal-make-time div div,
            .modal-order-fields span {
              font-size: 0.58rem !important;
            }
            .modal-details .product-modal-cta {
              padding: 10px !important;
              font-size: 0.62rem !important;
            }
            .modal-details > div:first-child { margin-bottom: 2px; }
            .modal-details-header { display: none !important; }
            .modal-details > div { max-width: 100%; }
            .product-modal-cta {
              position: sticky;
              bottom: 10px;
              margin-bottom: 8px;
              box-shadow: 0 -8px 18px rgba(61,53,48,0.08);
              z-index: 2;
            }
          }
          .modal-mobile-header { display: none; }
        `}</style>
      </div>
      {formOpen && <OrderForm product={product} onClose={() => setFormOpen(false)} />}
    </>,
    document.body,
  );
}