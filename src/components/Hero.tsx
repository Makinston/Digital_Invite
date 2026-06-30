"use client";

import { motion } from "framer-motion";
import GoldParticles from "./GoldParticles";
import { KenteBackground } from "./AfricanPattern";
import WeddingCake from "./WeddingCake";
import { WEDDING } from "@/lib/constants";

interface HeroProps {
  guestName?: string;
}

export default function Hero({ guestName }: HeroProps) {
  const scrollDown = () => {
    document.getElementById("invite")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-deep flex items-start sm:items-center justify-center overflow-hidden"
    >
      <KenteBackground opacity={0.06} />
      <GoldParticles />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,39,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full pt-14 pb-12 sm:pt-0 sm:pb-0">
        {/* Personalized greeting */}
        {guestName && (
          <motion.p
            className="text-gold/60 font-body text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase mb-8 sm:mb-10"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dear {guestName}, you are cordially invited
          </motion.p>
        )}

        {/* Animated wedding rings — leads the hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: guestName ? 0.4 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <WeddingCake />
        </motion.div>

        {/* "WE ARE GETTING MARRIED" — sits below the graphic as a caption */}
        <motion.p
          className="font-body text-[0.6rem] tracking-[0.45em] sm:tracking-[0.6em] uppercase text-gold/50 mt-6 mb-3 sm:mt-8 sm:mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: guestName ? 0.6 : 0.4 }}
        >
          We are getting married
        </motion.p>

        {/* Couple names */}
        <motion.h1
          className="font-script leading-none select-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: guestName ? 0.7 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-shimmer block text-[clamp(2.8rem,9vw,6.5rem)]">
            {WEDDING.bride}
          </span>
          <span className="text-gold/30 font-display text-[clamp(1.1rem,2.5vw,1.8rem)] block my-1 tracking-[0.3em]">
            &amp;
          </span>
          <span className="text-shimmer block text-[clamp(2.8rem,9vw,6.5rem)]">
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

        {/* Hashtag — script, prominent */}
        <motion.p
          className="mt-7 font-script text-[clamp(1.6rem,4vw,2.4rem)] text-gold"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {WEDDING.hashtag}
        </motion.p>
      </div>

      {/* Scroll indicator — animated line only, no text */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        aria-label="Scroll down"
      >
        <motion.div
          className="w-px h-12 bg-linear-to-b from-gold/50 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}
