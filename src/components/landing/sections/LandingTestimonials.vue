<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

// ── Stats counter ─────────────────────────────────────────────
const stats = [
  { target: 12000, suffix: '+', label: 'Pasangan Bahagia' },
  { target: 50000, suffix: '+', label: 'Tamu Diundang' },
  { target: 15000, suffix: '+', label: 'Ucapan & Doa' },
]

const displays = ref(stats.map(() => 0))
const hasAnimated = ref(false)
const statsRef = ref<HTMLElement | null>(null)

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animateCounters() {
  if (hasAnimated.value) return
  hasAnimated.value = true
  stats.forEach((stat, i) => {
    setTimeout(() => {
      const start = performance.now()
      function frame(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / 1400, 1)
        displays.value[i] = Math.floor(easeOutCubic(progress) * stat.target)
        if (progress < 1) requestAnimationFrame(frame)
        else displays.value[i] = stat.target
      }
      requestAnimationFrame(frame)
    }, i * 150)
  })
}

function fmt(val: number) {
  return val.toLocaleString('id-ID')
}

let counterObserver: IntersectionObserver | null = null

onMounted(() => {
  counterObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCounters()
        counterObserver?.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (statsRef.value) counterObserver.observe(statsRef.value)
})

onUnmounted(() => {
  counterObserver?.disconnect()
})

// ── Scroll reveal ──────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

// ── Testimonial data ───────────────────────────────────────────
const testimonials = [
  {
    quote: 'Awalnya cuma iseng coba yang gratisan. Pas lihat hasilnya, langsung upgrade malem itu juga. Yang paling seneng justru Mama — langsung share ke semua grup keluarga. Katanya: "Ini undangan paling bagus yang Mama pernah lihat."',
    name: 'Rina & Dimas',
    date: 'Menikah Desember 2025',
    initials: 'RD',
  },
  {
    quote: 'Kami LDR — aku di Jakarta, Fahri di Surabaya. Koordinasi undangan 2 kota biasanya ribet banget. Tapi di Abadikan, tinggal import kontak, kirim sekaligus ke 300+ tamu. RSVP masuk otomatis, nggak perlu follow-up satu-satu.',
    name: 'Ayu & Fahri',
    date: 'Menikah Januari 2026',
    initials: 'AF',
  },
  {
    quote: 'Dulu habis nikahan, amplop kado cuma dikumpulin di satu kotak. Nggak tau dari siapa, berapa. Sekarang pakai amplop digital, semua tercatat: nama, jumlah, bank. Jadi bisa ngucapin terima kasih ke setiap orang.',
    name: 'Sarah & Budi',
    date: 'Menikah Maret 2026',
    initials: 'SB',
  },
]
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section testi-section"
  >
    <div class="landing-container">
      <!-- Header -->
      <div class="testi-header" data-reveal-child>
        <p class="landing-overline">Kata mereka yang udah pakai</p>
        <h2 class="landing-h2 testi-h2">
          12.000+ Pasangan Udah Bikin Undangan di Abadikan
        </h2>
      </div>

      <!-- Stats -->
      <div ref="statsRef" class="testi-stats" data-reveal-child>
        <div v-for="(stat, i) in stats" :key="stat.label" class="stat-item">
          <div class="stat-number">
            {{ fmt(displays[i]) }}<span class="stat-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Desktop: 3-col grid -->
      <div class="testi-grid">
        <article
          v-for="t in testimonials"
          :key="t.name"
          class="testi-card"
          data-reveal-child
        >
          <div class="testi-quote-mark" aria-hidden="true">"</div>
          <p class="testi-quote">{{ t.quote }}</p>
          <div class="testi-stars" aria-label="5 bintang">
            <span v-for="n in 5" :key="n" class="testi-star">★</span>
          </div>
          <div class="testi-author">
            <div class="testi-avatar">{{ t.initials }}</div>
            <div>
              <div class="testi-name">{{ t.name }}</div>
              <div class="testi-date">{{ t.date }}</div>
            </div>
          </div>
        </article>
      </div>

      <!-- Mobile: snap carousel -->
      <div class="testi-mobile snap-carousel">
        <article
          v-for="t in testimonials"
          :key="t.name + '-m'"
          class="snap-card testi-snap-card"
        >
          <div class="testi-quote-mark" aria-hidden="true">"</div>
          <p class="testi-quote">{{ t.quote }}</p>
          <div class="testi-stars" aria-label="5 bintang">
            <span v-for="n in 5" :key="n" class="testi-star">★</span>
          </div>
          <div class="testi-author">
            <div class="testi-avatar">{{ t.initials }}</div>
            <div>
              <div class="testi-name">{{ t.name }}</div>
              <div class="testi-date">{{ t.date }}</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testi-section {
  background: var(--color-bg-subtle);
}

/* ── Header ─────────────────────────────────── */
.testi-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.testi-h2 {
  color: var(--color-text-heading);
}

/* ── Stats ──────────────────────────────────── */
.testi-stats {
  display: flex;
  justify-content: center;
  gap: clamp(2rem, 6vw, 4rem);
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
}

.stat-number {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw + 0.5rem, 3rem);
  font-weight: 800;
  line-height: 1;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.stat-suffix {
  opacity: 0.5;
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

/* ── Desktop grid ───────────────────────────── */
.testi-grid {
  display: none;
}

@media (min-width: 768px) {
  .testi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .testi-mobile {
    display: none !important;
  }
}

/* ── Mobile carousel ────────────────────────── */
.testi-mobile {
  display: flex;
}

.testi-snap-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
}

/* ── Card (desktop) ─────────────────────────── */
.testi-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition:
    transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 240ms ease;
}

.testi-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

/* ── Shared card content ────────────────────── */
.testi-quote-mark {
  font-family: var(--font-display);
  font-size: 3.5rem;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.2;
  margin-bottom: -0.75rem;
  user-select: none;
}

.testi-quote {
  font-size: 0.9375rem;
  color: var(--color-text-primary);
  line-height: 1.7;
  font-style: italic;
  flex: 1;
  margin: 0;
}

.testi-stars {
  display: flex;
  gap: 2px;
}

.testi-star {
  font-size: 0.9375rem;
  color: #f59e0b;
  line-height: 1;
}

.testi-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.875rem;
  border-top: 1px solid var(--color-border);
}

.testi-avatar {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 700;
  font-family: var(--font-ui);
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.05em;
}

.testi-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-heading);
  line-height: 1.3;
}

.testi-date {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-top: 2px;
}
</style>
