# Uddyb beskrivelser på tværs af sektioner

Brugeren ønsker mere dybde omkring fire temaer: fælles datamodel/standardisering, Brick+REC som "fælles stikontakt", connector-specifikationer, og governance/livscyklus. Disse temaer er allerede spredt over flere sektioner, men beskrivelserne er korte og mangler den bredere kontekst om *hvorfor* standardisering er afgørende (jf. AI Award-opslaget).

## Ændringer

### 1. IntroSection — tilføj standardiserings-narrativ

Tilføj et tredje afsnit efter de eksisterende to, der forankrer produktet i den bredere pointe om standardisering som forudsætning for skalering. Kort og sagligt — ikke et citat, men budskabet destilleret:

> *Ligesom standardiserede stikontakter, internetprotokoller og regnskabsformater er forudsætningen for, at teknologi kan skalere, bygger OS2 AI Heat Control på åbne standarder og fælles semantik. Det er fundamentet, der gør løsningen genbrugelig, sammenlignelig og leverandøruafhængig.*

### 2. GrundelementerSection — uddyb detail-tekster

**Datafundamentet** — udvid detail med reference til standardisering af formater og semantik:

> Tilføj: "Datamodellen standardiserer formater, begreber og semantik på tværs af bygninger og kommuner — så data ikke blot indsamles, men kan forstås og sammenlignes ensartet."

**Connector-laget** — udvid detail med connector-specifikationer og leverandørtilkobling:

> Tilføj: "Connector-specifikationerne fungerer som en åben kontrakt: de definerer præcist, hvilke data der skal leveres, i hvilket format og med hvilken frekvens. Det gør det muligt for leverandører af CTS- og IoT-systemer at koble sig på platformen uden unødig tredjeparts integration."

### 3. DataModelDiagram — uddyb Brick+REC-beskrivelsen

Udvid intro-teksten under "Datamodellen" med en ekstra sætning der forklarer *hvorfor* åbne ontologier er valgt:

> Tilføj efter nuværende tekst: "Ved at basere datamodellen på etablerede, åbne ontologier undgår løsningen proprietære dataformater og sikrer, at bygningsdata kan deles, beriges og genbruges på tværs af systemer og leverandører — en fælles 'ordbog' for bygningsdata."

### 4. GovernanceSection — uddyb intro-teksten

Udvid intro-afsnittet med en sætning om livscyklus og kvalitetskrav:

> Udvid til: "Klart ejerskab og tydelige ansvarsområder sikrer, at kerneproduktet vedligeholdes, udvikles og driftes bæredygtigt på tværs af økosystemet. Governance dækker hele livscyklussen — fra datakontrakter og kvalitetskrav til versionering, sikkerhed og løbende vedligehold af den fælles standard."

## Berørte filer

- `src/components/IntroSection.tsx` — nyt afsnit
- `src/components/GrundelementerSection.tsx` — opdater detail-tekst for Datafundamentet og Connector-laget
- `src/components/DataModelDiagram.tsx` — udvid intro-tekst
- `src/components/GovernanceSection.tsx` — udvid intro-tekst

Alle ændringer er rent tekstmæssige — ingen strukturelle eller visuelle ændringer.