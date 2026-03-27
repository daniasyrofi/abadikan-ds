import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DatePicker from './DatePicker.vue'

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue:  { control: 'text' },
    mode:        { control: 'select', options: ['single', 'range'] },
    minDate:     { control: 'text' },
    maxDate:     { control: 'text' },
    format:      { control: 'text' },
    placeholder: { control: 'text' },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    label:       { control: 'text' },
    error:       { control: 'text' },
    disabled:    { control: 'boolean' },
  },
  args: {
    modelValue: null,
    mode: 'single',
    format: 'dd/MM/yyyy',
    placeholder: 'Select date',
    size: 'md',
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date, args }
    },
    template: `
      <div class="max-w-xs">
        <DatePicker v-bind="args" v-model="date" />
        <p class="text-xs text-[--color-text-tertiary] mt-2">Value: {{ date ?? 'null' }}</p>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date }
    },
    template: `
      <div class="max-w-xs">
        <DatePicker v-model="date" label="Date of birth" placeholder="DD/MM/YYYY" />
      </div>
    `,
  }),
}

export const MinMaxDate: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      const today = new Date()
      const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString().split('T')[0]
      const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        .toISOString().split('T')[0]
      return { date, minDate, maxDate }
    },
    template: `
      <div class="max-w-xs">
        <DatePicker
          v-model="date"
          label="Appointment date"
          :min-date="minDate"
          :max-date="maxDate"
        />
        <p class="text-xs text-[--color-text-tertiary] mt-2">
          Only dates in the current month are selectable.
        </p>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref('2026-03-15')
      return { date }
    },
    template: `
      <div class="max-w-xs">
        <DatePicker v-model="date" label="Start date" disabled />
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date }
    },
    template: `
      <div class="max-w-xs">
        <DatePicker
          v-model="date"
          label="Due date"
          error="Please select a valid date."
        />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const sm = ref<string | null>(null)
      const md = ref<string | null>(null)
      const lg = ref<string | null>(null)
      return { sm, md, lg }
    },
    template: `
      <div class="flex flex-col gap-4 max-w-xs">
        <DatePicker v-model="sm" size="sm" label="Small" />
        <DatePicker v-model="md" size="md" label="Medium" />
        <DatePicker v-model="lg" size="lg" label="Large" />
      </div>
    `,
  }),
}
