import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Avatar from './Avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size:         { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    shape:        { control: 'select', options: ['circle', 'rounded'] },
    status:       { control: 'select', options: ['online', 'offline', 'busy', 'away'] },
    fallbackIcon: { control: 'text' },
  },
  args: {
    size:  'md',
    shape: 'circle',
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src:  'https://i.pravatar.cc/150?img=1',
    alt:  'Jane Doe',
    name: 'Jane Doe',
    size: 'md',
  },
}

export const Initials: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Avatar name="Jane Doe" size="md" />
        <Avatar name="Bob" size="md" />
        <Avatar name="Alex Kim" size="md" />
        <Avatar name="María García" size="md" />
      </div>
    `,
  }),
}

export const IconFallback: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Avatar size="md" />
        <Avatar size="md" fallback-icon="RiRobotLine" />
        <Avatar size="md" fallback-icon="RiBuildingLine" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Avatar },
    setup: () => ({ sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const }),
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-body-sm text-[--color-text-secondary] mb-3">With image</p>
          <div class="flex flex-wrap items-end gap-3">
            <Avatar v-for="s in sizes" :key="s" :size="s" src="https://i.pravatar.cc/150?img=3" alt="User" />
          </div>
        </div>
        <div>
          <p class="text-body-sm text-[--color-text-secondary] mb-3">With initials</p>
          <div class="flex flex-wrap items-end gap-3">
            <Avatar v-for="s in sizes" :key="s" :size="s" name="Alex Kim" />
          </div>
        </div>
        <div>
          <p class="text-body-sm text-[--color-text-secondary] mb-3">Icon fallback</p>
          <div class="flex flex-wrap items-end gap-3">
            <Avatar v-for="s in sizes" :key="s" :size="s" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const AllStatuses: Story = {
  render: () => ({
    components: { Avatar },
    setup: () => ({ statuses: ['online', 'offline', 'busy', 'away'] as const }),
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <div v-for="s in statuses" :key="s" class="flex flex-col items-center gap-2">
          <Avatar name="Alex Kim" size="lg" :status="s" />
          <span class="text-caption text-[--color-text-secondary]">{{ s }}</span>
        </div>
      </div>
    `,
  }),
}

export const Shapes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex flex-col items-center gap-2">
          <Avatar src="https://i.pravatar.cc/150?img=5" size="lg" shape="circle" />
          <span class="text-caption text-[--color-text-secondary]">circle</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar src="https://i.pravatar.cc/150?img=5" size="lg" shape="rounded" />
          <span class="text-caption text-[--color-text-secondary]">rounded</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar name="Alex Kim" size="lg" shape="circle" />
          <span class="text-caption text-[--color-text-secondary]">circle</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar name="Alex Kim" size="lg" shape="rounded" />
          <span class="text-caption text-[--color-text-secondary]">rounded</span>
        </div>
      </div>
    `,
  }),
}

export const WithStatusAndShape: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://i.pravatar.cc/150?img=7" size="lg" shape="circle" status="online" />
        <Avatar src="https://i.pravatar.cc/150?img=8" size="lg" shape="rounded" status="busy" />
        <Avatar name="Jane Doe" size="lg" shape="circle" status="away" />
        <Avatar name="Bob Smith" size="lg" shape="rounded" status="offline" />
      </div>
    `,
  }),
}
