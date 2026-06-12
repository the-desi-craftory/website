import { fetchProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export const metadata = {
  title: "Products — The Desi Craftory",
  description: "Browse our full collection of handmade crochet flowers, keychains, frames and home decor.",
};

// For static export, we can't use searchParams in the page component
// The ProductGrid client component handles category filtering via URL params client-side
export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div style={{ paddingTop: "88px" }}>
      <div style={{
        background: "linear-gradient(135deg, #FAF7F2 0%, #F2D9D0 100%)",
        padding: "60px 24px", textAlign: "center", borderBottom: "1px solid #E8C4B8",
      }}>
        <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#A8B5A0", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>
          Handmade with love
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3D3530", margin: "0 0 16px" }}>
          Our Collection
        </h1>
        <p style={{ color: "#8A7F7A", fontSize: "1rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
          Every piece is handcrafted, made to order, and shipped with care. Browse, discover, and order directly via WhatsApp.
        </p>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
