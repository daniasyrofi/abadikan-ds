import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Textarea from './Textarea.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    resize:     { control: 'select', options: ['none', 'vertical', 'both'] },
    disabled:   { control: 'boolean' },
    readonly:   { control: 'boolean' },
    autoResize: { control: 'boolean' },
    counter:    { control: 'boolean' },
  },
  args: {
    modelValue: '',
    size:       'md',
    rows:       3,
    autoResize: true,
    disabled:   false,
    readonly:   false,
    counter:    false,
  },
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ value: ref(''), args }),
    template: '<Textarea v-bind="args" v-model="value" placeholder="Enter text..." />',
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({ value: ref('') }),
    template: `
      <Textarea
        v-model="value"
        label="Message"
        placeholder="Write your message here..."
        helper-text="Please be as detailed as possible."
      />
    `,
  }),
}

export const AutoResize: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({
      value: ref('This textarea automatically grows as you type more content. Try typing a few lines and watch it expand smoothly without any scrollbar appearing.'),
    }),
    template: `
      <Textarea
        v-model="value"
        label="Auto-resizing textarea"
        :auto-resize="true"
        :rows="2"
        placeholder="Start typing to see auto-resize..."
      />
    `,
  }),
}

export const FixedRows: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({ value: ref('') }),
    template: `
      <div class="flex flex-col gap-4">
        <Textarea v-model="value" label="2 rows" :rows="2" :auto-resize="false" resize="vertical" placeholder="2 fixed rows..." />
        <Textarea v-model="value" label="5 rows" :rows="5" :auto-resize="false" resize="vertical" placeholder="5 fixed rows..." />
        <Textarea v-model="value" label="8 rows" :rows="8" :auto-resize="false" resize="vertical" placeholder="8 fixed rows..." />
      </div>
    `,
  }),
}

export const WithMaxRows: Story = {
  name: 'Auto-resize with max rows',
  render: () => ({
    components: { Textarea },
    setup: () => ({ value: ref('') }),
    template: `
      <Textarea
        v-model="value"
        label="Max 5 rows"
        :auto-resize="true"
        :rows="2"
        :max-rows="5"
        placeholder="Grows up to 5 rows then scrolls..."
      />
    `,
  }),
}

export const WithCounter: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({ value: ref('') }),
    template: `
      <Textarea
        v-model="value"
        label="Bio"
        placeholder="Tell us about yourself..."
        :maxlength="250"
        counter
        helper-text="Maximum 250 characters."
      />
    `,
  }),
}

export const Error: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({ value: ref('') }),
    template: `
      <Textarea
        v-model="value"
        label="Description"
        error="Description is required."
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({ value: ref('This content cannot be edited.') }),
    template: `
      <Textarea
        v-model="value"
        label="Disabled"
        disabled
      />
    `,
  }),
}

export const Readonly: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({
      value: ref('This is a read-only value that can be selected and copied but not modified.'),
    }),
    template: `
      <Textarea
        v-model="value"
        label="Read-only"
        readonly
        helper-text="You can select and copy this text."
      />
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Textarea },
    setup: () => ({
      sm: ref(''),
      md: ref(''),
      lg: ref(''),
    }),
    template: `
      <div class="flex flex-col gap-4">
        <Textarea v-model="sm" size="sm" label="Small" placeholder="Small textarea..." />
        <Textarea v-model="md" size="md" label="Medium" placeholder="Medium textarea..." />
        <Textarea v-model="lg" size="lg" label="Large" placeholder="Large textarea..." />
      </div>
    `,
  }),
}
