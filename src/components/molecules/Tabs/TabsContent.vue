<script setup lang="ts">
import { inject, computed } from 'vue'
import { TABS_KEY, type TabsContext } from './Tabs.vue'

interface Props {
  value: string
}

const props = defineProps<Props>()

const ctx = inject<TabsContext>(TABS_KEY)!

const isActive = computed(() => ctx.activeTab.value === props.value)
</script>

<template>
  <div
    v-show="isActive"
    :id="`tabpanel-${value}`"
    role="tabpanel"
    :aria-labelledby="`tab-${value}`"
    :tabindex="0"
  >
    <slot />
  </div>
</template>
