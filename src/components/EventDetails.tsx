"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider, KenteBackground, CornerOrnament } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

function EventCard({
  event,
  index,
}: {
  event: (typeof WEDDING.events)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="relative border border-gold/20 p-8 md:p-10 bg-deep/60"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      {/* Corner ornaments */}
      <CornerOrnament className="absolute top-0 left-0 opacity-50" />
      <CornerOrnament className="absolute top-0 right-0 rotate-90 opacity-50" />
      <CornerOrnament className="absolute bottom-0 left-0 -rotate-90 opacity-50" />
      <CornerOrnament className="absolute bottom-0 right-0 rotate-180 opacity-50" />

      <div className="text-center">
        <span className="text-3xl mb-4 block">{event.emoji}</span>
        <p className="font-body text-[0.6rem] tracking-[0.45em] uppercase text-gold/50 mb-3">
          {event.time}
        </p>
        <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-offwhite font-light mb-3">
          {event.name}
        </h3>
        <div className="w-8 h-px bg-gold mx-auto mb-4" />
        <p className="font-body text-sm text-offwhite/50 leading-relaxed mb-5">
          {event.description}
        </p>
        <div className="border border-gold/20 px-4 py-2 inline-block">
          <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-gold/60">
            Dress · {event.dress}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventDetails() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10%" });
  const venueRef = useRef<HTMLDivElement>(null);
  const venueInView = useInView(venueRef, { once: true, margin: "-10%" });

  return (
    <section id="details" className="relative bg-charcoal py-20 md:py-32 overflow-hidden">
      <KenteBackground opacity={0.04} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/50 mb-4">
            Mark your calendar
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-offwhite font-light">
            The Celebration
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {WEDDING.events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* Venue */}
        <motion.div
          ref={venueRef}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={venueInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-xs mx-auto mb-8">
            <KenteDivider />
          </div>
          <p className="font-body text-[0.65rem] tracking-[0.4em] uppercase text-gold/40 mb-3">
            Venue
          </p>
          <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] text-offwhite font-light mb-2">
            {WEDDING.venue.name}
          </p>
          <p className="font-body text-sm text-offwhite/40 mb-6">
            {WEDDING.venue.area}
          </p>
          <a
            href={WEDDING.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold/40 text-gold/70 hover:border-gold hover:text-gold font-body text-[0.65rem] tracking-[0.35em] uppercase px-6 py-3 transition-colors duration-300"
          >
            View on Map
          </a>
        </motion.div>
      </div>
    </section>
  );
}
