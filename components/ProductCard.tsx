"use client";

import { useEffect, useState } from "react";
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

  function openProductModal() {
    window.history.pushState(
      { ...window.history.state, productModalOpen: true },
      "",
      window.location.href
    );
    setModalOpen(true);
  }

  function closeProductModal() {
    if (window.history.state?.productModalOpen) {
      window.history.back();
      return;
    }
    setModalOpen(false);
  }

  useEffect(() => {
    if (!modalOpen) return;

    const onPopState = () => setModalOpen(false);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [modalOpen]);

  return (
    <>
      <div
        className="product-card"
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("button, a, input, select, textarea, [role='button']")) return;
          openProductModal();
        }}
        style={{
        backgroundColor: "#F8F1EA", borderRadius: "16px",
        overflow: "hidden", border: "1px solid #E7C3B5",
        display: "flex", flexDirection: "column",
      }}>
        <div className="product-card-category-wrap">
          <div className="product-card-category-badge">{product.category}</div>
        </div>
        {/* Image */}
        <div
          className="product-card-image"
          onClick={openProductModal}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openProductModal();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`View details for ${product.name}`}
          style={{
          position: "relative", aspectRatio: "4 / 5", height: "auto",
          backgroundColor: "#FCF9F5", cursor: "pointer", overflow: "hidden",
        }}>
          {!imgError && product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                objectPosition: "top left",
                transformOrigin: "top left",
                transform: "scale(2)",
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{
              width: "100%", height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "4rem", backgroundColor: "#E7C3B5",
            }}>Image unavailable</div>
          )}

          {/* Discount badge */}
          {hasDiscount && (
            <div className="product-card-discount-badge product-card-discount-badge--card" style={{
              position: "absolute", top: "12px", right: "12px",
              backgroundColor: "#B86B4B", color: "#fff",
              padding: "4px 10px", borderRadius: "6px",
              fontSize: "0.72rem", fontWeight: 700,
            }}>{discountPct}% OFF</div>
          )}

          {/* Quick view */}
          <div className="quick-view-hint" title="Quick view" style={{
            position: "absolute", bottom: "12px", right: "12px",
            backgroundColor: "rgba(61,53,48,0.7)", color: "#fff",
            padding: "7px", borderRadius: "50%",
            fontSize: "0.7rem", opacity: 0, transition: "opacity 0.2s, border-radius 0.2s, padding 0.2s",
          }}>
            <svg className="quick-view-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <span className="quick-view-label">Quick view</span>
          </div>
        </div>

        {/* Content */}
        <div className="product-card-content" style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <h3 className="product-card-title" onClick={openProductModal} style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1.05rem",
            fontWeight: 600, color: "#3F352D", cursor: "pointer", margin: 0,
          }}>{product.name}</h3>
          <button type="button" className="product-card-more" onClick={openProductModal}>
            Click to know more
          </button>

          {/* Make time */}
          {product.makeTime && (
            <div className="product-card-make-time" style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              backgroundColor: "#E8E9C9", borderRadius: "6px",
              padding: "3px 10px", alignSelf: "flex-start", marginTop: "2px",
            }}>
              <span style={{ fontSize: "0.73rem", color: "#5B6042", fontWeight: 700 }}>
                Ready in {product.makeTime}
              </span>
            </div>
          )}

          {/* Price + Order */}
          <div style={{ marginTop: "10px" }}>
            <div className="product-card-price-row" style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                <span className="product-card-price" style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "1.2rem", fontWeight: 800, letterSpacing: "0.01em",
                  fontVariantNumeric: "tabular-nums", color: "#3F352D",
                }}>₹{product.discountedPrice.toLocaleString("en-IN")}</span>
                {hasDiscount && (
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: "#8F8780", textDecoration: "line-through", fontVariantNumeric: "tabular-nums" }}>
                    ₹{product.originalPrice!.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setFormOpen(true)}
              aria-label={`Order ${product.name}`}
              className="product-card-action"
            >{WA_SVG} Order now</button>
          </div>
        </div>
      </div>

      {formOpen && <OrderForm product={product} onClose={() => setFormOpen(false)} />}
      {modalOpen && <ProductModal product={product} onClose={closeProductModal} />}
      <style>{`.product-card:hover .quick-view-hint { opacity: 1 !important; }`}</style>
    </>
  );
}