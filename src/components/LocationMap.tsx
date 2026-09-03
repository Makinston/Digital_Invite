import { WEDDING } from "@/lib/constants";

export default function LocationMap() {
  const query = encodeURIComponent(`${WEDDING.venue.name} ${WEDDING.venue.area}`);
  const src = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className="mt-8 border border-gold/20 overflow-hidden max-w-md mx-auto">
      <iframe
        src={src}
        title={`Map to ${WEDDING.venue.name}`}
        width="100%"
        height="220"
        style={{ border: 0, filter: "grayscale(0.3) contrast(1.1)" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
