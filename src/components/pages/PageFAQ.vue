<script setup lang="ts">
import '@/styles/landing.css'
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SharedNavbar from '@/components/landing/shared/SharedNavbar.vue'
import SharedFloatingWA from '@/components/landing/shared/SharedFloatingWA.vue'
import LandingFooter from '@/components/landing/shared/LandingFooter.vue'
import Tabs from '@/components/molecules/Tabs/Tabs.vue'
import TabsList from '@/components/molecules/Tabs/TabsList.vue'
import TabsTrigger from '@/components/molecules/Tabs/TabsTrigger.vue'
import TabsContent from '@/components/molecules/Tabs/TabsContent.vue'
import Accordion from '@/components/molecules/Accordion/Accordion.vue'
import AccordionItem from '@/components/molecules/Accordion/AccordionItem.vue'
import Button from '@/components/atoms/Button/Button.vue'

const WA_LINK = 'https://wa.me/6281234567890?text=Halo%20Abadikan%2C%20saya%20ingin%20tanya...'

const activeTab = ref('umum')

const heroRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

useScrollReveal(heroRef)
useScrollReveal(contentRef)
useScrollReveal(ctaRef)

const tabs = [
  { value: 'umum', label: 'Umum' },
  { value: 'pembayaran', label: 'Pembayaran & Harga' },
  { value: 'fitur', label: 'Fitur & Teknis' },
  { value: 'reseller', label: 'Reseller & Bisnis' },
  { value: 'refund', label: 'Refund & Kebijakan' },
]

const faqUmum = [
  {
    id: 'u1',
    q: 'Apa itu Abadikan?',
    a: 'Abadikan adalah platform undangan digital #1 di Indonesia yang membantu pasangan membuat undangan pernikahan yang cantik, personal, dan bercerita — langsung dari HP.',
  },
  {
    id: 'u2',
    q: 'Apakah Abadikan gratis untuk dicoba?',
    a: 'Ya! Daftar gratis, buat undangan, aktif 7 hari dengan fitur dasar.',
  },
  {
    id: 'u3',
    q: 'Berapa lama buat undangan?',
    a: 'Rata-rata 15 menit.',
  },
  {
    id: 'u4',
    q: 'Apakah tamu perlu install aplikasi?',
    a: 'Tidak perlu. Cukup klik link undangan, langsung terbuka di browser HP.',
  },
  {
    id: 'u5',
    q: 'Bisa untuk acara selain pernikahan?',
    a: 'Bisa! Ulang tahun, aqiqah, khitanan, syukuran, reuni, dan lainnya.',
  },
  {
    id: 'u6',
    q: 'Bagaimana cara berbagi undangan?',
    a: 'Via WhatsApp, link langsung, atau QR code.',
  },
  {
    id: 'u7',
    q: 'Berapa lama undangan aktif?',
    a: 'Paket Premium & Exclusive: selamanya. Gratis: 7 hari.',
  },
  {
    id: 'u8',
    q: 'Apakah data tamu aman?',
    a: 'Sangat aman. Terenkripsi, tidak dibagikan ke pihak ketiga. Terdaftar Kominfo RI.',
  },
]

const faqPembayaran = [
  {
    id: 'p1',
    q: 'Metode pembayaran apa saja?',
    a: 'QRIS, transfer bank (BCA, Mandiri, BRI, BNI, BSI, Permata), e-wallet (GoPay, OVO, DANA, ShopeePay, LinkAja), kartu kredit/debit.',
  },
  {
    id: 'p2',
    q: 'Ada biaya berlangganan?',
    a: 'Tidak. Semua paket one-time payment.',
  },
  {
    id: 'p3',
    q: 'Bisa upgrade paket?',
    a: 'Bisa, kapan saja. Bayar selisih harga.',
  },
  {
    id: 'p4',
    q: 'Harga termasuk apa saja?',
    a: 'Sesuai fitur paket yang dipilih. Semua sudah termasuk, tanpa biaya tambahan.',
  },
  {
    id: 'p5',
    q: 'Ada diskon untuk pesanan massal?',
    a: 'Untuk kebutuhan khusus atau korporat, hubungi tim kami via WhatsApp.',
  },
  {
    id: 'p6',
    q: 'Bagaimana cara upgrade dari Gratis ke Premium?',
    a: 'Dari dashboard akun, klik \'Upgrade Paket\' dan pilih metode pembayaran.',
  },
]

const faqFitur = [
  {
    id: 'f1',
    q: 'Bisa ganti template setelah dibuat?',
    a: 'Bisa, kapan saja, tanpa kehilangan data.',
  },
  {
    id: 'f2',
    q: 'Berapa foto yang bisa diupload?',
    a: 'Gratis: 3 foto. Premium/Exclusive: unlimited.',
  },
  {
    id: 'f3',
    q: 'Apakah ada musik latar?',
    a: 'Ya, 600+ pilihan lagu atau upload sendiri via SoundCloud.',
  },
  {
    id: 'f4',
    q: 'Bagaimana cara kirim ke tamu?',
    a: 'Import dari Excel/CSV atau ketik manual, kirim via WhatsApp dalam satu klik.',
  },
  {
    id: 'f5',
    q: 'Bagaimana QR Check-in bekerja?',
    a: 'Setiap tamu dapat QR unik. Di hari H, scan QR → nama muncul di layar sambutan.',
  },
  {
    id: 'f6',
    q: 'Apakah ada fitur live streaming?',
    a: 'Ya, tambahkan link YouTube/Zoom/platform lain langsung di undangan.',
  },
  {
    id: 'f7',
    q: 'Bisa custom warna dan font?',
    a: 'Ya, di paket Premium dan Exclusive.',
  },
  {
    id: 'f8',
    q: 'Bagaimana fitur Kado Cashless bekerja?',
    a: '3 cara: amplop digital (transfer), kirim ke alamat, atau wishlist kado.',
  },
]

const faqReseller = [
  {
    id: 'r1',
    q: 'Apa itu program reseller Abadikan?',
    a: 'Program kemitraan untuk menjual undangan digital dengan brand sendiri. Margin hingga 70-80%.',
  },
  {
    id: 'r2',
    q: 'Perlu skill teknis?',
    a: 'Tidak sama sekali.',
  },
  {
    id: 'r3',
    q: 'Modal awal berapa?',
    a: 'Mulai dari Rp 0 (Mitra Lite) atau Rp 899.000 (Mitra Pro).',
  },
  {
    id: 'r4',
    q: 'Bagaimana cara withdraw komisi?',
    a: 'Dari dashboard reseller, min. Rp 100.000, proses 1-3 hari kerja.',
  },
  {
    id: 'r5',
    q: 'Customer tau dari Abadikan?',
    a: 'Di Mitra Pro/Enterprise, zero Abadikan branding. Full brand kamu.',
  },
  {
    id: 'r6',
    q: 'Ada training?',
    a: 'Ya, video training, PDF, marketing kit, dan komunitas reseller.',
  },
]

const faqRefund = [
  {
    id: 'rf1',
    q: 'Bagaimana kebijakan refund?',
    a: 'Garansi 7 hari uang kembali untuk paket Premium/Exclusive. Mitra Pro/Enterprise: 30 hari.',
  },
  {
    id: 'rf2',
    q: 'Bagaimana cara mengajukan refund?',
    a: 'Hubungi support via WhatsApp atau email support@abadikan.id. Proses dalam 3-5 hari kerja.',
  },
  {
    id: 'rf3',
    q: 'Apakah ada syarat refund?',
    a: 'Tidak ada syarat ribet. Cukup beritahu kami alasannya, kami proses refund 100%.',
  },
  {
    id: 'rf4',
    q: 'Apa kebijakan privasi Abadikan?',
    a: 'Data kamu aman dan tidak pernah dijual ke pihak ketiga. Lihat Privacy Policy untuk detail lengkap.',
  },
]
</script>

<template>
  <div>
    <SharedNavbar />

    <!-- Mini Hero -->
  <section ref="heroRef" class="landing-page-hero landing-reveal">
    <div class="landing-container--narrow" style="text-align: center;">
      <p class="landing-overline" style="margin-bottom: 0.75rem;">Bantuan</p>
      <h1 class="landing-h2" style="color: var(--color-text-heading); margin-bottom: 1rem;">
        Pusat Bantuan
      </h1>
      <p class="landing-subtitle" style="margin-inline: auto;">
        Temukan jawaban dari pertanyaan yang sering ditanyakan.
      </p>
    </div>
  </section>

  <!-- FAQ Tabs -->
  <section ref="contentRef" class="landing-section landing-reveal" style="background: var(--color-bg);">
    <div class="landing-container">

      <Tabs v-model="activeTab" variant="boxed" size="md">
        <!-- Tab List — scrollable on mobile -->
        <TabsList class="faq-tabs-list">
          <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
            {{ tab.label }}
          </TabsTrigger>
        </TabsList>

        <!-- Tab panels -->
        <div class="faq-panel-wrap">

          <!-- Umum -->
          <TabsContent value="umum">
            <Accordion type="single">
              <AccordionItem
                v-for="faq in faqUmum"
                :key="faq.id"
                :value="faq.id"
                :title="faq.q"
              >
                <p class="faq-answer">{{ faq.a }}</p>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <!-- Pembayaran & Harga -->
          <TabsContent value="pembayaran">
            <Accordion type="single">
              <AccordionItem
                v-for="faq in faqPembayaran"
                :key="faq.id"
                :value="faq.id"
                :title="faq.q"
              >
                <p class="faq-answer">{{ faq.a }}</p>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <!-- Fitur & Teknis -->
          <TabsContent value="fitur">
            <Accordion type="single">
              <AccordionItem
                v-for="faq in faqFitur"
                :key="faq.id"
                :value="faq.id"
                :title="faq.q"
              >
                <p class="faq-answer">{{ faq.a }}</p>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <!-- Reseller & Bisnis -->
          <TabsContent value="reseller">
            <Accordion type="single">
              <AccordionItem
                v-for="faq in faqReseller"
                :key="faq.id"
                :value="faq.id"
                :title="faq.q"
              >
                <p class="faq-answer">{{ faq.a }}</p>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <!-- Refund & Kebijakan -->
          <TabsContent value="refund">
            <Accordion type="single">
              <AccordionItem
                v-for="faq in faqRefund"
                :key="faq.id"
                :value="faq.id"
                :title="faq.q"
              >
                <p class="faq-answer">{{ faq.a }}</p>
              </AccordionItem>
            </Accordion>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  </section>

  <!-- Bottom CTA -->
  <section
    ref="ctaRef"
    class="landing-reveal"
    style="padding-block: clamp(48px, 8vh, 80px); background: var(--color-bg-subtle);"
  >
    <div class="landing-container--narrow" style="text-align: center;">
      <p class="faq-cta-text">
        Tidak menemukan jawaban yang dicari? Chat kami →
      </p>
      <Button
        variant="primary"
        size="lg"
        as="a"
        :href="WA_LINK"
        target="_blank"
        rel="noopener noreferrer"
      >
        Chat via WhatsApp
      </Button>
    </div>
  </section>

    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>

<style scoped>
.faq-tabs-list {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex-wrap: nowrap;
  margin-bottom: 2rem;
}

.faq-tabs-list::-webkit-scrollbar {
  display: none;
}

.faq-panel-wrap {
  max-width: 800px;
}

.faq-answer {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin: 0;
}

.faq-cta-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-heading);
  margin-bottom: 1.25rem;
}
</style>
