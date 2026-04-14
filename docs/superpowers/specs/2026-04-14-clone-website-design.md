# Clone Website — Claude Code Skill Design Spec

**Date:** 2026-04-14
**Goal:** Claude Code skill (`/clone-website <url>`) yang bisa clone website apapun menjadi komponen Vue 3 SFC standalone dengan animasi GSAP yang akurat, termasuk scroll-triggered dan JS-driven animations.

## Overview

Skill ini berjalan sebagai pipeline 4 fase di dalam Claude Code. Menggunakan Playwright untuk browser automation dan multi-layer capture strategy untuk menangkap semua jenis animasi (CSS, GSAP, scroll-triggered, JS-driven).

Output berupa folder terpisah di `cloned-sites/<domain>/` yang rapi dan bisa diedit ulang — tidak menyentuh `src/` sama sekali.

## Constraints

- **Tidak boleh mengganggu project Abadikan DS** — skill hidup di `.claude/skills/`, output di `cloned-sites/`
- **Branch terpisah** — semua development di branch `feature/clone-website`
- **Dependencies minimal** — Playwright sudah ada di devDependencies, GSAP sudah ada di dependencies
- **Output standalone** — file Vue yang dihasilkan bisa dipake di project mana aja tanpa dependency ke Abadikan DS

## Architecture

### Skill Entry Point

```
.claude/skills/clone-website/
├── skill.md              # Skill definition (prompt + instructions)
└── scripts/
    ├── capture.ts        # Playwright capture script (Phase 1-2)
    ├── layers/
    │   ├── cdp-animations.ts    # Layer 1: CDP Animation Domain
    │   ├── web-animations.ts    # Layer 2: Web Animations API
    │   ├── gsap-extract.ts      # Layer 3: GSAP timeline extraction
    │   ├── scroll-discover.ts   # Layer 4: Scroll discovery
    │   └── css-extract.ts       # Layer 5: CSS stylesheet parsing
    ├── generate.ts       # Vue SFC generator (Phase 4)
    └── utils.ts          # Shared utilities
```

### Pipeline

#### Phase 1: RECON (Quick Scan)

Playwright opens URL and collects baseline data:

1. **Screenshots** at 3 viewports: 375px (mobile), 768px (tablet), 1440px (desktop)
2. **Metadata extraction:**
   - Page title, description, favicon
   - Font families (from computed styles)
   - Color palette (extract unique colors from all elements)
3. **Framework detection:**
   - `window.gsap` → GSAP present
   - `window.ScrollTrigger` → ScrollTrigger present
   - `window.anime` → anime.js
   - `window.MotionOne` → Motion One
   - Check for `data-aos`, `data-scroll`, `data-animate` attributes
4. **DOM structure snapshot:**
   - Full HTML of `<body>`
   - Computed styles of all section-level elements
5. **Asset collection:**
   - Download all `<img>` src, `<video>` src, background images
   - Download external fonts (from `@font-face` rules)

#### Phase 2: CAPTURE (Multi-Layer Animation Recording)

Run 5 capture layers while interacting with the page:

**Layer 1 — CDP Animation Domain (passive listener)**
```typescript
const client = await page.context().newCDPSession(page)
await client.send('Animation.enable')
client.on('Animation.animationStarted', ({ animation }) => {
  // Capture: type, keyframes, timing, easing, target backendNodeId
  // Resolve backendNodeId → CSS selector via DOM.describeNode
})
```
- Captures: CSS animations, CSS transitions, Web Animations API
- Runs passively throughout all interactions

**Layer 2 — Web Animations API (active sweep)**
```typescript
await page.evaluate(() => {
  return document.getAnimations().map(a => ({
    type: a.constructor.name,
    keyframes: a.effect?.getKeyframes(),       // actual CSS values
    timing: a.effect?.getComputedTiming(),      // full timing data
    target: getCSSSelector(a.effect?.target),
  }))
})
```
- Richer than CDP — returns actual CSS property values per keyframe
- Run at page load + after each scroll position

**Layer 3 — GSAP Extraction (conditional)**
```typescript
const gsapData = await page.evaluate(() => {
  if (!window.gsap) return null
  const tweens = gsap.globalTimeline.getChildren(true, true, true)
  const triggers = window.ScrollTrigger?.getAll() || []
  return {
    tweens: tweens.map(t => ({
      targets: getCSSSelectors(t.targets()),
      vars: t.vars,
      duration: t.duration(),
      delay: t.delay(),
      startTime: t.startTime(),
    })),
    triggers: triggers.map(st => ({
      trigger: getCSSSelector(st.trigger),
      start: st.start,
      end: st.end,
      scrub: st.vars?.scrub,
      pin: st.vars?.pin,
      animation: st.animation?.vars,
    }))
  }
})
```
- Only runs if GSAP detected in Phase 1
- Extracts full animation configs translatable to GSAP Vue

**Layer 4 — Scroll Discovery**
```typescript
const scrollHeight = await page.evaluate(() => document.body.scrollHeight)
const viewportHeight = await page.evaluate(() => window.innerHeight)

for (let y = 0; y <= scrollHeight; y += viewportHeight * 0.25) {
  await page.evaluate(scrollY => window.scrollTo(0, scrollY), y)
  await page.waitForTimeout(300)

  // Re-run Layer 2 and Layer 3 at this scroll position
  // Track IntersectionObserver-triggered class changes
  // Screenshot at this position
}
```
- Scrolls page incrementally (25% viewport per step)
- At each position: re-capture animations, track element visibility
- MutationObserver on `class` and `style` attributes during scroll

**Layer 5 — CSS Stylesheet Extraction**
```typescript
await page.evaluate(() => {
  return Array.from(document.styleSheets).flatMap(sheet => {
    try {
      return Array.from(sheet.cssRules)
        .filter(r => r.cssText.match(/@keyframes|transition|animation/))
        .map(r => r.cssText)
    } catch { return [] } // CORS-blocked
  })
})
```
- Extracts `@keyframes` definitions even if not yet triggered
- Captures transition/animation shorthand properties

#### Phase 3: ANALYZE (Claude AI)

Claude receives all captured data as structured JSON context and:

1. **Sections identification** — break page into logical sections (hero, features, testimonials, etc.)
2. **Component mapping** — map each section to a Vue SFC
3. **Animation translation** — convert captured animation data to GSAP code:
   - CSS `@keyframes` → `gsap.to()` / `gsap.fromTo()`
   - CSS transitions → `gsap.to()` with appropriate triggers
   - GSAP tweens → direct copy/adapt to Vue composable
   - ScrollTrigger configs → `ScrollTrigger.create()` in composable
   - Scroll-revealed elements → `gsap.from()` with ScrollTrigger
4. **Style extraction** — map computed styles to Tailwind classes or CSS custom properties

#### Phase 4: GENERATE (Output)

Generate clean, editable Vue project:

```
cloned-sites/
└── <domain>/
    ├── App.vue
    │   # Root component, imports all sections
    │   # Sets up Lenis smooth scroll if original had it
    │
    ├── components/
    │   ├── HeroSection.vue
    │   ├── FeaturesSection.vue
    │   ├── TestimonialsSection.vue
    │   └── FooterSection.vue
    │   # Each section is self-contained SFC
    │   # Template: semantic HTML with Tailwind classes
    │   # Script: imports useAnimations composable
    │   # Style: scoped CSS for section-specific styles
    │
    ├── composables/
    │   ├── useAnimations.ts
    │   │   # Central GSAP animation setup
    │   │   # Exports per-section animation functions
    │   │   # ScrollTrigger registrations
    │   │   # Cleanup on unmount (onUnmounted)
    │   │
    │   └── useSmoothScroll.ts
    │       # Lenis setup if detected on original
    │
    ├── assets/
    │   ├── images/          # Downloaded & optimized
    │   └── fonts/           # Downloaded font files
    │
    ├── styles/
    │   └── theme.css
    │       # CSS custom properties for colors, typography
    │       # Extracted from original site's design tokens
    │
    └── README.md
        # Source URL
        # Clone date
        # Detected frameworks/libraries
        # Animation summary
        # Notes on manual adjustments needed
```

### Vue SFC Convention

Each generated component follows this pattern:

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement>()
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // Animations scoped to this section
    gsap.from('.hero-title', {
      y: 60, opacity: 0, duration: 1,
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' }
    })
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="sectionRef" class="...">
    <!-- Content -->
  </section>
</template>

<style scoped>
/* Section-specific styles */
</style>
```

### Skill Prompt Structure

The skill.md file instructs Claude to:

1. Run `npx tsx .claude/skills/clone-website/scripts/capture.ts <url>` to execute Phase 1-2
2. Read the output JSON from `cloned-sites/<domain>/_capture/`
3. Analyze the data (Phase 3)
4. Generate Vue components (Phase 4)
5. Download assets and organize folder structure

## Edge Cases

- **CORS-blocked stylesheets:** Layer 5 catches errors silently, relies on Layer 1-2 for animation data
- **GSAP not global:** If GSAP is bundled without global exposure, Layer 3 returns null — fall back to MutationObserver style tracking in Layer 4
- **SPAs with routing:** Only clone the current page/route at the provided URL
- **Very long pages:** Cap scroll discovery at 20,000px height to prevent timeout
- **Canvas/WebGL animations:** Out of scope — note in README that these need manual recreation
- **Lazy-loaded content:** Scroll discovery (Layer 4) naturally triggers lazy loading

## What This Does NOT Do

- Does not integrate with Abadikan DS tokens/components
- Does not handle multi-page sites (one URL = one page)
- Does not capture canvas/WebGL/Lottie animations
- Does not guarantee pixel-perfect reproduction — it's AI-interpreted
- Does not modify any files in `src/`
