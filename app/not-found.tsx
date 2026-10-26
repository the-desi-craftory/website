import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "40px 24px",
      paddingTop: "120px",
    }}>
      <div>
        <div className="empty-state-mark" aria-hidden="true" />
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "#3F352D", margin: "0 0 16px" }}>
          Oops! That page unravelled.
        </h1>
        <p style={{ color: "#746B65", fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px", maxWidth: "400px" }}>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to something beautiful.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{
            backgroundColor: "#3F352D", color: "#F8F1EA",
            padding: "12px 28px", borderRadius: "6px", textDecoration: "none", fontWeight: 700,
          }}>
            Go Home
          </Link>
          <Link href="/products" style={{
            backgroundColor: "#B7B97A", color: "#fff",
            padding: "12px 28px", borderRadius: "6px", textDecoration: "none", fontWeight: 700,
          }}>
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
