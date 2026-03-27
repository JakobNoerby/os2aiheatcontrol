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
            OS2 AI Heat Control er en fælles digital infrastruktur, der
            indsamler og strukturerer data fra CTS-anlæg og IoT-sensorer og
            anvender dem til prædiktiv varmestyring i kommunale bygninger.
          </p>
          <p>
            En referencealgoritme beregner prædiktive setpunkter for
            fremløbstemperatur på varmesløjfer (radiator- og gulvvarmeanlæg)
            — inden for definerede tidsplaner og med robust fallback.
            Connectors udstiller et åbent API, så data kan sendes til og
            modtages fra bygningsautomatikken.
          </p>
          <p>
            Datamodellen bygger på de åbne ontologier{" "}
            <strong>BrickSchema</strong> og <strong>RealEstateCore</strong>{" "}
            — en fælles semantik, der gør løsningen genbrugelig,
            sammenlignelig og leverandøruafhængig, ligesom standardiserede
            stikontakter og internetprotokoller er forudsætningen for at
            teknologi kan skalere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
