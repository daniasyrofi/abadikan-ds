import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import {
  RiSearchLine, RiMailLine, RiLockLine, RiUser3Line,
  RiGlobeLine, RiPhoneLine, RiCalendarLine,
} from '@remixicon/vue'
import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type:      { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled:  { control: 'boolean' },
    readonly:  { control: 'boolean' },
    required:  { control: 'boolean' },
    clearable: { control: 'boolean' },
    counter:   { control: 'boolean' },
  },
  args: {
    modelValue: '',
    type:       'text',
    size:       'md',
    disabled:   false,
    readonly:   false,
    required:   false,
    clearable:  false,
    counter:    false,
  },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup: () => ({ value: ref(''), args }),
    template: '<Input v-bind="args" v-model="value" placeholder="Enter text..." />',
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('') }),
    template: `
      <Input v-model="value" label="Full name" placeholder="John Doe" required />
    `,
  }),
}

export const WithHelperText: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('') }),
    template: `
      <Input
        v-model="value"
        label="Email address"
        placeholder="you@example.com"
        helper-text="We'll never share your email with anyone else."
        type="email"
      />
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('invalid-email') }),
    template: `
      <Input
        v-model="value"
        label="Email address"
        type="email"
        error="Please enter a valid email address."
      />
    `,
  }),
}

export const WithPrefixText: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('') }),
    template: `
      <div class="flex flex-col gap-4 max-w-xs">
        <Input v-model="value" label="Price" placeholder="0.00" type="number">
          <template #prefix>$</template>
        </Input>
        <Input v-model="value" label="Amount" placeholder="0.00">
          <template #prefix>USD</template>
        </Input>
      </div>
    `,
  }),
}

export const WithSuffixText: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('') }),
    template: `
      <div class="flex flex-col gap-4 max-w-xs">
        <Input v-model="value" label="Website" placeholder="yoursite">
          <template #suffix>.com</template>
        </Input>
        <Input v-model="value" label="Weight" placeholder="70">
          <template #suffix>kg</template>
        </Input>
      </div>
    `,
  }),
}

export const WithLeadingIcon: Story = {
  render: () => ({
    components: { Input, RiSearchLine, RiMailLine, RiUser3Line },
    setup: () => ({ value: ref('') }),
    template: `
      <div class="flex flex-col gap-4 max-w-xs">
        <Input v-model="value" label="Search" placeholder="Search...">
          <template #leading><RiSearchLine class="size-4" /></template>
        </Input>
        <Input v-model="value" label="Email" placeholder="you@example.com" type="email">
          <template #leading><RiMailLine class="size-4" /></template>
        </Input>
        <Input v-model="value" label="Username" placeholder="johndoe">
          <template #leading><RiUser3Line class="size-4" /></template>
        </Input>
      </div>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  render: () => ({
    components: { Input, RiCalendarLine, RiGlobeLine },
    setup: () => ({ value: ref('') }),
    template: `
      <div class="flex flex-col gap-4 max-w-xs">
        <Input v-model="value" label="Date" placeholder="Pick a date">
          <template #trailing><RiCalendarLine class="size-4" /></template>
        </Input>
        <Input v-model="value" label="Website" placeholder="example.com">
          <template #trailing><RiGlobeLine class="size-4" /></template>
        </Input>
      </div>
    `,
  }),
}

export const Clearable: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('Hello world') }),
    template: `
      <Input
        v-model="value"
        label="Search"
        placeholder="Type something..."
        clearable
      />
    `,
  }),
}

export const Password: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('supersecret') }),
    template: `
      <Input
        v-model="value"
        label="Password"
        type="password"
        placeholder="Enter password"
        helper-text="Must be at least 8 characters."
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('Cannot edit this') }),
    template: `
      <Input
        v-model="value"
        label="Disabled input"
        disabled
      />
    `,
  }),
}

export const Readonly: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('Read-only value') }),
    template: `
      <Input
        v-model="value"
        label="API key"
        readonly
        helper-text="Click to copy."
      />
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Input, RiSearchLine },
    setup: () => ({
      sm: ref(''),
      md: ref(''),
      lg: ref(''),
    }),
    template: `
      <div class="flex flex-col gap-4 max-w-xs">
        <Input v-model="sm" size="sm" label="Small" placeholder="Small input">
          <template #leading><RiSearchLine class="size-3.5" /></template>
        </Input>
        <Input v-model="md" size="md" label="Medium" placeholder="Medium input">
          <template #leading><RiSearchLine class="size-4" /></template>
        </Input>
        <Input v-model="lg" size="lg" label="Large" placeholder="Large input">
          <template #leading><RiSearchLine class="size-[18px]" /></template>
        </Input>
      </div>
    `,
  }),
}

export const WithCounter: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('') }),
    template: `
      <Input
        v-model="value"
        label="Bio"
        placeholder="Tell us about yourself..."
        :maxlength="100"
        counter
        helper-text="Keep it short and sweet."
      />
    `,
  }),
}

export const CombinedPrefixAndSuffix: Story = {
  name: 'Prefix + Suffix',
  render: () => ({
    components: { Input },
    setup: () => ({ value: ref('') }),
    template: `
      <Input v-model="value" label="Price range" placeholder="100">
        <template #prefix>$</template>
        <template #suffix>USD</template>
      </Input>
    `,
  }),
}
