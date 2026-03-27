import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { RiAddLine, RiArrowRightLine, RiDeleteBinLine, RiDownloadLine } from '@remixicon/vue'
import { h } from 'vue'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: 'select', options: ['default', 'secondary', 'ghost', 'danger', 'link'] },
    size:      { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled:  { control: 'boolean' },
    loading:   { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    text:      { control: 'text' },
  },
  args: {
    variant:   'default',
    size:      'md',
    disabled:  false,
    loading:   false,
    fullWidth: false,
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant:   'default',
    size:      'md',
    disabled:  false,
    loading:   false,
    fullWidth: false,
    text:      'Button',
  },
  parameters: { layout: 'centered' },
  render: (args: any) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">{{ args.text }}</Button>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap gap-3">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    `,
  }),
}

export const WithLeadingIcon: Story = {
  render: () => ({
    components: { Button, RiAddLine },
    template: `
      <div class="flex flex-wrap gap-3">
        <Button v-for="size in ['xs','sm','md','lg','xl']" :key="size" :size="size">
          <template #leading><RiAddLine class="size-4" /></template>
          Add Item
        </Button>
      </div>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  render: () => ({
    components: { Button, RiArrowRightLine },
    template: `
      <Button>
        Continue
        <template #trailing><RiArrowRightLine class="size-4" /></template>
      </Button>
    `,
  }),
}

export const IconOnly: Story = {
  render: () => ({
    components: { Button, RiDownloadLine },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button v-for="size in ['xs','sm','md','lg','xl']" :key="size" :size="size" :iconOnly="true" :aria-label="'Download ' + size">
          <template #icon><RiDownloadLine class="size-4" /></template>
        </Button>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap gap-3">
        <Button loading>Loading</Button>
        <Button variant="secondary" loading>Loading</Button>
        <Button variant="ghost" loading>Loading</Button>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap gap-3">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="danger" disabled>Disabled</Button>
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-col gap-3 w-64">
        <Button fullWidth>Full Width Default</Button>
        <Button fullWidth variant="secondary">Full Width Secondary</Button>
      </div>
    `,
  }),
}

export const DangerIsRed: Story = {
  name: '⚠️ Danger (Destructive — red)',
  render: () => ({
    components: { Button, RiDeleteBinLine },
    template: `
      <div class="flex flex-col gap-4">
        <p class="text-body-sm text-[--color-text-secondary]">
          Red is reserved for destructive actions only.
          Default buttons use black (neutral).
        </p>
        <div class="flex gap-3">
          <Button variant="danger">
            <template #leading><RiDeleteBinLine class="size-4" /></template>
            Delete Account
          </Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </div>
    `,
  }),
}
