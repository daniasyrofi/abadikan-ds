import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import Pagination from './Pagination.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    manyPages: string
    fewPages: string
    allSizes: string
  }
  guestList: {
    title: string
    totalSuffix: string
    guestLabel: string
    status: string
    showing: string
    pageOf: string
  }
  pageSummary: {
    manyPages: string
    fewPages: string
    of: string
  }
  sizes: {
    small: string
    medium: string
    large: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Guest List',
      manyPages: 'Many Pages',
      fewPages: 'Few Pages',
      allSizes: 'All Sizes',
    },
    guestList: {
      title: 'Guest List',
      totalSuffix: 'guests',
      guestLabel: 'Guest',
      status: 'Checked in',
      showing: 'Showing',
      pageOf: 'Page',
    },
    pageSummary: {
      manyPages: '500 items · 10 per page',
      fewPages: '25 items · 10 per page',
      of: 'of',
    },
    sizes: {
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
    },
  },
  id: {
    storyNames: {
      default: 'Daftar Tamu',
      manyPages: 'Banyak Halaman',
      fewPages: 'Sedikit Halaman',
      allSizes: 'Semua Ukuran',
    },
    guestList: {
      title: 'Daftar Tamu',
      totalSuffix: 'tamu',
      guestLabel: 'Tamu',
      status: 'Hadir',
      showing: 'Menampilkan',
      pageOf: 'Halaman',
    },
    pageSummary: {
      manyPages: '500 item · 10 per halaman',
      fewPages: '25 item · 10 per halaman',
      of: 'dari',
    },
    sizes: {
      small: 'Kecil',
      medium: 'Sedang',
      large: 'Besar',
    },
  },
  zh: {
    storyNames: {
      default: '宾客列表',
      manyPages: '多页',
      fewPages: '少页',
      allSizes: '所有尺寸',
    },
    guestList: {
      title: '宾客列表',
      totalSuffix: '位宾客',
      guestLabel: '宾客',
      status: '已签到',
      showing: '显示',
      pageOf: '第',
    },
    pageSummary: {
      manyPages: '500 项目 · 每页 10 项',
      fewPages: '25 项目 · 每页 10 项',
      of: '共',
    },
    sizes: {
      small: '小',
      medium: '中',
      large: '大',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas decorator ───────────────────────────────────────────────────────────
const withCanvas = () => ({
  template: `
    <div style="
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:48px 32px;background-color:var(--color-bg);
      background-image:radial-gradient(circle,var(--color-border) 1px,transparent 1px);
      background-size:24px 24px;
    "><story /></div>`,
})

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue:      { control: 'number' },
    total:           { control: 'number' },
    perPage:         { control: 'number' },
    maxVisiblePages: { control: 'number' },
    showFirstLast:   { control: 'boolean' },
    size:            { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta
type Story = StoryObj<typeof Pagination>

// ── Guest List ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: () => ({
    components: { Pagination },
    setup() {
      const page   = ref(1)
      const total  = 247
      const perPg  = 10
      const start  = computed(() => (page.value - 1) * perPg + 1)
      const end    = computed(() => Math.min(page.value * perPg, total))
      return { page, total, perPg, start, end, copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:640px;display:flex;flex-direction:column;gap:16px;">
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);overflow:hidden;
        ">
          <div style="padding:14px 20px;border-bottom:1px solid var(--color-border-subtle);display:flex;align-items:center;justify-content:space-between;">
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ copy.guestList.title }}</p>
            <span style="
              font-size:12px;font-weight:600;padding:2px 8px;
              background:var(--color-neutral-light);color:var(--color-text-secondary);
              border-radius:var(--radius-full);
            ">{{ total }} {{ copy.guestList.totalSuffix }}</span>
          </div>
          <div style="padding:0 20px;">
            <div
              v-for="i in 5"
              :key="i"
              style="
                display:flex;align-items:center;gap:12px;
                padding:12px 0;border-bottom:1px solid var(--color-border-subtle);
              "
            >
              <div style="
                width:32px;height:32px;border-radius:9999px;flex-shrink:0;
                background:var(--color-neutral-light);display:flex;
                align-items:center;justify-content:center;
                font-size:12px;font-weight:600;color:var(--color-text-secondary);
              ">{{ String.fromCharCode(64 + i + (page - 1) * 5) }}</div>
              <div style="flex:1;">
                <p style="font-size:13px;font-weight:500;color:var(--color-text-primary);">
                  {{ copy.guestList.guestLabel }} {{ (page - 1) * 5 + i }}
                </p>
                <p style="font-size:12px;color:var(--color-text-tertiary);">tamu{{ (page-1)*5+i }}@email.com</p>
              </div>
              <span style="
                font-size:11px;font-weight:600;padding:2px 8px;border-radius:var(--radius-full);
                background:var(--color-success-light);color:var(--color-success);
              ">{{ copy.guestList.status }}</span>
            </div>
          </div>
          <div style="
            padding:12px 20px;display:flex;align-items:center;justify-content:space-between;
            border-top:1px solid var(--color-border-subtle);
          ">
            <p style="font-size:12px;color:var(--color-text-tertiary);">
              {{ copy.guestList.showing }} {{ start }}–{{ end }} {{ copy.guestList.totalSuffix }} {{ total }} {{ copy.guestList.totalSuffix }}
            </p>
            <Pagination v-model="page" :total="total" :per-page="perPg" size="sm" />
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Many Pages ─────────────────────────────────────────────────────────────────
export const ManyPages: Story = {
  get name() {
    return getStoryName('manyPages')
  },
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(25)
      return { page, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:center;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.pageSummary.manyPages }}</p>
        <Pagination v-model="page" :total="500" :per-page="10" />
        <p style="font-size:12px;color:var(--color-text-tertiary);">{{ copy.guestList.pageOf }} {{ page }} {{ copy.pageSummary.of }} 50</p>
      </div>
    `,
  }),
}

// ── Few Pages ──────────────────────────────────────────────────────────────────
export const FewPages: Story = {
  get name() {
    return getStoryName('fewPages')
  },
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1)
      return { page, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:center;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.pageSummary.fewPages }}</p>
        <Pagination v-model="page" :total="25" :per-page="10" />
        <p style="font-size:12px;color:var(--color-text-tertiary);">{{ copy.guestList.pageOf }} {{ page }} {{ copy.pageSummary.of }} 3</p>
      </div>
    `,
  }),
}

// ── All Sizes ──────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Pagination },
    setup() {
      const sm = ref(3)
      const md = ref(3)
      const lg = ref(3)
      return { sm, md, lg, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizes.small }}</p>
          <Pagination v-model="sm" :total="100" size="sm" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizes.medium }}</p>
          <Pagination v-model="md" :total="100" size="md" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizes.large }}</p>
          <Pagination v-model="lg" :total="100" size="lg" />
        </div>
      </div>
    `,
  }),
}
