"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        backgroundColor: scrolled ? "rgba(250,247,242,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        boxShadow: scrolled ? "0 1px 12px rgba(61,53,48,0.08)" : "none",
        transition: "all 0.3s ease",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ fontSize: "28px" }}>🧶</div>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#3D3530",
                  lineHeight: 1.1
                }}>
                  {BUSINESS_CONFIG.name}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#8A7F7A", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Handcrafted with love
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }} className="desktop-nav">
            {navLinks.map((l) => (
              l.href === "/products" ? (
                <a key={l.href} href="/products/" onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname.includes("/products")) {
                    window.history.pushState({}, "", window.location.pathname.split("?")[0]);
                    window.dispatchEvent(new PopStateEvent("popstate"));
                  } else {
                    window.location.href = "/products/";
                  }
                }} style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 400,
                  color: "#3D3530",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#A8B5A0")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#3D3530")}
                >
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href} style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 400,
                  color: "#3D3530",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#A8B5A0")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#3D3530")}
                >
                  {l.label}
                </Link>
              )
            ))}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#A8B5A0",
                color: "#fff",
                padding: "10px 22px",
                borderRadius: "50px",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "background-color 0.2s",
                letterSpacing: "0.02em",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#7A8F71")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#A8B5A0")}
            >
              Order Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#3D3530",
              fontSize: "1.5rem",
            }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            backgroundColor: "#FFF9F5",
            borderTop: "1px solid #F2D9D0",
            padding: "16px 0",
          }} className="mobile-nav">
            {navLinks.map((l) => (
              l.href === "/products" ? (
                <a key={l.href} href="/products/" onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  if (window.location.pathname.includes("/products")) {
                    window.history.pushState({}, "", window.location.pathname.split("?")[0]);
                    window.dispatchEvent(new PopStateEvent("popstate"));
                  } else {
                    window.location.href = "/products/";
                  }
                }} style={{
                  display: "block",
                  padding: "12px 16px",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.95rem",
                  color: "#3D3530",
                  textDecoration: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                  display: "block",
                  padding: "12px 16px",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.95rem",
                  color: "#3D3530",
                  textDecoration: "none",
                  borderRadius: "8px",
                }}>
                  {l.label}
                </Link>
              )
            ))}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                margin: "12px 16px 0",
                backgroundColor: "#A8B5A0",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "50px",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Order on WhatsApp
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}