"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";

const MESSAGES = [
  { name: "Adesola B.", message: "Wishing you both a lifetime of love and laughter! 💛" },
  { name: "Chukwuemeka O.", message: "So honoured to witness this beautiful union. God bless you both!" },
  { name: "Fatimah A.", message: "Feyisayo, you're glowing! Wale, you're one lucky man 😄🙏" },
  { name: "Ngozi & Dami", message: "Our hearts are full. See you on the big day!" },
  { name: "Tunde K.", message: "Two families becoming one. What a blessing 🙌" },
  { name: "Amaka I.", message: "Already crying and it hasn't even started yet 😭❤️" },
  { name: "Seun F.", message: "Love like this deserves to be celebrated! So happy for you two 💍" },
  { name: "Bisi & Kola", message: "From DMs to forever — what a story! Congratulations 🥂" },
];

// Fixed per-note values to avoid hydration mismatch
const ROTATIONS   = [-7, 4, -5, 8, -3, 6, -9, 3];
const NOTE_COLORS = ["#FFF8E7", "#FAF7F0", "#FFF3D4", "#F5F0E8", "#FFF8E7", "#FAF7F0", "#FFF3D4", "#F5F0E8"];
const NOTE_HEIGHTS = [170, 158, 185, 163, 175, 155, 180, 165];
const NOTE_WIDTHS  = [210, 230, 200, 240, 215, 225, 205, 235];

// Paper-clip SVG (gold U-shape)
function PaperClip() {
  return (
    <svg
      width="18" height="34" viewBox="0 0 18 34"
      className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
      aria-hidden="true"
    >
      <path
        d="M9 2 C4 2 2 5 2 9 L2 26 C2 30 5 32 9 32 C13 32 16 30 16 26 L16 10 C16 7 14 6 12 6 C10 6 8 7 8 10 L8 24 C8 26 9.5 27 11 27"
        stroke="#C9A227" strokeWidth="1.8" fill="none" strokeLinecap="round"
      />
    </svg>
  );
}

function NoteCard({
  name,
  message,
  index,
}: {
  name: string;
  message: string;
  index: number;
}) {
  const mod = index % MESSAGES.length;
  const rotation = ROTATIONS[mod];
  const bg = NOTE_COLORS[mod];
  const h = NOTE_HEIGHTS[mod];
  const w = NOTE_WIDTHS[mod];

  return (
    <motion.div
      className="relative shrink-0 flex flex-col justify-between px-5 pt-8 pb-5"
      style={{
        width: w,
        height: h,
        backgroundColor: bg,
        rotate: rotation,
        boxShadow: "2px 4px 18px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.25)",
      }}
      whileHover={{ rotate: rotation * 0.4, scale: 1.04, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <PaperClip />

      {/* Torn bottom edge (decorative clip-path on some) */}
      <div
        className="absolute bottom-0 inset-x-0 h-2 pointer-events-none"
        style={{
          background: bg,
          clipPath: index % 3 === 0
            ? "polygon(0 100%,3% 0,6% 100%,9% 0,12% 100%,15% 0,18% 100%,21% 0,24% 100%,27% 0,30% 100%,33% 0,36% 100%,39% 0,42% 100%,45% 0,48% 100%,51% 0,54% 100%,57% 0,60% 100%,63% 0,66% 100%,69% 0,72% 100%,75% 0,78% 100%,81% 0,84% 100%,87% 0,90% 100%,93% 0,96% 100%,100% 0,100% 100%)"
            : undefined,
        }}
      />

      {/* Message text */}
      <p
        className="font-display italic leading-snug text-charcoal/80"
        style={{ fontSize: message.length > 50 ? 15 : 17 }}
      >
        {message}
      </p>

      {/* Author */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-px flex-1 bg-charcoal/15" />
        <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-charcoal/40 shrink-0">
          {name}
        </p>
      </div>
    </motion.div>
  );
}

export default function GuestWall() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-10%" });

  // Duplicate for seamless infinite loop
  const loop = [...MESSAGES, ...MESSAGES];

  return (
    <section id="wall" className="relative bg-deep py-20 md:py-28 overflow-hidden">
      {/* Cork-board top rope */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-14 px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.65rem] tracking-[0.45em] uppercase text-gold/50 mb-4">
            From the people who love you
          </p>
          <h2 className="font-script text-[clamp(2.5rem,6vw,4rem)] text-offwhite">
            The Love Wall
          </h2>
          <div className="mt-6 max-w-xs mx-auto">
            <KenteDivider />
          </div>
        </motion.div>

        {/* Infinite note carousel */}
        <div className="overflow-hidden py-10">
          <motion.div
            className="flex gap-8 items-center"
            style={{ width: "max-content" }}
            animate={{ x: [0, "-50%"] }}
            transition={{
              x: { duration: 36, ease: "linear", repeat: Infinity, repeatType: "loop" },
            }}
          >
            {loop.map((m, i) => (
              <NoteCard key={i} name={m.name} message={m.message} index={i} />
            ))}
          </motion.div>
        </div>

        <motion.p
          className="text-center font-body text-[0.6rem] tracking-[0.3em] uppercase text-gold/25 mt-8 px-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          RSVP to leave your own message on the wall
        </motion.p>
      </div>
    </section>
  );
}
