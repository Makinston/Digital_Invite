interface AfricanPatternProps {
  className?: string;
  opacity?: number;
}

export function KenteDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 kente-line" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="5" y="5" width="10" height="10" stroke="#C9A227" strokeWidth="1.5" transform="rotate(45 10 10)" />
        <circle cx="10" cy="10" r="1.5" fill="#C9A227" />
      </svg>
      <div className="flex-1 kente-line" />
    </div>
  );
}

export function AdinkraSymbol({ className = "" }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Simplified Aya (Fern) - endurance, resourcefulness */}
      <circle cx="16" cy="16" r="14" stroke="#C9A227" strokeWidth="0.8" strokeOpacity="0.4" />
      <circle cx="16" cy="16" r="10" stroke="#C9A227" strokeWidth="0.8" strokeOpacity="0.25" />
      <path
        d="M16 5 L16 27 M8 10 Q16 8 24 10 M8 16 Q16 14 24 16 M8 22 Q16 20 24 22"
        stroke="#C9A227"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

export function KenteBackground({ className = "", opacity = 0.04 }: AfricanPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="kente-bg" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            {/* Outer diamond */}
            <rect
              x="14" y="14" width="20" height="20"
              stroke="#C9A227" strokeWidth="0.8" fill="none"
              transform="rotate(45 24 24)"
            />
            {/* Inner diamond */}
            <rect
              x="19" y="19" width="10" height="10"
              stroke="#C9A227" strokeWidth="0.5" fill="none"
              transform="rotate(45 24 24)"
            />
            {/* Corner marks */}
            <circle cx="0" cy="0" r="1.5" fill="#C9A227" />
            <circle cx="48" cy="0" r="1.5" fill="#C9A227" />
            <circle cx="0" cy="48" r="1.5" fill="#C9A227" />
            <circle cx="48" cy="48" r="1.5" fill="#C9A227" />
            {/* Cross lines */}
            <line x1="24" y1="0" x2="24" y2="48" stroke="#C9A227" strokeWidth="0.3" strokeDasharray="2 6" />
            <line x1="0" y1="24" x2="48" y2="24" stroke="#C9A227" strokeWidth="0.3" strokeDasharray="2 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kente-bg)" />
      </svg>
    </div>
  );
}

export function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path d="M2 2 L28 2 L28 4 L4 4 L4 28 L2 28 Z" fill="#C9A227" />
      <path d="M6 6 L18 6 L18 8 L8 8 L8 18 L6 18 Z" fill="#C9A227" fillOpacity="0.5" />
      <circle cx="20" cy="20" r="2" fill="#C9A227" fillOpacity="0.4" />
    </svg>
  );
}
