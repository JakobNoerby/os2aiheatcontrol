import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

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

        {/* Legend */}
        <div className="scroll-reveal mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          {(["rec", "brick", "os2"] as const).map((key) => {
            const b = ontologyBadge[key];
            return (
              <span key={key} className="flex items-center gap-1.5">
                <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", b.className)}>{b.label}</span>
                {key === "rec" && "RealEstateCore"}
                {key === "brick" && "Brick Schema"}
                {key === "os2" && "OS2-udvidelse"}
              </span>
            );
          })}
        </div>

        <div className="mt-10 space-y-8">
          {/* Structure — RealEstateCore */}
          <div>
            <GroupLabel>Struktur (RealEstateCore)</GroupLabel>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {structure.map((e, i) => (
                <EntityCard key={e.name} entity={e} index={i} />
              ))}
            </div>
          </div>

          {/* Dynamic data — Brick */}
          <div>
            <GroupLabel>Sensordata & tidsserier (Brick Schema)</GroupLabel>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {dynamic.map((e, i) => (
                <EntityCard key={e.name} entity={e} index={i + 2} />
              ))}
            </div>
          </div>

          {/* Control — OS2 extension */}
          <div>
            <GroupLabel>Styring (OS2-udvidelse)</GroupLabel>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {control.map((e, i) => (
                <EntityCard key={e.name} entity={e} index={i + 5} />
              ))}
            </div>
          </div>
        </div>

        {/* Relationship note */}
        <div className="mt-10 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          <p className="font-medium text-foreground">Relationer</p>
          <ul className="mt-2 space-y-1 text-xs font-mono">
            <li>rec:Building → rec:hasPoint → brick:Temperature_Sensor</li>
            <li>rec:Room → rec:locatedIn → rec:Building</li>
            <li>brick:Temperature_Sensor → brick:isPointOf → rec:Room</li>
            <li>brick:Temperature_Sensor → brick:hasTimeseriesId → brick:TimeseriesReference</li>
            <li>os2:Schedule → rec:servesBuilding → rec:Building</li>
            <li>os2:Setpoint → rec:servesBuilding → rec:Building</li>
          </ul>
          <div className="mt-3 flex gap-4 text-xs">
            <a href="https://docs.brickschema.org/extra/brick-rec.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-foreground transition-colors">
              Brick + REC integration <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataModelDiagram;
