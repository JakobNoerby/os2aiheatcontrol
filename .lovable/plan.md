

# Tilføj strøm-analogi visualisering

Tilføj en visuel analogi-sektion der viser parallellen mellem el-infrastruktur og OS2's datainfrastruktur — side om side. Placeres i `ArchitectureDiagram.tsx` under den eksisterende arkitektur-flow som en supplerende illustration.

## Design

To parallelle flow-diagrammer i samme stil som det eksisterende (cirkler med ikoner og pile):

**Strøm-analogi:**
Kraftværk → Elnet → Stikontakt → Apparat

**OS2-parallel:**
Bygning → Connectors → Fælles datamodel → Løsning

En kort overskrift over de to rækker, f.eks. *"Standardisering er forudsætningen"*, og en diskret label på hver række ("Strøminfrastruktur" / "Datainfrastruktur").

## Teknisk tilgang

- Udvid `ArchitectureDiagram.tsx` med en ny sektion under den eksisterende flow
- Genbruger `Step` og `Arrow` komponenterne med passende ikoner (Zap, Network, Plug, Laptop for strøm; Building2, Cable, Database, Cog for data)
- Samme visuelle stil — cirkel-ikoner, pile, scroll-reveal
- Responsiv: vandret på desktop, lodret på mobil
- Adskilt fra hoveddiagrammet med lidt ekstra spacing og en lille overskrift

## Berørte filer
- `src/components/ArchitectureDiagram.tsx` — tilføj analogi-sektion

