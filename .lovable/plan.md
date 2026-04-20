

## Tilføj varmesystem til Relationsdiagrammet

Diagrammet skal udvides med en `brick:HVAC_Zone` (varmesystem), der forsyner rummet, og som `os2:Setpoint` og `os2:FallbackStrategy` styrer.

### Ændringer

**1. `src/components/RelationshipGraph.tsx` — opdater `defaultNodes` og `defaultEdges`**

Tilføj én ny node og fire nye/ændrede kanter:

- **Ny node:** `brick:HVAC_Zone` (label "Varmesystem"-konceptet, ontologi `brick`) placeret mellem `rec:Room` og `os2:Setpoint`/`os2:FallbackStrategy`.
- **Nye kanter:**
  - `hvac → room` med label `feeds` (varmesystemet forsyner rummet)
  - `hvac → building` med label `isPartOf` (varmesystemet er del af bygningen)
  - `setpoint → hvac` med label `controls` (setpunkt styrer varmesystemet)
  - `fallback → hvac` med label `controls` (fallback-strategi styrer varmesystemet)
- **Fjern:** de eksisterende `setpoint → building (servesBuilding)` og `fallback → building (servesBuilding)` kanter, da de erstattes af forbindelsen via varmesystemet. `os2:Schedule → building` bevares.

Layout-koordinater justeres så den nye node ligger logisk mellem rummet og styringselementerne uden at overlappe.

**2. Database (`diagrams`-tabel, række `id = 'default'`)**

Komponenten loader diagrammet fra Supabase ved mount og bruger kun `defaultNodes`/`defaultEdges` hvis rækken er tom. Den gemte række skal derfor opdateres med samme nye struktur, så ændringen er synlig i preview (og ikke kun ved en tom database).

Dette gøres via en migration der opdaterer `nodes` og `edges` JSON i den eksisterende række.

### Resultat

Diagrammet viser nu: `Setpoint` og `FallbackStrategy` → styrer → `HVAC_Zone (varmesystem)` → forsyner → `Room`, med varmesystemet også koblet til `Building`.

