"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

function DirectionCard({
  from,
  route,
  index,
}: {
  from: string;
  route: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="border border-gold/15 p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <p className="font-display text-base sm:text-lg text-gold/80 mb-2">{from}</p>
      <p className="font-body text-sm text-offwhite/50 leading-relaxed">{route}</p>
    </motion.div>
  );
}

export default function Directions() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-10%" });

  return (
    <section id="directions" className="bg-deep py-20 md:py-28 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
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
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {WEDDING.directions.map((d, i) => (
            <DirectionCard key={d.from} from={d.from} route={d.route} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
