<script setup lang="ts">
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'

type RadioSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue:   string | number
  value:        string | number
  size?:        RadioSize
  disabled?:    boolean
  label?:       string
  description?: string
  error?:       string
  name?:        string
}

const props = withDefaults(defineProps<Props>(), {
  size:     'md',
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

const inputId  = useId()
const isChecked = computed(() => props.modelValue === props.value)
const hasError  = computed(() => !!props.error)

function handleChange() {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
  }
}

// Size maps
const outerSizeClass: Record<RadioSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
}

const innerSizeClass: Record<RadioSize, string> = {
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2.5',
}

const labelTextClass: Record<RadioSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const descTextClass: Record<RadioSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
}

const outerClasses = computed(() =>
  cn(
    'shrink-0 inline-flex items-center justify-center rounded-full',
    'border transition-all duration-[--duration-normal] ease-[--ease-default]',
    outerSizeClass[props.size],
    isChecked.value
      ? hasError.value
        ? 'border-[--color-danger] bg-[--color-surface]'
        : 'border-[--color-primary] bg-[--color-surface]'
      : hasError.value
        ? 'border-[--color-danger] bg-[--color-surface]'
        : 'border-[--color-border-strong] bg-[--color-surface]',
    props.disabled && 'opacity-50',
  )
)

const innerClasses = computed(() =>
  cn(
    'rounded-full transition-all duration-[--duration-normal] ease-[--ease-default]',
    innerSizeClass[props.size],
    isChecked.value
      ? hasError.value
        ? 'bg-[--color-danger] scale-100'
        : 'bg-[--color-primary] scale-100'
      : 'scale-0 bg-transparent',
  )
)
</script>

<template>
  <div :class="cn('inline-flex flex-col gap-1', disabled && 'cursor-not-allowed')">
    <label
      :class="cn(
        'inline-flex items-start gap-2',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )"
    >
      <!-- Hidden native input -->
      <input
        :id="inputId"
        type="radio"
        class="sr-only peer"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :aria-invalid="hasError || undefined"
        :aria-describedby="description || error ? `${inputId}-desc` : undefined"
        @change="handleChange"
      />

      <!-- Visual radio button -->
      <span :class="outerClasses" aria-hidden="true">
        <span :class="innerClasses" />
      </span>

      <!-- Text content -->
      <span
        v-if="label || description"
        class="flex flex-col gap-0.5 pt-px"
      >
        <span
          v-if="label"
          :class="cn(
            labelTextClass[size],
            'font-medium leading-snug',
            hasError ? 'text-[--color-danger]' : 'text-[--color-text-primary]',
            disabled && 'opacity-50',
          )"
        >
          {{ label }}
        </span>
        <span
          v-if="description && !error"
          :id="`${inputId}-desc`"
          :class="cn(descTextClass[size], 'text-[--color-text-secondary]', disabled && 'opacity-50')"
        >
          {{ description }}
        </span>
      </span>
    </label>

    <!-- Error message -->
    <p
      v-if="error"
      :id="`${inputId}-desc`"
      class="text-sm text-[--color-danger] ml-6"
    >
      {{ error }}
    </p>
  </div>
</template>
