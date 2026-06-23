"use client";

import { useEffect, useState } from "react";
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

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, backgroundColor: "rgba(61,53,48,0.72)",
        backdropFilter: "blur(4px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}>
        <div onClick={(e) => e.stopPropagation()} className="modal-grid" style={{
          backgroundColor: "#FFF9F5", borderRadius: "20px", overflow: "hidden",
          maxWidth: "700px", width: "100%", maxHeight: "92vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(61,53,48,0.3)",
          display: "grid", gridTemplateColumns: "1fr 1fr",
        }}>
          {/* Image side */}
          <div style={{
            display: "flex", flexDirection: "column",
            backgroundColor: "#FAF7F2",
          }}>
            {/* Image */}
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              flexShrink: 0,
            }}>
              {!imgError && product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill
                  style={{ objectFit: "cover" }} onError={() => setImgError(true)} unoptimized />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", backgroundColor: "#F2D9D0" }}>🧶</div>
              )}
              {hasDiscount && (
                <div style={{
                  position: "absolute", top: "14px", left: "14px",
                  backgroundColor: "#E05C5C", color: "#fff",
                  padding: "5px 12px", borderRadius: "50px",
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
                  window.location.href = window.location.origin + (window.location.pathname.split("/products")[0]) + `/products/?category=${catParam}`;
                }
              }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                padding: "12px 16px", width: "100%",
                backgroundColor: "#FAF7F2",
                borderTop: "1px solid #F2D9D0", borderLeft: "none", borderRight: "none", borderBottom: "none",
                fontSize: "0.78rem", fontWeight: 700,
                color: "#7A8F71", letterSpacing: "0.03em",
                cursor: "pointer", transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#F2D9D0")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FAF7F2")}
            >
              <span>🔍</span>
              View more {product.category} →
            </button>
          </div>

          {/* Details side */}
          <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <button onClick={onClose} style={{
              alignSelf: "flex-end", background: "#FAF7F2", border: "1px solid #F2D9D0",
              borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer",
              fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A7F7A",
            }}>✕</button>

            {/* Category + ID */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{
                backgroundColor: "#F2D9D0", color: "#7A8F71",
                padding: "3px 12px", borderRadius: "50px",
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>{product.category}</span>
              <span style={{ fontSize: "0.7rem", color: "#B0A5A0" }}>#{product.id}</span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "1.45rem",
              color: "#3D3530", margin: 0, lineHeight: 1.3,
            }}>{product.name}</h2>

            <p style={{ fontSize: "0.88rem", color: "#8A7F7A", lineHeight: 1.75, margin: 0 }}>
              {product.description}
            </p>

            {/* Make time */}
            {product.makeTime && (
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                backgroundColor: "#F2F5F0", borderRadius: "10px", padding: "10px 14px",
              }}>
                <span style={{ fontSize: "1.1rem" }}>🕐</span>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#7A8F71", textTransform: "uppercase", letterSpacing: "0.06em" }}>Estimated Make Time</div>
                  <div style={{ fontSize: "0.88rem", color: "#3D3530", fontWeight: 600 }}>{product.makeTime}</div>
                </div>
              </div>
            )}

            {/* Order fields info */}
            {fieldList.length > 0 && (
              <div style={{
                backgroundColor: "#FFF3E0", borderRadius: "10px", padding: "10px 14px",
                border: "1px solid #FFD9A0",
              }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#B07D2A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                  📋 We&apos;ll ask you for
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {fieldList.map((f) => (
                    <span key={f} style={{
                      backgroundColor: "#FFF9F5", border: "1px solid #FFD9A0",
                      borderRadius: "50px", padding: "2px 10px",
                      fontSize: "0.75rem", color: "#8A6A30",
                    }}>{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Price block */}
            <div style={{ borderTop: "1px solid #F2D9D0", paddingTop: "12px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "4px" }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.9rem", fontWeight: 700, color: "#3D3530",
                }}>₹{product.discountedPrice.toLocaleString("en-IN")}</span>
                {hasDiscount && (
                  <span style={{ fontSize: "1rem", color: "#B0A5A0", textDecoration: "line-through" }}>
                    ₹{product.originalPrice!.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  backgroundColor: "#FDE8E8", borderRadius: "8px",
                  padding: "4px 10px", marginBottom: "6px",
                }}>
                  <span style={{ fontSize: "0.78rem", color: "#C0392B", fontWeight: 700 }}>
                    🎉 You save ₹{savings.toLocaleString("en-IN")} ({discountPct}% off)
                  </span>
                </div>
              )}
              <p style={{ fontSize: "0.72rem", color: "#A8A09A", margin: "4px 0 0", fontStyle: "italic" }}>
                * Starting price for base variant. Final price may vary based on your requirements.
              </p>
            </div>

            {/* WhatsApp CTA */}
            <button onClick={() => setFormOpen(true)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                backgroundColor: "#25D366", color: "#fff",
                padding: "13px", borderRadius: "12px",
                fontWeight: 700, fontSize: "0.92rem",
                transition: "background-color 0.2s", border: "none", cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1db954")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
            >{WA_SVG} Order on WhatsApp</button>

            <p style={{ fontSize: "0.72rem", color: "#A8A09A", textAlign: "center", margin: 0 }}>
              🤲 100% handmade · Press Esc to close
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 600px) { 
            .modal-grid { 
              grid-template-columns: 1fr !important; 
              max-height: 92vh !important;
              overflow-y: auto !important;
            } 
          }
        `}</style>
      </div>
      {formOpen && <OrderForm product={product} onClose={() => setFormOpen(false)} />}
    </>
  );
}