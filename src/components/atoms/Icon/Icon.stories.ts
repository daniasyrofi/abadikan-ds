import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Icon from './Icon.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allSizes: string
    iconGrid: string
    coloredIcons: string
  }
  sizeLabels: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>
  titleLabels: {
    copyToClipboard: string
  }
  colorLabels: Record<'danger' | 'success' | 'warning' | 'info' | 'primary' | 'muted', string>
}

const commonIcons = [
  'RiHomeLine',
  'RiUser3Line',
  'RiSettings3Line',
  'RiSearchLine',
  'RiHeartLine',
  'RiStarLine',
  'RiBellLine',
  'RiMailLine',
  'RiLockLine',
  'RiCheckLine',
  'RiCloseLine',
  'RiArrowRightLine',
  'RiAddLine',
  'RiDeleteBinLine',
  'RiEditLine',
  'RiDownloadLine',
  'RiEyeLine',
  'RiEyeOffLine',
  'RiInformationLine',
  'RiAlertLine',
  'RiCalendarLine',
  'RiPhoneLine',
  'RiMapPinLine',
  'RiGlobeLine',
]

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allSizes: 'All Sizes',
      iconGrid: 'Icon Grid',
      coloredIcons: 'Colored Icons',
    },
    sizeLabels: {
      xs: 'Extra Small',
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
      xl: 'Extra Large',
    },
    titleLabels: {
      copyToClipboard: 'Click to copy',
    },
    colorLabels: {
      danger: 'Danger',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      primary: 'Primary',
      muted: 'Muted',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allSizes: 'Semua Ukuran',
      iconGrid: 'Kisi Ikon',
      coloredIcons: 'Ikon Berwarna',
    },
    sizeLabels: {
      xs: 'Ekstra Kecil',
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
      xl: 'Ekstra Besar',
    },
    titleLabels: {
      copyToClipboard: 'Klik untuk menyalin',
    },
    colorLabels: {
      danger: 'Bahaya',
      success: 'Berhasil',
      warning: 'Peringatan',
      info: 'Info',
      primary: 'Utama',
      muted: 'Pudar',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allSizes: '全部尺寸',
      iconGrid: '图标网格',
      coloredIcons: '彩色图标',
    },
    sizeLabels: {
      xs: '超小',
      sm: '小',
      md: '中',
      lg: '大',
      xl: '超大',
    },
    titleLabels: {
      copyToClipboard: '点击复制',
    },
    colorLabels: {
      danger: '危险',
      success: '成功',
      warning: '警告',
      info: '信息',
      primary: '主要',
      muted: '弱化',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'component' },
  argTypes: {
    name: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
  },
  args: {
    name: 'RiHomeLine',
    size: 'md',
  },
}
export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Icon },
    setup: () => ({ args }),
    template: '<Icon v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Icon },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:flex-end;gap:20px;">
        <div v-for="s in ['xs','sm','md','lg','xl']" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Icon name="RiHomeLine" :size="s" />
          <span style="font-size:11px;color:var(--color-text-tertiary);">{{ copy.sizeLabels[s] }}</span>
        </div>
      </div>
    `,
  }),
}

export const IconGrid: Story = {
  get name() {
    return getStoryName('iconGrid')
  },
  render: () => ({
    components: { Icon },
    setup() {
      const copy = useCopy()
      const copied = ref<string | null>(null)
      function copyName(name: string) {
        navigator.clipboard?.writeText(name)
        copied.value = name
        setTimeout(() => {
          copied.value = null
        }, 1500)
      }
      return { copy, icons: commonIcons, copied, copyName }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:480px;">
        <button
          v-for="icon in icons"
          :key="icon"
          style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 8px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-surface);min-width:80px;cursor:pointer;transition:background 150ms;"
          :style="{ background: copied === icon ? 'var(--color-primary-light)' : 'var(--color-surface)' }"
          :title="copy.titleLabels.copyToClipboard + ': ' + icon"
          @click="copyName(icon)"
        >
          <Icon :name="icon" size="md" />
          <span style="font-size:10px;color:var(--color-text-secondary);text-align:center;line-height:1.2;">{{ icon.replace('Ri','').replace('Line','') }}</span>
        </button>
      </div>
    `,
  }),
}

export const ColoredIcons: Story = {
  get name() {
    return getStoryName('coloredIcons')
  },
  render: () => ({
    components: { Icon },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <div v-for="[name, color, label] in [
          ['RiHeartLine', 'var(--color-danger)', copy.colorLabels.danger],
          ['RiCheckLine', 'var(--color-success)', copy.colorLabels.success],
          ['RiAlertLine', 'var(--color-warning)', copy.colorLabels.warning],
          ['RiInformationLine', 'var(--color-info)', copy.colorLabels.info],
          ['RiStarLine', 'var(--color-primary)', copy.colorLabels.primary],
          ['RiSettings3Line', 'var(--color-text-secondary)', copy.colorLabels.muted],
        ]" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <Icon :name="name" size="lg" :color="color" />
          <span style="font-size:10px;color:var(--color-text-tertiary);">{{ label }}</span>
        </div>
      </div>
    `,
  }),
}
