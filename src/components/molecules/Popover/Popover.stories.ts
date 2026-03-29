import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Popover from './Popover.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allPlacements: string
    withForm: string
    clickTrigger: string
    hoverTrigger: string
  }
  default: {
    trigger: string
    title: string
    body: string
  }
  placements: Record<'top' | 'bottom' | 'left' | 'right', { trigger: string; body: string }>
  form: {
    trigger: string
    title: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    submit: string
  }
  clickTrigger: {
    trigger: string
    title: string
    body: string
  }
  hoverTrigger: {
    trigger: string
    title: string
    body: string
    link: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allPlacements: 'All Placements',
      withForm: 'With Form',
      clickTrigger: 'Click Trigger',
      hoverTrigger: 'Hover Trigger',
    },
    default: {
      trigger: 'Click me',
      title: 'Popover content',
      body: 'This is interactive content inside a popover.',
    },
    placements: {
      top: { trigger: 'Top', body: 'Top placement' },
      bottom: { trigger: 'Bottom', body: 'Bottom placement' },
      left: { trigger: 'Left', body: 'Left placement' },
      right: { trigger: 'Right', body: 'Right placement' },
    },
    form: {
      trigger: 'Edit',
      title: 'Edit',
      nameLabel: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      submit: 'Save',
    },
    clickTrigger: {
      trigger: 'Click to toggle',
      title: 'Click-triggered',
      body: 'Click the button again or outside to close.',
    },
    hoverTrigger: {
      trigger: 'Hover me',
      title: 'Hover-triggered',
      body: 'Move your mouse away to close. You can interact with this content.',
      link: 'Learn more',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allPlacements: 'Semua Posisi',
      withForm: 'Dengan Form',
      clickTrigger: 'Pemicu Klik',
      hoverTrigger: 'Pemicu Hover',
    },
    default: {
      trigger: 'Klik saya',
      title: 'Konten popover',
      body: 'Ini adalah konten interaktif di dalam popover.',
    },
    placements: {
      top: { trigger: 'Atas', body: 'Posisi atas' },
      bottom: { trigger: 'Bawah', body: 'Posisi bawah' },
      left: { trigger: 'Kiri', body: 'Posisi kiri' },
      right: { trigger: 'Kanan', body: 'Posisi kanan' },
    },
    form: {
      trigger: 'Edit',
      title: 'Edit',
      nameLabel: 'Nama',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      submit: 'Simpan',
    },
    clickTrigger: {
      trigger: 'Klik untuk beralih',
      title: 'Dipicu klik',
      body: 'Klik tombol lagi atau klik di luar untuk menutup.',
    },
    hoverTrigger: {
      trigger: 'Arahkan ke saya',
      title: 'Dipicu hover',
      body: 'Arahkan kursor keluar untuk menutup. Konten ini bisa diinteraksikan.',
      link: 'Pelajari lebih lanjut',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allPlacements: '所有位置',
      withForm: '带表单',
      clickTrigger: '点击触发',
      hoverTrigger: '悬停触发',
    },
    default: {
      trigger: '点击我',
      title: '弹出层内容',
      body: '这是弹出层中的交互内容。',
    },
    placements: {
      top: { trigger: '顶部', body: '顶部位置' },
      bottom: { trigger: '底部', body: '底部位置' },
      left: { trigger: '左侧', body: '左侧位置' },
      right: { trigger: '右侧', body: '右侧位置' },
    },
    form: {
      trigger: '编辑',
      title: '编辑',
      nameLabel: '姓名',
      namePlaceholder: 'John Doe',
      emailLabel: '邮箱',
      emailPlaceholder: 'john@example.com',
      submit: '保存',
    },
    clickTrigger: {
      trigger: '点击切换',
      title: '点击触发',
      body: '再次点击按钮或点击外部即可关闭。',
    },
    hoverTrigger: {
      trigger: '悬停我',
      title: '悬停触发',
      body: '移开鼠标即可关闭。你也可以与此内容交互。',
      link: '了解更多',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas decorator ──────────────────────────────────────────────────────────
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

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    trigger:             { control: 'select', options: ['click', 'hover', 'manual'] },
    placement:           { control: 'select', options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'] },
    width:               { control: 'text' },
    arrow:               { control: 'boolean' },
    closeOnClickOutside: { control: 'boolean' },
  },
  args: {
    trigger:             'click',
    placement:           'bottom',
    width:               'auto',
    arrow:               true,
    closeOnClickOutside: true,
  },
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Popover, Button },
    setup: () => ({ args, copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover v-bind="args">
          <template #trigger>
            <Button variant="secondary">{{ copy.default.trigger }}</Button>
          </template>
          <div style="font-size:14px;color:var(--color-text-primary);">
            <p style="font-weight:600;margin-bottom:4px;">{{ copy.default.title }}</p>
            <p style="color:var(--color-text-secondary);">{{ copy.default.body }}</p>
          </div>
        </Popover>
      </div>
    `,
  }),
}

export const AllPlacements: Story = {
  get name() {
    return getStoryName('allPlacements')
  },
  render: () => ({
    components: { Popover, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;padding:96px;place-items:center;min-height:500px;">
        <div />
        <Popover placement="top" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">{{ copy.placements.top.trigger }}</Button></template>
          <p style="font-size:14px;color:var(--color-text-primary);">{{ copy.placements.top.body }}</p>
        </Popover>
        <div />

        <Popover placement="left" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">{{ copy.placements.left.trigger }}</Button></template>
          <p style="font-size:14px;color:var(--color-text-primary);">{{ copy.placements.left.body }}</p>
        </Popover>
        <div />
        <Popover placement="right" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">{{ copy.placements.right.trigger }}</Button></template>
          <p style="font-size:14px;color:var(--color-text-primary);">{{ copy.placements.right.body }}</p>
        </Popover>

        <div />
        <Popover placement="bottom" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">{{ copy.placements.bottom.trigger }}</Button></template>
          <p style="font-size:14px;color:var(--color-text-primary);">{{ copy.placements.bottom.body }}</p>
        </Popover>
        <div />
      </div>
    `,
  }),
}

export const WithForm: Story = {
  get name() {
    return getStoryName('withForm')
  },
  render: () => ({
    components: { Popover, Button, Input },
    setup() {
      const name = ref('')
      const email = ref('')
      function handleSubmit() {
        console.log('Submitted:', { name: name.value, email: email.value })
      }
      return { name, email, handleSubmit }
    },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover placement="bottom-start" width="280px">
          <template #trigger>
            <Button>{{ copy.form.trigger }}</Button>
          </template>
          <form @submit.prevent="handleSubmit" style="display:flex;flex-direction:column;gap:12px;">
            <p style="font-size:14px;font-weight:600;color:var(--color-text-primary);">{{ copy.form.title }}</p>
            <Input v-model="name" :label="copy.form.nameLabel" :placeholder="copy.form.namePlaceholder" size="sm" />
            <Input v-model="email" :label="copy.form.emailLabel" type="email" :placeholder="copy.form.emailPlaceholder" size="sm" />
            <Button type="submit" size="sm" fullWidth>{{ copy.form.submit }}</Button>
          </form>
        </Popover>
      </div>
    `,
  }),
}

export const ClickTrigger: Story = {
  get name() {
    return getStoryName('clickTrigger')
  },
  render: () => ({
    components: { Popover, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover trigger="click" placement="bottom">
          <template #trigger>
            <Button variant="secondary">{{ copy.clickTrigger.trigger }}</Button>
          </template>
          <div style="font-size:14px;color:var(--color-text-primary);">
            <p style="font-weight:600;margin-bottom:4px;">{{ copy.clickTrigger.title }}</p>
            <p style="color:var(--color-text-secondary);">{{ copy.clickTrigger.body }}</p>
          </div>
        </Popover>
      </div>
    `,
  }),
}

export const HoverTrigger: Story = {
  get name() {
    return getStoryName('hoverTrigger')
  },
  render: () => ({
    components: { Popover, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover trigger="hover" placement="bottom">
          <template #trigger>
            <Button variant="secondary">{{ copy.hoverTrigger.trigger }}</Button>
          </template>
          <div style="font-size:14px;color:var(--color-text-primary);">
            <p style="font-weight:600;margin-bottom:4px;">{{ copy.hoverTrigger.title }}</p>
            <p style="color:var(--color-text-secondary);">{{ copy.hoverTrigger.body }}</p>
            <a href="#" style="color:var(--color-primary);text-decoration:underline;font-size:12px;margin-top:4px;display:inline-block;">{{ copy.hoverTrigger.link }}</a>
          </div>
        </Popover>
      </div>
    `,
  }),
}
