"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BUILDER } from "@/lib/constants";

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
          className="fixed bottom-6 left-6 z-40 font-body text-[0.55rem] text-offwhite/15 hover:text-gold/60 tracking-[0.2em] uppercase transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Built by {BUILDER.name}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
