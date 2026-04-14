<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import Accordion from '@/components/molecules/Accordion/Accordion.vue'
import AccordionItem from '@/components/molecules/Accordion/AccordionItem.vue'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const WA_LINK = 'https://wa.me/6281234567890?text=Halo%20Abadikan%2C%20saya%20ingin%20tanya...'

const faqs = [
  {
    id: 'q1',
    question: 'Beneran gratis? Nggak ada jebakan?',
    answer:
      'Beneran. Daftar tanpa kartu kredit, langsung bisa bikin undangan. Paket gratis aktif 7 hari — cukup buat ngerasain sendiri sebelum mutusin.',
  },
  {
    id: 'q2',
    question: 'Undangannya aktif sampai kapan?',
    answer:
      'Paket Premium dan Exclusive aktif selamanya — sekali bayar, nggak ada biaya bulanan. Bahkan setelah acara selesai, undangan tetap bisa dibuka sebagai kenangan digital.',
  },
  {
    id: 'q3',
    question: 'Bisa ganti desain setelah udah jadi?',
    answer:
      'Bisa, kapan aja. Ganti tema dari dashboard tanpa bikin ulang. Semua data yang udah diisi — nama tamu, detail acara, foto — tetap tersimpan.',
  },
  {
    id: 'q4',
    question: 'Bikin undangan butuh berapa lama?',
    answer:
      'Rata-rata 15 menit kalau data udah siap. Daftar, pilih tema, isi detail, upload foto, kirim. Nggak ada proses desain ribet.',
  },
  {
    id: 'q5',
    question: 'Gimana cara kirimnya ke ratusan tamu?',
    answer:
      'Import daftar tamu dari Excel atau ketik manual, terus kirim satu klik via WhatsApp. Setiap undangan dibuka pakai nama tamu masing-masing — bukan pesan massal generik.',
  },
  {
    id: 'q6',
    question: 'Tamu perlu install aplikasi?',
    answer:
      'Nggak perlu. Tamu tinggal klik link yang kamu kirim — langsung kebuka di browser HP. Nggak ada download, nggak ada registrasi.',
  },
  {
    id: 'q7',
    question: 'Bisa buat acara selain nikahan?',
    answer:
      'Bisa. Abadikan dipakai buat ulang tahun, aqiqah, khitanan, syukuran, reuni, sampai acara kantor. Konten dan tema bisa disesuaikan.',
  },
  {
    id: 'q8',
    question: 'Bayarnya bisa pakai apa aja?',
    answer:
      'Transfer bank (BCA, Mandiri, BRI, BNI, BSI), e-wallet (GoPay, OVO, DANA, ShopeePay), QRIS, dan kartu kredit/debit.',
  },
  {
    id: 'q9',
    question: 'Kalau butuh bantuan gimana?',
    answer:
      'Chat ke WhatsApp kami. Bukan bot, bukan antrian email — orang beneran yang bales, biasanya dalam hitungan menit.',
  },
  {
    id: 'q10',
    question: 'Data tamu aman nggak?',
    answer:
      'Data tamu cuma bisa diakses kamu sebagai pemilik undangan. Kami pakai enkripsi dan nggak pernah bagi data ke pihak ketiga. Abadikan terdaftar di Kementerian Kominfo RI.',
  },
  {
    id: 'q11',
    question: 'Bisa minta desain custom dari nol?',
    answer:
      'Bisa, lewat paket Exclusive. Tim desainer kami ngerjain dari konsultasi konsep, desain, sampai revisi tanpa batas — semua udah termasuk.',
  },
  {
    id: 'q12',
    question: 'Kalau nggak puas gimana?',
    answer:
      'Ada garansi 7 hari uang kembali. Nggak cocok dalam seminggu pertama? Refund 100%, tanpa ribet.',
  },
]
</script>

<template>
  <section
    ref="sectionRef"
    class="landing-reveal landing-section faq-section"
  >
    <div class="landing-container">
      <div class="faq-layout">
        <!-- Left: sticky heading -->
        <div class="faq-heading" data-reveal-child>
          <p class="landing-overline">Sebelum mulai, baca dulu</p>
          <h2 class="landing-h2 faq-h2">
            Pertanyaan yang<br />Sering Muncul<br />Sebelum Daftar
          </h2>
          <p class="faq-subtext">Nggak ketemu jawabannya?</p>
          <a
            :href="WA_LINK"
            target="_blank"
            rel="noopener noreferrer"
            class="faq-chat-link"
          >
            Chat kami langsung →
          </a>
        </div>

        <!-- Right: accordion -->
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
.faq-section {
  background: var(--color-bg);
}

/* ── Layout ───────────────────────────────────── */
.faq-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .faq-layout {
    grid-template-columns: 30% 1fr;
    gap: 4rem;
    align-items: start;
  }
}

/* ── Left: sticky heading ─────────────────────── */
.faq-heading {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .faq-heading {
    position: sticky;
    top: 6rem;
    align-self: start;
  }
}

.faq-h2 {
  color: var(--color-text-heading);
}

.faq-subtext {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
  margin-top: 0.25rem;
}

.faq-chat-link {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 150ms ease;
  width: fit-content;
}

.faq-chat-link:hover {
  opacity: 0.75;
}

/* ── Right: accordion ─────────────────────────── */
.faq-accordion {
  min-width: 0;
}

.faq-answer {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
