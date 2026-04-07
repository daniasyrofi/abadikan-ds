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
