import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allSizes: string
    inNavbar: string
    withLanguageToggle: string
  }
  labels: {
    toggle: string
    navbar: string
    context: string
    saveLanguage: string
    combined: string
    code: string
  }
  description: string
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allSizes: 'All Sizes',
      inNavbar: 'In Navbar',
      withLanguageToggle: 'With Language Toggle',
    },
    labels: {
      toggle: 'Theme Toggle',
      navbar: 'Navbar context',
      context: 'Undangan.id',
      saveLanguage: 'Toggle saves preferences to localStorage and applies data-theme to <html>',
      combined: 'Combined controls',
      code: 'EN',
    },
    description: 'Toggle saves preferences to localStorage and applies data-theme to <html>',
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allSizes: 'Semua Ukuran',
      inNavbar: 'Di Navbar',
      withLanguageToggle: 'Dengan Pengalih Bahasa',
    },
    labels: {
      toggle: 'Pengalih Tema',
      navbar: 'Konteks navbar',
      context: 'Undangan.id',
      saveLanguage: 'Toggle menyimpan preferensi ke localStorage dan menerapkan data-theme ke <html>',
      combined: 'Kontrol gabungan',
      code: 'ID',
    },
    description: 'Toggle menyimpan preferensi ke localStorage dan menerapkan data-theme ke <html>',
  },
  zh: {
    storyNames: {
      default: '默认',
      allSizes: '所有尺寸',
      inNavbar: '在导航栏中',
      withLanguageToggle: '带语言切换器',
    },
    labels: {
      toggle: '主题切换器',
      navbar: '导航栏上下文',
      context: 'Undangan.id',
      saveLanguage: '切换会将偏好保存到 localStorage，并将 data-theme 应用到 <html>',
      combined: '组合控制',
      code: 'ZH',
    },
    description: '切换会将偏好保存到 localStorage，并将 data-theme 应用到 <html>',
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

const meta: Meta<typeof ThemeToggle> = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof ThemeToggle>

// ── Default ────────────────────────────────────────────────────────────────────
export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { ThemeToggle },
    setup: () => ({ args, copy: useCopy() }),
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.labels.toggle }}</p>
        <ThemeToggle v-bind="args" />
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
    components: { ThemeToggle },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <div style="display:flex;align-items:center;gap:14px;">
          <ThemeToggle size="sm" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">sm</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <ThemeToggle size="md" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">md</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <ThemeToggle size="lg" />
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
    components: { ThemeToggle },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="width:100%;max-width:600px;display:flex;flex-direction:column;gap:12px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.labels.navbar }}</p>
        <div style="
          display:flex;align-items:center;justify-content:space-between;
          padding:10px 20px;background:var(--color-surface);
          border:1px solid var(--color-border);border-radius:var(--radius-xl);
        ">
          <span style="font-size:15px;font-weight:700;color:var(--color-text-heading);">{{ copy.labels.context }}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <ThemeToggle />
          </div>
        </div>
        <p style="font-size:12px;color:var(--color-text-tertiary);text-align:center;">
          {{ copy.description }}
        </p>
      </div>
    `,
  }),
}

// ── With Language Toggle ───────────────────────────────────────────────────────
export const WithLanguageToggle: Story = {
  get name() {
    return getStoryName('withLanguageToggle')
  },
  render: () => ({
    components: { ThemeToggle },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="width:100%;max-width:600px;display:flex;flex-direction:column;gap:12px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.labels.combined }}</p>
        <div style="
          display:flex;align-items:center;justify-content:space-between;
          padding:10px 20px;background:var(--color-surface);
          border:1px solid var(--color-border);border-radius:var(--radius-xl);
        ">
          <span style="font-size:15px;font-weight:700;color:var(--color-text-heading);">{{ copy.labels.context }}</span>
          <div style="display:flex;align-items:center;gap:6px;">
            <ThemeToggle size="sm" />
            <div style="width:1px;height:16px;background:var(--color-border);"></div>
            <span style="font-size:12px;font-weight:600;color:var(--color-text-secondary);">{{ copy.labels.code }}</span>
          </div>
        </div>
      </div>
    `,
  }),
}
