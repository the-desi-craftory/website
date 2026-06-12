"use client";
import { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/types";
import { fetchProducts } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category))).sort();
    return ["All", ...cats];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  // Read ?category= from URL on client side
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat && categories.includes(cat)) setActiveCategory(cat);
  }, [categories]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === "asc") list = [...list].sort((a, b) => a.discountedPrice - b.discountedPrice);
    else if (sort === "desc") list = [...list].sort((a, b) => b.discountedPrice - a.discountedPrice);
    return list;
  }, [products, activeCategory, search, sort]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🧶</div>
        <p style={{ color: "#8A7F7A" }}>Loading products…</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters bar */}
      <div style={{
        backgroundColor: "#FFF9F5", border: "1px solid #F2D9D0",
        borderRadius: "16px", padding: "20px 24px", marginBottom: "36px",
        display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center",
      }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#A8A09A", fontSize: "0.9rem" }}>🔍</span>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px 10px 36px",
              borderRadius: "50px", border: "1px solid #E8C4B8",
              backgroundColor: "#FAF7F2", fontSize: "0.88rem", color: "#3D3530",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "10px 16px", borderRadius: "50px",
            border: "1px solid #E8C4B8", backgroundColor: "#FAF7F2",
            fontSize: "0.88rem", color: "#3D3530", outline: "none", cursor: "pointer",
          }}
        >
          <option value="default">Sort: Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <div style={{ fontSize: "0.8rem", color: "#A8A09A", marginLeft: "auto", whiteSpace: "nowrap" }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 20px", borderRadius: "50px",
              border: activeCategory === cat ? "none" : "1px solid #E8C4B8",
              backgroundColor: activeCategory === cat ? "#3D3530" : "#FFF9F5",
              color: activeCategory === cat ? "#FFF9F5" : "#3D3530",
              fontSize: "0.85rem", fontWeight: activeCategory === cat ? 700 : 400,
              cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🧶</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#3D3530", marginBottom: "8px" }}>No products found</h3>
          <p style={{ color: "#8A7F7A" }}>Try a different search or category</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("All"); }}
            style={{
              marginTop: "20px", padding: "10px 24px", borderRadius: "50px",
              backgroundColor: "#A8B5A0", color: "#fff", border: "none",
              cursor: "pointer", fontWeight: 700,
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}