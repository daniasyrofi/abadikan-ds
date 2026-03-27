import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Popover from './Popover.vue'

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
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
  render: (args) => ({
    components: { Popover },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-20">
        <Popover v-bind="args">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Click me
            </button>
          </template>
          <div class="text-sm text-[--color-text-primary]">
            <p class="font-semibold mb-1">Popover content</p>
            <p class="text-[--color-text-secondary]">This is interactive content inside a popover.</p>
          </div>
        </Popover>
      </div>
    `,
  }),
}

export const AllPlacements: Story = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="grid grid-cols-3 gap-8 p-24 place-items-center" style="min-height:500px">
        <div />
        <Popover placement="top" trigger="click">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Top
            </button>
          </template>
          <p class="text-sm text-[--color-text-primary]">Top placement</p>
        </Popover>
        <div />

        <Popover placement="left" trigger="click">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Left
            </button>
          </template>
          <p class="text-sm text-[--color-text-primary]">Left placement</p>
        </Popover>
        <div />
        <Popover placement="right" trigger="click">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Right
            </button>
          </template>
          <p class="text-sm text-[--color-text-primary]">Right placement</p>
        </Popover>

        <div />
        <Popover placement="bottom" trigger="click">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Bottom
            </button>
          </template>
          <p class="text-sm text-[--color-text-primary]">Bottom placement</p>
        </Popover>
        <div />
      </div>
    `,
  }),
}

export const WithForm: Story = {
  render: () => ({
    components: { Popover },
    setup() {
      const name = ref('')
      const email = ref('')
      function handleSubmit() {
        console.log('Submitted:', { name: name.value, email: email.value })
      }
      return { name, email, handleSubmit }
    },
    template: `
      <div class="flex items-center justify-center p-20">
        <Popover placement="bottom-start" width="280px">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-primary] text-[--color-primary-text] cursor-pointer">
              Edit profile
            </button>
          </template>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
            <p class="text-sm font-semibold text-[--color-text-primary]">Edit Profile</p>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-[--color-text-secondary]">Name</label>
              <input
                v-model="name"
                type="text"
                placeholder="John Doe"
                class="w-full px-2.5 py-1.5 text-sm rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-[--color-text-primary] outline-none focus:border-[--color-primary]"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-[--color-text-secondary]">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="john@example.com"
                class="w-full px-2.5 py-1.5 text-sm rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-[--color-text-primary] outline-none focus:border-[--color-primary]"
              />
            </div>
            <button
              type="submit"
              class="w-full px-3 py-1.5 text-sm rounded-[--radius-md] bg-[--color-primary] text-[--color-primary-text] cursor-pointer"
            >
              Save
            </button>
          </form>
        </Popover>
      </div>
    `,
  }),
}

export const ClickTrigger: Story = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center p-20">
        <Popover trigger="click" placement="bottom">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Click to toggle
            </button>
          </template>
          <div class="text-sm text-[--color-text-primary]">
            <p class="font-semibold mb-1">Click-triggered</p>
            <p class="text-[--color-text-secondary]">Click the button again or outside to close.</p>
          </div>
        </Popover>
      </div>
    `,
  }),
}

export const HoverTrigger: Story = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center p-20">
        <Popover trigger="hover" placement="bottom">
          <template #trigger>
            <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer">
              Hover me
            </button>
          </template>
          <div class="text-sm text-[--color-text-primary]">
            <p class="font-semibold mb-1">Hover-triggered</p>
            <p class="text-[--color-text-secondary]">Move your mouse away to close. You can interact with this content.</p>
            <a href="#" class="text-[--color-primary] underline text-xs mt-1 inline-block">Learn more</a>
          </div>
        </Popover>
      </div>
    `,
  }),
}
