# GZLOZONE GG Preamp

**Rozenblit grounded-grid (GG) line stage + matching PSU** — reverse-engineered documentation for the Zero Zone / GZLOZONE **GG-PRE** + **GG-PSU** kit pair. This is **not** a Marantz Model 7 circuit (see [comparison notes](./marantz-7-vs-gg-reference.md) if you want that context).

---

## Two boards — two doc sections

| Board | Role | Documentation hub |
|-------|------|-------------------|
| **[GG-PRE AMP](./gg-pre/README.md)** | Stereo tube **line preamp** (3× 12AU7, grounded-grid) | [gg-pre/README.md](./gg-pre/README.md) |
| **[GG-PSU](./gg-psu/README.md)** | **±200 V** + filament power supply | [gg-psu/README.md](./gg-psu/README.md) |

```
  R20-TS4803A trafo (230 V: RED–GRY tied)
         │
    GG-PSU ──±200 V, +12, GND──► GG-PRE AMP ──► IN / OUT (stereo)
```

**Step-by-step assembly:** [BUILD.md](./BUILD.md) (trafo, PSU, preamp, IEC, Alps pot, RCAs, star ground).

Transformer details: [gg-psu/transformer.md](./gg-psu/transformer.md) (**NL/EU: 230 V, 50 Hz**, RED–GRY series primary).

**Safety:** ±200 V is lethal. Discharge electrolytics before probing either board.

---

## System interconnection (quick)

| GG-PRE power terminal (top→bottom) | Expected from GG-PSU **I** |
|-----------------------------------|----------------------------|
| `−200V` | Negative regulated HV |
| `+12` | Filament DC (~12–12.6 V) |
| `+200V` | Positive regulated HV |
| `GND` | Common |

Preamp connectors and topology: **[GG-PRE docs](./gg-pre/README.md)**.  
PSU strapping and BOM: **[GG-PSU docs](./gg-psu/README.md)**.

---

## Project-wide files

| File | Purpose |
|------|---------|
| **[BUILD.md](./BUILD.md)** | **Workshop build guide** — phased checklists, wiring, measurements |
| [pcb-photos/build/](./pcb-photos/build/) | Chassis / inlet build progress photos |
| [marantz-7-vs-gg-reference.md](./marantz-7-vs-gg-reference.md) | Marantz 7 vs GG kit map, roles, **star grounding** |
| [preferences.md](./preferences.md) | Where docs are stored, conventions |
| [sketches/](./sketches/) | Hand-drawn–style schematics (user pencil sketch + SVG) |

Board-specific schematics live under **GG-PRE** or **GG-PSU** hubs above.

---

## Confidence legend (both boards)

**C** = confirmed (silkscreen, user measure, part read) · **I** = inferred · **U** = unknown

---

## Related context (optional)

**Comparison vs Marantz Model 7, signal-path roles, and star-ground notes:** [marantz-7-vs-gg-reference.md](./marantz-7-vs-gg-reference.md) (includes lineage vs [Kikitronic GG kit](https://kikitronic.blogspot.com/2009/11/grounded-grid-pre-amplifier.html)).
