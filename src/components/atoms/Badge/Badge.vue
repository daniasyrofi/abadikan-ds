<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { RiCloseLine } from '@remixicon/vue'

type Variant    = 'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'secondary'
type Size       = 'sm' | 'md' | 'lg'
type BadgeStyle = 'subtle' | 'solid' | 'outline'

interface Props {
  variant?:    Variant
  size?:       Size
  badgeStyle?: BadgeStyle
  dot?:        boolean
  removable?:  boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant:    'neutral',
  size:       'md',
  badgeStyle: 'subtle',
  dot:        false,
  removable:  false,
})

const emit = defineEmits<{ remove: [] }>()

// ── Color maps ─────────────────────────────────────────────────────────────

const subtleClasses: Record<Variant, string> = {
  neutral:   'bg-[--color-neutral-light] text-[--color-text-primary]',
  primary:   'bg-[--color-primary-light] text-[--color-primary]',
  danger:    'bg-[--color-danger-light] text-[--color-danger]',
  success:   'bg-[--color-success-light] text-[--color-success]',
  warning:   'bg-[--color-warning-light] text-[--color-warning]',
  info:      'bg-[--color-info-light] text-[--color-info]',
  secondary: 'bg-[--color-secondary-light] text-[--color-secondary]',
}

const solidClasses: Record<Variant, string> = {
  neutral:   'bg-[--color-neutral] text-[--color-text-inverse]',
  primary:   'bg-[--color-primary] text-[--color-primary-text]',
  danger:    'bg-[--color-danger] text-white',
  success:   'bg-[--color-success] text-white',
  warning:   'bg-[--color-warning] text-white',
  info:      'bg-[--color-info] text-white',
  secondary: 'bg-[--color-secondary] text-white',
}

const outlineClasses: Record<Variant, string> = {
  neutral:   'border border-[--color-border-strong] text-[--color-text-primary]',
  primary:   'border border-[--color-primary] text-[--color-primary]',
  danger:    'border border-[--color-danger] text-[--color-danger]',
  success:   'border border-[--color-success] text-[--color-success]',
  warning:   'border border-[--color-warning] text-[--color-warning]',
  info:      'border border-[--color-info] text-[--color-info]',
  secondary: 'border border-[--color-secondary] text-[--color-secondary]',
}

const dotColorClass: Record<Variant, string> = {
  neutral:   'bg-[--color-text-secondary]',
  primary:   'bg-[--color-primary]',
  danger:    'bg-[--color-danger]',
  success:   'bg-[--color-success]',
  warning:   'bg-[--color-warning]',
  info:      'bg-[--color-info]',
  secondary: 'bg-[--color-secondary]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-[11px] leading-none px-1.5 py-0.5 gap-1 rounded-[--radius-sm]',
  md: 'text-xs leading-none px-2 py-1 gap-1.5 rounded-[--radius-sm]',
  lg: 'text-sm leading-none px-2.5 py-1 gap-1.5 rounded-[--radius-md]',
}

const dotSizeClass: Record<Size, string> = {
  sm: 'size-1',
  md: 'size-1.5',
  lg: 'size-2',
}

const removeButtonSizeClass: Record<Size, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
}

const variantColorMap: Record<BadgeStyle, Record<Variant, string>> = {
  subtle:  subtleClasses,
  solid:   solidClasses,
  outline: outlineClasses,
}

const classes = computed(() =>
  cn(
    'inline-flex items-center font-medium select-none',
    sizeClasses[props.size],
    variantColorMap[props.badgeStyle][props.variant],
  )
)
</script>

<template>
  <span :class="classes">
    <!-- Dot indicator -->
    <span
      v-if="dot"
      :class="cn('shrink-0 rounded-full', dotSizeClass[size], dotColorClass[variant])"
      aria-hidden="true"
    />

    <!-- Leading slot (icon) -->
    <span v-if="$slots.leading" class="shrink-0 -ml-0.5 flex items-center">
      <slot name="leading" />
    </span>

    <!-- Label -->
    <slot />

    <!-- Remove button -->
    <button
      v-if="removable"
      type="button"
      :class="cn(
        'shrink-0 -mr-0.5 flex items-center justify-center rounded-sm opacity-60',
        'hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[--color-primary]',
        'transition-opacity duration-[--duration-normal] cursor-pointer',
        removeButtonSizeClass[size],
      )"
      aria-label="Remove"
      @click.stop="emit('remove')"
    >
      <RiCloseLine class="size-full" />
    </button>
  </span>
</template>
