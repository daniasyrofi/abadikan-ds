import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import {
  RiSearchLine, RiMailLine, RiLockLine, RiUser3Line,
  RiGlobeLine, RiPhoneLine, RiCalendarLine, RiMapPinLine,
  RiHashtag,
} from '@remixicon/vue'
import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    modelValue:  { control: 'text' },
    type:        { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    size:        { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    error:       { control: 'text' },
    disabled:    { control: 'boolean' },
    readonly:    { control: 'boolean' },
    required:    { control: 'boolean' },
    clearable:   { control: 'boolean' },
    counter:     { control: 'boolean' },
    maxlength:   { control: 'number' },
  },
  args: {
    modelValue: '',
    type: 'text',
    size: 'md',
  },
  decorators: [
    () => ({ template: '<div style="width: 340px;"><story /></div>' }),
  ],
}
export default meta
type Story = StoryObj<typeof Input>

// ── Default (playground) ────────────────────────────────────

export const Default: Story = {
  render: (args: any) => ({
    components: { Input },
    setup() {
      const val = ref(args.modelValue ?? '')
      watch(() => args.modelValue, (v) => { val.value = v ?? '' })
      return { args, val }
    },
    template: '<Input v-bind="args" v-model="val" label="Label" placeholder="Placeholder..." />',
  }),
}

// ── States ──────────────────────────────────────────────────

export const Filled: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('Jane Doe') }),
    template: '<Input v-model="val" label="Full name" />',
  }),
}

export const WithHelper: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('') }),
    template: `
      <Input v-model="val" label="Email" placeholder="you@example.com" type="email"
        helper-text="We'll never share your email." />
    `,
  }),
}

export const Error: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('not-valid') }),
    template: `
      <Input v-model="val" label="Email" type="email"
        error="Please enter a valid email address." />
    `,
  }),
}

export const Required: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('') }),
    template: '<Input v-model="val" label="Full name" placeholder="John Doe" required />',
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('Cannot edit this') }),
    template: '<Input v-model="val" label="Disabled" disabled />',
  }),
}

export const ReadOnly: Story = {
  name: 'Read-only',
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('sk_live_abc123xyz789') }),
    template: '<Input v-model="val" label="API key" readonly helper-text="Read-only." />',
  }),
}

// ── Sizes ───────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ sm: ref(''), md: ref(''), lg: ref('') }),
    template: `
      <div class="flex flex-col gap-4">
        <Input v-model="sm" size="sm" label="Small" placeholder="Small" />
        <Input v-model="md" size="md" label="Medium" placeholder="Medium" />
        <Input v-model="lg" size="lg" label="Large" placeholder="Large" />
      </div>
    `,
  }),
}

// ── Icons ───────────────────────────────────────────────────

export const LeadingIcon: Story = {
  render: () => ({
    components: { Input, RiSearchLine },
    setup: () => ({ val: ref('') }),
    template: `
      <Input v-model="val" label="Search" placeholder="Search...">
        <template #leading><RiSearchLine class="size-4" /></template>
      </Input>
    `,
  }),
}

export const TrailingIcon: Story = {
  render: () => ({
    components: { Input, RiCalendarLine },
    setup: () => ({ val: ref('') }),
    template: `
      <Input v-model="val" label="Date" placeholder="Pick a date">
        <template #trailing><RiCalendarLine class="size-4" /></template>
      </Input>
    `,
  }),
}

// ── Prefix & Suffix ─────────────────────────────────────────

export const Prefix: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('') }),
    template: `
      <Input v-model="val" label="Website" placeholder="yoursite">
        <template #prefix>https://</template>
      </Input>
    `,
  }),
}

export const Suffix: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('') }),
    template: `
      <Input v-model="val" label="Domain" placeholder="yoursite">
        <template #suffix>.com</template>
      </Input>
    `,
  }),
}

export const PrefixAndSuffix: Story = {
  name: 'Prefix + Suffix',
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('') }),
    template: `
      <Input v-model="val" label="Price" placeholder="0.00" type="number">
        <template #prefix>$</template>
        <template #suffix>USD</template>
      </Input>
    `,
  }),
}

// ── Features ────────────────────────────────────────────────

export const Clearable: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('Clear me') }),
    template: '<Input v-model="val" label="Search" placeholder="Type..." clearable />',
  }),
}

export const Password: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('supersecret') }),
    template: `
      <Input v-model="val" label="Password" type="password" placeholder="Enter password"
        helper-text="At least 8 characters." />
    `,
  }),
}

export const Counter: Story = {
  render: () => ({
    components: { Input },
    setup: () => ({ val: ref('') }),
    template: `
      <Input v-model="val" label="Display name" placeholder="Your name"
        :maxlength="30" counter helper-text="Shown publicly." />
    `,
  }),
}

// ── Form Example ────────────────────────────────────────────

export const FormExample: Story = {
  name: 'Form Example',
  decorators: [
    () => ({ template: '<div style="width: 380px;"><story /></div>' }),
  ],
  render: () => ({
    components: { Input, RiUser3Line, RiMailLine, RiLockLine, RiPhoneLine },
    setup: () => ({
      name: ref(''),
      email: ref(''),
      password: ref(''),
      phone: ref(''),
      website: ref(''),
      price: ref(''),
      bio: ref(''),
    }),
    template: `
      <div class="flex flex-col gap-4">
        <Input v-model="name" label="Full name" placeholder="John Doe" required>
          <template #leading><RiUser3Line class="size-4" /></template>
        </Input>

        <Input v-model="email" label="Email" placeholder="you@example.com" type="email" required>
          <template #leading><RiMailLine class="size-4" /></template>
        </Input>

        <Input v-model="password" label="Password" type="password" placeholder="At least 8 characters" required>
          <template #leading><RiLockLine class="size-4" /></template>
        </Input>

        <Input v-model="phone" label="Phone" type="tel" placeholder="+62 812 345 6789">
          <template #leading><RiPhoneLine class="size-4" /></template>
        </Input>

        <Input v-model="website" label="Website" placeholder="yoursite">
          <template #prefix>https://</template>
          <template #suffix>.com</template>
        </Input>

        <Input v-model="price" label="Budget" placeholder="0.00" type="number">
          <template #prefix>$</template>
          <template #suffix>USD</template>
        </Input>

        <Input v-model="bio" label="Bio" placeholder="About yourself" :maxlength="120" counter clearable />
      </div>
    `,
  }),
}
