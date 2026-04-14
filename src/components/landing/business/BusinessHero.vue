<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'

// ── Income counter (bar chart animation) ────────────────────────────────────
const bars = ref([
  { label: 'Jan', value: 0, target: 62 },
  { label: 'Feb', value: 0, target: 75 },
  { label: 'Mar', value: 0, target: 58 },
  { label: 'Apr', value: 0, target: 88 },
  { label: 'Mei', value: 0, target: 94 },
  { label: 'Jun', value: 0, target: 100 },
])

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

onMounted(() => {
  bars.value.forEach((bar, i) => {
    setTimeout(() => {
      const start = performance.now()
      function frame(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / 1200, 1)
        bar.value = Math.floor(easeOutCubic(progress) * bar.target)
        if (progress < 1) requestAnimationFrame(frame)
        else bar.value = bar.target
      }
      requestAnimationFrame(frame)
    }, i * 100 + 300)
  })
})
</script>

<template>
  <div class="biz-hero-root">
    <!-- Glow -->
    <div class="biz-hero-glow" aria-hidden="true"></div>

    <!-- Hero body -->
    <div class="biz-hero-body">
      <div class="biz-hero-grid">

        <!-- Left: copy -->
        <div class="biz-hero-left">
          <!-- Overline badge -->
          <div class="biz-overline">
            <span>Peluang bisnis digital tanpa ribet</span>
          </div>

          <!-- H1 -->
          <h1 class="biz-h1">
            Mulai Bisnis Undangan Digital — Tanpa Modal, Tanpa Coding, Tanpa Ribet.
          </h1>

          <!-- Subtitle -->
          <p class="biz-sub">
            Jual undangan website atas nama brand kamu sendiri. Kami yang handle teknologi, desain, dan server-nya. Kamu fokus jualan dan raih untung.
          </p>

          <!-- CTAs -->
          <div class="biz-ctas">
            <Button
              variant="default"
              size="lg"
              style="--btn-bg: var(--color-text-inverse); --btn-text: var(--color-neutral); --btn-border: var(--color-text-inverse); --btn-hover-bg: rgba(255,255,255,0.88); --btn-hover-border: rgba(255,255,255,0.88); font-weight: 600;"
            >
              Daftar Jadi Reseller →
            </Button>
            <Button
              variant="ghost"
              size="lg"
              style="--btn-bg: transparent; --btn-text: var(--color-text-inverse); --btn-border: rgba(255,255,255,0.4); --btn-hover-bg: rgba(255,255,255,0.08); --btn-hover-border: rgba(255,255,255,0.6); --btn-hover-text: var(--color-text-inverse); font-weight: 500;"
            >
              Lihat Simulasi Keuntungan ↓
            </Button>
          </div>

          <!-- Income pill -->
          <div class="biz-income-pill">
            💰 Potensi penghasilan Rp 3-9 juta/bulan hanya dari jualan undangan digital
          </div>
        </div>

        <!-- Right: dashboard mockup -->
        <div class="biz-hero-right" aria-hidden="true">
          <div class="biz-dashboard">
            <!-- Header row -->
            <div class="dash-header">
              <div class="dash-dot red"></div>
              <div class="dash-dot yellow"></div>
              <div class="dash-dot green"></div>
              <span class="dash-title">Dashboard Reseller</span>
            </div>

            <!-- Income label -->
            <div class="dash-income-label">Total Komisi Bulan Ini</div>
            <div class="dash-income-value">Rp 4.200.000</div>
            <div class="dash-income-sub">+28% dari bulan lalu ↑</div>

            <!-- Bar chart -->
            <div class="dash-chart">
              <div
                v-for="bar in bars"
                :key="bar.label"
                class="dash-bar-col"
              >
                <div class="dash-bar-track">
                  <div
                    class="dash-bar-fill"
                    :style="{ height: bar.value + '%' }"
                  ></div>
                </div>
                <span class="dash-bar-label">{{ bar.label }}</span>
              </div>
            </div>

            <!-- Stats row -->
            <div class="dash-stats">
              <div class="dash-stat">
                <span class="dash-stat-num">28</span>
                <span class="dash-stat-label">Undangan terjual</span>
              </div>
              <div class="dash-stat-divider"></div>
              <div class="dash-stat">
                <span class="dash-stat-num">Rp 100K</span>
                <span class="dash-stat-label">Bisa ditarik</span>
              </div>
              <div class="dash-stat-divider"></div>
              <div class="dash-stat">
                <span class="dash-stat-num">4.9★</span>
                <span class="dash-stat-label">Rating customer</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Social proof bar -->
    <div class="biz-proof-bar">
      <div class="biz-proof-inner">
        <span class="biz-proof-item">327+ Reseller Aktif</span>
        <span class="biz-proof-sep" aria-hidden="true">·</span>
        <span class="biz-proof-item">Rp 2.4M avg penghasilan/bulan</span>
        <span class="biz-proof-sep" aria-hidden="true">·</span>
        <span class="biz-proof-item">0 coding diperlukan</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────────────────────────── */
.biz-hero-root {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(ellipse 80% 45% at 50% -10%, oklch(0.55 0.22 18 / 0.25), transparent),
    var(--color-neutral);
  overflow-x: hidden;
  font-family: var(--font-display);
  display: flex;
  flex-direction: column;
}

.biz-hero-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 60% 30% at 50% 0%, oklch(0.55 0.22 18 / 0.18), transparent);
  z-index: 0;
}

/* ── Hero body ────────────────────────────────────────────────────────────── */
.biz-hero-body {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 100px 0 64px;
}

.biz-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
}

/* ── Left ─────────────────────────────────────────────────────────────────── */
.biz-hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

.biz-overline {
  display: inline-flex;
  align-items: center;
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 5px 12px;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
  font-family: var(--font-ui);
}

.biz-h1 {
  font-size: clamp(2.2rem, 4vw + 0.5rem, 3.8rem);
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: var(--color-text-inverse);
  margin: 0 0 1.5rem;
}

.biz-sub {
  font-size: clamp(0.95rem, 0.5vw + 0.875rem, 1.15rem);
  font-family: var(--font-ui);
  font-weight: 400;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.7);
  max-width: 44ch;
  margin: 0 0 2rem;
}

.biz-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.biz-income-pill {
  display: inline-block;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 13px;
  font-family: var(--font-ui);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  max-width: 100%;
}

/* ── Right: dashboard mockup ──────────────────────────────────────────────── */
.biz-hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.biz-dashboard {
  width: 380px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    var(--shadow-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-shrink: 0;
}

/* Traffic-light header */
.dash-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 1.25rem;
}

.dash-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dash-dot.red    { background: #ff5f57; }
.dash-dot.yellow { background: #febc2e; }
.dash-dot.green  { background: #28c840; }

.dash-title {
  font-size: 11px;
  font-family: var(--font-ui);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 6px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Income number */
.dash-income-label {
  font-size: 11px;
  font-family: var(--font-ui);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.dash-income-value {
  font-size: 2.25rem;
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text-inverse);
  line-height: 1;
  margin-bottom: 4px;
}

.dash-income-sub {
  font-size: 12px;
  font-family: var(--font-ui);
  color: #4ade80;
  font-weight: 500;
  margin-bottom: 1.25rem;
}

/* Bar chart */
.dash-chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 96px;
  margin-bottom: 1.25rem;
  padding-bottom: 20px;
  position: relative;
}

.dash-bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 100%;
}

.dash-bar-track {
  flex: 1;
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.dash-bar-fill {
  width: 100%;
  background: linear-gradient(to top, var(--color-primary), oklch(0.65 0.22 18 / 0.7));
  border-radius: 4px;
  transition: height 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 4px;
}

.dash-bar-label {
  font-size: 9px;
  font-family: var(--font-ui);
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  position: absolute;
  bottom: 0;
  white-space: nowrap;
}

/* We need to position the labels inside each col */
.dash-bar-col {
  position: relative;
}

.dash-bar-label {
  position: static;
}

/* Stats row */
.dash-stats {
  display: flex;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.dash-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
}

.dash-stat-num {
  font-size: 14px;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-text-inverse);
  line-height: 1;
}

.dash-stat-label {
  font-size: 10px;
  font-family: var(--font-ui);
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.3;
}

.dash-stat-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
}

/* ── Social proof bar ─────────────────────────────────────────────────────── */
.biz-proof-bar {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.22);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
}

.biz-proof-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 1rem;
  max-width: 720px;
  margin: 0 auto;
}

.biz-proof-item {
  font-size: 13px;
  font-family: var(--font-ui);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
}

.biz-proof-sep {
  color: rgba(255, 255, 255, 0.25);
  font-size: 16px;
}

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .biz-hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 0 1.5rem;
  }

  .biz-hero-right {
    order: -1;
  }

  .biz-dashboard {
    width: 100%;
    max-width: 380px;
  }
}

@media (max-width: 500px) {
  .biz-hero-body {
    padding: 80px 0 48px;
  }

  .biz-ctas {
    flex-direction: column;
    width: 100%;
  }

  .biz-proof-sep {
    display: none;
  }

  .biz-proof-inner {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
