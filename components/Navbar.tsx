"use client";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { NAV_LINKS } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const saleTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const track = saleTrackRef.current;
    const firstMessage = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstMessage) return;

    let frameId = 0;
    let lastTimestamp = performance.now();
    let messageWidth = firstMessage.getBoundingClientRect().width;
    const startsOffscreen = window.matchMedia("(min-width: 768px)").matches;
    const initialOffset = startsOffscreen ? window.innerWidth : 0;
    track.dataset.offset = String(initialOffset);
    track.style.transform = `translate3d(${initialOffset}px, 0, 0)`;

    const updateWidth = () => {
      messageWidth = firstMessage.getBoundingClientRect().width;
    };

    const tick = (timestamp: number) => {
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const currentOffset = Number(track.dataset.offset ?? "0");
      const nextOffset = currentOffset - (elapsed * 38) / 1000;
      const wrappedOffset = messageWidth > 0 && nextOffset <= -messageWidth
        ? nextOffset + messageWidth
        : nextOffset;

      track.dataset.offset = String(wrappedOffset);
      track.style.transform = `translate3d(${wrappedOffset}px, 0, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(firstMessage);
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
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
            <div className="brand-lockup" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="brand-mark" aria-hidden="true">🧶</span>
              <div>
                <div className="brand-name" style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#3F352D",
                  lineHeight: 1.1
                }}>
                  {BUSINESS_CONFIG.name}
                </div>
                <div className="brand-tagline" style={{ fontSize: "0.65rem", color: "#746B65", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Handcrafted with care
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }} className="desktop-nav">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 400,
                color: "#3F352D",
                textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#B7B97A")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#3F352D")}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#B7B97A",
                color: "#fff",
                padding: "10px 22px",
                borderRadius: "6px",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "background-color 0.2s",
                letterSpacing: "0.02em",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5B6042")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#B7B97A")}
            >
              Order Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="mobile-menu-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#3F352D",
              fontSize: "1.5rem",
            }}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            backgroundColor: "#F8F1EA",
            borderTop: "1px solid #E7C3B5",
            padding: "16px 0",
          }} className="mobile-nav">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display: "block",
                padding: "12px 16px",
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.95rem",
                color: "#3F352D",
                textDecoration: "none",
                borderRadius: "8px",
              }}>
                {l.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                margin: "12px 16px 0",
                backgroundColor: "#B7B97A",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "6px",
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

      <div style={{
        height: "36px",
        borderTop: "1px solid rgba(61,53,48,0.08)",
        background: "linear-gradient(90deg, #C98F7D 0%, #E7C3B5 45%, #F8F1EA 100%)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}>
        <div ref={saleTrackRef} className="sale-strip-track" aria-label="Sale announcement">
          <span>{BUSINESS_CONFIG.saleMessage}</span>
          <span aria-hidden="true">{BUSINESS_CONFIG.saleMessage}</span>
        </div>
      </div>

      <style>{`
        .sale-strip-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          font-family: 'Lato', sans-serif;
          font-size: 0.84rem;
          letter-spacing: 0.05em;
          color: #3F352D;
          font-weight: 700;
        }
        .sale-strip-track span {
          display: inline-block;
          flex: 0 0 auto;
          padding-right: 48px;
        }
        @media (min-width: 768px) {
          .sale-strip-track span {
            flex-basis: 100vw;
            box-sizing: border-box;
          }
          .mobile-menu-btn { display: none !important; }
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .sale-strip-track {
            font-size: 0.72rem;
          }
        }
      `}</style>
    </nav>
  );
}