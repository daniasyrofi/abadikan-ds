<script setup lang="ts">
import { inject, computed } from 'vue'
import { cn } from '@/lib/utils'
import { TABS_KEY, type TabsContext } from './Tabs.vue'

const ctx = inject<TabsContext>(TABS_KEY)!

const classes = computed(() => {
  const isVertical = ctx.orientation === 'horizontal' ? false : true
  const base = 'flex'

  if (ctx.variant === 'line') {
    return cn(
      base,
      isVertical ? 'flex-col border-r border-[--color-border] pr-0' : 'flex-row border-b border-[--color-border]',
      'gap-0',
    )
  }

  if (ctx.variant === 'pill') {
    return cn(
      base,
      isVertical ? 'flex-col' : 'flex-row',
      'gap-1 p-1 bg-[--color-neutral-light] rounded-[--radius-lg]',
    )
  }

  if (ctx.variant === 'boxed') {
    return cn(
      base,
      isVertical ? 'flex-col' : 'flex-row',
      'gap-0 border border-[--color-border] rounded-[--radius-md] overflow-hidden',
    )
  }

  return cn(base, 'flex-row')
})
</script>

<template>
  <div
    :class="classes"
    role="tablist"
    :aria-orientation="ctx.orientation"
  >
    <slot />
  </div>
</template>
