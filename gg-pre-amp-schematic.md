[← GG-PRE index](./gg-pre/README.md) · [Project](./README.md)

# GZLOZONE / Zero Zone GG-PRE AMP — Reverse-Engineered Schematic

Stereo tube line preamp PCB, three× **12AU7**, bipolar HV **±200 V**, heaters **+12 V**. Reverse-engineered from board photos for the Marantz 7–related project (this board is a **grounded-grid / “GG” reference**, not a Marantz 7 circuit).

| | |
|---|---|
| **Board marking** | `GZLOZONE®` · `ZERO ZONE` · `GG-PRE AMP` |
| **PCB size (seller)** | 132 × 132 mm, 1.5 mm, ~50 µm Cu |
| **Tubes** | 3× 12AU7 (ECC82), B9A sockets |
| **Primary sources** | Component-side + solder-side photos; seller listings (FYFAudio / AliExpress item 32817540189) |
| **Topology lineage** | Chinese clone of Bruce Rozenblit / Transcendent Sound “Grounded Grid” line stage (CF → GG → CF, ±HV). Original published schematic is in *Audio Reality* (not reproduced here). |

**Confidence legend:** **C** = confirmed from silkscreen / clear photo · **I** = inferred from layout + known GG topology · **U** = unknown / conflicting photo reads — measure before building.

---

## 1. Topology summary

Each channel is a **cathode-follower input buffer** driving a **grounded-grid (common-cathode) gain stage**, then a **cathode-follower output buffer**, AC-coupled to the RCA/terminal output.

```
IN-x ──► [input CF] ──cathode-couple──► [GG gain] ──► [output CF] ──► Cout ──► OUT-x
              ▲                              │
              │         grid ≈ AC ground      │
              └──────── feedback (likely) ────┘
```

- **Non-inverting** overall (CF + GG both preserve phase).
- Seller / clone literature: ~**12 dB** gain, ~**300 Ω** Zout, bandwidth into the hundreds of kHz (Transcendent / listing claims).
- **±200 V** gives headroom for CF cathode loads to the negative rail without huge resistors to ground.
- Board has **no on-board rectifier** — expects [GG-PSU](./gg-psu/README.md) (AC→±200 V DC + 12 V heaters).

### Tube role map (inferred)

| Tube | Position (component side) | Role (**I**) |
|------|---------------------------|--------------|
| **V1** | Top-left, near `IN-R` | Right channel: input CF + GG gain (both triode halves) |
| **V2** | Top-right, near `IN-L` / power | Left channel: input CF + GG gain |
| **V3** | Center, above yellow film caps | Dual output CF (one half per channel) |

Alternative (less likely from layout): V3 holds both GG stages. **Not favored** — yellow output coupling caps sit at the V3 / bottom area.

---

## 2. Connectors

### Power — 4-pin screw terminal (right edge) **C**

| Pin (top → bottom) | Net | Notes |
|--------------------|-----|--------|
| 1 | **−200 V** | Negative HV rail |
| 2 | **+12** | Heater supply (~12–12.6 V DC class) |
| 3 | **+200 V** | Positive HV / B+ |
| 4 | **GND** | Common ground |

### Audio IN — 3-pin (top center) **C**

| Pin (left → right) | Net |
|--------------------|-----|
| 1 | **IN-R** |
| 2 | **GND** |
| 3 | **IN-L** |

### Audio OUT — 3-pin (bottom center) **C**

| Pin (left → right) | Net |
|--------------------|-----|
| 1 | **OUT-R** |
| 2 | **GND** |
| 3 | **OUT-L** |

---

## 3. 12AU7 pinout (standard)

| Pin | Function |
|-----|----------|
| 1 | Anode / plate section 1 |
| 2 | Grid section 1 |
| 3 | Cathode section 1 |
| 4 | Heater |
| 5 | Heater |
| 6 | Anode / plate section 2 |
| 7 | Grid section 2 |
| 8 | Cathode section 2 |
| 9 | Heater center tap |

Socket key / gap on V1 and V2: approximately **6 o’clock** (toward board bottom) on the component side **C**. V3 gap clock is **U** (reads conflict 6 vs 12 o’clock).

### Heater wiring **U — measure**

- Silkscreen **`+12`** implies intended **12.6 V series** heaters: one end of 4–5 string to `+12`, other to `GND`, pin 9 unused.
- Solder-side photos also show **thick bridging in the pin 4/5 region** on each socket, which can look like a **6.3 V parallel** hookup (4+5 tied, return on 9).
- **Do not assume either.** Continuity-check pins 4, 5, 9 to `+12` and `GND` on a physical board before applying power.

---

## 4. Per-channel schematic (netlist style)

Reference designators below are **assigned for this document** (board has no readable R/C numbers). Values marked **U** must be verified with a meter.

### Right channel (mirror for left: V1→V2, CoutR→CoutL, IN-R→IN-L, OUT-R→OUT-L)

```
                         +200V
                           │
                        Ra_gg   (plate load of GG section)     U value
                           │
                           ├──► (optional couple / direct) ──► G of V3 out-CF
                           │
                      [V1 GG]  plate = A_gg
                      grid ──► AC ground (hard GND or via bypass)   I
                      cathode ─┬── tied / coupled to CF cathode    I
                               │
                         [V1 CF]  plate → +200V (direct or small R) I
                          grid ◄── Rin ◄── IN-R                    I / U Rin
                      cathode ─┴── Rk_cf ──► −200V                 I / U Rk
                           │
                      feedback network (likely from out-CF / Cout)  I / U

      +200V
        │
     Ra_cf_out (or plate direct to +200V)                          U
        │
   [V3 out-CF] plate
        grid ◄── from GG plate (DC or AC couple)                   I
     cathode ──┬──► CoutR (1.0 µF) ──► OUT-R                       C path
               └── Rk_out ──► −200V or GND                         I / U
```

### Shared / power

```
+200V ── Cdec+ ── GND     electrolytic; silkscreen 22µF-250V     C silk / U rail assign
−200V ── Cdec− ── GND     mate electrolytic                        I / U assign
+12   ── heaters V1,V2,V3 ── (GND or series return)                U
GND   ── IN/OUT center pins, ground pour                           C
```

### Functional block diagram (stereo)

```
                    +200V / −200V / +12 / GND
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
      IN-R                 heaters              IN-L
         │                    │                    │
      ┌──┴──┐              ┌──┴──┐              ┌──┴──┐
      │ V1  │              │ V3  │              │ V2  │
      │CF+GG│────► half ──►│2×CF │◄── half ─────│CF+GG│
      └─────┘              └──┬──┘              └─────┘
                              │
                    CoutR / CoutL (1.0 µF)
                              │
                         OUT-R / OUT-L
```

---

## 5. BOM table (photo-derived)

Assigned refs are for rebuild documentation only. Detailed band reads: [gg-pre-component-id.md](./gg-pre-component-id.md).

| Ref | Qty | Value | Notes | Conf |
|-----|-----|-------|-------|------|
| V1–V3 | 3 | 12AU7 / ECC82 | Ceramic B9A sockets on PCB | **C** |
| CoutR, CoutL | 2 | **1.0 µF ±5%** film, Un **250 V~** | ARCOTRONICS MKP C.4G; OUT coupling | **C** |
| CdecL, CdecR | 2 | Installed **10 µF / 450 V** | EPCOS B43588-S5106-T…; silk `22UF-250V` | **C** body / **C** silk |
| — | 1 | 4-pin screw terminal | Power | **C** |
| — | 2 | 3-pin screw terminal | IN, OUT | **C** |

### Resistors — R1–R14 (user confirmed, 2026-11-09)

Full table with estimated wattage: [gg-pre-component-id.md](./gg-pre-component-id.md). Resistor locations: [numbered board photo](./pcb-photos/component-side-resistors-numbered.jpg).

| Ref | Value | Est. power | Region |
|-----|-------|------------|--------|
| R1, R3 | 50 kΩ | ~2 W | Top, V1 / V2 |
| R2, R4 | 10 kΩ | ~1 W | Top, input / power |
| R5, R6 | 30 kΩ | ~2 W | Mid horizontal (V3) |
| R7, R8 | 10 kΩ | ~1 W | Mid |
| R9, R10 | 3 kΩ | ~1 W | Mid |
| R11, R12 | 20 kΩ | ~1 W | Above Cout L/R |
| R13, R14 | 100 kΩ | ~1 W | OUT L/R vertical string |

Numbering matches ink on the component-side overview photo.

---

## 6. Power, heaters, audio I/O (rebuild checklist)

| Item | Spec |
|------|------|
| B+ | **+200 V DC**, low current (seller PSU class ~50 mA HV) |
| B− | **−200 V DC**, similar current class |
| Heaters | **+12 V DC** (listing / silk); confirm series vs parallel on PCB |
| Ground | Single GND star/pour — bond IN/OUT/power GND; chassis star / 10 Ω / strap → [marantz-7-vs-gg-reference.md §5](./marantz-7-vs-gg-reference.md#5-star-grounding-deep-dive) |
| Input Z | Clone literature ~50 kΩ class (Transcendent); **U** on this PCB |
| Output | AC-coupled via 1.0 µF; Zout ~200–300 Ω (literature) |
| Gain | ~12 dB / ~×4–×6 (listings) |

**Safety:** ±200 V is lethal. Bleed electrolytics before probing. Observe polarity on Cdec (± rails).

---

## 7. Assumptions and uncertainties

1. **Topology** is Rozenblit-style CF→GG→CF with V1/V2 as channel front-ends and V3 as dual output CF — strong layout fit, not continuity-proven.
2. **Exact pin map** (which V1 half is CF vs GG; which V3 pins feed CoutR vs CoutL) needs a buzz-out.
3. **Most resistor values** are not trustworthy from these photos alone.
4. **Heater series vs parallel** unresolved (`+12` silk vs apparent 4–5 bridging).
5. **Which electrolytic is on +200 vs −200** unresolved (both are HV rail filters **I**).
6. **Installed electrolytics** may be 10 µF/450 V on a 22 µF/250 V silk — rebuild either to silk or to measured parts.
7. **Feedback network** almost certainly present (gain figures imply local/global NFB) but resistor identification is **U**.
8. AliExpress page returned no usable BOM/schematic text in this environment; FYFAudio confirms ±200 V + 12 V and 3×12AU7 only.
9. This is **not** a Marantz 7 schematic — use it as a GG reference board in that project context.

### Recommended verification on a physical board

1. Continuity: heater pins 4/5/9 ↔ `+12` / `GND`.
2. Continuity: each electrolytic `+` pad ↔ `+200V` or `−200V`.
3. Ohmmeter every resistor; redraw BOM.
4. Trace IN → grid, GG plate → V3 grid, V3 cathode → Cout → OUT.

---

## 8. Companion visual

SVG schematic (one channel + shared power/heaters + stereo notes):

- [`gg-pre-amp-schematic.svg`](./gg-pre-amp-schematic.svg)

---

## 9. Source photos

- [pcb-photos/component-side.jpg](./pcb-photos/component-side.jpg)
- [pcb-photos/solder-side.jpg](./pcb-photos/solder-side.jpg)

Detailed visual pass: [gg-pre-pcb-reverse-engineering.md](./gg-pre-pcb-reverse-engineering.md)

---

[← GG-PRE index](./gg-pre/README.md) · [Project](./README.md)
