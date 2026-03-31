import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import SearchInput from './SearchInput.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    loading: string
    allSizes: string
    inToolbar: string
  }
  search: {
    label: string
    placeholder: string
    empty: string
    countSuffix: string
    searching: string
  }
  loading: {
    label: string
    placeholder: string
    helper: string
  }
  sizes: {
    small: string
    medium: string
    large: string
  }
  toolbar: {
    title: string
    placeholder: string
    countSuffix: string
    empty: string
  }
  guests: string[]
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Guest Search',
      loading: 'Loading',
      allSizes: 'All Sizes',
      inToolbar: 'In Toolbar',
    },
    search: {
      label: 'Guest Search',
      placeholder: 'Search guests...',
      empty: 'No results for',
      countSuffix: 'guests',
      searching: 'Searching',
    },
    loading: {
      label: 'Searching...',
      placeholder: 'Search guests...',
      helper: 'Searching results for',
    },
    sizes: {
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
    },
    toolbar: {
      title: 'Guest List',
      placeholder: 'Search name or email...',
      countSuffix: 'guests',
      empty: 'All guests are shown here',
    },
    guests: ['Budi Santoso', 'Siti Rahayu', 'Ahmad Fauzi', 'Dewi Lestari', 'Raka Pratama', 'Nurul Hidayah'],
  },
  id: {
    storyNames: {
      default: 'Cari Tamu',
      loading: 'Memuat',
      allSizes: 'Semua Ukuran',
      inToolbar: 'Di Toolbar',
    },
    search: {
      label: 'Cari Tamu',
      placeholder: 'Cari tamu...',
      empty: 'Tidak ditemukan untuk',
      countSuffix: 'tamu',
      searching: 'Mencari',
    },
    loading: {
      label: 'Mencari...',
      placeholder: 'Cari tamu...',
      helper: 'Mencari hasil untuk',
    },
    sizes: {
      small: 'Kecil',
      medium: 'Sedang',
      large: 'Besar',
    },
    toolbar: {
      title: 'Daftar Tamu',
      placeholder: 'Cari nama atau email...',
      countSuffix: 'tamu',
      empty: 'Seluruh tamu ditampilkan di sini',
    },
    guests: ['Budi Santoso', 'Siti Rahayu', 'Ahmad Fauzi', 'Dewi Lestari', 'Raka Pratama', 'Nurul Hidayah'],
  },
  zh: {
    storyNames: {
      default: '宾客搜索',
      loading: '加载中',
      allSizes: '所有尺寸',
      inToolbar: '在工具栏中',
    },
    search: {
      label: '宾客搜索',
      placeholder: '搜索宾客...',
      empty: '没有匹配',
      countSuffix: '位宾客',
      searching: '搜索中',
    },
    loading: {
      label: '搜索中...',
      placeholder: '搜索宾客...',
      helper: '正在搜索结果：',
    },
    sizes: {
      small: '小',
      medium: '中',
      large: '大',
    },
    toolbar: {
      title: '宾客列表',
      placeholder: '搜索姓名或邮箱...',
      countSuffix: '位宾客',
      empty: '此处显示所有宾客',
    },
    guests: ['李明', '王芳', '张伟', '陈静', '刘洋', '赵敏'],
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

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue:  { control: 'text' },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    loading:     { control: 'boolean' },
    clearable:   { control: 'boolean' },
    debounce:    { control: 'number' },
    disabled:    { control: 'boolean' },
  },
  args: {
    modelValue:  '',
    size:        'md',
    placeholder: 'Search...',
    loading:     false,
    clearable:   true,
    debounce:    300,
    disabled:    false,
  },
}
export default meta
type Story = StoryObj<typeof SearchInput>

// ── Guest Search ───────────────────────────────────────────────────────────────
export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: () => ({
    components: { SearchInput },
    setup() {
      const query   = ref('')
      const copy = useCopy()
      const results = computed(() =>
        query.value.trim()
          ? copy.value.guests.filter(g => g.toLowerCase().includes(query.value.toLowerCase()))
          : copy.value.guests
      )
      return { query, results, copy }
    },
    template: `
      <div style="width:100%;max-width:400px;display:flex;flex-direction:column;gap:12px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.search.label }}</p>
        <SearchInput v-model="query" :placeholder="copy.search.placeholder" />
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);overflow:hidden;
        ">
          <div
            v-for="(guest, i) in results"
            :key="guest"
            style="
              display:flex;align-items:center;gap:12px;padding:10px 16px;
              cursor:pointer;transition:background 0.15s;
            "
            :style="i < results.length - 1 ? 'border-bottom:1px solid var(--color-border-subtle)' : ''"
          >
            <div style="
              width:32px;height:32px;border-radius:9999px;flex-shrink:0;
              background:var(--color-primary-light);display:flex;align-items:center;
              justify-content:center;font-size:12px;font-weight:700;color:var(--color-primary);
            ">{{ guest.charAt(0) }}</div>
            <span style="font-size:14px;color:var(--color-text-primary);">{{ guest }}</span>
          </div>
          <div v-if="results.length === 0" style="padding:24px;text-align:center;">
            <p style="font-size:14px;color:var(--color-text-tertiary);">{{ copy.search.empty }} "{{ query }}"</p>
          </div>
        </div>
        <p style="font-size:12px;color:var(--color-text-tertiary);">
          {{ results.length }} / {{ copy.guests.length }} {{ copy.search.countSuffix }}
        </p>
      </div>
    `,
  }),
}

// ── Loading State ──────────────────────────────────────────────────────────────
export const Loading: Story = {
  get name() {
    return getStoryName('loading')
  },
  render: () => ({
    components: { SearchInput },
    setup() {
      const value = ref('Syrofi Nadira')
      const copy = useCopy()
      const statusText = computed(() => `${copy.value.loading.helper} "${value.value}"`)
      return { value, copy, statusText }
    },
    template: `
      <div style="width:100%;max-width:360px;display:flex;flex-direction:column;gap:8px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.loading.label }}</p>
        <SearchInput v-model="value" loading :placeholder="copy.loading.placeholder" />
        <p style="font-size:12px;color:var(--color-text-tertiary);">
          {{ statusText }}
        </p>
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
    components: { SearchInput },
    setup() {
      const sm = ref('')
      const md = ref('')
      const lg = ref('')
      return { sm, md, lg, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:360px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizes.small }}</p>
          <SearchInput v-model="sm" size="sm" :placeholder="copy.search.placeholder" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizes.medium }}</p>
          <SearchInput v-model="md" size="md" :placeholder="copy.search.placeholder" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizes.large }}</p>
          <SearchInput v-model="lg" size="lg" :placeholder="copy.search.placeholder" />
        </div>
      </div>
    `,
  }),
}

// ── In Toolbar ─────────────────────────────────────────────────────────────────
export const InToolbar: Story = {
  get name() {
    return getStoryName('inToolbar')
  },
  render: () => ({
    components: { SearchInput },
    setup() {
      const q = ref('')
      const count = ref(247)
      return { q, count, copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:640px;display:flex;flex-direction:column;gap:12px;">
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);padding:14px 16px;
          display:flex;align-items:center;gap:12px;justify-content:space-between;
        ">
          <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);white-space:nowrap;">
            {{ copy.toolbar.title }}
          </p>
          <div style="flex:1;max-width:280px;">
            <SearchInput v-model="q" size="sm" :placeholder="copy.toolbar.placeholder" />
          </div>
          <span style="
            font-size:12px;font-weight:600;padding:2px 10px;white-space:nowrap;
            background:var(--color-neutral-light);color:var(--color-text-secondary);
            border-radius:var(--radius-full);flex-shrink:0;
          ">{{ count }} {{ copy.toolbar.countSuffix }}</span>
        </div>
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);padding:48px;text-align:center;
        ">
          <p style="font-size:13px;color:var(--color-text-tertiary);">
            {{ q ? copy.search.searching + ' "' + q + '"…' : copy.toolbar.empty }}
          </p>
        </div>
      </div>
    `,
  }),
}
