<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import LandingConsumer from './landing/LandingConsumer.vue'
import LandingBusiness from './landing/LandingBusiness.vue'
import PageTemplate from './pages/PageTemplate.vue'
import PageHarga from './pages/PageHarga.vue'
import PagePortofolio from './pages/PagePortofolio.vue'
import PageBlog from './pages/PageBlog.vue'
import PageFAQ from './pages/PageFAQ.vue'
import PageTentangKami from './pages/PageTentangKami.vue'
import PageTutorial from './pages/PageTutorial.vue'
import PageKontak from './pages/PageKontak.vue'
import PageKoda from './pages/PageKoda.vue'
const currentPage = ref('consumer')

const navigate = (page: string) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

provide('navigate', navigate)
provide('currentPage', currentPage)

const pageComponent = computed(() => {
  switch (currentPage.value) {
    case 'consumer': return LandingConsumer
    case 'business': return LandingBusiness
    case 'template': return PageTemplate
    case 'harga': return PageHarga
    case 'portofolio': return PagePortofolio
    case 'blog': return PageBlog
    case 'faq': return PageFAQ
    case 'tentang-kami': return PageTentangKami
    case 'tutorial': return PageTutorial
    case 'kontak': return PageKontak
    case 'koda': return PageKoda
    default: return LandingConsumer
  }
})
</script>

<template>
  <Transition name="page" mode="out-in">
    <component :is="pageComponent" :key="currentPage" @navigate="navigate" />
  </Transition>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
