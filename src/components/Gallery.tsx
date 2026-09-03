"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

/**
 * Drop real photos into public/images/couple/ using these filenames and
 * they'll appear automatically — no code changes needed:
 *   photo-1.jpeg ... photo-6.jpeg   (~4:5 portrait crop recommended)
 * Until then, each frame shows a placeholder.
 */
const PHOTOS = Array.from({ length: 6 }, (_, i) => `/images/couple/photo-${i + 1}.jpeg`);

function PhotoFrame({ src, index }: { src: string; index: number }) {
  const [errored, setErrored] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="relative aspect-[4/5] overflow-hidden border border-gold/20 bg-charcoal/40"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${WEDDING.coupleDisplay} — photo ${index + 1}`}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-gold/25">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 21s-7.5-4.6-9.8-9.1C.6 8.4 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.4C11 6.1 12.4 5 14.4 5c3.4 0 5.1 3.4 3.5 6.9C15.5 16.4 12 21 12 21z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <p className="font-body text-[0.55rem] tracking-[0.25em] uppercase text-center px-4">
            Photo coming soon
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-10%" });

  return (
    <section id="gallery" className="bg-deep py-20 md:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/40 mb-4">
            Us, Through The Years
          </p>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4rem)] text-offwhite">
            Our Moments
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {PHOTOS.map((src, i) => (
            <PhotoFrame key={src} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
