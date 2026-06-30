"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [flapOpen, setFlapOpen] = useState(false);
  const [cardRise, setCardRise] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setFlapOpen(true), 1000);
    const t2 = setTimeout(() => setCardRise(true), 1700);
    const t3 = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-deep flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)",
            }}
          />

          {/* Envelope */}
          <motion.div
            className="relative"
            style={{ width: 280, height: 190 }}
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Envelope body */}
            <div
              className="absolute inset-0"
              style={{
                background: "#161210",
                border: "1px solid rgba(201,162,39,0.35)",
                borderRadius: 3,
              }}
            />

            {/* Crease lines + bottom V fold */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width="280"
              height="190"
              viewBox="0 0 280 190"
              aria-hidden="true"
            >
              <path
                d="M0 190 L140 115 L280 190 Z"
                fill="rgba(0,0,0,0.55)"
                stroke="rgba(201,162,39,0.18)"
                strokeWidth="0.8"
              />
              <line x1="0" y1="0" x2="140" y2="115" stroke="rgba(201,162,39,0.18)" strokeWidth="0.8" />
              <line x1="280" y1="0" x2="140" y2="115" stroke="rgba(201,162,39,0.18)" strokeWidth="0.8" />
            </svg>

            {/* Inner card — slides up when flap opens */}
            <motion.div
              style={{
                position: "absolute",
                left: 20, right: 20, bottom: 14,
                height: "70%",
                background: "#0D0B08",
                border: "1px solid rgba(201,162,39,0.28)",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
              }}
              animate={{ y: cardRise ? -72 : 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-center"
                animate={{ opacity: cardRise ? 1 : 0.6 }}
                transition={{ duration: 0.5 }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 38,
                    color: "#C9A227",
                    lineHeight: 1,
                    letterSpacing: "0.05em",
                  }}
                >
                  F &amp; O
                </p>
                <div
                  style={{
                    width: 64, height: 1,
                    background: "linear-gradient(to right, transparent, #C9A227, transparent)",
                    margin: "10px auto 8px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Lato, system-ui, sans-serif",
                    fontSize: 8.5,
                    color: "rgba(201,162,39,0.55)",
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                  }}
                >
                  26 · 09 · 2026
                </p>
              </motion.div>
            </motion.div>

            {/* Flap — collapses upward when opening */}
            <motion.div
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "57%",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "#1C1810",
                borderBottom: "1px solid rgba(201,162,39,0.22)",
                zIndex: 3,
                transformOrigin: "top center",
              }}
              animate={{ scaleY: flapOpen ? 0 : 1 }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Top border (stays above flap) */}
            <div
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0, height: 1,
                background: "rgba(201,162,39,0.35)",
                zIndex: 4,
              }}
            />

            {/* Wax seal on flap */}
            <motion.div
              style={{
                position: "absolute",
                top: "13%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 4,
              }}
              animate={{ opacity: flapOpen ? 0 : 1, scale: flapOpen ? 1.5 : 1 }}
              transition={{ duration: 0.35 }}
            >
              <div
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  border: "1px solid rgba(201,162,39,0.5)",
                  background: "rgba(201,162,39,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 12,
                    color: "rgba(201,162,39,0.75)",
                  }}
                >
                  F&O
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
