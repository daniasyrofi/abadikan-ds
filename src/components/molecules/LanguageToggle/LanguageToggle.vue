<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { cn } from '@/lib/utils'

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const { locale } = useI18n()

const locales = ['id', 'en'] as const

function setLocale(loc: string) {
  locale.value = loc
  localStorage.setItem('ds-locale', loc)
}

const sizeClasses: Record<string, string> = {
  sm: 'h-7 text-xs gap-0',
  md: 'h-8 text-sm gap-0',
  lg: 'h-9 text-sm gap-0',
}

const buttonPadding: Record<string, string> = {
  sm: 'px-2',
  md: 'px-2.5',
  lg: 'px-3',
}
</script>

<template>
  <div
    :class="cn(
      'inline-flex items-center rounded-[--radius-md]',
      'border border-[--color-border] bg-[--color-surface]',
      'overflow-hidden',
      sizeClasses[props.size],
    )"
    role="radiogroup"
    aria-label="Language"
  >
    <button
      v-for="loc in locales"
      :key="loc"
      type="button"
      role="radio"
      :aria-checked="locale === loc"
      :class="cn(
        'h-full inline-flex items-center justify-center font-medium uppercase',
        'transition-all duration-[--duration-normal] ease-[--ease-default]',
        'cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[--color-primary]',
        buttonPadding[props.size],
        locale === loc
          ? 'bg-[--color-neutral] text-[--color-text-inverse]'
          : 'text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light]',
      )"
      @click="setLocale(loc)"
    >
      {{ loc }}
    </button>
  </div>
</template>
