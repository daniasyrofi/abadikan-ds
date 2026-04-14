<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import Accordion from '@/components/molecules/Accordion/Accordion.vue'
import AccordionItem from '@/components/molecules/Accordion/AccordionItem.vue'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const WA_LINK = 'https://wa.me/6281234567890?text=Halo%20Abadikan%2C%20saya%20mau%20tanya%20tentang%20program%20reseller...'

const faqs = [
  {
    id: 'bq1',
    question: 'Apakah perlu skill teknis atau coding?',
    answer:
      'Sama sekali tidak. Semua sudah siap pakai — dari platform, template, sampai sales page. Kamu cukup fokus jualan dan melayani customer.',
  },
  {
    id: 'bq2',
    question: 'Berapa modal awal yang dibutuhkan?',
    answer:
      'Mulai dari Rp 0 untuk Mitra Lite. Untuk Mitra Pro dengan custom branding, mulai dari Rp 899.000 (sekali bayar, bukan langganan).',
  },
  {
    id: 'bq3',
    question: 'Bagaimana cara menarik komisi/keuntungan?',
    answer:
      'Langsung dari dashboard reseller. Ajukan withdrawal ke rekening bank mana saja. Minimum withdrawal Rp 100.000. Proses 1-3 hari kerja.',
  },
  {
    id: 'bq4',
    question: 'Apakah customer tau undangannya dari Abadikan?',
    answer:
      'Di paket Mitra Pro dan Enterprise, branding sepenuhnya milik kamu. Customer hanya melihat logo, nama, dan domain brand kamu. Zero Abadikan branding.',
  },
  {
    id: 'bq5',
    question: 'Bisa jual ke luar negeri?',
    answer:
      'Bisa! Platform kami support multi-bahasa dan bisa diakses dari mana saja. Banyak reseller kami yang melayani diaspora Indonesia di luar negeri.',
  },
  {
    id: 'bq6',
    question: 'Ada kontrak atau lock-in period?',
    answer:
      'Tidak ada. Kamu bebas berhenti kapan saja tanpa penalti.',
  },
  {
    id: 'bq7',
    question: 'Apakah ada pelatihan cara jualan?',
    answer:
      'Ya! Kami menyediakan video training lengkap, panduan PDF, marketing kit siap pakai, dan akses ke komunitas reseller.',
  },
  {
    id: 'bq8',
    question: 'Berapa margin yang bisa saya ambil?',
    answer:
      'Kamu bebas menentukan harga jual sendiri. Rata-rata reseller kami menjual dengan margin 70-80%. Contoh: modal Rp 30.000, jual Rp 150.000 = margin Rp 120.000.',
  },
]
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-section landing-reveal"
    style="background: var(--color-bg)"
  >
    <div class="landing-container">
      <div class="faq-layout">

        <!-- Left: Heading column -->
        <div class="faq-heading" data-reveal-child>
          <p class="landing-overline">Ada pertanyaan?</p>
          <h2 class="landing-h2 faq-h2">
            Pertanyaan yang Sering Ditanyakan Calon Mitra
          </h2>
          <p class="faq-subtext">
            Nggak ketemu jawabannya?
          </p>
          <a
            :href="WA_LINK"
            target="_blank"
            rel="noopener noreferrer"
            class="faq-chat-link"
          >
            Chat tim kami →
          </a>
        </div>

        <!-- Right: Accordion -->
        <div class="faq-accordion" data-reveal-child>
          <Accordion type="single">
            <AccordionItem
              v-for="faq in faqs"
              :key="faq.id"
              :value="faq.id"
              :title="faq.question"
            >
              <p class="faq-answer">{{ faq.answer }}</p>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .faq-layout {
    grid-template-columns: 35% 1fr;
    gap: 4rem;
    align-items: start;
  }
}

.faq-heading {
  position: sticky;
  top: 6rem;
}

.faq-h2 {
  margin-bottom: 1.25rem;
}

.faq-subtext {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
}

.faq-chat-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.15s;
}

.faq-chat-link:hover {
  opacity: 0.75;
}

.faq-accordion {
  min-width: 0;
}

.faq-answer {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin: 0;
}

@media (max-width: 767px) {
  .faq-heading {
    position: static;
  }
}
</style>
