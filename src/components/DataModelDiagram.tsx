import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface Entity {
  name: string;
  fields: string[];
  color: "primary" | "accent" | "muted";
}

const entities: Entity[] = [
  {
    name: "Bygning",
    fields: ["id", "adresse", "kommune", "type", "areal_m2"],
    color: "primary",
  },
  {
    name: "Rum",
    fields: ["id", "bygning_id", "etage", "funktion"],
    color: "primary",
  },
  {
    name: "Sensor",
    fields: ["id", "rum_id", "type", "enhed"],
    color: "accent",
  },
  {
    name: "Temperaturmåling",
    fields: ["sensor_id", "tidspunkt", "værdi_°C"],
    color: "accent",
  },
  {
    name: "Vejrdata",
    fields: ["tidspunkt", "lokation", "udetemperatur", "vind", "sol"],
    color: "accent",
  },
  {
    name: "Tidsplan",
    fields: ["bygning_id", "ugedag", "start", "slut", "target_°C"],
    color: "muted",
  },
  {
    name: "Setpunkt",
    fields: ["bygning_id", "tidspunkt", "fremløb_°C", "varmekurve"],
    color: "muted",
  },
  {
    name: "Fallback",
    fields: ["bygning_id", "strategi", "min_°C", "max_°C"],
    color: "muted",
  },
];

const colorMap = {
  primary: "border-primary/30 bg-primary/5",
  accent: "border-accent/30 bg-accent/5",
  muted: "border-border bg-muted/40",
} as const;

const headerColorMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  muted: "bg-muted text-muted-foreground",
} as const;

const EntityCard = ({ entity, index }: { entity: Entity; index: number }) => {
  const ref = useScrollReveal<HTMLDivElement>(index * 70);

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal overflow-hidden rounded-lg border shadow-sm",
        colorMap[entity.color]
      )}
    >
      <div className={cn("px-3 py-2 text-xs font-semibold tracking-wide uppercase", headerColorMap[entity.color])}>
        {entity.name}
      </div>
      <ul className="px-3 py-2 space-y-0.5">
        {entity.fields.map((field) => (
          <li key={field} className="text-xs text-muted-foreground font-mono">
            {field}
          </li>
        ))}
      </ul>
    </div>
  );
};

const GroupLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
    {children}
  </span>
);

const DataModelDiagram = () => {
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const introRef = useScrollReveal<HTMLParagraphElement>(60);

  const structure = entities.slice(0, 2);
  const dynamic = entities.slice(2, 5);
  const control = entities.slice(5);

  return (
    <section className="bg-muted/30 px-6 py-20 sm:px-12 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h2
          ref={headingRef}
          className="scroll-reveal text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Datamodellen
        </h2>
        <p
          ref={introRef}
          className="scroll-reveal mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          De centrale dataentiteter, der udgør fundamentet for intelligent
          varmestyring på tværs af kommuner og bygninger.
        </p>

        <div className="mt-12 space-y-8">
          {/* Structure */}
          <div>
            <GroupLabel>Struktur</GroupLabel>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {structure.map((e, i) => (
                <EntityCard key={e.name} entity={e} index={i} />
              ))}
            </div>
          </div>

          {/* Dynamic data */}
          <div>
            <GroupLabel>Dynamiske data</GroupLabel>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {dynamic.map((e, i) => (
                <EntityCard key={e.name} entity={e} index={i + 2} />
              ))}
            </div>
          </div>

          {/* Control */}
          <div>
            <GroupLabel>Styring</GroupLabel>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {control.map((e, i) => (
                <EntityCard key={e.name} entity={e} index={i + 5} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataModelDiagram;
