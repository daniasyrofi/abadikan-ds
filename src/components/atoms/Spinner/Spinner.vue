<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpinnerColor = 'primary' | 'secondary' | 'neutral' | 'danger' | (string & {})

interface Props {
  size?: Size
  color?: SpinnerColor
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  label: 'Loading',
})

const sizeClasses: Record<Size, string> = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8',
}

const classes = computed(() => cn('shrink-0 animate-spin', sizeClasses[props.size]))
const computedColor = computed(() => {
  if (!props.color) return undefined
  if (['primary', 'secondary', 'neutral', 'danger'].includes(props.color)) {
    return { color: `var(--color-${props.color})` }
  }
  return { color: props.color }
})
</script>

<template>
  <svg
    :class="classes"
    :style="computedColor"
    viewBox="0 0 24 24"
    fill="none"
    role="status"
    :aria-label="label"
  >
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
  <span class="sr-only">{{ label }}</span>
</template>
