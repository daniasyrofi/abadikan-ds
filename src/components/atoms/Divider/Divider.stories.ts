import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import Divider from './Divider.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    horizontal: string
    vertical: string
    allVariants: string
    withLabel: string
    inCard: string
    orForm: string
  }
  labels: {
    above: string
    below: string
    left: string
    right: string
    end: string
    solid: string
    dashed: string
    dotted: string
    or: string
    section: string
    continue: string
    today: string
    cardTitle: string
    cardDescription: string
    cardFooter: string
    continueWithGoogle: string
    signInWithEmail: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      horizontal: 'Horizontal',
      vertical: 'Vertical',
      allVariants: 'All Variants',
      withLabel: 'With Label',
      inCard: 'In Card',
      orForm: 'OR - Form Separator',
    },
    labels: {
      above: 'Content above the divider',
      below: 'Content below the divider',
      left: 'Left',
      right: 'Right',
      end: 'End',
      solid: 'Solid',
      dashed: 'Dashed',
      dotted: 'Dotted',
      or: 'OR',
      section: 'Section',
      continue: 'Continue',
      today: 'Today',
      cardTitle: 'Card Title',
      cardDescription: 'Description sits below the title.',
      cardFooter: 'Footer content appears below the divider.',
      continueWithGoogle: 'Continue with Google',
      signInWithEmail: 'Sign in with email',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      horizontal: 'Horizontal',
      vertical: 'Vertikal',
      allVariants: 'Semua Varian',
      withLabel: 'Dengan Label',
      inCard: 'Di Dalam Kartu',
      orForm: 'OR - Pemisah Formulir',
    },
    labels: {
      above: 'Konten di atas pemisah',
      below: 'Konten di bawah pemisah',
      left: 'Kiri',
      right: 'Kanan',
      end: 'Akhir',
      solid: 'Penuh',
      dashed: 'Garis Putus',
      dotted: 'Titik',
      or: 'ATAU',
      section: 'Bagian',
      continue: 'Lanjutkan',
      today: 'Hari Ini',
      cardTitle: 'Judul Kartu',
      cardDescription: 'Deskripsi berada di bawah judul.',
      cardFooter: 'Konten footer muncul di bawah pemisah.',
      continueWithGoogle: 'Lanjutkan dengan Google',
      signInWithEmail: 'Masuk dengan email',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      horizontal: '水平',
      vertical: '垂直',
      allVariants: '全部变体',
      withLabel: '带标签',
      inCard: '在卡片中',
      orForm: 'OR - 表单分隔线',
    },
    labels: {
      above: '分隔线上的内容',
      below: '分隔线下的内容',
      left: '左侧',
      right: '右侧',
      end: '末尾',
      solid: '实线',
      dashed: '虚线',
      dotted: '点线',
      or: '或',
      section: '部分',
      continue: '继续',
      today: '今天',
      cardTitle: '卡片标题',
      cardDescription: '描述显示在标题下方。',
      cardFooter: '页脚内容显示在分隔线下方。',
      continueWithGoogle: '使用 Google 继续',
      signInWithEmail: '使用邮箱登录',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'subtract' },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['solid', 'dashed', 'dotted'] },
    label: { control: 'text' },
    labelPosition: { control: 'select', options: ['start', 'center', 'end'] },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    labelPosition: 'center',
  },
}
export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: '<div style="width:320px;"><Divider v-bind="args" /></div>',
  }),
}

export const Horizontal: Story = {
  get name() {
    return getStoryName('horizontal')
  },
  render: () => ({
    components: { Divider },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="width:300px;display:flex;flex-direction:column;gap:16px;">
        <p style="font-size:14px;color:var(--color-text-primary);">{{ copy.labels.above }}</p>
        <Divider />
        <p style="font-size:14px;color:var(--color-text-primary);">{{ copy.labels.below }}</p>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  get name() {
    return getStoryName('vertical')
  },
  render: () => ({
    components: { Divider },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="height:40px;display:flex;align-items:center;gap:16px;">
        <span style="font-size:14px;color:var(--color-text-primary);">{{ copy.labels.left }}</span>
        <Divider orientation="vertical" />
        <span style="font-size:14px;color:var(--color-text-primary);">{{ copy.labels.right }}</span>
        <Divider orientation="vertical" />
        <span style="font-size:14px;color:var(--color-text-primary);">{{ copy.labels.end }}</span>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  get name() {
    return getStoryName('allVariants')
  },
  render: () => ({
    components: { Divider },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="width:300px;display:flex;flex-direction:column;gap:20px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.labels.solid }}</p>
          <Divider variant="solid" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.labels.dashed }}</p>
          <Divider variant="dashed" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.labels.dotted }}</p>
          <Divider variant="dotted" />
        </div>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  get name() {
    return getStoryName('withLabel')
  },
  render: () => ({
    components: { Divider },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="width:320px;display:flex;flex-direction:column;gap:16px;">
        <Divider :label="copy.labels.or" />
        <Divider :label="copy.labels.section" labelPosition="start" />
        <Divider :label="copy.labels.continue" labelPosition="end" />
        <Divider :label="'··· ' + copy.labels.today + ' ···'" variant="dashed" />
      </div>
    `,
  }),
}

export const InCard: Story = {
  get name() {
    return getStoryName('inCard')
  },
  render: () => ({
    components: { Divider },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="width:280px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:var(--color-surface);padding:16px;">
        <p style="font-weight:600;font-size:15px;color:var(--color-text-heading);">{{ copy.labels.cardTitle }}</p>
        <p style="font-size:13px;color:var(--color-text-secondary);margin-top:4px;">{{ copy.labels.cardDescription }}</p>
        <Divider style="margin:16px 0;" />
        <p style="font-size:13px;color:var(--color-text-secondary);">{{ copy.labels.cardFooter }}</p>
      </div>
    `,
  }),
}

export const OrForm: Story = {
  get name() {
    return getStoryName('orForm')
  },
  render: () => ({
    components: { Divider },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="width:300px;display:flex;flex-direction:column;gap:12px;">
        <button style="width:100%;padding:8px;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:var(--color-surface);font-size:14px;font-weight:500;color:var(--color-text-primary);cursor:pointer;">{{ copy.labels.continueWithGoogle }}</button>
        <Divider :label="copy.labels.or" />
        <button style="width:100%;padding:8px;border-radius:var(--radius-lg);background:var(--color-primary);font-size:14px;font-weight:500;color:#fff;cursor:pointer;border:none;">{{ copy.labels.signInWithEmail }}</button>
      </div>
    `,
  }),
}
