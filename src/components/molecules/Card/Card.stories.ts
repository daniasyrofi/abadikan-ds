import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from './Card.vue'

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: 'select', options: ['default', 'outlined', 'elevated', 'flat'] },
    padding:   { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    radius:    { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
    as:        { control: 'text' },
  },
  args: {
    variant:   'default',
    padding:   'md',
    radius:    'lg',
    hoverable: false,
    clickable: false,
    as:        'div',
  },
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" style="max-width:320px">
        <p class="text-[--color-text-secondary] text-sm">
          This is the card body. Add any content here.
        </p>
      </Card>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="flex flex-wrap gap-6 p-6">
        <Card variant="default" style="width:220px;min-height:100px">
          <p class="text-sm text-[--color-text-secondary]">Default — border + shadow-sm</p>
        </Card>
        <Card variant="outlined" style="width:220px;min-height:100px">
          <p class="text-sm text-[--color-text-secondary]">Outlined — border only</p>
        </Card>
        <Card variant="elevated" style="width:220px;min-height:100px">
          <p class="text-sm text-[--color-text-secondary]">Elevated — shadow-lg, no border</p>
        </Card>
        <Card variant="flat" style="width:220px;min-height:100px">
          <p class="text-sm text-[--color-text-secondary]">Flat — no shadow, no border</p>
        </Card>
      </div>
    `,
  }),
}

export const WithSlots: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card style="max-width:340px">
        <template #header>
          <div>
            <h3 class="font-semibold text-[--color-text-heading]">Card Title</h3>
            <p class="text-xs text-[--color-text-secondary] mt-0.5">Subtitle or metadata</p>
          </div>
          <span class="text-xs text-[--color-text-secondary]">Tag</span>
        </template>
        <p class="text-sm text-[--color-text-secondary]">
          This card uses header, body, and footer slots matching Figma anatomy.
        </p>
        <template #footer>
          <button class="text-xs text-[--color-primary] font-medium">Learn more →</button>
        </template>
      </Card>
    `,
  }),
}

export const WithMedia: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card style="max-width:320px">
        <template #media>
          <div
            style="height:160px;background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-info) 100%)"
            class="w-full"
          />
        </template>
        <template #header>
          <div>
            <h3 class="font-semibold text-[--color-text-heading]">Media Card</h3>
            <p class="text-xs text-[--color-text-secondary]">With top image area</p>
          </div>
        </template>
        <p class="text-sm text-[--color-text-secondary]">Content below the image.</p>
        <template #footer>
          <button class="text-xs px-3 py-1.5 rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse] font-medium">Action</button>
        </template>
      </Card>
    `,
  }),
}

export const AllPaddings: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="flex flex-wrap items-start gap-4 p-6">
        <Card v-for="p in ['none','sm','md','lg']" :key="p" :padding="p" variant="outlined" style="width:160px">
          <div class="bg-[--color-neutral-light] rounded text-xs text-center py-2 text-[--color-text-secondary]">
            padding="{{ p }}"
          </div>
        </Card>
      </div>
    `,
  }),
}

export const AllRadii: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="flex flex-wrap gap-4 p-6">
        <Card v-for="r in ['sm','md','lg','xl']" :key="r" :radius="r" variant="default" style="width:140px;min-height:80px">
          <p class="text-xs text-[--color-text-secondary] text-center">radius="{{ r }}"</p>
        </Card>
      </div>
    `,
  }),
}

export const Hoverable: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="flex gap-4 p-8">
        <Card hoverable style="width:200px">
          <p class="text-sm text-[--color-text-secondary]">Hover me — lifts on hover</p>
        </Card>
        <Card variant="elevated" hoverable style="width:200px">
          <p class="text-sm text-[--color-text-secondary]">Elevated + hoverable</p>
        </Card>
      </div>
    `,
  }),
}

export const Clickable: Story = {
  render: () => ({
    components: { Card },
    setup() {
      return { onClick: () => alert('Card clicked!') }
    },
    template: `
      <div class="flex gap-4 p-8">
        <Card clickable style="width:200px" @click="onClick">
          <p class="text-sm font-medium text-[--color-text-primary]">Click me</p>
          <p class="text-xs text-[--color-text-secondary] mt-1">Acts as a button</p>
        </Card>
        <Card variant="outlined" clickable style="width:200px" @click="onClick">
          <p class="text-sm font-medium text-[--color-text-primary]">Outlined + clickable</p>
          <p class="text-xs text-[--color-text-secondary] mt-1">Keyboard accessible</p>
        </Card>
      </div>
    `,
  }),
}

export const ProductCard: Story = {
  name: 'Example — Product Card',
  render: () => ({
    components: { Card },
    template: `
      <div class="flex gap-5 flex-wrap p-6">
        <Card
          v-for="i in 3"
          :key="i"
          variant="default"
          hoverable
          clickable
          style="width:240px"
        >
          <template #media>
            <div
              :style="{ height:'140px', background: ['linear-gradient(135deg,#6366f1,#8b5cf6)', 'linear-gradient(135deg,#f59e0b,#ef4444)', 'linear-gradient(135deg,#10b981,#059669)'][i-1] }"
              class="w-full"
            />
          </template>
          <template #header>
            <div class="w-full">
              <div class="flex items-start justify-between">
                <h3 class="font-semibold text-sm text-[--color-text-heading]">Product {{ i }}</h3>
                <span class="text-xs font-bold text-[--color-text-primary]">\${{ 19 * i }}.99</span>
              </div>
              <p class="text-xs text-[--color-text-secondary] mt-0.5">Category</p>
            </div>
          </template>
          <p class="text-xs text-[--color-text-secondary]">Short product description goes here with some detail.</p>
          <template #footer>
            <button class="w-full text-sm py-1.5 rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse] font-medium">Add to cart</button>
          </template>
        </Card>
      </div>
    `,
  }),
}
