<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Layout = 'stack' | 'grid' | 'inline'
type Gap    = 'sm' | 'md' | 'lg'

interface Props {
  /** Form layout arrangement: stack (vertical), grid (responsive 2-col), or inline (horizontal wrap). @default 'stack' */
  layout?: Layout
  /** Spacing between form fields. @default 'md' */
  gap?:    Gap
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'stack',
  gap:    'md',
})

const layoutClasses: Record<Layout, string> = {
  stack:  'flex flex-col',
  grid:   'grid grid-cols-1 md:grid-cols-2',
  inline: 'flex flex-row flex-wrap items-end',
}

const gapClasses: Record<Gap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

const classes = computed(() =>
  cn(
    layoutClasses[props.layout],
    gapClasses[props.gap],
  )
)
</script>

<template>
  <form :class="classes" v-bind="$attrs">
    <slot />
  </form>
</template>
