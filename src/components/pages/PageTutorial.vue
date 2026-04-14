<script setup lang="ts">
import '@/styles/landing.css'
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import Button from '@/components/atoms/Button/Button.vue'
import SharedNavbar from '@/components/landing/shared/SharedNavbar.vue'
import SharedFloatingWA from '@/components/landing/shared/SharedFloatingWA.vue'
import LandingFooter from '@/components/landing/shared/LandingFooter.vue'

const heroRef = ref<HTMLElement | null>(null)
const featuredRef = ref<HTMLElement | null>(null)
const stepsRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

useScrollReveal(heroRef)
useScrollReveal(featuredRef)
useScrollReveal(stepsRef)
useScrollReveal(cardsRef)
useScrollReveal(ctaRef)

const steps = [
  {
    num: 1,
    title: 'Daftar Akun',
    desc: 'Buat akun gratis dalam hitungan detik. Tidak perlu kartu kredit.',
    icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm1 14.93V17a1 1 0 0 1-2 0v-.07A8.003 8.003 0 0 1 4.07 9H5a1 1 0 0 1 0 2 6.003 6.003 0 0 0 6 6v-.07Zm0-9.86V7a1 1 0 0 0-2 0v.07A6.003 6.003 0 0 0 6 13H5a1 1 0 0 0 0 2 8.003 8.003 0 0 1 6.93-7.93Z',
  },
  {
    num: 2,
    title: 'Pilih Tema',
    desc: 'Jelajahi 80+ tema cantik. Pilih sesuai konsep pernikahan kamu.',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z',
  },
  {
    num: 3,
    title: 'Isi Konten',
    desc: 'Masukkan detail acara, foto, dan kata-kata untuk pasangan dan tamu.',
    icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z',
  },
  {
    num: 4,
    title: 'Personalisasi',
    desc: 'Atur musik, warna, dan tampilan sesuai selera kalian berdua.',
    icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Zm-1 14H9V7h2v10Zm4 0h-2V7h2v10Z',
  },
  {
    num: 5,
    title: 'Kirim ke Tamu',
    desc: 'Import daftar tamu, personalisasi nama, dan kirim via WhatsApp dalam satu klik.',
    icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-2 12H6v-2h12v2Zm0-3H6V9h12v2Zm0-3H6V6h12v2Z',
  },
]

const subTutorials = [
  {
    id: 1,
    iconBg: '#fce7f3',
    iconColor: '#db2777',
    iconPath: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2ZM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5Z',
    title: 'Cara Upload Foto & Video Galeri',
    desc: 'Panduan lengkap upload foto prewedding dan video ke halaman undangan.',
  },
  {
    id: 2,
    iconBg: '#dbeafe',
    iconColor: '#2563eb',
    iconPath: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-2 12H6v-2h12v2Zm0-3H6V9h12v2Zm0-3H6V6h12v2Z',
    title: 'Cara Kirim via WhatsApp Broadcast',
    desc: 'Import tamu dari Excel, personalisasi nama, kirim massal dalam satu klik.',
  },
  {
    id: 3,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    iconPath: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    title: 'Cara Setup RSVP & Konfirmasi Hadir',
    desc: 'Aktifkan RSVP, custom form, dan track kehadiran tamu real-time.',
  },
  {
    id: 4,
    iconBg: '#fef9c3',
    iconColor: '#d97706',
    iconPath: 'M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1M12 12H3m9 0 3-3m-3 3 3 3',
    title: 'Cara Setup Kado & Amplop Digital',
    desc: 'Aktifkan amplop cashless dan buat wishlist kado untuk tamu.',
  },
  {
    id: 5,
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    iconPath: 'M3 4h18v2H3V4Zm0 7h12v2H3v-2Zm0 7h18v2H3v-2ZM17 10l5 4-5 4V10Z',
    title: 'Cara Pakai QR Check-in di Hari H',
    desc: 'Setup QR code, latih petugas scan, dan tampilkan layar penyambut.',
  },
]
</script>

<template>
  <div>
    <SharedNavbar />

    <!-- ── Mini Hero ──────────────────────────────────────────────────────────── -->
  <section ref="heroRef" class="landing-page-hero landing-reveal">
    <div class="landing-container--narrow" style="text-align: center;">
      <p class="landing-overline" style="margin-bottom: 0.75rem;">Panduan</p>
      <h1 class="landing-h2" style="color: var(--color-text-heading); margin-bottom: 1rem;">
        Panduan & Tutorial
      </h1>
      <p class="landing-subtitle" style="margin-inline: auto;">
        Dari nol sampai undangan cantik — semua ada di sini.
      </p>
    </div>
  </section>

  <!-- ── Featured Video ────────────────────────────────────────────────────── -->
  <section ref="featuredRef" class="landing-section landing-reveal" style="background: var(--color-bg);">
    <div class="landing-container--narrow">
      <p class="landing-overline" style="text-align: center; margin-bottom: 0.75rem;">Tutorial Utama</p>
      <h2 class="landing-h2" style="color: var(--color-text-heading); text-align: center; margin-bottom: 2rem;">
        Cara Buat Undangan Digital di Abadikan (5 Menit)
      </h2>

      <!-- Video placeholder -->
      <div class="video-wrap">
        <div class="video-player" aria-label="Video tutorial utama">
          <!-- Play button -->
          <button type="button" class="play-btn" aria-label="Putar video">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5Z"/>
            </svg>
          </button>
        </div>
      </div>

      <p class="video-caption">
        Video lengkap: dari daftar akun, pilih tema, isi konten, sampai kirim ke tamu.
      </p>
    </div>
  </section>

  <!-- ── Step-by-step Quick Guide ──────────────────────────────────────────── -->
  <section ref="stepsRef" class="landing-section landing-reveal" style="background: var(--color-bg-subtle);">
    <div class="landing-container--narrow">
      <h2 class="landing-h2" style="color: var(--color-text-heading); text-align: center; margin-bottom: 2.5rem;">
        Panduan Singkat
      </h2>

      <div class="steps-list landing-reveal">
        <div
          v-for="step in steps"
          :key="step.num"
          class="step-item"
          data-reveal-child
        >
          <!-- Step number & connector -->
          <div class="step-left">
            <div class="step-num">{{ step.num }}</div>
            <div v-if="step.num < 5" class="step-connector" aria-hidden="true" />
          </div>
          <!-- Content -->
          <div class="step-content">
            <div class="step-icon-wrap" aria-hidden="true">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path :d="step.icon" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p class="step-title">{{ step.title }}</p>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Sub-tutorial Cards ─────────────────────────────────────────────────── -->
  <section ref="cardsRef" class="landing-section landing-reveal" style="background: var(--color-bg);">
    <div class="landing-container">
      <h2 class="landing-h2" style="color: var(--color-text-heading); text-align: center; margin-bottom: 2.5rem;">
        Tutorial Lainnya
      </h2>

      <div class="tut-grid landing-reveal">
        <div
          v-for="tut in subTutorials"
          :key="tut.id"
          class="tut-card"
          data-reveal-child
        >
          <div class="tut-icon-wrap" :style="{ background: tut.iconBg }">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="tut.iconPath" :fill="tut.iconColor"/>
            </svg>
          </div>
          <div class="tut-body">
            <p class="tut-title">{{ tut.title }}</p>
            <p class="tut-desc">{{ tut.desc }}</p>
          </div>
          <a href="#" class="tut-link">Tonton →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Bottom CTA ─────────────────────────────────────────────────────────── -->
  <section
    ref="ctaRef"
    class="landing-reveal"
    style="padding-block: clamp(48px, 8vh, 80px); background: var(--color-bg-subtle); text-align: center;"
  >
    <div class="landing-container--narrow">
      <p class="cta-heading">Sudah siap?</p>
      <Button variant="primary" size="lg" as="a" href="/daftar">
        Buat Undangan Sekarang →
      </Button>
    </div>
  </section>

    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>

<style scoped>
/* ── Video ── */
.video-wrap {
  max-width: 800px;
  margin-inline: auto;
  margin-bottom: 1rem;
}

.video-player {
  aspect-ratio: 16 / 9;
  background: oklch(0.15 0 0);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md), 0 20px 60px -15px oklch(0.1 0 0 / 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.play-btn {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: white;
  color: oklch(0.15 0 0);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 24px oklch(0 0 0 / 0.35);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.play-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 32px oklch(0 0 0 / 0.45);
}

.video-caption {
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ── Steps ── */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.step-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 1.25rem;
  align-items: start;
}

.step-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
}

.step-connector {
  width: 2px;
  flex: 1;
  min-height: 2.5rem;
  background: color-mix(in oklch, var(--color-primary) 25%, var(--color-border));
  margin-top: 4px;
}

.step-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 2rem;
}

.step-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background: color-mix(in oklch, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0 0 0.25rem;
}

.step-desc {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin: 0;
}

/* ── Tutorial cards ── */
.tut-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .tut-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tut-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.tut-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.tut-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tut-body {
  flex: 1;
}

.tut-title {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0 0 0.4rem;
  line-height: 1.3;
}

.tut-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
}

.tut-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  align-self: flex-start;
  transition: opacity 0.15s;
}

.tut-link:hover {
  opacity: 0.75;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ── CTA ── */
.cta-heading {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw + 0.5rem, 2rem);
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0 0 1.25rem;
}
</style>
