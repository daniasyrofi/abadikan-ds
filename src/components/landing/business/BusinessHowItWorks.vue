<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
const stepsRef = ref<HTMLElement | null>(null)

useScrollReveal(sectionRef)
useScrollReveal(stepsRef)

const steps = [
  {
    num: '01',
    title: 'Daftar & Pilih Paket',
    body: 'Buat akun reseller, pilih paket yang sesuai budget dan ambisi kamu.',
  },
  {
    num: '02',
    title: 'Setup Brand Kamu',
    body: 'Pasang domain, upload logo, atur warna brand. Sales page otomatis jadi.',
  },
  {
    num: '03',
    title: 'Mulai Jualan',
    body: 'Sebar link sales page, promo di sosmed, atau tawarkan ke client langsung.',
  },
  {
    num: '04',
    title: 'Customer Order → Kamu Dapat Untung',
    body: 'Customer order via sales page kamu. Mereka dapat undangan, kamu dapat margin. Withdraw kapan saja.',
  },
]
</script>

<template>
  <section class="landing-section" style="background: var(--color-bg-subtle)">
    <div class="landing-container">

      <!-- Header -->
      <div ref="sectionRef" class="landing-reveal header-area">
        <p class="landing-overline">Mulai hari ini</p>
        <h2 class="landing-h2 mt-3" style="color: var(--color-text-heading); max-width: 520px">
          4 Langkah Mulai Bisnis Undangan Digital
        </h2>
      </div>

      <!-- Steps -->
      <div ref="stepsRef" class="landing-reveal steps-wrapper mt-16">
        <div class="steps-track">
          <div
            v-for="step in steps"
            :key="step.num"
            class="step-item"
            data-reveal-child
          >
            <!-- Circle + connector line -->
            <div class="step-circle-row">
              <div class="step-circle">
                <span class="step-circle-label">{{ step.num }}</span>
              </div>
              <div class="step-connector" aria-hidden="true" />
            </div>

            <!-- Decorative bg number -->
            <div class="step-bg-num" aria-hidden="true">{{ step.num }}</div>

            <!-- Content -->
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-body">{{ step.body }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 flex flex-col items-center gap-3">
        <Button variant="primary" size="lg">Daftar Jadi Reseller →</Button>
        <p class="cta-micro">Gratis untuk mulai. Upgrade kapan saja.</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.steps-track {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .steps-track {
    flex-direction: row;
    gap: 0;
    align-items: flex-start;
  }
}

.step-item {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-right: 0;
}

@media (min-width: 768px) {
  .step-item {
    padding-right: 1.5rem;
  }

  .step-item:last-child {
    padding-right: 0;
  }
}

/* Circle + connector row */
.step-circle-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.step-circle {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: 2px solid var(--color-primary);
  background: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.step-circle-label {
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-ui);
  color: var(--color-primary);
  line-height: 1;
}

.step-connector {
  flex: 1;
  height: 1px;
  background: var(--color-border);
  display: none;
}

@media (min-width: 768px) {
  .step-connector {
    display: block;
  }

  .step-item:last-child .step-connector {
    display: none;
  }
}

/* Decorative background number */
.step-bg-num {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 800;
  color: var(--color-primary);
  opacity: 0.1;
  line-height: 1;
  margin-bottom: -0.5rem;
  margin-top: -0.25rem;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.04em;
}

.step-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-heading);
  margin-top: 0.75rem;
  line-height: 1.3;
}

.step-body {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.55;
  margin-top: 0.375rem;
  font-family: var(--font-ui);
}

.cta-micro {
  font-size: 12px;
  color: var(--color-text-secondary);
  font-family: var(--font-ui);
}
</style>
