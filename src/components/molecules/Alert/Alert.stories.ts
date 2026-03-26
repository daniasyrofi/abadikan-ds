import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { RiShieldCheckLine } from '@remixicon/vue'
import Alert from './Alert.vue'

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    title:       { control: 'text' },
    icon:        { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
  args: {
    variant:     'info',
    size:        'md',
    title:       'Informational alert',
    icon:        true,
    dismissible: false,
  },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: `
      <div style="max-width:480px">
        <Alert v-bind="args">
          This is the description text giving extra context to the user.
        </Alert>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="flex flex-col gap-3" style="max-width:480px">
        <Alert variant="info" title="Information">
          Your account settings have been saved successfully.
        </Alert>
        <Alert variant="success" title="Success">
          Your changes have been published.
        </Alert>
        <Alert variant="warning" title="Warning">
          Your subscription expires in 3 days. Please renew to avoid interruption.
        </Alert>
        <Alert variant="danger" title="Error">
          Failed to save changes. Please try again.
        </Alert>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="flex flex-col gap-3" style="max-width:480px">
        <Alert variant="info" size="sm" title="Small Alert">
          A compact alert for tight spaces.
        </Alert>
        <Alert variant="info" size="md" title="Medium Alert">
          The default medium-sized alert.
        </Alert>
        <Alert variant="info" size="lg" title="Large Alert">
          A larger alert for prominent messages.
        </Alert>
      </div>
    `,
  }),
}

export const Dismissible: Story = {
  render: () => ({
    components: { Alert },
    setup() {
      const show = ref(true)
      return { show }
    },
    template: `
      <div style="max-width:480px">
        <Alert
          v-if="show"
          variant="warning"
          title="Dismissible Alert"
          dismissible
          @dismiss="show = false"
        >
          Click the × button to dismiss this alert.
        </Alert>
        <button
          v-else
          @click="show = true"
          class="text-sm text-[--color-primary] underline"
        >
          Show alert again
        </button>
      </div>
    `,
  }),
}

export const DismissibleAllVariants: Story = {
  name: 'Dismissible — All Variants',
  render: () => ({
    components: { Alert },
    setup() {
      const visible = ref({ info: true, success: true, warning: true, danger: true })
      return { visible }
    },
    template: `
      <div class="flex flex-col gap-3" style="max-width:480px">
        <Alert
          v-if="visible.info"
          variant="info"
          title="Info"
          dismissible
          @dismiss="visible.info = false"
        >
          Informational message here.
        </Alert>
        <Alert
          v-if="visible.success"
          variant="success"
          title="Success"
          dismissible
          @dismiss="visible.success = false"
        >
          Operation completed successfully.
        </Alert>
        <Alert
          v-if="visible.warning"
          variant="warning"
          title="Warning"
          dismissible
          @dismiss="visible.warning = false"
        >
          Please review before continuing.
        </Alert>
        <Alert
          v-if="visible.danger"
          variant="danger"
          title="Error"
          dismissible
          @dismiss="visible.danger = false"
        >
          An error occurred. Please try again.
        </Alert>
        <button
          @click="visible = { info: true, success: true, warning: true, danger: true }"
          class="text-sm text-[--color-primary] underline mt-2"
        >
          Reset all
        </button>
      </div>
    `,
  }),
}

export const WithoutTitle: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="flex flex-col gap-3" style="max-width:480px">
        <Alert variant="info">Your session will expire in 10 minutes.</Alert>
        <Alert variant="success">Profile updated successfully.</Alert>
        <Alert variant="warning">Unsaved changes will be lost.</Alert>
        <Alert variant="danger">Invalid email address.</Alert>
      </div>
    `,
  }),
}

export const WithoutIcon: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="flex flex-col gap-3" style="max-width:480px">
        <Alert variant="info" title="No icon" :icon="false">
          This alert has no icon, just text content.
        </Alert>
        <Alert variant="danger" title="Error without icon" :icon="false">
          Something went wrong while processing your request.
        </Alert>
      </div>
    `,
  }),
}

export const WithCustomIcon: Story = {
  render: () => ({
    components: { Alert, RiShieldCheckLine },
    template: `
      <div style="max-width:480px">
        <Alert variant="success" title="Verified">
          <template #icon>
            <RiShieldCheckLine :size="18" />
          </template>
          Your identity has been verified successfully.
        </Alert>
      </div>
    `,
  }),
}

export const WithAction: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="flex flex-col gap-3" style="max-width:480px">
        <Alert variant="warning" title="Subscription expiring">
          Your free trial ends in 2 days. Upgrade to keep access.
          <template #action>
            <button class="text-xs font-semibold text-[--color-warning] underline underline-offset-2 cursor-pointer">
              Upgrade now
            </button>
            <button class="text-xs text-[--color-text-secondary] cursor-pointer">
              Remind me later
            </button>
          </template>
        </Alert>
        <Alert variant="danger" title="Action required" dismissible>
          Please verify your email address to continue.
          <template #action>
            <button class="text-xs font-semibold text-[--color-danger] underline underline-offset-2 cursor-pointer">
              Resend verification email
            </button>
          </template>
        </Alert>
      </div>
    `,
  }),
}
