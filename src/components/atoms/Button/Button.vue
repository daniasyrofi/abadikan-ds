<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'secondary' | 'ghost' | 'danger' | 'link'
type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  variant?:  Variant
  size?:     Size
  disabled?: boolean
  loading?:  boolean
  fullWidth?: boolean
  iconOnly?:  boolean
  as?:        string
  href?:      string
  type?:      'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant:   'default',
  size:      'md',
  disabled:  false,
  loading:   false,
  fullWidth: false,
  iconOnly:  false,
  as:        'button',
  type:      'button',
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const tag = computed(() => props.href ? 'a' : props.as)

const baseClasses = [
  'inline-flex items-center justify-center gap-2',
  'font-medium leading-none',
  'border border-transparent',
  'cursor-pointer select-none',
  'transition-all duration-[--duration-normal] ease-[--ease-default]',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  'active:scale-[0.98]',
]

const variants: Record<Variant, string> = {
  default:   'bg-[--color-neutral] text-[--color-text-inverse] hover:bg-[--color-neutral-hover]',
  secondary: 'bg-transparent text-[--color-text-primary] border-[--color-border] hover:bg-[--color-neutral-light] hover:border-[--color-border-strong]',
  ghost:     'bg-transparent text-[--color-text-primary] hover:bg-[--color-neutral-light]',
  danger:    'bg-[--color-danger] text-white hover:bg-[--color-danger-hover]',
  link:      'bg-transparent text-[--color-primary] underline-offset-4 hover:underline p-0 h-auto',
}

const sizes: Record<Size, string> = {
  xs: 'h-7 px-2.5 text-xs rounded-[--radius-sm]',
  sm: 'h-8 px-3   text-sm rounded-[--radius-md]',
  md: 'h-9 px-4   text-sm rounded-[--radius-md]',
  lg: 'h-10 px-5  text-base rounded-[--radius-lg]',
  xl: 'h-12 px-6  text-base rounded-[--radius-lg]',
}

const iconSizes: Record<Size, string> = {
  xs: 'h-7 w-7   rounded-[--radius-sm]',
  sm: 'h-8 w-8   rounded-[--radius-md]',
  md: 'h-9 w-9   rounded-[--radius-md]',
  lg: 'h-10 w-10 rounded-[--radius-lg]',
  xl: 'h-12 w-12 rounded-[--radius-lg]',
}

const classes = computed(() =>
  cn(
    ...baseClasses,
    variants[props.variant],
    props.iconOnly ? iconSizes[props.size] : sizes[props.size],
    props.fullWidth && 'w-full',
    props.variant === 'link' && 'h-auto px-0',
  )
)
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :disabled="disabled || loading || undefined"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    v-bind="$attrs"
    @click="!disabled && !loading && emit('click', $event)"
  >
    <!-- Leading slot (Figma: "Leading Icon") -->
    <span v-if="$slots.leading && !loading" class="shrink-0">
      <slot name="leading" />
    </span>

    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="shrink-0 animate-spin"
      :class="['xs','sm'].includes(size) ? 'size-3' : 'size-4'"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>

    <!-- Default slot (label) -->
    <slot v-if="!iconOnly" />

    <!-- Icon-only slot -->
    <slot v-else name="icon" />

    <!-- Trailing slot (Figma: "Trailing Icon") -->
    <span v-if="$slots.trailing && !loading" class="shrink-0">
      <slot name="trailing" />
    </span>
  </component>
</template>
