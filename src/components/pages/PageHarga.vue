<script setup lang="ts">
import '@/styles/landing.css'
import { ref } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import SharedNavbar from '@/components/landing/shared/SharedNavbar.vue'
import SharedFloatingWA from '@/components/landing/shared/SharedFloatingWA.vue'
import LandingFooter from '@/components/landing/shared/LandingFooter.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const heroRef    = ref<HTMLElement | null>(null)
const cardsRef   = ref<HTMLElement | null>(null)
const tableRef   = ref<HTMLElement | null>(null)
const payRef     = ref<HTMLElement | null>(null)
const faqRef     = ref<HTMLElement | null>(null)
const miniCtaRef = ref<HTMLElement | null>(null)

useScrollReveal(heroRef)
useScrollReveal(cardsRef)
useScrollReveal(tableRef)
useScrollReveal(payRef)
useScrollReveal(faqRef)
useScrollReveal(miniCtaRef)

// ── Pricing tiers (same as LandingPricing) ────────────────
interface Tier {
  id: string
  badgeLabel: string
  badgeVariant: 'neutral' | 'primary' | 'warning'
  badgeStyle: 'subtle' | 'solid' | 'outline'
  oldPrice: string | null
  price: string
  discountBadge: string | null
  desc: string
  features: string[]
  ctaLabel: string
  ctaVariant: 'outline' | 'primary'
  subCta: string | null
  highlight: boolean
}

const tiers: Tier[] = [
  {
    id: 'gratis',
    badgeLabel: 'Coba Dulu',
    badgeVariant: 'neutral',
    badgeStyle: 'subtle',
    oldPrice: null,
    price: 'Rp 0',
    discountBadge: null,
    desc: 'Kenalan dulu sama Abadikan, gratis.',
    features: [
      '1 Undangan standar',
      'Aktif 7 hari (trial)',
      'Kuota 50 tamu',
      '3 foto galeri',
      '5 pilihan tema',
      'Musik latar',
      'Ucapan & doa',
      'RSVP dasar',
    ],
    ctaLabel: 'Daftar Gratis →',
    ctaVariant: 'outline',
    subCta: null,
    highlight: false,
  },
  {
    id: 'premium',
    badgeLabel: '⭐ Paling Populer',
    badgeVariant: 'primary',
    badgeStyle: 'solid',
    oldPrice: 'Rp 149.000',
    price: 'Rp 89.000',
    discountBadge: '40% OFF',
    desc: 'Semua yang kamu butuhkan untuk undangan yang sempurna.',
    features: [
      'Semua fitur Gratis, plus:',
      'Aktif selamanya (sekali bayar)',
      'Unlimited kuota tamu',
      'Unlimited foto & video galeri',
      'Semua tema premium',
      'Smart WhatsApp Broadcast',
      'RSVP real-time + dashboard',
      'Kado Cashless (amplop digital)',
      'Wishlist Kado',
      'QR Code Check-in',
      'Countdown + Google Calendar',
      'Live Streaming link',
      'Custom warna & font',
      'Layar penyambut tamu',
    ],
    ctaLabel: 'Pilih Premium →',
    ctaVariant: 'primary',
    subCta: 'Pilihan 70% pasangan',
    highlight: true,
  },
  {
    id: 'exclusive',
    badgeLabel: 'Untuk yang Mau Beda',
    badgeVariant: 'warning',
    badgeStyle: 'subtle',
    oldPrice: 'Rp 499.000',
    price: 'Rp 349.000',
    discountBadge: null,
    desc: 'Undangan yang benar-benar satu-satunya di dunia.',
    features: [
      'Semua fitur Premium, plus:',
      'Custom desain by tim Abadikan',
      'Custom domain (namakamu.com)',
      'Priority support (respons < 1 jam)',
      'Konsultasi desain 1-on-1',
      'Revisi unlimited',
      'Story Instagram custom',
    ],
    ctaLabel: 'Konsultasi Dulu →',
    ctaVariant: 'outline',
    subCta: null,
    highlight: false,
  },
]

const boldFeatures = new Set([
  'Aktif selamanya (sekali bayar)',
  'Unlimited kuota tamu',
  'Kado Cashless (amplop digital)',
  'Smart WhatsApp Broadcast',
  'QR Code Check-in',
])

// ── Comparison table rows ─────────────────────────────────
interface CompareRow {
  feature: string
  gratis: string
  premium: string
  exclusive: string
}

const compareRows: CompareRow[] = [
  { feature: 'Jumlah undangan aktif',    gratis: '1',        premium: '1',                  exclusive: '1' },
  { feature: 'Masa aktif',               gratis: '7 hari',   premium: 'Selamanya ✅',        exclusive: 'Selamanya ✅' },
  { feature: 'Kuota tamu',               gratis: '50 tamu',  premium: 'Unlimited ✅',        exclusive: 'Unlimited ✅' },
  { feature: 'Galeri foto',              gratis: '3 foto',   premium: 'Unlimited ✅',        exclusive: 'Unlimited ✅' },
  { feature: 'Pilihan tema',             gratis: '5 tema',   premium: 'Semua tema ✅',       exclusive: 'Semua tema ✅' },
  { feature: 'Custom tema',              gratis: '❌',        premium: '❌',                  exclusive: '✅ By tim Abadikan' },
  { feature: 'Musik latar',              gratis: '✅',        premium: '✅',                  exclusive: '✅' },
  { feature: 'RSVP dasar',               gratis: '✅',        premium: '✅',                  exclusive: '✅' },
  { feature: 'RSVP real-time dashboard', gratis: '❌',        premium: '✅',                  exclusive: '✅' },
  { feature: 'WA Broadcast',             gratis: '❌',        premium: '✅',                  exclusive: '✅' },
  { feature: 'Kado cashless',            gratis: '❌',        premium: '✅',                  exclusive: '✅' },
  { feature: 'QR Check-in',              gratis: '❌',        premium: '✅',                  exclusive: '✅' },
  { feature: 'Custom domain',            gratis: '❌',        premium: '❌',                  exclusive: '✅' },
  { feature: 'Priority support',         gratis: '❌',        premium: '❌',                  exclusive: '✅' },
  { feature: 'Revisi desain',            gratis: '❌',        premium: '❌',                  exclusive: 'Unlimited ✅' },
]

// ── Payment methods ───────────────────────────────────────
const paymentMethods = [
  { label: 'QRIS',       icon: '🔲' },
  { label: 'BCA',        icon: '🏦' },
  { label: 'Mandiri',    icon: '🏦' },
  { label: 'BRI',        icon: '🏦' },
  { label: 'BNI',        icon: '🏦' },
  { label: 'BSI',        icon: '🏦' },
  { label: 'GoPay',      icon: '💚' },
  { label: 'OVO',        icon: '💜' },
  { label: 'DANA',       icon: '💙' },
  { label: 'ShopeePay',  icon: '🧡' },
]

// ── FAQ ───────────────────────────────────────────────────
interface FaqItem {
  q: string
  a: string
}

const faqItems: FaqItem[] = [
  {
    q: 'Apakah ada biaya berlangganan?',
    a: 'Tidak sama sekali. Semua paket adalah one-time payment. Setelah bayar, kamu tidak perlu bayar lagi.',
  },
  {
    q: 'Bisakah saya upgrade paket?',
    a: 'Bisa! Kamu bisa upgrade dari Gratis ke Premium atau Exclusive kapan saja. Cukup bayar selisih harganya.',
  },
  {
    q: 'Bagaimana cara bayar?',
    a: 'QRIS, transfer bank (BCA, Mandiri, BRI, BNI, BSI), atau e-wallet (GoPay, OVO, DANA, ShopeePay).',
  },
  {
    q: 'Adakah garansi uang kembali?',
    a: 'Ada! Garansi 7 hari uang kembali untuk paket Premium dan Exclusive. Tidak puas? Kami refund 100%.',
  },
]

const openFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<template>
  <div>
    <SharedNavbar />

    <!-- ── Mini Hero ──────────────────────────────────────── -->
    <div class="landing-page-hero">
      <div class="landing-container">
        <div ref="heroRef" class="landing-reveal">
          <p class="landing-overline">Transparan & Jujur</p>
          <h1 class="landing-h2 mt-3" style="color: var(--color-text-heading)">
            Harga yang Masuk Akal
          </h1>
          <p class="landing-subtitle mt-4 mx-auto">
            Transparan dari awal. Tidak ada biaya tersembunyi. Tidak ada langganan.
          </p>
        </div>
      </div>
    </div>

    <!-- ── Pricing Cards ──────────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg)">
      <div class="landing-container">

        <div
          ref="cardsRef"
          class="landing-reveal grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          <div
            v-for="tier in tiers"
            :key="tier.id"
            data-reveal-child
            class="flex"
            :style="tier.highlight ? 'transform: scale(1.03); transform-origin: center top;' : ''"
          >
            <div
              class="flex flex-col w-full rounded-[var(--radius-xl)] bg-[var(--color-surface)]"
              :style="
                tier.highlight
                  ? 'border: 2px solid var(--color-primary); box-shadow: var(--shadow-md);'
                  : 'border: 1px solid var(--color-border);'
              "
            >
              <div class="p-7 flex flex-col gap-5 flex-1">

                <!-- Badge + discount -->
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <Badge :variant="tier.badgeVariant" :badge-style="tier.badgeStyle" size="sm">
                    {{ tier.badgeLabel }}
                  </Badge>
                  <span
                    v-if="tier.discountBadge"
                    class="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style="background: var(--color-primary); color: var(--color-text-inverse)"
                  >
                    {{ tier.discountBadge }}
                  </span>
                </div>

                <!-- Price -->
                <div class="flex flex-col gap-1">
                  <del v-if="tier.oldPrice" class="text-[14px]" style="color: var(--color-text-secondary)">
                    {{ tier.oldPrice }}
                  </del>
                  <div
                    class="font-extrabold leading-none tracking-tight"
                    style="font-family: var(--font-display); font-size: 2.5rem; color: var(--color-text-heading)"
                  >
                    {{ tier.price }}
                  </div>
                </div>

                <!-- Desc -->
                <p class="text-[14px] leading-relaxed" style="color: var(--color-text-secondary)">
                  {{ tier.desc }}
                </p>

                <!-- Features -->
                <ul class="flex flex-col gap-2 flex-1">
                  <li
                    v-for="feature in tier.features"
                    :key="feature"
                    class="flex items-start gap-2 text-[13px]"
                    style="color: var(--color-text-primary)"
                  >
                    <span class="mt-px shrink-0 font-bold text-[13px]" style="color: var(--color-primary)">✓</span>
                    <span :class="{ 'font-semibold': tier.highlight && boldFeatures.has(feature) }">
                      {{ feature }}
                    </span>
                  </li>
                </ul>

                <!-- CTA -->
                <div class="flex flex-col gap-2 pt-2">
                  <Button :variant="tier.ctaVariant" size="md" full-width>
                    {{ tier.ctaLabel }}
                  </Button>
                  <p v-if="tier.subCta" class="text-center text-[12px]" style="color: var(--color-text-secondary)">
                    {{ tier.subCta }}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Guarantee -->
        <div class="flex items-center justify-center gap-2 mt-10">
          <span class="text-lg">🛡️</span>
          <p class="text-[14px] text-center" style="color: var(--color-text-secondary)">
            Garansi 7 hari uang kembali. Nggak puas? Kami refund 100%. Tanpa drama.
          </p>
        </div>

      </div>
    </section>

    <!-- ── Comparison Table ───────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg-subtle)">
      <div class="landing-container">

        <div ref="tableRef" class="landing-reveal">
          <div class="text-center mb-10">
            <p class="landing-overline">Detail lengkap</p>
            <h2 class="landing-h2 mt-3" style="color: var(--color-text-heading)">
              Perbandingan Lengkap Fitur
            </h2>
          </div>

          <div class="compare-table-wrap">
            <table class="compare-table">
              <thead>
                <tr>
                  <th class="compare-th compare-th--feature">Fitur</th>
                  <th class="compare-th">Gratis</th>
                  <th class="compare-th compare-th--paid">Premium</th>
                  <th class="compare-th compare-th--paid">Exclusive</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, i) in compareRows"
                  :key="row.feature"
                  :class="['compare-row', i % 2 === 0 ? 'compare-row--even' : '']"
                >
                  <td class="compare-td compare-td--feature">{{ row.feature }}</td>
                  <td class="compare-td compare-td--center">{{ row.gratis }}</td>
                  <td class="compare-td compare-td--center compare-td--paid">{{ row.premium }}</td>
                  <td class="compare-td compare-td--center compare-td--paid">{{ row.exclusive }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Payment Methods ────────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg); padding-block: 80px">
      <div class="landing-container">
        <div ref="payRef" class="landing-reveal text-center">
          <p class="landing-overline">Mudah & Fleksibel</p>
          <h2 class="landing-h2 mt-3 mb-8" style="color: var(--color-text-heading)">
            Metode Pembayaran
          </h2>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <div
              v-for="method in paymentMethods"
              :key="method.label"
              class="pay-pill"
              data-reveal-child
            >
              <span>{{ method.icon }}</span>
              <span>{{ method.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FAQ ────────────────────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg-subtle); padding-block: 80px">
      <div class="landing-container--narrow" style="max-width: 720px; margin-inline: auto; padding-inline: clamp(20px, 5vw, 64px)">
        <div ref="faqRef" class="landing-reveal">
          <div class="text-center mb-10">
            <p class="landing-overline">Ada pertanyaan?</p>
            <h2 class="landing-h2 mt-3" style="color: var(--color-text-heading)">
              Yang Sering Ditanya
            </h2>
          </div>

          <div class="faq-list">
            <div
              v-for="(item, i) in faqItems"
              :key="i"
              class="faq-item"
              data-reveal-child
            >
              <button
                class="faq-question"
                :aria-expanded="openFaq === i"
                @click="toggleFaq(i)"
              >
                <span>{{ item.q }}</span>
                <span class="faq-chevron" :class="{ 'faq-chevron--open': openFaq === i }">▾</span>
              </button>
              <div v-show="openFaq === i" class="faq-answer">
                {{ item.a }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Mini CTA ───────────────────────────────────────── -->
    <section class="landing-section" style="background: var(--color-bg); padding-block: 80px">
      <div class="landing-container">
        <div ref="miniCtaRef" class="landing-reveal text-center">
          <h2 class="landing-h2" style="color: var(--color-text-heading)">Siap Mulai?</h2>
          <p class="landing-subtitle mt-4 mx-auto">
            Bergabung dengan ribuan pasangan yang sudah mempercayakan momen spesial mereka kepada Abadikan.
          </p>
          <div class="mt-8">
            <Button variant="primary" size="lg">Buat Undangan Gratis →</Button>
          </div>
        </div>
      </div>
    </section>

    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>

<style scoped>
/* ── Comparison table ────────────────────────────────────── */
.compare-table-wrap {
  overflow-x: auto;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-ui);
  font-size: 13px;
  background: var(--color-surface);
}

.compare-th {
  padding: 14px 16px;
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
  white-space: nowrap;
}

.compare-th--feature {
  text-align: left;
  min-width: 200px;
}

.compare-th--paid {
  color: var(--color-primary);
  background: color-mix(in oklch, var(--color-primary) 6%, var(--color-bg-subtle));
}

.compare-row--even {
  background: var(--color-bg-subtle);
}

.compare-td {
  padding: 12px 16px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}

.compare-td--feature {
  font-weight: 500;
  color: var(--color-text-heading);
}

.compare-td--center {
  text-align: center;
}

.compare-td--paid {
  background: color-mix(in oklch, var(--color-primary) 4%, transparent);
}

/* ── Payment pills ───────────────────────────────────────── */
.pay-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}

/* ── FAQ ─────────────────────────────────────────────────── */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-surface);
}

.faq-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-heading);
  text-align: left;
  transition: background 150ms ease;
}

.faq-question:hover {
  background: var(--color-bg-subtle);
}

.faq-chevron {
  font-size: 18px;
  color: var(--color-text-secondary);
  transition: transform 200ms ease;
  flex-shrink: 0;
  line-height: 1;
}

.faq-chevron--open {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 20px 18px;
  font-family: var(--font-ui);
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
}
</style>
