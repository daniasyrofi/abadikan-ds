<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import * as RemixIcons from '@remixicon/vue'
import type { Component } from 'vue'

type AvatarSize   = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type AvatarShape  = 'circle' | 'rounded'
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

interface Props {
  src?:          string
  alt?:          string
  name?:         string
  size?:         AvatarSize
  shape?:        AvatarShape
  status?:       AvatarStatus
  fallbackIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  size:  'md',
  shape: 'circle',
})

const imgError = ref(false)

const sizePx: Record<AvatarSize, number> = {
  xs:   24,
  sm:   32,
  md:   40,
  lg:   48,
  xl:   56,
  '2xl': 72,
}

const sizeClass: Record<AvatarSize, string> = {
  xs:   'size-6',
  sm:   'size-8',
  md:   'size-10',
  lg:   'size-12',
  xl:   'size-14',
  '2xl': 'size-[72px]',
}

const textSizeClass: Record<AvatarSize, string> = {
  xs:   'text-[10px] font-semibold',
  sm:   'text-xs font-semibold',
  md:   'text-sm font-semibold',
  lg:   'text-base font-semibold',
  xl:   'text-lg font-semibold',
  '2xl': 'text-2xl font-semibold',
}

const iconSizePx: Record<AvatarSize, number> = {
  xs:   12,
  sm:   16,
  md:   20,
  lg:   24,
  xl:   28,
  '2xl': 36,
}

const statusSizeClass: Record<AvatarSize, string> = {
  xs:   'size-1.5 ring-1',
  sm:   'size-2 ring-1',
  md:   'size-2.5 ring-[1.5px]',
  lg:   'size-3 ring-2',
  xl:   'size-3.5 ring-2',
  '2xl': 'size-4 ring-2',
}

const statusColorClass: Record<AvatarStatus, string> = {
  online:  'bg-[--color-success]',
  offline: 'bg-[--color-text-tertiary]',
  busy:    'bg-[--color-danger]',
  away:    'bg-[--color-warning]',
}

const shapeClass: Record<AvatarShape, string> = {
  circle:  'rounded-full',
  rounded: 'rounded-[--radius-lg]',
}

// Derive initials from name
const initials = computed(() => {
  if (!props.name) return ''
  const parts = props.name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})

// Show image when src present and not errored
const showImage = computed(() => !!props.src && !imgError.value)
// Show initials when no image, has name
const showInitials = computed(() => !showImage.value && !!initials.value)
// Show fallback icon when no image, no initials
const showIcon = computed(() => !showImage.value && !showInitials.value)

const fallbackIconComponent = computed<Component | null>(() => {
  const iconName = props.fallbackIcon ?? 'RiUser3Line'
  const icons = RemixIcons as Record<string, Component>
  return icons[iconName] ?? icons['RiUser3Line'] ?? null
})

const containerClass = computed(() =>
  cn(
    'relative inline-flex items-center justify-center shrink-0 overflow-hidden',
    'bg-[--color-neutral-light] text-[--color-text-secondary]',
    'select-none',
    sizeClass[props.size],
    shapeClass[props.shape],
  )
)
</script>

<template>
  <span :class="containerClass">
    <!-- Image -->
    <img
      v-if="showImage"
      :src="src"
      :alt="alt ?? name ?? 'Avatar'"
      class="size-full object-cover"
      @error="imgError = true"
    />

    <!-- Initials fallback -->
    <span
      v-else-if="showInitials"
      :class="textSizeClass[size]"
      aria-hidden="true"
    >
      {{ initials }}
    </span>

    <!-- Icon fallback -->
    <component
      :is="fallbackIconComponent"
      v-else-if="showIcon && fallbackIconComponent"
      :size="iconSizePx[size]"
      aria-hidden="true"
    />

    <!-- Status dot -->
    <span
      v-if="status"
      :class="cn(
        'absolute bottom-0 right-0 rounded-full ring-[--color-surface]',
        statusSizeClass[size],
        statusColorClass[status],
      )"
      :aria-label="status"
    />
  </span>
</template>
