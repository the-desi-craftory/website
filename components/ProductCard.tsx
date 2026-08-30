"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import ProductModal from "./ProductModal";
import OrderForm from "./OrderForm";

const WA_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ProductCard({ product }: { product: Product }) {
  const [formOpen, setFormOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasDiscount = !!(product.originalPrice && product.originalPrice > product.discountedPrice);
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice! - product.discountedPrice) / product.originalPrice!) * 100)
    : 0;

  return (
    <>
      <div className="product-card" style={{
        backgroundColor: "#FFF9F5", borderRadius: "16px",
        overflow: "hidden", border: "1px solid #F2D9D0",
        display: "flex", flexDirection: "column",
      }}>
        {/* Image */}
        <div onClick={() => setModalOpen(true)} style={{
          position: "relative", height: "300px",
          backgroundColor: "#FAF7F2", cursor: "pointer", overflow: "hidden",
        }}>
          {!imgError && product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                objectPosition: "12px 0px", 
                transformOrigin: "top left", 
                transform: "scale(1.9)",
                transition: "transform 0.4s ease",
              }}
              onError={() => setImgError(true)}
              onMouseOver={(e) => {
                e.currentTarget.style.transformOrigin = "top left";
                e.currentTarget.style.transform = "scale(1.7)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transformOrigin = "top left";
                e.currentTarget.style.transform = "scale(1.9)"; 
              }}
              unoptimized
            />
          ) : (
            <div style={{
              width: "100%", height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "4rem", backgroundColor: "#F2D9D0",
            }}>🧶</div>
          )}

          {/* Category badge */}
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            backgroundColor: "rgba(250,247,242,0.92)", backdropFilter: "blur(4px)",
            padding: "4px 12px", borderRadius: "50px",
            fontSize: "0.7rem", fontWeight: 700, color: "#7A8F71",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>{product.category}</div>

          {/* Discount badge */}
          {hasDiscount && (
            <div style={{
              position: "absolute", top: "12px", right: "12px",
              backgroundColor: "#E05C5C", color: "#fff",
              padding: "4px 10px", borderRadius: "50px",
              fontSize: "0.72rem", fontWeight: 700,
            }}>{discountPct}% OFF</div>
          )}

          {/* Quick view */}
          <div className="quick-view-hint" style={{
            position: "absolute", bottom: "12px", right: "12px",
            backgroundColor: "rgba(61,53,48,0.7)", color: "#fff",
            padding: "4px 10px", borderRadius: "50px",
            fontSize: "0.7rem", opacity: 0, transition: "opacity 0.2s",
          }}>Quick view</div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <h3 onClick={() => setModalOpen(true)} style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1.05rem",
            fontWeight: 600, color: "#3D3530", cursor: "pointer", margin: 0,
          }}>{product.name}</h3>

          <p style={{
            fontSize: "0.83rem", color: "#8A7F7A", lineHeight: 1.6,
            margin: 0, flex: 1,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{product.description}</p>

          {/* Make time */}
          {product.makeTime && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              backgroundColor: "#F2F5F0", borderRadius: "50px",
              padding: "3px 10px", alignSelf: "flex-start", marginTop: "2px",
            }}>
              <span style={{ fontSize: "0.75rem" }}>🕐</span>
              <span style={{ fontSize: "0.73rem", color: "#7A8F71", fontWeight: 700 }}>
                Ready in {product.makeTime}
              </span>
            </div>
          )}

          {/* Price + Order */}
          <div style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem", fontWeight: 700, color: "#3D3530",
                }}>₹{product.discountedPrice.toLocaleString("en-IN")}</span>
                {hasDiscount && (
                  <span style={{ fontSize: "0.85rem", color: "#B0A5A0", textDecoration: "line-through" }}>
                    ₹{product.originalPrice!.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <button onClick={() => setFormOpen(true)}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  backgroundColor: "#25D366", color: "#fff",
                  padding: "8px 14px", borderRadius: "50px",
                  textDecoration: "none", fontSize: "0.78rem", fontWeight: 700,
                  transition: "background-color 0.2s, transform 0.1s", flexShrink: 0,
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#1db954"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#25D366"; e.currentTarget.style.transform = "scale(1)"; }}
              >{WA_SVG} Order</button>
            </div>
            {/* Price may vary note */}
            {product.orderFields && (
              <p style={{ fontSize: "0.7rem", color: "#A8A09A", margin: "5px 0 0", fontStyle: "italic" }}>
                * Price may vary based on requirements
              </p>
            )}
          </div>
        </div>
      </div>

      {formOpen && <OrderForm product={product} onClose={() => setFormOpen(false)} />}
      {modalOpen && <ProductModal product={product} onClose={() => setModalOpen(false)} />}
      <style>{`.product-card:hover .quick-view-hint { opacity: 1 !important; }`}</style>
    </>
  );
}