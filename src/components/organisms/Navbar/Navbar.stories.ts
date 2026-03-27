import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Navbar from './Navbar.vue'

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'transparent', 'colored'] },
    sticky:  { control: 'boolean' },
    border:  { control: 'boolean' },
    title:   { control: 'text' },
  },
  args: {
    variant: 'default',
    sticky:  false,
    border:  true,
    title:   'Acme',
  },
  decorators: [
    () => ({
      template: '<div class="w-full min-w-[640px]"><story /></div>',
    }),
  ],
}
export default meta
type Story = StoryObj<typeof Navbar>

// -- Shared slot helpers --
const navLinks = `
  <template #center>
    <nav class="flex items-center gap-1">
      <a href="#" class="px-3 py-1.5 text-sm font-medium rounded-[--radius-md] hover:bg-[--color-neutral-light] transition-colors duration-[--duration-normal]">Home</a>
      <a href="#" class="px-3 py-1.5 text-sm font-medium rounded-[--radius-md] hover:bg-[--color-neutral-light] transition-colors duration-[--duration-normal]">Products</a>
      <a href="#" class="px-3 py-1.5 text-sm font-medium rounded-[--radius-md] hover:bg-[--color-neutral-light] transition-colors duration-[--duration-normal]">About</a>
    </nav>
  </template>
`

const actions = `
  <template #end>
    <div class="flex items-center gap-2">
      <div class="size-8 rounded-[--radius-md] bg-[--color-neutral-light] flex items-center justify-center text-xs text-[--color-text-secondary]" title="Theme toggle placeholder">T</div>
      <div class="size-8 rounded-[--radius-md] bg-[--color-neutral-light] flex items-center justify-center text-xs text-[--color-text-secondary]" title="Language toggle placeholder">L</div>
      <div class="size-8 rounded-full bg-[--color-primary-light] flex items-center justify-center text-xs font-medium text-[--color-primary]" title="Avatar placeholder">A</div>
    </div>
  </template>
`

const coloredActions = `
  <template #end>
    <div class="flex items-center gap-2">
      <div class="size-8 rounded-[--radius-md] bg-white/10 flex items-center justify-center text-xs text-[--color-text-inverse]" title="Theme toggle placeholder">T</div>
      <div class="size-8 rounded-[--radius-md] bg-white/10 flex items-center justify-center text-xs text-[--color-text-inverse]" title="Language toggle placeholder">L</div>
      <div class="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium text-[--color-text-inverse]" title="Avatar placeholder">A</div>
    </div>
  </template>
`

export const Default: Story = {
  render: (args) => ({
    components: { Navbar },
    setup: () => ({ args }),
    template: `
      <Navbar v-bind="args">
        ${navLinks}
        ${actions}
      </Navbar>
    `,
  }),
}

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    border:  false,
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => ({ args }),
    template: `
      <div class="bg-gradient-to-r from-[--color-primary-light] to-[--color-secondary-light] p-0 rounded-[--radius-lg]">
        <Navbar v-bind="args">
          ${navLinks}
          ${actions}
        </Navbar>
      </div>
    `,
  }),
}

export const Colored: Story = {
  args: {
    variant: 'colored',
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => ({ args }),
    template: `
      <Navbar v-bind="args">
        <template #center>
          <nav class="flex items-center gap-1">
            <a href="#" class="px-3 py-1.5 text-sm font-medium rounded-[--radius-md] hover:bg-white/10 transition-colors duration-[--duration-normal]">Home</a>
            <a href="#" class="px-3 py-1.5 text-sm font-medium rounded-[--radius-md] hover:bg-white/10 transition-colors duration-[--duration-normal]">Products</a>
            <a href="#" class="px-3 py-1.5 text-sm font-medium rounded-[--radius-md] hover:bg-white/10 transition-colors duration-[--duration-normal]">About</a>
          </nav>
        </template>
        ${coloredActions}
      </Navbar>
    `,
  }),
}

export const Sticky: Story = {
  args: {
    sticky: true,
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => ({ args }),
    template: `
      <div class="h-[400px] overflow-y-auto border border-[--color-border] rounded-[--radius-lg]">
        <Navbar v-bind="args">
          ${navLinks}
          ${actions}
        </Navbar>
        <div class="p-6 space-y-4">
          <p v-for="i in 20" :key="i" class="text-sm text-[--color-text-secondary]">
            Scroll down to see the sticky navbar remain at the top. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    `,
  }),
}
