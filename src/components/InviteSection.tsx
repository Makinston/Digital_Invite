"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider, KenteBackground } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

export default function InviteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="invite"
      className="relative bg-charcoal py-20 md:py-28 overflow-hidden"
    >
      <KenteBackground opacity={0.05} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="font-body text-[0.6rem] tracking-[0.45em] uppercase text-gold/40 mb-5">
            With joy in our hearts
          </p>

          <h2 className="font-script text-[clamp(2.8rem,8vw,5rem)] text-shimmer leading-none mb-6">
            You Are Invited
          </h2>

          <div className="max-w-50 mx-auto mb-8">
            <KenteDivider />
          </div>

          <motion.p
            className="font-script text-[clamp(1.3rem,3vw,1.8rem)] text-offwhite/70 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Together with our families, we are pleased to have you celebrate our big day with us.
          </motion.p>

          <motion.div
            className="mt-10 inline-block border border-gold/25 px-6 py-3"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-body text-[0.6rem] tracking-[0.35em] uppercase text-gold/50">
              RSVP before {WEDDING.rsvpDeadline}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
