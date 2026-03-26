<script setup lang="ts">
import { computed, useId, ref, watch, nextTick, onMounted } from 'vue'
import { cn } from '@/lib/utils'

type TextareaSize   = 'sm' | 'md' | 'lg'
type TextareaResize = 'none' | 'vertical' | 'both'

interface Props {
  modelValue:  string
  size?:       TextareaSize
  label?:      string
  placeholder?: string
  helperText?: string
  error?:      string
  rows?:       number
  maxRows?:    number
  autoResize?: boolean
  disabled?:   boolean
  readonly?:   boolean
  counter?:    boolean
  maxlength?:  number
  resize?:     TextareaResize
}

const props = withDefaults(defineProps<Props>(), {
  size:       'md',
  rows:       3,
  autoResize: true,
  disabled:   false,
  readonly:   false,
  counter:    false,
  resize:     'none',
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const autoId     = useId()
const textareaId = computed(() => autoId)
const textareaEl = ref<HTMLTextAreaElement | null>(null)
const hasError   = computed(() => !!props.error)
const charCount  = computed(() => props.modelValue?.length ?? 0)

// ── Auto-resize ─────────────────────────────────────────────────────────

function recalcHeight() {
  const el = textareaEl.value
  if (!el || !props.autoResize) return

  // Reset to auto to get correct scrollHeight
  el.style.height = 'auto'

  let newHeight = el.scrollHeight

  // Apply maxRows cap if set
  if (props.maxRows) {
    const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 20
    const paddingTop    = parseInt(getComputedStyle(el).paddingTop) || 0
    const paddingBottom = parseInt(getComputedStyle(el).paddingBottom) || 0
    const maxHeight     = props.maxRows * lineHeight + paddingTop + paddingBottom
    newHeight = Math.min(newHeight, maxHeight)
  }

  el.style.height = `${newHeight}px`
}

function handleInput(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  if (props.autoResize) {
    nextTick(recalcHeight)
  }
}

// Recalc when value changes externally
watch(() => props.modelValue, () => {
  nextTick(recalcHeight)
})

onMounted(() => {
  nextTick(recalcHeight)
})

// ── Size maps ────────────────────────────────────────────────────────────

const textSizeClass: Record<TextareaSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const paddingClass: Record<TextareaSize, string> = {
  sm: 'px-2.5 py-1.5',
  md: 'px-3 py-2',
  lg: 'px-3.5 py-2.5',
}

const resizeStyle = computed(() => {
  if (props.autoResize) return 'resize: none;'
  return `resize: ${props.resize};`
})

const wrapperClasses = computed(() =>
  cn(
    'relative w-full rounded-[--radius-md] border bg-[--color-surface]',
    'transition-colors duration-[--duration-normal] ease-[--ease-default]',
    'focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-[--color-primary]',
    hasError.value
      ? 'border-[--color-danger] focus-within:outline-[--color-danger]'
      : 'border-[--color-border] hover:border-[--color-border-strong]',
    props.disabled && 'opacity-50 cursor-not-allowed bg-[--color-bg-subtle]',
    props.readonly && 'bg-[--color-bg-subtle]',
  )
)

const textareaClasses = computed(() =>
  cn(
    'block w-full bg-transparent outline-none',
    'text-[--color-text-primary] placeholder:text-[--color-text-tertiary]',
    textSizeClass[props.size],
    paddingClass[props.size],
    'leading-relaxed',
    props.disabled && 'cursor-not-allowed',
    props.readonly && 'cursor-default',
  )
)
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="textareaId"
      :class="cn(
        'text-sm font-medium text-[--color-text-primary]',
        disabled && 'opacity-50',
      )"
    >
      {{ label }}
    </label>

    <!-- Textarea wrapper -->
    <div :class="wrapperClasses">
      <textarea
        :id="textareaId"
        ref="textareaEl"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :style="resizeStyle"
        :aria-invalid="hasError || undefined"
        :aria-describedby="helperText || error ? `${textareaId}-hint` : undefined"
        :class="textareaClasses"
        v-bind="$attrs"
        @input="handleInput"
      />
    </div>

    <!-- Bottom row: helper/error + counter -->
    <div
      v-if="helperText || error || (counter && maxlength)"
      class="flex items-start justify-between gap-2"
    >
      <p
        v-if="helperText || error"
        :id="`${textareaId}-hint`"
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
