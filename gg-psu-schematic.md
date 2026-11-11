[← GG-PSU index](./gg-psu/README.md) · [Project](./README.md)

# GZLOZONE / Zero Zone GG-PSU — Reverse-Engineered Schematic

Dual **high-voltage regulated** channels plus **adjustable DC filament** supply for the [GG-PRE AMP](./gg-pre/README.md) (±200 V + ~12 V). **R1–R6**, caps, and semiconductors user-confirmed **2026-11-09**. **CR1 / right-channel zener P/N** not readable — rebuild uses **200 V + short** per seller **I** (see [gg-psu-component-id.md § BOM freeze](./gg-psu-component-id.md)).

| | |
|---|---|
| **Board marking** | `ZERO ZONE` · `GG-PSU` |
| **PCB size (seller)** | 130 × 70 mm, 1.6 mm, ~50 µm Cu |
| **Primary sources** | [pcb-photos/psu/](./pcb-photos/psu/); FYFAudio / clone listings |
| **Paired load** | Grounded-grid preamp: **+200 V**, **−200 V**, **+12 V**, **GND** |

**Confidence:** **C** confirmed · **I** inferred · **U** unknown — measure before energizing.

---

## 1. Topology summary

The GG-PSU is **not** a simple transformer-in-a-box. It expects an **external toroidal/R-core** with separate HV and LV windings:

```
                    ┌─── Transformer ───┐
                    │  2× HV AC (~220 V class each)     │
                    │  1× LV AC (~12.6 V class)         │
                    └─────────┬─────────────────────────┘
                              │
         ┌────────────────────┴────────────────────┐
         │              GG-PSU PCB                  │
         │  ┌─────────────┐    ┌─────────────┐      │
         │  │ HV reg #1   │    │ HV reg #2   │      │
         │  │ bridge→MOS  │    │ bridge→MOS  │      │
         │  └──────┬──────┘    └──────┬──────┘      │
         │         │ VDC-OUT +        │ VDC-OUT +   │
         │         │                  │             │
         │  ┌──────┴──────────────────┴──────┐      │
         │  │ Filament: AC→LT1085→DC          │      │
         │  └────────────────────────────────┘      │
         └───────────────────────────────────────────┘
```

### High voltage (×2) **I**

Each half is structurally similar:

1. **AC in** from one HV winding (or half of center-tapped scheme — wiring **U** on your transformer).
2. **Full-wave bridge** **KBP307** (×2 for HV) **C**.
3. **Bulk filter** — **100 µF / 400 V** per channel **C**.
4. **Series-pass 2SK2700** (marking **K2700**) on heatsink **C**.
5. Voltage reference / feedback using **two D-V zener positions** in series:  
   **Vout ≈ Vz1 + Vz2** (seller) **I**. For **200 V** per rail used as ±200 V: **200 V** zener in one site, **short** the other **I**.
6. **Output cap** and **VDC-OUT** terminal **C**/**I**.

Pass element is **MOSFET-based**, not a tube — runs warm; seller suggests enough **Vdrop** (~80–100 V ideal) so the pass device has stable bias **I**.

### Filament / low voltage **I**

1. **Low AC** in (dedicated winding).
2. On-board rectification and filtering (**U** detail).
3. **LT1085CT** adjustable regulator **C**.
4. **Trimmer** **W202** (2 kΩ) + **10 µF / 50 V** (?) and **100 µF / 50 V** caps on LV rail **C** / partial **U**.
5. LV reservoir **4700 µF / 25 V** (×2) after **BR3** **C** / **I**.
6. **LED** indicator **C**.
7. Output **~3.5–12.6 V DC** (set for **12.6 V** or **6.3 V** depending on heater plan) **I**.

Seller: **≤~40 mA** per HV channel with default heatsinks; filament **up to ~1–1.5 A** class **I**.

---

## 2. Forming ±200 V from two HV channels **C** / **I**

**As-built silk **C**:** 4-screw **VDC-OUT** = two pairs `−` `+` `−` `+` (top→bottom); filament **HR-X** `−` `+`. Full checklist + measured columns: [BUILD.md §2.5](./BUILD.md#25-high-voltage--strap-silk-accurate--easy-to-get-wrong).

Each pair is a floating ~+200 V regulator. Series them for bipolar rails (**do not** tie all minuses to ground):

```
Top VDC-OUT + ──────────────────────────► PRE +200V     (~+200 V vs GND)

Top VDC-OUT − ──┐
Bottom VDC-OUT + ─┼── join at PSU ──────► PRE GND       (midpoint)
HR-X − ───────────┘

Bottom VDC-OUT − ───────────────────────► PRE −200V     (~−200 V vs GND)

HR-X + ─────────────────────────────────► PRE +12       (~+12–12.6 V vs GND)
```

| Check | Expected |
|-------|----------|
| +200 vs GND | ~+200 V DC |
| −200 vs GND | ~−200 V DC |
| +200 vs −200 | ~400 V DC |
| HR-X + vs GND | ~12.0–12.6 V DC |

---

## 3. Connectors (working table)

### HV-IN (4-pin, bottom) **C** label

| Pin | Net (proposed) | Notes |
|-----|----------------|-------|
| 1–4 | **AC_HV_A**, **AC_HV_B**, … | Map to BR1/BR2 AC inputs **U** |

### VDC-OUT (4-screw block = 2× `−`/`+`) **C**

| Screw (top→bottom) | Role when strapped for ±200 V **C** |
|--------------------|-------------------------------------|
| `−` | → **GND** midpoint (with bottom `+` and HR-X `−`) |
| `+` | → PRE **`+200V`** |
| `−` | → PRE **`−200V`** |
| `+` | → **GND** midpoint |

Read silk along board edge **C** ([04-overview-vdc-out.jpg](./pcb-photos/psu/04-overview-vdc-out.jpg)). Channels may be swapped; rule: **one `−` and the other `+` form GND**.

### Filament **HR-X** DC out **C**

| Screw | Net **C** |
|-------|-----------|
| `−` | Filament return → join to HV **GND** midpoint → PRE **`GND`** |
| `+` | **+V_FIL** → PRE **`+12`** (set ~12.6 V) |

AC filament in is a separate 2-pin block (**AC-F** / similar) from the trafo **BLU** winding **I**.

---

## 4. One HV channel (netlist style)

Reference designators are **assigned for this document**. Values **U** unless noted.

```
AC_IN_x ──► BRx (~) ──► +RAW ──┬──► C_bulk+  (400 V, U µF) **C** class
              │               │
              └──► -RAW ──────┴──► C_bulk-  (to GND_RAW)

+RAW ──► Qx (N-MOS drain) ──► +REG ──┬──► C_out+ ──► VDC-OUT (+)
                                    │
              Gate/source network ◄─┤  R_low + R_hi (220 Ω + 47 kΩ per channel **C**)
                                    │
              Vref ◄── (D-V1)+(D-V2) zener stack **I**

GND_RAW / signal GND ──► returns, divider refs **U**
```

Third bridge **BR3** (**KBP307**) serves filament / LV rectification **C** / **I**. Second HV channel duplicates with **BR2**, **Q2**, **VDC-OUT** pair.

### Filament subsection **I**

```
AC_FIL ──► BR3 (KBP307) ──► +DC_RAW ──► C7,C8 (4700 µF/25 V) ──► U1 (LT1085 IN)
                                              │
                                         C10 (10 µF/50 V)

U1 OUT ──► +V_FIL ──► (to GG-PRE +12)
           │
           ├── C9 (100 µF/50 V)
           └── LED1 ── R1 (100 Ω) ──► return

ADJ ◄── divider + VR1 (W202 2 kΩ) + R2 (10 kΩ) + (other **U** if any)
```

---

## 5. BOM table (user-confirmed 2026-11-09)

| Ref | Qty | Value | Notes | Conf |
|-----|-----|-------|-------|------|
| BR1–BR3 | 3 | **KBP307** | 2× HV + 1× LV **I** | **C** |
| Q1, Q2 | 2 | **2SK2700** (`K2700` / `8S`) | HV pass | **C** |
| U1 | 1 | **LT1085CT** (`241228`) | Filament reg | **C** |
| D-V @ **D-11** | 1 | **wire short** | Second zener site strapped **C** photo | **C** |
| D-V (other) | 1 | **U** | e.g. **200 V** 5 W zener for GG ±200 V | **U** |
| D1, D2 | 2 | **RR23** marking | **FR207**-class **2 A / 1 kV** **I** equiv. | **C** **D2** mark + DMM |
| C1, C2 | 2 | **100 µF / 400 V** | HV bulk (large blue) | **C** |
| C3–C6 | 4 | **10 µF / 400 V** | HV secondary (brown) | **C** |
| C7, C8 | 2 | **4700 µF / 25 V** | LV reservoir (large brown) | **C** |
| C9 | 1 | **100 µF / 50 V** | Dark blue | **C** |
| C10 | 1 | **10 µF / 50 V** | Small blue, near **U1** | **C** |
| VR1 | 1 | **2 kΩ** trim **W202** | Filament adjust | **C** |
| LED1 | 1 | Blue LED | + **R_led U** | **C** |
| R1 | 1 | **100 Ω** | LED1 series | **C** |
| R2 | 1 | **10 kΩ** | Near **U1** / LV | **C** |
| R3, R5 | 2 | **220 Ω** | HV channels (with 47 k pair) | **C** |
| R4, R6 | 2 | **47 kΩ** | HV channels (mirror) | **C** |

Full map: [gg-psu-component-id.md](./gg-psu-component-id.md).

---

## 6. Power budget (rebuild checklist)

| Rail | Target (GG-PRE) | Notes |
|------|-----------------|--------|
| +200 V DC | **~200 V** regulated | Set via D-V zeners + trim **U** |
| −200 V DC | **~200 V** regulated | Other HV channel, common centertap **I** |
| Heaters | **+12 V** silk on preamp (12.6 V class) | 3× 12AU7 series string ≈150 mA **I** |
| HV current | **≥15 mA** reserve per rail **I**; preamp load ~tens of mA |

**Safety:** **400 V** capacitors see **mains-derived** energy. Use discharge resistor / verified bleeder. **Lethal voltages.** Confirm transformer phasing and strap before connecting GG-PRE.

**Transformer:** kit **R20-TS4803A** — [transformer.md](./gg-psu/transformer.md) (**230 V:** **RED–GRY** tie **C**). Also see [LencoHeaven GG build](https://www.lencoheaven.net/forum/index.php?topic=35914.0) **I**.

---

## 7. Assumptions and uncertainties

1. **Compact GG-PSU** is the mate for your GG-PRE; **wide board** in [01-overview-wide-variant.jpg](./pcb-photos/psu/01-overview-wide-variant.jpg) may be a different product — **U**.
2. **Zener ratings** and **D1/D2** types are **U** (resistors **R1–R6** confirmed).
3. **Per-cap ref → PCB location** (C3–C10) is **I** until traced.
4. **Filament ground** may be intentionally isolated from HV ground on PCB — hum / bonding is user-dependent **U**.
5. **Pin-exact connector tables** need continuity from your physical board.
6. Listing claims (40 mA HV, 1 A LV) are **I** — not measured on your build.

### Recommended verification

1. Transformer off: resistance on all secondaries; document colors.
2. Buzz **HV-IN** → bridges; **VDC-OUT** → cap + output polarity.
3. With **current-limited** bench supply on one channel at a time: confirm reg behavior before full AC.
4. Fill [gg-psu-component-id.md](./gg-psu-component-id.md); update SVG.

---

## 8. Companion visual

Block schematic (caps/MOS/reg confirmed; resistors TBD):

- [`gg-psu-schematic.svg`](./gg-psu-schematic.svg)

---

## 9. Source photos

- [pcb-photos/psu/](./pcb-photos/psu/)

Detailed visual pass: [gg-psu-pcb-reverse-engineering.md](./gg-psu-pcb-reverse-engineering.md)

---

[← GG-PSU index](./gg-psu/README.md) · [Project](./README.md)
