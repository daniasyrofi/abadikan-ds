import { onMounted, onUnmounted, type Ref } from 'vue'

export function useClickOutside(
  target: Ref<HTMLElement | null>,
  handler: (event: MouseEvent) => void,
) {
  function listener(event: MouseEvent) {
    if (!target.value) return
    if (target.value === event.target) return
    if (target.value.contains(event.target as Node)) return
    handler(event)
  }

  onMounted(()   => document.addEventListener('mousedown', listener))
  onUnmounted(() => document.removeEventListener('mousedown', listener))
}
