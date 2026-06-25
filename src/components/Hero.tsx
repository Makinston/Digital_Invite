"use client";

import { motion } from "framer-motion";
import GoldParticles from "./GoldParticles";
import { KenteBackground } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

interface HeroProps {
  guestName?: string;
}

export default function Hero({ guestName }: HeroProps) {
  const scrollDown = () => {
    const next = document.getElementById("story");
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-deep flex items-center justify-center overflow-hidden"
    >
      <KenteBackground opacity={0.06} />
      <GoldParticles />

      {/* Radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,39,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Personalized greeting */}
        {guestName && (
          <motion.p
            className="text-gold/60 font-body text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase mb-6 sm:mb-8 px-2"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dear {guestName}, you are cordially invited
          </motion.p>
        )}

        {!guestName && (
          <motion.p
            className="text-gold/50 font-body text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            You are cordially invited to the wedding of
          </motion.p>
        )}

        {/* Couple names — the centrepiece */}
        <motion.h1
          className="font-display leading-none select-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-shimmer block text-[clamp(3.5rem,10vw,8rem)]">
            {WEDDING.bride}
          </span>
          <span className="text-gold/30 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] block my-3 tracking-[0.3em]">
            &amp;
          </span>
          <span className="text-shimmer block text-[clamp(3.5rem,10vw,8rem)]">
            {WEDDING.groom}
          </span>
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="mx-auto my-6 sm:my-8 h-px bg-linear-to-r from-transparent via-gold to-transparent max-w-60"
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.3, delay: 1.0 }}
        />

        {/* Date + Venue */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          <p className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] text-offwhite/90 tracking-wider">
            {WEDDING.date}
          </p>
          <p className="font-body text-xs text-gold/50 tracking-[0.15em] sm:tracking-[0.3em] uppercase leading-relaxed">
            {WEDDING.venue.name} · {WEDDING.venue.area}
          </p>
        </motion.div>

        {/* Hashtag */}
        <motion.p
          className="mt-6 font-body text-[0.65rem] text-gold/30 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {WEDDING.hashtag}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/40 hover:text-gold/70 transition-colors cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        aria-label="Scroll down"
      >
        <span className="font-body text-[0.6rem] tracking-[0.35em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-linear-to-b from-gold/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}
