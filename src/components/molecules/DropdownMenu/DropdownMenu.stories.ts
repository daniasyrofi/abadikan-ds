import type { Meta, StoryObj } from '@storybook/vue3-vite'
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

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
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
  render: (args) => ({
    components: { DropdownMenu },
    setup() {
      const items = [
        { label: 'Edit', action: () => console.log('Edit') },
        { label: 'Duplicate', action: () => console.log('Duplicate') },
        { label: 'Archive', action: () => console.log('Archive') },
        { label: 'Delete', action: () => console.log('Delete') },
      ]
      return { args, items }
    },
    template: `
      <div class="p-20">
        <DropdownMenu v-bind="args" :items="items">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Open Menu
            </button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { DropdownMenu, RiArrowDownSLine },
    setup() {
      const items = [
        { label: 'Edit', icon: RiEditLine, action: () => console.log('Edit') },
        { label: 'Duplicate', icon: RiFileCopyLine, action: () => console.log('Duplicate') },
        { label: 'Share', icon: RiShareLine, action: () => console.log('Share') },
        { label: 'Download', icon: RiDownloadLine, action: () => console.log('Download') },
        { separator: true, label: '' },
        { label: 'Delete', icon: RiDeleteBinLine, action: () => console.log('Delete') },
      ]
      return { items }
    },
    template: `
      <div class="p-20">
        <DropdownMenu :items="items">
          <template #trigger>
            <button class="inline-flex items-center gap-1 px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-primary] text-[--color-primary-text] cursor-pointer">
              Actions
              <RiArrowDownSLine :size="16" />
            </button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithShortcuts: Story = {
  render: () => ({
    components: { DropdownMenu },
    setup() {
      const items = [
        { label: 'Undo', shortcut: '⌘Z', action: () => console.log('Undo') },
        { label: 'Redo', shortcut: '⇧⌘Z', action: () => console.log('Redo') },
        { separator: true, label: '' },
        { label: 'Cut', shortcut: '⌘X', action: () => console.log('Cut') },
        { label: 'Copy', shortcut: '⌘C', action: () => console.log('Copy') },
        { label: 'Paste', shortcut: '⌘V', action: () => console.log('Paste') },
        { separator: true, label: '' },
        { label: 'Select All', shortcut: '⌘A', action: () => console.log('Select All') },
      ]
      return { items }
    },
    template: `
      <div class="p-20">
        <DropdownMenu :items="items" width="220px">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Edit
            </button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithSeparators: Story = {
  render: () => ({
    components: { DropdownMenu, RiMore2Fill },
    setup() {
      const items = [
        { label: 'View profile', action: () => console.log('View profile') },
        { label: 'Settings', action: () => console.log('Settings') },
        { separator: true, label: '' },
        { label: 'Help & Support', action: () => console.log('Help') },
        { label: 'Keyboard shortcuts', action: () => console.log('Shortcuts') },
        { separator: true, label: '' },
        { label: 'Sign out', action: () => console.log('Sign out') },
      ]
      return { items }
    },
    template: `
      <div class="p-20">
        <DropdownMenu :items="items" placement="bottom-end">
          <template #trigger>
            <button class="inline-flex items-center justify-center w-8 h-8 rounded-[--radius-md] border border-[--color-border] text-[--color-text-secondary] hover:bg-[--color-surface-hover] cursor-pointer">
              <RiMore2Fill :size="16" />
            </button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}
