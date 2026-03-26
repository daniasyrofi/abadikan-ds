import { onMounted, onUnmounted, type Ref } from 'vue'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  options: { enabled?: Ref<boolean>; onEscape?: () => void } = {},
) {
  function getFocusable(): HTMLElement[] {
    if (!container.value) return []
    return Array.from(container.value.querySelectorAll<HTMLElement>(FOCUSABLE))
  }

  function handleKeydown(event: KeyboardEvent) {
    if (options.enabled && !options.enabled.value) return

    if (event.key === 'Escape') {
      options.onEscape?.()
      return
    }

    if (event.key !== 'Tab') return

    const focusable = getFocusable()
    if (focusable.length === 0) return

    const first = focusable[0]
    const last  = focusable[focusable.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    // Focus first focusable on mount
    const focusable = getFocusable()
    focusable[0]?.focus()
  })

  onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
}
