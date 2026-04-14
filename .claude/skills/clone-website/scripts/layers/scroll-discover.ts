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
    const fn = new Function(selectorScript + '\nreturn getUniqueSelector;')
    const getSelector = fn()
    ;(window as any).__getSelector = getSelector

    // Track visibility changes
    ;(window as any).__visibilityLog = []
    const intObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        (window as any).__visibilityLog.push({
          selector: (window as any).__getSelector(entry.target),
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
              selector: (window as any).__getSelector(m.target),
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
  }, getSelectorScript)

  // Get page dimensions
  const scrollHeight = await page.evaluate(() =>
    Math.min(document.body.scrollHeight, document.documentElement.scrollHeight)
  )
  const effectiveHeight = Math.min(scrollHeight, maxHeight)
  const viewportHeight = await page.evaluate(() => window.innerHeight)
  const step = Math.floor(viewportHeight * 0.25)

  // Scroll incrementally
  for (let y = 0; y <= effectiveHeight; y += step) {
    await page.evaluate(scrollY => window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior }), y)
    await page.waitForTimeout(300)

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
