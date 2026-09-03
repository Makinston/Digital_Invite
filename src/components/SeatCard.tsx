import { KenteDivider } from "./AfricanPattern";

export default function SeatCard({ seatNumber }: { seatNumber?: string | null }) {
  if (!seatNumber) return null;

  return (
    <section className="bg-charcoal py-16 md:py-20">
      <div className="max-w-md mx-auto px-6 text-center">
        <p className="font-body text-[0.6rem] tracking-[0.45em] uppercase text-gold/40 mb-4">
          Reserved For You
        </p>
        <p className="font-body text-xs text-offwhite/40 uppercase tracking-[0.2em] mb-2">
          Your Seat
        </p>
        <p className="font-display text-[clamp(2.5rem,6vw,3.5rem)] text-shimmer leading-none mb-6">
          {seatNumber}
        </p>
        <div className="max-w-40 mx-auto">
          <KenteDivider />
        </div>
      </div>
    </section>
  );
}
