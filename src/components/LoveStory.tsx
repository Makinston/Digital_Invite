"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

export default function LoveStory() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10%" });
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-10%" });
  const [photoErrored, setPhotoErrored] = useState(false);

  return (
    <section id="story" className="bg-offwhite py-20 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-muted mb-4">
            Our Love Story
          </p>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4.5rem)] text-charcoal">
            {WEDDING.howWeMet.heading}
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[minmax(0,17rem)_1fr] gap-10 md:gap-14 items-center max-w-3xl md:max-w-none mx-auto">
          {/* Photo */}
          {!photoErrored && (
            <motion.div
              className="relative aspect-[4/5] max-w-60 md:max-w-none mx-auto w-full border border-gold/25 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
              initial={{ opacity: 0, y: 24 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/couple/photo-3.jpeg"
                alt={WEDDING.coupleDisplay}
                fill
                sizes="(max-width: 768px) 60vw, 17rem"
                className="object-cover"
                onError={() => setPhotoErrored(true)}
              />
            </motion.div>
          )}

          {/* Story paragraphs */}
          <motion.div
            ref={storyRef}
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {WEDDING.howWeMet.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-body text-base sm:text-lg leading-[1.85] text-charcoal/85"
              >
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Hashtag */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-xs mx-auto mb-6">
            <KenteDivider />
          </div>
          <p className="font-script text-[clamp(1.6rem,3.5vw,2.4rem)] text-gold">
            {WEDDING.hashtag}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
