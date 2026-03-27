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

interface Props {
  id: string
  variant?: Variant
  title: string
  description?: string
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  dismissible: true,
})

const emit = defineEmits<{ dismiss: [id: string] }>()

// ── Variant maps ────────────────────────────────────────────────────────────

const variantClasses: Record<Variant, string> = {
  info:    'bg-[--color-info-light] border-[--color-info] text-[--color-info]',
  success: 'bg-[--color-success-light] border-[--color-success] text-[--color-success]',
  warning: 'bg-[--color-warning-light] border-[--color-warning] text-[--color-warning]',
  danger:  'bg-[--color-danger-light] border-[--color-danger] text-[--color-danger]',
}

const iconComponents: Record<Variant, typeof RiInformationLine> = {
  info:    RiInformationLine,
  success: RiCheckboxCircleLine,
  warning: RiAlertLine,
  danger:  RiErrorWarningLine,
}

const iconComponent = computed(() => iconComponents[props.variant])

const wrapperClasses = computed(() =>
  cn(
    'flex items-start gap-3 w-80 p-4',
    'rounded-[--radius-md] border',
    'shadow-[--shadow-lg]',
    variantClasses[props.variant],
  )
)
</script>

<template>
  <div :class="wrapperClasses" role="alert">
    <!-- Icon -->
    <span class="shrink-0 flex items-center mt-0.5">
      <component :is="iconComponent" :size="18" aria-hidden="true" />
    </span>

    <!-- Content -->
    <div class="flex-1 min-w-0 flex flex-col gap-0.5">
      <p class="text-sm font-semibold leading-snug">
        {{ title }}
      </p>
      <p
        v-if="description"
        class="text-xs text-[--color-text-primary] opacity-80 leading-relaxed"
      >
        {{ description }}
      </p>
      <div v-if="$slots.action" class="mt-1.5 flex items-center gap-2">
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
        'p-0.5',
      )"
      aria-label="Dismiss"
      @click="emit('dismiss', id)"
    >
      <RiCloseLine :size="16" />
    </button>
  </div>
</template>
