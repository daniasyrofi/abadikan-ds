import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import {
  RiEditLine,
  RiDeleteBinLine,
  RiFileCopyLine,
  RiShareLine,
  RiDownloadLine,
  RiArrowDownSLine,
  RiMore2Fill,
} from '@remixicon/vue'
import DropdownMenu from './DropdownMenu.vue'
import Button from '@/components/atoms/Button/Button.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    withIcons: string
    withShortcuts: string
    withSeparators: string
  }
  default: {
    trigger: string
    items: Array<{ label: string; tone?: 'danger' }>
  }
  withIcons: {
    trigger: string
    items: Array<{ label: string; icon?: unknown; separator?: boolean; tone?: 'danger' }>
  }
  withShortcuts: {
    trigger: string
    items: Array<{ label: string; shortcut?: string; separator?: boolean }>
  }
  withSeparators: {
    trigger: string
    ariaLabel: string
    items: Array<{ label: string; separator?: boolean; tone?: 'danger' }>
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      withIcons: 'With Icons',
      withShortcuts: 'With Shortcuts',
      withSeparators: 'With Separators',
    },
    default: {
      trigger: 'Open Menu',
      items: [
        { label: 'Edit' },
        { label: 'Duplicate' },
        { label: 'Archive' },
        { label: 'Delete', tone: 'danger' },
      ],
    },
    withIcons: {
      trigger: 'Actions',
      items: [
        { label: 'Edit', icon: RiEditLine },
        { label: 'Duplicate', icon: RiFileCopyLine },
        { label: 'Share', icon: RiShareLine },
        { label: 'Download', icon: RiDownloadLine },
        { separator: true, label: '' },
        { label: 'Delete', icon: RiDeleteBinLine, tone: 'danger' },
      ],
    },
    withShortcuts: {
      trigger: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z' },
        { label: 'Redo', shortcut: '⇧⌘Z' },
        { separator: true, label: '' },
        { label: 'Cut', shortcut: '⌘X' },
        { label: 'Copy', shortcut: '⌘C' },
        { label: 'Paste', shortcut: '⌘V' },
        { separator: true, label: '' },
        { label: 'Select All', shortcut: '⌘A' },
      ],
    },
    withSeparators: {
      trigger: 'More options',
      ariaLabel: 'More options',
      items: [
        { label: 'View profile' },
        { label: 'Settings' },
        { separator: true, label: '' },
        { label: 'Help & Support' },
        { label: 'Keyboard shortcuts' },
        { separator: true, label: '' },
        { label: 'Sign out', tone: 'danger' },
      ],
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      withIcons: 'Dengan Ikon',
      withShortcuts: 'Dengan Pintasan',
      withSeparators: 'Dengan Pemisah',
    },
    default: {
      trigger: 'Buka Menu',
      items: [
        { label: 'Edit' },
        { label: 'Duplikat' },
        { label: 'Arsipkan' },
        { label: 'Hapus', tone: 'danger' },
      ],
    },
    withIcons: {
      trigger: 'Aksi',
      items: [
        { label: 'Edit', icon: RiEditLine },
        { label: 'Duplikat', icon: RiFileCopyLine },
        { label: 'Bagikan', icon: RiShareLine },
        { label: 'Unduh', icon: RiDownloadLine },
        { separator: true, label: '' },
        { label: 'Hapus', icon: RiDeleteBinLine, tone: 'danger' },
      ],
    },
    withShortcuts: {
      trigger: 'Edit',
      items: [
        { label: 'Urungkan', shortcut: '⌘Z' },
        { label: 'Ulangi', shortcut: '⇧⌘Z' },
        { separator: true, label: '' },
        { label: 'Potong', shortcut: '⌘X' },
        { label: 'Salin', shortcut: '⌘C' },
        { label: 'Tempel', shortcut: '⌘V' },
        { separator: true, label: '' },
        { label: 'Pilih Semua', shortcut: '⌘A' },
      ],
    },
    withSeparators: {
      trigger: 'Opsi lainnya',
      ariaLabel: 'Opsi lainnya',
      items: [
        { label: 'Lihat profil' },
        { label: 'Pengaturan' },
        { separator: true, label: '' },
        { label: 'Bantuan & Dukungan' },
        { label: 'Pintasan keyboard' },
        { separator: true, label: '' },
        { label: 'Keluar', tone: 'danger' },
      ],
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      withIcons: '带图标',
      withShortcuts: '带快捷键',
      withSeparators: '带分隔线',
    },
    default: {
      trigger: '打开菜单',
      items: [
        { label: '编辑' },
        { label: '复制' },
        { label: '归档' },
        { label: '删除', tone: 'danger' },
      ],
    },
    withIcons: {
      trigger: '操作',
      items: [
        { label: '编辑', icon: RiEditLine },
        { label: '复制', icon: RiFileCopyLine },
        { label: '分享', icon: RiShareLine },
        { label: '下载', icon: RiDownloadLine },
        { separator: true, label: '' },
        { label: '删除', icon: RiDeleteBinLine, tone: 'danger' },
      ],
    },
    withShortcuts: {
      trigger: '编辑',
      items: [
        { label: '撤销', shortcut: '⌘Z' },
        { label: '重做', shortcut: '⇧⌘Z' },
        { separator: true, label: '' },
        { label: '剪切', shortcut: '⌘X' },
        { label: '复制', shortcut: '⌘C' },
        { label: '粘贴', shortcut: '⌘V' },
        { separator: true, label: '' },
        { label: '全选', shortcut: '⌘A' },
      ],
    },
    withSeparators: {
      trigger: '更多选项',
      ariaLabel: '更多选项',
      items: [
        { label: '查看个人资料' },
        { label: '设置' },
        { separator: true, label: '' },
        { label: '帮助与支持' },
        { label: '键盘快捷键' },
        { separator: true, label: '' },
        { label: '退出登录', tone: 'danger' },
      ],
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas decorator ──────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div class="dropdown-story-shell" style="
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

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    placement: { control: 'select', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] },
    width:     { control: 'text' },
  },
  args: {
    placement: 'bottom-start',
    width: 'auto',
  },
}
export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { DropdownMenu, Button },
    setup() {
      return { args, copy: useCopy() }
    },
    template: `
      <div style="padding:80px;">
        <DropdownMenu v-bind="args" :items="copy.default.items" width="220px">
          <template #trigger>
            <Button variant="secondary">{{ copy.default.trigger }}</Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  get name() {
    return getStoryName('withIcons')
  },
  render: () => ({
    components: { DropdownMenu, Button, RiArrowDownSLine },
    setup() {
      return { copy: useCopy() }
    },
    template: `
      <div style="padding:80px;">
        <DropdownMenu :items="copy.withIcons.items" width="228px">
          <template #trigger>
            <Button>
              {{ copy.withIcons.trigger }}
              <template #trailing><RiArrowDownSLine style="width:16px;height:16px;" /></template>
            </Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithShortcuts: Story = {
  get name() {
    return getStoryName('withShortcuts')
  },
  render: () => ({
    components: { DropdownMenu, Button },
    setup() {
      return { copy: useCopy() }
    },
    template: `
      <div style="padding:80px;">
        <DropdownMenu :items="copy.withShortcuts.items" width="244px">
          <template #trigger>
            <Button variant="secondary">{{ copy.withShortcuts.trigger }}</Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithSeparators: Story = {
  get name() {
    return getStoryName('withSeparators')
  },
  render: () => ({
    components: { DropdownMenu, Button, RiMore2Fill },
    setup() {
      return { copy: useCopy() }
    },
    template: `
      <div style="padding:80px;">
        <DropdownMenu :items="copy.withSeparators.items" placement="bottom-end" width="244px">
          <template #trigger>
            <Button variant="ghost" size="sm" :iconOnly="true" :aria-label="copy.withSeparators.ariaLabel">
              <template #icon><RiMore2Fill style="width:16px;height:16px;" /></template>
            </Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}
