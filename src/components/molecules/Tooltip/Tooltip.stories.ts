import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tooltip from './Tooltip.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content:   { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    trigger:   { control: 'select', options: ['hover', 'click', 'focus'] },
    delay:     { control: 'number' },
    maxWidth:  { control: 'text' },
    arrow:     { control: 'boolean' },
  },
  args: {
    content:   'Tooltip text',
    placement: 'top',
    trigger:   'hover',
    delay:     200,
    maxWidth:  '200px',
    arrow:     true,
  },
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip v-bind="args">
          <button class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse]">
            Hover me
          </button>
        </Tooltip>
      </div>
    `,
  }),
}

export const AllPlacements: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="grid grid-cols-2 gap-8 p-20 place-items-center" style="min-height:300px">
        <Tooltip content="Tooltip on top" placement="top">
          <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary]">
            Top
          </button>
        </Tooltip>
        <Tooltip content="Tooltip on bottom" placement="bottom">
          <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary]">
            Bottom
          </button>
        </Tooltip>
        <Tooltip content="Tooltip on left" placement="left">
          <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary]">
            Left
          </button>
        </Tooltip>
        <Tooltip content="Tooltip on right" placement="right">
          <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary]">
            Right
          </button>
        </Tooltip>
      </div>
    `,
  }),
}

export const ClickTrigger: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip content="Click-triggered tooltip" trigger="click">
          <button class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-primary] text-[--color-primary-text]">
            Click me
          </button>
        </Tooltip>
      </div>
    `,
  }),
}

export const NoArrow: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip content="No arrow on this tooltip" :arrow="false">
          <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary]">
            No arrow
          </button>
        </Tooltip>
      </div>
    `,
  }),
}

export const RichContent: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip placement="bottom" max-width="260px">
          <button class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary]">
            Rich tooltip
          </button>
          <template #content>
            <div class="flex flex-col gap-1">
              <span class="font-semibold">Pro tip</span>
              <span class="text-xs opacity-80">You can use the <kbd class="px-1 py-0.5 rounded bg-white/20 text-xs">Esc</kbd> key to close modals quickly.</span>
            </div>
          </template>
        </Tooltip>
      </div>
    `,
  }),
}
