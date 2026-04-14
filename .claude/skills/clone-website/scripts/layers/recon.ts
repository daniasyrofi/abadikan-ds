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
      const props = ['color', 'background-color', 'border-color']
      props.forEach(prop => {
        const val = style.getPropertyValue(prop)
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
          selector: el.id ? `#${el.id}` : el.className ? `.${Array.from((el as HTMLElement).classList).join('.')}` : el.tagName.toLowerCase(),
          text: heading?.textContent?.trim().slice(0, 80) || '',
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        }
      })
      .filter(s => s.rect.height > 50)

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
