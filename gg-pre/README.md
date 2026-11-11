[← Project home](../README.md)

# GG-PRE AMP — documentation index

**GZLOZONE / Zero Zone GG-PRE AMP** — stereo grounded-grid line stage (**3× 12AU7**). Signal board only: **no on-board HV rectifier**. Powered from [GG-PSU](../gg-psu/README.md) (or equivalent).

| | |
|---|---|
| **Marking** | `GZLOZONE®` · `ZERO ZONE` · `GG-PRE AMP` |
| **PCB (seller)** | 132 × 132 mm |
| **Supplies required** | **±200 V DC**, **+12 V** heaters, **GND** (4-pin screw terminal) |
| **Topology** | Input CF → grounded-grid gain → output CF (per channel) |
| **BOM status** | **R1–R14** and main caps **confirmed** — [component ID](../gg-pre-component-id.md) |

**Safety:** ±200 V is lethal. Discharge capacitors before probing.

**Building the kit:** [BUILD.md](../BUILD.md) (power hookup, tubes, RCA/volume, grounding).

---

## Read in this order

| Step | Document | What you get |
|------|----------|----------------|
| 1 | [gg-pre-amp-schematic.md](../gg-pre-amp-schematic.md) | Topology, connectors, netlist, assumptions |
| 2 | [gg-pre-amp-schematic.svg](../gg-pre-amp-schematic.svg) | One-channel drawing with **R1–R14** values |
| 2b | [sketches/gg-pre-hand-drawn-one-channel.svg](../sketches/gg-pre-hand-drawn-one-channel.svg) | Same clone, **pencil-style** layout |
| 3 | [gg-pre-component-id.md](../gg-pre-component-id.md) | Full resistor + capacitor BOM |
| 4 | [gg-pre-pcb-reverse-engineering.md](../gg-pre-pcb-reverse-engineering.md) | Photo-based PCB pass, tube pins, traces |

---

## Connectors (silkscreen **C**)

**Power** (right edge, top → bottom): `−200V` · `+12` · `+200V` · `GND`

**Audio IN** (top center): `IN-R` · `GND` · `IN-L`

**Audio OUT** (bottom center): `OUT-R` · `GND` · `OUT-L`

---

## Photos

| Resource | Path |
|----------|------|
| Overview component side | [../pcb-photos/component-side.jpg](../pcb-photos/component-side.jpg) |
| Overview solder side | [../pcb-photos/solder-side.jpg](../pcb-photos/solder-side.jpg) |
| **R1–R14 numbered** | [../pcb-photos/component-side-resistors-numbered.jpg](../pcb-photos/component-side-resistors-numbered.jpg) |
| Detail close-ups | [../pcb-photos/closeups/](../pcb-photos/closeups/) |

---

## Power hookup (from GG-PSU)

| GG-PRE pin | From PSU |
|------------|----------|
| `+200V` | Regulated HV positive |
| `−200V` | Regulated HV negative |
| `+12` | Filament DC |
| `GND` | Common |

Details: [GG-PSU schematic § Forming ±200 V](../gg-psu-schematic.md).

---

## Open checks (preamp only)

1. Heater wiring on PCB: series vs parallel (**U** — pins 4/5/9 vs `+12` / `GND`).
2. Which electrolytic is on **+200 V** vs **−200 V**.
3. Optional buzz-out: IN → grids, GG plate → V3, cathode → Cout.

---

## Related

- [Marantz 7 vs GG reference](../marantz-7-vs-gg-reference.md) (gain/Z map, star ground)
- [GG-PSU documentation](../gg-psu/README.md)
- [Project README](../README.md)

[← Project home](../README.md)
