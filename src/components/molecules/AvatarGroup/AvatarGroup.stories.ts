import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AvatarGroup from './AvatarGroup.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    sizes: string
    noOverflow: string
    allOverflow: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      sizes: 'Sizes',
      noOverflow: 'No Overflow',
      allOverflow: 'All Overflow',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      sizes: 'Ukuran',
      noOverflow: 'Tanpa Overflow',
      allOverflow: 'Semua Overflow',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      sizes: '尺寸',
      noOverflow: '无溢出',
      allOverflow: '全部溢出',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
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

const sampleAvatars = [
  { name: 'Alice Johnson' },
  { name: 'Bob Smith' },
  { name: 'Charlie Brown' },
  { name: 'Diana Prince' },
  { name: 'Eve Davis' },
  { name: 'Frank Miller' },
  { name: 'Grace Hopper' },
  { name: 'Henry Ford' },
]

const meta: Meta<typeof AvatarGroup> = {
  title: 'Molecules/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    max: { control: { type: 'number', min: 1, max: 10 } },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  args: {
    avatars: sampleAvatars,
    max: 4,
  },
}

export const Sizes: Story = {
  get name() {
    return getStoryName('sizes')
  },
  render: () => ({
    components: { AvatarGroup },
    setup: () => ({ avatars: sampleAvatars }),
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;align-items:flex-start;">
        <AvatarGroup :avatars="avatars" :max="4" size="xs" />
        <AvatarGroup :avatars="avatars" :max="4" size="sm" />
        <AvatarGroup :avatars="avatars" :max="4" size="md" />
        <AvatarGroup :avatars="avatars" :max="4" size="lg" />
        <AvatarGroup :avatars="avatars" :max="4" size="xl" />
      </div>
    `,
  }),
}

export const NoOverflow: Story = {
  get name() {
    return getStoryName('noOverflow')
  },
  args: {
    avatars: sampleAvatars.slice(0, 3),
    max: 5,
  },
}

export const AllOverflow: Story = {
  get name() {
    return getStoryName('allOverflow')
  },
  args: {
    avatars: sampleAvatars,
    max: 2,
  },
}
