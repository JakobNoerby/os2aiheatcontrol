import { Building2, Cable, Database, Cog, Zap, Network, Plug, Laptop } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface StepProps {
  icon: React.ElementType;
  label: string;
  delay: number;
}

const powerSteps: StepProps[] = [
  { icon: Zap, label: "Kraftværk", delay: 0 },
  { icon: Network, label: "Elnet", delay: 80 },
  { icon: Plug, label: "Stikkontakt", delay: 160 },
  { icon: Laptop, label: "Apparat", delay: 240 },
];

const dataSteps: StepProps[] = [
  { icon: Building2, label: "Bygning", delay: 0 },
  { icon: Cable, label: "Connectors", delay: 80 },
  { icon: Database, label: "Fælles datamodel", delay: 160 },
  { icon: Cog, label: "Løsning", delay: 240 },
];

const Step = ({ icon: Icon, label, delay }: StepProps) => {
  const ref = useScrollReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className="scroll-reveal flex flex-col items-center gap-2">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-os2-grey bg-white">
        <Icon className="h-5 w-5 text-os2-blue" />
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

const Arrow = () => (
  <div className="hidden items-center sm:flex">
    <div className="h-px w-6 bg-os2-grey md:w-10" />
    <div className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-os2-grey" />
  </div>
);

const VerticalArrow = () => (
  <div className="flex flex-col items-center">
    <div className="h-5 w-px bg-os2-grey" />
    <div className="h-0 w-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-os2-grey" />
  </div>
);

const FlowRow = ({ steps: rowSteps, label }: { steps: StepProps[]; label: string }) => {
  const labelRef = useScrollReveal<HTMLSpanElement>();
  return (
    <div className="flex flex-col items-center gap-3">
      <span ref={labelRef} className="scroll-reveal text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="hidden items-center justify-center gap-0 sm:flex">
        {rowSteps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <Step {...step} />
            {i < rowSteps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 sm:hidden">
        {rowSteps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center">
            <Step {...step} />
            {i < rowSteps.length - 1 && <VerticalArrow />}
          </div>
        ))}
      </div>
    </div>
  );
};

const StandardAnalogySection = () => {
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  return (
    <section className="bg-os2-surface px-6 py-24 sm:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2
          ref={headingRef}
          className="scroll-reveal mb-10 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Standardisering er forudsætningen
        </h2>

        <div className="flex flex-col gap-10">
          <FlowRow steps={powerSteps} label="Strøminfrastruktur" />
          <FlowRow steps={dataSteps} label="Datainfrastruktur" />
        </div>

        <p className="scroll-reveal mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
          Ligesom stikkontakten standardiserer adgangen til strøm, standardiserer den fælles datamodel adgangen til bygningsdata.
        </p>
      </div>
    </section>
  );
};

export default StandardAnalogySection;
