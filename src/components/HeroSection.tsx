import { Building2, Thermometer } from "lucide-react";
import os2Logo from "@/assets/os2-logo.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HeroSection = () => {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>(150);
  const badgeRef = useScrollReveal<HTMLDivElement>(300);

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-28 sm:px-12 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left column — text */}
          <div>
            <div ref={badgeRef} className="scroll-reveal mb-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Open Source · Kommunalt ejet
            </div>

            <h1
              ref={titleRef}
              className="scroll-reveal text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
              style={{ lineHeight: 1.12 }}
            >
              OS2 AI Heat Control
            </h1>

            <p
              ref={subtitleRef}
              className="scroll-reveal mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Intelligent varmestyring i kommunale bygninger — bygget på åbne
              standarder, fælles data og en referencealgoritme, som markedet kan
              bygge videre på.
            </p>

            <div className="scroll-reveal mt-8 flex items-center gap-3 text-muted-foreground/60">
              <Building2 className="h-5 w-5" />
              <span className="text-xs tracking-widest uppercase">
                Bygning → Data → Algoritme → Styring
              </span>
              <Thermometer className="h-5 w-5" />
            </div>
          </div>

          {/* Right column — decorative illustration area */}
          <div className="hidden items-center justify-center md:flex">
            <div className="relative flex h-64 w-full flex-col items-center justify-center gap-6 rounded-2xl bg-secondary">
              <img src={os2Logo} alt="OS2 — offentligt digitaliseringsfællesskab" className="h-16 w-auto" />
              <div className="flex items-center gap-4 text-muted-foreground/30">
                <Building2 className="h-10 w-10" />
                <Thermometer className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
