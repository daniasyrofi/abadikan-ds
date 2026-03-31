import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { RiArrowDownSLine, RiGlobalLine } from '@remixicon/vue'
import LanguageToggle from './LanguageToggle.vue'
import DropdownMenu from '@/components/molecules/DropdownMenu/DropdownMenu.vue'
import Button from '@/components/atoms/Button/Button.vue'
import { getI18nLocale, resolveLocale, setI18nLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allSizes: string
    inNavbar: string
    cardSelector: string
    dropdown: string
  }
  labels: {
    toggle: string
    navbar: string
    size: string
    saveCancel: string
    cardSelector: string
    dropdown: string
    displayOptions: string
    languageNames: Record<Locale, string>
  }
  localeCode: string
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allSizes: 'All Sizes',
      inNavbar: 'In Navbar',
      cardSelector: 'Card Selector',
      dropdown: 'Dropdown',
    },
    labels: {
      toggle: 'Language Toggle',
      navbar: 'Navbar context',
      size: 'Size',
      saveCancel: 'Save / Cancel',
      cardSelector: 'Card Selector Style',
      dropdown: 'Dropdown Style',
      displayOptions: 'Display options',
      languageNames: {
        id: 'Bahasa Indonesia',
        en: 'English',
        zh: 'Mandarin',
      },
    },
    localeCode: 'EN',
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allSizes: 'Semua Ukuran',
      inNavbar: 'Di Navbar',
      cardSelector: 'Selector Kartu',
      dropdown: 'Dropdown',
    },
    labels: {
      toggle: 'Pengalih Bahasa',
      navbar: 'Konteks navbar',
      size: 'Ukuran',
      saveCancel: 'Simpan / Batal',
      cardSelector: 'Gaya Selector Kartu',
      dropdown: 'Gaya Dropdown',
      displayOptions: 'Opsi tampilan',
      languageNames: {
        id: 'Bahasa Indonesia',
        en: 'English',
        zh: 'Mandarin',
      },
    },
    localeCode: 'ID',
  },
  zh: {
    storyNames: {
      default: '默认',
      allSizes: '所有尺寸',
      inNavbar: '在导航栏中',
      cardSelector: '卡片选择器',
      dropdown: '下拉菜单',
    },
    labels: {
      toggle: '语言切换器',
      navbar: '导航栏上下文',
      size: '尺寸',
      saveCancel: '保存 / 取消',
      cardSelector: '卡片选择器样式',
      dropdown: '下拉样式',
      displayOptions: '显示选项',
      languageNames: {
        id: '印尼语',
        en: '英语',
        zh: '中文',
      },
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

// ── Card Selector Style ────────────────────────────────────────────────────────
export const CardSelector: Story = {
  get name() {
    return getStoryName('cardSelector')
  },
  render: () => ({
    setup: () => {
      const copy = useCopy()
      const active = ref<Locale>(getLocale())

      const options = computed(() => ([
        { value: 'id' as Locale, code: 'ID', label: copy.value.labels.languageNames.id },
        { value: 'en' as Locale, code: 'EN', label: copy.value.labels.languageNames.en },
        { value: 'zh' as Locale, code: 'ZH', label: copy.value.labels.languageNames.zh },
      ]))

      const select = (value: Locale) => {
        active.value = value
        setI18nLocale(value)
      }

      const cardStyle = (value: Locale) => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 10px 10px',
        borderRadius: '16px',
        border: active.value === value
          ? '2px solid var(--color-text-primary)'
          : '1px solid var(--color-border)',
        backgroundColor: active.value === value
          ? 'var(--color-surface)'
          : 'var(--color-bg)',
        boxShadow: active.value === value
          ? '0 10px 18px -14px oklch(0.2 0 0 / 0.4), 0 1px 2px oklch(0.2 0 0 / 0.1)'
          : 'none',
        transform: active.value === value ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all var(--duration-normal) var(--ease-out)',
        cursor: 'pointer',
      })

      const previewStyle = (value: Locale) => ({
        width: '48px',
        height: '36px',
        borderRadius: '9px',
        border: '1px solid var(--color-border)',
        background:
          value === 'id'
            ? 'linear-gradient(90deg, color-mix(in oklab, var(--color-neutral) 18%, transparent) 58%, transparent 58%)'
            : value === 'en'
              ? 'linear-gradient(90deg, color-mix(in oklab, var(--color-neutral) 12%, transparent) 38%, transparent 38%)'
              : 'linear-gradient(180deg, transparent 64%, color-mix(in oklab, var(--color-neutral) 10%, transparent) 64%)',
      })

      const checkStyle = {
        position: 'absolute',
        right: '8px',
        bottom: '8px',
        width: '20px',
        height: '20px',
        borderRadius: '999px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '700',
        color: 'white',
        backgroundColor: 'var(--color-text-primary)',
      }

      return { copy, active, options, select, cardStyle, previewStyle, checkStyle }
    },
    template: `
      <div style="width:100%;max-width:460px;display:flex;flex-direction:column;gap:12px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);">
          {{ copy.labels.cardSelector }}
        </p>
        <div style="padding:14px;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface);">
          <p style="font-size:18px;font-weight:600;line-height:1.2;color:var(--color-text-primary);margin-bottom:12px;">
            {{ copy.labels.displayOptions }}
          </p>
          <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;">
            <button
              v-for="option in options"
              :key="option.value"
              type="button"
              :style="cardStyle(option.value)"
              @click="select(option.value)"
            >
              <span :style="previewStyle(option.value)" />
              <span style="font-size:13px;font-weight:700;color:var(--color-text-primary);line-height:1;">{{ option.code }}</span>
              <span style="font-size:11px;color:var(--color-text-secondary);line-height:1;">{{ option.label }}</span>
              <span v-if="active === option.value" :style="checkStyle">✓</span>
            </button>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Dropdown Style ────────────────────────────────────────────────────────────
export const Dropdown: Story = {
  get name() {
    return getStoryName('dropdown')
  },
  render: () => ({
    components: { DropdownMenu, Button, RiGlobalLine, RiArrowDownSLine },
    setup: () => {
      const copy = useCopy()
      const active = ref<Locale>(getLocale())

      const setLocale = (value: Locale) => {
        active.value = value
        setI18nLocale(value)
      }

      const currentLabel = computed(() => copy.value.labels.languageNames[active.value])

      const items = computed(() => ([
        { label: `${active.value === 'id' ? '✓ ' : ''}${copy.value.labels.languageNames.id}`, action: () => setLocale('id') },
        { label: `${active.value === 'en' ? '✓ ' : ''}${copy.value.labels.languageNames.en}`, action: () => setLocale('en') },
        { label: `${active.value === 'zh' ? '✓ ' : ''}${copy.value.labels.languageNames.zh}`, action: () => setLocale('zh') },
      ]))

      return { copy, items, currentLabel }
    },
    template: `
      <div style="width:100%;max-width:440px;display:flex;flex-direction:column;gap:10px;align-items:flex-start;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);">
          {{ copy.labels.dropdown }}
        </p>
        <DropdownMenu :items="items" width="220px" placement="bottom-start">
          <template #trigger>
            <Button variant="outline">
              <template #leading><RiGlobalLine :size="16" /></template>
              {{ currentLabel }}
              <template #trailing><RiArrowDownSLine :size="16" /></template>
            </Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}
