import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Slider from './Slider.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    sizes: string
    customRange: string
    disabled: string
  }
  labels: {
    volume: string
    small: string
    medium: string
    large: string
    rating: string
    disabled: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      sizes: 'Sizes',
      customRange: 'Custom Range',
      disabled: 'Disabled',
    },
    labels: {
      volume: 'Volume',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      rating: 'Rating',
      disabled: 'Disabled',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      sizes: 'Ukuran',
      customRange: 'Rentang Kustom',
      disabled: 'Nonaktif',
    },
    labels: {
      volume: 'Volume',
      small: 'Kecil',
      medium: 'Sedang',
      large: 'Besar',
      rating: 'Penilaian',
      disabled: 'Terkunci',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      sizes: '尺寸',
      customRange: '自定义范围',
      disabled: '禁用',
    },
    labels: {
      volume: '音量',
      small: '小',
      medium: '中',
      large: '大',
      rating: '评分',
      disabled: '禁用',
    },
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

const meta: Meta<typeof Slider> = {
  title: 'Molecules/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue: { control: { type: 'range', min: 0, max: 100 } },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: () => ({
    components: { Slider },
    template: `
      <div style="width:100%;max-width:380px;">
        <Slider v-model="val" :label="copy.labels.volume" show-value />
      </div>
    `,
    setup() {
      const val = ref(50)
      return { val, copy: useCopy() }
    },
  }),
}

export const Sizes: Story = {
  get name() {
    return getStoryName('sizes')
  },
  render: () => ({
    components: { Slider },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;width:100%;max-width:380px;">
        <Slider v-model="v1" size="sm" :label="copy.labels.small" show-value />
        <Slider v-model="v2" size="md" :label="copy.labels.medium" show-value />
        <Slider v-model="v3" size="lg" :label="copy.labels.large" show-value />
      </div>
    `,
    setup() {
      const v1 = ref(30)
      const v2 = ref(50)
      const v3 = ref(70)
      return { v1, v2, v3, copy: useCopy() }
    },
  }),
}

export const CustomRange: Story = {
  get name() {
    return getStoryName('customRange')
  },
  render: () => ({
    components: { Slider },
    template: `
      <div style="width:100%;max-width:380px;">
        <Slider v-model="val" :min="0" :max="10" :step="1" :label="copy.labels.rating" show-value />
      </div>
    `,
    setup() {
      const val = ref(7)
      return { val, copy: useCopy() }
    },
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { Slider },
    template: `
      <div style="width:100%;max-width:380px;">
        <Slider v-model="val" disabled :label="copy.labels.disabled" show-value />
      </div>
    `,
    setup() {
      const val = ref(40)
      return { val, copy: useCopy() }
    },
  }),
}
