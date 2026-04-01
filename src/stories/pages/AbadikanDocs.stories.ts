import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, defineComponent } from 'vue'
import Navbar from '@/components/organisms/Navbar/Navbar.vue'
import Sidebar from '@/components/organisms/Sidebar/Sidebar.vue'
import type { SidebarItem } from '@/components/organisms/Sidebar/Sidebar.vue'
import Card from '@/components/molecules/Card/Card.vue'
import Breadcrumb from '@/components/molecules/Breadcrumb/Breadcrumb.vue'
import SearchInput from '@/components/molecules/SearchInput/SearchInput.vue'
import ThemeToggle from '@/components/molecules/ThemeToggle/ThemeToggle.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import Button from '@/components/atoms/Button/Button.vue'

// ── Canvas decorator ─────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="min-height:100vh;display:flex;flex-direction:column;background-color:var(--color-bg);">
      <story />
    </div>
  `,
})

const DocsPage = defineComponent({ template: '<div />' })

const meta: Meta = {
  title: 'Pages/Abadikan — Docs',
  component: DocsPage,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Halaman dokumentasi **Abadikan.id** bergaya developer docs — dengan sidebar navigasi, hero section, dan feature cards.',
      },
    },
  },
}
export default meta
type Story = StoryObj

// ── Icons (inline SVG strings) ───────────────────────────────────────────────
const IconHome    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
const IconDash    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3v8h8V3h-8zm6 6h-4V5h4v4zM3 13v8h8v-8H3zm6 6H5v-4h4v4zm-6-16v8h8V3H3zm6 6H5V5h4v4zm10 4v8h-8v-8h8zm-2 6h-4v-4h4v4z"/></svg>'
const IconLink    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm1-4h-4v2h4v-2z"/></svg>'
const IconChart   = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12H3v9h2v-9zm4-7H7v16h2V5zm4 4h-2v12h2V9zm4-6h-2v18h2V3zm4 5h-2v13h2V8z"/></svg>'
const IconPeople  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>'
const IconMsg     = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>'
const IconEdit    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'
const IconMusic   = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>'
const IconRsvp    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>'
const IconGift    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.07-.24.18-.46.18-.71C18 3.47 16.53 2 14.71 2c-.91 0-1.74.37-2.37 1.01L12 3.38l-.34-.36C11.03 2.37 10.2 2 9.29 2 7.47 2 6 3.47 6 5.29c0 .25.11.47.18.71H4C2.9 6 2 6.9 2 8v13c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5.29-2c.39 0 .71.32.71.71S15.1 5.42 14.71 5.42h-1.67l1.01-.96c.17-.18.41-.46.66-.46zM9.29 4c.25 0 .49.09.66.27l1.01.96H9.29c-.39 0-.71-.32-.71-.71S8.9 4 9.29 4zM11 20H4V8h7v12zm9 0h-7V8h7v12z"/></svg>'
const IconBook    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>'
const IconTrend   = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>'

// ── Sidebar items ─────────────────────────────────────────────────────────────
const NAV_ITEMS: SidebarItem[] = [
  {
    id: 'intro',
    label: 'Intro',
    icon: IconHome,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: IconDash,
    children: [
      { id: 'dashboard-link',      label: 'Link Undangan',       icon: IconLink },
      { id: 'dashboard-progress',  label: 'Progress Undangan',   icon: IconChart },
      { id: 'dashboard-statistik', label: 'Statistik Undangan',  icon: IconChart },
      { id: 'dashboard-tamu',      label: 'Statistik Tamu',      icon: IconPeople },
      { id: 'dashboard-pesan',     label: 'Pesan Terbaru',       icon: IconMsg },
      { id: 'dashboard-analytics', label: 'Analytics Overview',  icon: IconTrend },
      { id: 'dashboard-trends',    label: 'Trends Analytics',    icon: IconTrend },
    ],
  },
  {
    id: 'edit-undangan',
    label: 'Edit Undangan',
    icon: IconEdit,
    children: [
      { id: 'edit-template',  label: 'Pilih Template' },
      { id: 'edit-konten',    label: 'Isi Konten' },
      { id: 'edit-galeri',    label: 'Galeri Foto' },
      { id: 'edit-countdown', label: 'Countdown Timer' },
    ],
  },
  {
    id: 'musik',
    label: 'Musik',
    icon: IconMusic,
    children: [
      { id: 'musik-pilih',  label: 'Pilih Musik' },
      { id: 'musik-upload', label: 'Upload Musik Sendiri' },
    ],
  },
  {
    id: 'rsvp-tamu',
    label: 'RSVP Tamu',
    icon: IconRsvp,
    children: [
      { id: 'rsvp-daftar',   label: 'Daftar Tamu' },
      { id: 'rsvp-konfirm',  label: 'Konfirmasi Kehadiran' },
      { id: 'rsvp-export',   label: 'Export Data Tamu' },
    ],
  },
  {
    id: 'kado',
    label: 'Kado',
    icon: IconGift,
    children: [
      { id: 'kado-rekening', label: 'Rekening Bank' },
      { id: 'kado-ewallet',  label: 'E-Wallet' },
      { id: 'kado-wishlist', label: 'Wishlist Registry' },
    ],
  },
  {
    id: 'digital-guestbook',
    label: 'Digital Guestbook',
    icon: IconBook,
    children: [
      { id: 'guestbook-ucapan',   label: 'Ucapan & Doa' },
      { id: 'guestbook-moderasi', label: 'Moderasi Pesan' },
      { id: 'guestbook-export',   label: 'Export Buku Tamu' },
    ],
  },
]

// ── Feature card data ─────────────────────────────────────────────────────────
const FEATURE_CARDS = [
  {
    icon: IconEdit,
    title: 'Undangan Digital',
    desc: 'Buat undangan cantik dari ratusan template premium. Personalisasi setiap detail — dari foto hingga countdown hari H.',
    badge: 'Mulai di sini',
    badgeVariant: 'primary' as const,
    id: 'edit-undangan',
  },
  {
    icon: IconRsvp,
    title: 'RSVP & Manajemen Tamu',
    desc: 'Kelola daftar tamu, lacak konfirmasi kehadiran, dan ekspor data kapan saja — semua dalam satu dashboard.',
    badge: 'Populer',
    badgeVariant: 'success' as const,
    id: 'rsvp-tamu',
  },
  {
    icon: IconGift,
    title: 'Kado Digital',
    desc: 'Terima kado dari tamu lewat transfer bank atau e-wallet. Tambah beberapa rekening sekaligus dengan mudah.',
    badge: null,
    badgeVariant: 'neutral' as const,
    id: 'kado',
  },
  {
    icon: IconBook,
    title: 'Buku Tamu Digital',
    desc: 'Kumpulkan ucapan dan doa dari tamu secara real-time. Moderasi pesan dan simpan kenangan indahmu selamanya.',
    badge: null,
    badgeVariant: 'neutral' as const,
    id: 'digital-guestbook',
  },
]

// ── Quick-start panel content ─────────────────────────────────────────────────
const QUICK_STEPS = [
  { step: '01', label: 'Buat akun gratis',       done: true  },
  { step: '02', label: 'Pilih template undangan', done: true  },
  { step: '03', label: 'Isi data pernikahan',     done: false },
  { step: '04', label: 'Tambahkan daftar tamu',   done: false },
  { step: '05', label: 'Bagikan linkmu!',         done: false },
]

// ════════════════════════════════════════════════════════════════════════════════
// Story — Docs Landing
// ════════════════════════════════════════════════════════════════════════════════
export const Default: Story = {
  name: 'Docs Landing',
  render: () => ({
    components: {
      Navbar,
      Sidebar,
      Card,
      Breadcrumb,
      SearchInput,
      ThemeToggle,
      Badge,
      Button,
    },

    setup() {
      const sidebarCollapsed = ref(false)
      const activeId         = ref('intro')
      const searchQuery      = ref('')

      const breadcrumbItems = [
        { label: 'Home', href: '#' },
        { label: 'Tutorial', href: '#' },
        { label: 'Intro' },
      ]

      function handleNav(item: SidebarItem) {
        activeId.value = item.id
      }

      return {
        sidebarCollapsed,
        activeId,
        searchQuery,
        breadcrumbItems,
        handleNav,
        NAV_ITEMS,
        FEATURE_CARDS,
        QUICK_STEPS,
        IconEdit,
        IconRsvp,
        IconGift,
        IconBook,
        IconMusic,
        IconTrend,
        IconChart,
      }
    },

    template: `
      <!-- ── Navbar ──────────────────────────────────────────────────────── -->
      <Navbar :sticky="true" :border="true">
        <template #start>
          <div style="display:flex;align-items:center;gap:10px;">
            <img src="/abadikan-wordmark.svg" height="20" alt="Abadikan.id"
                 style="display:block;" />
            <span style="
              font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
              color:var(--color-text-tertiary);padding-left:10px;
              border-left:1px solid var(--color-border);
            ">Docs</span>
          </div>
        </template>

        <template #center>
          <nav style="display:flex;align-items:center;gap:2px;">
            <button
              v-for="tab in ['Tutorial','Blog']"
              :key="tab"
              :style="{
                fontSize:'14px',fontWeight:tab==='Tutorial'?'600':'400',
                color: tab==='Tutorial' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: tab==='Tutorial' ? 'var(--color-neutral-subtle)' : 'transparent',
                border:'none',borderRadius:'var(--radius-md)',
                padding:'6px 12px',cursor:'pointer',
                transition:'all .15s ease',
              }"
            >{{ tab }}</button>
          </nav>
        </template>

        <template #end>
          <a
            href="#"
            style="
              display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;
              color:var(--color-text-secondary);text-decoration:none;
              padding:6px 10px;border-radius:var(--radius-md);
              transition:color .15s;
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <ThemeToggle size="sm" />
        </template>
      </Navbar>

      <!-- ── Body: Sidebar + Content ──────────────────────────────────────── -->
      <div style="display:flex;flex:1;min-height:0;overflow:hidden;">

        <!-- Sidebar -->
        <div style="position:sticky;top:56px;height:calc(100vh - 56px);display:flex;flex-shrink:0;">
          <Sidebar
            v-model="sidebarCollapsed"
            :items="NAV_ITEMS"
            :activeId="activeId"
            width="narrow"
            collapsedWidth="icon-only"
            @itemClick="handleNav"
          >
            <template #header="{ collapsed }">
              <div v-if="!collapsed" style="width:100%;">
                <SearchInput
                  v-model="searchQuery"
                  placeholder="Cari panduan…"
                  size="sm"
                  style="width:100%;"
                />
              </div>
            </template>
          </Sidebar>
        </div>

        <!-- Main content -->
        <main style="flex:1;overflow-y:auto;padding:32px 40px 80px;max-width:960px;">

          <!-- Breadcrumb -->
          <Breadcrumb :items="breadcrumbItems" size="sm" style="margin-bottom:20px;" />

          <!-- ── Hero ─────────────────────────────────────────────────────── -->
          <div style="display:grid;grid-template-columns:1fr 340px;gap:32px;align-items:start;margin-bottom:48px;">

            <!-- Left: heading + cta -->
            <div>
              <h1 style="
                font-size:clamp(28px,3.5vw,40px);font-weight:800;
                color:var(--color-text-heading);letter-spacing:-0.8px;
                line-height:1.15;margin:0 0 14px;
              ">Panduan Lengkap<br/>Dashboard Abadikan.id</h1>

              <p style="
                font-size:15px;color:var(--color-text-secondary);
                line-height:1.7;margin:0 0 28px;max-width:480px;
              ">
                Semua yang kamu butuhkan untuk bikin dan ngatur undangan digital —
                dari daftar akun sampai amplop digital. Santai aja, kita mulai pelan-pelan.
              </p>

              <!-- Search -->
              <div style="margin-bottom:20px;max-width:380px;">
                <SearchInput
                  v-model="searchQuery"
                  placeholder="Mau belajar apa dulu?"
                  size="lg"
                />
              </div>

              <!-- CTA buttons -->
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <Button variant="primary" size="md">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="margin-right:6px;">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Mulai Tutorial
                </Button>
                <Button variant="secondary" size="md">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="margin-right:6px;">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  Lihat Semua Fitur
                </Button>
                <Button variant="ghost" size="md">Hubungi Support</Button>
              </div>
            </div>

            <!-- Right: quick-start panel -->
            <Card variant="outlined" padding="none" radius="lg" style="overflow:hidden;">
              <!-- Panel header -->
              <div style="
                background:var(--color-primary);
                padding:14px 18px;
                display:flex;align-items:center;gap:8px;
              ">
                <span style="font-size:13px;font-weight:600;color:white;letter-spacing:.02em;">
                  Quick Start — 5 Langkah
                </span>
                <Badge variant="neutral" badgeStyle="solid" size="sm"
                       style="background:rgba(255,255,255,.2);color:white;margin-left:auto;">
                  ~5 menit
                </Badge>
              </div>

              <!-- Steps -->
              <div style="padding:6px 0;">
                <div
                  v-for="(s, i) in QUICK_STEPS"
                  :key="i"
                  :style="{
                    display:'flex',alignItems:'center',gap:'12px',
                    padding:'11px 18px',
                    borderBottom: i < QUICK_STEPS.length-1 ? '1px solid var(--color-border)' : 'none',
                    opacity: s.done ? 1 : 0.55,
                  }"
                >
                  <!-- Step number / check -->
                  <div :style="{
                    width:'28px',height:'28px',borderRadius:'50%',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    flexShrink:0,
                    background: s.done ? 'var(--color-success-light)' : 'var(--color-neutral-light)',
                  }">
                    <svg v-if="s.done" width="14" height="14" viewBox="0 0 24 24"
                         fill="var(--color-success)" style="display:block;">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span v-else style="font-size:11px;font-weight:700;color:var(--color-text-tertiary);">
                      {{ s.step }}
                    </span>
                  </div>
                  <span :style="{
                    fontSize:'13px',
                    fontWeight: s.done ? '500' : '400',
                    color: s.done ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    textDecoration: s.done ? 'line-through' : 'none',
                  }">{{ s.label }}</span>
                </div>
              </div>

              <!-- Panel footer -->
              <div style="padding:12px 18px;border-top:1px solid var(--color-border);">
                <Button variant="primary" size="sm" style="width:100%;">
                  Lanjutkan dari Langkah 3 →
                </Button>
              </div>
            </Card>
          </div>

          <!-- ── Section: Pilih Fitur ──────────────────────────────────────── -->
          <div style="margin-bottom:12px;">
            <p style="
              font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
              color:var(--color-primary);margin:0 0 6px;
            ">PANDUAN FITUR</p>
            <h2 style="
              font-size:22px;font-weight:700;color:var(--color-text-heading);
              letter-spacing:-0.3px;margin:0 0 6px;
            ">Mau belajar dari mana dulu?</h2>
            <p style="font-size:14px;color:var(--color-text-secondary);margin:0 0 24px;line-height:1.6;">
              Pilih fitur yang paling kamu butuhkan sekarang. Tiap panduan ditulis santai dan step-by-step.
            </p>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <Card
              v-for="card in FEATURE_CARDS"
              :key="card.id"
              variant="default"
              padding="md"
              radius="lg"
              :hoverable="true"
              :clickable="true"
              @click="activeId = card.id"
            >
              <template #header>
                <div style="display:flex;align-items:flex-start;gap:12px;width:100%;">
                  <!-- Icon -->
                  <div style="
                    width:40px;height:40px;border-radius:var(--radius-md);
                    background:var(--color-primary-subtle);
                    display:flex;align-items:center;justify-content:center;
                    flex-shrink:0;color:var(--color-primary);
                  " v-html="card.icon" />

                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
                      <span style="font-size:15px;font-weight:600;color:var(--color-text-heading);">
                        {{ card.title }}
                      </span>
                      <Badge
                        v-if="card.badge"
                        :variant="card.badgeVariant"
                        badgeStyle="subtle"
                        size="sm"
                      >{{ card.badge }}</Badge>
                    </div>
                  </div>
                </div>
              </template>

              <p style="
                font-size:13px;color:var(--color-text-secondary);
                line-height:1.65;margin:0;padding-top:10px;
              ">{{ card.desc }}</p>

              <template #footer>
                <span style="
                  font-size:12px;font-weight:600;color:var(--color-primary);
                  display:flex;align-items:center;gap:4px;
                ">
                  Baca panduan
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"/>
                  </svg>
                </span>
              </template>
            </Card>
          </div>

          <!-- ── Section: Stats ────────────────────────────────────────────── -->
          <div style="
            display:grid;grid-template-columns:repeat(3,1fr);gap:12px;
            margin-top:32px;
          ">
            <Card
              v-for="stat in [
                { num: '10 menit', label: 'Waktu setup rata-rata', icon: IconChart },
                { num: '50.000+', label: 'Pasangan sudah pakai Abadikan', icon: IconPeople },
                { num: '99.9%', label: 'Uptime — linkmu selalu aktif', icon: IconTrend },
              ]"
              :key="stat.label"
              variant="flat"
              padding="md"
              radius="md"
              style="border:1px solid var(--color-border);"
            >
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="
                  color:var(--color-primary);width:20px;height:20px;flex-shrink:0;
                " v-html="stat.icon" />
                <div>
                  <div style="font-size:18px;font-weight:700;color:var(--color-text-heading);">
                    {{ stat.num }}
                  </div>
                  <div style="font-size:12px;color:var(--color-text-secondary);margin-top:1px;">
                    {{ stat.label }}
                  </div>
                </div>
              </div>
            </Card>
          </div>

        </main>
      </div>
    `,
  }),
}
