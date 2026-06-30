"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider, KenteBackground } from "./AfricanPattern";

const PLACEHOLDER_MESSAGES = [
  { name: "Adesola B.", message: "Wishing you both a lifetime of love and laughter! 💛" },
  { name: "Chukwuemeka O.", message: "So honoured to witness this beautiful union. God bless you both!" },
  { name: "Fatimah A.", message: "Feyisayo, you're glowing! Wale, you're one lucky man 😄🙏" },
  { name: "Ngozi & Dami", message: "Our hearts are full. See you on the big day!" },
  { name: "Tunde K.", message: "Two families becoming one. What a blessing 🙌" },
  { name: "Amaka I.", message: "Already crying and it hasn't even started yet 😭❤️" },
];

function MessageCard({
  name,
  message,
  index,
}: {
  name: string;
  message: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="border border-gold/15 p-5 bg-charcoal/40 relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      {/* Quote mark */}
      <span className="font-display text-4xl text-gold/15 leading-none block mb-1 -mt-1">
        &ldquo;
      </span>
      <p className="font-body text-sm text-offwhite/60 leading-relaxed mb-4">
        {message}
      </p>
      <div className="w-6 h-px bg-gold/30 mb-2" />
      <p className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-gold/50">
        {name}
      </p>
    </motion.div>
  );
}

export default function GuestWall() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-10%" });

  return (
    <section id="wall" className="relative bg-deep py-20 md:py-32 overflow-hidden">
      <KenteBackground opacity={0.035} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/50 mb-4">
            From the people who love you
          </p>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4rem)] text-offwhite">
            The Love Wall
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PLACEHOLDER_MESSAGES.map((m, i) => (
            <MessageCard key={i} name={m.name} message={m.message} index={i} />
          ))}
        </div>

        <motion.p
          className="text-center font-body text-[0.6rem] tracking-[0.3em] uppercase text-gold/25 mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          RSVP to leave your own message on the wall
        </motion.p>
      </div>
    </section>
  );
}
