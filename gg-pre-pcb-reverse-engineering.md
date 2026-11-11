[← GG-PRE index](./gg-pre/README.md) · [Project](./README.md)

# Zero Zone / GZLOZONE GG-PRE AMP — Visual Reverse-Engineering Report

**Board:** GG-PRE AMP only — power from [GG-PSU](./gg-psu/README.md).

Source photos: [pcb-photos/component-side.jpg](./pcb-photos/component-side.jpg), [pcb-photos/solder-side.jpg](./pcb-photos/solder-side.jpg). Photo resolution is ~718×953; color-band and fine-trace reads are limited. Prefer **unknown** over invented values.

**Legend:** CONFIRMED = readable silkscreen / clear visual feature. INFERRED = topology-consistent but not fully traced. UNKNOWN = not determinable from these photos.

---

## 1. ORIENTATION

### How solder-side relates to component-side

- **Best match: horizontal mirror (flip around the vertical axis / “turn like a book page”).**
  - Top stays top, bottom stays bottom.
  - Left ↔ right swap.
  - Evidence: both photos show the same **two-upper / one-lower** tube-socket triangle. That rules out a pure vertical flip (which would put two sockets in the lower half).
- After that alignment:
  - Component-side **right-edge power** lands on solder-side **left edge**.
  - Component-side **IN-R (left of input block)** lands on solder-side **right** of the top 3-pad row.
  - Component-side **OUT-R (left of output block)** lands on solder-side **right** of the bottom 3-pad row.

**Caveat:** Some solder-side glare makes the power-pad column easy to mis-side; landmark check is the socket triangle + mounting holes, not glare.

### Connector positions

| Connector | Component-side photo | Solder-side photo (as shot; before remapping) | After hflip alignment to component |
|---|---|---|---|
| Audio IN (3-pin) | **Top center** | Top-center 3-pad row | Top center |
| Audio OUT (3-pin) | **Bottom center** | Bottom-center 3-pad row | Bottom center |
| Power (4-pin) | **Right edge** | Appears on **left edge** of as-shot solder photo | Right edge |

---

## 2. CONNECTORS

### Power — 4-pin green screw terminal (component-side right edge)

Silkscreen, **top → bottom** (CONFIRMED from magnified label crop):

1. `-200V`
2. `+12`
3. `+200V`
4. `GND`

Notes:
- `+12` is the heater supply label (12AU7 heaters; intended ~12.6 V class supply — exact wiring series vs parallel still uncertain; see §3).
- ±200 V are bipolar HV rails.

### Audio IN — 3-pin green screw terminal (component-side top center)

Silkscreen, **left → right** (CONFIRMED from full-board reads):

1. `IN-R`
2. `GND`
3. `IN-L`

### Audio OUT — 3-pin green screw terminal (component-side bottom center)

Silkscreen, **left → right** (CONFIRMED):

1. `OUT-R`
2. `GND`
3. `OUT-L`

Brand block (bottom-right, CONFIRMED): `GZLOZONE ®` / `ZERO ZONE` / `GG-PRE AMP`.

---

## 3. TUBE SOCKETS

All three sockets silkscreened **`12AU7`** (CONFIRMED). No V1/V2/V3 silkscreen numbers visible; positional mapping below.

| ID | Position (component-side) | Near | Gap / key (component-side) | Confidence |
|---|---|---|---|---|
| **V1** | Top-left | `IN-R` side | ~**6 o’clock** (pin1/pin9 gap toward board bottom) | High (socket close-up) |
| **V2** | Top-right | `IN-L` / power side | ~**6 o’clock** | High (socket close-up) |
| **V3** | Center (between I/O, above yellow caps) | Shared L/R | ~**6 o’clock** in center close-up; some overview reads said **12 o’clock** | **Medium** — treat as uncertain if exact clock matters |

Standard 12AU7 pinout used below: `1=A1, 2=G1, 3=K1, 4=H, 5=H, 6=A2, 7=G2, 8=K2, 9=Hct`.

### Heater / power-ish thick traces (solder-side)

**CONFIRMED (visual):**
- On each socket, the two pins in the **heater pair region (pins 4 and 5)** sit on / are joined by a **thick silver trace** (common heater bus behavior).
- **Pin 9** on each socket has its own connection into another thick rail (not the same short bridge as 4–5).
- Thick rails also fan from the power connector pads into the board (HV / GND / heater distribution).

**INFERRED / uncertain:**
- Which heater pin(s) get `+12` vs `GND` is **not uniquely resolved** from these photos (conflicting reads of rail polarity).
- If 4+5 are truly shorted and 9 is the return → that is the classic **6.3 V parallel** heater hookup — but the silkscreen says `+12`, which fits **12.6 V series (4 to 5, 9 unused)** better. **Do not assume either without continuity check.** Mark heater topology **UNKNOWN** beyond “thick traces serve heater pins 4/5/9.”

### Signal / HV pin associations (solder-side, limited)

**CONFIRMED-ish (thick vs thin, position only):**
- Wide traces toward anode/cathode resistor pads from the `+200V` / `-200V` entry region.
- Thin traces from IN pads toward the upper sockets’ **grid-side** pin arcs (pins 2 / 7 region).
- Thin/medium traces from V3 cathode-side region toward the yellow-cap pads / OUT pads.

**UNKNOWN:** Exact pin-by-pin assignment of every grid/anode/cathode net from photos alone (mask, glare, and under-socket routing).

---

## 4. PASSIVES

### Counts (component-side)

| Type | Count | Notes |
|---|---|---|
| Resistors (blue 5-band metal-film, axial) | **~13–15** visible | Automated blue-body detection found ~14 plausible axial bodies; exact count hard at this resolution |
| Electrolytic capacitors (large black radial) | **2** | Left and right of center |
| Film capacitors (large yellow axial) | **2** | Bottom, flanking OUT |
| Other discrete caps | **0 clearly visible** | None confidently identified beyond the four above |

No resistor reference designators (R1, R2…) are legible.

### Resistors — by location (color reads are fragile)

Photo resolution + glare make band reading unreliable. Below: best attempts with confidence. **Do not treat medium/low as BOM truth.**

| Approx. location | Best band reading | Implied value | Confidence |
|---|---|---|---|
| Near V1 (vertical, socket-right cluster) | Blue-Grey-Black-Red-Brown | **68 kΩ 1%** | Medium–High (one clear close-up) |
| Second vertical near V1 | Blue-Grey-Black-Red-Brown | **68 kΩ 1%** | Medium |
| Horizontal below V1 | Brown-Black-Black-Orange-Brown **or** Brown-Black-Black-Red-Brown | **100 kΩ** or **10 kΩ** | **Low–Medium** (conflicting crops) |
| Near V2 / power (vertical) | Brown-Black-Black-Red-Brown **or** Red-Red-Black-Orange-Brown **or** Red-Red-Black-Brown-Brown | **10 kΩ** / **220 kΩ** / **2.2 kΩ** | **Low** — do not trust |
| Horizontal pair left of V3 | Brown-Black-Black-Red-Brown (repeated reads) | **10 kΩ 1%** | Medium |
| Horizontal pair right of V3 | Brown-Black-Black-Red-Brown | **10 kΩ 1%** | Medium |
| Additional mid-board horizontals (L/R symmetric) | Often read as 10 kΩ; some reads 68 kΩ / 100 kΩ | Unknown set | **Low** |
| Vertical near yellow OUT caps (L and R, ~2 per side) | Mixed: 10 kΩ vs 68 kΩ vs 100 kΩ across reads | Unknown | **Low** |
| Near power connector (1 vertical) | Often Brown-Black-Black-Red-Brown | **10 kΩ?** | Low–Medium |

**Earlier conflicting overview claims** of many 680 kΩ / 150 kΩ / 22 kΩ parts were **not consistently reproducible** on magnified crops → discarded.

### Capacitors

| Cap | Silkscreen | Body marking (readable) | Likely function | Confidence |
|---|---|---|---|---|
| Left electrolytic | `22UF-250V` (CONFIRMED) | EPCOS; **450V**; part code fragment consistent with **10 µF** (`…106…`); also `US 560V` surge-style marking | Local HV rail reservoir / decouple (which rail = see §5) | Silkscreen high; body µF medium |
| Right electrolytic | Same footprint style; `22UF-250V` class marking on board | EPCOS **450V** (symmetric install) | Mate of left (other HV rail or same-rail dual mono) | Medium |
| Left yellow axial | Outline only | Reads vary: **`1.0µF`** class, **250V** (some crops said 400V) — brand text partially `MET…` / similar | **OUT-R coupling / DC block** (pad ties toward `OUT-R`) | Function high; exact printing medium |
| Right yellow axial | Outline only | Same family as left | **OUT-L coupling / DC block** | Function high; exact printing medium |

**Installed electrolytics do not match silkscreen µF/V exactly** (450 V parts on a `22UF-250V` legend; body suggests ~10 µF). Report both; do not invent a single “true” design value.

---

## 5. SIGNAL PATH / TOPOLOGY INFERENCE

### Name + rail evidence

- Board title **`GG-PRE AMP`** ⇒ intended **grounded-grid** line preamp family (not a Marantz 7 phono topology despite project name).
- **±200 V** bipolar HV + only **two** large electrolytics + **two** output film caps + **three** dual triodes in L/R-symmetric layout is consistent with a direct-coupled CF → GG → CF style line stage.

### Per-channel path (INFERRED skeleton)

**Right channel (IN-R → OUT-R):**
1. `IN-R` → series/grid resistor (value uncertain) → **V1** grid (pin 2 or 7).
2. **V1** implements the front-end for that channel (very likely **input cathode follower + grounded-grid gain** in one bottle — classic GG-preamp partition — but pin-level CF vs GG assignment is **not photo-proven**).
3. Interstage coupling toward **V3** (one triode half).
4. **V3** half as **output buffer** (cathode-follower strongly suggested by yellow cap from V3 region → `OUT-R`).
5. Yellow film → `OUT-R`.

**Left channel:** mirror through **V2** + other half of **V3** → other yellow film → `OUT-L`.

### Tube-section role hypothesis (INFERRED only)

| Tube | Role hypothesis | Basis | Status |
|---|---|---|---|
| V1 | Right-channel input CF + GG gain (both triodes) | Position by IN-R; dual-triode bottle; GG product class | INFERRED |
| V2 | Left-channel input CF + GG gain | Mirror of V1 | INFERRED |
| V3 | Dual output CF (one triode per channel) | Center placement; yellow caps at V3→OUT | INFERRED |

Alternative (less likely from layout): V1/V2 only input CFs, V3 holding both GG stages — **not favored** because V3 sits at the output capacitors.

### Role of ±200 V and the two electrolytics

- **`+200V`:** plate / B+ supply for gain and CF anodes (INFERRED).
- **`-200V`:** cathode-tail / negative rail for CF and/or GG stages, enabling wide bias headroom without huge cathode resistors to ground (INFERRED; common in ±HV GG designs).
- **Two electrolytics:** almost certainly **rail decoupling / local reservoirs** on the HV rails (one per rail and/or one per channel side). Polarity silkscreen `+` is visible near footprints; which can is on +200 vs −200 is **not uniquely confirmed** from these photos (UNKNOWN assignment).

### Left/right symmetry check

**CONFIRMED:** Highly symmetric component placement and solder-side routing about the vertical centerline. V3 and the center ground/power spine are shared. Minor asymmetry only where the power connector attaches on the V2 side.

---

## 6. NETLIST-STYLE CONNECTIONS

### CONFIRMED (justified from silkscreen + clear traces/pads)

1. Power pin `-200V` → enters board on its labeled pad (destination beyond entry: not fully traced).
2. Power pin `+12` → enters board on its labeled pad → participates in heater thick-rail network to V1/V2/V3 heater pins (exact pin map uncertain).
3. Power pin `+200V` → enters board on its labeled pad → thick HV distribution toward electrolytic pads / plate-resistor region.
4. Power pin `GND` → board ground network; also bonded to center pins of IN and OUT blocks (center pads sit on the ground spine).
5. `IN-R` / `IN-L` outer pads → thin traces into upper-socket (V1/V2) resistor/grid area.
6. Left yellow film pad pair ↔ `OUT-R` region (thickish component-side trace to `OUT-R` pad).
7. Right yellow film pad pair ↔ `OUT-L` region.
8. V1 & V2 & V3: heater-region pins **4 and 5** involved in a **common thick heater bus**; **pin 9** on a separate thick heater/return-style rail.
9. Electrolytic footprints sit on HV-related thick copper (rail filter role).

### INFERRED (topology-consistent; not fully visually proven)

1. `IN-R` → Rin → **V1 pin 2 (G1)** (or possibly G2) as input grid.
2. `IN-L` → Rin → **V2** corresponding grid.
3. Within V1/V2: cathodes of the two triodes coupled for CF→GG drive; GG grid referenced to GND (or AC ground).
4. V1 GG plate → couple/drive → **V3** grid (right half); V2 similarly → V3 left half.
5. **V3 pin 3 (K1)** → left yellow film → `OUT-R`.
6. **V3 pin 8 (K2)** → right yellow film → `OUT-L`.
7. Plate loads from `+200V` through anode resistors to V1/V2/V3 anodes.
8. Cathode tails / CCS-like resistors from cathodes toward `-200V`.
9. Electrolytic A from `+200V` to GND; electrolytic B from `-200V` to GND (or swapped) — **assignment unknown**.

---

## 7. UNREADABLE / UNKNOWN

Explicit list of what these photos do **not** settle:

1. **Most resistor values** — 718 px photos + glare; many band reads conflict (10k vs 68k vs 100k vs 220k).
2. **Resistor reference designators** — none readable.
3. **Exact heater polarity / series vs parallel wiring** — thick traces confirm heater involvement; `+12` vs 4–5 short conflict unresolved.
4. **Which electrolytic is on +200 V vs −200 V.**
5. **Exact installed electrolytic capacitance** — silkscreen `22µF`; body coding suggests ~`10µF` 450 V EPCOS.
6. **Exact yellow-cap print** — ~1.0 µF / ~250 V class, brand string not fully readable.
7. **Full pin-level netlist** under sockets and under large caps.
8. **Which V1/V2 triode is CF vs GG** (section A vs B).
9. **V3 gap clock position** — 6 vs 12 o’clock conflict across reads.
10. **Any hidden SMD / underside-only parts** — none obvious; not excluded.
11. **Power resistor wattage** — physical size suggests ≥0.5–1 W class only by eye.
12. **Off-board PSU details** — board expects already-regulated ±200 V and +12; no on-board rectifier visible on this PCB.

---

## Practical next steps (if continuing reverse-engineering)

1. Continuity-map heater pins 4/5/9 to `+12` and `GND` with a meter (settles series vs parallel).
2. Meter which electrolytic + pad ties to `+200V` vs `-200V`.
3. Multimeter ohms on each resistor (photo BOM is not trustworthy).
4. Buzz out IN → grid, plate → V3 grid, V3 cathode → film → OUT.

---

*Photos inspected: component-side and solder-side of the same GG-PRE AMP board. No manufacturer schematic was located online for cross-check during this pass.*

---

[← GG-PRE index](./gg-pre/README.md) · [Project](./README.md)
