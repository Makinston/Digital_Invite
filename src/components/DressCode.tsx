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

          <motion.p
            className="font-display text-[clamp(1.1rem,2.5vw,1.5rem)] text-charcoal/70 font-light italic leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {WEDDING.dressCode}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
