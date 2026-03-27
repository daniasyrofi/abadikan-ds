import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LanguageToggle from './LanguageToggle.vue'

const meta: Meta<typeof LanguageToggle> = {
  title: 'Molecules/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof LanguageToggle>

export const Default: Story = {}

export const AllSizes: Story = {
  render: () => ({
    components: { LanguageToggle },
    template: `
      <div class="flex items-center gap-4">
        <div v-for="s in ['sm', 'md', 'lg']" :key="s" class="flex flex-col items-center gap-2">
          <LanguageToggle :size="s" />
          <span class="text-caption text-[--color-text-secondary]">{{ s }}</span>
        </div>
      </div>
    `,
  }),
}

export const InNavbar: Story = {
  render: () => ({
    components: { LanguageToggle },
    template: `
      <div class="flex items-center justify-between w-80 px-4 py-2 bg-[--color-surface] border border-[--color-border] rounded-[--radius-lg]">
        <span class="text-body font-medium">My App</span>
        <LanguageToggle />
      </div>
    `,
  }),
}
