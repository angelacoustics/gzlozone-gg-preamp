[← Project home](../README.md)

# GG-PSU — documentation index

**GZLOZONE / Zero Zone GG-PSU** — dual **high-voltage regulated** channels + **LT1085** filament supply. Feeds [GG-PRE AMP](../gg-pre/README.md): **±200 V** and **~12 V** heaters (external transformer required).

| | |
|---|---|
| **Marking** | `ZERO ZONE` · `GG-PSU` |
| **PCB (seller)** | 130 × 70 mm |
| **Outputs** | 2× regulated HV (strapped **±200 V**), adjustable LV **~3.5–12.6 V** |
| **BOM status** | **Frozen** — [component ID](../gg-psu-component-id.md); **CR1** zener P/N → use **200 V** 5 W **I** |

**Safety:** Mains-derived **400 V** class capacitors. Bleed before service. Lethal voltages.

**Building the kit:** [BUILD.md](../BUILD.md) (trafo, PSU bring-up, ±200 V strap).

---

## Read in this order

| Step | Document | What you get |
|------|----------|----------------|
| 1 | [gg-psu-schematic.md](../gg-psu-schematic.md) | Topology, ±200 V strapping, connectors, netlist |
| 2 | [gg-psu-schematic.svg](../gg-psu-schematic.svg) | Block diagram (confirmed values + D-V notes) |
| 3 | [gg-psu-component-id.md](../gg-psu-component-id.md) | BOM + **BOM freeze** shopping list |
| 4 | [gg-psu-pcb-reverse-engineering.md](../gg-psu-pcb-reverse-engineering.md) | Photo PCB pass, D-V / **CR1** notes |
| 5 | [transformer.md](./transformer.md) | **R20-TS4803A** R-core: **230 V** = **RED–GRY** tie **C** |

---

## Key parts (summary)

| Block | Parts |
|-------|--------|
| HV pass | 2× **2SK2700**, 2× **KBP307**, 100 µF/400 V bulk |
| HV diode (D1/D2) | **RR23** marking → order **FR207** class 2 A/1 kV **I** |
| Filament | **LT1085CT**, 4700 µF/25 V×2, **W202** trim, LED + **100 Ω** |
| Resistors | **R1–R6** only (see numbered photo) |
| D-V reference | **CR1** + mirrored right channel; **D-11** / left mates **jumped** **C** |

Full table: [gg-psu-component-id.md](../gg-psu-component-id.md).

---

## Photos

| Resource | Path |
|----------|------|
| Overview | [../pcb-photos/psu/06-overview-gg-psu.jpg](../pcb-photos/psu/06-overview-gg-psu.jpg) |
| Solder side | [../pcb-photos/psu/solder-side.jpg](../pcb-photos/psu/solder-side.jpg) |
| **R1–R6 numbered** | [../pcb-photos/psu/component-side-resistors-numbered.jpg](../pcb-photos/psu/component-side-resistors-numbered.jpg) |
| D-V / diodes close-ups | [../pcb-photos/psu/closeups/](../pcb-photos/psu/closeups/) |
| All PSU photos | [../pcb-photos/psu/](../pcb-photos/psu/) |

---

## Feed to GG-PRE (4-pin)

| GG-PRE terminal | GG-PSU |
|-----------------|--------|
| `+200V` | HV reg positive rail |
| `−200V` | HV reg negative rail |
| `+12` | Filament regulator output (set ~12.6 V for series 12AU7 heaters **I**) |
| `GND` | Common after ± strap |

---

## Transformer

Documented kit part: **[R20-TS4803A](./transformer.md)** (ZEROZONE R-core).

| Mains | Primary hookup **C** |
|-------|----------------------|
| **~230 V** | **RED** tied to **GRY**; **BLK** and **ORG** to L/N |
| **~115 V** | **BLK–GRY** and **RED–ORG** in parallel |

**YEL** / **GRN** → **HV-IN**; **BLU (14 V)** → filament input on PSU **I**.

Photo: [../pcb-photos/transformer/zerozone-r20-ts4803a-label.jpg](../pcb-photos/transformer/zerozone-r20-ts4803a-label.jpg)

---

## Related

- [Marantz 7 vs GG reference §5 — star ground](../marantz-7-vs-gg-reference.md#5-star-grounding-deep-dive) (PSU strap, filament return **U**)
- [GG-PRE AMP documentation](../gg-pre/README.md)
- [Project README](../README.md)

[← Project home](../README.md)
