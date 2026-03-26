import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Toggle from './Toggle.vue'

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size:          { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled:      { control: 'boolean' },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    label:         { control: 'text' },
    modelValue:    { control: 'boolean' },
  },
  args: {
    modelValue: false,
    size:       'md',
    disabled:   false,
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: (args) => ({
    components: { Toggle },
    setup() {
      const value = ref(args.modelValue ?? false)
      return { args, value }
    },
    template: '<Toggle v-bind="args" v-model="value" />',
  }),
}

export const Checked: Story = {
  render: () => ({
    components: { Toggle },
    setup: () => ({ value: ref(true) }),
    template: '<Toggle v-model="value" />',
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Toggle },
    template: `
      <div class="flex items-center gap-4">
        <Toggle :model-value="false" disabled label="Disabled off" />
        <Toggle :model-value="true"  disabled label="Disabled on" />
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Toggle },
    setup: () => ({
      v1: ref(false),
      v2: ref(true),
      v3: ref(false),
    }),
    template: `
      <div class="flex flex-col gap-4">
        <Toggle v-model="v1" label="Notifications" label-position="right" />
        <Toggle v-model="v2" label="Dark mode" label-position="right" />
        <Toggle v-model="v3" label="Auto-save" label-position="left" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Toggle },
    setup: () => ({
      sm: ref(true),
      md: ref(true),
      lg: ref(true),
    }),
    template: `
      <div class="flex flex-col gap-4">
        <Toggle v-model="sm" size="sm" label="Small" />
        <Toggle v-model="md" size="md" label="Medium" />
        <Toggle v-model="lg" size="lg" label="Large" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { Toggle },
    setup() {
      const features = ref({
        notifications: true,
        darkMode: false,
        autoSave: true,
        analytics: false,
      })
      return { features }
    },
    template: `
      <div class="flex flex-col gap-3 p-4 rounded-[--radius-lg] border border-[--color-border] max-w-xs">
        <p class="text-h4 text-[--color-text-heading]">Settings</p>
        <div v-for="(val, key) in features" :key="key" class="flex items-center justify-between py-1">
          <span class="text-body text-[--color-text-primary] capitalize">{{ key.replace(/([A-Z])/g, ' $1') }}</span>
          <Toggle v-model="features[key]" />
        </div>
      </div>
    `,
  }),
}
