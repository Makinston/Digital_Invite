"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider, KenteBackground, CornerOrnament } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

function ToastCard({
  toast,
  index,
}: {
  toast: (typeof WEDDING.toasts)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="relative border border-gold/20 p-7 sm:p-10 bg-deep/50"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15 }}
    >
      <CornerOrnament className="absolute top-0 left-0 opacity-40" />
      <CornerOrnament className="absolute top-0 right-0 rotate-90 opacity-40" />
      <CornerOrnament className="absolute bottom-0 left-0 -rotate-90 opacity-40" />
      <CornerOrnament className="absolute bottom-0 right-0 rotate-180 opacity-40" />

      {/* From label */}
      <div className="mb-6 text-center">
        <p className="font-body text-[0.6rem] tracking-[0.4em] uppercase text-gold/40 mb-1">
          A toast from
        </p>
        <p className="font-script text-2xl sm:text-3xl text-shimmer">
          {toast.from}
        </p>
        <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-gold/30 mt-1">
          to {toast.to}
        </p>
        <div className="w-10 h-px bg-gold/30 mx-auto mt-4" />
      </div>

      {/* Quote mark */}
      <span className="font-display text-5xl text-gold/15 leading-none -mb-3 block">
        &ldquo;
      </span>

      {/* Toast body */}
      <div className="space-y-4">
        {toast.text.split("\n\n").map((para, i) => (
          <p key={i} className="font-body text-sm sm:text-base text-offwhite/65 leading-[1.85]">
            {para}
          </p>
        ))}
      </div>

      {/* Closing */}
      <p className="font-display text-base sm:text-lg text-gold/70 font-light italic mt-6 leading-relaxed">
        {toast.closing}
      </p>
    </motion.div>
  );
}

export default function Toasts() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-10%" });

  return (
    <section id="toasts" className="relative bg-charcoal py-20 md:py-32 overflow-hidden">
      <KenteBackground opacity={0.04} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/40 mb-4">
            Words from the heart
          </p>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4rem)] text-offwhite">
            Our Vows
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {WEDDING.toasts.map((t, i) => (
            <ToastCard key={t.from} toast={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
