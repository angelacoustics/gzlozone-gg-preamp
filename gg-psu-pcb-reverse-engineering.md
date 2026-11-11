[← GG-PSU index](./gg-psu/README.md) · [Project](./README.md)

# Zero Zone / GZLOZONE GG-PSU — Visual Reverse-Engineering Report

**Board:** GG-PSU only — feeds [GG-PRE](./gg-pre/README.md).

Source photos: [pcb-photos/psu/](./pcb-photos/psu/). Prefer **UNKNOWN** over invented values — exact BOM to be filled in when you measure parts.

**Legend:** CONFIRMED = readable silkscreen / clear visual feature. INFERRED = topology-consistent but not fully traced. UNKNOWN = not determinable from these photos.

---

## 0. Which board is in these photos?

| Board | Evidence | Notes |
|-------|----------|--------|
| **GG-PSU** (compact HV + filament) | Silk **GG-PSU**, **N-MOS**, **HV-IN**, **LT1085/LM317** — see [06-overview-gg-psu.jpg](./pcb-photos/psu/06-overview-gg-psu.jpg), [07-closeup-silkscreen-regulators.jpg](./pcb-photos/psu/07-closeup-silkscreen-regulators.jpg) | Seller size **130 × 70 mm**; pairs with [GG-PRE AMP](./gg-pre/README.md) |
| **Wide / alternate PSU** | [01-overview-wide-variant.jpg](./pcb-photos/psu/01-overview-wide-variant.jpg) shows **three** large heatsinks and **AC-IN / DC-OUT** style labels, different aspect ratio | **U** — may be another Zero Zone SKU (some reads say “SG-PSU”). Treat as related reference until silkscreen is re-read on your unit |

This report focuses on **GG-PSU** wiring for the grounded-grid preamp; the wide board is noted where layout clearly differs.

---

## 1. ORIENTATION

### Solder-side vs component-side

- **Best match: horizontal mirror (flip like a book page).** Top/bottom stay fixed; left ↔ right swap.
- Evidence: [solder-side.jpg](./pcb-photos/psu/solder-side.jpg) shows the same **tall narrow** outline as GG-PSU overviews; thick oval pads for large electros line up with blue/brown caps on the component side after hflip.
- Mounting holes: four corners + one large hole along bottom edge on solder side **CONFIRMED**.

### Functional regions (GG-PSU, component side)

Rough **top → bottom** (photo [06-overview-gg-psu.jpg](./pcb-photos/psu/06-overview-gg-psu.jpg)):

| Region | What’s there |
|--------|----------------|
| **Top** | Two **N-MOS** heatsinks, small electros, trimmers, 2-pin / 4-pin green terminals |
| **Center** | Symmetric resistor/diode clusters, medium brown electros |
| **Bottom** | **Three** **KBP307** bridges (2× HV + 1× LV **I**), **100 µF / 400 V** blue caps, **HV-IN** 4-pin terminal |

Left/right on [04-overview-vdc-out.jpg](./pcb-photos/psu/04-overview-vdc-out.jpg) emphasizes **VDC-OUT** 3-pin blocks and **+/−** polarity silk along the board edge.

---

## 2. CONNECTORS (GG-PSU)

Silkscreen is partially obscured by parts; assignments below combine **CONFIRMED** labels with **INFERRED** pin order (verify on your board).

### HV-IN — 4-pin green terminal (bottom center) **C** label / **I** pin order

- Intended for **transformer high-voltage AC** (seller examples: 2× ~220 VAC windings).
- Photo shows **“HV-IN”** repeated near this block **C**.
- Exact pin-to-winding map **U** — buzz from each pin to its bridge AC pads.

### High-voltage outputs — 3-pin terminal blocks (board edge) **C** / **I**

- Silk **VDC-OUT** (or **V-OUT**) **C** on [04-overview-vdc-out.jpg](./pcb-photos/psu/04-overview-vdc-out.jpg).
- Polarity **+** and **−** printed along edge **C**.
- **Two** regulated HV channels (left/right symmetry) **I** → for ±200 V operation, seller instructs tying **positive** of one channel and **negative** of the other to **GND**, feeding the preamp as +200 V / −200 V **I** (see schematic doc).

### Filament / low-voltage input — **I**

- Separate **AC-IN** (or low-V AC) terminals **C** near [07-closeup-silkscreen-regulators.jpg](./pcb-photos/psu/07-closeup-silkscreen-regulators.jpg).
- **LT1085/LM317** region on left **C** silk → adjustable DC heater supply **I**.

### Filament / low-voltage output — **I**

- Typically 2-pin screw terminal near filament regulator and **LED** ([03-closeup-filament-led.jpg](./pcb-photos/psu/03-closeup-filament-led.jpg)).
- Feeds **+12** (or 6.3 V / 12.6 V set) to [GG-PRE power pin 2](./gg-pre-amp-schematic.md) **I**.

### Brand block **C**

- `ZERO ZONE` / `GG-PSU` on right edge ([06-overview-gg-psu.jpg](./pcb-photos/psu/06-overview-gg-psu.jpg)).

---

## 3. ACTIVE CIRCUIT BLOCKS

### 3.1 Dual high-voltage channel (×2, symmetric) **I**

Each channel, left and right halves of the PCB:

```
AC (HV-IN) ──► Bridge (2A) ──► C_bulk (400 V class) ──► N-MOS pass ──► C_out ──► VDC-OUT (+)
                                                                    │
                                              Zener stack (D-V) ◄───┘
```

**CONFIRMED elements per channel:**
- **Bridge rectifier** — **KBP307** (×3 on board) **C** user; silk **2A** is generic ([02-closeup-rectifier-caps.jpg](./pcb-photos/psu/02-closeup-rectifier-caps.jpg)).
- **2SK2700** (`K2700`) on finned heatsink, silk **N-MOS** **C** user.
- **Large blue electrolytic(s)** — **100 µF / 400 V** (×2) **C** user ([06-overview-gg-psu.jpg](./pcb-photos/psu/06-overview-gg-psu.jpg)).

**INFERRED regulation:**
- Seller documentation: high voltage = sum of two **D-V** zener positions (5 W class); at **200 V**, install **200 V** in one site and **short** the other **I**.
- MOSFET provides series pass / drop; recommend **≥50–80 V** headroom from raw rectified rail to output **I** (seller note).

**UNKNOWN on this PCB instance:**
- Exact MOSFET type.
- All resistor values in the HV feedback / gate network.
- Which 3-pin terminal is “HV1” vs “HV2” without continuity.

### 3.2 Filament / auxiliary low-voltage **I**

```
AC (low-V winding) ──► rectifier/filter (on-board) ──► LT1085 or LM317 ──► trim ──► DC out (+12 class)
                                                              │
                                                           C (10U silk)
                                                              │
                                                            LED + series R
```

**CONFIRMED:**
- **LT1085CT** (`241228`) installed; silk allows LM317 footprint ([07-closeup-silkscreen-regulators.jpg](./pcb-photos/psu/07-closeup-silkscreen-regulators.jpg)) **C** user.
- Blue multi-turn trimmer; silk **W202** → standard **2 kΩ** trim pot part code **I** (not necessarily divider values).
- Silk **10U** near small blue cap ([03-closeup-filament-led.jpg](./pcb-photos/psu/03-closeup-filament-led.jpg)).
- **LED** + resistor near filament section **C** label.

**INFERRED (seller):**
- Output **~3.5–12.6 V DC** adjustable; **12.6 V** for 12AU7 series heaters when GG-PRE is used.
- Input often **~14–15 VAC** for 12.6 V out (transformer 2×6.3 V in series) **I**.

**Partial silk near HV section:** **HR-X** **U** — may be heater-rectifier sub-block; not fully traced.

---

## 4. PASSIVES & DISCRETES (counts / classes only)

| Type | Qty (approx.) | Photo notes | Values |
|------|----------------|-------------|--------|
| Large blue electrolytic | **2** | **100 µF / 400 V** each | User **C** 2026-11-09 |
| Large brown electrolytic | **2** | **4700 µF / 25 V** each | LV reservoir **C** |
| Smaller brown electrolytic | **4** | **10 µF / 400 V** each | HV secondary **C** |
| Dark blue / small blue | **2** | **100 µF / 50 V** + **10 µF / 50 V** (?) | Near regulator **C** |
| Blue metal-film resistors | **6** | **R1–R6** ink-numbered | User **C** — see [component-side-resistors-numbered.jpg](./pcb-photos/psu/component-side-resistors-numbered.jpg) |
| Axial diodes | **Several** | Black body + stripe | Likely 1N400x class **I** |
| Glass/small diodes | **Few** | Near regulators | **U** |
| Trimmer pot | **1** | **W202** (**2 kΩ**), line **13** — filament **U1** adjust | User **C** |
| Bridge rectifiers | **3** | **KBP307** (silk **2A** is generic) | User **C** |
| MOSFET pass | **2** | **2SK2700** (`K2700` **8S**) | User **C** |
| Regulator | **1** | **LT1085CT** `241228` | User **C** |
| Zeners (D-V) | **2 positions** | Voltage **U** | Set HV; 200 V + short for GG **I** |

No reliable R/C designators visible for a full REF map yet.

---

## 5. SOLDER-SIDE ([solder-side.jpg](./pcb-photos/psu/solder-side.jpg))

**CONFIRMED visually:**
- Very wide traces from bridge / large-cap pads toward heatsinked transistor pads.
- Symmetric left/right HV routing.
- Thick edge trace likely **GND** or main return **I** (right-side pour in as-shot photo → left after hflip alignment).
- Clear keep-out / gap across mid-board consistent with **two independent HV channels** plus a low-voltage island **I**.

**Not resolved from photos alone:** exact star-ground point for filament return vs HV return (forum builders note filament may be **floating** vs chassis while HV center ties to PCB ground **U** — measure before bonding chassis).

---

## 6. HOOKUP TO GG-PRE AMP (inferred)

Matches [GG-PRE power connector](./gg-pre/README.md) / [schematic §2](./gg-pre-amp-schematic.md):

| GG-PRE terminal | GG-PSU source **I** |
|-----------------|---------------------|
| **+200 V** | Positive regulated HV output |
| **−200 V** | Negative regulated HV output (other channel, referenced to GND) |
| **+12** | Filament DC out |
| **GND** | Common after seller’s ±200 V strapping |

Transformer example from community builds: **2×220 VAC** to HV section, **12.6 VAC** (2×6.3 V series) to filament section **I**.

---

## 7. PRACTICAL NEXT STEPS

1. **Confirm board SKU** — GG-PSU compact vs wide variant on [01-overview-wide-variant.jpg](./pcb-photos/psu/01-overview-wide-variant.jpg).
2. **Continuity** from each **HV-IN** pin → bridge AC pins; each **VDC-OUT** pin → correct cap polarity.
3. **Read zeners** at **D-V** (or note if already installed for 200 V).
4. **Measure all resistors** and capacitors → update [gg-psu-component-id.md](./gg-psu-component-id.md) (placeholder).
5. **Draw final nets** in [gg-psu-schematic.md](./gg-psu-schematic.md) once values are known.

---

*Photos: component-side set in `pcb-photos/psu/` + solder-side. Seller listings (FYFAudio / similar) used only for topology cross-check, not as proof of your exact BOM.*

[← GG-PSU index](./gg-psu/README.md) · [Project](./README.md)
