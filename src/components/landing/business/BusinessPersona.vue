<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/molecules/Card/Card.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const personas = [
  {
    icon: 'RiCameraLine',
    title: 'Fotografer & Videografer Wedding',
    body: 'Tambah undangan digital sebagai layanan tambahan di paket foto/video kamu. Client senang, kamu untung lebih.',
  },
  {
    icon: 'RiTeamLine',
    title: 'Wedding Organizer',
    body: 'Berikan one-stop service ke client. Undangan digital jadi value-add yang bikin paket WO kamu makin lengkap.',
  },
  {
    icon: 'RiPrinterLine',
    title: 'Percetakan & Creative Agency',
    body: 'Expand ke digital tanpa harus bangun teknologi sendiri. Gunakan platform kami, branding tetap nama kamu.',
  },
  {
    icon: 'RiBriefcaseLine',
    title: 'Freelancer & Side Hustler',
    body: 'Mau punya bisnis sendiri tapi nggak punya modal besar? Ini jawabannya. Mulai dari HP, modal nol, margin tinggi.',
  },
]
</script>

<template>
  <section class="landing-section" style="background: var(--color-bg)">
    <div class="landing-container">

      <!-- Header -->
      <div class="text-center mb-12 max-w-xl mx-auto">
        <p class="landing-overline mb-3">Pas untuk kamu</p>
        <h2 class="landing-h2" style="color: var(--color-text-heading)">
          Cocok untuk Kamu yang...
        </h2>
      </div>

      <!-- Cards grid -->
      <div
        ref="sectionRef"
        class="landing-reveal grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <Card
          v-for="p in personas"
          :key="p.title"
          data-reveal-child
          variant="outlined"
          padding="lg"
          radius="xl"
        >
          <div class="flex flex-col gap-4">
            <!-- Icon circle -->
            <div class="persona-icon-wrap">
              <Icon :name="p.icon" size="lg" color="primary" />
            </div>
            <!-- Text -->
            <div>
              <h3 class="persona-title">{{ p.title }}</h3>
              <p class="persona-body">{{ p.body }}</p>
            </div>
          </div>
        </Card>
      </div>

    </div>
  </section>
</template>

<style scoped>
.persona-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.persona-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0 0 0.5rem;
  line-height: 1.3;
}

.persona-body {
  font-family: var(--font-ui);
  font-size: 14px;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
