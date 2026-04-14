<script setup lang="ts">
import '@/styles/landing.css'
import { ref } from 'vue'
import SharedNavbar from '@/components/landing/shared/SharedNavbar.vue'
import SharedFloatingWA from '@/components/landing/shared/SharedFloatingWA.vue'
import LandingFooter from '@/components/landing/shared/LandingFooter.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import Pagination from '@/components/molecules/Pagination/Pagination.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const heroRef     = ref<HTMLElement | null>(null)
const featuredRef = ref<HTMLElement | null>(null)
const gridRef     = ref<HTMLElement | null>(null)

useScrollReveal(heroRef)
useScrollReveal(featuredRef)
useScrollReveal(gridRef)

// ── Pagination state (static, page 1 of 3) ───────────────
const currentPage = ref(1)
// 3 pages × 9 articles each = 27 total
const totalArticles = 27

// ── Featured article ──────────────────────────────────────
const featured = {
  category: 'Tips Pernikahan',
  title: 'Daftar Tanggal Cantik 2026 untuk Pernikahan',
  excerpt:
    'Memilih tanggal pernikahan yang tepat adalah salah satu keputusan paling penting. Berikut daftar lengkap tanggal cantik 2026 yang bisa jadi pilihan pasangan di Indonesia.',
  date: '5 April 2026',
  readTime: '5 menit baca',
}

// ── Article data ──────────────────────────────────────────
interface Article {
  id: number
  title: string
  category: string
  date: string
  readTime: string
  gradient: string
  excerpt: string
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Panduan Lengkap Undangan Digital: Apa, Kenapa, dan Gimana',
    category: 'Panduan',
    date: '2 Apr 2026',
    readTime: '8 mnt',
    gradient: 'from-blue-50 to-indigo-100',
    excerpt: 'Undangan digital bukan sekadar tren — ini adalah cara cerdas mengelola undangan pernikahanmu. Simak panduan lengkap dari nol.',
  },
  {
    id: 2,
    title: 'Tips Menghemat Budget Pernikahan di 2026',
    category: 'Budget',
    date: '28 Mar 2026',
    readTime: '6 mnt',
    gradient: 'from-green-50 to-emerald-100',
    excerpt: 'Pernikahan impian tidak harus menguras kantong. Berikut strategi cerdas menghemat biaya tanpa mengorbankan kualitas.',
  },
  {
    id: 3,
    title: 'Undangan Digital vs Cetak: Mana yang Lebih Worth It?',
    category: 'Perbandingan',
    date: '25 Mar 2026',
    readTime: '7 mnt',
    gradient: 'from-amber-50 to-yellow-100',
    excerpt: 'Dua format, dua filosofi. Kami bedah tuntas kelebihan dan kekurangan masing-masing agar kamu bisa memilih dengan tepat.',
  },
  {
    id: 4,
    title: '10 Tema Undangan Digital Paling Populer Tahun Ini',
    category: 'Inspirasi',
    date: '20 Mar 2026',
    readTime: '5 mnt',
    gradient: 'from-pink-50 to-rose-100',
    excerpt: 'Dari minimalis elegan hingga floral bold — temukan tema yang mencerminkan kepribadian pasanganmu.',
  },
  {
    id: 5,
    title: 'Cara Kirim Undangan Digital yang Sopan via WhatsApp',
    category: 'Tips',
    date: '15 Mar 2026',
    readTime: '4 mnt',
    gradient: 'from-violet-50 to-purple-100',
    excerpt: 'Ada etika tersendiri dalam mengirim undangan digital. Pelajari cara yang benar agar tamu merasa dihargai.',
  },
  {
    id: 6,
    title: 'Fitur Kado Cashless: Cara Modern Terima Hadiah Pernikahan',
    category: 'Fitur',
    date: '10 Mar 2026',
    readTime: '5 mnt',
    gradient: 'from-orange-50 to-red-100',
    excerpt: 'Amplop fisik sudah usang. Kado cashless membuat tamu lebih mudah memberi dan pasangan lebih mudah menerima.',
  },
  {
    id: 7,
    title: 'Tren Pernikahan Modern 2026 di Indonesia',
    category: 'Tren',
    date: '5 Mar 2026',
    readTime: '6 mnt',
    gradient: 'from-teal-50 to-cyan-100',
    excerpt: 'Micro wedding, intimate celebration, dan digital-first experience — inilah pernikahan modern yang sedang mendominasi.',
  },
  {
    id: 8,
    title: 'Pernikahan Intimate: Panduan Lengkap Simple Wedding',
    category: 'Panduan',
    date: '1 Mar 2026',
    readTime: '9 mnt',
    gradient: 'from-slate-50 to-gray-100',
    excerpt: 'Lebih sedikit tamu, lebih banyak makna. Panduan lengkap merencanakan pernikahan intimate yang penuh kesan.',
  },
  {
    id: 9,
    title: 'Cara Jadi Reseller Undangan Digital dan Raih Jutaan per Bulan',
    category: 'Bisnis',
    date: '25 Feb 2026',
    readTime: '7 mnt',
    gradient: 'from-lime-50 to-green-100',
    excerpt: 'Ubah keahlian desain atau jaringanmu menjadi sumber penghasilan nyata. Bergabung dengan program reseller Abadikan.',
  },
]

// Badge variant per category
function categoryVariant(cat: string): 'primary' | 'neutral' | 'success' | 'warning' {
  const map: Record<string, 'primary' | 'neutral' | 'success' | 'warning'> = {
    'Tips Pernikahan': 'primary',
    'Panduan':         'primary',
    'Inspirasi':       'primary',
    'Tips':            'primary',
    'Budget':          'success',
    'Fitur':           'neutral',
    'Tren':            'neutral',
    'Perbandingan':    'neutral',
    'Bisnis':          'warning',
  }
  return map[cat] ?? 'neutral'
}
</script>

<template>
  <div>
    <SharedNavbar />

    <!-- ── Mini Hero ──────────────────────────────────────── -->
    <div class="landing-page-hero">
      <div class="landing-container">
        <div ref="heroRef" class="landing-reveal">
          <p class="landing-overline">Inspirasi & Panduan</p>
          <h1 class="landing-h2 mt-3" style="color: var(--color-text-heading)">
            Blog & Inspirasi Pernikahan
          </h1>
          <p class="landing-subtitle mt-4 mx-auto">
            Tips, inspirasi, dan panduan untuk hari spesial kalian.
          </p>
        </div>
      </div>
    </div>

    <!-- ── Featured Article ───────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg); padding-block: 64px">
      <div class="landing-container">
        <div ref="featuredRef" class="landing-reveal">

          <p class="landing-overline mb-6">Artikel Pilihan</p>

          <div class="featured-card">
            <!-- Image placeholder -->
            <div class="featured-image bg-gradient-to-br from-rose-100 to-pink-200"></div>

            <!-- Content -->
            <div class="featured-content">
              <div class="flex items-center gap-3 mb-4">
                <Badge :variant="categoryVariant(featured.category)" badge-style="subtle" size="sm">
                  {{ featured.category }}
                </Badge>
                <span class="article-meta">{{ featured.date }}</span>
                <span class="article-meta">·</span>
                <span class="article-meta">{{ featured.readTime }}</span>
              </div>

              <h2 class="featured-title">{{ featured.title }}</h2>
              <p class="featured-excerpt">{{ featured.excerpt }}</p>

              <a href="#" class="article-read-link">Baca Selengkapnya →</a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ── Article Grid ───────────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg-subtle); padding-block: 64px">
      <div class="landing-container">

        <div ref="gridRef" class="landing-reveal">
          <p class="landing-overline mb-6">Semua Artikel</p>

          <div class="article-grid">
            <article
              v-for="article in articles"
              :key="article.id"
              class="article-card"
              data-reveal-child
            >
              <!-- Thumbnail -->
              <div :class="`article-thumb bg-gradient-to-br ${article.gradient}`"></div>

              <!-- Content -->
              <div class="article-body">
                <div class="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge :variant="categoryVariant(article.category)" badge-style="subtle" size="sm">
                    {{ article.category }}
                  </Badge>
                </div>

                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-excerpt">{{ article.excerpt }}</p>

                <div class="article-footer">
                  <div class="flex items-center gap-2">
                    <span class="article-meta">{{ article.date }}</span>
                    <span class="article-meta">·</span>
                    <span class="article-meta">{{ article.readTime }}</span>
                  </div>
                  <a href="#" class="article-read-link-sm">Baca →</a>
                </div>
              </div>

            </article>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-12">
          <Pagination
            v-model="currentPage"
            :total="totalArticles"
            :per-page="9"
            :max-visible-pages="5"
            size="md"
          />
        </div>

      </div>
    </section>

    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>

<style scoped>
/* ── Featured card ───────────────────────────────────────── */
.featured-card {
  display: grid;
  grid-template-columns: 1fr;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

@media (min-width: 768px) {
  .featured-card {
    grid-template-columns: 1fr 1fr;
  }
}

.featured-image {
  height: 300px;
}

@media (min-width: 768px) {
  .featured-image {
    height: 100%;
    min-height: 300px;
  }
}

.featured-content {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-title {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw + 0.5rem, 1.625rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--color-text-heading);
  margin-bottom: 12px;
}

.featured-excerpt {
  font-family: var(--font-ui);
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
}

/* ── Article grid ────────────────────────────────────────── */
.article-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 640px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .article-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ── Article card ────────────────────────────────────────── */
.article-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.article-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.article-thumb {
  height: 200px;
  flex-shrink: 0;
}

.article-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}

.article-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--color-text-heading);
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-excerpt {
  font-family: var(--font-ui);
  font-size: 13px;
  line-height: 1.65;
  color: var(--color-text-secondary);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

.article-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
}

/* ── Shared typography ───────────────────────────────────── */
.article-meta {
  font-family: var(--font-ui);
  font-size: 12px;
  color: var(--color-text-secondary);
}

.article-read-link {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity 150ms ease;
}

.article-read-link:hover {
  opacity: 0.75;
  text-decoration: underline;
}

.article-read-link-sm {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 150ms ease;
}

.article-read-link-sm:hover {
  opacity: 0.75;
  text-decoration: underline;
}
</style>
