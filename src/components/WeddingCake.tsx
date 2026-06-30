"use client";

import { motion } from "framer-motion";

const G = "#C9A227";
const SW = 1.35;

function P({
  d,
  delay,
  dur = 1,
  op = 1,
}: {
  d: string;
  delay: number;
  dur?: number;
  op?: number;
}) {
  return (
    <motion.path
      d={d}
      stroke={G}
      strokeWidth={SW}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: op }}
      transition={{ duration: dur, delay, ease: "easeInOut" }}
    />
  );
}

function Dot({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2}
      stroke={G}
      fill="rgba(201,162,39,0.22)"
      strokeWidth={0.7}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, delay, type: "spring", stiffness: 380, damping: 18 }}
    />
  );
}

export default function WeddingCake() {
  return (
    <svg
      viewBox="0 0 220 246"
      className="w-[160px] sm:w-[190px] md:w-[220px] mx-auto drop-shadow-[0_0_18px_rgba(201,162,39,0.15)]"
      aria-hidden="true"
    >
      {/* ── Candles ── */}
      <P d="M94,16 L94,44"  delay={0.0} dur={0.45} />
      <P d="M110,10 L110,44" delay={0.05} dur={0.5} />
      <P d="M126,16 L126,44" delay={0.0} dur={0.45} />

      {/* Flames */}
      <P d="M94,12 C92,8 96,7 94,12 Z"   delay={0.48} dur={0.3} op={0.85} />
      <P d="M110,6 C108,2 112,2 110,6 Z"  delay={0.52} dur={0.3} op={0.85} />
      <P d="M126,12 C124,8 128,7 126,12 Z" delay={0.48} dur={0.3} op={0.85} />

      {/* ── Tier 1 (top) outline ── */}
      <P d="M68,44 L152,44 L152,84 L68,84 Z" delay={0.65} dur={0.9} />

      {/* Tier 1 center divider + dots */}
      <P d="M80,64 L140,64" delay={1.3} dur={0.5} op={0.45} />
      <Dot cx={94}  cy={64} delay={1.7} />
      <Dot cx={110} cy={64} delay={1.8} />
      <Dot cx={126} cy={64} delay={1.9} />

      {/* ── Ledge 1 → 2 ── */}
      {/* Left + right shelf tabs */}
      <P d="M56,84 L68,84"  delay={1.5} dur={0.25} />
      <P d="M152,84 L164,84" delay={1.5} dur={0.25} />
      {/* Ledge body */}
      <P d="M56,84 L56,93 L164,93 L164,84" delay={1.55} dur={0.5} />
      {/* Pearl row */}
      {[70, 82, 94, 104, 116, 128, 138, 150].map((x, i) => (
        <Dot key={x} cx={x} cy={88} delay={1.85 + i * 0.05} />
      ))}

      {/* ── Tier 2 (middle) outline ── */}
      <P d="M56,93 L164,93 L164,137 L56,137 Z" delay={2.1} dur={1.0} />

      {/* Tier 2 swag */}
      <P
        d="M62,116 Q73,107 84,116 Q95,125 106,116 Q117,107 128,116 Q139,125 150,116 Q158,110 158,116"
        delay={2.9}
        dur={0.95}
        op={0.6}
      />

      {/* ── Ledge 2 → 3 ── */}
      <P d="M38,137 L56,137"  delay={3.0} dur={0.25} />
      <P d="M164,137 L182,137" delay={3.0} dur={0.25} />
      <P d="M38,137 L38,147 L182,147 L182,137" delay={3.05} dur={0.6} />
      {/* Pearl row */}
      {[50, 63, 76, 90, 103, 110, 130, 143, 156, 169].map((x, i) => (
        <Dot key={x} cx={x} cy={142} delay={3.35 + i * 0.04} />
      ))}

      {/* ── Tier 3 (bottom, widest) outline ── */}
      <P d="M38,147 L182,147 L182,201 L38,201 Z" delay={3.2} dur={1.15} />

      {/* Tier 3 swag */}
      <P
        d="M46,174 Q60,163 74,174 Q88,185 102,174 Q116,163 130,174 Q144,185 158,174 Q170,165 174,174"
        delay={4.1}
        dur={1.0}
        op={0.6}
      />

      {/* ── Base plate ── */}
      <P
        d="M22,201 Q110,213 198,201 L198,207 Q110,219 22,207 Z"
        delay={4.3}
        dur={0.85}
      />
    </svg>
  );
}
