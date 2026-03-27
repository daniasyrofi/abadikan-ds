import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Divider from './Divider.vue'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation:   { control: 'select', options: ['horizontal', 'vertical'] },
    variant:       { control: 'select', options: ['solid', 'dashed', 'dotted'] },
    label:         { control: 'text' },
    labelPosition: { control: 'select', options: ['start', 'center', 'end'] },
  },
}
export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    label: '',
    labelPosition: 'center',
  },
  parameters: { layout: 'padded' },
  render: (args: any) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: '<div class="w-full max-w-lg mt-10"><Divider v-bind="args" /></div>',
  }),
}

export const Horizontal: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-80 flex flex-col gap-4">
        <p class="text-body-sm">Content above</p>
        <Divider />
        <p class="text-body-sm">Content below</p>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="h-20 flex items-center gap-4">
        <span class="text-body-sm">Left</span>
        <Divider orientation="vertical" />
        <span class="text-body-sm">Right</span>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-80 flex flex-col gap-6">
        <Divider label="OR" />
        <Divider label="Section" labelPosition="start" />
        <Divider label="End" labelPosition="end" />
      </div>
    `,
  }),
}

export const Dashed: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-80 flex flex-col gap-4">
        <Divider variant="solid" />
        <Divider variant="dashed" />
        <Divider variant="dotted" />
      </div>
    `,
  }),
}

export const InCard: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-72 rounded-[--radius-lg] border border-[--color-border] bg-[--color-surface] p-4">
        <p class="font-semibold text-body">Card Title</p>
        <p class="text-body-sm text-[--color-text-secondary] mt-1">Description text</p>
        <Divider class="my-4" />
        <p class="text-body-sm text-[--color-text-secondary]">Footer content</p>
      </div>
    `,
  }),
}
