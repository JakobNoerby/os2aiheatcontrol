import { useScrollReveal } from "@/hooks/useScrollReveal";

const IntroSection = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="px-6 py-24 sm:px-12 md:py-32">
      <div ref={ref} className="scroll-reveal mx-auto max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Kerneproduktet
        </h2>

        <div
          className="mt-6 space-y-4 text-base leading-[1.75] text-muted-foreground"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          <p>
            OS2 AI Heat Control er en fælles digital infrastruktur, der gør det
            muligt at indsamle, strukturere og anvende bygningsdata til
            automatisk og driftsegnet varmestyring i kommunal praksis.
          </p>
          <p>
            Løsningen består af en fælles datamodel, standardiserede
            integrationer til bygningens CTS- og IoT-systemer, relevante
            eksterne datakilder og en referencealgoritme, der regulerer
            varmeanlæggets setpunkter og varmekurver — inden for definerede
            tidsplaner og med sikker fallback.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
