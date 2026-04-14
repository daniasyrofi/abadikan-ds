<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

// ── Pricing tiers ─────────────────────────────────────────────

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
    desc: 'Coba dulu, nggak ada komitmen. Tanpa kartu kredit, tanpa jebakan.',
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
    badgeLabel: 'Paling Populer',
    badgeVariant: 'primary',
    badgeStyle: 'solid',
    oldPrice: 'Rp 149.000',
    price: 'Rp 89.000',
    discountBadge: '40% OFF',
    desc: 'Paket paling lengkap untuk hari sempurna kalian. Sekali bayar, nggak ada biaya bulanan.',
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
    desc: 'Buat yang mau undangan yang bener-bener cuma satu di dunia — dari konsep sampai jadi.',
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

const paymentMethods = [
  'QRIS', 'BCA', 'Mandiri', 'BRI', 'BNI',
  'GoPay', 'OVO', 'DANA', 'ShopeePay',
]

const boldFeatures = new Set([
  'Aktif selamanya (sekali bayar)',
  'Unlimited kuota tamu',
  'Kado Cashless (amplop digital)',
  'Smart WhatsApp Broadcast',
  'QR Code Check-in',
])
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section pricing-section"
  >
    <div class="landing-container">
      <!-- Header -->
      <div class="pricing-header" data-reveal-child>
        <p class="landing-overline">Sekali bayar. Aktif selamanya.</p>
        <h2 class="landing-h2 pricing-h2">
          Lebih Murah dari Cetak Undangan.<br class="pricing-br" />
          Lebih Lengkap dari yang Kamu Bayangkan.
        </h2>
        <p class="landing-subtitle pricing-sub">
          Cetak 500 undangan fisik rata-rata habis Rp 2–5 juta dan berakhir di tempat sampah. Di Abadikan, mulai dari Rp 0 — dan undangan aktif selamanya.
        </p>
      </div>

      <!-- Desktop: 3-col grid -->
      <div class="pricing-grid" data-reveal-child>
        <div
          v-for="tier in tiers"
          :key="tier.id"
          class="pricing-card"
          :class="{ 'pricing-card--highlight': tier.highlight }"
        >
          <!-- Badge + discount -->
          <div class="pricing-badges">
            <Badge
              :variant="tier.badgeVariant"
              :badge-style="tier.badgeStyle"
              size="sm"
            >
              {{ tier.badgeLabel }}
            </Badge>
            <span v-if="tier.discountBadge" class="discount-badge">
              {{ tier.discountBadge }}
            </span>
          </div>

          <!-- Price -->
          <div class="pricing-price-block">
            <del v-if="tier.oldPrice" class="pricing-old-price">{{ tier.oldPrice }}</del>
            <div class="pricing-price">{{ tier.price }}</div>
          </div>

          <!-- Desc -->
          <p class="pricing-desc">{{ tier.desc }}</p>

          <!-- Features -->
          <ul class="pricing-features">
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="pricing-feature"
              :class="{ 'pricing-feature--bold': tier.highlight && boldFeatures.has(feature) }"
            >
              <span class="feature-check" aria-hidden="true">✓</span>
              {{ feature }}
            </li>
          </ul>

          <!-- CTA -->
          <div class="pricing-cta">
            <Button :variant="tier.ctaVariant" size="md" full-width>
              {{ tier.ctaLabel }}
            </Button>
            <p v-if="tier.subCta" class="pricing-sub-cta">{{ tier.subCta }}</p>
          </div>
        </div>
      </div>

      <!-- Mobile: snap carousel -->
      <div class="pricing-mobile snap-carousel" data-reveal-child>
        <div
          v-for="tier in tiers"
          :key="tier.id + '-m'"
          class="snap-card pricing-snap-card"
          :class="{ 'pricing-snap-card--highlight': tier.highlight }"
        >
          <div class="pricing-badges">
            <Badge :variant="tier.badgeVariant" :badge-style="tier.badgeStyle" size="sm">
              {{ tier.badgeLabel }}
            </Badge>
            <span v-if="tier.discountBadge" class="discount-badge">{{ tier.discountBadge }}</span>
          </div>
          <div class="pricing-price-block">
            <del v-if="tier.oldPrice" class="pricing-old-price">{{ tier.oldPrice }}</del>
            <div class="pricing-price">{{ tier.price }}</div>
          </div>
          <p class="pricing-desc">{{ tier.desc }}</p>
          <ul class="pricing-features">
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="pricing-feature"
              :class="{ 'pricing-feature--bold': tier.highlight && boldFeatures.has(feature) }"
            >
              <span class="feature-check" aria-hidden="true">✓</span>
              {{ feature }}
            </li>
          </ul>
          <div class="pricing-cta">
            <Button :variant="tier.ctaVariant" size="md" full-width>{{ tier.ctaLabel }}</Button>
            <p v-if="tier.subCta" class="pricing-sub-cta">{{ tier.subCta }}</p>
          </div>
        </div>
      </div>

      <!-- Guarantee -->
      <div class="pricing-guarantee" data-reveal-child>
        <span class="guarantee-icon" aria-hidden="true">◈</span>
        <p class="guarantee-text">
          Garansi 7 hari uang kembali. Nggak cocok? Refund 100%, tanpa drama.
        </p>
      </div>

      <!-- Payment methods -->
      <div class="pricing-payments" data-reveal-child>
        <span
          v-for="method in paymentMethods"
          :key="method"
          class="payment-pill"
        >{{ method }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  background: var(--color-bg);
}

/* ── Header ──────────────────────────────────── */
.pricing-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.pricing-h2 {
  color: var(--color-text-heading);
}

.pricing-sub {
  text-align: center;
  margin-inline: auto;
}

.pricing-br {
  display: none;
}
@media (min-width: 640px) {
  .pricing-br { display: block; }
}

/* ── Desktop grid ────────────────────────────── */
.pricing-grid {
  display: none;
}

@media (min-width: 768px) {
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    align-items: start;
  }
  .pricing-mobile {
    display: none !important;
  }
}

/* ── Mobile carousel ─────────────────────────── */
.pricing-mobile {
  display: flex;
}

.pricing-snap-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.pricing-snap-card--highlight {
  border: 2px solid var(--color-primary);
  box-shadow: var(--shadow-lg);
}

/* ── Card (desktop) ──────────────────────────── */
.pricing-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: box-shadow 240ms ease;
}

.pricing-card--highlight {
  border: 2px solid var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: scale(1.03);
  transform-origin: center top;
}

.pricing-card--highlight:hover {
  box-shadow: var(--shadow-xl, var(--shadow-lg));
}

/* ── Card internals ──────────────────────────── */
.pricing-badges {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.discount-badge {
  font-family: var(--font-ui);
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.pricing-price-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pricing-old-price {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  text-decoration: line-through;
}

.pricing-price {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-text-heading);
}

.pricing-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
}

.pricing-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.pricing-feature {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.pricing-feature--bold {
  font-weight: 600;
}

.feature-check {
  flex-shrink: 0;
  font-weight: 700;
  color: var(--color-primary);
  margin-top: 1px;
}

.pricing-cta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.5rem;
}

.pricing-sub-cta {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;
}

/* ── Guarantee ───────────────────────────────── */
.pricing-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 2.5rem;
}

.guarantee-icon {
  font-size: 1.25rem;
  color: var(--color-primary);
  flex-shrink: 0;
  line-height: 1;
}

.guarantee-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

/* ── Payment methods ─────────────────────────── */
.pricing-payments {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.payment-pill {
  font-family: var(--font-ui);
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--color-bg-subtle);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}
</style>
