"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GoldParticles from "./GoldParticles";
import { KenteBackground } from "./AfricanPattern";
import WeddingCake from "./WeddingCake";
import { WEDDING } from "@/lib/constants";

interface HeroProps {
  guestName?: string;
}

export default function Hero({ guestName }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Seal fades out early
  const sealOpacity = useTransform(scrollYProgress, [0.02, 0.2], [1, 0]);
  const sealScale   = useTransform(scrollYProgress, [0.02, 0.2], [1, 1.5]);

  // Flap folds open (scaleY 1→0 from the top)
  const flapScaleY = useTransform(scrollYProgress, [0.05, 0.38], [1, 0]);

  // Inner card rises up out of the envelope
  const cardY = useTransform(scrollYProgress, [0.28, 0.55], [0, -88]);

  // Envelope fades + shrinks away
  const envelopeOpacity = useTransform(scrollYProgress, [0.45, 0.72], [1, 0]);
  const envelopeScale   = useTransform(scrollYProgress, [0.45, 0.72], [1, 0.88]);

  // Wedding content fades in
  const contentOpacity = useTransform(scrollYProgress, [0.52, 0.82], [0, 1]);
  const contentY       = useTransform(scrollYProgress, [0.52, 0.82], [28, 0]);

  // Scroll cue fades out as soon as user starts scrolling
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    /*
     * The section is taller than the viewport so scrolling through it
     * drives the animation. The inner div stays sticky until the whole
     * section has been scrolled past.
     */
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[270vh]"
    >
      <div className="sticky top-0 h-screen bg-deep flex items-center justify-center overflow-hidden">
        <KenteBackground opacity={0.06} />
        <GoldParticles />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,39,0.07) 0%, transparent 70%)",
          }}
        />

        {/* ── Envelope (scroll-driven opening) ── */}
        <motion.div
          className="relative"
          style={{
            width: 280,
            height: 190,
            opacity: envelopeOpacity,
            scale: envelopeScale,
          }}
        >
          {/* Body */}
          <div
            className="absolute inset-0"
            style={{
              background: "#161210",
              border: "1px solid rgba(201,162,39,0.35)",
              borderRadius: 3,
            }}
          />

          {/* Crease lines + bottom V fold */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="280" height="190" viewBox="0 0 280 190"
            aria-hidden="true"
          >
            <path
              d="M0 190 L140 115 L280 190 Z"
              fill="rgba(0,0,0,0.55)"
              stroke="rgba(201,162,39,0.18)"
              strokeWidth="0.8"
            />
            <line x1="0"   y1="0" x2="140" y2="115" stroke="rgba(201,162,39,0.18)" strokeWidth="0.8" />
            <line x1="280" y1="0" x2="140" y2="115" stroke="rgba(201,162,39,0.18)" strokeWidth="0.8" />
          </svg>

          {/* Inner card */}
          <motion.div
            style={{
              position: "absolute",
              left: 20, right: 20, bottom: 14,
              height: "70%",
              background: "#0D0B08",
              border: "1px solid rgba(201,162,39,0.28)",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              y: cardY,
            }}
          >
            <div className="text-center">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 38,
                  color: "#C9A227",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}
              >
                F &amp; O
              </p>
              <div
                style={{
                  width: 64, height: 1,
                  background: "linear-gradient(to right, transparent, #C9A227, transparent)",
                  margin: "10px auto 8px",
                }}
              />
              <p
                style={{
                  fontFamily: "Lato, system-ui, sans-serif",
                  fontSize: 8.5,
                  color: "rgba(201,162,39,0.55)",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                }}
              >
                26 · 09 · 2026
              </p>
            </div>
          </motion.div>

          {/* Flap — scaleY 1→0 as user scrolls */}
          <motion.div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "57%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "#1C1810",
              borderBottom: "1px solid rgba(201,162,39,0.22)",
              zIndex: 3,
              transformOrigin: "top center",
              scaleY: flapScaleY,
            }}
          />

          {/* Top border — always visible */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, height: 1,
              background: "rgba(201,162,39,0.35)",
              zIndex: 4,
            }}
          />

          {/* Wax seal */}
          <motion.div
            style={{
              position: "absolute",
              top: "13%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
              opacity: sealOpacity,
              scale: sealScale,
            }}
          >
            <div
              style={{
                width: 38, height: 38, borderRadius: "50%",
                border: "1px solid rgba(201,162,39,0.5)",
                background: "rgba(201,162,39,0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 12,
                  color: "rgba(201,162,39,0.75)",
                }}
              >
                F&O
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Wedding content (fades in as envelope fades out) ── */}
        <motion.div
          className="absolute inset-0 flex items-start sm:items-center justify-center pointer-events-none"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="text-center px-6 max-w-4xl mx-auto w-full pt-14 pb-12 sm:pt-0 sm:pb-0 pointer-events-auto">
            {guestName && (
              <p className="text-gold/60 font-body text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase mb-8">
                Dear {guestName}, you are cordially invited
              </p>
            )}

            <WeddingCake />

            <p className="font-body text-[0.6rem] tracking-[0.45em] sm:tracking-[0.6em] uppercase text-gold/50 mt-6 mb-3 sm:mt-8 sm:mb-4">
              We are getting married
            </p>

            <h1 className="font-script leading-none select-none">
              <span className="text-shimmer block text-[clamp(2.8rem,9vw,6.5rem)]">
                {WEDDING.bride}
              </span>
              <span className="text-gold/30 font-display text-[clamp(1.1rem,2.5vw,1.8rem)] block my-1 tracking-[0.3em]">
                &amp;
              </span>
              <span className="text-shimmer block text-[clamp(2.8rem,9vw,6.5rem)]">
                {WEDDING.groom}
              </span>
            </h1>

            <div className="mx-auto my-6 sm:my-8 h-px bg-linear-to-r from-transparent via-gold to-transparent max-w-60" />

            <div className="space-y-2">
              <p className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] text-offwhite/90 tracking-wider">
                {WEDDING.date}
              </p>
              <p className="font-body text-xs text-gold/50 tracking-[0.15em] sm:tracking-[0.3em] uppercase leading-relaxed">
                {WEDDING.venue.name} · {WEDDING.venue.area}
              </p>
            </div>

            <p className="mt-7 font-script text-[clamp(1.6rem,4vw,2.4rem)] text-gold">
              {WEDDING.hashtag}
            </p>
          </div>
        </motion.div>

        {/* ── Scroll cue ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: cueOpacity }}
        >
          <p className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-gold/35">
            Scroll to open
          </p>
          <motion.div
            className="w-px h-10 bg-linear-to-b from-gold/40 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
