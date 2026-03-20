import { Building2, Cable, Database, Cog, Thermometer, Activity } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface StepProps {
  icon: React.ElementType;
  label: string;
  delay: number;
}

const steps: StepProps[] = [
  { icon: Building2, label: "Bygning", delay: 0 },
  { icon: Cable, label: "Connectors", delay: 80 },
  { icon: Database, label: "Data", delay: 160 },
  { icon: Cog, label: "AI-regulator", delay: 240 },
  { icon: Activity, label: "Styring", delay: 320 },
  { icon: Thermometer, label: "Rumvarme", delay: 400 },
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

const ArchitectureDiagram = () => {
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  return (
    <section className="bg-os2-surface px-6 py-24 sm:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2
          ref={headingRef}
          className="scroll-reveal text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Sådan hænger det sammen
        </h2>

        {/* Desktop flow */}
        <div className="mt-14 hidden items-center justify-center gap-0 sm:flex">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <Step {...step} />
              {i < steps.length - 1 && <Arrow />}
            </div>
          ))}
        </div>

        {/* Mobile vertical flow */}
        <div className="mt-12 flex flex-col items-center gap-3 sm:hidden">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <Step {...step} />
              {i < steps.length - 1 && (
                <div className="mt-2 flex flex-col items-center">
                  <div className="h-5 w-px bg-os2-grey" />
                  <div className="h-0 w-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-os2-grey" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
