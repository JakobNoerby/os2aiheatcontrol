# Tilpas øvrige sektioner med ny viden

Grundelementer og Governance er allerede opdateret. Nu skal resten af sektionerne afspejle den samme viden — prædiktive setpunkter, API-baseret connector-lag, multi-leverandør, NIS2, fallback osv.

## Ændringer

### 1. Navbar.tsx — fjern "Arkitektur"-link og omdøb "Leverandører"

- Fjern `{ label: "Arkitektur", href: "#arkitektur" }` fra navItems (arkitektur-sektionen er allerede fjernet)
- Omdøb "Leverandører" til "Markedet"

### 2. HeroSection.tsx — præcisér undertekst

Opdater subtitle fra den nuværende generelle formulering til noget der afspejler de konkrete elementer: prædiktive setpunkter, fælles datamodel baseret på åbne ontologier, og en platform markedet kan bygge videre på.

### 3. IntroSection.tsx — opdater brødtekst

- Afsnit 1: Tilføj at løsningen bygger på data fra CTS-anlæg og IoTs-sensorer, der sender prædiktive setpunkter til bygningsautomatik
- Afsnit 2: Nævn at referencealgoritmen styrer fremløbstemperatur for varmesløjfer med robust fallback, og at connectors udstiller et API
- Afsnit 3: Nævn BrickSchema/RealEstateCore som de konkrete standarder

### 4. VendorSection.tsx — opdater intro-tekst og kort-beskrivelser

- Intro: Tilpas til "markedet forventes at"-vinklen
- "Connectors & integration": Præcisér at leverandører forventes selv at udvikle connectors efter de åbne connector-specifikationer
- "Installation, drift & support": Tilføj at flere leverandører kan tilbyde dette (multi-leverandør)
- "Avancerede modeller": Nævn at de bygger videre på referencealgoritmen for prædiktive setpunkter
- "Analyse & dashboards": Nævn at det bygger på den fælles datamodel baseret på åbne ontologier



## Berørte filer

- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/IntroSection.tsx`
- `src/components/VendorSection.tsx`
- `src/components/DataModelDiagram.tsx`