<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const pains = [
  {
    num: '01',
    title: 'Cetak undangan Rp 3 jutaan — terus dibuang',
    body: '500 lembar undangan cetak, habis jutaan. Kirim satu-satu, capek. Seminggu setelah acara? Hampir semuanya udah di tong sampah. Sayang banget.',
  },
  {
    num: '02',
    title: '"Kak, lokasinya di mana ya?" x 50 tamu',
    body: 'Di hari yang seharusnya paling bahagia, kamu malah balesin chat satu-satu: arah jalan, parkir, gedung mana. Padahal kamu harusnya lagi dandan, bukan jadi Google Maps.',
  },
  {
    num: '03',
    title: 'Catering 300, yang datang 200. Atau sebaliknya.',
    body: 'Nggak ada yang konfirmasi hadir atau nggak. Kamu nebak-nebak jumlah catering. Lebih — rugi jutaan. Kurang — malu sama tamu. Dua-duanya bikin stres.',
  },
  {
    num: '04',
    title: 'Amplop kado hilang, nggak tau dari siapa',
    body: 'Puluhan amplop dicampur di satu kotak. Nggak ada nama, nggak ada catatan. Hadiah dari orang tersayang jadi nggak bisa kamu ucapkan terima kasih-nya.',
  },
]
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section problem-section"
  >
    <div class="landing-container">
      <!-- Header -->
      <div class="problem-header" data-reveal-child>
        <p class="landing-overline">Pernah ngalamin ini?</p>
        <h2 class="landing-h2 problem-h2">
          Nikah Aja Udah Ribet.<br />
          Ngurus Undangan Jangan Bikin Tambah Pusing.
        </h2>
      </div>

      <!-- 2×2 Pain cards -->
      <div class="pain-grid">
        <article
          v-for="pain in pains"
          :key="pain.num"
          data-reveal-child
          class="pain-card"
        >
          <span class="pain-num">{{ pain.num }}</span>
          <h3 class="pain-title">{{ pain.title }}</h3>
          <p class="pain-body">{{ pain.body }}</p>
        </article>
      </div>

      <!-- Transition copy -->
      <div class="problem-transition" data-reveal-child>
        <div class="transition-line" aria-hidden="true"></div>
        <p class="transition-copy">
          Coba bayangin... kalau semua itu bisa beres dari HP, dalam 15 menit?
          <span aria-hidden="true"> →</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-section {
  background: var(--color-bg);
}

.problem-header {
  text-align: center;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.problem-h2 {
  color: var(--color-text-heading);
  max-width: 22ch;
  text-align: center;
}

/* ── Cards ─────────────────────────────────────────────────── */
.pain-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .pain-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

.pain-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  transition:
    transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 240ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 240ms ease;
}

.pain-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-strong);
}

/* Active tap feedback — mobile */
.pain-card:active {
  transform: scale(0.985);
  transition-duration: 80ms;
}

.pain-num {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  opacity: 0.5;
}

.pain-title {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.125rem);
  font-weight: 700;
  color: var(--color-text-heading);
  line-height: 1.3;
  margin: 0;
}

.pain-body {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0;
}

/* ── Transition copy ─────────────────────────────────────── */
.problem-transition {
  margin-top: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.transition-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, var(--color-border));
}

.transition-copy {
  font-size: 1rem;
  font-style: italic;
  color: var(--color-text-secondary);
  max-width: 40ch;
  line-height: 1.65;
}
</style>
