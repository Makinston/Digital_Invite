"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { KenteBackground, AdinkraSymbol } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer
      ref={ref}
      className="relative bg-charcoal border-t border-gold/10 py-16 md:py-24 overflow-hidden text-center"
    >
      <KenteBackground opacity={0.03} />

      <div className="relative z-10 max-w-lg mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <AdinkraSymbol className="w-10 h-10 mx-auto mb-6 opacity-50" />

          <p className="font-script text-[clamp(2rem,5vw,3rem)] text-shimmer mb-2">
            {WEDDING.bride} &amp; {WEDDING.groom}
          </p>

          <p className="font-body text-xs text-gold/40 tracking-[0.35em] uppercase mb-6">
            {WEDDING.date}
          </p>

          <div className="w-16 h-px bg-gold/20 mx-auto mb-6" />

          <p className="font-body text-[0.65rem] text-offwhite/20 tracking-[0.3em] uppercase mb-1">
            {WEDDING.venue.name}
          </p>
          <p className="font-body text-[0.6rem] text-offwhite/15 tracking-[0.25em] uppercase mb-8">
            {WEDDING.venue.area}
          </p>

          <p className="font-script text-xl text-gold/40">
            {WEDDING.hashtag}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
