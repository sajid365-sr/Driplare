# bg-effects — Usage Reference

## Install

Place `bg-effects.tsx` in `@/components/ui/bg-effects.tsx`

---

## All exports

```tsx
import {
  BRAND, // Color token object
  GridLayer, // SVG grid lines
  DarkGridBoost, // Grid overlay for dark mode only
  GlowBlob, // Single animated glow orb
  Particles, // Floating animated dots
  AccentLine, // Vertical or horizontal gradient line
} from "@/components/ui/bg-effects";
```

---

## BRAND tokens

```tsx
BRAND.violet; // "#7c3aed"  → primary
BRAND.blue; // "#3b82f6"  → secondary
BRAND.emerald; // "#10b981"  → accent
BRAND.red; // "#ef4444"
BRAND.amber; // "#f59e0b"
```

---

## GridLayer

| Prop          | Type                | Default        | Description          |
| ------------- | ------------------- | -------------- | -------------------- |
| `color`       | `string`            | `BRAND.violet` | Grid line color      |
| `opacity`     | `number`            | `0.04`         | Opacity (light mode) |
| `cellSize`    | `number`            | `48`           | Grid cell size in px |
| `strokeWidth` | `number`            | `0.7`          | Line thickness in px |
| `style`       | `"lines" \| "dots"` | `"lines"`      | Grid style           |

```tsx
// Default violet grid
<GridLayer />

// Blue dots grid, more visible
<GridLayer color={BRAND.blue} style="dots" opacity={0.06} cellSize={32} />

// Emerald, fine lines
<GridLayer color={BRAND.emerald} strokeWidth={0.5} cellSize={64} />
```

---

## DarkGridBoost

Same props as GridLayer. Only renders in dark mode. Layer it directly after `<GridLayer />`.

```tsx
<GridLayer color={BRAND.violet} opacity={0.04} />
<DarkGridBoost color={BRAND.violet} opacity={0.055} />
```

---

## GlowBlob

| Prop       | Type           | Default        | Description                       |
| ---------- | -------------- | -------------- | --------------------------------- |
| `color`    | `string`       | `BRAND.violet` | Blob color                        |
| `position` | `BlobPosition` | `"top-left"`   | Where to anchor the blob          |
| `size`     | `number`       | `500`          | Diameter in px                    |
| `blur`     | `number`       | `120`          | Blur radius in px                 |
| `opacity`  | `number`       | `0.07`         | Blob opacity                      |
| `animate`  | `boolean`      | `true`         | Enable/disable drift animation    |
| `duration` | `number`       | `18`           | Animation loop duration (seconds) |
| `delay`    | `number`       | `0`            | Animation start delay (seconds)   |
| `drift`    | `number`       | `25`           | Drift movement in px              |

**Position values:**

```
"top-left"     "top-center"     "top-right"
"left-center"  "center"         "right-center"
"bottom-left"  "bottom-center"  "bottom-right"
```

```tsx
// Classic dual blob setup
<GlowBlob color={BRAND.violet} position="top-left" size={500} opacity={0.07} />
<GlowBlob color={BRAND.blue} position="bottom-right" size={450} opacity={0.06} delay={4} />

// Three blobs for richer effect
<GlowBlob color={BRAND.violet}  position="top-left"     size={600} opacity={0.06} duration={20} />
<GlowBlob color={BRAND.blue}    position="bottom-right" size={500} opacity={0.05} duration={24} delay={3} />
<GlowBlob color={BRAND.emerald} position="center"       size={400} opacity={0.04} duration={16} delay={7} />

// Static blob (no animation)
<GlowBlob color={BRAND.violet} position="top-right" animate={false} opacity={0.05} />
```

---

## Particles

| Prop         | Type       | Default                   | Description                         |
| ------------ | ---------- | ------------------------- | ----------------------------------- |
| `colors`     | `string[]` | `[violet, blue, emerald]` | Particle colors (cycles through)    |
| `count`      | `number`   | `18`                      | Number of particles                 |
| `minSize`    | `number`   | `1.2`                     | Min dot diameter in px              |
| `maxSize`    | `number`   | `3.5`                     | Max dot diameter in px              |
| `minOpacity` | `number`   | `0.1`                     | Min pulse opacity                   |
| `maxOpacity` | `number`   | `0.45`                    | Max pulse opacity                   |
| `speed`      | `number`   | `1`                       | Speed multiplier (0.5=slow, 2=fast) |

```tsx
// Default
<Particles />

// Violet-only, fewer, slower
<Particles colors={[BRAND.violet]} count={10} speed={0.6} />

// All brand colors, more particles
<Particles colors={[BRAND.violet, BRAND.blue, BRAND.emerald]} count={28} />

// Subtle (low opacity range)
<Particles minOpacity={0.05} maxOpacity={0.25} count={12} />
```

---

## AccentLine

| Prop        | Type                       | Default        | Description                |
| ----------- | -------------------------- | -------------- | -------------------------- |
| `color`     | `string`                   | `BRAND.violet` | Line color                 |
| `direction` | `"vertical"\|"horizontal"` | `"vertical"`   | Line direction             |
| `position`  | `string`                   | `"left-[22%]"` | Tailwind positioning class |
| `opacity`   | `number`                   | `0.12`         | Line opacity               |

```tsx
// Two vertical lines
<AccentLine color={BRAND.violet} position="left-[22%]" opacity={0.1} />
<AccentLine color={BRAND.blue}   position="right-[18%]" opacity={0.08} />

// Horizontal divider line
<AccentLine direction="horizontal" color={BRAND.emerald} position="top-[50%]" opacity={0.06} />
```

---

## Full section example

```tsx
import {
  GridLayer,
  DarkGridBoost,
  GlowBlob,
  Particles,
  AccentLine,
  BRAND,
} from "@/components/ui/bg-effects";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-background dark:bg-[#0a0a12]">
      {/* Background layers */}
      <GridLayer color={BRAND.violet} opacity={0.04} />
      <DarkGridBoost color={BRAND.violet} opacity={0.055} />
      <GlowBlob
        color={BRAND.violet}
        position="top-left"
        size={550}
        opacity={0.07}
      />
      <GlowBlob
        color={BRAND.blue}
        position="bottom-right"
        size={450}
        opacity={0.06}
        delay={4}
      />
      <AccentLine position="left-[25%]" color={BRAND.violet} opacity={0.09} />
      <Particles colors={[BRAND.violet, BRAND.blue]} count={16} />

      {/* Content always gets z-10 */}
      <div className="relative z-10 container mx-auto px-6">...</div>
    </section>
  );
}
```

---

## Rules

1. The parent section must have `relative` and `overflow-hidden`
2. Your content wrapper must have `relative z-10` (or higher)
3. Never use `position: fixed` — always `absolute`
4. Stack multiple `<GlowBlob>` for richer effect (2–3 max per section)
5. `<Particles>` is client-only — it hydrates after mount, no SSR flash
