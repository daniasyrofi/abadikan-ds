import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Radio from './Radio.vue'

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label:    { control: 'text' },
  },
  args: {
    modelValue: '',
    value:      'option1',
    size:       'md',
    disabled:   false,
  },
}
export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  render: (args) => ({
    components: { Radio },
    setup: () => ({ value: ref(''), args }),
    template: '<Radio v-bind="args" v-model="value" label="Option 1" value="option1" />',
  }),
}

export const Selected: Story = {
  render: () => ({
    components: { Radio },
    setup: () => ({ value: ref('option1') }),
    template: '<Radio v-model="value" label="Selected option" value="option1" />',
  }),
}

export const WithDescription: Story = {
  render: () => ({
    components: { Radio },
    setup: () => ({ value: ref('standard') }),
    template: `
      <Radio
        v-model="value"
        label="Standard shipping"
        description="Delivery in 5-7 business days"
        value="standard"
      />
    `,
  }),
}

export const Error: Story = {
  render: () => ({
    components: { Radio },
    setup: () => ({ value: ref('') }),
    template: `
      <Radio
        v-model="value"
        label="Accept terms"
        error="Please select an option to continue."
        value="accept"
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div class="flex flex-col gap-3">
        <Radio :model-value="''" value="a" disabled label="Disabled unselected" />
        <Radio :model-value="'b'" value="b" disabled label="Disabled selected" />
      </div>
    `,
  }),
}

export const RadioGroup: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('standard')
      const options = [
        {
          value:       'standard',
          label:       'Standard shipping',
          description: 'Free — Delivery in 5–7 business days',
        },
        {
          value:       'express',
          label:       'Express shipping',
          description: '$9.99 — Delivery in 2–3 business days',
        },
        {
          value:       'overnight',
          label:       'Overnight shipping',
          description: '$19.99 — Next business day delivery',
        },
      ]
      return { selected, options }
    },
    template: `
      <fieldset class="flex flex-col gap-3">
        <legend class="text-body font-medium text-[--color-text-heading] mb-2">Shipping method</legend>
        <Radio
          v-for="opt in options"
          :key="opt.value"
          v-model="selected"
          :value="opt.value"
          :label="opt.label"
          :description="opt.description"
          name="shipping"
        />
      </fieldset>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Radio },
    setup: () => ({
      sm: ref('a'),
      md: ref('a'),
      lg: ref('a'),
    }),
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <p class="text-caption text-[--color-text-secondary] uppercase">Small</p>
          <Radio v-model="sm" size="sm" value="a" label="Option A" description="Small radio button" />
          <Radio v-model="sm" size="sm" value="b" label="Option B" description="Small radio button" />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-caption text-[--color-text-secondary] uppercase">Medium</p>
          <Radio v-model="md" size="md" value="a" label="Option A" description="Medium radio button" />
          <Radio v-model="md" size="md" value="b" label="Option B" description="Medium radio button" />
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-caption text-[--color-text-secondary] uppercase">Large</p>
          <Radio v-model="lg" size="lg" value="a" label="Option A" description="Large radio button" />
          <Radio v-model="lg" size="lg" value="b" label="Option B" description="Large radio button" />
        </div>
      </div>
    `,
  }),
}
