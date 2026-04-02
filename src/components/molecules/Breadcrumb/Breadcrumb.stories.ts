import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { RiHome4Line, RiFolder3Line, RiFileLine } from '@remixicon/vue'
import { computed } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    withIcons: string
    slashSeparator: string
    dotSeparator: string
    sizes: string
  }
  defaultItems: Array<{ label: string; href?: string }>
  withIconsItems: Array<{ label: string; href?: string; icon?: typeof RiHome4Line }>
  slashItems: Array<{ label: string; href?: string }>
  dotItems: Array<{ label: string; href?: string }>
  sizesItems: Array<{ label: string; href?: string }>
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      withIcons: 'With Icons',
      slashSeparator: 'Slash Separator',
      dotSeparator: 'Dot Separator',
      sizes: 'Sizes',
    },
    defaultItems: [
      { label: 'Home', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Design System', href: '#' },
      { label: 'Components' },
    ],
    withIconsItems: [
      { label: 'Home', href: '#', icon: RiHome4Line },
      { label: 'Documents', href: '#', icon: RiFolder3Line },
      { label: 'Report.pdf', icon: RiFileLine },
    ],
    slashItems: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Profile' },
    ],
    dotItems: [
      { label: 'Dashboard', href: '#' },
      { label: 'Analytics', href: '#' },
      { label: 'Overview' },
    ],
    sizesItems: [
      { label: 'Home', href: '#' },
      { label: 'Category', href: '#' },
      { label: 'Current Page' },
    ],
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      withIcons: 'Dengan Ikon',
      slashSeparator: 'Pemisah Slash',
      dotSeparator: 'Pemisah Titik',
      sizes: 'Ukuran',
    },
    defaultItems: [
      { label: 'Beranda', href: '#' },
      { label: 'Proyek', href: '#' },
      { label: 'Design System', href: '#' },
      { label: 'Komponen' },
    ],
    withIconsItems: [
      { label: 'Beranda', href: '#', icon: RiHome4Line },
      { label: 'Dokumen', href: '#', icon: RiFolder3Line },
      { label: 'Laporan.pdf', icon: RiFileLine },
    ],
    slashItems: [
      { label: 'Beranda', href: '#' },
      { label: 'Pengaturan', href: '#' },
      { label: 'Profil' },
    ],
    dotItems: [
      { label: 'Dasbor', href: '#' },
      { label: 'Analitik', href: '#' },
      { label: 'Ringkasan' },
    ],
    sizesItems: [
      { label: 'Beranda', href: '#' },
      { label: 'Kategori', href: '#' },
      { label: 'Halaman Saat Ini' },
    ],
  },
  zh: {
    storyNames: {
      default: '默认',
      withIcons: '带图标',
      slashSeparator: '斜杠分隔',
      dotSeparator: '点分隔',
      sizes: '尺寸',
    },
    defaultItems: [
      { label: '首页', href: '#' },
      { label: '项目', href: '#' },
      { label: '设计系统', href: '#' },
      { label: '组件' },
    ],
    withIconsItems: [
      { label: '首页', href: '#', icon: RiHome4Line },
      { label: '文档', href: '#', icon: RiFolder3Line },
      { label: 'Report.pdf', icon: RiFileLine },
    ],
    slashItems: [{ label: '首页', href: '#' }, { label: '设置', href: '#' }, { label: '个人资料' }],
    dotItems: [{ label: '仪表盘', href: '#' }, { label: '分析', href: '#' }, { label: '概览' }],
    sizesItems: [{ label: '首页', href: '#' }, { label: '分类', href: '#' }, { label: '当前页面' }],
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

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    separator: { control: 'select', options: ['chevron', 'slash', 'dot'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({ copy: useCopy() }),
    template: '<Breadcrumb :items="copy.defaultItems" />',
  }),
}

export const WithIcons: Story = {
  get name() {
    return getStoryName('withIcons')
  },
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({ copy: useCopy() }),
    template: '<Breadcrumb :items="copy.withIconsItems" />',
  }),
}

export const SlashSeparator: Story = {
  get name() {
    return getStoryName('slashSeparator')
  },
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({ copy: useCopy() }),
    template: '<Breadcrumb separator="slash" :items="copy.slashItems" />',
  }),
}

export const DotSeparator: Story = {
  get name() {
    return getStoryName('dotSeparator')
  },
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({ copy: useCopy() }),
    template: '<Breadcrumb separator="dot" :items="copy.dotItems" />',
  }),
}

export const Sizes: Story = {
  get name() {
    return getStoryName('sizes')
  },
  render: () => ({
    components: { Breadcrumb },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:100%;max-width:480px;">
        <Breadcrumb size="sm" :items="copy.sizesItems" />
        <Breadcrumb size="md" :items="copy.sizesItems" />
        <Breadcrumb size="lg" :items="copy.sizesItems" />
      </div>
    `,
    setup() {
      return { copy: useCopy() }
    },
  }),
}
