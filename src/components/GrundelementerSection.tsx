import { useState } from "react";
import { Database, Cog, Cable, ShieldCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CorePart {
  icon: React.ElementType;
  title: string;
  summary: string;
  detail: string;
}

const parts: CorePart[] = [
  {
    icon: Database,
    title: "Datafundamentet",
    summary:
      "En fælles datamodel for de minimumsdata, der er nødvendige for intelligent varmestyring.",
    detail:
      "Data fra CTS-anlæg på anvendersiden er en forudsætning for, at produktet kan fungere. Historiske data, rumtemperatur og vejrdata udgør fundamentet for at kunne arbejde ensartet, sammenligneligt og skalerbart på tværs af kommuner og bygninger.\n\nDatamodellen standardiserer formater, begreber og semantik, så data ikke blot indsamles, men kan forstås og sammenlignes ensartet.\n\nModellen skal opbygges så simpelt som muligt med modulær opbygning og tage udgangspunkt i open source-standarder og ontologier som BrickSchema og Real Estate Core. IoT Lab ved Aarhus Kommune arbejder parallelt med en datamodel, som projektet er i dialog med.",
  },
  {
    icon: Cog,
    title: "Reguleringsmotoren",
    summary:
      "En fælles referencealgoritme, som sender prædiktive setpunkter til bygningsautomatik for fremløbstemperatur af varmesløjfer (radiator- og gulvvarmeanlæg).",
    detail:
      "Reguleringsmotoren anvender målt rumtemperatur, vejrdata, historik og tidsplaner til at beregne optimale setpunkter for fremløbstemperatur og varmekurver.\n\nEn robust fallback-strategi er en central del af styringslogikken, så bygningerne altid har en sikker driftstilstand.\n\nDermed er kerneproduktet ikke kun data og integrationer, men også en basal, fungerende styringslogik.",
  },
  {
    icon: Cable,
    title: "Connector-laget",
    summary:
      "Standardiserede integrationer til CTS- og IoT-systemer samt eksterne datakilder.",
    detail:
      "Connector-laget gør det muligt at koble lokale bygningsinstallationer ind i en fælles ramme og reducerer afhængigheden af proprietære løsninger.\n\nConnector-specifikationerne fungerer som en åben kontrakt: de definerer præcist, hvilke data der skal leveres, i hvilket format og med hvilken frekvens. Det gør det transparent for leverandører at anvende løsningen i praksis.\n\nLøsningen bygger på kendte komponenter og kan udstille et API, der sender og modtager data til referencealgoritmen. Connector-laget har indbyggede krav til datamodellering.",
  },
  {
    icon: ShieldCheck,
    title: "Implementerbarhed og drift",
    summary:
      "Kommunal driftsegnethed, cybersikkerhed og lave implementeringsomkostninger.",
    detail:
      "Kerneproduktet skal ikke kun være teknisk velfunderet — det skal også kunne implementeres enkelt, driftes økonomisk og godkendes i kommunal praksis.\n\nDer skal tages stilling til NIS2-compliance, herunder en generel vurdering af, hvad der udgør kritisk infrastruktur i løsningen. Senere i projektet planlægges et cybersecurity-review af den samlede løsning.\n\nLøsningen skal kunne implementeres af flere leverandører med krav om fuld dataportabilitet mellem leverandører. OS2-fællesskabet fungerer som steward på GitHub-repositoryet, og der er mulighed for hosting ved OS2 med hver kommune som tenant — hvor kommunerne selv kan beslutte, hvor data opbevares.\n\nDefinitionen af opdateret kildekode skal være klar for kommende udviklingspartnere.",
  },
];

const CorePartCard = ({ part, index }: { part: CorePart; index: number }) => {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal<HTMLButtonElement>(index * 100);
  const Icon = part.icon;

  return (
    <button
      ref={ref}
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "scroll-reveal group w-full rounded-lg border border-os2-grey bg-white p-6 text-left transition-all duration-200",
        "hover:border-os2-blue/40 hover:shadow-[0_2px_8px_hsl(210_45%_70%/0.08)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-os2-blue focus-visible:ring-offset-2",
        "active:scale-[0.98]"
      )}
    >
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-os2-surface text-os2-blue">
          <Icon className="h-5 w-5" />
        </span>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              {part.title}
            </h3>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {part.summary}
          </p>

          <div
            className={cn(
              "grid transition-all duration-300 ease-out",
              open
                ? "mt-3 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <p className="text-sm leading-relaxed text-muted-foreground/80">
                {part.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

const GrundelementerSection = () => {
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  return (
    <section className="px-6 py-24 sm:px-12 md:py-32">
      <div className="mx-auto max-w-2xl">
        <h2
          ref={headingRef}
          className="scroll-reveal text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          De fire grundelementer
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          {parts.map((part, i) => (
            <CorePartCard key={part.title} part={part} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrundelementerSection;
