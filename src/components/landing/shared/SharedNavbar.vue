<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Navbar from '@/components/organisms/Navbar/Navbar.vue'
import Button from '@/components/atoms/Button/Button.vue'

// ── Props & Emits ────────────────────────────────────────────────────────────

const props = withDefaults(
  defineProps<{
    mode?: 'consumer' | 'business'
    transparent?: boolean
  }>(),
  {
    mode: 'consumer',
    transparent: true,
  }
)

const emit = defineEmits<{
  navigate: [page: string]
  'toggle-mode': [mode: 'consumer' | 'business']
}>()

// ── Scroll / hover state ─────────────────────────────────────────────────────

const isScrolled = ref(false)
const hovering = ref(false)
const showMega = ref(false)
const mobileOpen = ref(false)

const bgActive = computed(
  () => isScrolled.value || showMega.value || mobileOpen.value
)

const pillClasses = computed(() => {
  if (!isScrolled.value && !showMega.value && !mobileOpen.value) {
    // Hero state — transparent, full width
    return 'max-w-[1040px] bg-transparent border border-transparent rounded-none shadow-none'
  }
  if (showMega.value) {
    // Mega menu open — flat top + flat bottom so mega panel connects flush
    return 'max-w-[720px] bg-white border border-[var(--color-border)] rounded-none shadow-none'
  }
  // Scrolled / hovered — flat top (flush to viewport), rounded bottom
  return 'max-w-[720px] bg-white border border-[var(--color-border)] rounded-t-none rounded-b-[20px] shadow-sm'
})

function onScroll() {
  isScrolled.value = window.scrollY > 80
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
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

// ── Navigation ───────────────────────────────────────────────────────────────

function navigate(page: string) {
  mobileOpen.value = false
  emit('navigate', page)
}

function toggleMode(mode: 'consumer' | 'business') {
  emit('toggle-mode', mode)
  navigate(mode)
}

// ── CTA label ────────────────────────────────────────────────────────────────

const ctaLabel = computed(() =>
  props.mode === 'business' ? 'Daftar Reseller' : 'Buat Undangan'
)
const ctaPage = computed(() => (props.mode === 'business' ? 'business' : 'consumer'))

// ── Mega menu icons ──────────────────────────────────────────────────────────

const icons = {
  invite:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  rsvp: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>',
  filter:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65A2.5 2.5 0 0 1 14.5 15H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z"/></svg>',
  ai: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>',
  star: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
}
</script>

<template>
  <div class="shared-navbar-root">
    <!-- Outer positioning layer: fixed, full-width, transparent -->
    <div
      class="fixed top-0 left-0 right-0 z-[100] flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="isScrolled ? 'px-4 py-0' : 'px-0 py-0'"
    >
      <!-- Pill: visual layer — animates max-width, bg, border, radius, shadow -->
      <div
        class="w-full transition-[max-width,background-color,border-color,border-radius,box-shadow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :class="pillClasses"
        @mouseenter="onNavEnter"
        @mouseleave="onNavLeave"
      >
        <!-- DS Navbar: content shell only, no sticky, no visual overrides -->
        <Navbar
          variant="transparent"
          :sticky="false"
          :border="false"
          class="!px-5 !max-w-full"
        >
      <!-- ── Logo ─────────────────────────────────────────────────────────── -->
      <template #start>
        <div
          class="flex items-center w-[150px] h-[48px] cursor-pointer"
          :style="{
            color: bgActive ? 'var(--color-text-heading)' : 'var(--color-text-inverse)',
            transition: 'color var(--duration-slow)',
          }"
          @click="navigate('consumer')"
        >
          <div
            class="w-[150px] h-[48px] bg-current -ml-2"
            style="
              mask: url('/abadikan-wordmark.svg') no-repeat left center / contain;
              -webkit-mask: url('/abadikan-wordmark.svg') no-repeat left center / contain;
            "
          ></div>
        </div>
      </template>

      <!-- ── Center nav ───────────────────────────────────────────────────── -->
      <template #center>
        <!-- Desktop nav — hidden on mobile -->
        <nav
          class="hidden md:flex h-full items-center justify-center gap-[4px]"
          :style="{
            color: bgActive ? 'var(--color-text-heading)' : 'var(--color-text-inverse)',
            transition: 'color var(--duration-slow)',
          }"
        >
          <span
            class="text-[14px] font-[600] cursor-pointer px-[8px] py-[4px] rounded-[4px] transition-colors whitespace-nowrap"
            :class="bgActive ? 'hover:bg-black/[0.06]' : 'hover:bg-white/10'"
            @click="navigate('consumer')"
          >
            Beranda
          </span>

          <!-- Template with mega menu -->
          <div
            class="h-full flex items-center cursor-pointer relative"
            @mouseenter="onMegaEnter"
            @mouseleave="onMegaLeave"
          >
            <span
              class="text-[14px] font-[600] px-[8px] py-[4px] rounded-[4px] transition-colors flex items-center gap-[3px] whitespace-nowrap"
              :class="bgActive ? 'hover:bg-black/[0.06]' : 'hover:bg-white/10'"
              @click="navigate('template')"
            >
              Template
              <svg
                class="w-3 h-3 mt-[1px] transition-transform duration-300"
                :class="showMega ? 'rotate-180' : 'rotate-0'"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <!-- Mega menu panel -->
            <transition
              enter-active-class="transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-show="showMega"
                class="absolute top-[100%] left-1/2 -translate-x-1/2 w-[640px] bg-white rounded-b-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-t-0 border-[var(--color-border)] p-5 pt-6 flex flex-col gap-4 text-left cursor-default -z-10 origin-top"
              >
                <div class="grid grid-cols-3 gap-5 normal-case tracking-normal">
                  <!-- Column 1: Produk -->
                  <div>
                    <h4
                      class="text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider mb-4 uppercase"
                    >
                      Produk
                    </h4>
                    <div class="flex flex-col gap-3">
                      <a
                        href="#"
                        class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[var(--color-primary)] mt-0.5 shrink-0"
                          v-html="icons.invite"
                        ></div>
                        <div>
                          <div
                            class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                          >
                            Undangan Digital
                          </div>
                          <div
                            class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 text-balance leading-snug"
                          >
                            Undangan elegan dan interaktif siap di-share
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[var(--color-primary)] mt-0.5 shrink-0"
                          v-html="icons.rsvp"
                        ></div>
                        <div>
                          <div
                            class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                          >
                            Buku Tamu (RSVP)
                          </div>
                          <div
                            class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 text-balance leading-snug"
                          >
                            Atur otomatisasi dan daftar hadir dengan cerdas
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="flex gap-3 items-start p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[var(--color-primary)] mt-0.5 shrink-0"
                          v-html="icons.filter"
                        ></div>
                        <div>
                          <div
                            class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                          >
                            Filter Instagram
                          </div>
                          <div
                            class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 text-balance leading-snug"
                          >
                            Ciptakan momen tak terlupakan dengan filter kustom
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <!-- Column 2: Platform -->
                  <div>
                    <h4
                      class="text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider mb-4 uppercase"
                    >
                      Platform
                    </h4>
                    <div class="flex flex-col gap-1">
                      <a
                        href="#"
                        class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[13px] font-[650] text-[var(--color-text-heading)] flex items-center gap-2 group-hover:text-[var(--color-primary)] transition-colors"
                        >
                          AI Generator
                          <span
                            class="bg-[var(--color-primary-light)] text-[var(--color-primary)] text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider"
                          >
                            NEW
                          </span>
                        </div>
                        <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                          Rangkai teks undangan secara otomatis dengan cerdas.
                        </div>
                      </a>
                      <a
                        href="#"
                        class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                        >
                          Otomatisasi WA
                        </div>
                        <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                          Kirim pengingat reservasi lewat WhatsApp secara instan.
                        </div>
                      </a>
                      <a
                        href="#"
                        class="p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-subtle)] group transition-colors"
                      >
                        <div
                          class="text-[13px] font-[650] text-[var(--color-text-heading)] group-hover:text-[var(--color-primary)] transition-colors"
                        >
                          Keamanan Data
                        </div>
                        <div class="text-[12px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                          Sistem terenkripsi untuk melindungi privasi event Anda.
                        </div>
                      </a>
                    </div>
                  </div>

                  <!-- Column 3: Unggulan dark card -->
                  <div class="flex flex-col">
                    <h4
                      class="text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider mb-4 uppercase"
                    >
                      Unggulan
                    </h4>
                    <div
                      class="flex-1 rounded-2xl bg-[var(--color-neutral)] p-4 flex flex-col items-center text-center relative overflow-hidden group/card shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer"
                    >
                      <div
                        class="text-[9px] tracking-widest text-[var(--color-primary)] font-bold mb-2 z-10 uppercase"
                      >
                        The Abadikan Way
                      </div>
                      <div
                        class="text-[16px] font-[600] leading-tight text-[var(--color-text-inverse)] mb-4 z-10 max-w-[150px] tracking-tight"
                      >
                        Momen bahagia Anda pantas dirayakan secara mewah.
                      </div>
                      <div
                        class="mt-auto px-4 py-1.5 border border-white/20 rounded-lg text-[12px] font-semibold text-[var(--color-text-inverse)] z-10 hover:bg-white hover:text-black transition-colors"
                      >
                        Baca Selengkapnya
                      </div>
                      <div
                        class="absolute -bottom-16 w-[200px] h-[140px] bg-[var(--color-primary)] rounded-full blur-[40px] opacity-40 group-hover/card:opacity-60 transition-opacity duration-500"
                      ></div>
                      <div
                        class="absolute bottom-6 w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[#f44336] z-10 shadow-[0_0_20px_var(--color-primary)] flex items-center justify-center text-white scale-0 group-hover/card:scale-100 transition-transform duration-300"
                        v-html="icons.star"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Mega footer row -->
                <div
                  class="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between"
                >
                  <div
                    class="flex gap-6 text-[13px] font-[600] text-[var(--color-text-secondary)]"
                  >
                    <a href="#" class="hover:text-[var(--color-text-heading)] transition-colors"
                      >Integrasi</a
                    >
                    <a href="#" class="hover:text-[var(--color-text-heading)] transition-colors"
                      >Pelajari Fitur</a
                    >
                  </div>
                  <Button variant="primary" size="sm" @click="navigate('template')"
                    >Lihat Semua Template</Button
                  >
                </div>
              </div>
            </transition>
          </div>

          <span
            class="text-[14px] font-[600] cursor-pointer px-[8px] py-[4px] rounded-[4px] transition-colors whitespace-nowrap"
            :class="bgActive ? 'hover:bg-black/[0.06]' : 'hover:bg-white/10'"
            @click="navigate('harga')"
          >
            Harga
          </span>
          <span
            class="text-[14px] font-[600] cursor-pointer px-[8px] py-[4px] rounded-[4px] transition-colors whitespace-nowrap"
            :class="bgActive ? 'hover:bg-black/[0.06]' : 'hover:bg-white/10'"
            @click="navigate('blog')"
          >
            Blog
          </span>
          <span
            class="text-[14px] font-[600] cursor-pointer px-[8px] py-[4px] rounded-[4px] transition-colors whitespace-nowrap"
            :class="bgActive ? 'hover:bg-black/[0.06]' : 'hover:bg-white/10'"
            @click="navigate('tentang-kami')"
          >
            Tentang Kami
          </span>
        </nav>
      </template>

      <!-- ── End: toggle + actions ────────────────────────────────────────── -->
      <template #end>
        <div class="flex items-center gap-2">
          <!-- Consumer / Business pill toggle -->
          <div
            class="mode-toggle hidden md:flex"
            :class="bgActive ? 'mode-toggle--light' : 'mode-toggle--dark'"
          >
            <button
              :class="['mode-toggle__pill', mode === 'consumer' && 'mode-toggle__pill--active']"
              @click="toggleMode('consumer')"
            >
              Untuk Pasangan
            </button>
            <button
              :class="['mode-toggle__pill', mode === 'business' && 'mode-toggle__pill--active']"
              @click="toggleMode('business')"
            >
              Untuk Bisnis
            </button>
          </div>

          <!-- Login button — desktop only -->
          <Button
            variant="outline"
            size="sm"
            class="hidden md:inline-flex"
            :style="
              !bgActive
                ? '--btn-bg: transparent; --btn-text: var(--color-text-inverse); --btn-border: rgba(255,255,255,0.65); --btn-hover-bg: rgba(255,255,255,0.12); --btn-hover-border: rgba(255,255,255,0.85); --btn-hover-text: var(--color-text-inverse);'
                : ''
            "
            @click="navigate('login')"
          >
            Login
          </Button>

          <!-- CTA button — desktop only -->
          <Button
            :variant="bgActive ? 'primary' : 'default'"
            size="sm"
            class="hidden md:inline-flex"
            :style="
              !bgActive
                ? '--btn-bg: var(--color-text-heading); --btn-text: var(--color-text-inverse); --btn-border: var(--color-text-heading); --btn-hover-bg: #000000; --btn-hover-border: #000000;'
                : ''
            "
            @click="navigate(ctaPage)"
          >
            {{ ctaLabel }}
          </Button>

          <!-- Hamburger — mobile only -->
          <button
            class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
            :style="{
              color: bgActive ? 'var(--color-text-heading)' : 'var(--color-text-inverse)',
            }"
            :aria-label="mobileOpen ? 'Tutup menu' : 'Buka menu'"
            @click="mobileOpen = !mobileOpen"
          >
            <svg
              v-if="!mobileOpen"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </template>
        </Navbar>
      </div>
    </div>

    <!-- Spacer: prevents page content sliding under the fixed nav -->
    <div class="h-[72px]" aria-hidden="true" />

    <!-- ── Mobile drawer ───────────────────────────────────────────────────── -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-show="mobileOpen"
        class="md:hidden fixed top-[64px] left-0 right-0 z-[99] bg-white border-b border-[var(--color-border)] shadow-lg px-5 py-4 flex flex-col gap-1"
      >
        <!-- Mode toggle (mobile) -->
        <div class="mode-toggle mode-toggle--light mb-3 self-start">
          <button
            :class="['mode-toggle__pill', mode === 'consumer' && 'mode-toggle__pill--active']"
            @click="toggleMode('consumer')"
          >
            Untuk Pasangan
          </button>
          <button
            :class="['mode-toggle__pill', mode === 'business' && 'mode-toggle__pill--active']"
            @click="toggleMode('business')"
          >
            Untuk Bisnis
          </button>
        </div>

        <!-- Mobile nav links -->
        <button
          v-for="(item, i) in [
            { label: 'Beranda', page: 'consumer' },
            { label: 'Template', page: 'template' },
            { label: 'Harga', page: 'harga' },
            { label: 'Blog', page: 'blog' },
            { label: 'Tentang Kami', page: 'tentang-kami' },
          ]"
          :key="i"
          class="text-left px-3 py-3 rounded-xl text-[15px] font-[500] text-[var(--color-text-heading)] hover:bg-[var(--color-bg-subtle)] transition-colors"
          @click="navigate(item.page)"
        >
          {{ item.label }}
        </button>

        <!-- Mobile actions -->
        <div class="flex gap-2 mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
          <Button variant="outline" size="md" class="flex-1" @click="navigate('login')">
            Login
          </Button>
          <Button variant="primary" size="md" class="flex-1" @click="navigate(ctaPage)">
            {{ ctaLabel }}
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* ── Consumer / Business pill toggle ──────────────────────────────────────── */
.mode-toggle {
  display: flex;
  align-items: center;
  border-radius: var(--radius-full);
  padding: 3px;
  gap: 2px;
  transition:
    background-color var(--duration-slow),
    border-color var(--duration-slow);
}

.mode-toggle--light {
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
}

.mode-toggle--dark {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.mode-toggle__pill {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  cursor: pointer;
  border: none;
  background: transparent;
  transition:
    background-color var(--duration-slow),
    color var(--duration-slow);
  white-space: nowrap;
}

.mode-toggle--light .mode-toggle__pill {
  color: var(--color-text-secondary);
}

.mode-toggle--dark .mode-toggle__pill {
  color: rgba(255, 255, 255, 0.7);
}

.mode-toggle__pill--active {
  background: var(--color-neutral) !important;
  color: var(--color-text-inverse) !important;
}
</style>
