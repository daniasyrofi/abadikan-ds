import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { RiStarLine, RiCheckLine, RiAlertLine } from '@remixicon/vue'
import Badge from './Badge.vue'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant:    { control: 'select', options: ['neutral', 'primary', 'danger', 'success', 'warning', 'info', 'secondary'] },
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    badgeStyle: { control: 'select', options: ['subtle', 'solid', 'outline'] },
    dot:        { control: 'boolean' },
    removable:  { control: 'boolean' },
  },
  args: {
    variant:    'neutral',
    size:       'md',
    badgeStyle: 'subtle',
    dot:        false,
    removable:  false,
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    badgeStyle: 'subtle',
    dot: false,
    removable: false,
    text: 'Badge',
  },
  argTypes: {
    text: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args: any) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">{{ args.text }}</Badge>',
  }),
}

const variants = ['neutral', 'primary', 'danger', 'success', 'warning', 'info', 'secondary'] as const
const styles   = ['subtle', 'solid', 'outline'] as const
const sizes    = ['sm', 'md', 'lg'] as const

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    setup: () => ({ variants }),
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge v-for="v in variants" :key="v" :variant="v">{{ v }}</Badge>
      </div>
    `,
  }),
}

export const AllStyles: Story = {
  render: () => ({
    components: { Badge },
    setup: () => ({ variants, styles }),
    template: `
      <div class="flex flex-col gap-4">
        <div v-for="s in styles" :key="s" class="flex flex-wrap gap-2 items-center">
          <span class="text-body-sm text-[--color-text-secondary] w-16">{{ s }}</span>
          <Badge v-for="v in variants" :key="v" :variant="v" :badge-style="s">{{ v }}</Badge>
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Badge },
    setup: () => ({ sizes }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Badge v-for="s in sizes" :key="s" :size="s" variant="primary">{{ s }}</Badge>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  render: () => ({
    components: { Badge, RiStarLine, RiCheckLine, RiAlertLine },
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge variant="primary">
          <template #leading><RiStarLine class="size-3" /></template>
          Featured
        </Badge>
        <Badge variant="success">
          <template #leading><RiCheckLine class="size-3" /></template>
          Verified
        </Badge>
        <Badge variant="warning">
          <template #leading><RiAlertLine class="size-3" /></template>
          Warning
        </Badge>
        <Badge variant="danger" badge-style="solid">
          <template #leading><RiAlertLine class="size-3" /></template>
          Error
        </Badge>
      </div>
    `,
  }),
}

export const WithDot: Story = {
  render: () => ({
    components: { Badge },
    setup: () => ({ variants }),
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge v-for="v in variants" :key="v" :variant="v" dot>{{ v }}</Badge>
      </div>
    `,
  }),
}

export const Removable: Story = {
  render: () => ({
    components: { Badge },
    setup: () => ({
      tags: ['Design', 'Development', 'Vue 3', 'TypeScript'],
      remove(tag: string) {
        console.log('Remove:', tag)
      },
    }),
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="tag in tags"
          :key="tag"
          variant="primary"
          removable
          @remove="remove(tag)"
        >
          {{ tag }}
        </Badge>
      </div>
    `,
  }),
}

export const AllStylesGrid: Story = {
  name: 'Full Matrix',
  render: () => ({
    components: { Badge },
    setup: () => ({ variants, styles, sizes }),
    template: `
      <div class="flex flex-col gap-8">
        <div v-for="s in styles" :key="s">
          <p class="text-overline text-[--color-text-secondary] mb-3 uppercase">{{ s }}</p>
          <div class="flex flex-col gap-3">
            <div v-for="sz in sizes" :key="sz" class="flex flex-wrap gap-2 items-center">
              <span class="text-caption text-[--color-text-tertiary] w-6">{{ sz }}</span>
              <Badge v-for="v in variants" :key="v" :variant="v" :badge-style="s" :size="sz">{{ v }}</Badge>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
