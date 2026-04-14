<script setup lang="ts">
import '@/styles/landing.css'
import { ref, computed } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import SharedNavbar from '@/components/landing/shared/SharedNavbar.vue'
import SharedFloatingWA from '@/components/landing/shared/SharedFloatingWA.vue'
import LandingFooter from '@/components/landing/shared/LandingFooter.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const heroRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

useScrollReveal(heroRef)
useScrollReveal(gridRef)
useScrollReveal(ctaRef)

// ── Filter ─────────────────────────────────────────────────
type Category = 'semua' | 'minimalis' | 'floral' | 'elegant' | 'adat' | 'islami' | 'rustic' | 'modern'

interface FilterOption {
  key: Category
  label: string
}

const filters: FilterOption[] = [
  { key: 'semua',     label: 'Semua' },
  { key: 'minimalis', label: 'Minimalis' },
  { key: 'floral',    label: 'Floral' },
  { key: 'elegant',   label: 'Elegant' },
  { key: 'adat',      label: 'Adat Nusantara' },
  { key: 'islami',    label: 'Islami' },
  { key: 'rustic',    label: 'Rustic' },
  { key: 'modern',    label: 'Modern' },
]

const activeFilter = ref<Category>('semua')

// ── Template data ──────────────────────────────────────────
interface Template {
  id: number
  name: string
  category: Exclude<Category, 'semua'>
  badge: string | null
  gradient: string
}

const templates: Template[] = [
  { id: 1,  name: 'Serene Garden',    category: 'floral',    badge: 'Populer', gradient: 'from-[#f0fdf4] to-[#bbf7d0]' },
  { id: 2,  name: 'Ivory Minimal',    category: 'minimalis', badge: 'Baru',    gradient: 'from-[#fafaf9] to-[#e7e5e4]' },
  { id: 3,  name: 'Royal Batik',      category: 'adat',      badge: null,      gradient: 'from-[#fff7ed] to-[#fed7aa]' },
  { id: 4,  name: 'Golden Dusk',      category: 'elegant',   badge: 'Hits',    gradient: 'from-[#fefce8] to-[#fef08a]' },
  { id: 5,  name: 'Sakura Dream',     category: 'floral',    badge: 'Baru',    gradient: 'from-[#fdf2f8] to-[#f5d0fe]' },
  { id: 6,  name: 'Modern Arc',       category: 'modern',    badge: null,      gradient: 'from-[#eff6ff] to-[#bfdbfe]' },
  { id: 7,  name: 'Rustic Wood',      category: 'rustic',    badge: null,      gradient: 'from-[#f9fafb] to-[#d1d5db]' },
  { id: 8,  name: 'Bismillah',        category: 'islami',    badge: 'Populer', gradient: 'from-[#f0fdf4] to-[#a7f3d0]' },
  { id: 9,  name: 'Luxe Noir',        category: 'elegant',   badge: null,      gradient: 'from-[#1c1917] to-[#44403c]' },
  { id: 10, name: 'Pastel Love',      category: 'floral',    badge: 'Baru',    gradient: 'from-[#fff1f2] to-[#fecdd3]' },
  { id: 11, name: 'Blossom Garden',   category: 'floral',    badge: null,      gradient: 'from-[#fce7f3] to-[#fbcfe8]' },
  { id: 12, name: 'Midnight Blue',    category: 'modern',    badge: 'Baru',    gradient: 'from-[#1e3a5f] to-[#2563eb]' },
  { id: 13, name: 'Earthy Vibes',     category: 'rustic',    badge: null,      gradient: 'from-[#78350f] to-[#92400e]' },
  { id: 14, name: 'Floral Putih',     category: 'minimalis', badge: null,      gradient: 'from-[#f8fafc] to-[#e2e8f0]' },
  { id: 15, name: 'Javanese Classic', category: 'adat',      badge: 'Populer', gradient: 'from-[#451a03] to-[#92400e]' },
  { id: 16, name: 'Al-Falah',         category: 'islami',    badge: null,      gradient: 'from-[#064e3b] to-[#065f46]' },
  { id: 17, name: 'Rose Gold',        category: 'elegant',   badge: 'Hits',    gradient: 'from-[#9f1239] to-[#be185d]' },
  { id: 18, name: 'Nordic Minimal',   category: 'minimalis', badge: null,      gradient: 'from-[#f1f5f9] to-[#cbd5e1]' },
  { id: 19, name: 'Tropical Dream',   category: 'rustic',    badge: null,      gradient: 'from-[#14532d] to-[#166534]' },
  { id: 20, name: 'Cherry Blossom',   category: 'floral',    badge: 'Baru',    gradient: 'from-[#fdf2f8] to-[#fbcfe8]' },
]

const filteredTemplates = computed(() => {
  if (activeFilter.value === 'semua') return templates
  return templates.filter((t) => t.category === activeFilter.value)
})

function badgeVariant(badge: string): 'primary' | 'neutral' {
  return badge === 'Populer' || badge === 'Hits' ? 'primary' : 'neutral'
}
</script>

<template>
  <div>
    <SharedNavbar />

    <!-- ── Mini Hero ──────────────────────────────────────── -->
    <div class="landing-page-hero">
      <div class="landing-container">
        <div ref="heroRef" class="landing-reveal">
          <p class="landing-overline">Koleksi Desain</p>
          <h1 class="landing-h2 mt-3" style="color: var(--color-text-heading)">
            Temukan Tema Undangan yang Sempurna
          </h1>
          <p class="landing-subtitle mt-4 mx-auto">
            30+ desain premium untuk setiap cerita cinta. Filter, preview, dan langsung buat undanganmu.
          </p>
        </div>
      </div>
    </div>

    <!-- ── Filter Bar ─────────────────────────────────────── -->
    <div class="filter-sticky-bar">
      <div class="landing-container--wide">
        <div class="filter-bar">
          <button
            v-for="f in filters"
            :key="f.key"
            class="filter-btn"
            :class="{ 'filter-btn--active': activeFilter === f.key }"
            @click="activeFilter = f.key"
          >
            {{ f.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Template Grid ──────────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg); padding-block-start: 48px">
      <div class="landing-container--wide">
        <div
          ref="gridRef"
          class="landing-reveal template-grid"
        >
          <div
            v-for="tpl in filteredTemplates"
            :key="tpl.id"
            class="template-card"
            data-reveal-child
          >
            <div :class="`template-preview bg-gradient-to-b ${tpl.gradient}`">

              <!-- Badge -->
              <div v-if="tpl.badge" class="template-badge-wrap">
                <Badge
                  :variant="badgeVariant(tpl.badge)"
                  badge-style="solid"
                  size="sm"
                >{{ tpl.badge }}</Badge>
              </div>

              <!-- Hover overlay -->
              <div class="template-overlay">
                <span class="template-overlay-name">{{ tpl.name }}</span>
                <button class="template-demo-btn" type="button">Lihat Demo</button>
              </div>

            </div>
            <p class="template-name">{{ tpl.name }}</p>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredTemplates.length === 0" class="empty-state">
          <p>Belum ada tema untuk kategori ini.</p>
        </div>
      </div>
    </section>

    <!-- ── Custom Design CTA ──────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg-subtle); padding-block: 80px">
      <div class="landing-container">
        <div ref="ctaRef" class="landing-reveal text-center">
          <p class="landing-overline">Mau yang beda?</p>
          <h2 class="landing-h2 mt-3" style="color: var(--color-text-heading)">
            Nggak nemu yang pas?
          </h2>
          <p class="landing-subtitle mt-4 mx-auto">
            Tim desainer kami siap buatkan undangan yang benar-benar unik untukmu — dari nol, sesuai cerita kalian.
          </p>
          <div class="mt-8">
            <Button variant="primary" size="lg">Konsultasi Desain Custom →</Button>
          </div>
        </div>
      </div>
    </section>

    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>

<style scoped>
/* ── Filter sticky bar ───────────────────────────────────── */
.filter-sticky-bar {
  position: sticky;
  top: 64px;
  z-index: 40;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding-block: 14px;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.filter-btn {
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 180ms ease,
    color 180ms ease,
    border-color 180ms ease;
  white-space: nowrap;
  line-height: 1;
}

.filter-btn:hover:not(.filter-btn--active) {
  background: var(--color-bg-subtle);
  border-color: color-mix(in oklch, var(--color-border) 60%, var(--color-neutral) 40%);
}

.filter-btn--active {
  background: var(--color-neutral);
  color: white;
  border-color: var(--color-neutral);
}

/* ── Template grid ───────────────────────────────────────── */
.template-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (min-width: 768px) {
  .template-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .template-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .template-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ── Template card ───────────────────────────────────────── */
.template-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.template-preview {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 220ms cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-sm);
}

.template-preview:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-md);
}

.template-badge-wrap {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.template-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 12px;
  gap: 8px;
  opacity: 0;
  transition: opacity 200ms ease;
}

.template-preview:hover .template-overlay {
  opacity: 1;
}

.template-overlay-name {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  color: white;
  text-align: center;
  line-height: 1.3;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.template-demo-btn {
  padding: 6px 14px;
  border-radius: var(--radius-lg);
  background: white;
  color: var(--color-text-heading);
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 150ms ease;
  line-height: 1;
}

.template-demo-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

.template-name {
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.3;
}

/* ── Empty state ─────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 80px 0;
  font-family: var(--font-ui);
  font-size: 15px;
  color: var(--color-text-secondary);
}
</style>
