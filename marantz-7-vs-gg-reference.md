[← Project](./README.md) · [GG-PRE](./gg-pre/README.md) · [GG-PSU](./gg-psu/README.md)

# Marantz Model 7 vs Bruce Rozenblit GG — reference map

This note ties together three topics for this project folder:

1. **Kit lineage** — your **Zero Zone GG-PRE + GG-PSU** vs the [Kikitronic / Analogmetric GG DIY kit](https://kikitronic.blogspot.com/2009/11/grounded-grid-pre-amplifier.html) (same Rozenblit circuit family).
2. **Technical role map** — what each design does electrically, and where a GG board can (and cannot) sit relative to a **Marantz Model 7** signal path.
3. **Star grounding** — what clone sellers and builders mean, how it applies to split GG boards, and how that differs from classic Marantz practice.

**Confidence:** Marantz figures below are from factory manuals/spec sheets (7 / 7T / 7C). GG numbers marked **(lit)** come from Transcendent / clone listings; **(measured)** means you must meter your board.

---

## 1. Same family as the Kikitronic blog kit?

**Yes — same topology and intent**, different vendor PCB and parts.

| Item | Kikitronic / Analogmetric kit (blog) | Your Zero Zone boards |
|------|--------------------------------------|------------------------|
| Designer lineage | Bruce Rozenblit, Transcendent Sound “Grounded Grid” | Same **(I)** — see [gg-pre-amp-schematic.md](./gg-pre-amp-schematic.md) |
| Tubes | 3× 12AU7 (often Shuguang) | 3× 12AU7 **C** |
| HV supply | ±200 V from split PSU PCB | ±200 V from **GG-PSU** **C** |
| Heaters | 12.6 V class, LT1085 on PSU | +12 V silk on **GG-PRE**; wiring **U** |
| Topology | Input CF → grounded-grid gain → output CF | Same **I** |
| Gain (example) | ~14 dB with 100 kΩ / 20 kΩ ratio (blog) | ~12 dB **(lit)**; R11–R14 include 20 kΩ / 100 kΩ pairs **C** |
| Rectification | On PSU PCB | On **GG-PSU** only; **GG-PRE** has no on-board HV rectifier **C** |

Your folder README states clearly: these boards are **reference material**, **not** a Marantz 7 schematic.

---

## 2. Marantz 7 — what the original actually is

The **Marantz Model 7** is a **full stereo control preamplifier** (1958–1966 era), not a single line stage.

### Signal path (simplified, from 7C service manual)

```
Low-level inputs (mic / phono / tape head)
        │
        ▼
   Preamp V2 + V3  (~40–42 dB + equalization in feedback)
        │
        ├──► Recording outputs (lower gain taps)
        │
High-level inputs ──► selector ──► Mode / filter routing
        │
        ▼
   Tone amplifier V5  (~22.5 dB, bass/treble in feedback)
        │
        ▼
   Optional LF / HF filters
        │
        ▼
   Cathode follower V6  (low Z drive, level control)
        │
        ▼
   Main outputs (~10 V rms max, ~600 Ω class)
```

**Tubes:** 6× **12AX7 (ECC83)** — higher μ, different stage jobs than the GG’s 12AU7 line stage.

### Published specs (representative)

| Parameter | Marantz Model 7 | Notes |
|-----------|-----------------|--------|
| High-level input → main output gain | **~21.5 dB** (balance centered) | Manual: “high level” path |
| Phono → main output | **~63–64.5 dB** | Includes low-level preamp + rest of chain |
| Line input Z | **~100 kΩ** | User-manual class |
| Main output Z | **~600 Ω** | Drives long cables / 600 Ω loads |
| Max main output | **~10 V rms** | Service / manual |
| S/N (phono, RIAA) | **~80 dB** ref 10 mV | Spec sheet class |
| Tone / filters / selector | **Yes** | Not in GG kit |

Sources: [Rubli specs](https://www.rubli.net/classic_amps/files/amps/marantz/7c/specs.htm), Marantz 7T instruction manual (technical section), 7C service manual.

---

## 3. Grounded Grid (GG) — what your kit is

### Topology

Per channel:

```
IN ──► [input cathode follower] ──► [grounded-grid gain] ──► [output CF] ── Cout ──► OUT
```

- **Non-inverting** end-to-end.
- **Grounded grid:** AC signal on cathode; grid held near **AC ground** (critical for noise — see §5).

### Electrical snapshot

| Parameter | GG kit (your docs + clone literature) | Marantz 7 (high-level path only) |
|-----------|--------------------------------------|----------------------------------|
| Function | **Line stage only** | **Complete preamp** |
| Voltage gain | **~12 dB** **(lit)** (~×4) | **~22.5 dB** tone stage alone; **~21.5 dB** high-level system gain |
| Input Z | **~50 kΩ** **(lit)**; R2/R4 = 10 kΩ on PCB **C** — treat **U** until traced | **~100 kΩ** |
| Output Z | **~200–300 Ω** **(lit)**; V6 analogue is **~600 Ω** | Different drive philosophy |
| Headroom | **±200 V rails** → very high internal swing | Lower B+, but **10 V** rated output at end |
| Phono / EQ / tone | **None** | **Core product** |
| Output coupling | **1.0 µF film** per channel **C** | DC paths + CF at output |

### Gain budget intuition

- Putting **GG after** a Marantz 7 **main output** would add ~12 dB — usually **too much** unless the Marantz level control is backed off or you only need a buffer substitute experiment.
- **GG is not a substitute** for Marantz **V2/V3 phono preamp** (no RIAA, wrong gain structure).
- **GG is not a drop-in** for **V5 tone amplifier** (no tone switches, different gain and feedback).
- Closest **functional** analogue in the Marantz is **V6 output cathode follower** — both aim for **low Z** and cable drive — but GG adds **~12 dB gain** and is **AC-coupled**, while V6 includes **level attenuation** and is part of a fixed **21.5 dB** high-level gain budget.

---

## 4. Where a GG board *could* sit in a “Marantz-inspired” build

Think in **roles**, not silkscreen compatibility.

| Idea | Feasibility | Comment |
|------|-------------|---------|
| **Faithful Model 7 clone** | **Do not use GG as core** | Build Marantz channel/EQ/selector from 7C schematic; GG docs are only background reading. |
| **External line stage** | **Good fit** | GG between any high-level source (DAC, tuner, restored Marantz line out) and power amp — classic Rozenblit use case. |
| **Replace V6 only** | **Poor fit** without redesign | Gain and level-control mismatch; would need attenuation / different feedback. |
| **Quiet line buffer reference** | **Good fit** | Study GG **CF → GG → CF** and **grounding** when designing your own Marantz output strip. |
| **Phono front-end** | **Wrong tool** | Need 12AX7 MM/MC or op-amp RIAA, not GG. |

### Block diagram: GG as *external* line stage (Marantz 7 still doing tone/EQ)

```
Source ──► [ Marantz 7: selector → tone → filters → V6 ] ──► (optional) ──► [ GG-PRE ] ──► Power amp
                └─ ~21.5 dB high-level path ─┘                              └─ +12 dB ─┘
```

Only sensible if total gain and headroom are planned; often the Marantz output **alone** is enough.

### Block diagram: Marantz 7 restoration (no GG in signal path)

```
Sources ──► [ Model 7 complete chain ] ──► Power amp
              GG kit used only as grounding/topology reference in the workshop
```

---

## 5. Star grounding (deep dive)

Clone builders (including the [Kikitronic GG article](https://kikitronic.blogspot.com/2009/11/grounded-grid-pre-amplifier.html)) stress grounding as much as the tube circuit. That matches Rozenblit’s grounded-grid line stage: the **grid is at signal ground**, so **where “ground” lives** directly affects hum and buzz.

### 5.1 What “star ground” means here

- **One reference node** (the “star”) is the **only** place where **power returns**, **signal returns**, and **chassis** should meet for **small-signal** purposes.
- Currents from **HV regulation**, **rectifiers**, and **heaters** should **not** share a long PCB trace with **input RCA return** before that point.
- **Goal:** keep **IR drop** in ground away from the **input cathode follower** and **grounded-grid** grid reference.

This is stricter than “solder everything labeled GND together anywhere.”

### 5.2 What Bruce Rozenblit / kit notes recommend (two equivalent methods)

From clone documentation (Kikitronic / Transcendent tradition):

1. **RCA input ground lift resistor:** **10 Ω**, **0.5 W**, from **input connector sleeve** to **chassis** (or to the star), so cable shield currents prefer chassis path while still referencing the audio ground.
2. **Copper strap:** PCB **GND pad** (often near the **input filter / PSU entry** — kits include a **dedicated hole** for a strap) to **chassis** with a short **wide copper** strip for low inductance.

Either method is reported to reduce **hum pickup**; builders say little difference between them. Your Zero Zone PCB may not silkscreen the strap hole the same way as Analogmetric — **find the input-side ground pour or power `GND` terminal** and use the **shortest** chassis tie consistent with a single star.

### 5.3 What your GG-PRE PCB already does **C**

From reverse-engineering:

- **Power terminal `GND`** (pin 4), **IN center**, and **OUT center** tie into a **shared ground pour / spine** on the board ([gg-pre-pcb-reverse-engineering.md](./gg-pre-pcb-reverse-engineering.md)).
- That is a **PCB-local star/pour**, not yet a **chassis** star until **you** wire it.

**Implied kit practice:** run signal **between boards with twisted pairs or coax**; bring **`GND` from GG-PSU** to **GG-PRE pin 4**; bond **chassis at one point** chosen by you (often near **input** or **PSU**, not both aggressively).

### 5.4 GG-PSU grounding — extra caution **U**

Photos/docs note unresolved details:

- **Filament return** may be **isolated** from **HV return** on some builds until the user bonds them ([gg-psu-pcb-reverse-engineering.md](./gg-psu-pcb-reverse-engineering.md)).
- **±200 V** is formed by strapping **one reg positive** and **the other negative** to **common GND** ([gg-psu-schematic.md](./gg-psu-schematic.md) §2).

**Practical rule:** after strapping, **one** wire from the **PSU signal/HV reference** to **GG-PRE `GND`**; **one** chassis bond at the star; **avoid** connecting **chassis** at both PSU and preamp through **separate long paths** that parallel the signal cable shield.

### 5.5 Grounded-grid and “AC ground” on the grid

On the gain stage, the **grid** must sit at a **clean AC ground** (often direct to the local ground plane with appropriate grid leak — **100 kΩ** class on your OUT strings R13/R14 **C**, grid leaks **I** elsewhere).

If the **grid reference is noisy** (because rectifier current walked through the same trace as IN GND), hum **modulates** the GG stage even though gain is modest. That is why sellers push **chassis strap at input/PSU** rather than only at the output jacks.

### 5.6 Marantz Model 7 vs GG grounding philosophy

| | **Classic Marantz 7** | **GG clone practice** |
|--|----------------------|-------------------------|
| Era | 1950s–60s **chassis**, selector switches, long wire harness | 2000s **compact PCB**, external PSU, **RCA blocks** |
| Returns | Chassis + power transformer + multiple sub-circuits; restoration guides often **re-star** the whole amp | **Explicit single-point** + **10 Ω** or **copper strap** to chassis |
| Heaters | AC 6.3 V, hum cancellation layout in original | DC 12 V from **LT1085** on PSU — hum depends on **where filament return** meets star **U** on your PSU |
| HV ground | Single B+ reference | **Bipolar ±200 V** — **GND is midpoint**; symmetry matters for CF biases |

Restoring a **real Marantz 7** still benefits from a **single chassis star**, but the **physical points** follow **7C service manual** grounding, not the GG PCB hole. Use GG notes when **borrowing techniques** (input 10 Ω, short chassis strap), not as a pin-for-pin map.

### 5.7 Suggested bring-up order (GG pair in a chassis)

1. **Meter first:** heater pins 4/5/9 vs `+12` / `GND`; electrolytic polarity on ± rails; PSU strap for ±200 V ([gg-pre-amp-schematic.md](./gg-pre-amp-schematic.md) checklist).
2. **Power up** with **tubes out**; verify **+200 V**, **−200 V**, **+12 V** at **GG-PRE** terminals.
3. **Identify star point:** e.g. **GG-PSU GND strap terminal** → short wire → **input-side ground** on preamp (not output jacks first).
4. **Chassis bond:** one **copper strap** or **10 Ω** from **input sleeve net** to chassis per Rozenblit method.
5. **Signal check:** shorted input, listen for hum; then **single** source with **source chassis** grounded through **one** path (avoid ground loops via PC + amp + second chassis tie).

---

## 6. Quick comparison table (one glance)

| | **Marantz Model 7** | **GG-PRE (Zero Zone)** |
|--|---------------------|-------------------------|
| Same as Kikitronic blog kit? | **No** | **Yes** (same family) |
| Tubes | 6× 12AX7 | 3× 12AU7 |
| Line gain (order of) | **~22 dB** (high-level system) | **~12 dB** |
| Z out main line | **~600 Ω** | **~300 Ω** **(lit)** |
| ± HV | No (classic B+) | **±200 V** |
| Star ground emphasis | Implicit in original layout; rebuild guides vary | **Explicit in kit docs** (10 Ω or strap) |

---

## 7. Further reading in this repo

| Doc | Topic |
|-----|--------|
| [gg-pre-amp-schematic.md](./gg-pre-amp-schematic.md) | GG topology, connectors, assumptions |
| [gg-pre-component-id.md](./gg-pre-component-id.md) | R1–R14, Cout, HV caps |
| [gg-psu-schematic.md](./gg-psu-schematic.md) | ±200 V formation, filament reg |
| [gg-psu-pcb-reverse-engineering.md](./gg-psu-pcb-reverse-engineering.md) | PSU star / filament return **U** |

External: [Kikitronic — Grounded Grid Pre-amplifier (2009)](https://kikitronic.blogspot.com/2009/11/grounded-grid-pre-amplifier.html).

---

[← Project](./README.md)
