<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useTheme } from '@/composables/useTheme'
import { RiSunLine, RiMoonLine } from '@remixicon/vue'

interface Props {
  /** Visual size of the toggle button. @default 'md' */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const { theme, toggle } = useTheme()

const sizeClasses: Record<string, string> = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-9 w-9',
}

const iconSize: Record<string, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}
</script>

<template>
  <button
    type="button"
    :class="cn(
      'ds-theme-toggle',
      'inline-flex items-center justify-center rounded-full',
      'bg-[--color-surface]',
      'text-[--color-text-secondary] hover:text-[--color-text-primary]',
      'transition-all duration-[--duration-normal] ease-[--ease-default]',
      'cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
      sizeClasses[props.size],
    )"
    :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
    @click="toggle"
  >
    <Transition name="theme-icon" mode="out-in">
      <RiSunLine v-if="theme === 'light'" :key="'sun'" :size="String(iconSize[props.size])" />
      <RiMoonLine v-else :key="'moon'" :size="String(iconSize[props.size])" />
    </Transition>
  </button>
</template>

<style scoped>
.ds-theme-toggle {
  box-shadow: var(--shadow-sm), inset 0 0 0 1px var(--color-border);
}
.ds-theme-toggle:hover {
  background-color: var(--color-neutral-light);
  box-shadow: var(--shadow-md), inset 0 0 0 1px var(--color-border);
}

.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all var(--duration-normal) var(--ease-default);
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
</style>
