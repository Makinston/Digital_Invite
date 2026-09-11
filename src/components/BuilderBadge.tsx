"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BUILDER } from "@/lib/constants";

// Slow, subtle hue drift — gold to a soft rose to a muted sage, and back.
// Kept pastel/muted rather than saturated so it stays a quiet accent, not
// a distraction from the wedding content.
const CREDIT_COLORS = ["#C9A227", "#D9A0B3", "#8FAF8A", "#C9A227"];

// A quiet, persistent credit — visible the whole time someone browses the
// site, not just if they scroll all the way to the footer. Mirrors the
// AudioPlayer's fixed-corner placement (opposite corner) and fade-in timing.
export default function BuilderBadge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={BUILDER.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-40 font-body text-xs tracking-[0.15em] uppercase font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            animate={{ color: CREDIT_COLORS }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            © {BUILDER.name}
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
