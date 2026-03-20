import { Building2, Thermometer } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HeroSection = () => {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>(150);
  const badgeRef = useScrollReveal<HTMLDivElement>(300);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 sm:px-12 md:pt-40 md:pb-32">
      {/* Subtle background wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, hsl(210 30% 93% / 0.7), transparent)",
        }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <div ref={badgeRef} className="scroll-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          Open Source · Kommunalt ejet
        </div>

        <h1
          ref={titleRef}
          className="scroll-reveal text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          style={{ lineHeight: 1.08 }}
        >
          OS2 AI Heat Control
        </h1>

        <p
          ref={subtitleRef}
          className="scroll-reveal mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Intelligent varmestyring i kommunale bygninger — bygget på åbne
          standarder, fælles data og en referencealgoritme, som markedet kan
          bygge videre på.
        </p>

        <div className="mt-12 flex items-center justify-center gap-3 text-muted-foreground/60">
          <Building2 className="h-5 w-5" />
          <span className="text-xs tracking-widest uppercase">
            Bygning → Data → Algoritme → Styring
          </span>
          <Thermometer className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
