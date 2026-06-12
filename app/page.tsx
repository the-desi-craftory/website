"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProducts, getFeaturedProducts, getCategories } from "@/lib/products";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { BUSINESS_CONFIG } from "@/lib/config";

import img1 from "../public/images/i1.png";
import img2 from "../public/images/i2.png";
import img3 from "../public/images/i3.png";
import img4 from "../public/images/i4.png";
import img5 from "../public/images/i5.png";

function YarnDivider() {
  return (
    <div style={{ textAlign: "center", margin: "24px 0", opacity: 0.4 }}>
      <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
        <path d="M0 12 Q15 4 30 12 Q45 20 60 12 Q75 4 90 12 Q105 20 120 12" stroke="#A8B5A0" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="60" cy="12" r="4" fill="#E8C4B8"/>
      </svg>
    </div>
  );
}


const CATEGORY_ICONS: Record<string, string> = {
  "Bottle Sleeve": "🧴",
  "Car Accessories": "🚗",
  "Crochet Flowers & Decor": "🌸",
  "Home Accessories": "🏠",
  "Keychains & Charms": "🔑",
  "Personal Accessories": "🎀",
  "Tech Accessories": "📱",
  "Wall Clocks": "🕒",
  "Wall Decor & Lippan Art": "🖼️",
};


const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const featured = getFeaturedProducts(products);
  const categories = getCategories(products);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #FFF9F5 0%, #FAF7F2 50%, #F2D9D0 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", paddingTop: "80px",
      }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,181,160,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,196,184,0.22) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="hero-grid">
          {/* Text */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#F2D9D0", padding: "6px 16px", borderRadius: "50px", fontSize: "0.78rem", fontWeight: 700, color: "#7A8F71", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
              <span>🧶</span> Handcrafted with love
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 1.15, color: "#3D3530", margin: "0 0 24px", fontWeight: 700 }}>
              Where every stitch<br />
              <em style={{ color: "#A8B5A0", fontStyle: "italic" }}>tells a story</em>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#8A7F7A", lineHeight: 1.8, margin: "0 0 40px", maxWidth: "420px" }}>
              {BUSINESS_CONFIG.description} Each creation is one-of-a-kind, made just for you.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/products" className="btn-dark">Shop Collection</Link>
              <a href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I'd love to see your crochet collection.")}`}
                target="_blank" rel="noopener noreferrer" className="btn-wa">
                {WA_ICON} Chat with us
              </a>
            </div>
            <div style={{ display: "flex", gap: "24px", marginTop: "48px", flexWrap: "wrap" }}>
              {[{ icon: "🤲", label: "100% Handmade" }, { icon: "💛", label: "Made with Love" }, { icon: "✈️", label: "Ships Pan-India" }].map((b) => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.1rem" }}>{b.icon}</span>
                  <span style={{ fontSize: "0.8rem", color: "#8A7F7A", fontWeight: 700 }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image mosaic */}
          <div style={{ position: "relative", height: "480px" }} className="hero-mosaic">
            <div style={{ position: "absolute", top: 0, left: 0, width: "58%", height: "58%", borderRadius: "20px", overflow: "hidden", boxShadow: "0 12px 40px rgba(61,53,48,0.14)" }}>
              <Image src={img2} alt="Crochet product" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", top: "10%", right: 0, width: "40%", height: "44%", borderRadius: "20px", overflow: "hidden", boxShadow: "0 12px 40px rgba(61,53,48,0.14)" }}>
              <Image src={img3} alt="Crochet product" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: "8%", width: "44%", height: "40%", borderRadius: "20px", overflow: "hidden", boxShadow: "0 12px 40px rgba(61,53,48,0.14)" }}>
              <Image src={img4} alt="Crochet product" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: "6%", right: 0, width: "38%", height: "38%", borderRadius: "20px", overflow: "hidden", boxShadow: "0 12px 40px rgba(61,53,48,0.14)" }}>
              <Image src={img5} alt="Crochet product" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", backgroundColor: "#FFF9F5", borderRadius: "16px", padding: "14px 20px", boxShadow: "0 8px 32px rgba(61,53,48,0.18)", textAlign: "center", border: "1px solid #F2D9D0", zIndex: 10 }}>
              <div style={{ fontSize: "1.6rem" }}>🧶</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", color: "#3D3530", fontWeight: 600 }}>Handmade</div>
              <div style={{ fontSize: "0.72rem", color: "#A8B5A0" }}>with love</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES (only if products exist) ── */}
      {categories.length > 0 && (
        <section style={{ backgroundColor: "#FFF9F5", padding: "80px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#A8B5A0", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>Browse by Category</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#3D3530", margin: 0 }}>Something for every occasion</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px" }}>
              {categories.map((cat) => (
                <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="category-card">
                  <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{CATEGORY_ICONS[cat] || "🎀"}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: "#3D3530", fontWeight: 600 }}>{cat}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <YarnDivider />

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ padding: "80px 24px", backgroundColor: "#FAF7F2" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#A8B5A0", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>Handpicked for you</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#3D3530", margin: 0 }}>Featured Creations</h2>
            </div>
            {featured.length > 0 && <Link href="/products" className="view-all-link">View all →</Link>}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🧶</div>
              <p style={{ color: "#8A7F7A" }}>Loading products…</p>
            </div>
          ) : featured.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px", backgroundColor: "#FFF9F5", borderRadius: "20px", border: "1px dashed #E8C4B8" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🧶</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#8A7F7A" }}>Products coming soon!</p>
              <p style={{ fontSize: "0.875rem", color: "#A8A09A" }}>Check back shortly or chat with us on WhatsApp.</p>
              <a href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ display: "inline-flex", marginTop: "20px" }}>
                {WA_ICON} Chat with us
              </a>
            </div>
          )}
        </div>
      </section>

      <YarnDivider />

      {/* ── ABOUT ── */}
      <section style={{ padding: "80px 24px", backgroundColor: "#FFF9F5" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="about-grid">
          <div style={{ position: "relative", height: "440px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 48px rgba(61,53,48,0.12)" }}>
            <Image src={img1} alt="The artist at work" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px", backgroundColor: "rgba(255,249,245,0.95)", backdropFilter: "blur(4px)", padding: "16px 20px", borderRadius: "14px", boxShadow: "0 4px 16px rgba(61,53,48,0.1)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#3D3530", fontWeight: 600 }}>Every piece is unique</div>
              <div style={{ fontSize: "0.8rem", color: "#8A7F7A" }}>No two creations are alike</div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#A8B5A0", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 16px" }}>The story behind the stitches</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#3D3530", margin: "0 0 24px", lineHeight: 1.25 }}>
              Crafted by hand,<br /><em style={{ color: "#A8B5A0", fontStyle: "italic" }}>gifted from the heart</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "#8A7F7A", lineHeight: 1.8, marginBottom: "24px" }}>
              I started crocheting as a creative escape and it quickly became a passion. Each piece I make carries a little piece of my heart — whether it&apos;s a birthday gift, a home decoration, or a daily accessory.
            </p>
            <p style={{ fontSize: "1rem", color: "#8A7F7A", lineHeight: 1.8, marginBottom: "36px" }}>
              I use only premium quality cotton yarn to ensure durability and softness. Every product is made to order — fresh, personal, and made just for you.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "36px" }}>
              {[
                { icon: "🌿", title: "Natural Materials", desc: "Premium cotton yarn" },
                { icon: "⏱️", title: "Made to Order", desc: "Fresh for every customer" },
                { icon: "🎨", title: "Custom Options", desc: "Pick your colour & size" },
                { icon: "📦", title: "Safe Packaging", desc: "Delivered with care" },
              ].map((f) => (
                <div key={f.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.3rem" }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#3D3530", marginBottom: "2px" }}>{f.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "#8A7F7A" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-sage">Read my story →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #3D3530 0%, #5C4F48 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🧶</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#FFF9F5", margin: "0 0 20px", lineHeight: 1.25 }}>
            Want something made just for you?
          </h2>
          <p style={{ color: "#D4C5B0", fontSize: "1rem", lineHeight: 1.7, margin: "0 0 40px" }}>
            Custom orders are our speciality. Share your idea — colours, size, occasion — and we&apos;ll bring it to life, stitch by stitch.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I'd like to place a custom crochet order.")}`}
              target="_blank" rel="noopener noreferrer" className="btn-wa">
              {WA_ICON} Request Custom Order
            </a>
            <Link href="/products" className="btn-outline-light">Browse Collection</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-mosaic { height: 300px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
        .btn-dark { background-color:#3D3530;color:#FFF9F5;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:0.95rem;letter-spacing:0.02em;transition:background-color 0.2s;display:inline-block; }
        .btn-dark:hover { background-color:#5C4F48; }
        .btn-wa { background-color:#25D366;color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:0.95rem;display:inline-flex;align-items:center;gap:8px;transition:background-color 0.2s; }
        .btn-wa:hover { background-color:#1db954; }
        .btn-sage { display:inline-block;background-color:#A8B5A0;color:#fff;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:700;font-size:0.88rem;transition:background-color 0.2s; }
        .btn-sage:hover { background-color:#7A8F71; }
        .btn-outline-light { background-color:transparent;color:#FFF9F5;padding:14px 32px;border-radius:50px;border:2px solid rgba(255,249,245,0.3);text-decoration:none;font-weight:700;font-size:0.95rem;transition:border-color 0.2s;display:inline-block; }
        .btn-outline-light:hover { border-color:rgba(255,249,245,0.7); }
        .category-card { background-color:#FAF7F2;border:1px solid #F2D9D0;border-radius:16px;padding:28px 16px;text-align:center;transition:all 0.25s;cursor:pointer;text-decoration:none;display:block; }
        .category-card:hover { background-color:#F2D9D0;transform:translateY(-4px);box-shadow:0 8px 24px rgba(61,53,48,0.1); }
        .view-all-link { color:#3D3530;text-decoration:none;font-weight:700;font-size:0.88rem;border-bottom:1px solid #3D3530;padding-bottom:2px;letter-spacing:0.04em;transition:color 0.2s,border-color 0.2s; }
        .view-all-link:hover { color:#A8B5A0;border-color:#A8B5A0; }
      `}</style>
    </div>
  );
}