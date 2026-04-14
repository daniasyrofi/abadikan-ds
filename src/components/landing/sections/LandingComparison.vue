<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

interface ComparisonRow {
  feature: string
  abadikan: string
  abadikanType: 'check' | 'partial'
  other: string
  otherType: 'check' | 'partial' | 'cross'
}

const rows: ComparisonRow[] = [
  {
    feature: 'Undangan bercerita (story-driven)',
    abadikan: 'Ya',
    abadikanType: 'check',
    other: 'Umumnya template standar',
    otherType: 'cross',
  },
  {
    feature: 'Kado cashless + wishlist + kirim alamat',
    abadikan: '3 cara lengkap',
    abadikanType: 'check',
    other: 'Sebagian punya 1–2',
    otherType: 'partial',
  },
  {
    feature: 'QR check-in + layar sambutan',
    abadikan: 'Ya',
    abadikanType: 'check',
    other: 'Beberapa saja',
    otherType: 'partial',
  },
  {
    feature: 'Smart WhatsApp broadcast',
    abadikan: 'Personal per tamu',
    abadikanType: 'check',
    other: 'Ada, tapi tidak personal',
    otherType: 'partial',
  },
  {
    feature: 'Custom domain',
    abadikan: 'Di paket Exclusive',
    abadikanType: 'check',
    other: 'Jarang tersedia',
    otherType: 'cross',
  },
  {
    feature: 'Aktif selamanya',
    abadikan: 'Sekali bayar',
    abadikanType: 'check',
    other: 'Ada batasan waktu',
    otherType: 'partial',
  },
  {
    feature: 'RSVP real-time + dashboard',
    abadikan: 'Ya',
    abadikanType: 'check',
    other: 'Umumnya ada',
    otherType: 'check',
  },
  {
    feature: 'Harga transparan',
    abadikan: 'Jelas di website',
    abadikanType: 'check',
    other: 'Sering tersembunyi',
    otherType: 'partial',
  },
  {
    feature: 'Support responsif (< 5 menit)',
    abadikan: 'WA Chat',
    abadikanType: 'check',
    other: 'Bervariasi',
    otherType: 'partial',
  },
  {
    feature: 'Desain custom 1-on-1',
    abadikan: 'Paket Exclusive',
    abadikanType: 'check',
    other: 'Jarang',
    otherType: 'partial',
  },
]

// Stagger row reveal on scroll
const tableRef = ref<HTMLElement | null>(null)
let rowObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!tableRef.value) return
  const tableRows = tableRef.value.querySelectorAll<HTMLElement>('tbody tr')

  rowObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      tableRows.forEach((row, i) => {
        setTimeout(() => {
          row.classList.add('row-revealed')
        }, i * 40)
      })
      rowObserver?.disconnect()
    },
    { threshold: 0.1 }
  )
  rowObserver.observe(tableRef.value)
})

onUnmounted(() => {
  rowObserver?.disconnect()
})

const WA_LINK = 'https://wa.me/6281234567890?text=Halo%20Abadikan%2C%20saya%20ingin%20tanya...'
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section cmp-section"
  >
    <div class="landing-container">
      <!-- Header -->
      <div class="cmp-header" data-reveal-child>
        <p class="landing-overline">Kenapa Abadikan?</p>
        <h2 class="landing-h2 cmp-h2">
          Platform Lain Bikin Undangan.<br class="cmp-br" />
          Kami Pastikan Hari H Kalian Lancar.
        </h2>
        <p class="landing-subtitle cmp-sub">
          Bedanya bukan di satu-dua fitur. Ini soal siapa yang beneran mikirin kebutuhan kalian dari undangan pertama sampai tamu terakhir pulang.
        </p>
      </div>

      <!-- Table -->
      <div class="cmp-table-wrap" data-reveal-child>
        <table ref="tableRef" class="cmp-table">
          <thead>
            <tr>
              <th class="col-feature cmp-th cmp-th--left">Fitur</th>
              <th class="col-brand cmp-th">Abadikan</th>
              <th class="col-other cmp-th">Platform Lain</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="row.feature"
              class="cmp-row"
              :class="i % 2 === 0 ? 'cmp-row--even' : 'cmp-row--odd'"
            >
              <td class="col-feature cmp-td cmp-td--feature">{{ row.feature }}</td>
              <td class="col-brand cmp-td cmp-td--brand">
                <span class="cmp-indicator cmp-indicator--check" aria-label="Ya"></span>
                <span class="cmp-cell-text cmp-cell-text--brand">{{ row.abadikan }}</span>
              </td>
              <td class="col-other cmp-td cmp-td--other">
                <span
                  class="cmp-indicator"
                  :class="{
                    'cmp-indicator--check': row.otherType === 'check',
                    'cmp-indicator--partial': row.otherType === 'partial',
                    'cmp-indicator--cross': row.otherType === 'cross',
                  }"
                  :aria-label="row.otherType === 'check' ? 'Ya' : row.otherType === 'cross' ? 'Tidak' : 'Sebagian'"
                ></span>
                <span class="cmp-cell-text">{{ row.other }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Bottom CTA -->
      <div class="cmp-footer" data-reveal-child>
        <p class="cmp-footer-text">
          Masih ada yang mau ditanyain?
          <a
            :href="WA_LINK"
            target="_blank"
            rel="noopener noreferrer"
            class="cmp-link"
          >
            Chat kami langsung — tanya apa aja, gratis.
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cmp-section {
  background: var(--color-bg-subtle);
}

/* ── Header ──────────────────────────────────── */
.cmp-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.cmp-h2 {
  color: var(--color-text-heading);
}

.cmp-sub {
  text-align: center;
  margin-inline: auto;
}

.cmp-br {
  display: none;
}
@media (min-width: 640px) {
  .cmp-br { display: block; }
}

/* ── Table wrapper ───────────────────────────── */
.cmp-table-wrap {
  overflow-x: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

.cmp-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 520px;
}

/* ── Columns ─────────────────────────────────── */
.col-feature { width: 50%; }
.col-brand   { width: 25%; }
.col-other   { width: 25%; }

/* ── Header row ──────────────────────────────── */
.cmp-th {
  padding: 14px 20px;
  font-family: var(--font-ui);
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
  background: var(--color-neutral);
  color: #fff;
}

.cmp-th--left {
  text-align: left;
}

/* ── Body rows ───────────────────────────────── */
.cmp-row {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.cmp-row.row-revealed {
  opacity: 1;
  transform: translateY(0);
}

.cmp-row--even {
  background: var(--color-surface);
}

.cmp-row--odd {
  background: var(--color-bg-subtle);
}

/* ── Cells ───────────────────────────────────── */
.cmp-td {
  padding: 12px 20px;
  font-size: 0.875rem;
  vertical-align: middle;
  border-bottom: 1px solid var(--color-border);
}

.cmp-row:last-child .cmp-td {
  border-bottom: none;
}

.cmp-td--feature {
  font-weight: 500;
  color: var(--color-text-primary);
}

.cmp-td--brand {
  text-align: center;
  background: color-mix(in oklch, var(--color-primary) 6%, transparent);
  border-left: 2px solid color-mix(in oklch, var(--color-primary) 30%, transparent);
}

.cmp-td--other {
  text-align: center;
}

/* ── Indicators ──────────────────────────────── */
.cmp-indicator {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  margin-right: 0.375rem;
  vertical-align: middle;
  flex-shrink: 0;
  position: relative;
  top: -1px;
}

.cmp-indicator--check {
  background: #22c55e;
}

.cmp-indicator--partial {
  background: #f59e0b;
}

.cmp-indicator--cross {
  background: var(--color-border-strong, #d1d5db);
}

.cmp-cell-text {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.cmp-cell-text--brand {
  color: var(--color-primary);
  font-weight: 600;
}

/* ── Footer CTA ──────────────────────────────── */
.cmp-footer {
  margin-top: 2.5rem;
  text-align: center;
}

.cmp-footer-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.cmp-link {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 150ms ease;
}

.cmp-link:hover {
  opacity: 0.75;
}

/* ── Reduced motion ──────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .cmp-row {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
