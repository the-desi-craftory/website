import Image from "next/image";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import img6 from "../../public/images/i6.png"; // Adjust the relative path depending on where this file sits

export const metadata = {
  title: "About — Mayuri Mehta | Crafted by Mehtas",
  description:
    "The story of Mayuri Mehta, founder of Crafted by Mehtas — crafting and crochet with a love for mudwork and handmade art.",
};

const CRAFT_STEPS = [
  {
    step: "01",
    icon: "💡",
    title: "Inspiration & Sketching",
    desc: "Every piece begins with an idea — a texture, a colour, a memory. Designs are visualised and planned before the crafting starts.",
  },
  {
    step: "02",
    icon: "🧵",
    title: "Gathering Materials",
    desc: "From premium yarn for crochet to clay and tools for mudwork — careful selection ensures quality, finish, and durability.",
  },
  {
    step: "03",
    icon: "✂️",
    title: "Crafting by Hand",
    desc: "Crochet, mudwork, and other handmade techniques are created stitch-by-stitch and shape-by-shape — always with patience and detail.",
  },
  {
    step: "04",
    icon: "✨",
    title: "Details, Drying & Finishing",
    desc: "Work is refined, dried/finished as required, and checked closely so each artwork looks as beautiful as it feels.",
  },
  {
    step: "05",
    icon: "📦",
    title: "Packed with Care",
    desc: "Each artwork is packed thoughtfully, ready to be gifted or cherished — because the unboxing experience matters.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "88px" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #FAF7F2 0%, #F2D9D0 100%)",
        padding: "60px 24px",
        textAlign: "center",
        borderBottom: "1px solid #E8C4B8",
      }}>
        <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#A8B5A0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
          The maker behind the art
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#3D3530", margin: "0 0 16px" }}>
            Crafted by Mehtas Founder
        </h1>
        <p style={{ color: "#8A7F7A", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
          A passion for creating, one stitch at a time
        </p>
      </div>

      {/* Story section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="story-grid">
          <div style={{ position: "relative", height: "500px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(61,53,48,0.12)" }}>
            <Image
              src={img6}
              alt="Mayuri Mehta crafting"
              fill
              style={{ objectFit: "cover" }}
            />

          </div>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#3D3530", margin: "0 0 24px", lineHeight: 1.25 }}>
              Hi, I&apos;m Mayuri Mehta!<br />
              <em style={{ color: "#A8B5A0", fontStyle: "italic" }}>Founder of Crafted by Mehtas.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "#8A7F7A", lineHeight: 1.85, marginBottom: "20px" }}>
              I&apos;m a homemaker at heart, and I carry forward the arts with love — from <strong>crafting & crochet</strong> to <strong>mudwork</strong> — ever since I was <strong>12 years old</strong>.
            </p>
            <p style={{ fontSize: "1rem", color: "#8A7F7A", lineHeight: 1.85, marginBottom: "20px" }}>
              Between managing the entire family and the daily routines of home, I’ve stayed devoted to creating. Each piece is my way of keeping tradition alive while turning it into something new, personal, and meaningful.
            </p>
            <p style={{ fontSize: "1rem", color: "#8A7F7A", lineHeight: 1.85, marginBottom: "36px" }}>
              {BUSINESS_CONFIG.name} is not just about crochet — it&apos;s about <strong>all sorts of art work</strong>. Whether it’s crochet, mudwork, or other handmade crafts, I make artworks that feel warm, handcrafted, and made to be cherished.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Say Hello 👋
              </a>
              <Link href="/products" style={{
                backgroundColor: "#FAF7F2",
                color: "#3D3530",
                padding: "12px 28px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                border: "1px solid #E8C4B8",
              }}>
                See My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: "#FFF9F5", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#3D3530", margin: 0 }}>
              What I make, and why it matters
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              { icon: "🤲", title: "Handcrafted with Love", desc: "Every piece is made by hand — from crochet to mudwork — with care, patience, and true craftsmanship." },
              { icon: "🌿", title: "Quality Materials", desc: "Carefully chosen supplies, finishes, and tools — so your artwork looks beautiful and lasts longer." },
              { icon: "💛", title: "Made with Intention", desc: "Nothing is rushed. I create each artwork with attention to detail, one step at a time." },
              { icon: "🎨", title: "Custom & Personal", desc: "I bring your ideas to life — colours, designs, themes, and preferences — whatever makes it truly yours." },
            ].map((v) => (
              <div key={v.title} style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #F2D9D0",
                borderRadius: "20px",
                padding: "32px 28px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#3D3530", margin: "0 0 12px" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#8A7F7A", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#A8B5A0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
              From idea to artwork
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#3D3530", margin: 0 }}>
              How Crafted by Mehtas pieces are made
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {CRAFT_STEPS.map((s, i) => (
                <div key={s.step} style={{ display: "flex", gap: "24px", alignItems: "flex-start", paddingBottom: i < CRAFT_STEPS.length - 1 ? "32px" : "0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    backgroundColor: "#F2D9D0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem",
                  }}>
                    {s.icon}
                  </div>
                  {i < CRAFT_STEPS.length - 1 && (
                    <div style={{ width: "2px", flex: 1, backgroundColor: "#F2D9D0", marginTop: "8px", minHeight: "32px" }} />
                  )}
                </div>
                <div style={{ paddingTop: "12px" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#A8B5A0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Step {s.step}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#3D3530", margin: "0 0 8px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#8A7F7A", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
