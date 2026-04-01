import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, defineComponent } from 'vue'
import { Icons } from '@/lib/icons'
import Navbar      from '@/components/organisms/Navbar/Navbar.vue'
import Sidebar     from '@/components/organisms/Sidebar/Sidebar.vue'
import type { SidebarItem } from '@/components/organisms/Sidebar/Sidebar.vue'
import Card        from '@/components/molecules/Card/Card.vue'
import Breadcrumb  from '@/components/molecules/Breadcrumb/Breadcrumb.vue'
import SearchInput from '@/components/molecules/SearchInput/SearchInput.vue'
import ThemeToggle from '@/components/molecules/ThemeToggle/ThemeToggle.vue'
import Badge       from '@/components/atoms/Badge/Badge.vue'
import Button      from '@/components/atoms/Button/Button.vue'

// ── Canvas ───────────────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="min-height:100vh;display:flex;flex-direction:column;background:var(--color-bg);">
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
        component: 'Halaman dokumentasi **Abadikan.id** — sidebar navigasi, hero section, quick-start panel, dan feature cards.',
      },
    },
  },
}
export default meta
type Story = StoryObj

// ── Logo (matches Sidebar.stories.ts) ────────────────────────────────────────
const logoBox = `
  <div style="display:flex;align-items:center;gap:8px;padding:2px 0;">
    <img src="/abadikan-wordmark.svg" height="18" alt="Abadikan.id" style="display:block;" />
  </div>
`

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS: SidebarItem[] = [
  {
    id:    'intro',
    label: 'Intro',
    icon:  Icons.Book,
  },
  {
    id:       'dashboard',
    label:    'Dashboard',
    icon:     Icons.Dashboard,
    children: [
      { id: 'dashboard-link',      label: 'Link Undangan'      },
      { id: 'dashboard-progress',  label: 'Progress Undangan'  },
      { id: 'dashboard-statistik', label: 'Statistik Undangan' },
      { id: 'dashboard-tamu',      label: 'Statistik Tamu'     },
      { id: 'dashboard-pesan',     label: 'Pesan Terbaru'      },
      { id: 'dashboard-analytics', label: 'Analytics Overview' },
      { id: 'dashboard-trends',    label: 'Trends Analytics'   },
    ],
  },
  {
    id:       'edit-undangan',
    label:    'Edit Undangan',
    icon:     Icons.Form,
    children: [
      { id: 'edit-template',  label: 'Pilih Template'  },
      { id: 'edit-konten',    label: 'Isi Konten'       },
      { id: 'edit-galeri',    label: 'Galeri Foto'      },
      { id: 'edit-countdown', label: 'Countdown Timer'  },
    ],
  },
  {
    id:       'musik',
    label:    'Musik',
    icon:     Icons.Slider,
    children: [
      { id: 'musik-pilih',  label: 'Pilih Musik'         },
      { id: 'musik-upload', label: 'Upload Musik Sendiri' },
    ],
  },
  {
    id:       'rsvp-tamu',
    label:    'RSVP Tamu',
    icon:     Icons.Mail,
    children: [
      { id: 'rsvp-daftar',  label: 'Daftar Tamu'           },
      { id: 'rsvp-konfirm', label: 'Konfirmasi Kehadiran'   },
      { id: 'rsvp-export',  label: 'Export Data Tamu'       },
    ],
  },
  {
    id:       'kado',
    label:    'Kado',
    icon:     Icons.Folder,
    children: [
      { id: 'kado-rekening', label: 'Rekening Bank'    },
      { id: 'kado-ewallet',  label: 'E-Wallet'         },
      { id: 'kado-wishlist', label: 'Wishlist Registry' },
    ],
  },
  {
    id:       'digital-guestbook',
    label:    'Digital Guestbook',
    icon:     Icons.ChatMessage,
    children: [
      { id: 'guestbook-ucapan',   label: 'Ucapan & Doa'    },
      { id: 'guestbook-moderasi', label: 'Moderasi Pesan'   },
      { id: 'guestbook-export',   label: 'Export Buku Tamu' },
    ],
  },
]

// ── Feature cards ─────────────────────────────────────────────────────────────
const FEATURE_CARDS = [
  {
    id:          'edit-undangan',
    icon:        Icons.Form,
    title:       'Undangan Digital',
    desc:        'Buat undangan cantik dari ratusan template premium. Personalisasi setiap detail — dari foto hingga countdown.',
    badge:       'Mulai di sini',
    badgeColor:  'primary' as const,
  },
  {
    id:          'rsvp-tamu',
    icon:        Icons.Mail,
    title:       'RSVP & Manajemen Tamu',
    desc:        'Kelola daftar tamu, lacak konfirmasi kehadiran, dan ekspor data kapan saja dalam satu dasbor.',
    badge:       'Populer',
    badgeColor:  'success' as const,
  },
  {
    id:          'kado',
    icon:        Icons.Folder,
    title:       'Kado Digital',
    desc:        'Terima kado lewat transfer bank atau e-wallet. Tambah beberapa rekening sekaligus dengan mudah.',
    badge:       null,
    badgeColor:  'neutral' as const,
  },
  {
    id:          'digital-guestbook',
    icon:        Icons.ChatMessage,
    title:       'Buku Tamu Digital',
    desc:        'Kumpulkan ucapan dan doa tamu secara real-time. Moderasi pesan dan abadikan kenangan selamanya.',
    badge:       null,
    badgeColor:  'neutral' as const,
  },
]

// ── Quick-start steps ─────────────────────────────────────────────────────────
const QUICK_STEPS = [
  { step: '01', label: 'Buat akun gratis',       done: true  },
  { step: '02', label: 'Pilih template undangan', done: true  },
  { step: '03', label: 'Isi data pernikahan',     done: false },
  { step: '04', label: 'Tambahkan daftar tamu',   done: false },
  { step: '05', label: 'Bagikan link undanganmu', done: false },
]

// ════════════════════════════════════════════════════════════════════════════════
// Story
// ════════════════════════════════════════════════════════════════════════════════
export const Default: Story = {
  name: 'Docs Landing',
  render: () => ({
    components: { Navbar, Sidebar, Card, Breadcrumb, SearchInput, ThemeToggle, Badge, Button },

    setup() {
      const sidebarCollapsed = ref(false)
      const activeId         = ref('intro')
      const searchQuery      = ref('')

      const breadcrumbs = [
        { label: 'Home', href: '#' },
        { label: 'Tutorial', href: '#' },
        { label: 'Intro' },
      ]

      function onNav(item: SidebarItem) {
        activeId.value = item.id
      }

      return {
        sidebarCollapsed, activeId, searchQuery,
        breadcrumbs, onNav,
        NAV_ITEMS, FEATURE_CARDS, QUICK_STEPS,
        Icons,
      }
    },

    template: `
      <!-- Navbar -->
      <Navbar :sticky="true" :floatingOnScroll="true">
        <template #start>
          ${logoBox}
        </template>

        <template #center>
          <div style="display:flex;align-items:center;gap:2px;">
            <button
              v-for="tab in ['Tutorial', 'Blog']"
              :key="tab"
              :style="{
                fontSize: '13px',
                fontWeight: tab === 'Tutorial' ? '600' : '400',
                color: tab === 'Tutorial' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: tab === 'Tutorial' ? 'var(--color-neutral-subtle)' : 'transparent',
                border: 'none', borderRadius: 'var(--radius-md)',
                padding: '5px 12px', cursor: 'pointer',
              }"
            >{{ tab }}</button>
          </div>
        </template>

        <template #end>
          <ThemeToggle size="sm" />
        </template>
      </Navbar>

      <!-- Body -->
      <div style="display:flex;flex:1;overflow:hidden;">

        <!-- Sidebar -->
        <div style="position:sticky;top:0;height:100vh;display:flex;flex-shrink:0;">
          <Sidebar
            v-model="sidebarCollapsed"
            :items="NAV_ITEMS"
            :activeId="activeId"
            width="narrow"
            collapsedWidth="icon-only"
            @itemClick="onNav"
          >
            <template #header="{ collapsed }">
              <div style="display:flex;align-items:center;gap:10px;padding:2px 0;">
                <span v-if="!collapsed" style="font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-tertiary);">
                  Panduan
                </span>
              </div>
            </template>
          </Sidebar>
        </div>

        <!-- Main -->
        <main style="flex:1;overflow-y:auto;padding:40px 48px 80px;max-width:900px;">

          <!-- Breadcrumb -->
          <Breadcrumb :items="breadcrumbs" size="sm" style="margin-bottom:24px;" />

          <!-- Hero -->
          <div style="display:grid;grid-template-columns:1fr 320px;gap:32px;margin-bottom:56px;align-items:start;">

            <!-- Left -->
            <div>
              <h1 style="font-size:36px;font-weight:800;color:var(--color-text-heading);letter-spacing:-0.6px;line-height:1.2;margin:0 0 16px;">
                Panduan Lengkap<br/>Dashboard Abadikan.id
              </h1>

              <p style="font-size:15px;color:var(--color-text-secondary);line-height:1.7;margin:0 0 28px;max-width:440px;">
                Semua yang kamu butuhkan untuk membuat dan mengelola undangan digital —
                dari pendaftaran akun hingga amplop digital. Step by step, tanpa stres.
              </p>

              <div style="margin-bottom:20px;">
                <SearchInput v-model="searchQuery" placeholder="Mau belajar apa dulu?" size="md" />
              </div>

              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <Button variant="primary" size="md">Mulai Tutorial</Button>
                <Button variant="secondary" size="md">Lihat Semua Fitur</Button>
                <Button variant="ghost" size="md">Hubungi Support</Button>
              </div>
            </div>

            <!-- Quick-start panel -->
            <Card variant="outlined" padding="none" radius="lg">
              <template #header>
                <div style="width:100%;display:flex;align-items:center;justify-content:space-between;">
                  <span style="font-size:13px;font-weight:600;color:var(--color-text-heading);">Quick Start</span>
                  <Badge variant="primary" badgeStyle="subtle" size="sm">5 langkah</Badge>
                </div>
              </template>

              <div style="display:flex;flex-direction:column;">
                <div
                  v-for="(s, i) in QUICK_STEPS"
                  :key="i"
                  style="display:flex;align-items:center;gap:12px;padding:10px 20px;"
                  :style="{ borderTop: i > 0 ? '1px solid var(--color-border)' : 'none', opacity: s.done ? 1 : 0.5 }"
                >
                  <div :style="{
                    width:'24px', height:'24px', borderRadius:'50%', flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background: s.done ? 'var(--color-success-light)' : 'var(--color-neutral-light)',
                  }">
                    <span
                      v-if="s.done"
                      style="color:var(--color-success);"
                      v-html="Icons.Check"
                    />
                    <span v-else style="font-size:10px;font-weight:700;color:var(--color-text-tertiary);">
                      {{ s.step }}
                    </span>
                  </div>
                  <span :style="{
                    fontSize: '13px',
                    color: s.done ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    textDecoration: s.done ? 'line-through' : 'none',
                  }">{{ s.label }}</span>
                </div>
              </div>

              <template #footer>
                <Button variant="primary" size="sm" style="width:100%;">
                  Lanjutkan dari Langkah 3 →
                </Button>
              </template>
            </Card>

          </div>

          <!-- Feature section -->
          <p style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--color-primary);margin:0 0 8px;">
            PANDUAN FITUR
          </p>
          <h2 style="font-size:20px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.3px;margin:0 0 4px;">
            Mau belajar dari mana dulu?
          </h2>
          <p style="font-size:14px;color:var(--color-text-secondary);margin:0 0 20px;line-height:1.6;">
            Pilih fitur yang paling kamu butuhkan. Tiap panduan ditulis santai dan step-by-step.
          </p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
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
                <div style="display:flex;align-items:center;gap:10px;width:100%;">
                  <div style="
                    width:36px;height:36px;border-radius:var(--radius-md);
                    background:var(--color-primary-subtle);color:var(--color-primary);
                    display:flex;align-items:center;justify-content:center;flex-shrink:0;
                  " v-html="card.icon" />
                  <span style="font-size:14px;font-weight:600;color:var(--color-text-heading);flex:1;">
                    {{ card.title }}
                  </span>
                  <Badge v-if="card.badge" :variant="card.badgeColor" badgeStyle="subtle" size="sm">
                    {{ card.badge }}
                  </Badge>
                </div>
              </template>

              <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.65;margin:0;padding-top:8px;">
                {{ card.desc }}
              </p>

              <template #footer>
                <span style="font-size:12px;font-weight:600;color:var(--color-primary);">
                  Baca panduan →
                </span>
              </template>
            </Card>
          </div>

        </main>
      </div>
    `,
  }),
}
