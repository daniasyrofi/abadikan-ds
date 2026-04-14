# Navbar Pill Transition — Design Spec

**Date:** 2026-04-08
**File:** `src/components/landing/SharedNavbar.vue`
**Reference:** [Figma — DS Abadikan, node 96:2493](https://www.figma.com/design/paKhK3iPwW86aDL1sj8FeP/DS-Abadikan?node-id=96-2493)

---

## Goal

Animate the navbar between three visual states as the user scrolls and hovers, transitioning smoothly from a full-width transparent bar to a compact floating pill centered on screen.

---

## Three States

| State | Trigger | Pill max-width | Outer padding | Background | Border-radius |
|---|---|---|---|---|---|
| **Hero** | `scrollY ≤ 80` | `1040px` | `py-0 px-0` | transparent | none |
| **Scrolled** | `scrollY > 80` | `720px` | `py-2 px-4` | white + border + shadow-sm | `20px` all |
| **Mega open** | scrolled + mega menu | `720px` | `py-2 px-4` | white + border, no shadow | `20px` top only |

Text color: white (inverse) in Hero state, dark (heading) in Scrolled / Mega state.

---

## Architecture

Replace the current single-layer `Navbar DS (sticky)` pattern with two explicit layers:

```
shared-navbar-root
├── fixed outer div          ← positioning layer (transparent, always full-width)
│   └── pill div             ← visual layer (animates max-width, bg, border, radius)
│        └── Navbar DS       ← content layer (:sticky="false", variant="transparent")
│             ├── #start     logo
│             ├── #center    nav links + mega menu
│             └── #end       mode toggle + login + CTA + hamburger
└── spacer div h-[72px]      ← prevents content jump since outer is now fixed
```

### Outer fixed div

```html
<div class="fixed top-0 left-0 right-0 z-[100] flex justify-center
            transition-[padding] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
     :class="isScrolled ? 'px-4 py-2' : 'px-0 py-0'">
```

- Always full-width, always fixed to top
- Padding transitions to give the pill a floating gap from the viewport edge

### Pill div

```html
<div class="w-full transition-[max-width,background-color,border-color,border-radius,box-shadow]
            duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
     :class="pillClasses"
     @mouseenter="onNavEnter"
     @mouseleave="onNavLeave">
```

Computed `pillClasses`:
- **Hero:** `max-w-[1040px] bg-transparent border border-transparent rounded-none shadow-none`
- **Scrolled (no mega):** `max-w-[720px] bg-white border border-[var(--color-border)] rounded-[20px] shadow-sm`
- **Mega open:** `max-w-[720px] bg-white border border-[var(--color-border)] rounded-t-[20px] rounded-b-none shadow-none`

### Navbar DS

- Remove `:sticky="true"` → `:sticky="false"`
- Remove all `!bg-*`, `!border-*`, `!rounded-*`, `!shadow-*` overrides from `Navbar` — these move to the pill div
- Keep `!px-5` (internal content padding) or adjust to fit pill width
- Keep `variant="transparent"` so DS component adds no background of its own

### Spacer div

```html
<div class="h-[72px]" aria-hidden="true" />
```

Added immediately after the fixed outer div, inside `shared-navbar-root`. Prevents page content from sliding under the fixed nav.

---

## State Logic (no changes to existing JS)

```ts
const isScrolled = ref(false)
const hovering   = ref(false)
const showMega   = ref(false)
const mobileOpen = ref(false)

// bgActive still drives text color and button variants
const bgActive = computed(
  () => isScrolled.value || hovering.value || showMega.value || mobileOpen.value
)

function onScroll() {
  isScrolled.value = window.scrollY > 80   // raised from 10 → 80
}
```

Scroll threshold raised from `10` to `80` so the pill transition only begins after the user has clearly left the hero area.

---

## Mega Menu Positioning

The mega menu panel is positioned `absolute top-[100%]` relative to the "Template" nav item container. This is unchanged — it still drops below the pill. Because the pill's `border-radius` switches to `rounded-t-[20px]` when `showMega` is true, the panel's `rounded-b-[24px]` will correctly connect flush with the pill's bottom edge.

---

## Mobile

No changes. The mobile hamburger, drawer, and `mobileOpen` state are all preserved. The `fixed` positioning of the outer container already ensures the mobile drawer (`fixed top-[64px]`) continues to work correctly.

---

## What Does NOT Change

- All slot content (logo, nav links, mode toggle, buttons, hamburger)
- Mega menu panel HTML and transition animations
- `bgActive` logic driving text colors, button variants, and mode toggle theme
- Mobile drawer HTML and transitions
- All existing `@click` navigate handlers
