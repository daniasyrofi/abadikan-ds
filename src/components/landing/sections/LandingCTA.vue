<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const APP_LINK = 'https://app.abadikan.id/register'
const WA_LINK = 'https://wa.me/6281234567890?text=Halo%20Abadikan%2C%20saya%20ingin%20tanya...'

const risks = [
  'Gratis untuk dicoba',
  'Tanpa kartu kredit',
  'Selesai 15 menit',
  'Garansi 7 hari uang kembali',
]
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section cta-section"
  >
    <!-- Radial glow -->
    <div class="cta-glow" aria-hidden="true"></div>

    <div class="landing-container cta-container">
      <!-- Social proof badge -->
      <div class="cta-badge" data-reveal-child>
        327 pasangan bikin undangan minggu ini
      </div>

      <!-- Heading -->
      <h2 class="cta-heading" data-reveal-child>
        Tanggal Nikah Nggak Bisa Diundur.<br class="cta-br" />
        Undangan Bisa Selesai Hari Ini.
      </h2>

      <!-- Subtitle -->
      <p class="cta-subtitle" data-reveal-child>
        Kamu cuma butuh 15 menit dan HP untuk mulai. Gratis, tanpa kartu kredit,<br class="cta-br" />
        dan bisa langsung dikirim ke tamu hari ini juga.
      </p>

      <!-- CTA buttons -->
      <div class="cta-buttons" data-reveal-child>
        <a :href="APP_LINK" class="cta-btn-primary">
          Buat Undangan Gratis →
        </a>
        <a :href="WA_LINK" target="_blank" rel="noopener noreferrer" class="cta-btn-ghost">
          Mau tanya-tanya dulu? Chat kami →
        </a>
      </div>

      <!-- Risk reversal -->
      <div class="cta-risks" data-reveal-child>
        <template v-for="(item, i) in risks" :key="item">
          <span class="cta-risk-item">{{ item }}</span>
          <span v-if="i < risks.length - 1" class="cta-risk-sep" aria-hidden="true">·</span>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: var(--color-neutral);
  position: relative;
  overflow: hidden;
}

/* ── Background glow ─────────────────────────── */
.cta-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 50% 40%,
    oklch(0.55 0.22 18 / 0.18),
    transparent 70%
  );
  pointer-events: none;
}

/* ── Inner layout ────────────────────────────── */
.cta-container {
  position: relative;
  z-index: 1;
}

.cta-section .landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

/* ── Badge ───────────────────────────────────── */
.cta-badge {
  display: inline-flex;
  align-items: center;
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-ui);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  letter-spacing: 0.01em;
}

/* ── Heading ─────────────────────────────────── */
.cta-heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw + 0.5rem, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: #fff;
  max-width: 18ch;
  margin: 0;
}

/* ── Subtitle ────────────────────────────────── */
.cta-subtitle {
  font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
  color: rgba(255, 255, 255, 0.7);
  max-width: 44ch;
  line-height: 1.65;
  margin: 0;
}

.cta-br {
  display: none;
}
@media (min-width: 640px) {
  .cta-br { display: block; }
}

/* ── Buttons ─────────────────────────────────── */
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.cta-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: var(--color-neutral);
  font-family: var(--font-ui);
  font-size: 0.9375rem;
  font-weight: 700;
  padding: 0.875rem 2rem;
  border-radius: 999px;
  text-decoration: none;
  transition: opacity 150ms ease, transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.cta-btn-primary:hover {
  opacity: 0.92;
  transform: translateY(-2px);
}

.cta-btn-primary:active {
  transform: scale(0.96);
  transition-duration: 80ms;
  opacity: 1;
}

.cta-btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #fff;
  font-family: var(--font-ui);
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 0.875rem 2rem;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: border-color 150ms ease, background 150ms ease, transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.cta-btn-ghost:hover {
  border-color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.cta-btn-ghost:active {
  transform: scale(0.96);
  transition-duration: 80ms;
}

/* ── Risk reversal ───────────────────────────── */
.cta-risks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.375rem 0.5rem;
}

.cta-risk-item {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
}

.cta-risk-sep {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.2);
}
</style>
