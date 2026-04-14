<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/molecules/Card/Card.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const testimonials = [
  {
    quote:
      'Dulu cuma fotografer wedding biasa. Setelah jadi reseller Abadikan, setiap client foto langsung saya tawarin undangan digital juga. Tambahan income 4-5 juta per bulan tanpa effort ekstra.',
    name: 'Rizky',
    role: 'Fotografer Wedding, Bandung',
    initials: 'RZ',
    stars: 5,
  },
  {
    quote:
      'Sebagai WO, client sering tanya "bisa bantu bikin undangan digital nggak?" Sekarang jawabannya selalu bisa. Dan dengan brand sendiri, client nggak tau saya pakai platform — mereka pikir saya bikin sendiri.',
    name: 'Dina',
    role: 'Wedding Organizer, Surabaya',
    initials: 'DN',
    stars: 5,
  },
  {
    quote:
      'Saya ibu rumah tangga yang cari penghasilan tambahan. Modal HP doang, sekarang bisa jual 15-20 undangan per bulan. Lumayan banget buat tambah-tambah.',
    name: 'Siti',
    role: 'Freelancer, Malang',
    initials: 'ST',
    stars: 5,
  },
]
</script>

<template>
  <section
    class="landing-section"
    style="background: var(--color-bg-subtle)"
  >
    <div class="landing-container">

      <!-- Header -->
      <div class="text-center mb-14">
        <p class="landing-overline mb-3">Mereka sudah membuktikannya</p>
        <h2 class="landing-h2 text-[var(--color-text-heading)]">
          Reseller Kami Bicara
        </h2>
      </div>

      <!-- Cards grid -->
      <div
        ref="sectionRef"
        class="landing-reveal grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card
          v-for="t in testimonials"
          :key="t.name"
          data-reveal-child
          variant="default"
          padding="lg"
          radius="xl"
        >
          <div class="flex flex-col gap-4 h-full">
            <!-- Opening quote mark -->
            <div
              class="leading-none select-none -mb-1"
              style="font-family: var(--font-display); font-size: 4rem; color: var(--color-primary); opacity: 0.3; line-height: 1"
            >
              "
            </div>

            <!-- Quote text -->
            <p
              class="flex-1 italic leading-[1.7]"
              style="font-size: 15px; color: var(--color-text-primary)"
            >
              {{ t.quote }}
            </p>

            <!-- Stars -->
            <div class="flex gap-0.5" :aria-label="`${t.stars} bintang`">
              <span
                v-for="n in t.stars"
                :key="n"
                class="text-[18px] leading-none"
                style="color: #f59e0b"
              >★</span>
            </div>

            <!-- Author -->
            <div class="flex items-center gap-3 pt-1 border-t border-[var(--color-border)]">
              <Avatar :name="t.initials" size="md" />
              <div>
                <div
                  class="font-semibold"
                  style="font-size: 14px; color: var(--color-text-heading)"
                >
                  {{ t.name }}
                </div>
                <div style="font-size: 12px; color: var(--color-text-secondary)">
                  {{ t.role }}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  </section>
</template>
