<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/utils'
import { RiSearchLine, RiCloseLine } from '@remixicon/vue'

type InputSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue:  string
  size?:       InputSize
  placeholder?: string
  loading?:    boolean
  clearable?:  boolean
  debounce?:   number
  disabled?:   boolean
}

const props = withDefaults(defineProps<Props>(), {
  size:        'md',
  placeholder: 'Search...',
  loading:     false,
  clearable:   true,
  debounce:    300,
  disabled:    false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
  'clear': []
}>()

const internalValue = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.modelValue, (v) => {
  internalValue.value = v
})

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  internalValue.value = value
  emit('update:modelValue', value)

  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', value)
  }, props.debounce)
}

function handleClear() {
  internalValue.value = ''
  emit('update:modelValue', '')
  emit('search', '')
  emit('clear')
}

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

const showClear = computed(
  () => props.clearable && !!internalValue.value && !props.disabled && !props.loading,
)

// ── Size maps ────────────────────────────────────────────────────────────────

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

const iconSizePx: Record<InputSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

// ── Computed styles ──────────────────────────────────────────────────────────

const wrapperClasses = computed(() =>
  cn(
    'relative flex items-center w-full',
    'rounded-[--radius-md] border bg-[--color-surface]',
    'transition-colors duration-[--duration-normal] ease-[--ease-default]',
    'focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-[--color-primary]',
    'border-[--color-border] hover:border-[--color-border-strong]',
    props.disabled && 'opacity-50 cursor-not-allowed bg-[--color-bg-subtle]',
  )
)

const inputClasses = computed(() =>
  cn(
    'flex-1 min-w-0 bg-transparent outline-none',
    'text-[--color-text-primary] placeholder:text-[--color-text-tertiary]',
    textSizeClass[props.size],
    heightClass[props.size],
    'pr-3',
    props.disabled && 'cursor-not-allowed',
  )
)
</script>

<template>
  <div :class="wrapperClasses">
    <!-- Search icon -->
    <span
      :class="cn(
        'shrink-0 inline-flex items-center self-stretch',
        'text-[--color-text-tertiary]',
        size === 'sm' ? 'pl-2.5 pr-1.5' : 'pl-3 pr-2',
      )"
    >
      <RiSearchLine :size="iconSizePx[size]" aria-hidden="true" />
    </span>

    <!-- Input -->
    <input
      type="search"
      :value="internalValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      v-bind="$attrs"
      @input="handleInput"
    />

    <!-- Loading spinner -->
    <span
      v-if="loading"
      :class="cn(
        'shrink-0 inline-flex items-center justify-center self-stretch',
        'text-[--color-text-tertiary]',
        size === 'sm' ? 'px-2' : 'px-2.5',
      )"
    >
      <svg
        class="shrink-0 animate-spin"
        :class="size === 'sm' ? 'size-3.5' : 'size-4'"
        viewBox="0 0 24 24"
        fill="none"
        aria-label="Loading"
        role="status"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </span>

    <!-- Clear button -->
    <button
      v-else-if="showClear"
      type="button"
      :class="cn(
        'shrink-0 inline-flex items-center justify-center self-stretch',
        'text-[--color-text-tertiary] hover:text-[--color-text-primary]',
        'transition-colors duration-[--duration-normal]',
        'cursor-pointer focus-visible:outline-2 focus-visible:outline-[--color-primary] rounded-sm',
        size === 'sm' ? 'px-2' : 'px-2.5',
      )"
      aria-label="Clear search"
      @click="handleClear"
    >
      <RiCloseLine :size="iconSizePx[size]" />
    </button>
  </div>
</template>
