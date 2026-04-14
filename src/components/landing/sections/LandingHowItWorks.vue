<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const steps = [
  {
    num: '01',
    title: 'Daftar Gratis',
    body: 'Masuk pakai email atau Google. Nggak perlu isi data kartu kredit, nggak ada komitmen apa-apa.',
    time: '~1 menit',
  },
  {
    num: '02',
    title: 'Pilih Tema',
    body: 'Minimalis, floral, adat, islami, modern — pilih yang paling "kamu banget". Semua bisa diedit.',
    time: '~2 menit',
  },
  {
    num: '03',
    title: 'Isi Detail & Upload Foto',
    body: 'Info acara, cerita kalian, foto prewedding favorit, musik latar. Semua tinggal isi.',
    time: '~7 menit',
  },
  {
    num: '04',
    title: 'Kirim ke Semua Tamu',
    body: 'Import kontak dari spreadsheet, kirim via WhatsApp. Setiap undangan pakai nama tamu masing-masing.',
    time: '~3 menit',
  },
  {
    num: '05',
    title: 'Duduk Tenang, Pantau dari Dashboard',
    body: 'RSVP masuk otomatis, kado tercatat, tamu check-in pakai QR. Kamu tinggal nikmatin hari H.',
    time: 'Otomatis',
  },
]

// Animate SVG line when steps enter viewport
const lineRef = ref<SVGLineElement | null>(null)
const lineVisible = ref(false)
let lineObserver: IntersectionObserver | null = null

onMounted(() => {
  lineObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        lineVisible.value = true
        lineObserver?.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  if (lineRef.value) lineObserver.observe(lineRef.value)
})

onUnmounted(() => {
  lineObserver?.disconnect()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section hiw-section"
  >
    <div class="landing-container">
      <div class="sticky-split">
        <!-- Left: sticky heading -->
        <div class="sticky-split__panel hiw-panel">
          <p class="landing-overline">Serius, cuma 15 menit</p>
          <h2 class="landing-h2 hiw-h2">
            Dari Nol Sampai Undangan Dikirim. Cuma 5 Langkah.
          </h2>
          <p class="landing-subtitle hiw-sub">
            Nggak perlu bisa desain. Nggak perlu buka laptop. Cukup HP, foto prewedding, dan 15 menit waktu luang.
          </p>
          <div class="hiw-cta">
            <Button variant="primary" size="md">Coba Gratis Sekarang →</Button>
            <p class="hiw-micro">Nggak perlu kartu kredit. Bisa batal kapan aja.</p>
          </div>
        </div>

        <!-- Right: steps with SVG connector -->
        <div class="hiw-steps">
          <!-- SVG vertical line (desktop only) -->
          <svg
            class="hiw-svg"
            viewBox="0 0 2 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              ref="lineRef"
              x1="1" y1="0" x2="1" y2="400"
              stroke="var(--color-border)"
              stroke-width="2"
              class="hiw-line"
              :class="{ 'hiw-line--visible': lineVisible }"
            />
          </svg>

          <div
            v-for="step in steps"
            :key="step.num"
            class="hiw-step"
            data-reveal-child
          >
            <div class="step-dot">
              <span class="step-dot-num">{{ step.num }}</span>
            </div>
            <div class="step-content">
              <div class="step-top">
                <h3 class="step-title">{{ step.title }}</h3>
                <span class="step-time">{{ step.time }}</span>
              </div>
              <p class="step-body">{{ step.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hiw-section {
  background: var(--color-bg);
}

/* ── Left panel ──────────────────────────────────────────── */
.hiw-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
}

.hiw-h2 {
  color: var(--color-text-heading);
}

.hiw-sub {
  max-width: 34ch;
}

.hiw-cta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.hiw-micro {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* ── Right: steps ────────────────────────────────────────── */
.hiw-steps {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 2rem;
  padding-top: 0.25rem;
}

/* SVG connector line (desktop only) */
.hiw-svg {
  display: none;
  position: absolute;
  left: 6px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  height: calc(100% - 24px);
}

@media (min-width: 768px) {
  .hiw-svg {
    display: block;
  }
  .hiw-steps {
    padding-left: 2.5rem;
  }
}

/* SVG line draw animation */
.hiw-line {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.hiw-line--visible {
  stroke-dashoffset: 0;
}

/* ── Step item ───────────────────────────────────────────── */
.hiw-step {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.step-dot {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: 2px solid var(--color-border);
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  transition: border-color 300ms ease, background 300ms ease;
}

@media (min-width: 768px) {
  .step-dot {
    border-color: var(--color-border-strong);
  }
}

.step-dot-num {
  font-size: 10px;
  font-weight: 700;
  font-family: var(--font-ui);
  color: var(--color-text-tertiary);
  line-height: 1;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.step-top {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.step-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-heading);
  line-height: 1.3;
  margin: 0;
}

.step-time {
  font-size: 0.6875rem;
  font-weight: 600;
  font-family: var(--font-ui);
  color: var(--color-text-tertiary);
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.step-body {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>
