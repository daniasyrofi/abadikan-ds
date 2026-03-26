<script setup lang="ts">
import { computed, useId, ref } from 'vue'
import { cn } from '@/lib/utils'
import { RiCloseLine, RiEyeLine, RiEyeOffLine } from '@remixicon/vue'

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
type InputSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue:  string
  type?:       InputType
  size?:       InputSize
  label?:      string
  placeholder?: string
  helperText?: string
  error?:      string
  disabled?:   boolean
  readonly?:   boolean
  required?:   boolean
  clearable?:  boolean
  counter?:    boolean
  maxlength?:  number
  id?:         string
}

const props = withDefaults(defineProps<Props>(), {
  type:     'text',
  size:     'md',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  counter:  false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'clear': []
}>()

const autoId       = useId()
const inputId      = computed(() => props.id ?? autoId)
const showPassword = ref(false)
const hasError     = computed(() => !!props.error)
const charCount    = computed(() => props.modelValue?.length ?? 0)
const isPassword   = computed(() => props.type === 'password')
const effectiveType = computed(() => {
  if (isPassword.value) return showPassword.value ? 'text' : 'password'
  return props.type
})

const showClear = computed(
  () => props.clearable && !!props.modelValue && !props.disabled && !props.readonly,
)

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
}

// ── Size maps ──────────────────────────────────────────────────────────────

const heightClass: Record<InputSize, string> = {
  sm: 'h-8',
  md: 'h-9',
  lg: 'h-10',
}

const textSizeClass: Record<InputSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const paddingXClass: Record<InputSize, string> = {
  sm: 'px-2.5',
  md: 'px-3',
  lg: 'px-3.5',
}

const iconSizePx: Record<InputSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

const addonPaddingClass: Record<InputSize, string> = {
  sm: 'px-2',
  md: 'px-2.5',
  lg: 'px-3',
}

// ── Computed styles ───────────────────────────────────────────────────────

const wrapperClasses = computed(() =>
  cn(
    'relative flex items-center w-full',
    'rounded-[--radius-md] border bg-[--color-surface]',
    'transition-colors duration-[--duration-normal] ease-[--ease-default]',
    'focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-[--color-primary]',
    hasError.value
      ? 'border-[--color-danger] focus-within:outline-[--color-danger]'
      : 'border-[--color-border] hover:border-[--color-border-strong]',
    props.disabled && 'opacity-50 cursor-not-allowed bg-[--color-bg-subtle]',
    props.readonly && 'bg-[--color-bg-subtle]',
  )
)

const inputClasses = computed(() =>
  cn(
    'flex-1 min-w-0 bg-transparent outline-none',
    'text-[--color-text-primary] placeholder:text-[--color-text-tertiary]',
    textSizeClass[props.size],
    // Horizontal padding: only add if no prefix/suffix slot
    '$slots.prefix' ? 'pl-0' : paddingXClass[props.size],
    '$slots.suffix' ? 'pr-0' : paddingXClass[props.size],
    heightClass[props.size],
    props.disabled && 'cursor-not-allowed',
    props.readonly && 'cursor-default',
  )
)

const addonClasses = computed(() =>
  cn(
    'shrink-0 inline-flex items-center self-stretch',
    'text-[--color-text-secondary] select-none',
    textSizeClass[props.size],
    addonPaddingClass[props.size],
  )
)

const iconSlotClasses = computed(() =>
  cn(
    'shrink-0 inline-flex items-center self-stretch',
    'text-[--color-text-tertiary]',
    props.size === 'sm' ? 'px-2' : 'px-2.5',
  )
)

const actionBtnClasses = computed(() =>
  cn(
    'shrink-0 inline-flex items-center justify-center self-stretch',
    'text-[--color-text-tertiary] hover:text-[--color-text-primary]',
    'transition-colors duration-[--duration-normal]',
    'cursor-pointer focus-visible:outline-2 focus-visible:outline-[--color-primary] rounded-sm',
    props.size === 'sm' ? 'px-1.5' : 'px-2',
  )
)
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      :class="cn(
        'text-sm font-medium text-[--color-text-primary]',
        disabled && 'opacity-50',
      )"
    >
      {{ label }}
      <span v-if="required" class="text-[--color-danger] ml-0.5" aria-hidden="true">*</span>
    </label>

    <!-- Input wrapper -->
    <div :class="wrapperClasses">
      <!-- Prefix text (e.g. "$") -->
      <span
        v-if="$slots.prefix"
        :class="cn(addonClasses, 'border-r border-[--color-border] text-[--color-text-secondary]')"
      >
        <slot name="prefix" />
      </span>

      <!-- Leading icon -->
      <span
        v-if="$slots.leading"
        :class="cn(iconSlotClasses, !$slots.prefix && 'pl-2.5 pr-0')"
      >
        <slot name="leading" />
      </span>

      <!-- The actual input -->
      <input
        :id="inputId"
        :type="effectiveType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :name="$attrs.name as string"
        :autocomplete="$attrs.autocomplete as string"
        :aria-invalid="hasError || undefined"
        :aria-describedby="helperText || error ? `${inputId}-hint` : undefined"
        :class="cn(
          'flex-1 min-w-0 bg-transparent outline-none h-full',
          textSizeClass[size],
          heightClass[size],
          // Left padding when no prefix/leading
          !$slots.prefix && !$slots.leading ? paddingXClass[size] : 'pl-2',
          // Right padding when no suffix/trailing/clear/password
          !$slots.suffix && !$slots.trailing && !showClear && !isPassword ? paddingXClass[size] : 'pr-1.5',
          'text-[--color-text-primary] placeholder:text-[--color-text-tertiary]',
          disabled && 'cursor-not-allowed',
          readonly && 'cursor-default',
        )"
        v-bind="{ ...$attrs, name: undefined, autocomplete: undefined }"
        @input="handleInput"
      />

      <!-- Clear button -->
      <button
        v-if="showClear && !$slots.trailing && !isPassword"
        type="button"
        :class="actionBtnClasses"
        aria-label="Clear"
        @click="handleClear"
      >
        <RiCloseLine :size="iconSizePx[size]" />
      </button>

      <!-- Password visibility toggle -->
      <button
        v-if="isPassword"
        type="button"
        :class="actionBtnClasses"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        @click="showPassword = !showPassword"
      >
        <RiEyeOffLine v-if="showPassword" :size="iconSizePx[size]" />
        <RiEyeLine    v-else              :size="iconSizePx[size]" />
      </button>

      <!-- Trailing slot (icon/button) -->
      <span
        v-if="$slots.trailing"
        :class="cn(iconSlotClasses, 'pr-2.5 pl-0')"
      >
        <slot name="trailing" />
      </span>

      <!-- Suffix text (e.g. ".com") -->
      <span
        v-if="$slots.suffix"
        :class="cn(addonClasses, 'border-l border-[--color-border]')"
      >
        <slot name="suffix" />
      </span>
    </div>

    <!-- Bottom row: helper/error + counter -->
    <div
      v-if="helperText || error || (counter && maxlength)"
      class="flex items-start justify-between gap-2"
    >
      <!-- Helper text or error -->
      <p
        v-if="helperText || error"
        :id="`${inputId}-hint`"
        :class="cn(
          'text-sm',
          hasError ? 'text-[--color-danger]' : 'text-[--color-text-secondary]',
        )"
      >
        {{ error ?? helperText }}
      </p>
      <span v-else />

      <!-- Character counter -->
      <span
        v-if="counter && maxlength"
        :class="cn(
          'text-xs shrink-0 tabular-nums',
          charCount >= maxlength
            ? 'text-[--color-danger]'
            : 'text-[--color-text-tertiary]',
        )"
      >
        {{ charCount }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>
