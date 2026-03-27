import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { ref, watch } from 'vue'
import Checkbox from './Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label:    { control: 'text' },
  },
  args: {
    modelValue: false,
    size:       'md',
    disabled:   false,
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  parameters: { layout: 'centered' },
  render: (args: any) => ({
    components: { Checkbox },
    setup() {
      const value = ref(args.modelValue ?? false)
      watch(() => args.modelValue, (val) => { value.value = val })
      return { args, value }
    },
    template: '<Checkbox v-bind="args" v-model="value" label="Accept terms and conditions" />',
  }),
}

export const Checked: Story = {
  args: { modelValue: true, label: 'Checked state' },
  render: (args) => ({
    components: { Checkbox },
    setup: () => ({ args }),
    template: '<Checkbox v-bind="args" />',
  }),
}

export const Indeterminate: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const parent = ref<boolean | 'indeterminate'>('indeterminate')
      const children = ref([true, false, true])

      function toggleParent() {
        if (parent.value === true) {
          children.value = children.value.map(() => false)
          parent.value = false
        } else {
          children.value = children.value.map(() => true)
          parent.value = true
        }
      }

      function updateChild(i: number, val: boolean) {
        children.value[i] = val
        const all  = children.value.every(Boolean)
        const none = children.value.every((v) => !v)
        parent.value = all ? true : none ? false : 'indeterminate'
      }

      return { parent, children, toggleParent, updateChild }
    },
    template: `
      <div class="flex flex-col gap-2">
        <Checkbox :model-value="parent" label="Select all items" @update:model-value="toggleParent" />
        <div class="ml-6 flex flex-col gap-2">
          <Checkbox
            v-for="(val, i) in children"
            :key="i"
            :model-value="val"
            :label="'Option ' + (i + 1)"
            @update:model-value="(v) => updateChild(i, v)"
          />
        </div>
      </div>
    `,
  }),
}

export const WithDescription: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => ({ value: ref(false) }),
    template: `
      <Checkbox
        v-model="value"
        label="Marketing emails"
        description="Receive emails about new products, features, and more."
      />
    `,
  }),
}

export const Error: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => ({ value: ref(false) }),
    template: `
      <Checkbox
        v-model="value"
        label="I agree to the terms"
        error="You must accept the terms to continue."
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div class="flex flex-col gap-3">
        <Checkbox :model-value="false" disabled label="Disabled unchecked" />
        <Checkbox :model-value="true"  disabled label="Disabled checked" />
        <Checkbox :model-value="'indeterminate'" disabled label="Disabled indeterminate" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => ({
      sm: ref(true),
      md: ref(true),
      lg: ref(true),
    }),
    template: `
      <div class="flex flex-col gap-3">
        <Checkbox v-model="sm" size="sm" label="Small size" description="Used for dense lists" />
        <Checkbox v-model="md" size="md" label="Medium size" description="Standard component size" />
        <Checkbox v-model="lg" size="lg" label="Large size" description="For spacious landing pages" />
      </div>
    `,
  }),
}

export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const selected = ref<string[]>(['email'])
      const options = [
        { value: 'email',   label: 'Email', description: 'Receive updates via email' },
        { value: 'sms',     label: 'SMS', description: 'Receive updates via text message' },
        { value: 'push',    label: 'Push notifications', description: 'Receive in-app notifications' },
      ]
      function toggle(val: string) {
        const idx = selected.value.indexOf(val)
        if (idx >= 0) selected.value.splice(idx, 1)
        else selected.value.push(val)
      }
      return { selected, options, toggle }
    },
    template: `
      <fieldset class="flex flex-col gap-3 p-4 border border-neutral-200 rounded-lg max-w-sm">
        <legend class="text-sm font-medium text-neutral-900 mb-2">Notification preferences</legend>
        <Checkbox
          v-for="opt in options"
          :key="opt.value"
          :model-value="selected.includes(opt.value)"
          :label="opt.label"
          :description="opt.description"
          :value="opt.value"
          @update:model-value="toggle(opt.value)"
        />
      </fieldset>
    `,
  }),
}
