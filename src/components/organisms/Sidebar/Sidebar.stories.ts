import { ref, computed, defineComponent } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { useTheme } from '@/composables/useTheme'
import { Icons } from '@/lib/icons'
import SearchInput from '@/components/molecules/SearchInput/SearchInput.vue'

// ── Navigation data ───────────────────────────────────────────────────────────
interface NavChild { id: string; label: string }
interface NavItem  { id: string; label: string; icon: string; children?: NavChild[] }
interface NavSection { id: string; label: string; items: NavItem[] }

const SECTIONS: NavSection[] = [
  {
    id: 'panduan-dasar', label: 'Panduan Dasar',
    items: [
      { id: 'intro',      label: 'Intro',      icon: Icons.Book,  children: [
        { id: 'intro-pengenalan', label: 'Pengenalan Platform' },
        { id: 'intro-fitur',      label: 'Fitur Unggulan'      },
        { id: 'intro-cara',       label: 'Cara Membaca'        },
      ]},
      { id: 'quickstart', label: 'Quickstart', icon: Icons.Check, children: [
        { id: 'qs-akun',  label: 'Buat Akun Gratis'   },
        { id: 'qs-undang', label: 'Undangan Pertama'  },
        { id: 'qs-share', label: 'Bagikan Link'        },
      ]},
    ],
  },
  {
    id: 'dashboard', label: 'Dashboard',
    items: [
      { id: 'dash-link',      label: 'Link Undangan',      icon: Icons.Breadcrumb  },
      { id: 'dash-progress',  label: 'Progress Undangan',  icon: Icons.ProgressBar },
      { id: 'dash-statistik', label: 'Statistik Undangan', icon: Icons.BarChart    },
      { id: 'dash-tamu',      label: 'Statistik Tamu',     icon: Icons.Team        },
      { id: 'dash-pesan',     label: 'Pesan Terbaru',      icon: Icons.Inbox       },
      { id: 'dash-analytics', label: 'Analytics Overview', icon: Icons.BarChart    },
      { id: 'dash-trends',    label: 'Trends Analytics',   icon: Icons.BarChart    },
    ],
  },
  {
    id: 'kustomisasi', label: 'Kustomisasi',
    items: [
      { id: 'edit-undangan', label: 'Edit Undangan', icon: Icons.Form, children: [
        { id: 'edit-template',  label: 'Pilih Template'  },
        { id: 'edit-konten',    label: 'Isi Konten'      },
        { id: 'edit-galeri',    label: 'Galeri Foto'     },
        { id: 'edit-countdown', label: 'Countdown Timer' },
      ]},
      { id: 'musik', label: 'Musik', icon: Icons.Slider, children: [
        { id: 'musik-pilih',  label: 'Pilih Musik'         },
        { id: 'musik-upload', label: 'Upload Musik Sendiri' },
      ]},
    ],
  },
  {
    id: 'interaksi-tamu', label: 'Interaksi Tamu',
    items: [
      { id: 'rsvp-tamu', label: 'RSVP Tamu', icon: Icons.Mail, children: [
        { id: 'rsvp-daftar',  label: 'Daftar Tamu'           },
        { id: 'rsvp-konfirm', label: 'Konfirmasi Kehadiran'   },
        { id: 'rsvp-export',  label: 'Export Data Tamu'       },
      ]},
      { id: 'kado', label: 'Kado', icon: Icons.Folder, children: [
        { id: 'kado-rekening', label: 'Rekening Bank'    },
        { id: 'kado-ewallet',  label: 'E-Wallet'         },
        { id: 'kado-wishlist', label: 'Wishlist Registry' },
      ]},
      { id: 'digital-guestbook', label: 'Digital Guestbook', icon: Icons.ChatMessage, children: [
        { id: 'gb-ucapan',   label: 'Ucapan & Doa'    },
        { id: 'gb-moderasi', label: 'Moderasi Pesan'   },
        { id: 'gb-export',   label: 'Export Buku Tamu' },
      ]},
    ],
  },
]

// ── Meta ──────────────────────────────────────────────────────────────────────
const DocsNav = defineComponent({ template: '<div />' })

const meta: Meta = {
  title:     'Organisms/Sidebar',
  component: DocsNav,
  tags:      ['autodocs'],
  decorators: [
    () => ({
      template: `
        <div style="display:flex;height:680px;border:1px solid var(--color-border);border-radius:12px;overflow:hidden;background:var(--color-bg);width:100%;max-width:1000px;margin:0 auto;box-shadow:var(--shadow-sm);">
          <story />
        </div>
      `,
    }),
  ],
}
export default meta
type Story = StoryObj

// ════════════════════════════════════════════════════════════════════════════════
// Default
// ════════════════════════════════════════════════════════════════════════════════
export const Default: Story = {
  name: 'Default',
  render: () => ({
    components: { SearchInput },
    setup() {
      const { theme }  = useTheme()
      const isDark     = computed(() => theme.value === 'dark')

      // Logo colours
      const logoBg    = computed(() => isDark.value ? '#ffffff'              : 'var(--color-primary)')
      const logoFill  = computed(() => isDark.value ? 'var(--color-primary)' : '#ffffff')
      const docsColor = computed(() => isDark.value ? '#ffffff'              : 'var(--color-text-heading)')

      // Sidebar open/close + hover-peek
      const pinned  = ref(false)
      const hovered = ref(false)
      const open    = computed(() => !pinned.value || hovered.value)

      function onEnter() { if (pinned.value) hovered.value = true  }
      function onLeave() { hovered.value = false }
      function toggle()  { pinned.value = !pinned.value; hovered.value = false }

      // Section collapse
      const collapsedSections = ref<Set<string>>(new Set())
      function toggleSection(id: string) {
        const next = new Set(collapsedSections.value)
        next.has(id) ? next.delete(id) : next.add(id)
        collapsedSections.value = next
      }

      // Active item
      const activeParent = ref('intro')
      const activeChild  = ref('intro-pengenalan')
      function activateParent(item: NavItem) {
        activeParent.value = item.id
        activeChild.value  = item.children?.[0]?.id ?? ''
      }

      const query = ref('')

      return {
        isDark, logoBg, logoFill, docsColor,
        pinned, open, onEnter, onLeave, toggle,
        collapsedSections, toggleSection,
        activeParent, activeChild, activateParent,
        query, SECTIONS,
        Icons,
      }
    },

    template: `
      <div
        @mouseenter="onEnter"
        @mouseleave="onLeave"
        :style="{
          width: open ? '256px' : '0px',
          minWidth: open ? '256px' : '0px',
          transition: 'min-width 0.25s cubic-bezier(0.4,0,0.2,1), width 0.25s cubic-bezier(0.4,0,0.2,1)',
          flexShrink: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-bg)',
          borderRight: '1px solid var(--color-border)',
          overflow: 'hidden',
        }"
      >
        <!-- ── Header ── -->
        <div style="
          padding: 12px 12px 12px 14px;
          border-bottom: 1px solid var(--color-border);
          display: flex; align-items: center;
          gap: 8px; flex-shrink: 0;
        ">
          <!-- Logomark -->
          <div :style="{
            width:'26px', height:'26px', borderRadius:'7px',
            background: logoBg,
            display:'flex', alignItems:'center', justifyContent:'center',
            flexShrink: 0,
          }">
            <svg width="14" height="14" viewBox="0 0 24 24" :fill="logoFill">
              <path d="M12 3C9.24 3 7 5.24 7 8s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 12c-3.87 0-7 1.79-7 4v1h14v-1c0-2.21-3.13-4-7-4z"/>
            </svg>
          </div>

          <!-- Docs label -->
          <span :style="{ fontSize:'14px', fontWeight:'700', color: docsColor, flex:1, whiteSpace:'nowrap' }">
            Docs
          </span>

          <!-- Collapse toggle -->
          <button
            @click.stop="toggle"
            style="
              width:26px; height:26px; border-radius:6px;
              border:none; background:transparent;
              display:flex; align-items:center; justify-content:center;
              color:var(--color-text-tertiary); cursor:pointer;
              flex-shrink:0;
              transition: background .12s, color .12s;
            "
            @mouseenter="e => e.currentTarget.style.background='var(--color-neutral-light)'"
            @mouseleave="e => e.currentTarget.style.background='transparent'"
          >
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
              :style="{ transform: pinned ? 'rotate(180deg)' : 'none', transition:'transform .2s' }"
            >
              <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"/>
            </svg>
          </button>
        </div>

        <!-- ── Search ── -->
        <div style="padding:10px 10px 6px; flex-shrink:0;">
          <SearchInput v-model="query" placeholder="Cari panduan…" size="sm" />
        </div>

        <!-- ── Nav ── -->
        <nav style="flex:1; overflow-y:auto; padding:4px 0 16px;">
          <div v-for="section in SECTIONS" :key="section.id">

            <!-- Section header -->
            <button
              @click="toggleSection(section.id)"
              style="
                width:100%; display:flex; align-items:center;
                padding:10px 14px 4px;
                background:transparent; border:none; cursor:pointer;
                gap:6px;
              "
            >
              <span style="
                flex:1; text-align:left;
                font-size:11px; font-weight:700; letter-spacing:.07em;
                text-transform:uppercase; color:var(--color-text-tertiary);
              ">{{ section.label }}</span>
              <svg
                width="13" height="13" viewBox="0 0 24 24"
                fill="var(--color-text-tertiary)"
                :style="{ transform: collapsedSections.has(section.id) ? 'rotate(-90deg)' : 'none', transition:'transform .15s' }"
              >
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
              </svg>
            </button>

            <!-- Items -->
            <div v-if="!collapsedSections.has(section.id)" style="padding: 2px 0;">
              <div v-for="item in section.items" :key="item.id">

                <!-- Parent row -->
                <button
                  @click="activateParent(item)"
                  :style="{
                    width:'100%', display:'flex', alignItems:'center',
                    gap:'10px', padding:'7px 14px',
                    background: activeParent === item.id ? 'var(--color-primary-subtle)' : 'transparent',
                    borderLeft: activeParent === item.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                    border:'none',
                    borderLeft: activeParent === item.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                    cursor:'pointer',
                  }"
                >
                  <!-- Icon box -->
                  <div :style="{
                    width:'34px', height:'34px', borderRadius:'8px', flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background: activeParent === item.id ? 'var(--color-primary-light)' : 'var(--color-neutral-light)',
                    color: activeParent === item.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  }" v-html="item.icon" />

                  <!-- Label -->
                  <span :style="{
                    fontSize:'14px', fontWeight:'600',
                    color: activeParent === item.id ? 'var(--color-primary-strong)' : 'var(--color-text-primary)',
                    textAlign:'left', flex:1, whiteSpace:'nowrap',
                  }">{{ item.label }}</span>
                </button>

                <!-- Children (shown when parent is active) -->
                <div
                  v-if="item.children && activeParent === item.id"
                  style="position:relative; padding: 2px 0 4px 0;"
                >
                  <!-- Vertical line -->
                  <div style="
                    position:absolute; left:29px; top:0; bottom:0;
                    width:1.5px; background:var(--color-primary-light);
                  " />

                  <button
                    v-for="child in item.children"
                    :key="child.id"
                    @click="activeChild = child.id"
                    :style="{
                      width:'100%', display:'block', textAlign:'left',
                      padding:'5px 14px 5px 50px',
                      fontSize:'13px', fontWeight: activeChild === child.id ? '500' : '400',
                      color: activeChild === child.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      background: activeChild === child.id ? 'var(--color-primary-subtle)' : 'transparent',
                      border:'none', cursor:'pointer',
                      lineHeight:'1.5', whiteSpace:'nowrap',
                      transition:'color .1s, background .1s',
                    }"
                  >{{ child.label }}</button>
                </div>

              </div>
            </div>
          </div>
        </nav>
      </div>

      <!-- ── Content ── -->
      <div style="flex:1; padding:32px 40px; background:var(--color-surface); overflow-y:auto;">
        <p style="font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-tertiary);margin:0 0 8px;">
          Abadikan Docs
        </p>
        <h1 style="font-size:26px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.4px;margin:0 0 12px;">
          {{ SECTIONS.flatMap(s=>s.items).find(i=>i.id===activeParent)?.label ?? 'Intro' }}
        </h1>
        <p style="font-size:14px;color:var(--color-text-secondary);line-height:1.7;max-width:520px;margin:0;">
          Klik item di sidebar untuk berpindah halaman. Tombol collapse ada di sebelah logo — hover sidebar untuk peek saat tertutup.
        </p>
      </div>
    `,
  }),
}
