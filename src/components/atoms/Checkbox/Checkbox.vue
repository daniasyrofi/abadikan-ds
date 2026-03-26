<script setup lang="ts">
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'
import { RiCheckLine, RiSubtractLine } from '@remixicon/vue'

type CheckboxSize  = 'sm' | 'md' | 'lg'
type CheckboxValue = boolean | 'indeterminate'

interface Props {
  modelValue:   CheckboxValue
  size?:        CheckboxSize
  disabled?:    boolean
  label?:       string
  description?: string
  error?:       string
  name?:        string
  value?:       string
}

const props = withDefaults(defineProps<Props>(), {
  size:     'md',
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: CheckboxValue] }>()

const inputId = useId()

const isChecked       = computed(() => props.modelValue === true)
const isIndeterminate = computed(() => props.modelValue === 'indeterminate')
const isActive        = computed(() => isChecked.value || isIndeterminate.value)
const hasError        = computed(() => !!props.error)

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (props.modelValue === 'indeterminate') {
    emit('update:modelValue', true)
  } else {
    emit('update:modelValue', target.checked)
  }
}

// Size maps
const boxSizeClass: Record<CheckboxSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
}

const iconSizePx: Record<CheckboxSize, number> = {
  sm: 10,
  md: 12,
  lg: 14,
}

const labelTextClass: Record<CheckboxSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const descTextClass: Record<CheckboxSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
}

const boxClasses = computed(() =>
  cn(
    'shrink-0 inline-flex items-center justify-center rounded-[--radius-sm]',
    'border transition-all duration-[--duration-normal] ease-[--ease-default]',
    boxSizeClass[props.size],
    isActive.value
      ? hasError.value
        ? 'bg-[--color-danger] border-[--color-danger]'
        : 'bg-[--color-primary] border-[--color-primary]'
      : hasError.value
        ? 'bg-[--color-surface] border-[--color-danger]'
        : 'bg-[--color-surface] border-[--color-border-strong]',
    props.disabled && 'opacity-50 cursor-not-allowed',
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
        type="checkbox"
        class="sr-only peer"
        :name="name"
        :value="value"
        :checked="isChecked"
        :indeterminate="isIndeterminate"
        :disabled="disabled"
        :aria-checked="isIndeterminate ? 'mixed' : isChecked"
        :aria-invalid="hasError || undefined"
        :aria-describedby="description || error ? `${inputId}-desc` : undefined"
        @change="handleChange"
      />

      <!-- Visual box -->
      <span
        :class="boxClasses"
        aria-hidden="true"
      >
        <RiCheckLine
          v-if="isChecked"
          :size="iconSizePx[size]"
          class="text-white stroke-[0.5]"
        />
        <RiSubtractLine
          v-else-if="isIndeterminate"
          :size="iconSizePx[size]"
          class="text-white"
        />
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
