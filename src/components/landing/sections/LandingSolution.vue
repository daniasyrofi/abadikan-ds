<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const pillars = [
  {
    icon: '✦',
    title: 'Undangan yang Bikin Tamu Bilang "Cantik Banget!"',
    body: 'Bukan cuma info tanggal dan lokasi. Ini undangan yang nyeritain kisah kalian — dengan foto, musik, dan desain yang bikin Mama langsung share ke grup keluarga besar.',
    link: 'Lihat Contoh',
  },
  {
    icon: '⬡',
    title: 'RSVP Otomatis, Nggak Perlu Nanya Satu-Satu',
    body: 'Kirim undangan via WhatsApp, tamu langsung konfirmasi dari sana. Kamu tinggal buka dashboard — siapa yang datang, berapa orang, semua tercatat.',
    link: 'Lihat Fitur',
  },
  {
    icon: '◈',
    title: 'Kado Masuk, Semua Tercatat Rapi',
    body: 'Amplop digital langsung ke rekening. Wishlist biar nggak ada kado dobel. Setiap kiriman ada notifikasi — kamu tahu dari siapa, berapa, kapan.',
    link: 'Pelajari Lebih',
  },
  {
    icon: '◎',
    title: 'Check-in Tamu 3 Detik, Tanpa Antrean',
    body: 'Tamu scan QR dari undangan, nama langsung muncul di layar sambutan. Cepat, elegan, dan nggak ada nama yang kelewat.',
    link: 'Lihat Demo',
  },
]
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section solution-section"
  >
    <div class="landing-container">
      <!-- Header -->
      <div class="solution-header" data-reveal-child>
        <p class="landing-overline">Kenalan sama Abadikan</p>
        <h2 class="landing-h2 solution-h2">
          Satu Aplikasi. Semua yang Bikin Ribet Tadi, Beres.
        </h2>
        <p class="landing-subtitle solution-subtitle">
          Dari bikin undangan cantik, kirim ke ratusan tamu, sampai terima kado di hari H — semua dari satu dashboard. Nggak perlu ribuan tab.
        </p>
      </div>

      <!-- Desktop: 4-col dividers | Mobile: snap carousel -->
      <div class="solution-desktop">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          data-reveal-child
          class="solution-pillar"
        >
          <span class="pillar-icon" aria-hidden="true">{{ pillar.icon }}</span>
          <h3 class="pillar-title">{{ pillar.title }}</h3>
          <p class="pillar-body">{{ pillar.body }}</p>
          <a href="#" class="pillar-link">{{ pillar.link }} →</a>
        </div>
      </div>

      <!-- Mobile snap carousel -->
      <div class="solution-mobile snap-carousel">
        <div
          v-for="pillar in pillars"
          :key="pillar.title + '-m'"
          class="snap-card solution-snap-card"
        >
          <span class="pillar-icon" aria-hidden="true">{{ pillar.icon }}</span>
          <h3 class="pillar-title">{{ pillar.title }}</h3>
          <p class="pillar-body">{{ pillar.body }}</p>
          <a href="#" class="pillar-link">{{ pillar.link }} →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution-section {
  background: var(--color-bg-subtle);
}

.solution-header {
  text-align: center;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.solution-h2 {
  color: var(--color-text-heading);
  max-width: 24ch;
}

.solution-subtitle {
  text-align: center;
  margin-inline: auto;
}

/* ── Desktop layout ──────────────────────────────────────── */
.solution-desktop {
  display: none;
}

@media (min-width: 640px) {
  .solution-desktop {
    display: flex;
    gap: 0;
    align-items: stretch;
  }
  .solution-mobile {
    display: none !important;
  }
}

.solution-pillar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 0 2rem;
  border-left: 1px solid var(--color-border);
}

.solution-pillar:first-child {
  padding-left: 0;
  border-left: none;
}

.solution-pillar:last-child {
  padding-right: 0;
}

/* ── Mobile carousel ─────────────────────────────────────── */
.solution-mobile {
  display: flex;
}

.solution-snap-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

/* ── Shared pillar styles ────────────────────────────────── */
.pillar-icon {
  font-size: 1.25rem;
  color: var(--color-primary);
  line-height: 1;
  display: block;
}

.pillar-title {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text-heading);
  line-height: 1.3;
  margin: 0;
}

.pillar-body {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

.pillar-link {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: opacity 150ms ease;
  margin-top: auto;
  width: fit-content;
}

.pillar-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
