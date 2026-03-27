import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Icon from './Icon.vue'

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name:  { control: 'text' },
    size:  { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
  },
  args: {
    name: 'RiHomeLine',
    size: 'md',
  },
}
export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: { name: 'RiHomeLine', size: 'md' },
  parameters: { layout: 'centered' },
  render: (args: any) => ({
    components: { Icon },
    setup: () => ({ args }),
    template: '<Icon v-bind="args" />',
  }),
}

const commonIcons = [
  'RiHomeLine', 'RiUser3Line', 'RiSettings3Line', 'RiSearchLine',
  'RiHeartLine', 'RiStarLine', 'RiBellLine', 'RiMailLine',
  'RiLockLine', 'RiCheckLine', 'RiCloseLine', 'RiArrowRightLine',
  'RiArrowLeftLine', 'RiArrowUpLine', 'RiArrowDownLine', 'RiAddLine',
  'RiDeleteBinLine', 'RiEditLine', 'RiDownloadLine', 'RiUploadLine',
  'RiEyeLine', 'RiEyeOffLine', 'RiInformationLine', 'RiAlertLine',
]

export const AllSizes: Story = {
  render: () => ({
    components: { Icon },
    setup: () => ({ sizes: ['xs', 'sm', 'md', 'lg', 'xl'] as const }),
    template: `
      <div class="flex flex-col gap-6">
        <div v-for="size in sizes" :key="size" class="flex items-center gap-4">
          <span class="text-body-sm text-[--color-text-secondary] w-8">{{ size }}</span>
          <Icon name="RiHomeLine" :size="size" />
          <Icon name="RiUser3Line" :size="size" />
          <Icon name="RiSettings3Line" :size="size" />
          <Icon name="RiCheckLine" :size="size" />
          <Icon name="RiCloseLine" :size="size" />
        </div>
      </div>
    `,
  }),
}

export const IconGrid: Story = {
  render: () => ({
    components: { Icon },
    setup: () => ({
      icons: commonIcons,
      sizes: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
    }),
    template: `
      <div class="flex flex-col gap-8">
        <div>
          <p class="text-body-sm text-[--color-text-secondary] mb-4">Common icons at md size</p>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="icon in icons"
              :key="icon"
              class="flex flex-col items-center gap-1.5 p-3 rounded-[--radius-md] border border-[--color-border] min-w-[80px]"
            >
              <Icon :name="icon" size="md" />
              <span class="text-caption text-[--color-text-secondary] text-center leading-tight">{{ icon.replace('Ri', '').replace('Line', '') }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const ColoredIcons: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-4">
        <Icon name="RiHeartLine" size="lg" color="var(--color-danger)" />
        <Icon name="RiCheckLine" size="lg" color="var(--color-success)" />
        <Icon name="RiAlertLine" size="lg" color="var(--color-warning)" />
        <Icon name="RiInformationLine" size="lg" color="var(--color-info)" />
        <Icon name="RiStarLine" size="lg" color="var(--color-primary)" />
        <Icon name="RiSettingsLine" size="lg" color="var(--color-text-secondary)" />
      </div>
    `,
  }),
}
