<script setup lang="ts">
import '@/styles/landing.css'
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import SharedNavbar from '@/components/landing/shared/SharedNavbar.vue'
import SharedFloatingWA from '@/components/landing/shared/SharedFloatingWA.vue'
import LandingFooter from '@/components/landing/shared/LandingFooter.vue'

// ── Scroll reveal refs ────────────────────────────────────────────────────────
const heroRef = ref<HTMLElement | null>(null)
const storyRef = ref<HTMLElement | null>(null)
const visiRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const teamRef = ref<HTMLElement | null>(null)
const trustRef = ref<HTMLElement | null>(null)

useScrollReveal(heroRef)
useScrollReveal(storyRef)
useScrollReveal(visiRef)
useScrollReveal(statsRef)
useScrollReveal(teamRef)
useScrollReveal(trustRef)

// ── Stats counter ─────────────────────────────────────────────────────────────
const statsData = [
  { target: 12000, suffix: '+', label: 'Pasangan' },
  { target: 50000, suffix: '+', label: 'Tamu Diundang' },
  { target: 15000, suffix: '+', label: 'Ucapan & Doa' },
  { target: 3, suffix: '+', label: 'Tahun Beroperasi' },
]

const displays = ref(statsData.map(() => 0))
const hasAnimated = ref(false)

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animateAll() {
  if (hasAnimated.value) return
  hasAnimated.value = true
  statsData.forEach((stat, i) => {
    setTimeout(() => {
      const start = performance.now()
      function frame(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / 1800, 1)
        displays.value[i] = Math.floor(easeOutCubic(progress) * stat.target)
        if (progress < 1) requestAnimationFrame(frame)
        else displays.value[i] = stat.target
      }
      requestAnimationFrame(frame)
    }, i * 120)
  })
}

function fmt(val: number) {
  return val.toLocaleString('id-ID')
}

let statsObserver: IntersectionObserver | null = null

onMounted(() => {
  statsObserver = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) animateAll() },
    { threshold: 0.3 }
  )
  if (statsRef.value) statsObserver.observe(statsRef.value)
})

onUnmounted(() => {
  statsObserver?.disconnect()
})

// ── Team data ─────────────────────────────────────────────────────────────────
const team = [
  { initials: 'AB', name: 'Ahmad Budi', role: 'CEO & Co-founder' },
  { initials: 'SC', name: 'Sari Cahyani', role: 'CTO & Co-founder' },
  { initials: 'RH', name: 'Reza Hidayat', role: 'Head of Design' },
  { initials: 'NP', name: 'Nita Pratiwi', role: 'Head of Marketing' },
  { initials: 'DW', name: 'Dian Wijaya', role: 'Lead Developer' },
  { initials: 'FN', name: 'Fitra Nugraha', role: 'Customer Success' },
]
</script>

<template>
  <div>
    <SharedNavbar />

    <!-- ── Mini Hero ──────────────────────────────────────────────────────────── -->
  <section ref="heroRef" class="landing-page-hero landing-reveal">
    <div class="landing-container--narrow" style="text-align: center;">
      <p class="landing-overline" style="margin-bottom: 0.75rem;">Tentang Kami</p>
      <h1 class="landing-h2" style="color: var(--color-text-heading); margin-bottom: 1rem;">
        Tentang Abadikan
      </h1>
      <p class="landing-subtitle" style="margin-inline: auto;">
        Kami percaya setiap pasangan punya cerita yang unik. Dan cerita itu layak diabadikan.
      </p>
    </div>
  </section>

  <!-- ── Brand Story ────────────────────────────────────────────────────────── -->
  <section ref="storyRef" class="landing-section landing-reveal" style="background: var(--color-bg);">
    <div class="story-container">
      <p class="landing-overline" style="margin-bottom: 1.25rem; text-align: center;">Kenapa Abadikan lahir?</p>
      <blockquote class="story-quote">
        "Kami percaya setiap pasangan punya cerita yang unik. Dan cerita itu layak diabadikan
        — bukan cuma di ingatan, tapi dalam undangan yang bisa dibuka kembali bertahun-tahun
        setelah hari bahagia itu."
      </blockquote>
      <div class="story-body">
        <p>
          Abadikan lahir dari frustrasi yang sederhana: kenapa undangan digital di Indonesia
          terasa so generic? Kenapa semua terasa sama, tidak personal, tidak bercerita?
        </p>
        <p>
          Kami membangun Abadikan untuk menjawab pertanyaan itu. Sebuah platform yang bukan
          sekadar 'tools bikin undangan', tapi wadah untuk menceritakan kisah cinta yang nyata
          — dengan foto, musik, kata-kata yang dipilih dengan hati.
        </p>
        <p>
          Karena momen pernikahan hanya terjadi sekali. Dan kamu layak mengabadikannya dengan
          cara terbaik.
        </p>
      </div>
    </div>
  </section>

  <!-- ── Visi & Misi ────────────────────────────────────────────────────────── -->
  <section ref="visiRef" class="landing-section landing-reveal" style="background: var(--color-bg-subtle);">
    <div class="landing-container--narrow">
      <div class="visi-grid landing-reveal" data-reveal-child>
        <!-- Visi -->
        <div class="visi-card" data-reveal-child>
          <div class="visi-icon-wrap">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 class="visi-label">Visi</h3>
          <p class="visi-text">
            Menjadi platform undangan digital yang paling personal dan bercerita di Indonesia.
          </p>
        </div>
        <!-- Misi -->
        <div class="visi-card" data-reveal-child>
          <div class="visi-icon-wrap">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 class="visi-label">Misi</h3>
          <p class="visi-text">
            Membantu setiap pasangan merayakan momen terpenting dalam hidup mereka dengan cara
            yang modern, personal, dan bermakna.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Stats ──────────────────────────────────────────────────────────────── -->
  <section
    ref="statsRef"
    class="landing-section"
    style="background: color-mix(in oklch, var(--color-primary) 85%, black);"
  >
    <div class="landing-container">
      <div class="stats-grid">
        <div
          v-for="(stat, i) in statsData"
          :key="stat.label"
          class="stats-item"
        >
          <div class="stats-number">
            {{ fmt(displays[i]) }}<span class="stats-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stats-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Team ───────────────────────────────────────────────────────────────── -->
  <section ref="teamRef" class="landing-section landing-reveal" style="background: var(--color-bg);">
    <div class="landing-container">
      <div class="section-header landing-reveal">
        <h2 class="landing-h2" style="color: var(--color-text-heading); margin-bottom: 0.75rem;">
          Tim di Balik Abadikan
        </h2>
        <p class="landing-subtitle" style="margin-inline: auto;">
          Sekumpulan orang yang obsesi dengan detail dan passionate tentang pernikahan.
        </p>
      </div>

      <div class="team-grid landing-reveal">
        <div
          v-for="member in team"
          :key="member.name"
          class="team-card"
          data-reveal-child
        >
          <Avatar :name="member.name" size="xl" shape="circle" />
          <div class="team-info">
            <p class="team-name">{{ member.name }}</p>
            <p class="team-role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Trust ──────────────────────────────────────────────────────────────── -->
  <section ref="trustRef" class="landing-reveal" style="background: var(--color-bg-subtle); padding-block: clamp(48px, 8vh, 80px);">
    <div class="landing-container--narrow" style="text-align: center;">
      <div class="trust-badge">
        <div class="trust-logo-placeholder" aria-hidden="true">
          <span>Kominfo</span>
        </div>
        <p class="trust-text">
          Terdaftar di Kementerian Komunikasi dan Informatika Republik Indonesia
        </p>
        <p class="trust-sub">
          Perusahaan beroperasi sejak 2022, berbasis di Jakarta, Indonesia.
        </p>
      </div>
    </div>
  </section>

    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>

<style scoped>
/* ── Story ── */
.story-container {
  max-width: 700px;
  margin-inline: auto;
  padding-inline: clamp(20px, 5vw, 64px);
  text-align: center;
}

.story-quote {
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 2.5vw + 0.5rem, 1.5rem);
  line-height: 1.55;
  color: var(--color-text-heading);
  font-style: italic;
  font-weight: 600;
  letter-spacing: -0.01em;
  border-left: none;
  margin: 0 0 2rem;
  padding: 0;
  quotes: '\201C' '\201D';
}

.story-body {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.story-body p {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text-primary);
  margin: 0;
}

/* ── Visi & Misi ── */
.visi-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .visi-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.visi-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.visi-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  background: color-mix(in oklch, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.visi-label {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.visi-text {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-text-primary);
  margin: 0;
}

/* ── Stats ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  text-align: center;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stats-number {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw + 1rem, 3.5rem);
  font-weight: 700;
  color: var(--color-text-inverse);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.stats-suffix {
  opacity: 0.65;
}

.stats-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: oklch(1 0 0 / 0.65);
}

/* ── Team ── */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  text-align: center;
  padding: 1.75rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.team-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.team-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.team-name {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0;
}

.team-role {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0;
}

/* ── Trust ── */
.trust-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
}

.trust-logo-placeholder {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.trust-text {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-heading);
  margin: 0;
  max-width: 40ch;
  text-align: center;
}

.trust-sub {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
