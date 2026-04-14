# Clone Website Skill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Claude Code skill `/clone-website <url>` that captures a live website (including all animations) and generates standalone Vue 3 + GSAP components.

**Architecture:** Playwright-based multi-layer capture script collects DOM, styles, assets, and animation data (CDP + Web Animations API + GSAP extraction + scroll discovery). Output is structured JSON. Claude then reads this data and generates Vue SFCs with GSAP animations. Everything lives outside `src/` — skill in `.claude/skills/`, output in `cloned-sites/`.

**Tech Stack:** Playwright (already installed), tsx (already installed), GSAP (already installed), TypeScript, Vue 3 SFC

---

## File Structure

```
.claude/skills/clone-website/
├── skill.md                          # Skill prompt — tells Claude how to use the capture data
└── scripts/
    ├── capture.ts                    # Main entry — orchestrates all layers, saves JSON
    ├── layers/
    │   ├── recon.ts                  # Phase 1: screenshots, metadata, framework detection
    │   ├── cdp-animations.ts         # Layer 1: CDP Animation Domain passive capture
    │   ├── web-animations.ts         # Layer 2: document.getAnimations() sweep
    │   ├── gsap-extract.ts           # Layer 3: GSAP globalTimeline + ScrollTrigger
    │   ├── scroll-discover.ts        # Layer 4: incremental scroll + re-capture
    │   └── css-extract.ts            # Layer 5: @keyframes + transition rules from stylesheets
    └── utils/
        ├── selectors.ts              # Generate unique CSS selectors for elements
        └── assets.ts                 # Download images, fonts, videos

cloned-sites/                         # Output directory (gitignored)
└── <domain>/
    ├── _capture/                     # Raw capture data (JSON + screenshots)
    │   ├── recon.json
    │   ├── animations.json
    │   └── screenshots/
    ├── App.vue
    ├── components/
    ├── composables/
    ├── assets/
    ├── styles/
    └── README.md
```

---

## Task 1: Create branch and scaffold skill directory

**Files:**
- Create: `.claude/skills/clone-website/skill.md`
- Create: `.claude/skills/clone-website/scripts/capture.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Create and switch to feature branch**

```bash
git checkout -b feature/clone-website
```

- [ ] **Step 2: Create skill directory structure**

```bash
mkdir -p .claude/skills/clone-website/scripts/layers
mkdir -p .claude/skills/clone-website/scripts/utils
```

- [ ] **Step 3: Add `cloned-sites/` to .gitignore**

Append to `.gitignore`:

```
# Clone website output
cloned-sites/
```

- [ ] **Step 4: Create minimal skill.md**

Write `.claude/skills/clone-website/skill.md`:

```markdown
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

- **CSS @keyframes** → `gsap.to()` or `gsap.fromTo()` with matching properties
- **CSS transitions** → `gsap.to()` triggered by hover/scroll
- **GSAP tweens** (from gsap-extract layer) → copy `vars` directly into `gsap.to(target, vars)`
- **ScrollTrigger configs** → `ScrollTrigger.create()` or inline `scrollTrigger` property
- **Scroll-revealed elements** (from scroll-discover layer) → `gsap.from(el, { opacity: 0, y: 60, scrollTrigger: { trigger: el, start: 'top 80%' } })`
- **Hover animations** → use `@mouseenter`/`@mouseleave` event handlers with `gsap.to()`

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
```

- [ ] **Step 5: Create empty capture.ts entry point**

Write `.claude/skills/clone-website/scripts/capture.ts`:

```typescript
#!/usr/bin/env npx tsx

/**
 * Website Capture Script
 * Collects DOM, styles, assets, and animation data from a live URL.
 * Output: cloned-sites/<domain>/_capture/
 */

const url = process.argv[2]

if (!url) {
  console.error('Usage: npx tsx capture.ts <url>')
  process.exit(1)
}

console.log(`[clone-website] Target: ${url}`)
console.log('[clone-website] Capture script scaffold — layers not yet implemented')
```

- [ ] **Step 6: Commit scaffold**

```bash
git add .claude/skills/clone-website/ .gitignore
git commit -m "feat(clone-website): scaffold skill directory and skill.md prompt"
```

---

## Task 2: Build selector utility

**Files:**
- Create: `.claude/skills/clone-website/scripts/utils/selectors.ts`

- [ ] **Step 1: Write selectors.ts**

This utility generates unique CSS selectors for DOM elements. Used by all capture layers to identify animation targets.

Write `.claude/skills/clone-website/scripts/utils/selectors.ts`:

```typescript
/**
 * Generate a unique CSS selector for a DOM element.
 * Designed to run inside page.evaluate() context.
 */
export const getSelectorScript = `
function getUniqueSelector(el) {
  if (!el || el === document.body) return 'body'
  if (el.id) return '#' + CSS.escape(el.id)

  const parts = []
  let current = el

  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase()

    // Prefer meaningful class names (skip utility classes)
    const meaningful = Array.from(current.classList).filter(c =>
      !c.match(/^(w-|h-|p-|m-|flex|grid|text-|bg-|border-|rounded|shadow|opacity|translate|scale|rotate|skew|transition|animate|duration|ease|delay)/)
    )
    if (meaningful.length > 0) {
      selector += '.' + meaningful.map(c => CSS.escape(c)).join('.')
    }

    // Add nth-child if selector isn't unique among siblings
    const parent = current.parentElement
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        s => s.tagName === current.tagName
      )
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1
        selector += ':nth-child(' + index + ')'
      }
    }

    parts.unshift(selector)
    current = current.parentElement

    // Stop if we have enough specificity
    if (current && (current.id || parts.length >= 4)) {
      if (current.id) parts.unshift('#' + CSS.escape(current.id))
      break
    }
  }

  return parts.join(' > ')
}
`
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/utils/selectors.ts
git commit -m "feat(clone-website): add CSS selector utility for element identification"
```

---

## Task 3: Build asset downloader utility

**Files:**
- Create: `.claude/skills/clone-website/scripts/utils/assets.ts`

- [ ] **Step 1: Write assets.ts**

Write `.claude/skills/clone-website/scripts/utils/assets.ts`:

```typescript
import { mkdir, writeFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import type { Page } from 'playwright'

interface DownloadedAsset {
  originalUrl: string
  localPath: string
  filename: string
}

/**
 * Download all images and fonts from the page.
 */
export async function downloadAssets(
  page: Page,
  outputDir: string,
  baseUrl: string
): Promise<{ images: DownloadedAsset[]; fonts: DownloadedAsset[] }> {
  const imagesDir = join(outputDir, 'assets', 'images')
  const fontsDir = join(outputDir, 'assets', 'fonts')
  await mkdir(imagesDir, { recursive: true })
  await mkdir(fontsDir, { recursive: true })

  // Collect image URLs
  const imageUrls = await page.evaluate(() => {
    const urls = new Set<string>()

    // <img> tags
    document.querySelectorAll('img[src]').forEach(img => {
      urls.add((img as HTMLImageElement).src)
    })

    // CSS background images
    document.querySelectorAll('*').forEach(el => {
      const bg = getComputedStyle(el).backgroundImage
      const match = bg.match(/url\(["']?(.*?)["']?\)/)
      if (match && match[1] && !match[1].startsWith('data:')) {
        urls.add(match[1])
      }
    })

    return Array.from(urls)
  })

  // Collect font URLs from @font-face rules
  const fontUrls = await page.evaluate(() => {
    const urls = new Set<string>()
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            const src = rule.style.getPropertyValue('src')
            const matches = src.matchAll(/url\(["']?(.*?)["']?\)/g)
            for (const m of matches) {
              if (m[1] && !m[1].startsWith('data:')) urls.add(m[1])
            }
          }
        }
      } catch { /* CORS-blocked */ }
    }
    return Array.from(urls)
  })

  const images = await downloadFiles(imageUrls, imagesDir, baseUrl)
  const fonts = await downloadFiles(fontUrls, fontsDir, baseUrl)

  return { images, fonts }
}

async function downloadFiles(
  urls: string[],
  dir: string,
  baseUrl: string
): Promise<DownloadedAsset[]> {
  const results: DownloadedAsset[] = []
  const seen = new Set<string>()

  for (const rawUrl of urls) {
    try {
      const resolved = new URL(rawUrl, baseUrl).href
      if (seen.has(resolved)) continue
      seen.add(resolved)

      const response = await fetch(resolved)
      if (!response.ok) continue

      const buffer = Buffer.from(await response.arrayBuffer())
      let filename = basename(new URL(resolved).pathname) || 'unnamed'

      // Ensure unique filename
      if (seen.has(filename)) {
        const ext = extname(filename)
        const base = filename.slice(0, -ext.length || undefined)
        filename = `${base}-${Date.now()}${ext}`
      }

      const localPath = join(dir, filename)
      await writeFile(localPath, buffer)
      results.push({ originalUrl: resolved, localPath, filename })
    } catch { /* skip failed downloads */ }
  }

  return results
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/utils/assets.ts
git commit -m "feat(clone-website): add asset downloader for images and fonts"
```

---

## Task 4: Build Layer 1 — Recon

**Files:**
- Create: `.claude/skills/clone-website/scripts/layers/recon.ts`

- [ ] **Step 1: Write recon.ts**

Write `.claude/skills/clone-website/scripts/layers/recon.ts`:

```typescript
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { Page } from 'playwright'

export interface ReconData {
  url: string
  title: string
  description: string
  viewport: { width: number; height: number }
  fonts: string[]
  colors: string[]
  frameworks: {
    gsap: boolean
    scrollTrigger: boolean
    lenis: boolean
    anime: boolean
    motionOne: boolean
    aos: boolean
  }
  sections: Array<{
    tag: string
    selector: string
    text: string
    rect: { x: number; y: number; width: number; height: number }
  }>
}

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

export async function runRecon(page: Page, outputDir: string): Promise<ReconData> {
  const screenshotsDir = join(outputDir, '_capture', 'screenshots')
  await mkdir(screenshotsDir, { recursive: true })

  // Take screenshots at all viewports
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height })
    await page.waitForTimeout(500)
    await page.screenshot({
      path: join(screenshotsDir, `${vp.name}-${vp.width}x${vp.height}.png`),
      fullPage: true,
    })
  }

  // Reset to desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.waitForTimeout(300)

  // Extract metadata
  const data = await page.evaluate(() => {
    const title = document.title || ''
    const descMeta = document.querySelector('meta[name="description"]')
    const description = descMeta?.getAttribute('content') || ''

    // Fonts — collect from computed styles
    const fontSet = new Set<string>()
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,li,button').forEach(el => {
      const family = getComputedStyle(el).fontFamily
      family.split(',').forEach(f => fontSet.add(f.trim().replace(/["']/g, '')))
    })

    // Colors — collect unique colors
    const colorSet = new Set<string>()
    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el)
      ;['color', 'backgroundColor', 'borderColor'].forEach(prop => {
        const val = style.getPropertyValue(prop === 'backgroundColor' ? 'background-color' : prop === 'borderColor' ? 'border-color' : prop)
        if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent') {
          colorSet.add(val)
        }
      })
    })

    // Framework detection
    const frameworks = {
      gsap: !!(window as any).gsap || !!(window as any).GreenSockGlobals,
      scrollTrigger: !!(window as any).ScrollTrigger,
      lenis: !!(window as any).Lenis || !!document.querySelector('[data-lenis-prevent]'),
      anime: !!(window as any).anime,
      motionOne: !!(window as any).Motion,
      aos: !!document.querySelector('[data-aos]'),
    }

    // Sections — top-level structural elements
    const sectionEls = document.querySelectorAll('body > *, main > *, [role="main"] > *')
    const sections = Array.from(sectionEls)
      .filter(el => {
        const tag = el.tagName.toLowerCase()
        return ['section', 'header', 'footer', 'main', 'nav', 'div', 'article'].includes(tag)
      })
      .map(el => {
        const rect = el.getBoundingClientRect()
        const heading = el.querySelector('h1,h2,h3')
        return {
          tag: el.tagName.toLowerCase(),
          selector: el.id ? `#${el.id}` : `.${Array.from(el.classList).join('.')}`,
          text: heading?.textContent?.trim().slice(0, 80) || '',
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        }
      })
      .filter(s => s.rect.height > 50) // skip tiny elements

    return {
      title,
      description,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      fonts: Array.from(fontSet).slice(0, 20),
      colors: Array.from(colorSet).slice(0, 40),
      frameworks,
      sections,
    }
  })

  return { url: page.url(), ...data }
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/layers/recon.ts
git commit -m "feat(clone-website): add recon layer — screenshots, metadata, framework detection"
```

---

## Task 5: Build Layer 2 — CDP Animation Domain

**Files:**
- Create: `.claude/skills/clone-website/scripts/layers/cdp-animations.ts`

- [ ] **Step 1: Write cdp-animations.ts**

Write `.claude/skills/clone-website/scripts/layers/cdp-animations.ts`:

```typescript
import type { Page, CDPSession } from 'playwright'
import { getSelectorScript } from '../utils/selectors.js'

export interface CDPAnimationData {
  id: string
  type: 'CSSTransition' | 'CSSAnimation' | 'WebAnimation'
  name: string
  duration: number
  delay: number
  easing: string
  direction: string
  fill: string
  iterations: number
  keyframes: Array<{ offset: string; easing: string }>
  targetSelector: string
}

/**
 * Layer 1: CDP Animation Domain — passive listener.
 * Captures CSS animations, CSS transitions, Web Animations API animations.
 * Does NOT capture GSAP or JS-driven animations.
 */
export async function createCDPCapture(page: Page): Promise<{
  start: () => Promise<void>
  stop: () => CDPAnimationData[]
}> {
  const captured: CDPAnimationData[] = []
  let client: CDPSession

  return {
    async start() {
      client = await page.context().newCDPSession(page)
      await client.send('Animation.enable')

      client.on('Animation.animationStarted', async ({ animation }: any) => {
        // Resolve target element selector
        let targetSelector = 'unknown'
        try {
          if (animation.source?.backendNodeId) {
            const { node } = await client.send('DOM.describeNode', {
              backendNodeId: animation.source.backendNodeId,
            })
            // Build selector from node info
            if (node.attributes) {
              const attrs: Record<string, string> = {}
              for (let i = 0; i < node.attributes.length; i += 2) {
                attrs[node.attributes[i]] = node.attributes[i + 1]
              }
              if (attrs.id) {
                targetSelector = `#${attrs.id}`
              } else if (attrs.class) {
                targetSelector = `.${attrs.class.split(' ').filter(Boolean).join('.')}`
              } else {
                targetSelector = node.localName || 'unknown'
              }
            }
          }
        } catch { /* node may have been removed */ }

        captured.push({
          id: animation.id,
          type: animation.type,
          name: animation.name || animation.cssId || '',
          duration: animation.source?.duration || 0,
          delay: animation.source?.delay || 0,
          easing: animation.source?.easing || 'linear',
          direction: animation.source?.direction || 'normal',
          fill: animation.source?.fill || 'none',
          iterations: animation.source?.iterations || 1,
          keyframes: animation.source?.keyframesRule?.keyframes || [],
          targetSelector,
        })
      })
    },

    stop() {
      return [...captured]
    },
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/layers/cdp-animations.ts
git commit -m "feat(clone-website): add CDP Animation Domain capture layer"
```

---

## Task 6: Build Layer 3 — Web Animations API

**Files:**
- Create: `.claude/skills/clone-website/scripts/layers/web-animations.ts`

- [ ] **Step 1: Write web-animations.ts**

Write `.claude/skills/clone-website/scripts/layers/web-animations.ts`:

```typescript
import type { Page } from 'playwright'
import { getSelectorScript } from '../utils/selectors.js'

export interface WebAnimationData {
  type: string
  playState: string
  targetSelector: string
  keyframes: Array<Record<string, string>>
  timing: {
    duration: number
    delay: number
    endDelay: number
    iterations: number
    direction: string
    fill: string
    easing: string
  }
}

/**
 * Layer 2: Web Animations API — active sweep.
 * Returns actual CSS property values per keyframe (richer than CDP).
 * Call at page load and at each scroll position.
 */
export async function sweepWebAnimations(page: Page): Promise<WebAnimationData[]> {
  return page.evaluate((selectorScript) => {
    eval(selectorScript)
    const getSelector = (window as any).getUniqueSelector || ((el: Element) => el.tagName.toLowerCase())

    return document.getAnimations().map(anim => {
      const effect = anim.effect as KeyframeEffect | null
      let targetSelector = 'unknown'
      try {
        if (effect?.target) {
          targetSelector = getSelector(effect.target)
        }
      } catch {}

      let keyframes: Record<string, string>[] = []
      try {
        keyframes = (effect?.getKeyframes() || []) as Record<string, string>[]
      } catch {}

      let timing = {
        duration: 0, delay: 0, endDelay: 0,
        iterations: 1, direction: 'normal', fill: 'none', easing: 'linear',
      }
      try {
        const t = effect?.getTiming()
        if (t) {
          timing = {
            duration: (typeof t.duration === 'number' ? t.duration : 0),
            delay: t.delay || 0,
            endDelay: t.endDelay || 0,
            iterations: t.iterations === Infinity ? -1 : (t.iterations || 1),
            direction: t.direction || 'normal',
            fill: t.fill || 'none',
            easing: t.easing || 'linear',
          }
        }
      } catch {}

      return {
        type: anim.constructor.name,
        playState: anim.playState,
        targetSelector,
        keyframes,
        timing,
      }
    })
  }, getSelectorScript + '\nwindow.getUniqueSelector = getUniqueSelector;')
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/layers/web-animations.ts
git commit -m "feat(clone-website): add Web Animations API sweep layer"
```

---

## Task 7: Build Layer 4 — GSAP Extraction

**Files:**
- Create: `.claude/skills/clone-website/scripts/layers/gsap-extract.ts`

- [ ] **Step 1: Write gsap-extract.ts**

Write `.claude/skills/clone-website/scripts/layers/gsap-extract.ts`:

```typescript
import type { Page } from 'playwright'
import { getSelectorScript } from '../utils/selectors.js'

export interface GSAPTweenData {
  targetSelectors: string[]
  vars: Record<string, any>
  duration: number
  delay: number
  startTime: number
}

export interface GSAPScrollTriggerData {
  triggerSelector: string
  start: string
  end: string
  scrub: boolean | number
  pin: boolean | string
  animationVars: Record<string, any> | null
  markers: boolean
}

export interface GSAPData {
  detected: boolean
  tweens: GSAPTweenData[]
  scrollTriggers: GSAPScrollTriggerData[]
}

/**
 * Layer 3: GSAP global timeline + ScrollTrigger extraction.
 * Only runs if GSAP detected on the page.
 */
export async function extractGSAP(page: Page): Promise<GSAPData> {
  return page.evaluate((selectorScript) => {
    eval(selectorScript)
    const getSelector = (window as any).getUniqueSelector || ((el: Element) => el.tagName?.toLowerCase() || 'unknown')

    const gsap = (window as any).gsap
    if (!gsap) {
      return { detected: false, tweens: [], scrollTriggers: [] }
    }

    // Extract tweens from global timeline
    let tweens: any[] = []
    try {
      const children = gsap.globalTimeline.getChildren(true, true, true)
      tweens = children
        .filter((t: any) => t.targets && typeof t.targets === 'function')
        .map((t: any) => {
          let targetSelectors: string[] = []
          try {
            targetSelectors = t.targets().map((el: Element) => getSelector(el))
          } catch {}

          // Clean vars — remove internal GSAP properties
          const vars = { ...t.vars }
          const internalKeys = [
            'id', 'onComplete', 'onStart', 'onUpdate', 'onReverseComplete',
            'callbackScope', 'lazy', 'immediateRender', 'overwrite',
            'stagger', 'scrollTrigger', 'paused',
          ]
          // Keep scrollTrigger separately
          const hasST = !!vars.scrollTrigger
          internalKeys.forEach(k => delete vars[k])

          return {
            targetSelectors,
            vars,
            duration: typeof t.duration === 'function' ? t.duration() : (t.duration || 0),
            delay: typeof t.delay === 'function' ? t.delay() : (t.delay || 0),
            startTime: typeof t.startTime === 'function' ? t.startTime() : (t.startTime || 0),
          }
        })
        .filter((t: any) => t.targetSelectors.length > 0)
    } catch {}

    // Extract ScrollTrigger instances
    let scrollTriggers: any[] = []
    try {
      const ST = (window as any).ScrollTrigger
      if (ST) {
        const all = ST.getAll()
        scrollTriggers = all.map((st: any) => {
          let triggerSelector = 'unknown'
          try {
            if (st.trigger) triggerSelector = getSelector(st.trigger)
          } catch {}

          let animationVars = null
          try {
            if (st.animation && st.animation.vars) {
              animationVars = { ...st.animation.vars }
              // Remove callbacks
              delete animationVars.onComplete
              delete animationVars.onStart
              delete animationVars.onUpdate
              delete animationVars.scrollTrigger
            }
          } catch {}

          return {
            triggerSelector,
            start: st.vars?.start || 'top bottom',
            end: st.vars?.end || 'bottom top',
            scrub: st.vars?.scrub || false,
            pin: st.vars?.pin || false,
            animationVars,
            markers: st.vars?.markers || false,
          }
        })
      }
    } catch {}

    return { detected: true, tweens, scrollTriggers }
  }, getSelectorScript + '\nwindow.getUniqueSelector = getUniqueSelector;')
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/layers/gsap-extract.ts
git commit -m "feat(clone-website): add GSAP timeline and ScrollTrigger extraction layer"
```

---

## Task 8: Build Layer 5 — Scroll Discovery

**Files:**
- Create: `.claude/skills/clone-website/scripts/layers/scroll-discover.ts`

- [ ] **Step 1: Write scroll-discover.ts**

Write `.claude/skills/clone-website/scripts/layers/scroll-discover.ts`:

```typescript
import type { Page } from 'playwright'
import { sweepWebAnimations, type WebAnimationData } from './web-animations.js'
import { extractGSAP, type GSAPData } from './gsap-extract.js'
import { getSelectorScript } from '../utils/selectors.js'

export interface ScrollFrame {
  scrollY: number
  scrollProgress: number
  webAnimations: WebAnimationData[]
  gsapData: GSAPData
  visibilityChanges: Array<{
    selector: string
    becameVisible: boolean
    intersectionRatio: number
  }>
  classChanges: Array<{
    selector: string
    addedClasses: string[]
    removedClasses: string[]
  }>
}

/**
 * Layer 4: Scroll Discovery.
 * Scrolls page incrementally, captures animation state at each position.
 * Triggers lazy-loaded content and scroll-driven animations.
 */
export async function discoverScrollAnimations(
  page: Page,
  maxHeight = 20000
): Promise<ScrollFrame[]> {
  const frames: ScrollFrame[] = []

  // Inject IntersectionObserver and MutationObserver for tracking
  await page.evaluate((selectorScript) => {
    eval(selectorScript)
    const getSelector = (window as any).getUniqueSelector || ((el: Element) => el.tagName.toLowerCase())

    // Track visibility changes
    ;(window as any).__visibilityLog = []
    const intObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        (window as any).__visibilityLog.push({
          selector: getSelector(entry.target),
          becameVisible: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
        })
      })
    }, { threshold: [0, 0.25, 0.5, 0.75, 1.0] })

    // Track class changes
    ;(window as any).__classLog = []
    const mutObs = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (m.attributeName === 'class' && m.target instanceof Element) {
          const oldClasses = (m.oldValue || '').split(' ').filter(Boolean)
          const newClasses = Array.from(m.target.classList)
          const added = newClasses.filter(c => !oldClasses.includes(c))
          const removed = oldClasses.filter(c => !newClasses.includes(c))
          if (added.length > 0 || removed.length > 0) {
            (window as any).__classLog.push({
              selector: getSelector(m.target),
              addedClasses: added,
              removedClasses: removed,
            })
          }
        }
      })
    })

    // Observe all section-level elements
    document.querySelectorAll('section, [class*="section"], header, footer, main > *, [data-aos], [data-scroll], [data-animate]')
      .forEach(el => {
        intObs.observe(el)
        mutObs.observe(el, { attributes: true, attributeFilter: ['class'], attributeOldValue: true, subtree: true })
      })
  }, getSelectorScript + '\nwindow.getUniqueSelector = getUniqueSelector;')

  // Get page dimensions
  const scrollHeight = await page.evaluate(() =>
    Math.min(document.body.scrollHeight, document.documentElement.scrollHeight)
  )
  const effectiveHeight = Math.min(scrollHeight, maxHeight)
  const viewportHeight = await page.evaluate(() => window.innerHeight)
  const step = Math.floor(viewportHeight * 0.25)

  // Scroll incrementally
  for (let y = 0; y <= effectiveHeight; y += step) {
    await page.evaluate(scrollY => window.scrollTo({ top: scrollY, behavior: 'instant' }), y)
    await page.waitForTimeout(300) // Let animations settle

    // Capture state at this scroll position
    const webAnimations = await sweepWebAnimations(page)
    const gsapData = await extractGSAP(page)

    // Read and clear logs
    const { visibilityChanges, classChanges } = await page.evaluate(() => {
      const vis = [...((window as any).__visibilityLog || [])]
      const cls = [...((window as any).__classLog || [])]
      ;(window as any).__visibilityLog = []
      ;(window as any).__classLog = []
      return { visibilityChanges: vis, classChanges: cls }
    })

    frames.push({
      scrollY: y,
      scrollProgress: effectiveHeight > 0 ? y / effectiveHeight : 0,
      webAnimations,
      gsapData,
      visibilityChanges,
      classChanges,
    })
  }

  return frames
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/layers/scroll-discover.ts
git commit -m "feat(clone-website): add scroll discovery layer with visibility and class tracking"
```

---

## Task 9: Build Layer 6 — CSS Stylesheet Extraction

**Files:**
- Create: `.claude/skills/clone-website/scripts/layers/css-extract.ts`

- [ ] **Step 1: Write css-extract.ts**

Write `.claude/skills/clone-website/scripts/layers/css-extract.ts`:

```typescript
import type { Page } from 'playwright'

export interface CSSAnimationRule {
  name: string
  keyframes: Array<{ offset: string; properties: Record<string, string> }>
}

export interface CSSTransitionRule {
  selector: string
  property: string
  duration: string
  timingFunction: string
  delay: string
}

export interface CSSExtractData {
  keyframeRules: CSSAnimationRule[]
  transitionRules: CSSTransitionRule[]
  animationUsages: Array<{
    selector: string
    animationName: string
    animationDuration: string
    animationTimingFunction: string
    animationDelay: string
    animationIterationCount: string
    animationDirection: string
    animationFillMode: string
  }>
}

/**
 * Layer 5: CSS Stylesheet extraction.
 * Parses @keyframes, transition, and animation properties from all stylesheets.
 */
export async function extractCSS(page: Page): Promise<CSSExtractData> {
  return page.evaluate(() => {
    const keyframeRules: any[] = []
    const transitionRules: any[] = []
    const animationUsages: any[] = []

    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          // @keyframes rules
          if (rule instanceof CSSKeyframesRule) {
            const keyframes: any[] = []
            for (const kf of rule.cssRules) {
              if (kf instanceof CSSKeyframeRule) {
                const properties: Record<string, string> = {}
                for (let i = 0; i < kf.style.length; i++) {
                  const prop = kf.style[i]
                  properties[prop] = kf.style.getPropertyValue(prop)
                }
                keyframes.push({
                  offset: kf.keyText, // e.g., "0%", "50%", "100%"
                  properties,
                })
              }
            }
            keyframeRules.push({ name: rule.name, keyframes })
          }

          // Style rules with transition or animation properties
          if (rule instanceof CSSStyleRule) {
            const style = rule.style

            // Transitions
            const transitionProp = style.getPropertyValue('transition')
            if (transitionProp && transitionProp !== 'none' && transitionProp !== 'all 0s ease 0s') {
              transitionRules.push({
                selector: rule.selectorText,
                property: style.getPropertyValue('transition-property') || 'all',
                duration: style.getPropertyValue('transition-duration') || '0s',
                timingFunction: style.getPropertyValue('transition-timing-function') || 'ease',
                delay: style.getPropertyValue('transition-delay') || '0s',
              })
            }

            // Animation usages
            const animName = style.getPropertyValue('animation-name')
            if (animName && animName !== 'none') {
              animationUsages.push({
                selector: rule.selectorText,
                animationName: animName,
                animationDuration: style.getPropertyValue('animation-duration') || '0s',
                animationTimingFunction: style.getPropertyValue('animation-timing-function') || 'ease',
                animationDelay: style.getPropertyValue('animation-delay') || '0s',
                animationIterationCount: style.getPropertyValue('animation-iteration-count') || '1',
                animationDirection: style.getPropertyValue('animation-direction') || 'normal',
                animationFillMode: style.getPropertyValue('animation-fill-mode') || 'none',
              })
            }
          }
        }
      } catch { /* CORS-blocked stylesheet */ }
    }

    return { keyframeRules, transitionRules, animationUsages }
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/layers/css-extract.ts
git commit -m "feat(clone-website): add CSS stylesheet extraction layer"
```

---

## Task 10: Build main capture orchestrator

**Files:**
- Modify: `.claude/skills/clone-website/scripts/capture.ts`

- [ ] **Step 1: Write the full capture.ts**

Replace `.claude/skills/clone-website/scripts/capture.ts` with:

```typescript
#!/usr/bin/env npx tsx

/**
 * Website Capture Script
 * Orchestrates all 5 capture layers and saves structured JSON output.
 *
 * Usage: npx tsx capture.ts <url>
 * Output: cloned-sites/<domain>/_capture/
 */

import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { runRecon } from './layers/recon.js'
import { createCDPCapture } from './layers/cdp-animations.js'
import { sweepWebAnimations } from './layers/web-animations.js'
import { extractGSAP } from './layers/gsap-extract.js'
import { discoverScrollAnimations } from './layers/scroll-discover.js'
import { extractCSS } from './layers/css-extract.js'
import { downloadAssets } from './utils/assets.js'

const url = process.argv[2]

if (!url) {
  console.error('Usage: npx tsx capture.ts <url>')
  process.exit(1)
}

// Derive output directory from domain
const domain = new URL(url).hostname.replace(/\./g, '-')
const outputDir = join(process.cwd(), 'cloned-sites', domain)
const captureDir = join(outputDir, '_capture')

async function main() {
  console.log(`\n🔍 [clone-website] Capturing: ${url}`)
  console.log(`📁 Output: ${outputDir}\n`)

  await mkdir(captureDir, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()

  try {
    // ── Phase 1: Start CDP capture before navigation ──
    console.log('⏳ Starting CDP animation listener...')
    const cdpCapture = await createCDPCapture(page)
    await cdpCapture.start()

    // ── Navigate ──
    console.log('⏳ Loading page...')
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000) // Let initial animations play

    // ── Phase 1: Recon ──
    console.log('📸 Phase 1: Recon — screenshots, metadata, framework detection...')
    const recon = await runRecon(page, outputDir)
    await writeFile(join(captureDir, 'recon.json'), JSON.stringify(recon, null, 2))
    console.log(`   ✓ Title: "${recon.title}"`)
    console.log(`   ✓ Fonts: ${recon.fonts.slice(0, 5).join(', ')}`)
    console.log(`   ✓ Colors: ${recon.colors.length} unique`)
    console.log(`   ✓ Frameworks: ${Object.entries(recon.frameworks).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none detected'}`)
    console.log(`   ✓ Sections: ${recon.sections.length} found`)

    // ── Phase 2: Multi-layer capture ──
    console.log('\n🎬 Phase 2: Animation capture...')

    // Layer 2: Web Animations API (initial sweep)
    console.log('   Layer 2: Web Animations API sweep...')
    const initialWebAnimations = await sweepWebAnimations(page)
    console.log(`   ✓ ${initialWebAnimations.length} web animations found`)

    // Layer 3: GSAP extraction
    console.log('   Layer 3: GSAP extraction...')
    const gsapData = await extractGSAP(page)
    if (gsapData.detected) {
      console.log(`   ✓ GSAP detected: ${gsapData.tweens.length} tweens, ${gsapData.scrollTriggers.length} scroll triggers`)
    } else {
      console.log('   ✓ GSAP not detected on this page')
    }

    // Layer 4: Scroll discovery
    console.log('   Layer 4: Scroll discovery (this may take a moment)...')
    const scrollFrames = await discoverScrollAnimations(page)
    console.log(`   ✓ ${scrollFrames.length} scroll positions captured`)

    // Layer 5: CSS stylesheet extraction
    console.log('   Layer 5: CSS stylesheet extraction...')
    const cssData = await extractCSS(page)
    console.log(`   ✓ ${cssData.keyframeRules.length} @keyframes, ${cssData.transitionRules.length} transitions, ${cssData.animationUsages.length} animation usages`)

    // Stop CDP capture
    const cdpAnimations = cdpCapture.stop()
    console.log(`   Layer 1: CDP captured ${cdpAnimations.length} animations total`)

    // ── Save animation data ──
    const animations = {
      cdpAnimations,
      initialWebAnimations,
      gsapData,
      scrollFrames,
      cssData,
    }
    await writeFile(join(captureDir, 'animations.json'), JSON.stringify(animations, null, 2))

    // ── Save DOM ──
    console.log('\n📄 Saving DOM snapshot...')
    const bodyHtml = await page.evaluate(() => document.body.innerHTML)
    await writeFile(join(captureDir, 'dom.html'), bodyHtml)

    // ── Save computed styles for sections ──
    console.log('🎨 Extracting section styles...')
    const sectionStyles = await page.evaluate(() => {
      const sections = document.querySelectorAll('body > *, main > *, [role="main"] > *')
      return Array.from(sections)
        .filter(el => el.getBoundingClientRect().height > 50)
        .map(el => {
          const style = getComputedStyle(el)
          return {
            selector: el.id ? `#${el.id}` : el.className ? `.${Array.from(el.classList).join('.')}` : el.tagName.toLowerCase(),
            styles: {
              display: style.display,
              position: style.position,
              padding: style.padding,
              margin: style.margin,
              background: style.background,
              color: style.color,
              fontSize: style.fontSize,
              fontFamily: style.fontFamily,
              fontWeight: style.fontWeight,
              lineHeight: style.lineHeight,
              textAlign: style.textAlign,
              gap: style.gap,
              flexDirection: style.flexDirection,
              justifyContent: style.justifyContent,
              alignItems: style.alignItems,
              gridTemplateColumns: style.gridTemplateColumns,
              maxWidth: style.maxWidth,
              overflow: style.overflow,
            },
          }
        })
    })
    await writeFile(join(captureDir, 'styles.json'), JSON.stringify(sectionStyles, null, 2))

    // ── Download assets ──
    console.log('📥 Downloading assets...')
    const assets = await downloadAssets(page, outputDir, url)
    console.log(`   ✓ ${assets.images.length} images, ${assets.fonts.length} fonts downloaded`)

    // Save asset map for reference
    await writeFile(join(captureDir, 'assets.json'), JSON.stringify(assets, null, 2))

    // ── Summary ──
    console.log('\n✅ Capture complete!')
    console.log(`📁 Output saved to: ${captureDir}`)
    console.log('\nFiles:')
    console.log('  - recon.json      — metadata, fonts, colors, frameworks, sections')
    console.log('  - animations.json — all 5 layers of animation data')
    console.log('  - dom.html        — page body HTML')
    console.log('  - styles.json     — computed styles for sections')
    console.log('  - assets.json     — downloaded asset map')
    console.log('  - screenshots/    — full-page screenshots at 3 viewports')

  } catch (err) {
    console.error('\n❌ Capture failed:', err)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main()
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/scripts/capture.ts
git commit -m "feat(clone-website): wire up capture orchestrator with all 5 layers"
```

---

## Task 11: Test the full pipeline manually

- [ ] **Step 1: Run capture against a test URL**

```bash
npx tsx .claude/skills/clone-website/scripts/capture.ts https://gsap.com
```

Expected: Script runs through all phases, creates `cloned-sites/gsap-com/_capture/` with JSON files and screenshots. Console shows progress for each layer.

- [ ] **Step 2: Verify output files exist**

```bash
ls -la cloned-sites/gsap-com/_capture/
cat cloned-sites/gsap-com/_capture/recon.json | head -20
```

Expected: `recon.json`, `animations.json`, `dom.html`, `styles.json`, `assets.json`, and `screenshots/` directory.

- [ ] **Step 3: Fix any errors found during testing**

If any layer fails, fix the specific layer file and re-run. Common issues:
- Timeout on slow sites → increase `waitUntil` timeout
- CORS errors on stylesheets → already handled with try/catch
- Missing elements → selector generation edge cases

- [ ] **Step 4: Commit fixes if any**

```bash
git add .claude/skills/clone-website/scripts/
git commit -m "fix(clone-website): resolve issues found during integration testing"
```

---

## Task 12: Final commit and summary

- [ ] **Step 1: Verify all files are committed**

```bash
git status
git log --oneline feature/clone-website
```

- [ ] **Step 2: Test the skill via Claude Code**

Run `/clone-website https://example.com` in Claude Code to verify the skill is discovered and the prompt loads correctly.

- [ ] **Step 3: Final commit if needed**

```bash
git add -A
git commit -m "feat(clone-website): complete capture pipeline with 5-layer animation detection"
```
