"use client";
import { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/types";
import { fetchProducts } from "@/lib/products";
import ProductCard from "./ProductCard";

// Stable shuffle using Fisher-Yates — seeded per session so it doesn't re-shuffle on every render
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setShuffledProducts(shuffle(data));
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category))).sort();
    return ["All", ...cats];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  // Read ?category= from URL — also re-runs on navigation
  useEffect(() => {
    function syncCategory() {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat && categories.includes(cat)) setActiveCategory(cat);
      else if (!cat) setActiveCategory("All");
    }

    syncCategory();
    window.addEventListener("popstate", syncCategory);
    return () => window.removeEventListener("popstate", syncCategory);
  }, [categories]);

  const filtered = useMemo(() => {
    // Use shuffled order for "All" with default sort, original order otherwise
    const base = (activeCategory === "All" && sort === "default")
      ? shuffledProducts
      : products;

    let list = base;
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === "asc") list = [...list].sort((a, b) => a.discountedPrice - b.discountedPrice);
    else if (sort === "desc") list = [...list].sort((a, b) => b.discountedPrice - a.discountedPrice);
    return list;
  }, [products, shuffledProducts, activeCategory, search, sort]);

  if (loading) {
    return (
      <div className="skeleton-grid" aria-label="Loading products">
        {[1, 2, 3, 4].map((item) => (
          <div className="product-skeleton" key={item}>
            <div className="skeleton-block skeleton-image" />
            <div className="skeleton-block skeleton-line skeleton-line--wide" />
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-button" />
          </div>
        ))}
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ textAlign: "center", padding: "64px 20px", backgroundColor: "#F8F1EA", borderRadius: "20px", border: "1px solid #E7C3B5" }}>
      <div className="empty-state-mark" aria-hidden="true" />
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#3F352D", margin: "0 0 8px" }}>We could not load the collection</h3>
        <p style={{ color: "#746B65", margin: 0 }}>Please refresh the page or chat with us on WhatsApp for help.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters bar */}
      <div className="filters-bar" style={{
        backgroundColor: "#F8F1EA", border: "1px solid #E7C3B5",
        borderRadius: "16px", padding: "20px 24px", marginBottom: "36px",
        display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center",
      }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <input
            type="text"
            placeholder="Search products…"
            aria-label="Search products"
            title="Search products by name or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px 10px 36px",
              borderRadius: "6px", border: "1px solid #C98F7D",
              backgroundColor: "#FCF9F5", fontSize: "0.88rem", color: "#3F352D",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
        <div className="sort-select-wrap">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
            title="Sort products by price"
            style={{
              padding: "10px 42px 10px 16px", borderRadius: "6px",
              border: "1px solid #C98F7D", backgroundColor: "#FCF9F5",
              fontSize: "0.88rem", color: "#3F352D", outline: "none", cursor: "pointer",
              appearance: "none", WebkitAppearance: "none",
            }}
          >
            <option value="default">Sort: Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <span className="sort-select-arrow" aria-hidden="true">⌄</span>
        </div>
        <div style={{ fontSize: "0.8rem", color: "#8F8780", marginLeft: "auto", whiteSpace: "nowrap" }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Category pills */}
      <div className="category-scroll" style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-filter${activeCategory === cat ? " category-filter--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            title={`Show ${cat.toLowerCase()} products`}
            style={{
              padding: "11px 20px", minHeight: "44px", borderRadius: "6px",
              border: activeCategory === cat ? "none" : "1px solid #C98F7D",
              backgroundColor: activeCategory === cat ? "#3F352D" : "#F8F1EA",
              color: activeCategory === cat ? "#F8F1EA" : "#3F352D",
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
          <div className="empty-state-mark" aria-hidden="true" />
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#3F352D", marginBottom: "8px" }}>No products found</h3>
          <p style={{ color: "#746B65" }}>Try a different search or category</p>
          <button
            className="clear-filters"
            onClick={() => { setSearch(""); setActiveCategory("All"); }}
            style={{
              marginTop: "20px", padding: "10px 24px", borderRadius: "6px",
              backgroundColor: "#B7B97A", color: "#fff", border: "none",
              cursor: "pointer", fontWeight: 700,
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}