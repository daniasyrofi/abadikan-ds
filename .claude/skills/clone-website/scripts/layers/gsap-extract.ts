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
    const fn = new Function(selectorScript + '\nreturn getUniqueSelector;')
    const getSelector = fn()

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

          // Clean vars — only keep serializable animation properties
          const vars: Record<string, any> = {}
          const animProps = [
            'x', 'y', 'z', 'rotation', 'rotationX', 'rotationY', 'rotationZ',
            'scale', 'scaleX', 'scaleY', 'opacity', 'width', 'height',
            'top', 'left', 'right', 'bottom',
            'xPercent', 'yPercent', 'transformOrigin',
            'backgroundColor', 'color', 'borderColor',
            'borderRadius', 'padding', 'margin',
            'fontSize', 'letterSpacing', 'lineHeight',
            'clipPath', 'filter', 'backdropFilter',
            'ease', 'duration', 'delay', 'repeat', 'yoyo',
            'autoAlpha', 'visibility', 'display',
            'skewX', 'skewY', 'perspective',
          ]
          for (const key of animProps) {
            if (t.vars[key] !== undefined) {
              const val = t.vars[key]
              // Only keep primitive values and strings
              if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
                vars[key] = val
              }
            }
          }

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

          let animationVars: Record<string, any> | null = null
          try {
            if (st.animation && st.animation.vars) {
              animationVars = {}
              const safeProps = [
                'x', 'y', 'z', 'rotation', 'scale', 'scaleX', 'scaleY',
                'opacity', 'autoAlpha', 'xPercent', 'yPercent',
                'width', 'height', 'clipPath', 'filter',
                'ease', 'duration', 'delay', 'transformOrigin',
                'backgroundColor', 'color', 'borderRadius',
                'skewX', 'skewY', 'perspective',
              ]
              for (const key of safeProps) {
                const val = st.animation.vars[key]
                if (val !== undefined && (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean')) {
                  animationVars[key] = val
                }
              }
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
  }, getSelectorScript)
}
