"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

function directionsUrl(mapQuery: string) {
  const origin = encodeURIComponent(`${mapQuery}`);
  const destination = encodeURIComponent(`${WEDDING.venue.name}, ${WEDDING.venue.area}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
}

function StepRow({ step, index, isLast }: { step: string; index: number; isLast: boolean }) {
  return (
    <motion.div
      className="flex items-start gap-4 sm:gap-5"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="w-7 h-7 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center">
          <span className="font-body text-[0.65rem] text-gold/90 font-semibold">{index + 1}</span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 min-h-8 bg-linear-to-b from-gold/40 to-gold/10 my-1" />
        )}
      </div>
      <p className="font-body text-sm sm:text-[0.95rem] text-offwhite/80 leading-relaxed pb-6">
        {step}
      </p>
    </motion.div>
  );
}

export default function Directions() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-10%" });
  const [selected, setSelected] = useState(0);
  const area = WEDDING.directions[selected];

  return (
    <section id="directions" className="relative bg-deep py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,162,39,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/40 mb-4">
            Getting There
          </p>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4rem)] text-offwhite">
            How To Find Us
          </h2>
          <div className="mt-6 max-w-xs mx-auto mb-5">
            <KenteDivider />
          </div>
          <p className="font-body text-sm text-offwhite/60 max-w-md mx-auto">
            Select where you&apos;re coming from in Lagos for a step-by-step route.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[minmax(0,15rem)_1px_1fr] gap-6 md:gap-10 border border-gold/15 p-5 sm:p-8 md:p-10">
          {/* Area selector */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0">
            {WEDDING.directions.map((d, i) => (
              <button
                key={d.from}
                onClick={() => setSelected(i)}
                className={`text-left shrink-0 md:shrink px-4 py-3 border transition-all duration-200 whitespace-nowrap md:whitespace-normal ${
                  selected === i
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-white/8 text-offwhite/50 hover:text-offwhite/80 hover:border-white/20"
                }`}
              >
                <span className="font-body text-xs sm:text-[0.8rem] tracking-wide">{d.from}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block bg-gold/10" />

          {/* Selected route detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={area.from}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-display text-xl sm:text-2xl text-offwhite font-light">
                  {area.from}
                </h3>
                <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-gold/70 border border-gold/25 px-2.5 py-1 rounded-full">
                  {area.duration}
                </span>
              </div>
              {area.note ? (
                <p className="font-body text-xs text-gold/50 uppercase tracking-wide mb-6">
                  {area.note}
                </p>
              ) : (
                <div className="mb-6" />
              )}

              <div className="mt-2">
                {area.steps.map((step, i) => (
                  <StepRow key={i} step={step} index={i} isLast={i === area.steps.length - 1} />
                ))}
              </div>

              <a
                href={directionsUrl(area.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gold/40 text-gold/85 hover:border-gold hover:text-gold hover:bg-gold/5 font-body text-[0.7rem] tracking-[0.25em] uppercase px-6 py-3 transition-all duration-300"
              >
                Get Live Directions
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
