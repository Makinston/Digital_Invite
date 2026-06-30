"use client";

import { motion } from "framer-motion";

const SPARKLES = [
  { cx: 34, cy: 28, r: 2.5, delay: 0.8 },
  { cx: 168, cy: 22, r: 2, delay: 1.2 },
  { cx: 198, cy: 70, r: 1.5, delay: 0.5 },
  { cx: 24, cy: 88, r: 2, delay: 1.5 },
  { cx: 178, cy: 112, r: 2.5, delay: 0.9 },
  { cx: 110, cy: 10, r: 1.5, delay: 1.1 },
  { cx: 48, cy: 118, r: 2, delay: 0.7 },
  { cx: 155, cy: 136, r: 1.5, delay: 1.4 },
];

export default function WeddingGraphic() {
  return (
    <div className="relative w-52 h-36 sm:w-64 sm:h-44 mx-auto my-6">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,162,39,0.18) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      <svg
        viewBox="0 0 220 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Wedding rings"
      >
        <defs>
          <linearGradient id="wg-gold1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B7A1E" />
            <stop offset="35%" stopColor="#C9A227" />
            <stop offset="65%" stopColor="#E8C84A" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
          <linearGradient id="wg-gold2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8C84A" />
            <stop offset="35%" stopColor="#C9A227" />
            <stop offset="65%" stopColor="#9B7A1E" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
          <filter id="wg-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="wg-softglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer soft glow halos */}
        <circle cx="82" cy="75" r="52" stroke="#C9A227" strokeWidth="16" opacity="0.06" filter="url(#wg-softglow)" />
        <circle cx="138" cy="75" r="52" stroke="#C9A227" strokeWidth="16" opacity="0.06" filter="url(#wg-softglow)" />

        {/* Left ring — back portion (hidden behind right ring overlap) */}
        <motion.circle
          cx="82"
          cy="75"
          r="46"
          stroke="url(#wg-gold1)"
          strokeWidth="8"
          filter="url(#wg-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
        />

        {/* Right ring */}
        <motion.circle
          cx="138"
          cy="75"
          r="46"
          stroke="url(#wg-gold2)"
          strokeWidth="8"
          filter="url(#wg-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.8, ease: "easeOut" }}
        />

        {/* Sparkle diamonds */}
        {SPARKLES.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#E8C84A"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1, 0.8, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: 2 + i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Center heart / intersection glow */}
        <motion.ellipse
          cx="110"
          cy="75"
          rx="12"
          ry="18"
          fill="none"
          stroke="#E8C84A"
          strokeWidth="1"
          opacity="0.3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 0.5, 0.3] }}
          transition={{ duration: 1, delay: 1.8 }}
        />
      </svg>
    </div>
  );
}
