import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Users, Building2, Wrench, ShieldCheck } from "lucide-react";

interface Role {
  icon: React.ElementType;
  actor: string;
  responsibilities: string[];
  color: "primary" | "accent" | "muted";
}

const roles: Role[] = [
  {
    icon: Users,
    actor: "OS2-fællesskabet",
    responsibilities: [
      "Ejer og styrer kerneproduktet (datamodel, referencealgoritme, connector-specifikationer)",
      "Definerer roadmap og prioriterer udvikling via governance-board",
      "Sikrer åben licens, dokumentation og kvalitetskrav",
      "Faciliterer videndeling og erfaringsudveksling mellem kommuner",
    ],
    color: "primary",
  },
  {
    icon: Building2,
    actor: "Kommunerne",
    responsibilities: [
      "Implementerer og drifter løsningen i egne bygninger",
      "Bidrager med krav, testdata og feedback til fællesskabet",
      "Godkender løsningen ift. lokal IT-sikkerhedspolitik",
      "Kan vælge leverandør til installation, drift og support",
    ],
    color: "primary",
  },
  {
    icon: Wrench,
    actor: "Leverandører (CTS/IoT)",
    responsibilities: [
      "Udvikler og vedligeholder egne connectors til den åbne platform",
      "Tilbyder installation, drift, support og avancerede modeller som kommerciel service",
      "Overholder connector-specifikationer og kvalitetskrav fra OS2",
      "Bidrager til fælles test- og certificeringsproces",
    ],
    color: "accent",
  },
  {
    icon: ShieldCheck,
    actor: "Driftsorganisationen",
    responsibilities: [
      "Varetager central drift af fælles infrastruktur (dataplatform, API-gateway)",
      "Monitorerer oppetid, sikkerhed og performance",
      "Håndterer incident management og eskalering",
      "Koordinerer opdateringer og releases med OS2-fællesskabet",
    ],
    color: "muted",
  },
];

const colorMap = {
  primary: "border-primary/25 bg-primary/[0.03]",
  accent: "border-accent/25 bg-accent/[0.03]",
  muted: "border-border bg-muted/30",
} as const;

const iconBgMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  muted: "bg-muted text-muted-foreground",
} as const;

const GovernanceCard = ({ role, index }: { role: Role; index: number }) => {
  const ref = useScrollReveal<HTMLDivElement>(index * 90);
  const Icon = role.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal rounded-xl border p-5 shadow-sm transition-shadow duration-200 hover:shadow-md",
        colorMap[role.color]
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", iconBgMap[role.color])}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <h3 className="text-sm font-semibold text-foreground">{role.actor}</h3>
      </div>
      <ul className="space-y-1.5">
        {role.responsibilities.map((r) => (
          <li key={r} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
};

const GovernanceSection = () => {
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const introRef = useScrollReveal<HTMLParagraphElement>(60);

  return (
    <section className="px-6 py-20 sm:px-12 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2
          ref={headingRef}
          className="scroll-reveal text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Governance & ansvar
        </h2>
        <p
          ref={introRef}
          className="scroll-reveal mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Klart ejerskab og tydelige ansvarsområder sikrer, at kerneproduktet
          vedligeholdes, udvikles og driftes bæredygtigt på tværs af
          økosystemet.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {roles.map((role, i) => (
            <GovernanceCard key={role.actor} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;
