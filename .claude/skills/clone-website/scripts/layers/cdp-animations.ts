import type { Page, CDPSession } from 'playwright'

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
