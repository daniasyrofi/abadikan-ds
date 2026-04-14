# Landing Page Abadikan.id — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild abadikan.id landing page as a modular, DS-driven page inside the existing project, replacing HelloWorld.vue.

**Architecture:** HelloWorld.vue becomes a thin orchestrator importing 7 section components from `src/components/landing/`. Each section is self-contained, uses DS components and tokens, no hardcoded colors. Navbar/hero content is preserved from current HelloWorld.vue but refactored to use DS tokens.

**Tech Stack:** Vue 3, TypeScript, Tailwind CSS v4, @abadikan/ds components (Button, Card, Badge, Avatar, Icon, Container, Stack, Divider, Navbar)

---

## File Structure

```
src/
├── components/
│   ├── HelloWorld.vue              # Refactor → thin orchestrator
│   └── landing/
│       ├── LandingHero.vue         # Navbar + hero + social proof bar
│       ├── LandingFeatures.vue     # 6-feature grid
│       ├── LandingStats.vue        # 4 big stats, dark red bg
│       ├── LandingTestimonials.vue # 3 testimonial cards
│       ├── LandingPricing.vue      # Pricing cards per tema
│       ├── LandingCTA.vue          # Final CTA section
│       └── LandingFooter.vue       # 4-column footer
```

---

### Task 1: Create landing/ directory and LandingHero.vue

**Files:**
- Create: `src/components/landing/LandingHero.vue`
- Modify: `src/components/HelloWorld.vue`

Move ALL current HelloWorld.vue content into LandingHero.vue. Refactor hardcoded colors to DS tokens. HelloWorld.vue becomes the orchestrator (starts with just Hero).

- [ ] **Step 1: Create `src/components/landing/LandingHero.vue`**

Copy the entire current `HelloWorld.vue` content into this new file. Replace hardcoded color values with DS token references:

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Navbar from '@/components/organisms/Navbar/Navbar.vue'
import Button from '@/components/atoms/Button/Button.vue'

const megaIcons = {
  OnCall:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5ZM16 13H8V15H16V13Z"/></svg>',
  Fire: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 23C8.13401 23 5 19.866 5 16C5 12.134 7.6 10.3 8.32235 9.0792C8.68164 8.47228 8.85196 7.78018 8.81432 7.08051L8.74087 5.7144C8.70566 5.05942 9.53032 4.67389 10.0384 5.10705L10.3168 5.34444C11.5348 6.38287 12.3061 7.82071 12.4496 9.38766C12.508 10.0249 13.0457 10.5186 13.6845 10.5284C14.3644 10.5389 14.8878 9.93922 14.7891 9.26426L14.6548 8.34563C14.5422 7.5759 15.3627 7.01633 16.0593 7.3871C17.8427 8.33644 19 10.2241 19 12.3274C19 14.4716 18.0673 16.4897 16.3653 17.8465C15.9388 18.1864 15.5492 18.5759 15.2093 19.0024C14.5358 19.8475 13.3377 20.2443 12.3392 19.9882C11.6666 19.8157 11.2335 19.1419 11.2988 18.4485C11.3789 17.5977 12.0913 16.9663 12.9231 16.9205H13C13.5523 16.9205 14 16.4728 14 15.9205C14 15.3682 13.5523 14.9205 13 14.9205H12C9.79086 14.9205 8 16.7114 8 18.9205C8 20.6186 9.05739 22.187 10.6121 22.808C11.054 22.9845 11.5225 23 12 23Z"/></svg>',
  Status:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5H7V19H3V5ZM10 5H14V19H10V5ZM17 5H21V19H17V5Z"/></svg>',
}

const showMega = ref(false)
const hovering = ref(false)
const isScrolled = ref(false)
const bgActive = computed(() => isScrolled.value || hovering.value || showMega.value)

function onScroll() {
  isScrolled.value = window.scrollY > 10
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  startCounters()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function onNavEnter() {
  hovering.value = true
}
function onNavLeave() {
  hovering.value = false
  showMega.value = false
}
function onMegaEnter() {
  showMega.value = true
}
function onMegaLeave() {
  showMega.value = false
}

const stats = [
  { target: 200, suffix: '+', context: 'Pasangan Indonesia', desc: 'sudah bikin undangan di Abadikan', display: ref(0) },
  { target: 10000, suffix: '+', context: 'Tamu nyata', desc: 'sudah menerima undangan digitalnya', display: ref(0) },
  { target: 176, suffix: 'K+', context: 'Link undangan', desc: 'kali dibuka dan dibaca tamu', display: ref(0) },
  { target: 61, suffix: 'K+', context: 'Pengunjung', desc: 'orang mampir ke halaman undangan', display: ref(0) },
]

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animateCounter(stat: (typeof stats)[0], duration = 1800, delay = 0) {
  setTimeout(() => {
    const start = performance.now()
    function frame(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      stat.display.value = Math.floor(easeOutCubic(progress) * stat.target)
      if (progress < 1) requestAnimationFrame(frame)
      else stat.display.value = stat.target
    }
    requestAnimationFrame(frame)
  }, delay)
}

function startCounters() {
  stats.forEach((stat, i) => animateCounter(stat, 1800, i * 120))
}

function fmt(val: number) {
  return val.toLocaleString('id-ID')
}
</script>

<template>
  <div class="hero-root">
    <div class="pinstripe"></div>
    <div class="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-[color:var(--color-primary-hover)] to-transparent pointer-events-none opacity-40"></div>

    <!-- Navbar — preserved as-is, colors refactored to tokens -->
    <Navbar
      variant="transparent"
      :sticky="true"
      :border="false"
      :class="[
        showMega
          ? '!bg-[var(--color-surface)] !border !border-[var(--color-border)] !rounded-b-none !shadow-none'
          : bgActive
            ? '!bg-[var(--color-surface)] !border !border-[var(--color-border)] !rounded-b-[var(--radius-xl)] !shadow-sm'
            : '!bg-transparent !border !border-transparent !rounded-b-[var(--radius-xl)] !shadow-none',
      ]"
      class="transition-[background-color,box-shadow] duration-[var(--duration-slow)] !px-5"
    >
      <template #start>
        <div
          class="flex items-center w-[160px] h-[50px] cursor-pointer"
          :style="{ color: bgActive ? 'var(--color-text-heading)' : 'var(--color-text-inverse)', transition: `color var(--duration-slow)` }"
        >
          <div
            class="w-[150px] h-[48px] bg-current -ml-2"
            style="mask: url('/abadikan-wordmark.svg') no-repeat left center/contain; -webkit-mask: url('/abadikan-wordmark.svg') no-repeat left center/contain;"
          ></div>
        </div>
      </template>

      <template #center>
        <nav
          class="flex h-full items-center justify-center gap-5 w-[244px]"
          :style="{ color: bgActive ? 'var(--color-text-heading)' : 'var(--color-text-inverse)', transition: `color var(--duration-slow)` }"
          @mouseenter="onNavEnter"
          @mouseleave="onNavLeave"
        >
          <span class="text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap">Tema</span>
          <div class="h-full flex items-center cursor-pointer" @mouseenter="onMegaEnter" @mouseleave="onMegaLeave">
            <span class="text-sm font-medium hover:opacity-70 transition-opacity flex items-center gap-[3px] h-full whitespace-nowrap">
              Fitur
              <svg class="w-3 h-3 mt-[1px] transition-transform duration-[var(--duration-slow)]" :class="showMega ? 'rotate-180' : 'rotate-0'" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <transition
              enter-active-class="transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-[var(--duration-normal)] ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-show="showMega"
                class="absolute top-[100%] left-[-1px] w-[calc(100%+2px)] bg-[var(--color-surface)] rounded-b-[24px] shadow-[var(--shadow-lg)] border border-t-0 border-[var(--color-border)] p-5 pt-6 flex flex-col gap-4 text-left cursor-default -z-10 origin-top"
              >
                <div class="grid grid-cols-3 gap-5 normal-case tracking-normal">
                  <div>
                    <h4 class="text-[10px] font-bold text-[var(--color-text-tertiary)] tracking-wider mb-4 uppercase">Produk</h4>
                    <div class="flex flex-col gap-3">
                      <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors">
                        <div class="text-[var(--color-primary)] mt-0.5" v-html="megaIcons.OnCall"></div>
                        <div>
                          <div class="text-[13px] font-semibold text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors">Undangan Digital</div>
                          <div class="text-xs text-[var(--color-text-secondary)] mt-0.5 mb-1 text-balance">Undangan elegan dan interaktif siap di share</div>
                        </div>
                      </a>
                      <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors">
                        <div class="text-[var(--color-primary)] mt-0.5" v-html="megaIcons.Status"></div>
                        <div>
                          <div class="text-[13px] font-semibold text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors">Buku Tamu (RSVP)</div>
                          <div class="text-xs text-[var(--color-text-secondary)] mt-0.5 text-balance">Atur otomatisasi dan daftar hadir dengan cerdas</div>
                        </div>
                      </a>
                      <a href="#" class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors">
                        <div class="text-[var(--color-primary)] mt-0.5 flex justify-center" v-html="megaIcons.Fire"></div>
                        <div>
                          <div class="text-[13px] font-semibold text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors">Filter Instagram</div>
                          <div class="text-xs text-[var(--color-text-secondary)] mt-0.5 text-balance">Ciptakan momen tak terlupakan dengan filter kustom</div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-[10px] font-bold text-[var(--color-text-tertiary)] tracking-wider mb-4 uppercase">Platform</h4>
                    <div class="flex flex-col gap-1">
                      <a href="#" class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors">
                        <div class="text-[13px] font-semibold text-[var(--color-text-heading)] flex items-center gap-2 group-hover:text-[var(--color-primary)] transition-colors">
                          AI Generator
                          <span class="bg-[var(--color-primary-light)] text-[var(--color-primary)] text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider">NEW</span>
                        </div>
                        <div class="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-snug">Rangkai teks undangan secara otomatis dengan cerdas.</div>
                      </a>
                      <a href="#" class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors">
                        <div class="text-[13px] font-semibold text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors">Otomatisasi WA</div>
                        <div class="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-snug">Kirim pengingat reservasi lewat WhatsApp secara instan.</div>
                      </a>
                      <a href="#" class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors">
                        <div class="text-[13px] font-semibold text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors">Keamanan Data</div>
                        <div class="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-snug">Sistem terenkripsi untuk melindungi privasi event anda.</div>
                      </a>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <h4 class="text-[10px] font-bold text-[var(--color-text-tertiary)] tracking-wider mb-4 uppercase">Unggulan</h4>
                    <div class="flex-1 rounded-2xl bg-[var(--color-neutral)] p-4 flex flex-col items-center text-center relative overflow-hidden group/card shadow-[var(--shadow-highlight)] cursor-pointer">
                      <div class="text-[9px] tracking-widest text-[var(--color-primary)] font-bold mb-2 z-10 uppercase">The Abadikan Way</div>
                      <div class="text-base font-semibold leading-tight text-[var(--color-text-inverse)] mb-4 z-10 max-w-[150px] tracking-tight">Momen bahagia anda pantas dirayakan secara mewah.</div>
                      <div class="mt-auto px-4 py-1.5 border border-white/20 rounded-lg text-xs font-semibold text-[var(--color-text-inverse)] z-10 hover:bg-[var(--color-surface)] hover:text-[var(--color-text-heading)] transition-colors">Baca Selengkapnya</div>
                      <div class="absolute -bottom-16 w-[200px] h-[140px] bg-[var(--color-primary)] rounded-full blur-[40px] opacity-40 group-hover/card:opacity-60 transition-opacity duration-[var(--duration-page)]"></div>
                      <div class="absolute bottom-6 w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-danger)] z-10 shadow-[0_0_20px_var(--color-primary)] flex items-center justify-center text-[var(--color-text-inverse)] scale-0 group-hover/card:scale-100 transition-transform duration-[var(--duration-slow)]" v-html="megaIcons.Fire"></div>
                    </div>
                  </div>
                </div>
                <div class="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div class="flex gap-6 text-[13px] font-semibold text-[var(--color-text-secondary)]">
                    <a href="#" class="hover:text-[var(--color-text-heading)]">Integrasi</a>
                    <a href="#" class="hover:text-[var(--color-text-heading)]">Pelajari Fitur</a>
                  </div>
                  <Button variant="primary" size="sm">Mulai sekarang</Button>
                </div>
              </div>
            </transition>
          </div>
          <span class="text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap">Tentang</span>
          <span class="text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity whitespace-nowrap">Kontak</span>
        </nav>
      </template>

      <template #end>
        <div class="flex items-center gap-2.5 w-[160px] justify-end">
          <Button
            variant="outline"
            size="sm"
            :style="!bgActive ? '--btn-bg: transparent; --btn-text: var(--color-text-inverse); --btn-border: rgba(255,255,255,0.65); --btn-hover-bg: rgba(255,255,255,0.12); --btn-hover-border: rgba(255,255,255,0.85); --btn-hover-text: var(--color-text-inverse);' : ''"
          >Login</Button>
          <Button
            :variant="bgActive ? 'primary' : 'default'"
            size="sm"
            :style="!bgActive ? '--btn-bg: var(--color-text-heading); --btn-text: var(--color-text-inverse); --btn-border: var(--color-text-heading); --btn-hover-bg: #000; --btn-hover-border: #000;' : ''"
          >Daftar</Button>
        </div>
      </template>
    </Navbar>

    <!-- Hero content -->
    <div class="hero-body">
      <div class="px-8 text-center relative z-10" style="font-family: var(--font-display)">
        <h1
          class="text-5xl md:text-[60px] font-extrabold tracking-tight mb-5 leading-[1.15] max-w-[800px] mx-auto"
          style="font-family: var(--font-display); color: var(--color-text-inverse) !important"
        >
          Satu Platform, Ribuan Cara<br />Abadikan Cerita Cintamu.
        </h1>
        <p
          class="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
          style="font-family: var(--font-display); color: rgba(255, 255, 255, 0.9) !important"
        >
          Bikin Undangan Digital dan Kado Interaktif yang memorable,<br />estetik, dan penuh makna.
        </p>
        <Button variant="default" size="lg" class="shadow-lg">Buat Undanganmu</Button>
      </div>
    </div>

    <!-- Social proof bar -->
    <div class="social-bar">
      <div class="social-bar-inner">
        <div v-for="(stat, i) in stats" :key="i" class="social-stat">
          <div class="social-context">{{ stat.context }}</div>
          <div class="social-num">
            {{ fmt(stat.display.value) }}<span class="social-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="social-desc">{{ stat.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-root {
  position: relative;
  width: 100%;
  min-height: 900px;
  max-height: 900px;
  background-color: var(--color-primary);
  overflow-x: hidden;
  font-family: var(--font-display);
  display: flex;
  flex-direction: column;
}

.hero-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.social-bar {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.22);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-5);
}

.social-bar-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 800px;
  margin: 0 auto;
}

.social-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-1);
  padding: 0 var(--space-6);
  position: relative;
}

.social-stat:first-child { padding-left: 0; }
.social-stat:last-child { padding-right: 0; }

.social-stat + .social-stat::before {
  content: '';
  position: absolute;
  left: 0;
  top: var(--space-2);
  bottom: var(--space-2);
  width: 1px;
  background: rgba(255, 255, 255, 0.35);
}

.social-context {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.1px;
  line-height: 1;
}

.social-num {
  font-size: 38px;
  font-weight: 700;
  color: var(--color-text-inverse);
  line-height: 1.05;
  letter-spacing: -1.5px;
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
}

.social-suffix {
  font-size: 38px;
  font-weight: 700;
  opacity: 0.6;
  letter-spacing: -1.5px;
}

.social-desc {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.4;
  max-width: 150px;
}

.pinstripe { display: none; }
</style>
```

- [ ] **Step 2: Refactor HelloWorld.vue to orchestrator**

Replace all content in `src/components/HelloWorld.vue`:

```vue
<script setup lang="ts">
import LandingHero from './landing/LandingHero.vue'
</script>

<template>
  <LandingHero />
</template>
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`
Open browser, confirm hero looks identical to before.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/LandingHero.vue src/components/HelloWorld.vue
git commit -m "refactor: extract LandingHero from HelloWorld, refactor to DS tokens"
```

---

### Task 2: Create LandingFeatures.vue

**Files:**
- Create: `src/components/landing/LandingFeatures.vue`
- Modify: `src/components/HelloWorld.vue`

- [ ] **Step 1: Create `src/components/landing/LandingFeatures.vue`**

```vue
<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const features = [
  { icon: 'RiMailSendLine', title: 'Undangan Digital', desc: 'Undangan elegan dan interaktif yang siap dibagikan ke semua tamu undangan.' },
  { icon: 'RiGroupLine', title: 'Buku Tamu (RSVP)', desc: 'Atur otomatisasi dan daftar hadir tamu dengan sistem yang cerdas.' },
  { icon: 'RiCameraLine', title: 'Filter Instagram', desc: 'Ciptakan momen tak terlupakan dengan filter kustom untuk acaramu.' },
  { icon: 'RiSparklingLine', title: 'AI Generator', desc: 'Rangkai teks undangan secara otomatis dengan bantuan kecerdasan buatan.' },
  { icon: 'RiWhatsappLine', title: 'Otomatisasi WA', desc: 'Kirim pengingat dan konfirmasi lewat WhatsApp secara instan.' },
  { icon: 'RiShieldCheckLine', title: 'Keamanan Data', desc: 'Sistem terenkripsi untuk melindungi privasi data event anda.' },
]
</script>

<template>
  <section class="py-20 bg-[var(--color-bg)]">
    <Container size="xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] tracking-tight mb-4" style="font-family: var(--font-display)">
          Semua yang Kamu Butuhkan
        </h2>
        <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Satu platform lengkap untuk membuat undangan digital yang berkesan dan profesional.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-start p-6 rounded-[var(--radius-xl)] hover:bg-[var(--color-surface)] hover:shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-normal)]"
        >
          <div class="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mb-4">
            <Icon :name="feature.icon" size="lg" />
          </div>
          <h3 class="text-lg font-semibold text-[var(--color-text-heading)] mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </Container>
  </section>
</template>
```

- [ ] **Step 2: Add to HelloWorld.vue**

```vue
<script setup lang="ts">
import LandingHero from './landing/LandingHero.vue'
import LandingFeatures from './landing/LandingFeatures.vue'
</script>

<template>
  <LandingHero />
  <LandingFeatures />
</template>
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`
Confirm features section appears below hero with 6 items in a 3-column grid.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/LandingFeatures.vue src/components/HelloWorld.vue
git commit -m "feat: add LandingFeatures section with 6-feature grid"
```

---

### Task 3: Create LandingStats.vue

**Files:**
- Create: `src/components/landing/LandingStats.vue`
- Modify: `src/components/HelloWorld.vue`

- [ ] **Step 1: Create `src/components/landing/LandingStats.vue`**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Container from '@/components/atoms/Container/Container.vue'

const stats = [
  { target: 200, suffix: '+', label: 'Pasangan Bahagia' },
  { target: 10000, suffix: '+', label: 'Tamu Diundang' },
  { target: 176, suffix: 'K+', label: 'Link Dibuka' },
  { target: 61, suffix: 'K+', label: 'Pengunjung Unik' },
]

const displays = ref(stats.map(() => 0))
const hasAnimated = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animateAll() {
  if (hasAnimated.value) return
  hasAnimated.value = true
  stats.forEach((stat, i) => {
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

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) animateAll() },
    { threshold: 0.3 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="py-20" style="background: color-mix(in oklch, var(--color-primary) 85%, black)">
    <Container size="xl">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div v-for="(stat, i) in stats" :key="stat.label" class="flex flex-col items-center gap-2">
          <div class="text-5xl md:text-6xl font-bold text-[var(--color-text-inverse)] tracking-tight" style="font-family: var(--font-display); font-variant-numeric: tabular-nums">
            {{ fmt(displays[i]) }}<span class="opacity-60">{{ stat.suffix }}</span>
          </div>
          <div class="text-sm font-medium text-white/70">{{ stat.label }}</div>
        </div>
      </div>
    </Container>
  </section>
</template>
```

- [ ] **Step 2: Add to HelloWorld.vue**

```vue
<script setup lang="ts">
import LandingHero from './landing/LandingHero.vue'
import LandingFeatures from './landing/LandingFeatures.vue'
import LandingStats from './landing/LandingStats.vue'
</script>

<template>
  <LandingHero />
  <LandingFeatures />
  <LandingStats />
</template>
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`
Scroll down, confirm stats section with dark red bg and animated counters on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/LandingStats.vue src/components/HelloWorld.vue
git commit -m "feat: add LandingStats section with scroll-triggered counters"
```

---

### Task 4: Create LandingTestimonials.vue

**Files:**
- Create: `src/components/landing/LandingTestimonials.vue`
- Modify: `src/components/HelloWorld.vue`

- [ ] **Step 1: Create `src/components/landing/LandingTestimonials.vue`**

```vue
<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Card from '@/components/molecules/Card/Card.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'

const testimonials = [
  { name: 'Rina & Andi', location: 'Jakarta', quote: 'Undangan digital dari Abadikan bikin tamu kami kagum. Desainnya elegan dan sangat mudah digunakan. Highly recommended!', avatar: '' },
  { name: 'Sari & Budi', location: 'Bandung', quote: 'Fitur RSVP-nya sangat membantu kami mengatur jumlah tamu. Semua berjalan lancar tanpa ribet. Terima kasih Abadikan!', avatar: '' },
  { name: 'Maya & Dimas', location: 'Surabaya', quote: 'Filter Instagram custom dari Abadikan jadi highlight di acara kami. Semua tamu suka dan langsung share ke sosmed mereka.', avatar: '' },
]
</script>

<template>
  <section class="py-20 bg-[var(--color-bg-subtle)]">
    <Container size="xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] tracking-tight mb-4" style="font-family: var(--font-display)">
          Dipercaya Pasangan Indonesia
        </h2>
        <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Cerita bahagia dari mereka yang sudah menggunakan Abadikan.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          v-for="t in testimonials"
          :key="t.name"
          variant="default"
          padding="lg"
          radius="xl"
        >
          <div class="flex flex-col gap-4">
            <p class="text-sm text-[var(--color-text-primary)] leading-relaxed italic">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3 mt-2">
              <Avatar :name="t.name" size="md" />
              <div>
                <div class="text-sm font-semibold text-[var(--color-text-heading)]">{{ t.name }}</div>
                <div class="text-xs text-[var(--color-text-tertiary)]">{{ t.location }}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  </section>
</template>
```

- [ ] **Step 2: Add to HelloWorld.vue**

```vue
<script setup lang="ts">
import LandingHero from './landing/LandingHero.vue'
import LandingFeatures from './landing/LandingFeatures.vue'
import LandingStats from './landing/LandingStats.vue'
import LandingTestimonials from './landing/LandingTestimonials.vue'
</script>

<template>
  <LandingHero />
  <LandingFeatures />
  <LandingStats />
  <LandingTestimonials />
</template>
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`
Confirm 3 testimonial cards with avatars on subtle gray background.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/LandingTestimonials.vue src/components/HelloWorld.vue
git commit -m "feat: add LandingTestimonials section with 3 placeholder cards"
```

---

### Task 5: Create LandingPricing.vue

**Files:**
- Create: `src/components/landing/LandingPricing.vue`
- Modify: `src/components/HelloWorld.vue`

- [ ] **Step 1: Create `src/components/landing/LandingPricing.vue`**

```vue
<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Card from '@/components/molecules/Card/Card.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'

const themes = [
  { name: 'Elegant Rose', price: 'Rp 150.000', badge: null, color: '#be123c' },
  { name: 'Garden Romance', price: 'Rp 250.000', badge: 'Popular', color: '#16a34a' },
  { name: 'Minimalist Gold', price: 'Rp 200.000', badge: 'New', color: '#ca8a04' },
  { name: 'Royal Classic', price: 'Rp 350.000', badge: null, color: '#7c3aed' },
]
</script>

<template>
  <section class="py-20 bg-[var(--color-bg)]">
    <Container size="xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] tracking-tight mb-4" style="font-family: var(--font-display)">
          Pilih Tema Undanganmu
        </h2>
        <p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Koleksi tema premium yang dirancang khusus untuk momen spesialmu.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="theme in themes"
          :key="theme.name"
          variant="outlined"
          padding="none"
          radius="xl"
          hoverable
          :class="theme.badge === 'Popular' ? 'ring-2 ring-[var(--color-primary)]' : ''"
        >
          <template #media>
            <div
              class="h-48 w-full rounded-t-[var(--radius-xl)] flex items-center justify-center"
              :style="{ background: `linear-gradient(135deg, ${theme.color}22, ${theme.color}44)` }"
            >
              <span class="text-4xl font-bold opacity-20" :style="{ color: theme.color }">Preview</span>
            </div>
          </template>
          <div class="p-5 flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold text-[var(--color-text-heading)]">{{ theme.name }}</h3>
              <Badge v-if="theme.badge" :variant="theme.badge === 'Popular' ? 'primary' : 'info'" size="sm">{{ theme.badge }}</Badge>
            </div>
            <div class="text-2xl font-bold text-[var(--color-text-heading)]" style="font-family: var(--font-display)">{{ theme.price }}</div>
            <Button variant="primary" size="sm" full-width>Pilih Tema</Button>
          </div>
        </Card>
      </div>
    </Container>
  </section>
</template>
```

- [ ] **Step 2: Add to HelloWorld.vue**

```vue
<script setup lang="ts">
import LandingHero from './landing/LandingHero.vue'
import LandingFeatures from './landing/LandingFeatures.vue'
import LandingStats from './landing/LandingStats.vue'
import LandingTestimonials from './landing/LandingTestimonials.vue'
import LandingPricing from './landing/LandingPricing.vue'
</script>

<template>
  <LandingHero />
  <LandingFeatures />
  <LandingStats />
  <LandingTestimonials />
  <LandingPricing />
</template>
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`
Confirm 4 pricing cards with gradient previews, badges, and CTA buttons. "Garden Romance" should have a primary ring.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/LandingPricing.vue src/components/HelloWorld.vue
git commit -m "feat: add LandingPricing section with per-theme cards"
```

---

### Task 6: Create LandingCTA.vue

**Files:**
- Create: `src/components/landing/LandingCTA.vue`
- Modify: `src/components/HelloWorld.vue`

- [ ] **Step 1: Create `src/components/landing/LandingCTA.vue`**

```vue
<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Button from '@/components/atoms/Button/Button.vue'
</script>

<template>
  <section class="py-24 bg-[var(--color-primary)] relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 pointer-events-none"></div>
    <Container size="lg" class="relative z-10">
      <div class="text-center flex flex-col items-center gap-6">
        <h2 class="text-3xl md:text-5xl font-bold text-[var(--color-text-inverse)] tracking-tight max-w-2xl" style="font-family: var(--font-display)">
          Siap Abadikan Momen Spesialmu?
        </h2>
        <p class="text-lg text-white/80 max-w-xl">
          Mulai buat undangan digital yang berkesan dalam hitungan menit. Gratis untuk dicoba.
        </p>
        <Button variant="default" size="lg" class="shadow-lg mt-2">Mulai Sekarang — Gratis</Button>
      </div>
    </Container>
  </section>
</template>
```

- [ ] **Step 2: Add to HelloWorld.vue**

```vue
<script setup lang="ts">
import LandingHero from './landing/LandingHero.vue'
import LandingFeatures from './landing/LandingFeatures.vue'
import LandingStats from './landing/LandingStats.vue'
import LandingTestimonials from './landing/LandingTestimonials.vue'
import LandingPricing from './landing/LandingPricing.vue'
import LandingCTA from './landing/LandingCTA.vue'
</script>

<template>
  <LandingHero />
  <LandingFeatures />
  <LandingStats />
  <LandingTestimonials />
  <LandingPricing />
  <LandingCTA />
</template>
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev`
Confirm bold red CTA section with white headline and button.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/LandingCTA.vue src/components/HelloWorld.vue
git commit -m "feat: add LandingCTA section"
```

---

### Task 7: Create LandingFooter.vue

**Files:**
- Create: `src/components/landing/LandingFooter.vue`
- Modify: `src/components/HelloWorld.vue`

- [ ] **Step 1: Create `src/components/landing/LandingFooter.vue`**

```vue
<script setup lang="ts">
import Container from '@/components/atoms/Container/Container.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const columns = [
  {
    title: 'Produk',
    links: ['Undangan Digital', 'Buku Tamu (RSVP)', 'Filter Instagram', 'AI Generator', 'Otomatisasi WA'],
  },
  {
    title: 'Perusahaan',
    links: ['Tentang Kami', 'Kontak', 'Karir', 'Blog'],
  },
  {
    title: 'Bantuan',
    links: ['FAQ', 'Panduan Pengguna', 'Syarat & Ketentuan', 'Kebijakan Privasi'],
  },
]

const socials = [
  { icon: 'RiInstagramLine', label: 'Instagram' },
  { icon: 'RiFacebookCircleLine', label: 'Facebook' },
  { icon: 'RiTiktokLine', label: 'TikTok' },
]
</script>

<template>
  <footer class="pt-16 pb-8" style="background: var(--color-neutral)">
    <Container size="xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        <!-- Brand column -->
        <div class="lg:col-span-2">
          <div
            class="w-[140px] h-[40px] bg-white mb-4"
            style="mask: url('/abadikan-wordmark.svg') no-repeat left center/contain; -webkit-mask: url('/abadikan-wordmark.svg') no-repeat left center/contain;"
          ></div>
          <p class="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
            Platform undangan digital dan website interaktif #1 di Indonesia. Abadikan momen spesialmu.
          </p>
          <div class="flex gap-3">
            <a
              v-for="social in socials"
              :key="social.label"
              href="#"
              class="w-9 h-9 rounded-[var(--radius-md)] bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors duration-[var(--duration-normal)]"
              :aria-label="social.label"
            >
              <Icon :name="social.icon" size="sm" />
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div v-for="col in columns" :key="col.title">
          <h4 class="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">{{ col.title }}</h4>
          <ul class="flex flex-col gap-2.5">
            <li v-for="link in col.links" :key="link">
              <a href="#" class="text-sm text-white/60 hover:text-white transition-colors duration-[var(--duration-normal)]">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-white/40">&copy; 2026 Abadikan. All rights reserved.</p>
        <p class="text-xs text-white/40">Made with love in Indonesia</p>
      </div>
    </Container>
  </footer>
</template>
```

- [ ] **Step 2: Update HelloWorld.vue to final state**

```vue
<script setup lang="ts">
import LandingHero from './landing/LandingHero.vue'
import LandingFeatures from './landing/LandingFeatures.vue'
import LandingStats from './landing/LandingStats.vue'
import LandingTestimonials from './landing/LandingTestimonials.vue'
import LandingPricing from './landing/LandingPricing.vue'
import LandingCTA from './landing/LandingCTA.vue'
import LandingFooter from './landing/LandingFooter.vue'
</script>

<template>
  <LandingHero />
  <LandingFeatures />
  <LandingStats />
  <LandingTestimonials />
  <LandingPricing />
  <LandingCTA />
  <LandingFooter />
</template>
```

- [ ] **Step 3: Verify full page**

Run: `npm run dev`
Scroll through entire page: Hero → Features → Stats → Testimonials → Pricing → CTA → Footer. All sections should flow seamlessly.

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/LandingFooter.vue src/components/HelloWorld.vue
git commit -m "feat: add LandingFooter, complete landing page"
```

---

### Task 8: Final verification and build check

**Files:**
- None (verification only)

- [ ] **Step 1: Run type check**

Run: `npx vue-tsc --noEmit`
Expected: No type errors.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors/warnings. If any, fix them.

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve lint/type issues in landing page components"
```
