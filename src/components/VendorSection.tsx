import { Wrench, HeadsetIcon, BrainCircuit, BarChart3 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface VendorPath {
  icon: React.ElementType;
  title: string;
  description: string;
}

const paths: VendorPath[] = [
  {
    icon: Wrench,
    title: "Connectors & integration",
    description:
      "Leverandører af CTS- og IoT-systemer forventes selv at udvikle og vedligeholde connectors efter de åbne connector-specifikationer og det standardiserede API.",
  },
  {
    icon: HeadsetIcon,
    title: "Installation, drift & support",
    description:
      "Flere leverandører kan tilbyde lokal installation, løbende drift og support som service oven på det åbne kerneprodukt — en multi-leverandør-model.",
  },
  {
    icon: BrainCircuit,
    title: "Avancerede modeller",
    description:
      "Udvikl specialiserede AI/ML-algoritmer, der bygger videre på referencealgoritmen for prædiktive setpunkter med mere avanceret optimering.",
  },
  {
    icon: BarChart3,
    title: "Analyse & dashboards",
    description:
      "Skab rapportering, benchmarking og visualisering på tværs af bygninger baseret på den fælles datamodel og åbne ontologier.",
  },
];

const VendorCard = ({ path, index }: { path: VendorPath; index: number }) => {
  const ref = useScrollReveal<HTMLDivElement>(index * 90);
  const Icon = path.icon;

  return (
    <div
      ref={ref}
      className="scroll-reveal rounded-lg border border-os2-grey bg-white p-6 transition-all duration-200 hover:border-os2-blue/40 hover:shadow-[0_2px_8px_hsl(210_45%_70%/0.08)]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-os2-surface text-os2-blue">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{path.title}</h3>
      <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">{path.description}</p>
    </div>
  );
};

const VendorSection = () => {
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const introRef = useScrollReveal<HTMLParagraphElement>(60);

  return (
    <section className="px-6 py-24 sm:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2
          ref={headingRef}
          className="scroll-reveal text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Kommerciel værdi for markedet
        </h2>
        <p
          ref={introRef}
          className="scroll-reveal mt-4 max-w-xl text-sm leading-[1.7] text-muted-foreground sm:text-base"
        >
          Kerneproduktet er åbent og skalerbart. Markedet forventes at bygge
          kommercielle services oven på den fælles platform.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {paths.map((path, i) => (
            <VendorCard key={path.title} path={path} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
