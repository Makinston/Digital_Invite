"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { KenteDivider } from "./AfricanPattern";

interface GuestSeat {
  name: string;
  seat_number: string | null;
}

function SeatRow({ name, seat_number }: GuestSeat) {
  return (
    <div className="flex items-center justify-between border border-gold/15 px-4 py-3">
      <span className="text-sm text-offwhite/80">{name}</span>
      {seat_number ? (
        <span className="font-display text-lg text-shimmer shrink-0 ml-3">{seat_number}</span>
      ) : (
        <span className="text-[0.6rem] uppercase tracking-widest text-gold/40 shrink-0 ml-3">
          Not assigned yet
        </span>
      )}
    </div>
  );
}

function SeatLookupModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [guests, setGuests] = useState<GuestSeat[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    fetch("/api/seat")
      .then((res) => res.json())
      .then((data) => setGuests(data.guests ?? []))
      .catch(() => setError("Could not reach the server"));

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const filtered = useMemo(() => {
    if (!guests) return [];
    const q = query.trim().toLowerCase();
    if (!q) return guests;
    return guests.filter((g) => g.name.toLowerCase().includes(q));
  }, [guests, query]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-deep/90 flex items-center justify-center px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md max-h-[85vh] flex flex-col border border-gold/25 bg-charcoal p-7"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold/40 hover:text-gold transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <p className="font-body text-[0.6rem] tracking-[0.4em] uppercase text-gold/40 mb-2">
          Find Your Seat
        </p>
        <h3 className="font-display text-2xl text-offwhite font-light mb-5">
          Search the guest list
        </h3>

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a name…"
          className="w-full bg-white/5 border border-gold/20 rounded px-3 py-2.5 text-sm text-offwhite placeholder:text-offwhite/25 focus:outline-none focus:border-gold/50 mb-4"
        />

        {error && <p className="text-red-400/70 text-xs mb-2">{error}</p>}

        {!guests && !error && (
          <p className="text-offwhite/30 text-sm py-6 text-center">Loading guest list…</p>
        )}

        {guests && guests.length === 0 && (
          <p className="text-offwhite/40 text-sm py-6 text-center">
            The guest list isn&apos;t up yet — check back soon.
          </p>
        )}

        {guests && guests.length > 0 && (
          <>
            <p className="text-[0.6rem] tracking-widest uppercase text-offwhite/25 mb-2">
              {filtered.length} of {guests.length} guests
            </p>
            <div className="space-y-2 overflow-y-auto pr-1">
              {filtered.map((g, i) => (
                <SeatRow key={i} name={g.name} seat_number={g.seat_number} />
              ))}
              {filtered.length === 0 && (
                <p className="text-offwhite/40 text-sm py-6 text-center">
                  No guest found by that name. Try a different spelling, or check with the couple.
                </p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function SeatLookup() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="relative bg-charcoal py-16 md:py-20 overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-lg mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[0.6rem] tracking-[0.4em] uppercase text-gold/40 mb-4">
            Already RSVP&apos;d?
          </p>
          <h2 className="font-script text-[clamp(2rem,5vw,3rem)] text-offwhite mb-6">
            Find Your Seat
          </h2>
          <div className="max-w-40 mx-auto mb-8">
            <KenteDivider />
          </div>

          <motion.button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-3 border-2 border-gold text-gold bg-gold/10 hover:bg-gold hover:text-deep font-body text-sm sm:text-base tracking-[0.15em] uppercase px-8 py-4 transition-all duration-300 shadow-[0_0_30px_rgba(201,162,39,0.15)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="M21 21L16.5 16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Check Seat Number
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>{open && <SeatLookupModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}
