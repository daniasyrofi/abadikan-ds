---
name: clone-website
description: Clone any website into standalone Vue 3 + GSAP components — exact visual copy via getComputedStyle extraction
---

# Clone Website

Clone a live website into pixel-perfect Vue 3 SFC components using exact CSS values extracted via `getComputedStyle()`.

## Usage

`/clone-website <url>`

## Pipeline

### Step 1 — Capture

Run the capture script:
```bash
npx tsx .claude/skills/clone-website/scripts/capture.ts <url>
```

Output: `cloned-sites/<domain>/_capture/`

| File | What it contains |
|---|---|
| `meta.json` | Title, fonts, colors, body classes |
| `sections.json` | Top-level page sections with selectors |
| `dom-tree.json` | Full DOM tree with exact computed styles (desktop 1440px) |
| `dom-tree-mobile.json` | Same tree at mobile viewport (390px) |
| `specs/*.json` | Per-section deep extraction (depth=6) |
| `assets.json` | Downloaded asset map (original URL → local filename) |
| `page.html` | Raw page HTML |
| `screenshots/` | Full-page screenshots at mobile/tablet/desktop |

### Step 2 — Analyze capture data

Read the capture files in this order:
1. `meta.json` — understand fonts, colors, overall theme
2. `screenshots/` — visual reference for each viewport
3. `sections.json` — identify the page structure
4. `dom-tree.json` — the main data source for building components

The DOM tree contains per-element:
- `tag` — HTML tag name
- `selector` — CSS selector for targeting
- `rect` — bounding box `{x, y, width, height}`
- `styles` — **exact computed CSS values** (~50 properties, only non-default values)
- `text` — direct text content
- `image` — `{src, alt, naturalWidth, naturalHeight}` for `<img>` elements
- `backgroundImage` — computed background-image value
- `children` — recursive child nodes

### Step 3 — Copy assets to public/

Copy downloaded images from `cloned-sites/<domain>/assets/images/` to `public/clone-assets/` so Vite can serve them statically.

```bash
cp -r cloned-sites/<domain>/assets/images/* public/clone-assets/
```

### Step 4 — Build Vue components

For each section, read its spec from `specs/` or from the DOM tree and build a Vue SFC using the **exact CSS values** from the capture data.

#### Component structure

```
src/components/pages/
  PageClonePreview.vue       — Root: cover/content toggle
  clone-preview/
    CoverSection.vue         — Cover/splash screen
    ContentSection.vue       — All content sections
```

#### Separate entry point

Create a separate HTML entry + main.ts so the clone doesn't interfere with the main app:

- `clone-preview.html` — HTML entry point
- `src/clone-preview-main.ts` — mounts PageClonePreview directly

## Component Pattern

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement>()
let ctx: gsap.Context

onMounted(() => {
  if (!sectionRef.value) return
  ctx = gsap.context(() => {
    // Entrance animations — simple fade/slide reveals
    gsap.from('.element', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: { trigger: '.element', start: 'top 85%' }
    })
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="sectionRef">
    <!-- Use exact HTML structure from dom-tree.json -->
  </section>
</template>

<style scoped>
/* Use EXACT values from styles object in dom-tree.json */
/* Example: fontSize, color, padding, backgroundColor — all from getComputedStyle */
</style>
```

## Key Rules

### Exact Copy First

- **Use exact CSS values** from `styles` in the DOM tree — do NOT guess or approximate
- Every `fontSize`, `color`, `padding`, `borderRadius`, `fontFamily` etc. comes directly from the captured data
- If an element has `backgroundColor: 'rgb(143, 31, 39)'` in the tree, use that exact value
- Match the DOM hierarchy from the tree — don't restructure unless necessary for Vue reactivity

### Pre-composed Images

Some sites use pre-composed images (all visual elements baked into one image). When you see a full-viewport image that contains text, decorations, and photos:
- Use it as-is with `object-fit: cover` — don't try to recreate the composition
- Only overlay interactive elements (buttons, forms) on top

### Assets

- All images are already downloaded to `cloned-sites/<domain>/assets/images/`
- Reference them as `/clone-assets/<filename>` after copying to `public/clone-assets/`
- The `assets.json` file maps original URLs to local filenames
- For CDN URLs with base64-encoded paths (e.g., viding.co), the capture script automatically decodes the original filename

### Fonts

- Extract font families from `meta.json`
- Load via Google Fonts `<link>` in the HTML entry point, or download and use `@font-face`
- Apply the exact `fontFamily` values from the captured styles

### Animations (after exact copy is verified)

Keep animations simple — the priority is visual accuracy, not animation fidelity:
- Simple `gsap.from()` fade/slide reveals on scroll
- Use `ScrollTrigger` for scroll-based entrance animations
- Cover section: fade in + button entrance
- Content sections: staggered reveals as user scrolls

### Cover → Content Pattern

Wedding/invitation sites typically have a cover screen with an "Open" button:

```vue
<!-- PageClonePreview.vue -->
<div v-if="!isOpened" class="cover-wrap" @click="isOpened = true">
  <CoverSection />
</div>
<ContentSection v-if="isOpened" />
```

Use a wrapper div with `@click` for the cover-to-content transition — more reliable than emitting events from child components.
