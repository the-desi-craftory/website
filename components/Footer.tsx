import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { FOOTER_QUICK_LINKS, WHATSAPP_TEMPLATES } from "@/lib/content";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#3F352D", color: "#B86B4B", marginTop: "80px" }}>
      <div style={{ height: "4px", background: "linear-gradient(90deg, #B7B97A, #C98F7D, #B7B97A, #C98F7D)" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <div className="brand-lockup" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span className="brand-mark brand-mark--footer" aria-hidden="true">🧶</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#F8F1EA", fontWeight: 600 }}>
                {BUSINESS_CONFIG.name}
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#8F8780", maxWidth: "220px", margin: 0 }}>
              Every stitch tells a story of care, creativity, and handcrafted love.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#F8F1EA", marginBottom: "16px", fontSize: "1rem", marginTop: 0 }}>
              Quick Links
            </h4>
            {FOOTER_QUICK_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#F8F1EA", marginBottom: "16px", fontSize: "1rem", marginTop: 0 }}>
              Get in Touch
            </h4>
            <a href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="footer-link">
              WhatsApp
            </a>
            {BUSINESS_CONFIG.instagramUrl && (
              <a href={BUSINESS_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
                @{BUSINESS_CONFIG.instagramHandle}
              </a>
            )}
            {BUSINESS_CONFIG.email && (
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="footer-link">
                {BUSINESS_CONFIG.email}
              </a>
            )}
          </div>

          {/* Custom order */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#F8F1EA", marginBottom: "16px", fontSize: "1rem", marginTop: 0 }}>
              Custom Orders
            </h4>
            <p style={{ fontSize: "0.875rem", color: "#8F8780", lineHeight: 1.6, marginBottom: "16px" }}>
              Want something unique? Share your vision and we&apos;ll crochet it just for you.
            </p>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(WHATSAPP_TEMPLATES.footerCustomOrder)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#B7B97A",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              Request Custom Order
            </a>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ fontSize: "0.8rem", color: "#777168", margin: 0 }}>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. Site Design and Developed by Aditya Mehta. All rights reserved.
          </p>
          <p style={{ fontSize: "0.8rem", color: "#777168", margin: 0 }}>
            All products are 100% handmade
          </p>
        </div>
      </div>
      <style>{`
        .footer-link {
          display: block;
          color: #8F8780;
          text-decoration: none;
          font-size: 0.875rem;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #C98F7D; }
      `}</style>
    </footer>
  );
}
