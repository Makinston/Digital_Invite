"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { WEDDING } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const target = new Date(WEDDING.dateISO).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="relative border border-gold/25 p-2 sm:p-4 md:p-6 min-w-14.5 sm:min-w-20 md:min-w-27.5 text-center bg-deep/40">
        <span className="font-display text-[clamp(1.6rem,5vw,4rem)] text-shimmer tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <p className="font-body text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] sm:tracking-[0.4em] uppercase text-gold/40">
        {label}
      </p>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(tick);
  }, []);

  const isPast = Object.values(timeLeft).every((v) => v === 0);

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative bg-deep py-20 md:py-32 overflow-hidden"
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,39,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/50 mb-4">
            {isPast ? "We are married!" : "Counting down to forever"}
          </p>
          <h2 className="font-script text-[clamp(2rem,5vw,3.5rem)] text-offwhite mb-12">
            {isPast ? "It happened." : WEDDING.date}
          </h2>
        </motion.div>

        {!isPast && (
          <div className="flex items-start justify-center gap-1.5 sm:gap-4 md:gap-8 w-full">
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="font-display text-gold/30 text-lg sm:text-4xl mt-1.5 sm:mt-4 shrink-0">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="font-display text-gold/30 text-lg sm:text-4xl mt-1.5 sm:mt-4 shrink-0">:</div>
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <div className="font-display text-gold/30 text-lg sm:text-4xl mt-1.5 sm:mt-4 shrink-0">:</div>
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}

        <motion.p
          className="mt-12 font-display text-xl md:text-2xl text-offwhite/30 font-light italic"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          &ldquo;Two are better than one.&rdquo;
        </motion.p>
        <motion.p
          className="font-body text-[0.6rem] tracking-[0.35em] uppercase text-gold/25 mt-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Ecclesiastes 4:9
        </motion.p>
      </div>
    </section>
  );
}
