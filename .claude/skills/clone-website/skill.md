---
name: clone-website
description: Clone any website into standalone Vue 3 + GSAP components with full animation capture
---

# Clone Website

Clone a live website into clean, editable Vue 3 SFC components with GSAP animations.

## Usage

`/clone-website <url>`

## Steps

1. Run the capture script to collect DOM, styles, assets, and animation data:
   ```bash
   npx tsx .claude/skills/clone-website/scripts/capture.ts <url>
   ```
2. Wait for the script to complete. It saves output to `cloned-sites/<domain>/_capture/`.
3. Read the capture files:
   - `cloned-sites/<domain>/_capture/recon.json` — metadata, detected frameworks, color palette, fonts
   - `cloned-sites/<domain>/_capture/animations.json` — all captured animation data from 5 layers
   - `cloned-sites/<domain>/_capture/dom.html` — cleaned HTML of the page body
   - `cloned-sites/<domain>/_capture/styles.json` — computed styles of all section elements
   - Screenshots in `cloned-sites/<domain>/_capture/screenshots/`
4. Analyze the capture data and generate Vue components.

## Generation Rules

### File Structure
Generate output in `cloned-sites/<domain>/`:
```
App.vue                    — Root component, imports all sections
components/
  <SectionName>Section.vue — One per page section
composables/
  useAnimations.ts         — GSAP animation setup per section
  useSmoothScroll.ts       — Only if Lenis/smooth scroll detected
assets/
  images/                  — Downloaded images
  fonts/                   — Downloaded fonts
styles/
  theme.css                — CSS custom properties for colors, typography
README.md                  — Source URL, clone date, animation summary
```

### Component Pattern
Every section component MUST follow this pattern:

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
    // GSAP animations scoped to this section
    // Use data from animations.json to recreate animations
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="sectionRef">
    <!-- Semantic HTML with Tailwind utility classes -->
  </section>
</template>

<style scoped>
/* Section-specific styles from styles.json */
</style>
```

### Animation Translation Rules

When translating captured animations to GSAP:

- **CSS @keyframes** -> `gsap.to()` or `gsap.fromTo()` with matching properties
- **CSS transitions** -> `gsap.to()` triggered by hover/scroll
- **GSAP tweens** (from gsap-extract layer) -> copy `vars` directly into `gsap.to(target, vars)`
- **ScrollTrigger configs** -> `ScrollTrigger.create()` or inline `scrollTrigger` property
- **Scroll-revealed elements** (from scroll-discover layer) -> `gsap.from(el, { opacity: 0, y: 60, scrollTrigger: { trigger: el, start: 'top 80%' } })`
- **Hover animations** -> use `@mouseenter`/`@mouseleave` event handlers with `gsap.to()`

### Style Rules

- Use Tailwind utility classes for layout and spacing
- Extract unique colors into CSS custom properties in `theme.css`
- Use `clamp()` for responsive typography
- Download and reference fonts locally (no external CDN links)

### Asset Rules

- All images already downloaded to `assets/images/` by capture script
- Reference as relative paths: `./assets/images/filename.ext`
- All fonts already downloaded to `assets/fonts/`
- Define `@font-face` rules in `theme.css`
