import { onMounted, onUnmounted, type Ref } from 'vue'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.12, rootMargin = '0px 0px -50px 0px' } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          entry.target.classList.add('is-revealed')

          const children = entry.target.querySelectorAll('[data-reveal-child]')
          children.forEach((child) => child.classList.add('is-revealed'))

          observer?.disconnect()
          observer = null
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })
}
