import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafId: number | null = null

/**
 * Initialize Lenis smooth scroll globally.
 * Call once in the root landing component (LandingConsumer.vue).
 * Automatically disables smooth scroll on touch devices (iOS/Android native feel preserved).
 */
export function useLenis() {
  onMounted(() => {
    // Don't apply smooth scroll on touch-primary devices — native momentum is better
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 0, // disable on touch entirely
      wheelMultiplier: 1,
      infinite: false,
    })

    function raf(time: number) {
      lenis!.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
    rafId = null
  })
}

/** Get the Lenis instance (for plugins like GSAP ScrollTrigger integration) */
export function getLenis() {
  return lenis
}
