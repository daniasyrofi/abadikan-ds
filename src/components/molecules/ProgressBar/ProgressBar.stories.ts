import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import ProgressBar from './ProgressBar.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allVariants: string
    sizes: string
    indeterminate: string
  }
  defaultLabel: string
  variants: Record<'primary' | 'success' | 'warning' | 'danger' | 'info', string>
  sizes: Record<'sm' | 'md' | 'lg', string>
  loading: string
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allVariants: 'All Variants',
      sizes: 'Sizes',
      indeterminate: 'Indeterminate',
    },
    defaultLabel: 'Upload progress',
    variants: {
      primary: 'Primary',
      success: 'Success',
      warning: 'Warning',
      danger: 'Danger',
      info: 'Info',
    },
    sizes: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
    loading: 'Loading...',
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allVariants: 'Semua Varian',
      sizes: 'Ukuran',
      indeterminate: 'Tidak Pasti',
    },
    defaultLabel: 'Progres unggah',
    variants: {
      primary: 'Utama',
      success: 'Berhasil',
      warning: 'Peringatan',
      danger: 'Bahaya',
      info: 'Info',
    },
    sizes: {
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
    },
    loading: 'Memuat...',
  },
  zh: {
    storyNames: {
      default: '默认',
      allVariants: '所有变体',
      sizes: '尺寸',
      indeterminate: '不确定',
    },
    defaultLabel: '上传进度',
    variants: {
      primary: '主色',
      success: '成功',
      warning: '警告',
      danger: '危险',
      info: '信息',
    },
    sizes: {
      sm: '小',
      md: '中',
      lg: '大',
    },
    loading: '加载中...',
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <story />
    </div>
  `,
})

const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  args: {
    value: 65,
    label: copyMap.en.defaultLabel,
    showValue: true,
  },
  render: (args) => ({
    components: { ProgressBar },
    setup: () => ({ args, copy: useCopy() }),
    template: '<ProgressBar v-bind="args" :label="copy.defaultLabel" />',
  }),
}

export const AllVariants: Story = {
  get name() {
    return getStoryName('allVariants')
  },
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;width:100%;max-width:420px;">
        <ProgressBar :value="75" variant="primary" :label="copy.variants.primary" show-value />
        <ProgressBar :value="90" variant="success" :label="copy.variants.success" show-value />
        <ProgressBar :value="45" variant="warning" :label="copy.variants.warning" show-value />
        <ProgressBar :value="30" variant="danger"  :label="copy.variants.danger"  show-value />
        <ProgressBar :value="60" variant="info"    :label="copy.variants.info"    show-value />
      </div>
    `,
    setup() {
      return { copy: useCopy() }
    },
  }),
}

export const Sizes: Story = {
  get name() {
    return getStoryName('sizes')
  },
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;width:100%;max-width:420px;">
        <ProgressBar :value="55" size="sm" :label="copy.sizes.sm" show-value />
        <ProgressBar :value="55" size="md" :label="copy.sizes.md" show-value />
        <ProgressBar :value="55" size="lg" :label="copy.sizes.lg" show-value />
      </div>
    `,
    setup() {
      return { copy: useCopy() }
    },
  }),
}

export const Indeterminate: Story = {
  get name() {
    return getStoryName('indeterminate')
  },
  args: {
    indeterminate: true,
    label: copyMap.en.loading,
  },
  render: (args) => ({
    components: { ProgressBar },
    setup: () => ({ args, copy: useCopy() }),
    template: '<ProgressBar v-bind="args" :label="copy.loading" />',
  }),
}
