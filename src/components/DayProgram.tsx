"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider, KenteBackground } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

function ProgramRow({
  time,
  event,
  index,
  isLast,
}: {
  time: string;
  event: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-6 sm:gap-10"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
    >
      {/* Time */}
      <div className="w-20 sm:w-28 shrink-0 text-right">
        <p className="font-display text-base sm:text-lg text-gold/70 font-light tracking-wider pt-1">
          {time}
        </p>
      </div>

      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3 h-3 rounded-full bg-gold/80 mt-2 shrink-0" />
        {!isLast && (
          <div className="w-px flex-1 min-h-14 bg-linear-to-b from-gold/40 to-gold/10 mt-1" />
        )}
      </div>

      {/* Event */}
      <div className="pb-10 flex-1">
        <p className="font-display text-[clamp(1.2rem,2.5vw,1.6rem)] text-offwhite font-light leading-tight">
          {event}
        </p>
      </div>
    </motion.div>
  );
}

export default function DayProgram() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-10%" });
  const venueRef = useRef<HTMLDivElement>(null);
  const venueInView = useInView(venueRef, { once: true, margin: "-10%" });

  return (
    <section id="program" className="relative bg-deep py-20 md:py-32 overflow-hidden">
      <KenteBackground opacity={0.04} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,39,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/40 mb-4">
            {WEDDING.date}
          </p>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4rem)] text-offwhite">
            Day Program
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        {/* Timeline */}
        <div>
          {WEDDING.dayProgram.map((item, i) => (
            <ProgramRow
              key={item.event}
              time={item.time}
              event={item.event}
              index={i}
              isLast={i === WEDDING.dayProgram.length - 1}
            />
          ))}
        </div>

        {/* Venue */}
        <motion.div
          ref={venueRef}
          className="text-center mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={venueInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-xs mx-auto mb-8">
            <KenteDivider />
          </div>
          <p className="font-body text-[0.6rem] tracking-[0.4em] uppercase text-gold/35 mb-3">
            Venue
          </p>
          <p className="font-display text-[clamp(1.4rem,3vw,2rem)] text-offwhite/90 font-light mb-1">
            {WEDDING.venue.name}
          </p>
          <p className="font-body text-sm text-offwhite/35 mb-6">
            {WEDDING.venue.area}
          </p>
          <a
            href={WEDDING.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold/35 text-gold/65 hover:border-gold hover:text-gold font-body text-[0.65rem] tracking-[0.3em] uppercase px-6 py-3 transition-colors duration-300"
          >
            Open in Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
