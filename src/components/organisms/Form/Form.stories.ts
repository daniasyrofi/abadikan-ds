import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Form from './Form.vue'
import Input from '../../atoms/Input/Input.vue'
import Button from '../../atoms/Button/Button.vue'
import Select from '../../molecules/Select/Select.vue'
import Textarea from '../../atoms/Textarea/Textarea.vue'

const meta: Meta<typeof Form> = {
  title: 'Organisms/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['stack', 'grid', 'inline'] },
    gap:    { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    layout: 'stack',
    gap:    'md',
  },
}
export default meta
type Story = StoryObj<typeof Form>

export const StackLayout: Story = {
  render: () => ({
    components: { Form, Input, Select, Textarea, Button },
    setup: () => {
      const name    = ref('')
      const email   = ref('')
      const role    = ref('')
      const message = ref('')
      const roleOptions = [
        { label: 'Guest',       value: 'guest' },
        { label: 'VIP',         value: 'vip' },
        { label: 'Speaker',     value: 'speaker' },
        { label: 'Organizer',   value: 'organizer' },
      ]
      return { name, email, role, message, roleOptions }
    },
    template: `
      <div class="max-w-md">
        <Form layout="stack" gap="md" @submit.prevent>
          <Input v-model="name" label="Full Name" placeholder="Enter your name" required />
          <Input v-model="email" label="Email" type="email" placeholder="you@example.com" required />
          <Select v-model="role" :options="roleOptions" label="Role" placeholder="Select a role" />
          <Textarea v-model="message" label="Message" placeholder="Any special requests?" :rows="3" />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    `,
  }),
}

export const GridLayout: Story = {
  render: () => ({
    components: { Form, Input, Select, Button },
    setup: () => {
      const firstName = ref('')
      const lastName  = ref('')
      const email     = ref('')
      const phone     = ref('')
      const company   = ref('')
      const title     = ref('')
      const country   = ref('')
      const countryOptions = [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada',         value: 'ca' },
        { label: 'Australia',      value: 'au' },
        { label: 'Germany',        value: 'de' },
      ]
      return { firstName, lastName, email, phone, company, title, country, countryOptions }
    },
    template: `
      <div class="max-w-2xl">
        <Form layout="grid" gap="md" @submit.prevent>
          <Input v-model="firstName" label="First Name" placeholder="Jane" required />
          <Input v-model="lastName" label="Last Name" placeholder="Doe" required />
          <Input v-model="email" label="Email" type="email" placeholder="jane@example.com" required />
          <Input v-model="phone" label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
          <Input v-model="company" label="Company" placeholder="Acme Inc." />
          <Input v-model="title" label="Job Title" placeholder="Product Designer" />
          <Select v-model="country" :options="countryOptions" label="Country" placeholder="Select country" />
          <div class="md:col-span-2 flex justify-end">
            <Button type="submit">Register</Button>
          </div>
        </Form>
      </div>
    `,
  }),
}

export const InlineLayout: Story = {
  name: 'Inline Layout (Search Filter)',
  render: () => ({
    components: { Form, Input, Select, Button },
    setup: () => {
      const query  = ref('')
      const status = ref('')
      const statusOptions = [
        { label: 'All',      value: '' },
        { label: 'Active',   value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending',  value: 'pending' },
      ]
      return { query, status, statusOptions }
    },
    template: `
      <Form layout="inline" gap="sm" @submit.prevent>
        <div class="w-64">
          <Input v-model="query" placeholder="Search guests..." type="search" />
        </div>
        <div class="w-48">
          <Select v-model="status" :options="statusOptions" placeholder="Status" />
        </div>
        <Button type="submit" variant="secondary">Filter</Button>
      </Form>
    `,
  }),
}

export const WithValidation: Story = {
  render: () => ({
    components: { Form, Input, Select, Textarea, Button },
    setup: () => {
      const name    = ref('')
      const email   = ref('invalid-email')
      const role    = ref('')
      const message = ref('')
      const roleOptions = [
        { label: 'Guest',     value: 'guest' },
        { label: 'VIP',       value: 'vip' },
        { label: 'Speaker',   value: 'speaker' },
      ]
      return { name, email, role, message, roleOptions }
    },
    template: `
      <div class="max-w-md">
        <Form layout="stack" gap="md" @submit.prevent>
          <Input v-model="name" label="Full Name" placeholder="Enter your name" required error="Name is required" />
          <Input v-model="email" label="Email" type="email" placeholder="you@example.com" required error="Please enter a valid email address" />
          <Select v-model="role" :options="roleOptions" label="Role" placeholder="Select a role" error="Please select a role" />
          <Textarea v-model="message" label="Message" placeholder="Any special requests?" :rows="3" />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    `,
  }),
}
