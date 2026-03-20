import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import RelationshipGraph from "@/components/RelationshipGraph";

interface Entity {
  name: string;
  ontology: "rec" | "brick" | "os2";
  fields: string[];
  color: "primary" | "accent" | "muted";
}

const entities: Entity[] = [
  {
    name: "rec:Building",
    ontology: "rec",
    fields: ["identifier", "address", "municipality", "grossArea"],
    color: "primary",
  },
  {
    name: "rec:Room",
    ontology: "rec",
    fields: ["identifier", "rec:locatedIn → Building", "floor", "usageFunction"],
    color: "primary",
  },
  {
    name: "brick:Temperature_Sensor",
    ontology: "brick",
    fields: ["identifier", "brick:isPointOf → Room", "unit (°C)", "brick:hasTimeseriesId"],
    color: "accent",
  },
  {
    name: "brick:Weather_Station",
    ontology: "brick",
    fields: ["identifier", "location", "brick:hasPoint → Outside_Air_Temperature", "wind", "solar"],
    color: "accent",
  },
  {
    name: "brick:TimeseriesReference",
    ontology: "brick",
    fields: ["timeseriesId", "storedAt (URI)", "timestamp", "value"],
    color: "accent",
  },
  {
    name: "os2:Schedule",
    ontology: "os2",
    fields: ["rec:servesBuilding", "dayOfWeek", "startTime", "endTime", "targetTemp_°C"],
    color: "muted",
  },
  {
    name: "os2:Setpoint",
    ontology: "os2",
    fields: ["rec:servesBuilding", "timestamp", "supplyTemp_°C", "heatingCurve"],
    color: "muted",
  },
  {
    name: "os2:FallbackStrategy",
    ontology: "os2",
    fields: ["rec:servesBuilding", "strategy", "minTemp_°C", "maxTemp_°C"],
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

const ontologyBadge = {
  rec: { label: "REC", className: "bg-primary/15 text-primary" },
  brick: { label: "Brick", className: "bg-accent/15 text-accent" },
  os2: { label: "OS2", className: "bg-muted-foreground/15 text-muted-foreground" },
} as const;

const EntityCard = ({ entity, index }: { entity: Entity; index: number }) => {
  const ref = useScrollReveal<HTMLDivElement>(index * 70);
  const badge = ontologyBadge[entity.ontology];

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal overflow-hidden rounded-lg border shadow-sm",
        colorMap[entity.color]
      )}
    >
      <div className={cn("flex items-center justify-between px-3 py-2", headerColorMap[entity.color])}>
        <span className="text-xs font-semibold tracking-wide">{entity.name}</span>
        <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", badge.className)}>
          {badge.label}
        </span>
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
          Baseret på{" "}
          <a href="https://brickschema.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Brick Schema
          </a>{" "}
          og{" "}
          <a href="https://www.realestatecore.io" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
            RealEstateCore
          </a>{" "}
          — åbne ontologier for bygningsdata. OS2-specifikke styringsklasser
          udvider standarden for kommunal varmestyring.
        </p>

        {/* Visual relationship graph */}
        <RelationshipGraph />

        <div className="mt-4 flex justify-center text-xs">
          <a href="https://docs.brickschema.org/extra/brick-rec.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
            Brick + REC integration <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DataModelDiagram;
