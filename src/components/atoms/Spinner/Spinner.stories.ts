import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Spinner from './Spinner.vue'
import Button from '../Button/Button.vue'

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
    label: { control: 'text' },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  parameters: { layout: 'centered' },
  render: (args: any) => ({
    components: { Spinner },
    setup: () => ({ args }),
    template: '<Spinner v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="flex items-center gap-4">
        <div v-for="s in ['xs','sm','md','lg','xl']" :key="s" class="flex flex-col items-center gap-2">
          <Spinner :size="s" />
          <span class="text-caption text-[--color-text-secondary]">{{ s }}</span>
        </div>
      </div>
    `,
  }),
}

export const ColorVariants: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div class="flex items-center gap-4">
        <Spinner color="var(--color-primary)" />
        <Spinner color="var(--color-success)" />
        <Spinner color="var(--color-warning)" />
        <Spinner color="var(--color-info)" />
      </div>
    `,
  }),
}

export const InButton: Story = {
  render: () => ({
    components: { Spinner, Button },
    template: `
      <div class="flex items-center gap-3">
        <Button disabled>
          <template #leading><Spinner size="xs" /></template>
          Saving...
        </Button>
        <Button variant="secondary" disabled>
          <template #leading><Spinner size="xs" /></template>
          Loading...
        </Button>
      </div>
    `,
  }),
}
