"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-deep flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <div className="text-center select-none">
            <motion.p
              className="text-gold/50 font-body text-xs tracking-[0.45em] uppercase mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Wedding of
            </motion.p>

            <motion.div
              className="font-display text-[5.5rem] leading-none text-shimmer"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              F <span className="text-gold/30 text-[2.5rem] align-middle mx-2">&amp;</span> O
            </motion.div>

            <motion.div
              className="mx-auto mt-5 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "160px", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />

            <motion.p
              className="text-gold/40 font-body text-[0.65rem] tracking-[0.4em] uppercase mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              September 26 · 2026
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
