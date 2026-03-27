<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSkipBackLine,
  RiSkipForwardLine,
} from '@remixicon/vue'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  modelValue: number
  total: number
  perPage?: number
  maxVisiblePages?: number
  showFirstLast?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 10,
  maxVisiblePages: 5,
  showFirstLast: true,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))

const isFirstPage = computed(() => props.modelValue <= 1)
const isLastPage = computed(() => props.modelValue >= totalPages.value)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.modelValue
  const max = props.maxVisiblePages

  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const half = Math.floor(max / 2)
  let start = current - half
  let end = current + half

  if (start < 1) {
    start = 1
    end = max
  }

  if (end > total) {
    end = total
    start = total - max + 1
  }

  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

  if (start > 1) {
    pages.push(1)
    if (start > 2) {
      pages.push('ellipsis-start')
    }
  }

  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) {
      pages.push(i)
    }
  }

  if (end < total) {
    if (end < total - 1) {
      pages.push('ellipsis-end')
    }
    if (!pages.includes(total)) {
      pages.push(total)
    }
  }

  return pages
})

function goTo(page: number) {
  const clamped = Math.max(1, Math.min(page, totalPages.value))
  if (clamped !== props.modelValue) {
    emit('update:modelValue', clamped)
  }
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-9 w-9 text-sm',
}

const iconSize: Record<Size, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

const buttonBase = [
  'inline-flex items-center justify-center',
  'rounded-[--radius-md] border border-transparent',
  'cursor-pointer select-none',
  'transition-colors duration-[--duration-normal] ease-[--ease-default]',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
]

function navBtnClasses(disabled: boolean) {
  return cn(
    ...buttonBase,
    sizeClasses[props.size],
    'text-[--color-text-primary]',
    disabled
      ? 'opacity-30 cursor-not-allowed pointer-events-none'
      : 'hover:bg-[--color-neutral-light]',
  )
}

function pageBtnClasses(page: number | string) {
  const isCurrent = page === props.modelValue
  return cn(
    ...buttonBase,
    sizeClasses[props.size],
    isCurrent
      ? 'bg-[--color-neutral] text-[--color-text-inverse] font-medium'
      : 'text-[--color-text-primary] hover:bg-[--color-neutral-light]',
  )
}

function ellipsisClasses() {
  return cn(
    'inline-flex items-center justify-center',
    sizeClasses[props.size],
    'text-[--color-text-tertiary] select-none',
  )
}
</script>

<template>
  <nav aria-label="Pagination" class="flex items-center gap-1">
    <!-- First page -->
    <button
      v-if="showFirstLast"
      type="button"
      :class="navBtnClasses(isFirstPage)"
      :disabled="isFirstPage"
      aria-label="First page"
      @click="goTo(1)"
    >
      <RiSkipBackLine :size="iconSize[size]" />
    </button>

    <!-- Previous page -->
    <button
      type="button"
      :class="navBtnClasses(isFirstPage)"
      :disabled="isFirstPage"
      aria-label="Previous page"
      @click="goTo(modelValue - 1)"
    >
      <RiArrowLeftSLine :size="iconSize[size]" />
    </button>

    <!-- Page numbers -->
    <template v-for="page in visiblePages" :key="page">
      <span v-if="typeof page === 'string'" :class="ellipsisClasses()">
        &hellip;
      </span>
      <button
        v-else
        type="button"
        :class="pageBtnClasses(page)"
        :aria-current="page === modelValue ? 'page' : undefined"
        :aria-label="`Page ${page}`"
        @click="goTo(page)"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next page -->
    <button
      type="button"
      :class="navBtnClasses(isLastPage)"
      :disabled="isLastPage"
      aria-label="Next page"
      @click="goTo(modelValue + 1)"
    >
      <RiArrowRightSLine :size="iconSize[size]" />
    </button>

    <!-- Last page -->
    <button
      v-if="showFirstLast"
      type="button"
      :class="navBtnClasses(isLastPage)"
      :disabled="isLastPage"
      aria-label="Last page"
      @click="goTo(totalPages)"
    >
      <RiSkipForwardLine :size="iconSize[size]" />
    </button>
  </nav>
</template>
