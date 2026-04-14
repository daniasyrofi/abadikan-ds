<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const benefits = [
  {
    icon: 'RiGlobalLine',
    title: 'Custom Domain',
    desc: 'undanganmu.com atas nama brand sendiri. Bukan subdomain Abadikan.',
  },
  {
    icon: 'RiPaletteLine',
    title: 'Custom Branding',
    desc: 'Logo, warna, dan nama brand kamu. Client nggak akan tau ini dari Abadikan.',
  },
  {
    icon: 'RiFileTextLine',
    title: 'Sales Page Siap Pakai',
    desc: 'Landing page profesional untuk jualan. Tinggal sebar link, langsung closing.',
  },
  {
    icon: 'RiMegaphoneLine',
    title: 'Marketing Kit Lengkap',
    desc: 'Template Instagram, caption WA, price list, dan materi promosi siap pakai.',
  },
  {
    icon: 'RiMoneyDollarCircleLine',
    title: 'Margin Tinggi',
    desc: 'Atur harga jual sendiri. Modal rendah, margin bisa sampai 70-80%.',
  },
  {
    icon: 'RiDashboardLine',
    title: 'Dashboard Reseller',
    desc: 'Track order, customer, komisi, dan withdrawal. Semua transparan.',
  },
  {
    icon: 'RiBookOpenLine',
    title: 'Panduan & Video Training',
    desc: 'Step-by-step cara jualan, tips marketing, dan strategi closing.',
  },
  {
    icon: 'RiGroupLine',
    title: 'Komunitas Reseller',
    desc: 'Grup WhatsApp eksklusif untuk sharing tips, pengalaman, dan saling support.',
  },
]
</script>

<template>
  <section class="landing-section" style="background: var(--color-bg-subtle)">
    <div class="landing-container">

      <!-- Header -->
      <div class="text-center mb-14 max-w-2xl mx-auto">
        <p class="landing-overline mb-3">Yang kamu dapatkan</p>
        <h2 class="landing-h2" style="color: var(--color-text-heading)">
          Bukan Cuma Jualan. Ini Bisnis Kamu Sendiri.
        </h2>
        <p class="landing-subtitle mt-4 text-center mx-auto">
          Semua tools yang kamu butuhkan untuk mulai dan scale bisnis undangan digital.
        </p>
      </div>

      <!-- Benefits grid -->
      <div
        ref="sectionRef"
        class="landing-reveal grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl mx-auto"
      >
        <div
          v-for="b in benefits"
          :key="b.title"
          data-reveal-child
          class="benefit-item"
        >
          <!-- Icon -->
          <div class="benefit-icon-wrap">
            <Icon :name="b.icon" size="md" color="primary" />
          </div>
          <!-- Text -->
          <div>
            <h3 class="benefit-title">{{ b.title }}</h3>
            <p class="benefit-desc">{{ b.desc }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.benefit-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0 0 0.375rem;
  line-height: 1.3;
}

.benefit-desc {
  font-family: var(--font-ui);
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
