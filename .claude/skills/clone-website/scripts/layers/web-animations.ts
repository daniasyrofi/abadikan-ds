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
    // Inject selector function
    const fn = new Function(selectorScript + '\nreturn getUniqueSelector;')
    const getSelector = fn()

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
  }, getSelectorScript)
}
