interface MotifProps {
  className?: string;
}

/** Minimal line-art nilavilakku (traditional Kerala lamp) */
export function NilavilakkuMotif({ className = "w-16 h-20" }: MotifProps) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
    >
      <path d="M40 6 C 34 14, 34 20, 40 24 C 46 20, 46 14, 40 6 Z" />
      <line x1="40" y1="24" x2="40" y2="40" />
      <ellipse cx="40" cy="44" rx="10" ry="4" />
      <path d="M18 50 Q 40 40, 62 50 L 58 58 Q 40 50, 22 58 Z" />
      <line x1="40" y1="58" x2="40" y2="70" />
      <path d="M14 70 Q 40 58, 66 70 L 60 82 Q 40 72, 20 82 Z" />
      <rect x="30" y="82" width="20" height="6" rx="1" />
      <rect x="24" y="88" width="32" height="6" rx="1" />
    </svg>
  );
}

/** Minimal Kerala temple gopuram silhouette, drawn as line art */
export function TempleArchMotif({ className = "w-24 h-16" }: MotifProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
    >
      <path d="M60 4 L68 16 L52 16 Z" />
      <path d="M40 16 H80 L86 26 H34 Z" />
      <path d="M30 26 H90 L94 36 H26 Z" />
      <path d="M20 36 H100 V70 H20 Z" />
      <path d="M20 70 H100" />
      <path d="M36 46 Q 60 36, 84 46" />
      <line x1="40" y1="52" x2="40" y2="70" />
      <line x1="80" y1="52" x2="80" y2="70" />
      <line x1="60" y1="46" x2="60" y2="70" />
    </svg>
  );
}

/** Single jasmine flower, drawn minimally */
export function JasmineMotif({ className = "w-10 h-10" }: MotifProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="3.2" fill="currentColor" stroke="none" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="20"
          cy="11"
          rx="3.4"
          ry="6.4"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
    </svg>
  );
}

/** Thin kasavu-inspired border strip */
export function KasavuStrip({ className = "w-full h-3" }: MotifProps) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden="true">
      <line x1="0" y1="2" x2="200" y2="2" stroke="currentColor" strokeWidth="0.6" />
      <line x1="0" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="0.6" />
      {Array.from({ length: 34 }).map((_, i) => (
        <line
          key={i}
          x1={i * 6}
          y1="4"
          x2={i * 6}
          y2="8"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}
