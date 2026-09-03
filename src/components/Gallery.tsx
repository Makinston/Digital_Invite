"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";
import { WEDDING } from "@/lib/constants";

/**
 * Drop real photos into public/images/couple/ using these filenames and
 * they'll appear automatically — no code changes needed:
 *   photo-1.jpeg ... photo-6.jpeg
 * Until a file exists, that slot shows a placeholder.
 */
const PHOTOS = Array.from({ length: 6 }, (_, i) => `/images/couple/photo-${i + 1}.jpeg`);

// Cycled aspect ratios give the grid a Pinterest-style rhythm instead of a flat block.
const RATIOS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-square"];

function PhotoFrame({
  src,
  index,
  ratio,
  onOpen,
}: {
  src: string;
  index: number;
  ratio: string;
  onOpen: (i: number) => void;
}) {
  const [errored, setErrored] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className={`relative mb-3 sm:mb-4 break-inside-avoid overflow-hidden border border-gold/20 bg-charcoal/40 ${ratio} ${
        !errored ? "cursor-zoom-in group" : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 6) * 0.08 }}
      onClick={() => !errored && onOpen(index)}
    >
      {!errored ? (
        <>
          <Image
            src={src}
            alt={`${WEDDING.coupleDisplay} — photo ${index + 1}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setErrored(true)}
          />
          <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/10 transition-colors duration-300" />
        </>
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

function Lightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-deep/95 flex items-center justify-center px-4 sm:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 text-gold/60 hover:text-gold transition-colors"
        aria-label="Close"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        className="absolute left-2 sm:left-6 text-gold/50 hover:text-gold transition-colors p-2"
        aria-label="Previous photo"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 4L7 12L15 20" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>

      <motion.div
        key={index}
        className="relative w-full max-w-lg aspect-[4/5]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={PHOTOS[index]}
          alt={`${WEDDING.coupleDisplay} — photo ${index + 1}`}
          fill
          sizes="(max-width: 640px) 90vw, 32rem"
          className="object-contain"
          priority
        />
      </motion.div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        className="absolute right-2 sm:right-6 text-gold/50 hover:text-gold transition-colors p-2"
        aria-label="Next photo"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 4L17 12L9 20" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-[0.6rem] tracking-[0.3em] uppercase text-gold/40">
        {index + 1} / {PHOTOS.length}
      </p>
    </motion.div>
  );
}

export default function Gallery() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-10%" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

        <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
          {PHOTOS.map((src, i) => (
            <PhotoFrame key={src} src={src} index={i} ratio={RATIOS[i % RATIOS.length]} onOpen={setOpenIndex} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNav={(dir) =>
              setOpenIndex((cur) => (cur === null ? null : (cur + dir + PHOTOS.length) % PHOTOS.length))
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
