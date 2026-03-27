import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { ref, watch } from 'vue'
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
  parameters: { layout: 'centered' },
  render: (args: any) => ({
    components: { Toggle },
    setup() {
      const value = ref(args.modelValue ?? false)
      watch(() => args.modelValue, (val) => { value.value = val })
      return { args, value }
    },
    template: '<Toggle v-bind="args" v-model="value" />',
  }),
}

export const Checked: Story = {
  args: { modelValue: true, label: 'Checked' },
  render: (args) => ({
    components: { Toggle },
    setup: () => ({ args }),
    template: '<Toggle v-bind="args" />',
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
    template: `
      <div class="flex flex-col gap-4">
        <Toggle :model-value="false" label="Notifications" label-position="right" />
        <Toggle :model-value="true" label="Dark mode" label-position="right" />
        <Toggle :model-value="false" label="Auto-save" label-position="left" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Toggle },
    template: `
      <div class="flex flex-col gap-4">
        <Toggle :model-value="true" size="sm" label="Small" />
        <Toggle :model-value="true" size="md" label="Medium" />
        <Toggle :model-value="true" size="lg" label="Large" />
      </div>
    `,
  }),
}
