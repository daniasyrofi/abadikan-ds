<script setup lang="ts">
import '@/styles/landing.css'
import { ref, computed } from 'vue'
import SharedNavbar from '@/components/landing/shared/SharedNavbar.vue'
import SharedFloatingWA from '@/components/landing/shared/SharedFloatingWA.vue'
import LandingFooter from '@/components/landing/shared/LandingFooter.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const heroRef     = ref<HTMLElement | null>(null)
const gridRef     = ref<HTMLElement | null>(null)
const weekRef     = ref<HTMLElement | null>(null)
const ctaRef      = ref<HTMLElement | null>(null)

useScrollReveal(heroRef)
useScrollReveal(gridRef)
useScrollReveal(weekRef)
useScrollReveal(ctaRef)

// ── Filter ─────────────────────────────────────────────────
type EventType = 'Semua' | 'Pernikahan' | 'Ulang Tahun' | 'Aqiqah' | 'Event'

const filterOptions: EventType[] = ['Semua', 'Pernikahan', 'Ulang Tahun', 'Aqiqah', 'Event']
const activeFilter = ref<EventType>('Semua')

// ── Portfolio data ─────────────────────────────────────────
interface PortfolioItem {
  id: number
  name: string
  type: Exclude<EventType, 'Semua'>
  date: string
  gradient: string
}

const portfolioItems: PortfolioItem[] = [
  { id: 1,  name: 'Rina & Dimas',        type: 'Pernikahan',  date: 'Desember 2025',  gradient: 'from-rose-100 to-pink-200' },
  { id: 2,  name: 'Ayu & Fahri',         type: 'Pernikahan',  date: 'Januari 2026',   gradient: 'from-blue-50 to-indigo-100' },
  { id: 3,  name: 'Sarah & Budi',        type: 'Pernikahan',  date: 'Maret 2026',     gradient: 'from-emerald-50 to-green-100' },
  { id: 4,  name: 'Cinta & Rahman',      type: 'Pernikahan',  date: 'April 2026',     gradient: 'from-amber-50 to-yellow-100' },
  { id: 5,  name: 'Dewi & Anto',         type: 'Pernikahan',  date: 'Mei 2026',       gradient: 'from-purple-50 to-violet-100' },
  { id: 6,  name: 'Sari & Hendra',       type: 'Pernikahan',  date: 'Juni 2026',      gradient: 'from-orange-50 to-red-100' },
  { id: 7,  name: 'Tim HRD',             type: 'Event',       date: 'Februari 2026',  gradient: 'from-slate-100 to-gray-200' },
  { id: 8,  name: 'Keluarga Besar',      type: 'Aqiqah',      date: 'Maret 2026',     gradient: 'from-teal-50 to-cyan-100' },
  { id: 9,  name: 'Nita & Family',       type: 'Ulang Tahun', date: 'Januari 2026',   gradient: 'from-fuchsia-50 to-pink-100' },
  { id: 10, name: 'Maya & Dani',         type: 'Pernikahan',  date: 'Juli 2026',      gradient: 'from-lime-50 to-green-100' },
  { id: 11, name: 'Rudi & Lina',         type: 'Pernikahan',  date: 'Agustus 2026',   gradient: 'from-sky-50 to-blue-100' },
  { id: 12, name: 'Keluarga Santoso',    type: 'Aqiqah',      date: 'April 2026',     gradient: 'from-stone-50 to-neutral-100' },
]

const filteredItems = computed(() => {
  if (activeFilter.value === 'Semua') return portfolioItems
  return portfolioItems.filter((p) => p.type === activeFilter.value)
})

// Couples of the week — featured cards 1, 2, 3
const featuredItems = portfolioItems.slice(0, 3)

// Badge variant per event type
function typeBadgeVariant(type: string): 'primary' | 'neutral' | 'warning' | 'success' {
  const map: Record<string, 'primary' | 'neutral' | 'warning' | 'success'> = {
    'Pernikahan':  'primary',
    'Aqiqah':      'success',
    'Ulang Tahun': 'warning',
    'Event':       'neutral',
  }
  return map[type] ?? 'neutral'
}
</script>

<template>
  <div>
    <SharedNavbar />

    <!-- ── Mini Hero ──────────────────────────────────────── -->
    <div class="landing-page-hero">
      <div class="landing-container">
        <div ref="heroRef" class="landing-reveal">
          <p class="landing-overline">Karya Nyata</p>
          <h1 class="landing-h2 mt-3" style="color: var(--color-text-heading)">
            Undangan Nyata dari Pasangan Nyata
          </h1>
          <p class="landing-subtitle mt-4 mx-auto">
            Lihat bagaimana ribuan pasangan mengabadikan momen spesial mereka dengan Abadikan.
          </p>
        </div>
      </div>
    </div>

    <!-- ── Filter Bar ─────────────────────────────────────── -->
    <div class="filter-sticky-bar">
      <div class="landing-container">
        <div class="filter-bar">
          <button
            v-for="opt in filterOptions"
            :key="opt"
            class="filter-btn"
            :class="{ 'filter-btn--active': activeFilter === opt }"
            @click="activeFilter = opt"
          >
            {{ opt }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Portfolio Grid ─────────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg); padding-block-start: 56px">
      <div class="landing-container--wide">

        <div ref="gridRef" class="landing-reveal portfolio-grid">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="portfolio-card"
            data-reveal-child
          >
            <!-- Thumbnail -->
            <div :class="`portfolio-thumb bg-gradient-to-br ${item.gradient}`">
              <div class="portfolio-thumb-overlay">
                <a href="#" class="portfolio-view-link">Lihat Undangan →</a>
              </div>
            </div>

            <!-- Card info -->
            <div class="portfolio-info">
              <div class="flex items-center gap-3">
                <Avatar :name="item.name" size="lg" />
                <div class="flex flex-col gap-1 min-w-0">
                  <p class="portfolio-name">{{ item.name }}</p>
                  <p class="portfolio-date">{{ item.date }}</p>
                </div>
              </div>
              <Badge :variant="typeBadgeVariant(item.type)" badge-style="subtle" size="sm">
                {{ item.type }}
              </Badge>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredItems.length === 0" class="empty-state">
          Belum ada portofolio untuk kategori ini.
        </div>

      </div>
    </section>

    <!-- ── Couples of the Week ────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg-subtle); padding-block: 80px">
      <div class="landing-container">
        <div ref="weekRef" class="landing-reveal">

          <div class="text-center mb-10">
            <h3 class="landing-h3" style="color: var(--color-text-heading)">
              ⭐ Undangan Minggu Ini
            </h3>
            <p class="landing-subtitle mt-3 mx-auto">
              Pasangan pilihan redaksi Abadikan untuk minggu ini.
            </p>
          </div>

          <div class="featured-grid">
            <div
              v-for="item in featuredItems"
              :key="item.id"
              class="featured-card"
              data-reveal-child
            >
              <!-- Thumbnail -->
              <div :class="`featured-thumb bg-gradient-to-br ${item.gradient}`">
                <div class="featured-thumb-overlay">
                  <a href="#" class="portfolio-view-link">Lihat Undangan →</a>
                </div>
              </div>

              <!-- Info -->
              <div class="portfolio-info featured-info">
                <div class="flex items-center gap-3">
                  <Avatar :name="item.name" size="lg" />
                  <div class="flex flex-col gap-1 min-w-0">
                    <p class="portfolio-name">{{ item.name }}</p>
                    <p class="portfolio-date">{{ item.date }}</p>
                  </div>
                </div>
                <Badge :variant="typeBadgeVariant(item.type)" badge-style="subtle" size="sm">
                  {{ item.type }}
                </Badge>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg); padding-block: 80px">
      <div class="landing-container">
        <div ref="ctaRef" class="landing-reveal text-center">
          <p class="landing-overline">Giliran kamu</p>
          <h2 class="landing-h2 mt-3" style="color: var(--color-text-heading)">
            Mau undanganmu tampil di sini?
          </h2>
          <p class="landing-subtitle mt-4 mx-auto">
            Bergabunglah bersama ribuan pasangan yang sudah mempercayakan undangan mereka kepada Abadikan.
          </p>
          <div class="mt-8">
            <Button variant="primary" size="lg">Buat Undangan →</Button>
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
}

.filter-btn--active {
  background: var(--color-neutral);
  color: white;
  border-color: var(--color-neutral);
}

/* ── Portfolio grid ──────────────────────────────────────── */
.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ── Portfolio card ──────────────────────────────────────── */
.portfolio-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.portfolio-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.portfolio-thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.portfolio-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 200ms ease;
}

.portfolio-card:hover .portfolio-thumb-overlay {
  opacity: 1;
}

.portfolio-view-link {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  transition: background 150ms ease;
}

.portfolio-view-link:hover {
  background: rgba(255, 255, 255, 0.3);
}

.portfolio-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
}

.portfolio-name {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.portfolio-date {
  font-family: var(--font-ui);
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* ── Featured (couples of the week) ─────────────────────── */
.featured-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .featured-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.featured-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-surface);
  border: 2px solid var(--color-primary);
  box-shadow: var(--shadow-md);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.featured-card:hover {
  box-shadow: 0 12px 40px color-mix(in oklch, var(--color-primary) 20%, transparent);
  transform: translateY(-3px);
}

.featured-thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.featured-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 200ms ease;
}

.featured-card:hover .featured-thumb-overlay {
  opacity: 1;
}

.featured-info {
  padding: 16px;
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
