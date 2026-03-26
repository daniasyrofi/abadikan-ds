<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type ToggleSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue:     boolean
  size?:          ToggleSize
  disabled?:      boolean
  label?:         string
  labelPosition?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  size:          'md',
  disabled:      false,
  labelPosition: 'right',
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

// Track dimensions per size
const trackClass: Record<ToggleSize, string> = {
  sm: 'w-7 h-4',
  md: 'w-9 h-5',
  lg: 'w-11 h-6',
}

const thumbClass: Record<ToggleSize, string> = {
  sm: 'size-3',
  md: 'size-[14px]',
  lg: 'size-[18px]',
}

const thumbTranslate: Record<ToggleSize, { off: string; on: string }> = {
  sm: { off: 'translate-x-0.5', on: 'translate-x-3.5' },
  md: { off: 'translate-x-[3px]', on: 'translate-x-[19px]' },
  lg: { off: 'translate-x-[3px]', on: 'translate-x-[23px]' },
}

const labelTextClass: Record<ToggleSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const trackClasses = computed(() =>
  cn(
    'relative inline-flex shrink-0 items-center rounded-full',
    'cursor-pointer select-none',
    'transition-all duration-[--duration-normal] ease-[--ease-default]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
    trackClass[props.size],
    props.modelValue
      ? 'bg-[--color-primary]'
      : 'bg-[--color-border-strong]',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
  )
)

const thumbClasses = computed(() =>
  cn(
    'rounded-full bg-white shadow-sm',
    'transition-transform duration-[--duration-normal] ease-[--ease-default]',
    thumbClass[props.size],
    props.modelValue
      ? thumbTranslate[props.size].on
      : thumbTranslate[props.size].off,
  )
)
</script>

<template>
  <label
    :class="cn(
      'inline-flex items-center gap-2',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    )"
  >
    <!-- Label left -->
    <span
      v-if="label && labelPosition === 'left'"
      :class="cn(
        labelTextClass[size],
        'font-medium text-[--color-text-primary]',
        disabled && 'opacity-50',
      )"
    >
      {{ label }}
    </span>

    <!-- Track -->
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label"
      :disabled="disabled"
      :class="trackClasses"
      @click="toggle"
      @keydown.space.prevent="toggle"
      @keydown.enter.prevent="toggle"
    >
      <span :class="thumbClasses" aria-hidden="true" />
    </button>

    <!-- Label right -->
    <span
      v-if="label && labelPosition === 'right'"
      :class="cn(
        labelTextClass[size],
        'font-medium text-[--color-text-primary]',
        disabled && 'opacity-50',
      )"
    >
      {{ label }}
    </span>
  </label>
</template>
