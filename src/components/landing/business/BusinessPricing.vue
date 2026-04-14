<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

interface Tier {
  id: string
  badgeLabel: string
  badgeVariant: 'neutral' | 'primary' | 'warning'
  badgeStyle: 'subtle' | 'solid' | 'outline'
  oldPrice: string | null
  price: string
  desc: string
  features: string[]
  ctaLabel: string
  ctaVariant: 'outline' | 'primary'
  roiNote: string | null
  highlight: boolean
}

const tiers: Tier[] = [
  {
    id: 'lite',
    badgeLabel: 'Mitra Lite',
    badgeVariant: 'neutral',
    badgeStyle: 'subtle',
    oldPrice: null,
    price: 'Rp 0',
    desc: 'Coba dulu, tanpa risiko.',
    features: [
      'Komisi per referral (link tracking)',
      'Tanpa custom branding',
      'Tanpa custom domain',
      'Akses template standar',
      'Support via grup umum',
    ],
    ctaLabel: 'Mulai Gratis →',
    ctaVariant: 'outline',
    roiNote: null,
    highlight: false,
  },
  {
    id: 'pro',
    badgeLabel: '⭐ Mitra Pro',
    badgeVariant: 'primary',
    badgeStyle: 'solid',
    oldPrice: 'Rp 1.500.000',
    price: 'Rp 899.000',
    desc: 'Bisnis serius dengan brand sendiri.',
    features: [
      'Custom domain (namabrand.com)',
      'Custom branding (logo + warna)',
      'Sales page profesional',
      'Marketing kit lengkap',
      'Semua template premium',
      'Dashboard reseller',
      'Margin hingga 70%',
      'Panduan & video training',
      'Komunitas reseller eksklusif',
      'Priority support',
    ],
    ctaLabel: 'Pilih Mitra Pro →',
    ctaVariant: 'primary',
    roiNote: 'Balik modal dalam 6-10 undangan',
    highlight: true,
  },
  {
    id: 'enterprise',
    badgeLabel: 'Mitra Enterprise',
    badgeVariant: 'warning',
    badgeStyle: 'subtle',
    oldPrice: 'Rp 3.500.000',
    price: 'Rp 2.499.000',
    desc: 'Skala penuh, zero Abadikan branding.',
    features: [
      'Semua fitur Mitra Pro, plus:',
      'White-label 100% (zero Abadikan branding)',
      'Unlimited credit undangan',
      'Custom sales page design',
      'Training 1-on-1',
      'Dedicated account manager',
      'API access',
      'Multi-user dashboard',
    ],
    ctaLabel: 'Konsultasi Enterprise →',
    ctaVariant: 'outline',
    roiNote: null,
    highlight: false,
  },
]

const trustItems = [
  'Tanpa deposit tersembunyi',
  'Tanpa minimum followers',
  'Tanpa kontrak jangka panjang',
  'Withdraw komisi kapan saja',
]
</script>

<template>
  <section class="landing-section" style="background: var(--color-bg)">
    <div class="landing-container">

      <!-- Header -->
      <div class="text-center mb-14 max-w-2xl mx-auto">
        <p class="landing-overline mb-3">Pilih paketmu</p>
        <h2 class="landing-h2 text-[var(--color-text-heading)] mb-4">
          Investasi Sekali, Jualan Berkali-kali
        </h2>
      </div>

      <!-- Pricing cards -->
      <div
        ref="sectionRef"
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
                ? 'border: 2px solid var(--color-primary); box-shadow: var(--shadow-lg);'
                : 'border: 1px solid var(--color-border);'
            "
          >
            <div class="p-7 flex flex-col gap-5 flex-1">

              <!-- Badge -->
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <Badge
                  :variant="tier.badgeVariant"
                  :badge-style="tier.badgeStyle"
                  size="sm"
                >
                  {{ tier.badgeLabel }}
                </Badge>
              </div>

              <!-- Price block -->
              <div class="flex flex-col gap-1">
                <del
                  v-if="tier.oldPrice"
                  class="text-[14px]"
                  style="color: var(--color-text-secondary)"
                >
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

              <!-- Feature list -->
              <ul class="flex flex-col gap-2 flex-1">
                <li
                  v-for="feature in tier.features"
                  :key="feature"
                  class="flex items-start gap-2 text-[13px]"
                  :style="`color: var(--color-text-primary)`"
                >
                  <span
                    class="mt-px shrink-0 font-bold text-[13px]"
                    style="color: var(--color-primary)"
                  >✓</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA -->
              <div class="flex flex-col gap-2 pt-2">
                <Button
                  :variant="tier.ctaVariant"
                  size="md"
                  full-width
                >
                  {{ tier.ctaLabel }}
                </Button>
                <p
                  v-if="tier.roiNote"
                  class="text-center text-[12px] font-medium"
                  style="color: var(--color-primary)"
                >
                  {{ tier.roiNote }}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Trust row -->
      <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-10">
        <span
          v-for="item in trustItems"
          :key="item"
          class="flex items-center gap-1.5 text-[13px]"
          style="color: var(--color-text-secondary)"
        >
          <span style="color: var(--color-primary)">✅</span>
          {{ item }}
        </span>
      </div>

    </div>
  </section>
</template>
