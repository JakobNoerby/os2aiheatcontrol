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
      "Byg integrationer til proprietære CTS- og IoT-systemer — fx Schneider, Siemens, Honeywell — og gør dem tilgængelige for alle kommuner.",
  },
  {
    icon: HeadsetIcon,
    title: "Installation, drift & support",
    description:
      "Tilbyd lokal installation, løbende drift og support som service oven på det åbne kerneprodukt.",
  },
  {
    icon: BrainCircuit,
    title: "Avancerede modeller",
    description:
      "Udvikl specialiserede AI/ML-algoritmer, der bygger videre på referencealgoritmen med mere avanceret optimering.",
  },
  {
    icon: BarChart3,
    title: "Analyse & dashboards",
    description:
      "Skab rapportering, benchmarking og visualisering på tværs af bygninger baseret på det fælles datafundament.",
  },
];

const VendorCard = ({ path, index }: { path: VendorPath; index: number }) => {
  const ref = useScrollReveal<HTMLDivElement>(index * 90);
  const Icon = path.icon;

  return (
    <div
      ref={ref}
      className="scroll-reveal rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">{path.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{path.description}</p>
    </div>
  );
};

const VendorSection = () => {
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const introRef = useScrollReveal<HTMLParagraphElement>(60);

  return (
    <section className="px-6 py-20 sm:px-12 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2
          ref={headingRef}
          className="scroll-reveal text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          For leverandører
        </h2>
        <p
          ref={introRef}
          className="scroll-reveal mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Kerneproduktet er åbent og skalerbart — markedet kan bygge videre med
          kommercielle services oven på den fælles ramme.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {paths.map((path, i) => (
            <VendorCard key={path.title} path={path} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
