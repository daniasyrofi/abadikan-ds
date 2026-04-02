<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Orientation = 'horizontal' | 'vertical'
type Variant = 'solid' | 'dashed' | 'dotted'
type LabelPosition = 'start' | 'center' | 'end'

interface Props {
  orientation?: Orientation
  variant?: Variant
  label?: string
  labelPosition?: LabelPosition
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  variant: 'solid',
  labelPosition: 'center',
})

const borderStyle: Record<Variant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
}

const isHorizontal = computed(() => props.orientation === 'horizontal')

const wrapperClasses = computed(() =>
  cn('flex items-center', isHorizontal.value ? 'flex-row w-full' : 'flex-col h-full')
)

const lineClasses = computed(() =>
  cn(borderStyle[props.variant], isHorizontal.value ? 'flex-1 border-t' : 'flex-1 border-l')
)

const labelClasses = computed(() => cn('text-xs shrink-0', isHorizontal.value ? 'px-3' : 'py-2'))
</script>

<template>
  <div
    :class="wrapperClasses"
    :role="!label ? 'separator' : undefined"
    :aria-orientation="orientation"
  >
    <div
      v-if="!label"
      :class="lineClasses"
      :style="{ borderColor: 'var(--color-border-subtle)' }"
    />
    <template v-else>
      <div
        v-if="labelPosition !== 'start'"
        :class="lineClasses"
        :style="{ borderColor: 'var(--color-border-subtle)' }"
      />
      <span
        :class="labelClasses"
        :style="{ color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface)' }"
        >{{ label }}</span
      >
      <div
        v-if="labelPosition !== 'end'"
        :class="lineClasses"
        :style="{ borderColor: 'var(--color-border-subtle)' }"
      />
    </template>
  </div>
</template>
