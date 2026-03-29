import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Modal from './Modal.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Textarea from '@/components/atoms/Textarea/Textarea.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allSizes: string
    withForm: string
    preventClose: string
    scrollBehavior: string
  }
  default: {
    trigger: string
    title: string
    description: string
    body: string
  }
  sizes: {
    open: string
    titleSuffix: string
    description: string
    body: string
  }
  form: {
    trigger: string
    title: string
    description: string
    name: string
    email: string
    bio: string
  }
  preventClose: {
    trigger: string
    title: string
    description: string
    checkbox: string
  }
  scroll: {
    inside: string
    outside: string
    insideTitle: string
    insideDescription: string
    outsideTitle: string
    outsideDescription: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allSizes: 'All Sizes',
      withForm: 'With Form',
      preventClose: 'Prevent Close',
      scrollBehavior: 'Scroll Behavior',
    },
    default: {
      trigger: 'Open Modal',
      title: 'Modal title',
      description: 'This is a description of the modal content.',
      body: 'This is the body content of the modal. It can contain any kind of content including text, forms, images, and other components.',
    },
    sizes: {
      open: 'Open',
      titleSuffix: 'Modal',
      description: 'This modal uses the "{size}" size variant.',
      body: 'Modal panel content at the {size} breakpoint.',
    },
    form: {
      trigger: 'Edit Profile',
      title: 'Edit Profile',
      description: 'Update your personal information below.',
      name: 'Full name',
      email: 'Email',
      bio: 'Bio',
    },
    preventClose: {
      trigger: 'Delete Account',
      title: 'Are you sure?',
      description: 'This action cannot be undone.',
      checkbox: 'I understand that deleting my account is permanent and all my data will be lost.',
    },
    scroll: {
      inside: 'Scroll Inside',
      outside: 'Scroll Outside',
      insideTitle: 'Inside scroll',
      insideDescription: 'The modal body scrolls while header and footer stay fixed.',
      outsideTitle: 'Outside scroll',
      outsideDescription: 'The entire modal scrolls within the overlay.',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allSizes: 'Semua Ukuran',
      withForm: 'Dengan Formulir',
      preventClose: 'Cegah Tutup',
      scrollBehavior: 'Perilaku Scroll',
    },
    default: {
      trigger: 'Buka Modal',
      title: 'Judul modal',
      description: 'Ini adalah deskripsi konten modal.',
      body: 'Ini adalah isi modal. Modal dapat berisi berbagai konten termasuk teks, formulir, gambar, dan komponen lain.',
    },
    sizes: {
      open: 'Buka',
      titleSuffix: 'Modal',
      description: 'Modal ini menggunakan varian ukuran "{size}".',
      body: 'Konten panel modal pada breakpoint {size}.',
    },
    form: {
      trigger: 'Edit Profil',
      title: 'Edit Profil',
      description: 'Perbarui informasi pribadi Anda di bawah ini.',
      name: 'Nama lengkap',
      email: 'Email',
      bio: 'Bio',
    },
    preventClose: {
      trigger: 'Hapus Akun',
      title: 'Anda yakin?',
      description: 'Tindakan ini tidak dapat dibatalkan.',
      checkbox: 'Saya mengerti bahwa menghapus akun bersifat permanen dan semua data saya akan hilang.',
    },
    scroll: {
      inside: 'Scroll di Dalam',
      outside: 'Scroll di Luar',
      insideTitle: 'Scroll di dalam',
      insideDescription: 'Isi modal yang dapat digulir sementara header dan footer tetap diam.',
      outsideTitle: 'Scroll di luar',
      outsideDescription: 'Seluruh modal menggulir di dalam overlay.',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allSizes: '所有尺寸',
      withForm: '带表单',
      preventClose: '阻止关闭',
      scrollBehavior: '滚动行为',
    },
    default: {
      trigger: '打开弹窗',
      title: '弹窗标题',
      description: '这是弹窗内容的描述。',
      body: '这是弹窗的主体内容。它可以包含任何类型的内容，包括文本、表单、图片以及其他组件。',
    },
    sizes: {
      open: '打开',
      titleSuffix: '弹窗',
      description: '此弹窗使用 "{size}" 尺寸变体。',
      body: '在 {size} 断点下的弹窗面板内容。',
    },
    form: {
      trigger: '编辑资料',
      title: '编辑资料',
      description: '更新下方的个人信息。',
      name: '姓名',
      email: '电子邮箱',
      bio: '简介',
    },
    preventClose: {
      trigger: '删除账户',
      title: '你确定吗？',
      description: '此操作无法撤销。',
      checkbox: '我理解删除账户是永久性的，所有数据都将丢失。',
    },
    scroll: {
      inside: '内部滚动',
      outside: '外部滚动',
      insideTitle: '内部滚动',
      insideDescription: '弹窗主体可滚动，而页眉和页脚保持固定。',
      outsideTitle: '外部滚动',
      outsideDescription: '整个弹窗在遮罩层内滚动。',
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

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size:           { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    closable:       { control: 'boolean' },
    closeOnOverlay: { control: 'boolean' },
    preventClose:   { control: 'boolean' },
    scrollBehavior: { control: 'select', options: ['inside', 'outside'] },
  },
  args: {
    size:           'md',
    closable:       true,
    closeOnOverlay: true,
    preventClose:   false,
    scrollBehavior: 'inside',
  },
}
export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open, args, copy: useCopy() }
    },
    template: `
      <div>
        <Button @click="open = true">{{ copy.default.trigger }}</Button>
        <Modal v-bind="args" v-model="open">
          <template #title>{{ copy.default.title }}</template>
          <template #description>{{ copy.default.description }}</template>
          <p style="font-size:14px;color:var(--color-text-secondary);">
            {{ copy.default.body }}
          </p>
          <template #footer>
            <Button variant="secondary" @click="open = false">{{ $t('common.cancel') }}</Button>
            <Button @click="open = false">{{ $t('common.confirm') }}</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Modal, Button },
    setup() {
      const activeSize = ref<string | null>(null)
      return { activeSize, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        <Button
          v-for="size in ['sm', 'md', 'lg', 'xl', 'full']"
          :key="size"
          variant="secondary"
          @click="activeSize = size"
        >
          {{ copy.sizes.open }} {{ size.toUpperCase() }}
        </Button>
        <Modal
          v-for="size in ['sm', 'md', 'lg', 'xl', 'full']"
          :key="size"
          :model-value="activeSize === size"
          :size="size"
          @update:model-value="activeSize = $event ? size : null"
        >
          <template #title>{{ size.toUpperCase() }} {{ copy.sizes.titleSuffix }}</template>
          <template #description>{{ copy.sizes.description.replace('{size}', size) }}</template>
          <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.sizes.body.replace('{size}', size) }}</p>
          <template #footer>
            <Button @click="activeSize = null">{{ $t('common.close') }}</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const WithForm: Story = {
  get name() {
    return getStoryName('withForm')
  },
  render: () => ({
    components: { Modal, Button, Input, Textarea },
    setup() {
      const open = ref(false)
      return { open, copy: useCopy() }
    },
    template: `
      <div>
        <Button @click="open = true">{{ copy.form.trigger }}</Button>
        <Modal v-model="open" size="md">
          <template #title>{{ copy.form.title }}</template>
          <template #description>{{ copy.form.description }}</template>
          <form style="display:flex;flex-direction:column;gap:16px;" @submit.prevent="open = false">
            <Input :label="copy.form.name" modelValue="Jane Cooper" />
            <Input :label="copy.form.email" type="email" modelValue="jane@example.com" />
            <Textarea :label="copy.form.bio" :rows="3" modelValue="Product designer with 8 years of experience." />
          </form>
          <template #footer>
            <Button variant="secondary" @click="open = false">{{ $t('common.cancel') }}</Button>
            <Button @click="open = false">{{ $t('common.save') }}</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const PreventClose: Story = {
  get name() {
    return getStoryName('preventClose')
  },
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      const confirmed = ref(false)
      return { open, confirmed, copy: useCopy() }
    },
    template: `
      <div>
        <Button variant="danger" @click="open = true; confirmed = false">{{ copy.preventClose.trigger }}</Button>
        <Modal v-model="open" size="sm" prevent-close>
          <template #title>{{ copy.preventClose.title }}</template>
          <template #description>{{ copy.preventClose.description }}</template>
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <input
              id="confirm-check"
              type="checkbox"
              v-model="confirmed"
              style="margin-top:2px;accent-color:var(--color-danger);"
            />
            <label for="confirm-check" style="font-size:14px;color:var(--color-text-secondary);">{{ copy.preventClose.checkbox }}</label>
          </div>
          <template #footer>
            <Button variant="secondary" @click="open = false">{{ $t('common.cancel') }}</Button>
            <Button variant="danger" :disabled="!confirmed" @click="open = false">{{ $t('common.delete') }}</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const ScrollBehavior: Story = {
  get name() {
    return getStoryName('scrollBehavior')
  },
  render: () => ({
    components: { Modal, Button },
    setup() {
      const insideOpen = ref(false)
      const outsideOpen = ref(false)
      return { insideOpen, outsideOpen, copy: useCopy() }
    },
    template: `
      <div style="display:flex;gap:12px;">
        <Button variant="secondary" @click="insideOpen = true">{{ copy.scroll.inside }}</Button>
        <Button variant="secondary" @click="outsideOpen = true">{{ copy.scroll.outside }}</Button>

        <Modal v-model="insideOpen" scroll-behavior="inside">
          <template #title>{{ copy.scroll.insideTitle }}</template>
          <template #description>{{ copy.scroll.insideDescription }}</template>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <p v-for="i in 20" :key="i" style="font-size:14px;color:var(--color-text-secondary);">
              Paragraph {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <template #footer>
            <Button @click="insideOpen = false">{{ $t('common.close') }}</Button>
          </template>
        </Modal>

        <Modal v-model="outsideOpen" scroll-behavior="outside">
          <template #title>{{ copy.scroll.outsideTitle }}</template>
          <template #description>{{ copy.scroll.outsideDescription }}</template>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <p v-for="i in 20" :key="i" style="font-size:14px;color:var(--color-text-secondary);">
              Paragraph {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <template #footer>
            <Button @click="outsideOpen = false">{{ $t('common.close') }}</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}
