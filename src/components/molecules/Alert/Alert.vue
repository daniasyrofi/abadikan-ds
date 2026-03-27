<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  RiInformationLine,
  RiCheckboxCircleLine,
  RiAlertLine,
  RiErrorWarningLine,
  RiCloseLine,
} from '@remixicon/vue'

type Variant = 'info' | 'success' | 'warning' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface Props {
  variant?:    Variant
  size?:       Size
  title?:      string
  icon?:       boolean
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant:     'info',
  size:        'md',
  icon:        true,
  dismissible: false,
})

const emit = defineEmits<{ dismiss: [] }>()

// ── Color maps ───────────────────────────────────────────────────────────────

const variantClasses: Record<Variant, string> = {
  info:    'bg-[--color-info-light]/80 border-[--color-info]/30 text-[--color-info]',
  success: 'bg-[--color-success-light]/80 border-[--color-success]/30 text-[--color-success]',
  warning: 'bg-[--color-warning-light]/80 border-[--color-warning]/30 text-[--color-warning]',
  danger:  'bg-[--color-danger-light]/80 border-[--color-danger]/30 text-[--color-danger]',
}

const accentClasses: Record<Variant, string> = {
  info:    'bg-[--color-info]',
  success: 'bg-[--color-success]',
  warning: 'bg-[--color-warning]',
  danger:  'bg-[--color-danger]',
}

const titleColorClasses: Record<Variant, string> = {
  info:    'text-[--color-info]',
  success: 'text-[--color-success]',
  warning: 'text-[--color-warning]',
  danger:  'text-[--color-danger]',
}

const defaultIconComponents: Record<Variant, typeof RiInformationLine> = {
  info:    RiInformationLine,
  success: RiCheckboxCircleLine,
  warning: RiAlertLine,
  danger:  RiErrorWarningLine,
}

// ── Size maps ────────────────────────────────────────────────────────────────

const paddingClasses: Record<Size, string> = {
  sm: 'p-3 gap-2.5',
  md: 'p-4 gap-3',
  lg: 'p-5 gap-3.5',
}

const iconSizePx: Record<Size, number> = {
  sm: 16,
  md: 18,
  lg: 20,
}

const titleSizeClasses: Record<Size, string> = {
  sm: 'text-sm font-semibold',
  md: 'text-sm font-semibold',
  lg: 'text-base font-semibold',
}

const bodySizeClasses: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
}

const dismissSizePx: Record<Size, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

const iconComponent = computed(() => defaultIconComponents[props.variant])

const wrapperClasses = computed(() =>
  cn(
    'relative flex w-full rounded-[--radius-md] border overflow-hidden',
    paddingClasses[props.size],
    variantClasses[props.variant],
  )
)
</script>

<template>
  <div :class="wrapperClasses" role="alert">
    <!-- Left accent bar -->
    <span
      :class="cn('absolute left-0 inset-y-0 w-1 rounded-l-[--radius-md]', accentClasses[variant])"
      aria-hidden="true"
    />

    <!-- Icon area -->
    <span
      v-if="icon || $slots.icon"
      class="shrink-0 flex items-start mt-px pl-1"
    >
      <slot name="icon">
        <component :is="iconComponent" :size="iconSizePx[size]" aria-hidden="true" />
      </slot>
    </span>

    <!-- Content -->
    <div class="flex-1 min-w-0 flex flex-col gap-1">
      <!-- Title -->
      <p
        v-if="title"
        :class="cn(titleSizeClasses[size], titleColorClasses[variant])"
      >
        {{ title }}
      </p>

      <!-- Description (default slot) -->
      <div
        v-if="$slots.default"
        :class="cn(bodySizeClasses[size], 'text-[--color-text-primary] opacity-90')"
      >
        <slot />
      </div>

      <!-- Action slot -->
      <div v-if="$slots.action" class="mt-2 flex items-center gap-2">
        <slot name="action" />
      </div>
    </div>

    <!-- Dismiss button -->
    <button
      v-if="dismissible"
      type="button"
      :class="cn(
        'shrink-0 flex items-center justify-center self-start',
        'rounded-[--radius-sm] opacity-60 hover:opacity-100',
        'transition-opacity duration-[--duration-normal] cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[--color-primary]',
        size === 'sm' ? 'p-0.5' : 'p-1',
      )"
      aria-label="Dismiss"
      @click="emit('dismiss')"
    >
      <RiCloseLine :size="dismissSizePx[size]" />
    </button>
  </div>
</template>
