<script setup lang="ts">
import '@/styles/landing.css'
import { useLenis } from '@/composables/useLenis'
import LandingHero from './sections/LandingHero.vue'
import LandingProblem from './sections/LandingProblem.vue'
import LandingSolution from './sections/LandingSolution.vue'
import LandingHowItWorks from './sections/LandingHowItWorks.vue'
import LandingGallery from './sections/LandingGallery.vue'
import LandingFeatureDeep from './sections/LandingFeatureDeep.vue'
import LandingTestimonials from './sections/LandingTestimonials.vue'
import LandingPricing from './sections/LandingPricing.vue'
import LandingComparison from './sections/LandingComparison.vue'
import LandingFAQ from './sections/LandingFAQ.vue'
import LandingCTA from './sections/LandingCTA.vue'
import LandingFooter from './shared/LandingFooter.vue'
import SharedFloatingWA from './shared/SharedFloatingWA.vue'

defineEmits<{ navigate: [page: string] }>()
useLenis()
</script>

<template>
  <div>
    <LandingHero />
    <hr class="landing-divider" />
    <LandingProblem />
    <hr class="landing-divider" />
    <LandingSolution />
    <hr class="landing-divider" />
    <LandingHowItWorks />
    <hr class="landing-divider" />
    <LandingGallery />
    <hr class="landing-divider" />
    <LandingFeatureDeep />
    <hr class="landing-divider" />
    <LandingTestimonials />
    <hr class="landing-divider" />
    <LandingPricing />
    <hr class="landing-divider" />
    <LandingComparison />
    <hr class="landing-divider" />
    <LandingFAQ />
    <hr class="landing-divider" />
    <LandingCTA />
    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>
