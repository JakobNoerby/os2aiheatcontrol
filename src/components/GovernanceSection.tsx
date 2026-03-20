import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Users, Building2, Wrench, ShieldCheck } from "lucide-react";

interface Role {
  icon: React.ElementType;
  actor: string;
  responsibilities: string[];
  accent: string;
  iconBg: string;
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
    accent: "border-os2-blue/30 bg-os2-blue/[0.03]",
    iconBg: "bg-os2-blue/10 text-os2-blue",
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
    accent: "border-os2-blue/30 bg-os2-blue/[0.03]",
    iconBg: "bg-os2-blue/10 text-os2-blue",
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
    accent: "border-os2-mint/40 bg-os2-mint/[0.04]",
    iconBg: "bg-os2-mint/15 text-foreground/70",
  },
  {
    icon: ShieldCheck,
    actor: "Driftsorganisationen (afklares)",
    responsibilities: [
      "Varetager central drift af fælles infrastruktur (dataplatform, API-gateway)",
      "Driftsmodellen er et åbent punkt — mulige modeller inkluderer:",
      "• OS2-fællesskabet via fælles driftsaftale (som fx OS2kitos)",
      "• En udpeget kommune, der hoster på vegne af de øvrige",
      "• En ekstern leverandør udvalgt via udbud",
      "Skal afklares i fællesskabet som del af governanceprocessen",
    ],
    accent: "border-os2-grey bg-os2-surface/50",
    iconBg: "bg-os2-surface text-muted-foreground",
  },
];

const GovernanceCard = ({ role, index }: { role: Role; index: number }) => {
  const ref = useScrollReveal<HTMLDivElement>(index * 90);
  const Icon = role.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal rounded-lg border p-5 transition-all duration-200 hover:shadow-[0_2px_8px_hsl(210_45%_70%/0.06)]",
        role.accent
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", role.iconBg)}>
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-semibold text-foreground">{role.actor}</h3>
      </div>
      <ul className="space-y-2">
        {role.responsibilities.map((r) => (
          <li key={r} className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-os2-blue/30" />
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
    <section className="bg-os2-surface px-6 py-24 sm:px-12 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2
          ref={headingRef}
          className="scroll-reveal text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Governance & ansvar
        </h2>
        <p
          ref={introRef}
          className="scroll-reveal mt-4 max-w-xl text-sm leading-[1.7] text-muted-foreground sm:text-base"
        >
          Klart ejerskab og tydelige ansvarsområder sikrer, at kerneproduktet
          vedligeholdes, udvikles og driftes bæredygtigt på tværs af
          økosystemet.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {roles.map((role, i) => (
            <GovernanceCard key={role.actor} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;
