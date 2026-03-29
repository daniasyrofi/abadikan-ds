<script setup lang="ts">
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'
type ToggleColor = 'primary' | 'secondary' | 'neutral' | 'danger'

interface Props {
  modelValue?: boolean
  size?:       Size
  color?:      ToggleColor
  disabled?:   boolean
  label?:      string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size:       'md',
  color:      'primary',
  disabled:   false,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const inputId = useId()

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}

const trackClass: Record<Size, string> = {
  sm: 'w-7 h-4',   // 16px high
  md: 'w-9 h-5',   // 20px high
  lg: 'w-11 h-6',  // 24px high
}

const thumbClass: Record<Size, string> = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
}

const thumbTranslate: Record<Size, { on: string; off: string }> = {
  sm: { on: 'translate-x-3.5', off: 'translate-x-[2px]' },
  md: { on: 'translate-x-4.5', off: 'translate-x-[2px]' },
  lg: { on: 'translate-x-5.5', off: 'translate-x-[2px]' },
}

const labelTextClass: Record<Size, string> = {
  sm: 'text-xs',   // 12px
  md: 'text-sm',   // 14px
  lg: 'text-base', // 16px
}

// Math for baseline alignment: (TrackHeight - LineHeight) / 2
// Assumes text uses leading-none (LineHeight = FontSize)
const offsetClass: Record<Size, string> = {
  sm: 'mt-[2px]',  // (16 - 12)/2 = 2px
  md: 'mt-[3px]',  // (20 - 14)/2 = 3px
  lg: 'mt-[4px]',  // (24 - 16)/2 = 4px
}

const trackClasses = computed(() =>
  cn(
    'relative inline-flex shrink-0 items-center',
    'cursor-pointer select-none',
    'transition-all duration-200 ease-out',
    trackClass[props.size],
    'shadow-inner',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    'active:scale-[0.96]',
  )
)

const trackStyle = computed(() => ({
  backgroundColor: props.modelValue
    ? `var(--color-${props.color})`
    : 'var(--color-border-strong)',
  borderRadius: 'var(--radius-full)',
  '--focus-ring-color': `var(--color-${props.color})`,
}))

const thumbClasses = computed(() =>
  cn(
    'transition-transform duration-200 ease-out',
    thumbClass[props.size],
    props.modelValue
      ? thumbTranslate[props.size].on
      : thumbTranslate[props.size].off,
  )
)

const thumbStyle = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-full)',
  boxShadow: 'var(--shadow-sm)',
}
</script>

<template>
  <div class="relative flex items-start gap-2.5">
    <input
      :id="inputId"
      type="checkbox"
      role="switch"
      class="sr-only peer"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="label || 'Toggle'"
      @change="toggle"
    />

    <button
      type="button"
      :class="trackClasses"
      :style="trackStyle"
      class="ds-toggle-track focus-visible:outline-none"
      :aria-checked="modelValue"
      role="switch"
      :tabindex="disabled ? -1 : 0"
      @click="toggle"
      @keydown.space.prevent="toggle"
      @keydown.enter.prevent="toggle"
    >
      <span :class="thumbClasses" :style="thumbStyle" />
    </button>

    <label
      v-if="label"
      :for="inputId"
      :class="cn(
        labelTextClass[size],
        offsetClass[size],
        'font-medium leading-none select-none transition-colors',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )"
      :style="{ color: 'var(--color-text-primary)' }"
    >
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.ds-toggle-track:focus-visible {
  box-shadow: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--focus-ring-color, var(--color-primary));
}
</style>
