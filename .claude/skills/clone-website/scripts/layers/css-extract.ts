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
                  offset: kf.keyText,
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
