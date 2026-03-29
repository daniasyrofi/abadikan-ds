import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import Stepper from './Stepper.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    horizontal: string
    vertical: string
    allCompleted: string
    firstStep: string
  }
  steps: Array<{
    title: string
    description: string
  }>
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      horizontal: 'Horizontal',
      vertical: 'Vertical',
      allCompleted: 'All Completed',
      firstStep: 'First Step',
    },
    steps: [
      { title: 'Account', description: 'Create your account' },
      { title: 'Profile', description: 'Set up your profile' },
      { title: 'Preferences', description: 'Choose your settings' },
      { title: 'Complete', description: 'All done!' },
    ],
  },
  id: {
    storyNames: {
      horizontal: 'Horizontal',
      vertical: 'Vertikal',
      allCompleted: 'Semua Selesai',
      firstStep: 'Langkah Pertama',
    },
    steps: [
      { title: 'Akun', description: 'Buat akun Anda' },
      { title: 'Profil', description: 'Siapkan profil Anda' },
      { title: 'Preferensi', description: 'Pilih pengaturan Anda' },
      { title: 'Selesai', description: 'Selesai!' },
    ],
  },
  zh: {
    storyNames: {
      horizontal: '水平',
      vertical: '垂直',
      allCompleted: '全部完成',
      firstStep: '第一步',
    },
    steps: [
      { title: '账号', description: '创建你的账号' },
      { title: '资料', description: '设置你的个人资料' },
      { title: '偏好', description: '选择你的设置' },
      { title: '完成', description: '全部完成！' },
    ],
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

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeStep: { control: { type: 'number', min: 0, max: 3 } },
    variant: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

export const Horizontal: Story = {
  get name() {
    return getStoryName('horizontal')
  },
  render: () => ({
    components: { Stepper },
    template: `
      <div style="width:100%;max-width:600px;">
        <Stepper :steps="steps" :active-step="1" />
      </div>
    `,
    setup() {
      const copy = useCopy()
      return { steps: copy.value.steps }
    },
  }),
}

export const Vertical: Story = {
  get name() {
    return getStoryName('vertical')
  },
  render: () => ({
    components: { Stepper },
    template: `
      <div style="width:100%;max-width:320px;">
        <Stepper :steps="steps" :active-step="2" variant="vertical" />
      </div>
    `,
    setup() {
      const copy = useCopy()
      return { steps: copy.value.steps }
    },
  }),
}

export const AllCompleted: Story = {
  get name() {
    return getStoryName('allCompleted')
  },
  render: () => ({
    components: { Stepper },
    template: `
      <div style="width:100%;max-width:600px;">
        <Stepper :steps="steps" :active-step="4" />
      </div>
    `,
    setup() {
      const copy = useCopy()
      return { steps: copy.value.steps }
    },
  }),
}

export const FirstStep: Story = {
  get name() {
    return getStoryName('firstStep')
  },
  render: () => ({
    components: { Stepper },
    template: `
      <div style="width:100%;max-width:600px;">
        <Stepper :steps="steps" :active-step="0" />
      </div>
    `,
    setup() {
      const copy = useCopy()
      return { steps: copy.value.steps }
    },
  }),
}
