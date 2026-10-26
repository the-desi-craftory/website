import ProductGrid from "@/components/ProductGrid";

export const metadata = {
  title: "Products — The Desi Craftory",
  description: "Browse our full collection of handmade crochet flowers, keychains, heritage frames and home decors.",
};

export default function ProductsPage() {
  return (
    <div className="site-shell" style={{ paddingTop: "124px" }}>
      <div style={{
        background: "linear-gradient(135deg, #FCF9F5 0%, #E7C3B5 100%)",
        padding: "60px 24px", textAlign: "center", borderBottom: "1px solid #C98F7D",
      }}>
        <div className="breadcrumb" aria-label="Breadcrumb"><a href="/website/">Home</a><span>/</span><strong>Products</strong></div>
        <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#B7B97A", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>
          Handmade with love
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3F352D", margin: "0 0 16px" }}>
          Our Collection
        </h1>
        <p style={{ color: "#746B65", fontSize: "1rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
          Every piece is handcrafted, made to order, and shipped with care. Browse, choose your quantity, and review your order in WhatsApp.
        </p>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <ProductGrid />
      </div>
    </div>
  );
}