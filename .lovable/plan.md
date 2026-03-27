

# Opdater indhold med mødefeedback

Integrer mødekommentarerne direkte i de eksisterende tekster — som en naturlig del af beskrivelserne, ikke som separate noter.

## Ændringer

### 1. GrundelementerSection.tsx — opdater tekster

**Datafundamentet** — udvid `detail`:
- Tilføj at data fra CTS-anlæg på anvender-siden er en forudsætning for at produktet kan fungere
- Tilføj at datamodellen skal opbygges så simpelt som muligt med modulær opbygning, med udgangspunkt i open source-standarder/ontologier som BrickSchema og Real EstateCore
- Nævn at IoT Lab ved Aarhus Kommune arbejder med en datamodel i samarbejde med projektet

**Reguleringsmotoren** — opdater `summary` og `detail`:
- Præcisér i summary at algoritmen sender prædiktive setpunkter til bygningsautomatik for fremløbstemperatur af varmesløjfer (radiator- og gulvvarmeanlæg)
- Fremhæv fallback-plan som central del af styringsstrategien

**Connector-laget** — opdater `detail`:
- Erstat nuværende sluttekst med: produktet kan udstille et API der sender og modtager data til referencealgoritmen, baseret på kendte komponenter
- Tilføj at connector-laget har indbygget krav til datamodellering

**Implementerbarhed & drift** — udvid `detail`:
- Tilføj NIS2-compliance: der skal vurderes hvad der er kritisk infrastruktur
- Cybersecurity-review skal planlægges senere i projektet
- Løsningen skal kunne implementeres af flere leverandører med krav om:
  - Dataportabilitet (flytte data til anden leverandør)
  - OS2-fællesskabet som steward på GitHub
  - Hosting ved OS2 med kommuner som tenants, med frihed til at beslutte hvor data opbevares
  - Klar definition af kildekode for kommende udviklingspartnere

### 2. GovernanceSection.tsx — opdater driftsorganisation

Opdater responsibilities for "Driftsorganisationen" med de konkrete krav fra mødet (dataportabilitet, GitHub stewardship, tenant-model, NIS2-vurdering) — formuleret som naturlige ansvarsområder.

## Berørte filer
- `src/components/GrundelementerSection.tsx` — opdater data-arrays
- `src/components/GovernanceSection.tsx` — opdater responsibilities

