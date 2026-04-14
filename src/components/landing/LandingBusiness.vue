<script setup lang="ts">
import '@/styles/landing.css'
import { inject } from 'vue'
import SharedNavbar from './shared/SharedNavbar.vue'
import BusinessHero from './business/BusinessHero.vue'

const navigateTo = inject<(page: string) => void>('navigate', () => {})
import BusinessPersona from './business/BusinessPersona.vue'
import BusinessBenefits from './business/BusinessBenefits.vue'
import BusinessCalculator from './business/BusinessCalculator.vue'
import BusinessHowItWorks from './business/BusinessHowItWorks.vue'
import BusinessPricing from './business/BusinessPricing.vue'
import BusinessTestimonials from './business/BusinessTestimonials.vue'
import BusinessFAQ from './business/BusinessFAQ.vue'
import BusinessCTA from './business/BusinessCTA.vue'
import LandingFooter from './shared/LandingFooter.vue'
import SharedFloatingWA from './shared/SharedFloatingWA.vue'

defineEmits<{ navigate: [page: string] }>()
</script>

<template>
  <div>
    <SharedNavbar mode="business" @navigate="navigateTo" />
    <BusinessHero />
    <BusinessPersona />
    <BusinessBenefits />
    <BusinessCalculator />
    <BusinessHowItWorks />
    <BusinessPricing />
    <BusinessTestimonials />
    <BusinessFAQ />
    <BusinessCTA />
    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>
