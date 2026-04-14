<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

type Category = 'semua' | 'minimalis' | 'floral' | 'elegant' | 'adat' | 'islami' | 'rustic' | 'modern'

interface FilterOption { key: Category; label: string }
const filters: FilterOption[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'minimalis', label: 'Minimalis' },
  { key: 'floral', label: 'Floral' },
  { key: 'elegant', label: 'Elegant' },
  { key: 'adat', label: 'Adat' },
  { key: 'islami', label: 'Islami' },
  { key: 'rustic', label: 'Rustic' },
  { key: 'modern', label: 'Modern' },
]
const activeFilter = ref<Category>('semua')

const templates = [
  { id: 1,  name: 'Serene Garden',  category: 'floral',    badge: 'Populer', gradient: 'linear-gradient(160deg,#f0fdf4,#bbf7d0)' },
  { id: 2,  name: 'Ivory Minimal',  category: 'minimalis', badge: 'Baru',    gradient: 'linear-gradient(160deg,#fafaf9,#e7e5e4)' },
  { id: 3,  name: 'Royal Batik',    category: 'adat',      badge: null,      gradient: 'linear-gradient(160deg,#fff7ed,#fed7aa)' },
  { id: 4,  name: 'Golden Dusk',    category: 'elegant',   badge: 'Hits',    gradient: 'linear-gradient(160deg,#fefce8,#fef08a)' },
  { id: 5,  name: 'Sakura Dream',   category: 'floral',    badge: 'Baru',    gradient: 'linear-gradient(160deg,#fdf2f8,#f5d0fe)' },
  { id: 6,  name: 'Modern Arc',     category: 'modern',    badge: null,      gradient: 'linear-gradient(160deg,#eff6ff,#bfdbfe)' },
  { id: 7,  name: 'Rustic Wood',    category: 'rustic',    badge: null,      gradient: 'linear-gradient(160deg,#f9fafb,#d1d5db)' },
  { id: 8,  name: 'Bismillah',      category: 'islami',    badge: 'Populer', gradient: 'linear-gradient(160deg,#f0fdf4,#a7f3d0)' },
  { id: 9,  name: 'Luxe Noir',      category: 'elegant',   badge: null,      gradient: 'linear-gradient(160deg,#1c1917,#44403c)' },
  { id: 10, name: 'Pastel Love',    category: 'floral',    badge: 'Baru',    gradient: 'linear-gradient(160deg,#fff1f2,#fecdd3)' },
]

const filteredTemplates = computed(() =>
  activeFilter.value === 'semua'
    ? templates
    : templates.filter(t => t.category === activeFilter.value)
)

function badgeVariant(badge: string): 'primary' | 'neutral' {
  return badge === 'Populer' || badge === 'Hits' ? 'primary' : 'neutral'
}

// GSAP horizontal scroll — desktop only, lazy loaded
const trackRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
let gsapCtx: any = null

async function initGSAP() {
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches
  if (!isDesktop || !trackRef.value || !containerRef.value) return

  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)

  const cards = trackRef.value.querySelectorAll<HTMLElement>('.gallery-card')
  if (!cards.length) return

  const totalWidth = trackRef.value.scrollWidth
  const viewW = containerRef.value.offsetWidth

  gsapCtx = gsap.context(() => {
    gsap.to(trackRef.value, {
      x: -(totalWidth - viewW),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth - viewW}`,
        anticipatePin: 1,
      },
    })

    // Stagger reveal cards on enter
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      stagger: 0.06,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 80%',
        once: true,
      },
    })
  }, containerRef.value)
}

onMounted(() => {
  // Only init GSAP on desktop, after first paint
  requestAnimationFrame(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      initGSAP()
    }
  })
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section gallery-section"
  >
    <!-- Header + filter — always in normal flow -->
    <div class="landing-container">
      <div class="gallery-header" data-reveal-child>
        <p class="landing-overline">50+ tema premium</p>
        <h2 class="landing-h2 gallery-h2">
          Pilih yang Paling "Kalian Banget"
        </h2>
        <p class="landing-subtitle gallery-sub">
          Setiap tema dibuat detail, bukan template asal-asalan. Tinggal pilih, masukin nama kalian, langsung jadi.
        </p>
      </div>

      <!-- Filter bar — scrollable on mobile -->
      <div class="filter-wrap">
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

    <!-- Mobile: snap carousel (hidden ≥1024px) -->
    <div class="gallery-mobile snap-carousel">
      <div
        v-for="tpl in filteredTemplates"
        :key="tpl.id + '-m'"
        class="snap-card gallery-snap-card"
      >
        <div class="template-preview" :style="{ background: tpl.gradient }">
          <div v-if="tpl.badge" class="template-badge-wrap">
            <Badge :variant="badgeVariant(tpl.badge)" badge-style="solid" size="sm">{{ tpl.badge }}</Badge>
          </div>
        </div>
        <p class="template-name">{{ tpl.name }}</p>
      </div>
    </div>

    <!-- Desktop: GSAP horizontal (hidden <1024px) -->
    <div ref="containerRef" class="gallery-desktop">
      <div ref="trackRef" class="gallery-track">
        <div
          v-for="tpl in filteredTemplates"
          :key="tpl.id"
          class="gallery-card"
        >
          <div class="template-preview" :style="{ background: tpl.gradient }">
            <div v-if="tpl.badge" class="template-badge-wrap">
              <Badge :variant="badgeVariant(tpl.badge)" badge-style="solid" size="sm">{{ tpl.badge }}</Badge>
            </div>
            <div class="template-overlay">
              <button class="template-demo-btn" type="button">Lihat Demo</button>
            </div>
          </div>
          <p class="template-name">{{ tpl.name }}</p>
        </div>
      </div>
    </div>

    <!-- Bottom CTAs -->
    <div class="landing-container">
      <div class="gallery-cta">
        <Button variant="primary" size="md">Lihat Semua Tema →</Button>
        <a href="#" class="gallery-custom-link">Mau desain yang bener-bener beda? Konsultasi custom →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-section {
  background: var(--color-bg-subtle);
  overflow: hidden;
}

.gallery-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.gallery-h2 {
  color: var(--color-text-heading);
}

.gallery-sub {
  text-align: center;
  margin-inline: auto;
}

/* ── Filter bar ──────────────────────────────────────────── */
.filter-wrap {
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  padding-bottom: 4px;
  margin-bottom: 2rem;
}
.filter-wrap::-webkit-scrollbar { display: none; }

.filter-bar {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  width: max-content;
  margin-inline: auto;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
  white-space: nowrap;
}
.filter-btn:hover:not(.filter-btn--active) {
  background: var(--color-bg-subtle);
}
.filter-btn--active {
  background: var(--color-neutral);
  color: #fff;
  border-color: var(--color-neutral);
}
.filter-btn:active {
  transform: scale(0.96);
  transition-duration: 80ms;
}

/* ── Shared card styles ──────────────────────────────────── */
.template-preview {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-xl);
  overflow: hidden;
  cursor: pointer;
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease;
  box-shadow: var(--shadow-sm);
}
.template-preview:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-md);
}
.template-preview:active {
  transform: scale(0.98);
  transition-duration: 80ms;
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
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;
  opacity: 0;
  transition: opacity 200ms ease;
}
.template-preview:hover .template-overlay { opacity: 1; }

.template-demo-btn {
  padding: 6px 14px;
  border-radius: var(--radius-lg);
  background: #fff;
  color: var(--color-text-heading);
  font-family: var(--font-ui);
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.template-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-align: center;
  margin-top: 0.5rem;
}

/* ── Mobile carousel ─────────────────────────────────────── */
.gallery-mobile {
  display: flex;
  padding-inline: clamp(20px, 5vw, 32px);
}
.gallery-snap-card {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .gallery-mobile { display: none !important; }
}

/* ── Desktop GSAP horizontal ─────────────────────────────── */
.gallery-desktop {
  display: none;
  overflow: hidden;
  width: 100%;
}

@media (min-width: 1024px) {
  .gallery-desktop { display: block; }
}

.gallery-track {
  display: flex;
  gap: 1.25rem;
  padding-inline: clamp(32px, 10%, 200px);
  width: max-content;
}

.gallery-card {
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
}

/* ── Bottom CTA ──────────────────────────────────────────── */
.gallery-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

@media (min-width: 640px) {
  .gallery-cta {
    flex-direction: row;
    justify-content: center;
  }
}

.gallery-custom-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 150ms ease;
}
.gallery-custom-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
