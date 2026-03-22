import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Abstract hero illustration: a stylised flow from building → data → algorithm → comfort,
 * rendered as layered geometric shapes using the OS2 colour palette.
 */
const HeroIllustration = () => {
  const ref = useScrollReveal<HTMLDivElement>(200);

  return (
    <div ref={ref} className="scroll-reveal">
      <svg
        viewBox="0 0 520 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-lg"
        aria-hidden="true"
      >
        {/* Background soft shapes */}
        <circle cx="90" cy="130" r="90" fill="hsl(180 22% 80% / .25)" />
        <circle cx="430" cy="130" r="90" fill="hsl(210 46% 69% / .2)" />
        <rect x="140" y="80" width="240" height="100" rx="50" fill="hsl(0 0% 97.3%)" />

        {/* Connecting flow line */}
        <path
          d="M90 130 C160 130, 160 130, 200 130 C240 130, 280 130, 320 130 C360 130, 360 130, 430 130"
          stroke="hsl(210 46% 69%)"
          strokeWidth="2"
          strokeDasharray="6 4"
          opacity="0.6"
        />

        {/* Node 1 — Building */}
        <g>
          <circle cx="90" cy="130" r="32" fill="white" stroke="hsl(0 0% 81.6%)" strokeWidth="1.5" />
          {/* Simple building icon */}
          <rect x="78" y="120" width="24" height="20" rx="2" fill="none" stroke="hsl(210 46% 69%)" strokeWidth="1.8" />
          <line x1="90" y1="112" x2="78" y2="120" stroke="hsl(210 46% 69%)" strokeWidth="1.8" />
          <line x1="90" y1="112" x2="102" y2="120" stroke="hsl(210 46% 69%)" strokeWidth="1.8" />
          {/* Windows */}
          <rect x="83" y="125" width="4" height="4" rx="0.5" fill="hsl(210 46% 69%)" opacity="0.5" />
          <rect x="93" y="125" width="4" height="4" rx="0.5" fill="hsl(210 46% 69%)" opacity="0.5" />
          <rect x="83" y="132" width="4" height="4" rx="0.5" fill="hsl(210 46% 69%)" opacity="0.5" />
          <rect x="93" y="132" width="4" height="4" rx="0.5" fill="hsl(210 46% 69%)" opacity="0.5" />
        </g>

        {/* Node 2 — Data */}
        <g>
          <circle cx="220" cy="130" r="28" fill="white" stroke="hsl(0 0% 81.6%)" strokeWidth="1.5" />
          {/* Database icon */}
          <ellipse cx="220" cy="120" rx="12" ry="5" fill="none" stroke="hsl(180 22% 80%)" strokeWidth="1.8" />
          <path d="M208 120 L208 138 C208 141, 220 143, 220 143 C220 143, 232 141, 232 138 L232 120" fill="none" stroke="hsl(180 22% 80%)" strokeWidth="1.8" />
          <path d="M208 128 C208 131, 220 133, 220 133 C220 133, 232 131, 232 128" fill="none" stroke="hsl(180 22% 80%)" strokeWidth="1.2" opacity="0.5" />
        </g>

        {/* Node 3 — Algorithm / AI */}
        <g>
          <circle cx="330" cy="130" r="28" fill="white" stroke="hsl(0 0% 81.6%)" strokeWidth="1.5" />
          {/* Gear icon */}
          <circle cx="330" cy="130" r="8" fill="none" stroke="hsl(210 46% 69%)" strokeWidth="1.8" />
          <circle cx="330" cy="130" r="3" fill="hsl(210 46% 69%)" opacity="0.4" />
          {/* Gear teeth */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 330 + Math.cos(rad) * 10;
            const y1 = 130 + Math.sin(rad) * 10;
            const x2 = 330 + Math.cos(rad) * 14;
            const y2 = 130 + Math.sin(rad) * 14;
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(210 46% 69%)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Node 4 — Comfort / Thermometer */}
        <g>
          <circle cx="430" cy="130" r="32" fill="white" stroke="hsl(0 0% 81.6%)" strokeWidth="1.5" />
          {/* Thermometer */}
          <rect x="426" y="112" width="8" height="24" rx="4" fill="none" stroke="hsl(180 22% 80%)" strokeWidth="1.8" />
          <circle cx="430" cy="140" r="6" fill="none" stroke="hsl(180 22% 80%)" strokeWidth="1.8" />
          <rect x="428" y="118" width="4" height="14" rx="2" fill="hsl(180 22% 80%)" opacity="0.4" />
          <circle cx="430" cy="140" r="3.5" fill="hsl(180 22% 80%)" opacity="0.4" />
        </g>

        {/* Labels */}
        <text x="90" y="178" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontWeight="500">Bygning</text>
        <text x="220" y="174" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontWeight="500">Data</text>
        <text x="330" y="174" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontWeight="500">Algoritme</text>
        <text x="430" y="178" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontWeight="500">Komfort</text>

        {/* Small directional arrows on flow line */}
        <polygon points="152,127 158,130 152,133" fill="hsl(210 46% 69%)" opacity="0.5" />
        <polygon points="272,127 278,130 272,133" fill="hsl(210 46% 69%)" opacity="0.5" />
        <polygon points="378,127 384,130 378,133" fill="hsl(210 46% 69%)" opacity="0.5" />
      </svg>
    </div>
  );
};

export default HeroIllustration;
