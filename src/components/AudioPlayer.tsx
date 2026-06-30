"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const musicUrl = process.env.NEXT_PUBLIC_MUSIC_URL;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const showTimer = setTimeout(() => setVisible(true), 1800);

    // AbortController lets us remove all gesture listeners at once
    const controller = new AbortController();
    const { signal } = controller;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      controller.abort();
      a.play().then(() => setPlaying(true)).catch(() => {});
    };

    // Try immediate autoplay (works on desktop if browser allows)
    a.play()
      .then(() => { started = true; setPlaying(true); })
      .catch(() => {
        // Blocked — fire on the very first user interaction
        document.addEventListener("scroll",     start, { signal, passive: true });
        document.addEventListener("touchstart", start, { signal, passive: true });
        document.addEventListener("click",      start, { signal });
        document.addEventListener("keydown",    start, { signal });
      });

    return () => {
      clearTimeout(showTimer);
      controller.abort();
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      <AnimatePresence>
        {visible && (
          <motion.button
            onClick={toggle}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-deep border border-gold/30 flex items-center justify-center hover:border-gold/60 transition-colors shadow-lg"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4 }}
            title={playing ? "Pause music" : "Play music"}
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <div className="flex items-end gap-0.5 h-4">
                {[1, 1.6, 0.8, 1.4, 1].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-0.5 bg-gold rounded-full"
                    animate={{ scaleY: [1, h, 0.5, h, 1] }}
                    transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                    style={{ height: "100%", transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 3.5L13 8L4 12.5V3.5Z" fill="#C9A227" />
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
