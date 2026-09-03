"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Match {
  name: string;
  seat_number: string | null;
}

function SeatLookupModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Enter at least 2 characters of your name");
      return;
    }
    setLoading(true);
    setError(null);
    setMatches(null);
    try {
      const res = await fetch(`/api/seat?name=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
      } else {
        setMatches(data.matches);
      }
    } catch {
      setError("Could not reach the server");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-deep/90 flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-sm border border-gold/25 bg-charcoal p-7"
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
          What&apos;s your name?
        </h3>

        <form onSubmit={search} className="flex gap-2 mb-4">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tunde Adeyemi"
            className="flex-1 bg-white/5 border border-gold/20 rounded px-3 py-2.5 text-sm text-offwhite placeholder:text-offwhite/25 focus:outline-none focus:border-gold/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="border border-gold/40 text-gold/80 hover:border-gold hover:text-gold disabled:opacity-40 px-4 text-sm transition-all"
          >
            {loading ? "…" : "Search"}
          </button>
        </form>

        {error && <p className="text-red-400/70 text-xs mb-2">{error}</p>}

        {matches && matches.length === 0 && (
          <p className="text-offwhite/40 text-sm">
            No guest found by that name. Try a different spelling, or check with the couple.
          </p>
        )}

        {matches && matches.length > 0 && (
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-gold/15 px-4 py-3"
              >
                <span className="text-sm text-offwhite/80">{m.name}</span>
                {m.seat_number ? (
                  <span className="font-display text-lg text-shimmer">{m.seat_number}</span>
                ) : (
                  <span className="text-[0.6rem] uppercase tracking-widest text-gold/40">
                    Not assigned yet
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function SeatLookup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-body text-[0.55rem] tracking-[0.25em] uppercase text-offwhite/15 hover:text-gold/50 transition-colors"
      >
        Check Seat Number
      </button>

      <AnimatePresence>{open && <SeatLookupModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
