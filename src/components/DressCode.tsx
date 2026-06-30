"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

export default function DressCode() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="dresscode" className="bg-offwhite py-16 md:py-24 overflow-hidden">
      <div ref={ref} className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-muted mb-4">
            What to wear
          </p>
          <h2 className="font-script text-[clamp(2rem,5vw,3.5rem)] text-charcoal mb-6">
            Dress Code
          </h2>
          <div className="max-w-xs mx-auto mb-8">
            <KenteDivider />
          </div>

          {/* Asooke swatch decoration */}
          <motion.div
            className="flex justify-center gap-2 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {["#C9A227", "#1A1410", "#FAF7F0", "#9B7A1E", "#1A1410"].map(
              (c, i) => (
                <div
                  key={i}
                  className="h-8 rounded-sm flex-1 max-w-12"
                  style={{ backgroundColor: c }}
                />
              )
            )}
          </motion.div>

          <motion.p
            className="font-script text-[clamp(1.3rem,3vw,1.8rem)] text-charcoal/70 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {WEDDING.dressCode}
          </motion.p>

          <motion.div
            className="mt-8 inline-block border border-gold/30 px-5 py-2.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-body text-[0.6rem] tracking-[0.35em] uppercase text-gold/60">
              Asooke · Traditional Attire
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
