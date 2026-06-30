"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider, KenteBackground } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

export default function Gifts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [copied, setCopied] = useState(false);

  const copyAccount = async () => {
    await navigator.clipboard.writeText(WEDDING.gifts.account.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gifts" className="relative bg-charcoal py-16 md:py-24 overflow-hidden">
      <KenteBackground opacity={0.03} />

      <div ref={ref} className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/40 mb-4">
            Gifts
          </p>
          <h2 className="font-script text-[clamp(2rem,5vw,3.5rem)] text-offwhite mb-6">
            With Love
          </h2>
          <div className="max-w-xs mx-auto mb-8">
            <KenteDivider />
          </div>

          <motion.p
            className="font-script text-[clamp(1.2rem,2.6vw,1.6rem)] text-offwhite/55 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {WEDDING.gifts.message}
          </motion.p>

          {/* Account card */}
          <motion.div
            className="border border-gold/20 p-6 sm:p-8 relative"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <p className="font-body text-[0.6rem] tracking-[0.4em] uppercase text-gold/35 mb-4">
              Bank transfer
            </p>
            <p className="font-script text-xl sm:text-2xl text-offwhite/80 mb-1">
              {WEDDING.gifts.account.name}
            </p>
            <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold/40 mb-5">
              {WEDDING.gifts.account.bank}
            </p>

            {/* Account number + copy */}
            <button
              onClick={copyAccount}
              className="group inline-flex items-center gap-3 border border-gold/25 hover:border-gold/50 px-6 py-3 transition-all duration-300"
            >
              <span className="font-display text-2xl sm:text-3xl text-shimmer tracking-widest">
                {WEDDING.gifts.account.number}
              </span>
              <span className="font-body text-[0.6rem] uppercase tracking-widest text-gold/40 group-hover:text-gold/70 transition-colors">
                {copied ? "Copied ✓" : "Copy"}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
