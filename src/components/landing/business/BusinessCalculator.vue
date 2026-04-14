<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import Slider from '@/components/molecules/Slider/Slider.vue'

const qty = ref(10)
const price = ref(150000)

const income = computed(() => qty.value * price.value)

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

const equivalencies = computed(() => {
  const m = income.value
  return [
    {
      emoji: '💵',
      text:
        m >= 3000000
          ? `${Math.floor(m / 3000000)}x cicilan motor per bulan`
          : 'Hampir setara cicilan motor',
    },
    {
      emoji: '✈️',
      text:
        m >= 1500000
          ? `${Math.floor(m / 1500000)}x tiket pesawat Jakarta-Bali`
          : 'Hampir setara tiket Jakarta-Bali',
    },
    {
      emoji: '🍽️',
      text: `${Math.floor(m / 30000)}x makan siang`,
    },
  ]
})
</script>

<template>
  <section class="landing-section" style="background: var(--color-bg)">
    <div class="landing-container">

      <!-- Header -->
      <div class="text-center mb-10 max-w-xl mx-auto">
        <p class="landing-overline mb-3">Simulasi penghasilan</p>
        <h2 class="landing-h2" style="color: var(--color-text-heading)">
          Hitung Sendiri Berapa Potensi Penghasilanmu
        </h2>
      </div>

      <!-- Calculator card -->
      <div class="calc-card">

        <!-- Sliders -->
        <div class="calc-sliders">
          <Slider
            v-model="qty"
            label="Undangan per bulan"
            :min="1"
            :max="50"
            :step="1"
            size="md"
          />
          <Slider
            v-model="price"
            label="Harga jual rata-rata (Rp)"
            :min="50000"
            :max="300000"
            :step="10000"
            size="md"
          />
        </div>

        <!-- Divider -->
        <div class="calc-divider" aria-hidden="true"></div>

        <!-- Result -->
        <div class="calc-result">
          <p class="calc-result-label">Potensi penghasilan kamu:</p>
          <div class="calc-result-value">
            {{ formatRp(income) }}
          </div>
          <p class="calc-result-note">
            Ini baru dari {{ qty }} undangan. Bayangkan kalau kamu bisa jual 30 per bulan.
          </p>
        </div>

        <!-- Equivalencies -->
        <div class="calc-equivs">
          <div
            v-for="eq in equivalencies"
            :key="eq.emoji"
            class="calc-equiv-item"
          >
            <span class="calc-equiv-emoji">{{ eq.emoji }}</span>
            <span class="calc-equiv-text">{{ eq.text }}</span>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-6">
          <Button variant="primary" size="lg">Daftar Jadi Reseller →</Button>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.calc-card {
  max-width: 680px;
  margin: 0 auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.calc-sliders {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.calc-divider {
  height: 1px;
  background: var(--color-border);
  margin-bottom: 2rem;
}

.calc-result {
  text-align: center;
  margin-bottom: 1.75rem;
}

.calc-result-label {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.5rem;
}

.calc-result-value {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 0.75rem;
  transition: color 0.2s;
}

.calc-result-note {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0;
}

.calc-equivs {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  background: var(--color-bg-subtle);
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  margin-bottom: 0;
}

.calc-equiv-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.calc-equiv-emoji {
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
}

.calc-equiv-text {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 500;
}

@media (max-width: 600px) {
  .calc-card {
    padding: 1.5rem;
  }

  .calc-result-value {
    font-size: 2.5rem;
  }
}
</style>
