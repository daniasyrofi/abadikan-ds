<script setup lang="ts">
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** Visual size of all form elements in the group. @default 'md' */
  size?: Size
  /** Sets error styling for the entire input group. @default false */
  error?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  error: false,
})
</script>

<template>
  <div
    :class="cn(
      'ds-input-group',
      error && 'ds-input-group--error',
      'flex items-stretch w-full',
    )"
  >
    <slot />
  </div>
</template>

<style scoped>
.ds-input-group :deep(.ds-btn) {
  flex-shrink: 0;
  white-space: nowrap;
}

/* Keep grouped focus/hover clean (no ring or darker outline leaking) */
.ds-input-group :deep(.ds-input-wrapper:hover:not(.ds-input-wrapper--disabled):not(.ds-input-wrapper--readonly):not(:focus-within)),
.ds-input-group :deep(.ds-input-wrapper:focus-within:not(.ds-input-wrapper--error)) {
  border-color: var(--color-border) !important;
}

.ds-input-group :deep(.ds-input-wrapper:focus-within:not(.ds-input-wrapper--error)),
.ds-input-group :deep(.ds-input-wrapper--error:focus-within) {
  box-shadow: none !important;
}

/* Keep error border stable (no extra glow) */
.ds-input-group :deep(.ds-input-wrapper--error),
.ds-input-group :deep(.ds-input-wrapper--error:focus-within) {
  border-color: var(--color-danger) !important;
}

/* Disable button focus ring inside grouped control to avoid visual overflow */
.ds-input-group :deep(.ds-btn:focus-visible) {
  box-shadow: none !important;
}

/* Error mode for whole group: preserve shape, only switch input border color */
.ds-input-group--error :deep(.ds-input-wrapper),
.ds-input-group--error :deep(.ds-input-wrapper:hover:not(.ds-input-wrapper--disabled):not(.ds-input-wrapper--readonly):not(:focus-within)),
.ds-input-group--error :deep(.ds-input-wrapper:focus-within) {
  border-color: var(--color-danger) !important;
  box-shadow: none !important;
}

/* First child: use input radius on outer-left, inner-right stays square */
.ds-input-group > :deep(:first-child),
.ds-input-group > :deep(:first-child .ds-input-wrapper),
.ds-input-group > :deep(:first-child .ds-btn) {
  border-top-left-radius: var(--radius-lg) !important;
  border-bottom-left-radius: var(--radius-lg) !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.ds-input-group > :deep(:first-child .ds-input-wrapper) {
  border-right: none !important;
}

/* Last child: use input radius on outer-right, inner-left stays square */
.ds-input-group > :deep(:last-child),
.ds-input-group > :deep(:last-child .ds-input-wrapper),
.ds-input-group > :deep(:last-child .ds-btn) {
  border-top-right-radius: var(--radius-lg) !important;
  border-bottom-right-radius: var(--radius-lg) !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

/* Clean seam between grouped controls */
.ds-input-group > :deep(:first-child .ds-btn) {
  border-right: none !important;
}

.ds-input-group > :deep(:last-child .ds-btn) {
  border-left: none !important;
}

/* Middle children: fully square */
.ds-input-group > :deep(:not(:first-child):not(:last-child)),
.ds-input-group > :deep(:not(:first-child):not(:last-child) .ds-input-wrapper),
.ds-input-group > :deep(:not(:first-child):not(:last-child) .ds-btn) {
  border-radius: 0 !important;
}
</style>
