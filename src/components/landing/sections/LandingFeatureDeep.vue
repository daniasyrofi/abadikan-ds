<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const activeFeature = ref(0)
const blockRefs = ref<HTMLElement[]>([])
let observers: IntersectionObserver[] = []

const features = [
  {
    overline: 'Nggak ada lagi "Kepada Yth."',
    title: 'Setiap Tamu Dibuka Pakai Nama Mereka Sendiri',
    body: 'Import kontak dari Excel, klik kirim — undangan nyampe ke ratusan tamu via WhatsApp. Yang beda: setiap undangan dibuka dengan "Untuk [nama tamu]", bukan pesan massal yang terasa dingin.',
    bullets: ['Import dari Excel / CSV', 'Nama personal di setiap undangan', 'Kirim massal via WhatsApp'],
    visual: 'send',
  },
  {
    overline: 'Nggak perlu nanya satu-satu lagi',
    title: 'Tamu Konfirmasi Langsung, Kamu Pantau dari HP',
    body: 'Tamu klik "Hadir" atau "Tidak Hadir" langsung dari undangan. Data masuk real-time ke dashboard kamu. Nggak perlu bikin Google Form terpisah.',
    bullets: ['Konfirmasi real-time', 'Form bisa dikustomisasi', 'Data bisa diekspor ke Excel'],
    visual: 'rsvp',
  },
  {
    overline: 'Amplop nggak hilang, kado nggak dobel',
    title: 'Tiga Cara Terima Kado — Semua Tercatat',
    body: 'Amplop digital masuk langsung ke rekening. Tamu bisa kirim hadiah ke alamat. Atau pilih dari wishlist. Setiap kiriman ada notifikasi, nggak ada yang terlewat.',
    bullets: ['Semua bank dan e-wallet', 'Notifikasi setiap kado masuk', 'Wishlist tanpa batas'],
    visual: 'gift',
  },
  {
    overline: '3 detik per tamu, tanpa buku tamu',
    title: 'Scan QR, Nama Muncul, Tamu Masuk. Selesai.',
    body: 'Setiap tamu punya QR unik di undangannya. Di hari H, petugas tinggal scan — nama langsung muncul di layar. Nggak ada antrean, nggak ada nama yang salah tulis.',
    bullets: ['QR unik per tamu', 'Selfie check-in opsional', 'Layar sambutan digital'],
    visual: 'qr',
  },
  {
    overline: 'Biar tamu ikut terharu sebelum datang',
    title: 'Cerita Kalian, Dilihat Ratusan Tamu Sebelum Hari H',
    body: 'Upload foto prewedding, video, momen-momen penting — langsung tampil di halaman undangan. Ini bukan sekadar informasi acara. Ini pengalaman yang bikin tamu datang dengan perasaan yang tepat.',
    bullets: ['Upload foto & video tanpa batas', 'Support YouTube & Instagram', 'Galeri bisa di-swipe'],
    visual: 'gallery',
  },
]

function setBlockRef(el: unknown, i: number) {
  if (el instanceof HTMLElement) blockRefs.value[i] = el
}

onMounted(() => {
  // Use IO to detect which feature block is most visible
  blockRefs.value.forEach((el, i) => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) activeFeature.value = i
      },
      { threshold: 0.5, rootMargin: '0px 0px -20% 0px' }
    )
    obs.observe(el)
    observers.push(obs)
  })
})

onUnmounted(() => {
  observers.forEach(o => o.disconnect())
  observers = []
})
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section feature-section"
  >
    <div class="landing-container">
      <!-- Section header -->
      <div class="feature-header" data-reveal-child>
        <p class="landing-overline">Bukan cuma cantik — beneran berguna</p>
        <h2 class="landing-h2 feature-h2">
          Setiap Fitur Ada Karena Pasangan Lain Pernah Butuh
        </h2>
        <p class="landing-subtitle feature-sub">
          Ini bukan fitur yang dibuat asal. Semuanya lahir dari cerita nyata ribuan pasangan yang udah pakai Abadikan.
        </p>
      </div>

      <!-- Sticky split layout -->
      <div class="feature-split">
        <!-- Left: sticky visual panel -->
        <div class="feature-panel-wrap">
          <div class="feature-panel">
            <transition name="panel-fade" mode="out-in">
              <div :key="activeFeature" class="feature-visual">
                <!-- Send -->
                <template v-if="features[activeFeature].visual === 'send'">
                  <div class="visual-mock mock-dark">
                    <div class="mock-label-row">
                      <span class="mock-chip">Import Tamu</span>
                    </div>
                    <div class="mock-rows">
                      <div v-for="i in 4" :key="i" class="mock-row">
                        <div class="mock-avatar" :style="{ opacity: 1.1 - i * 0.15 }"></div>
                        <div class="mock-bars">
                          <div class="mock-bar mock-bar--name" :style="{ width: (80 - i * 8) + '%' }"></div>
                          <div class="mock-bar mock-bar--phone" :style="{ width: (55 - i * 6) + '%' }"></div>
                        </div>
                        <div class="mock-status" :style="{ opacity: 0.6 + i * 0.1 }">✓</div>
                      </div>
                    </div>
                    <div class="mock-cta-row">
                      <div class="mock-btn">Kirim ke 247 Tamu →</div>
                    </div>
                  </div>
                </template>

                <!-- RSVP -->
                <template v-if="features[activeFeature].visual === 'rsvp'">
                  <div class="visual-mock mock-light">
                    <div class="mock-label-row">
                      <span class="mock-chip">Dashboard RSVP</span>
                    </div>
                    <div class="mock-donut-area">
                      <svg viewBox="0 0 100 100" aria-hidden="true">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-border)" stroke-width="13"/>
                        <circle
cx="50" cy="50" r="38" fill="none" stroke="var(--color-primary)" stroke-width="13"
                          stroke-dasharray="239" stroke-dashoffset="30" stroke-linecap="round"
                          transform="rotate(-90 50 50)"/>
                        <text x="50" y="46" text-anchor="middle" style="font-size:14px;font-weight:700;fill:var(--color-text-heading);font-family:sans-serif">87%</text>
                        <text x="50" y="60" text-anchor="middle" style="font-size:7px;fill:var(--color-text-secondary);font-family:sans-serif">Hadir</text>
                      </svg>
                    </div>
                    <div class="mock-legend">
                      <span class="legend-dot" style="background:var(--color-primary)"></span>
                      <span class="legend-text">87 Hadir</span>
                      <span class="legend-dot" style="background:var(--color-border-strong);margin-left:0.75rem"></span>
                      <span class="legend-text">13 Belum</span>
                    </div>
                  </div>
                </template>

                <!-- Gift -->
                <template v-if="features[activeFeature].visual === 'gift'">
                  <div class="visual-mock mock-light">
                    <div class="mock-label-row">
                      <span class="mock-chip">Kado Masuk</span>
                    </div>
                    <div class="mock-notifs">
                      <div v-for="n in 3" :key="n" class="mock-notif" :style="{ opacity: 1.1 - n * 0.2 }">
                        <div class="notif-icon">🎁</div>
                        <div class="notif-content">
                          <div class="notif-name" :style="{ width: (75 - n * 10) + '%' }"></div>
                          <div class="notif-amount"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- QR -->
                <template v-if="features[activeFeature].visual === 'qr'">
                  <div class="visual-mock mock-dark">
                    <div class="mock-label-row">
                      <span class="mock-chip">QR Check-in</span>
                    </div>
                    <div class="mock-qr-area">
                      <div class="mock-qr">
                        <div class="qr-grid">
                          <div v-for="i in 25" :key="i" class="qr-cell" :class="{ filled: [1,2,3,5,7,8,9,11,13,15,17,19,21,22,23,25].includes(i) }"></div>
                        </div>
                      </div>
                      <div class="mock-checkin-name">Budi & Sarah</div>
                      <div class="mock-scan-indicator">
                        <span></span>Siap scan
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Gallery -->
                <template v-if="features[activeFeature].visual === 'gallery'">
                  <div class="visual-mock mock-light" style="padding:0;overflow:hidden">
                    <div class="mock-gallery-grid">
                      <div
v-for="i in 6" :key="i" class="mock-gallery-cell"
                        :style="{ background: ['linear-gradient(135deg,#f0fdf4,#bbf7d0)','linear-gradient(135deg,#fdf2f8,#f5d0fe)','linear-gradient(135deg,#fff7ed,#fed7aa)','linear-gradient(135deg,#eff6ff,#bfdbfe)','linear-gradient(135deg,#fefce8,#fef08a)','linear-gradient(135deg,#fff1f2,#fecdd3)'][i-1] }">
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </transition>
          </div>
        </div>

        <!-- Right: feature blocks -->
        <div class="feature-blocks">
          <div
            v-for="(feat, i) in features"
            :key="feat.title"
            :ref="(el) => setBlockRef(el, i)"
            class="feature-block"
            :class="{ 'feature-block--active': activeFeature === i }"
          >
            <p class="feature-overline-text">{{ feat.overline }}</p>
            <h3 class="feature-block-title">{{ feat.title }}</h3>
            <p class="feature-block-body">{{ feat.body }}</p>
            <ul class="feature-bullets">
              <li v-for="b in feat.bullets" :key="b">
                <span class="bullet-check">✓</span> {{ b }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-section {
  background: var(--color-bg);
}

.feature-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
}
.feature-h2 { color: var(--color-text-heading); max-width: 26ch; }
.feature-sub { text-align: center; margin-inline: auto; }

/* ── Split layout ────────────────────────────────────────── */
.feature-split {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .feature-split {
    flex-direction: row;
    gap: 5rem;
    align-items: flex-start;
  }
  .feature-panel-wrap {
    flex: 0 0 45%;
    position: sticky;
    top: 6rem;
    align-self: flex-start;
  }
}

/* ── Left sticky panel ───────────────────────────────────── */
.feature-panel {
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--color-bg-subtle);
}

.feature-visual {
  width: 100%;
  height: 100%;
}

/* Panel fade transition */
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 350ms ease, transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
}
.panel-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ── Visual mocks ────────────────────────────────────────── */
.visual-mock {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
}
.mock-dark { background: var(--color-neutral); }
.mock-light { background: var(--color-surface); border: 1px solid var(--color-border); }

.mock-label-row { display: flex; align-items: center; }
.mock-chip {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.7);
  font-family: var(--font-ui);
}
.mock-dark .mock-chip { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); }
.mock-light .mock-chip { background: var(--color-bg-subtle); color: var(--color-text-secondary); }

.mock-rows { display: flex; flex-direction: column; gap: 0.625rem; flex: 1; }
.mock-row { display: flex; align-items: center; gap: 0.625rem; }
.mock-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(255,255,255,0.15); flex-shrink: 0;
}
.mock-bars { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.mock-bar { height: 5px; border-radius: 3px; background: rgba(255,255,255,0.1); }
.mock-bar--name { }
.mock-bar--phone { opacity: 0.5; }
.mock-light .mock-bar { background: var(--color-border); }
.mock-status { font-size: 10px; color: rgba(255,255,255,0.4); }

.mock-cta-row { margin-top: auto; }
.mock-btn {
  background: var(--color-primary);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: var(--font-ui);
  padding: 8px 14px;
  border-radius: var(--radius-lg);
  text-align: center;
}

/* Donut */
.mock-donut-area { flex: 1; display: flex; align-items: center; justify-content: center; }
.mock-donut-area svg { width: 110px; height: 110px; }
.mock-legend { display: flex; align-items: center; gap: 0.375rem; flex-wrap: wrap; font-size: 0.75rem; color: var(--color-text-secondary); }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.legend-text { font-size: 0.75rem; }

/* Gift notifs */
.mock-notifs { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.mock-notif { display: flex; align-items: center; gap: 0.625rem; padding: 0.5rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.notif-icon { font-size: 1.1rem; flex-shrink: 0; }
.notif-content { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.notif-name { height: 5px; background: var(--color-border-strong); border-radius: 3px; }
.notif-amount { height: 4px; width: 40%; background: var(--color-border); border-radius: 3px; }

/* QR mock */
.mock-qr-area { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; flex: 1; justify-content: center; }
.mock-qr { width: 80px; height: 80px; padding: 6px; background: #fff; border-radius: 8px; }
.qr-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; width: 100%; height: 100%; }
.qr-cell { border-radius: 1px; }
.qr-cell.filled { background: #1a1a1a; }
.mock-checkin-name { font-size: 0.875rem; font-weight: 700; color: rgba(255,255,255,0.9); }
.mock-scan-indicator { font-size: 0.6875rem; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 4px; }
.mock-scan-indicator span { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; display: block; }

/* Gallery mock grid */
.mock-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); height: 100%; gap: 2px; }
.mock-gallery-cell { }

/* ── Right: feature blocks ───────────────────────────────── */
.feature-blocks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .feature-blocks { flex: 1; }
}

.feature-block {
  padding: 1.5rem;
  border-radius: var(--radius-xl);
  border: 1px solid transparent;
  border-left: 3px solid transparent;
  transition: opacity 250ms ease, border-color 250ms ease, background 250ms ease;
  opacity: 0.45;
}

.feature-block--active {
  opacity: 1;
  border-left-color: var(--color-primary);
  background: var(--color-bg-subtle);
  border-color: var(--color-border);
  border-left-color: var(--color-primary);
}

/* Mobile: all blocks full opacity */
@media (max-width: 767px) {
  .feature-block { opacity: 1; }
  .feature-panel-wrap { display: none; }
}

.feature-overline-text {
  font-family: var(--font-ui);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.feature-block-title {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
  font-weight: 700;
  color: var(--color-text-heading);
  line-height: 1.3;
  margin: 0 0 0.75rem;
}

.feature-block-body {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0 0 1rem;
}

.feature-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.feature-bullets li {
  font-size: 0.8125rem;
  color: var(--color-text-primary);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.bullet-check {
  color: var(--color-primary);
  font-weight: 700;
  flex-shrink: 0;
  font-size: 0.75rem;
  margin-top: 1px;
}
</style>
