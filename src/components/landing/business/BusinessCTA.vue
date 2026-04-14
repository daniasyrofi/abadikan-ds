<script setup lang="ts">
import Button from '@/components/atoms/Button/Button.vue'
import ProgressBar from '@/components/molecules/ProgressBar/ProgressBar.vue'

const WA_LINK = 'https://wa.me/6281234567890?text=Halo%2C%20saya%20mau%20tanya%20tentang%20program%20reseller%20Abadikan'

const microItems = [
  'Tanpa deposit',
  'Tanpa kontrak',
  'Tanpa minimum followers',
  'Withdraw kapan saja',
]
</script>

<template>
  <section class="biz-cta-root">
    <!-- Background glow -->
    <div class="biz-cta-glow" aria-hidden="true"></div>

    <div class="biz-cta-inner">

      <!-- Progress block -->
      <div class="biz-cta-progress-wrap">
        <div class="biz-cta-progress-label">
          <span>Slot tersedia bulan ini</span>
          <span class="biz-cta-progress-count">37/50 slot terisi</span>
        </div>
        <ProgressBar :value="74" variant="primary" />
      </div>

      <!-- H2 -->
      <h2 class="biz-cta-h2">
        Slot Reseller Bulan Ini Terbatas.
      </h2>

      <!-- Sub -->
      <p class="biz-cta-sub">
        37 dari 50 slot sudah terisi. Jangan sampai kamu kebagian gelombang harga naik.
      </p>

      <!-- CTAs -->
      <div class="biz-cta-buttons">
        <Button
          variant="default"
          size="lg"
          style="--btn-bg: var(--color-text-inverse); --btn-text: var(--color-neutral); --btn-border: var(--color-text-inverse); --btn-hover-bg: rgba(255,255,255,0.88); --btn-hover-border: rgba(255,255,255,0.88); font-weight: 700;"
        >
          Daftar Jadi Reseller Sekarang →
        </Button>
        <a :href="WA_LINK" target="_blank" rel="noopener noreferrer" class="biz-cta-wa-link">
          <Button
            variant="ghost"
            size="lg"
            style="--btn-bg: transparent; --btn-text: var(--color-text-inverse); --btn-border: rgba(255,255,255,0.35); --btn-hover-bg: rgba(255,255,255,0.08); --btn-hover-border: rgba(255,255,255,0.6); --btn-hover-text: var(--color-text-inverse);"
          >
            Masih ragu? Chat tim kami dulu → WhatsApp
          </Button>
        </a>
      </div>

      <!-- Risk reversal -->
      <div class="biz-cta-risk">
        <span class="biz-cta-risk-icon">🛡️</span>
        <p class="biz-cta-risk-text">
          Garansi 30 hari uang kembali. Kalau dalam 30 hari kamu merasa ini bukan untuk kamu, kami refund penuh.
        </p>
      </div>

      <!-- Micro-copy trust items -->
      <div class="biz-cta-micro">
        <span
          v-for="item in microItems"
          :key="item"
          class="biz-cta-micro-item"
        >
          <span class="biz-cta-check">✅</span>
          {{ item }}
        </span>
      </div>

    </div>
  </section>
</template>

<style scoped>
.biz-cta-root {
  position: relative;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.55 0.22 18 / 0.3), transparent),
    var(--color-neutral);
  padding: 6rem 1.5rem;
  overflow: hidden;
  text-align: center;
}

.biz-cta-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 50% 40% at 50% 100%, oklch(0.55 0.22 18 / 0.15), transparent);
  z-index: 0;
}

.biz-cta-inner {
  position: relative;
  z-index: 1;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* Progress */
.biz-cta-progress-wrap {
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
}

.biz-cta-progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.biz-cta-progress-label span {
  font-size: 12px;
  font-family: var(--font-ui);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.biz-cta-progress-count {
  font-weight: 700 !important;
  color: var(--color-primary) !important;
}

/* Heading */
.biz-cta-h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw + 0.5rem, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--color-text-inverse);
  margin: 0 0 1rem;
}

.biz-cta-sub {
  font-family: var(--font-ui);
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
  max-width: 46ch;
  margin: 0 0 2rem;
}

/* Buttons */
.biz-cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.biz-cta-wa-link {
  text-decoration: none;
}

/* Risk reversal */
.biz-cta-risk {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  padding: 0.875rem 1.25rem;
  margin-bottom: 1.5rem;
  max-width: 440px;
  text-align: left;
}

.biz-cta-risk-icon {
  font-size: 1.25rem;
  line-height: 1.4;
  flex-shrink: 0;
}

.biz-cta-risk-text {
  font-family: var(--font-ui);
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Micro-copy */
.biz-cta-micro {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  justify-content: center;
}

.biz-cta-micro-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 12px;
  font-family: var(--font-ui);
  color: rgba(255, 255, 255, 0.45);
  font-weight: 500;
}

.biz-cta-check {
  font-size: 12px;
}

@media (max-width: 500px) {
  .biz-cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .biz-cta-buttons :deep(button),
  .biz-cta-wa-link {
    width: 100%;
  }
}
</style>
