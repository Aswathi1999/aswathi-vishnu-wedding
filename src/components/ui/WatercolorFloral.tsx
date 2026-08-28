type FloralTone = "blush" | "gold";

interface WatercolorFloralProps {
  /** Must be unique per instance on the page — used to scope the SVG filter id. */
  id: string;
  className?: string;
  /** "blush" for ivory/sand backgrounds, "gold" for dark brown backgrounds. */
  tone?: FloralTone;
}

const PALETTES: Record<
  FloralTone,
  {
    washA: string;
    washB: string;
    branch: string;
    leaf1: string;
    leaf2: string;
    petalA1: string;
    petalA2: string;
    petalA3: string;
    petalACenter: string;
    petalB1: string;
    petalB2: string;
    petalBCenter: string;
    whiteFlower: string;
    whiteCenter: string;
  }
> = {
  blush: {
    washA: "#E8C9C2",
    washB: "#D9C7A8",
    branch: "#8A9A78",
    leaf1: "#96A886",
    leaf2: "#A3B393",
    petalA1: "#E3B8B0",
    petalA2: "#E9C6C0",
    petalA3: "#EDCFC9",
    petalACenter: "#C98F82",
    petalB1: "#E7C0B9",
    petalB2: "#EDD0C9",
    petalBCenter: "#C98F82",
    whiteFlower: "#F7F2E8",
    whiteCenter: "#D9B36B",
  },
  gold: {
    washA: "#D3BC8A",
    washB: "#B89A5A",
    branch: "#B89A5A",
    leaf1: "#C7AD74",
    leaf2: "#D3BC8A",
    petalA1: "#D3BC8A",
    petalA2: "#DFCBA0",
    petalA3: "#E7D8B4",
    petalACenter: "#B89A5A",
    petalB1: "#DAC290",
    petalB2: "#E4D3A8",
    petalBCenter: "#B89A5A",
    whiteFlower: "#F1EAD9",
    whiteCenter: "#D3BC8A",
  },
};

/**
 * Lightweight, reusable watercolor-style floral cluster (pale flowers, small
 * blossoms, muted leaves, thin curved branches) drawn as inline SVG.
 * Decorative only — always render with aria-hidden.
 */
export function WatercolorFloral({ id, className = "", tone = "blush" }: WatercolorFloralProps) {
  const blurId = `wf-blur-${id}`;
  const p = PALETTES[tone];

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse cx="70" cy="60" rx="82" ry="62" fill={p.washA} opacity="0.16" filter={`url(#${blurId})`} />
      <ellipse cx="140" cy="150" rx="60" ry="50" fill={p.washB} opacity="0.12" filter={`url(#${blurId})`} />

      <path
        d="M20 202 C 52 152, 62 100, 112 40"
        fill="none"
        stroke={p.branch}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M60 150 C 80 140, 95 125, 100 105"
        fill="none"
        stroke={p.branch}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />

      <ellipse cx="72" cy="150" rx="10" ry="4.5" fill={p.leaf1} opacity="0.5" transform="rotate(-35 72 150)" filter={`url(#${blurId})`} />
      <ellipse cx="88" cy="118" rx="9" ry="4" fill={p.leaf1} opacity="0.45" transform="rotate(20 88 118)" filter={`url(#${blurId})`} />
      <ellipse cx="45" cy="176" rx="8" ry="3.6" fill={p.leaf2} opacity="0.45" transform="rotate(-55 45 176)" filter={`url(#${blurId})`} />

      <g>
        <circle cx="108" cy="46" r="7" fill={p.petalA1} opacity="0.5" filter={`url(#${blurId})`} />
        <circle cx="100" cy="40" r="6" fill={p.petalA2} opacity="0.45" filter={`url(#${blurId})`} />
        <circle cx="116" cy="40" r="6" fill={p.petalA2} opacity="0.45" filter={`url(#${blurId})`} />
        <circle cx="108" cy="34" r="6" fill={p.petalA3} opacity="0.45" filter={`url(#${blurId})`} />
        <circle cx="108" cy="42" r="3" fill={p.petalACenter} opacity="0.55" />
      </g>

      <g>
        <circle cx="60" cy="95" r="5.5" fill={p.petalB1} opacity="0.45" filter={`url(#${blurId})`} />
        <circle cx="53" cy="90" r="4.5" fill={p.petalB2} opacity="0.4" filter={`url(#${blurId})`} />
        <circle cx="66" cy="90" r="4.5" fill={p.petalB2} opacity="0.4" filter={`url(#${blurId})`} />
        <circle cx="60" cy="86" r="2.4" fill={p.petalBCenter} opacity="0.5" />
      </g>

      <g>
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="30"
            cy="55"
            rx="2.4"
            ry="4.6"
            fill={p.whiteFlower}
            opacity="0.65"
            transform={`rotate(${angle} 30 48)`}
          />
        ))}
        <circle cx="30" cy="48" r="1.6" fill={p.whiteCenter} opacity="0.65" />
      </g>

      <g>
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="130"
            cy="180"
            rx="2"
            ry="4"
            fill={p.whiteFlower}
            opacity="0.6"
            transform={`rotate(${angle} 130 174)`}
          />
        ))}
        <circle cx="130" cy="174" r="1.4" fill={p.whiteCenter} opacity="0.6" />
      </g>
    </svg>
  );
}
