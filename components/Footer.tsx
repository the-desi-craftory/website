import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { FOOTER_QUICK_LINKS, WHATSAPP_TEMPLATES } from "@/lib/content";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#3D3530", color: "#D4C5B0", marginTop: "80px" }}>
      <div style={{ height: "4px", background: "linear-gradient(90deg, #A8B5A0, #E8C4B8, #A8B5A0, #E8C4B8)" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "24px" }}>🧶</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#FFF9F5", fontWeight: 600 }}>
                {BUSINESS_CONFIG.name}
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#A8A09A", maxWidth: "220px", margin: 0 }}>
              Every stitch tells a story of care, creativity, and handcrafted love.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#FFF9F5", marginBottom: "16px", fontSize: "1rem", marginTop: 0 }}>
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
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#FFF9F5", marginBottom: "16px", fontSize: "1rem", marginTop: 0 }}>
              Get in Touch
            </h4>
            <a href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="footer-link">
              💬 WhatsApp
            </a>
            {BUSINESS_CONFIG.instagramUrl && (
              <a href={BUSINESS_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
                📷 @{BUSINESS_CONFIG.instagramHandle}
              </a>
            )}
            {BUSINESS_CONFIG.email && (
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="footer-link">
                ✉️ {BUSINESS_CONFIG.email}
              </a>
            )}
          </div>

          {/* Custom order */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#FFF9F5", marginBottom: "16px", fontSize: "1rem", marginTop: 0 }}>
              Custom Orders
            </h4>
            <p style={{ fontSize: "0.875rem", color: "#A8A09A", lineHeight: 1.6, marginBottom: "16px" }}>
              Want something unique? Share your vision and we&apos;ll crochet it just for you.
            </p>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(WHATSAPP_TEMPLATES.footerCustomOrder)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#A8B5A0",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "50px",
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
          <p style={{ fontSize: "0.8rem", color: "#6B6059", margin: 0 }}>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. Site Design and Developed by Aditya Mehta. All rights reserved.
          </p>
          <p style={{ fontSize: "0.8rem", color: "#6B6059", margin: 0 }}>
            All products are 100% handmade
          </p>
        </div>
      </div>
      <style>{`
        .footer-link {
          display: block;
          color: #A8A09A;
          text-decoration: none;
          font-size: 0.875rem;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #E8C4B8; }
      `}</style>
    </footer>
  );
}
