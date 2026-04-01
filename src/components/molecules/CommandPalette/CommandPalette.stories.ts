import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import CommandPalette from './CommandPalette.vue'
import Button from '@/components/atoms/Button/Button.vue'
import {
  RiFileLine, RiSettings3Line, RiLogoutBoxLine, RiSearchLine,
  RiUserLine, RiTeamLine, RiPaletteLine, RiKeyboardLine,
  RiQuestionLine, RiArrowGoBackLine,
} from '@remixicon/vue'

const meta: Meta<typeof CommandPalette> = {
  title: 'Molecules/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A Cmd+K command palette for quick navigation and actions. ' +
          'Press <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> anywhere on the page to open it.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CommandPalette>

const allItems = [
  { id: 'new-file',    label: 'New File',         group: 'File',     icon: RiFileLine,       shortcut: '⌘N' },
  { id: 'open-file',   label: 'Open File…',        group: 'File',     icon: RiFileLine,       shortcut: '⌘O' },
  { id: 'search',      label: 'Search',            group: 'File',     icon: RiSearchLine,     shortcut: '⌘F' },
  { id: 'settings',    label: 'Settings',          group: 'App',      icon: RiSettings3Line,  description: 'Preferences & configuration' },
  { id: 'appearance',  label: 'Appearance',        group: 'App',      icon: RiPaletteLine,    description: 'Theme, fonts, colors' },
  { id: 'keybindings', label: 'Keyboard Shortcuts', group: 'App',     icon: RiKeyboardLine },
  { id: 'profile',     label: 'My Profile',        group: 'Account',  icon: RiUserLine },
  { id: 'team',        label: 'Team Members',      group: 'Account',  icon: RiTeamLine,       description: 'Manage your team' },
  { id: 'logout',      label: 'Log Out',           group: 'Account',  icon: RiLogoutBoxLine },
  { id: 'undo',        label: 'Undo',              group: 'Edit',     icon: RiArrowGoBackLine, shortcut: '⌘Z', disabled: true },
  { id: 'help',        label: 'Help & Support',    group: 'Help',     icon: RiQuestionLine },
]

export const Default: Story = {
  render: () => ({
    components: { CommandPalette, Button },
    setup() {
      const open = ref(false)
      return { open, items: allItems }
    },
    template: `
      <div class="p-8">
        <Button @click="open = true">Open Command Palette <span class="opacity-60 ml-2 text-xs">⌘K</span></Button>
        <p class="mt-3 text-sm text-[--color-text-secondary]">
          Or press <kbd class="px-1.5 py-0.5 rounded border border-[--color-border] text-xs font-mono">⌘K</kbd>
          anywhere on the page.
        </p>
        <CommandPalette v-model="open" :items="items" />
      </div>
    `,
  }),
}

export const InitiallyOpen: Story = {
  render: () => ({
    components: { CommandPalette, Button },
    setup() {
      const open = ref(true)
      return { open, items: allItems }
    },
    template: `
      <div class="p-8">
        <Button @click="open = !open">Toggle</Button>
        <CommandPalette v-model="open" :items="items" :global-shortcut="false" />
      </div>
    `,
  }),
}

export const CustomPlaceholder: Story = {
  render: () => ({
    components: { CommandPalette, Button },
    setup() {
      const open = ref(false)
      return { open, items: allItems }
    },
    template: `
      <div class="p-8">
        <Button @click="open = true">Open Palette</Button>
        <CommandPalette
          v-model="open"
          :items="items"
          placeholder="What would you like to do?"
          empty-text="No matching commands."
        />
      </div>
    `,
  }),
}

export const FewItems: Story = {
  render: () => ({
    components: { CommandPalette, Button },
    setup() {
      const open = ref(false)
      const items = [
        { id: 'a', label: 'Go to Dashboard', icon: RiFileLine },
        { id: 'b', label: 'View Profile',    icon: RiUserLine },
        { id: 'c', label: 'Log Out',         icon: RiLogoutBoxLine },
      ]
      return { open, items }
    },
    template: `
      <div class="p-8">
        <Button @click="open = true">Open (no groups)</Button>
        <CommandPalette v-model="open" :items="items" :global-shortcut="false" />
      </div>
    `,
  }),
}
