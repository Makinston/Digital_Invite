"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider, AdinkraSymbol } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

function StoryScene({
  chapter,
  title,
  subtitle,
  body,
  index,
  imageAlt,
}: {
  chapter: string;
  title: string;
  subtitle: string;
  body: string;
  index: number;
  imageAlt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-10 md:gap-16 items-center py-16 md:py-24`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image placeholder */}
      <div className="w-full md:w-[45%] aspect-[4/5] flex-shrink-0">
        <div className="relative w-full h-full">
          {/* Gold frame */}
          <div className="absolute -inset-2 border border-gold/20 rounded-sm" />
          <div className="absolute -inset-1 border border-gold/10 rounded-sm" />
          {/* Placeholder */}
          <div className="w-full h-full bg-charcoal/30 rounded-sm flex flex-col items-center justify-center gap-4 border border-gold/10">
            <AdinkraSymbol className="w-12 h-12 opacity-30" />
            <p className="font-body text-[0.6rem] text-gold/30 tracking-[0.3em] uppercase">
              Photo
            </p>
          </div>
          {/* Chapter tag */}
          <div
            className={`absolute -bottom-4 ${isEven ? "-right-4" : "-left-4"} bg-deep border border-gold/30 px-4 py-2`}
          >
            <span className="font-display text-gold/80 text-sm tracking-[0.2em]">
              {chapter}
            </span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 text-charcoal">
        <p className="font-body text-[0.65rem] tracking-[0.4em] uppercase text-muted mb-3">
          {subtitle}
        </p>
        <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-light leading-tight mb-5 text-charcoal">
          {title}
        </h3>
        <div className="w-12 h-px bg-gold mb-5" />
        <p className="font-body text-base leading-relaxed text-charcoal/70">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

export default function LoveStory() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10%" });

  return (
    <section id="story" className="bg-offwhite py-20 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-muted mb-4">
            How it happened
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-charcoal font-light">
            Our Story
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        {/* Story scenes */}
        {WEDDING.story.map((scene, i) => (
          <div key={scene.chapter}>
            <StoryScene
              chapter={scene.chapter}
              title={scene.title}
              subtitle={scene.subtitle}
              body={scene.body}
              index={i}
              imageAlt={scene.title}
            />
            {i < WEDDING.story.length - 1 && (
              <div className="max-w-xs mx-auto my-4">
                <KenteDivider />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
