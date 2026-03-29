import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import LanguageToggle from './LanguageToggle.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allSizes: string
    inNavbar: string
  }
  labels: {
    toggle: string
    navbar: string
    size: string
    saveCancel: string
  }
  localeCode: string
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allSizes: 'All Sizes',
      inNavbar: 'In Navbar',
    },
    labels: {
      toggle: 'Language Toggle',
      navbar: 'Navbar context',
      size: 'Size',
      saveCancel: 'Save / Cancel',
    },
    localeCode: 'EN',
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allSizes: 'Semua Ukuran',
      inNavbar: 'Di Navbar',
    },
    labels: {
      toggle: 'Pengalih Bahasa',
      navbar: 'Konteks navbar',
      size: 'Ukuran',
      saveCancel: 'Simpan / Batal',
    },
    localeCode: 'ID',
  },
  zh: {
    storyNames: {
      default: '默认',
      allSizes: '所有尺寸',
      inNavbar: '在导航栏中',
    },
    labels: {
      toggle: '语言切换器',
      navbar: '导航栏上下文',
      size: '尺寸',
      saveCancel: '保存 / 取消',
    },
    localeCode: 'ZH',
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

const meta: Meta<typeof LanguageToggle> = {
  title: 'Molecules/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof LanguageToggle>

// ── Default ────────────────────────────────────────────────────────────────────
export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { LanguageToggle },
    setup: () => ({ args, copy: useCopy() }),
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.labels.toggle }}</p>
        <LanguageToggle v-bind="args" />
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
    components: { LanguageToggle },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <div style="display:flex;align-items:center;gap:14px;">
          <LanguageToggle size="sm" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">sm</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <LanguageToggle size="md" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">md</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <LanguageToggle size="lg" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">lg</span>
        </div>
      </div>
    `,
  }),
}

// ── In Navbar ──────────────────────────────────────────────────────────────────
export const InNavbar: Story = {
  get name() {
    return getStoryName('inNavbar')
  },
  render: () => ({
    components: { LanguageToggle },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="width:100%;max-width:600px;display:flex;flex-direction:column;gap:12px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.labels.navbar }}</p>
        <div style="
          display:flex;align-items:center;justify-content:space-between;
          padding:10px 20px;background:var(--color-surface);
          border:1px solid var(--color-border);border-radius:var(--radius-xl);
        ">
          <span style="font-size:15px;font-weight:700;color:var(--color-text-heading);">{{ $t('nav.settings') }}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:12px;color:var(--color-text-secondary);">{{ $t('settings.language') }}: </span>
            <LanguageToggle />
          </div>
        </div>
        <p style="font-size:12px;color:var(--color-text-tertiary);text-align:center;">
          {{ $t('common.save') }} / {{ $t('common.cancel') }}
        </p>
      </div>
    `,
  }),
}
