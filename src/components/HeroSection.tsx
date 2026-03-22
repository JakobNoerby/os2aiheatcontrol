import { Building2, Thermometer } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HeroSection = () => {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>(150);
  const badgeRef = useScrollReveal<HTMLDivElement>(300);

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 sm:px-12 md:pt-40 md:pb-32">
      {/* Subtle background shape */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-os2-mint/20 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-os2-blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div
          ref={badgeRef}
          className="scroll-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-os2-grey bg-os2-surface px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-os2-mint" />
          Open Source · Kommunalt ejet
        </div>

        <h1
          ref={titleRef}
          className="scroll-reveal text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]"
          style={{ lineHeight: 1.15 }}
        >
          OS2 AI Heat Control
        </h1>

        <p
          ref={subtitleRef}
          className="scroll-reveal mt-6 max-w-lg text-pretty text-base leading-[1.7] text-muted-foreground sm:text-lg"
        >
          Intelligent varmestyring i kommunale bygninger — bygget på åbne
          standarder, fælles data og en referencealgoritme, som markedet kan
          bygge videre på.
        </p>

        <div className="scroll-reveal mt-10 flex items-center gap-3 text-muted-foreground/50">
          <Building2 className="h-4 w-4" />
          <span className="text-xs font-medium tracking-widest uppercase">
            Bygning → Data → Algoritme → Styring
          </span>
          <Thermometer className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
};
