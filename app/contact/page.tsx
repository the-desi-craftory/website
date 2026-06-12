import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata = {
  title: "Contact — The Desi Craftory",
  description: "Get in touch to place orders, ask questions, or request custom handmade pieces.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "88px" }}>
      <div style={{
        background: "linear-gradient(135deg, #FAF7F2 0%, #F2D9D0 100%)",
        padding: "60px 24px", textAlign: "center", borderBottom: "1px solid #E8C4B8",
      }}>
        <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#A8B5A0", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>
          We&apos;d love to hear from you
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3D3530", margin: "0 0 16px" }}>
          Get in Touch
        </h1>
        <p style={{ color: "#8A7F7A", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
          Whether you have a question, want to place an order, or need a custom piece — just reach out. We respond fast!
        </p>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px" }}>
        {/* Contact cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "64px" }}>
          <a href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I'd like to get in touch about your handmade products.")}`}
            target="_blank" rel="noopener noreferrer" className="contact-card contact-card--wa">
            <div className="contact-icon" style={{ backgroundColor: "#25D366" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#3D3530", margin: "0 0 8px" }}>WhatsApp</h3>
            <p style={{ fontSize: "0.875rem", color: "#8A7F7A", margin: "0 0 16px", lineHeight: 1.6 }}>
              The fastest way to reach us. Chat, ask questions, or place your order directly.
            </p>
            <span className="contact-badge" style={{ backgroundColor: "#25D366" }}>Chat Now</span>
          </a>

          {BUSINESS_CONFIG.instagramUrl && (
            <a href={BUSINESS_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="contact-card contact-card--insta">
              <div className="contact-icon" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#3D3530", margin: "0 0 8px" }}>Instagram</h3>
              <p style={{ fontSize: "0.875rem", color: "#8A7F7A", margin: "0 0 16px", lineHeight: 1.6 }}>
                Follow our creative journey. New products, behind-the-scenes, and inspiration.
              </p>
              <span className="contact-badge" style={{ background: "linear-gradient(45deg, #f09433, #cc2366)" }}>@{BUSINESS_CONFIG.instagramHandle}</span>
            </a>
          )}

          {BUSINESS_CONFIG.email && (
            <a href={`mailto:${BUSINESS_CONFIG.email}`} className="contact-card contact-card--email">
              <div className="contact-icon" style={{ backgroundColor: "#A8B5A0", fontSize: "1.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✉️
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#3D3530", margin: "0 0 8px" }}>Email</h3>
              <p style={{ fontSize: "0.875rem", color: "#8A7F7A", margin: "0 0 16px", lineHeight: 1.6 }}>
                For detailed inquiries, bulk orders, or anything that needs a written exchange.
              </p>
              <span className="contact-badge" style={{ backgroundColor: "#A8B5A0" }}>Send Email</span>
            </a>
          )}
        </div>

        {/* Custom order CTA */}
        <div style={{
          background: "linear-gradient(135deg, #3D3530 0%, #5C4F48 100%)",
          borderRadius: "24px", padding: "48px 40px", textAlign: "center", color: "#FFF9F5",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✨</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: "0 0 16px" }}>
            Have a custom idea?
          </h2>
          <p style={{ color: "#D4C5B0", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto 32px", fontSize: "1rem" }}>
            We love making one-of-a-kind pieces. Tell us your favourite colours, the occasion, or share a reference image — and weI love making one-of-a-kind pieces. Tell me your favourite colours, the occasion, or share a reference image — and I&apos;ll make it happen.apos;ll make it happen.
          </p>
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi! I'd like to request a custom handmade piece.\n\nWhat I want: \nColours: \nOccasion: \nBudget: ")}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              backgroundColor: "#25D366", color: "#fff",
              padding: "14px 32px", borderRadius: "50px", textDecoration: "none",
              fontWeight: 700, fontSize: "0.95rem",
              display: "inline-flex", alignItems: "center", gap: "8px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Start Custom Order
          </a>
          <p style={{ color: "#6B6059", fontSize: "0.8rem", marginTop: "20px", marginBottom: 0 }}>💬 Usually responds within a few hours</p>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: "64px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#3D3530", margin: "0 0 36px", textAlign: "center" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { q: "How long does delivery take?", a: "Most orders are dispatched within 3–5 business days. Delivery takes an additional 2–7 days depending on your location across India." },
              { q: "Can I customise the colours?", a: "Absolutely! Just mention your preferred colours when you WhatsApp us and we'll do our best to accommodate. We have a wide range of yarn colours available." },
              { q: "Do you accept bulk or gifting orders?", a: "Yes! We love creating personalised gift sets and bulk orders for events like baby showers, weddings, and corporate gifting. Message us for special pricing." },
              { q: "How do I care for my handmade product?", a: "Hand wash gently in cold water with mild soap. Lay flat to dry. Avoid wringing or machine washing to preserve the shape and texture." },
            ].map((faq) => (
              <div key={faq.q} style={{ backgroundColor: "#FFF9F5", border: "1px solid #F2D9D0", borderRadius: "16px", padding: "24px 28px" }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#3D3530", margin: "0 0 10px", fontWeight: 600 }}>{faq.q}</h4>
                <p style={{ fontSize: "0.9rem", color: "#8A7F7A", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .contact-card {
          background-color: #FFF9F5; border: 1px solid #F2D9D0;
          border-radius: 20px; padding: 36px 28px; text-align: center;
          transition: all 0.25s; cursor: pointer; text-decoration: none;
          display: block;
        }
        .contact-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(61,53,48,0.1); }
        .contact-card--wa:hover { border-color: #25D366; box-shadow: 0 8px 24px rgba(37,211,102,0.15); }
        .contact-card--insta:hover { border-color: #C13584; }
        .contact-card--email:hover { border-color: #A8B5A0; }
        .contact-icon {
          width: 60px; height: 60px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .contact-badge {
          display: inline-block; color: #fff;
          padding: 8px 20px; border-radius: 50px;
          font-size: 0.82rem; font-weight: 700;
        }
      `}</style>
    </div>
  );
}