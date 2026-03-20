import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink } from "lucide-react";
import RelationshipGraph from "@/components/RelationshipGraph";

const DataModelDiagram = () => {
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const introRef = useScrollReveal<HTMLParagraphElement>(60);

  return (
    <section className="px-6 py-24 sm:px-12 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2
          ref={headingRef}
          className="scroll-reveal text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Datamodellen
        </h2>
        <p
          ref={introRef}
          className="scroll-reveal mx-auto mt-4 max-w-xl text-center text-sm leading-[1.7] text-muted-foreground sm:text-base"
        >
          Baseret på{" "}
          <a
            href="https://brickschema.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-3 decoration-os2-blue/40 hover:decoration-os2-blue transition-colors"
          >
            Brick Schema
          </a>{" "}
          og{" "}
          <a
            href="https://www.realestatecore.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-3 decoration-os2-blue/40 hover:decoration-os2-blue transition-colors"
          >
            RealEstateCore
          </a>{" "}
          — åbne ontologier for bygningsdata. OS2-specifikke styringsklasser
          udvider standarden for kommunal varmestyring.
        </p>

        <RelationshipGraph />

        <div className="mt-4 flex justify-center text-xs">
          <a
            href="https://docs.brickschema.org/extra/brick-rec.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground underline underline-offset-3 decoration-os2-grey hover:text-foreground transition-colors"
          >
            Brick + REC integration <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DataModelDiagram;
