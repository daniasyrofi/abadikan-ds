import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Toast from './Toast.vue'
import ToastContainer from './ToastContainer.vue'
import { useToast } from './useToast'

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title:       { control: 'text' },
    description: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    id:          'toast-preview',
    variant:     'info',
    title:       'Toast title',
    description: 'This is a toast description with extra context.',
    dismissible: true,
  },
}
export default meta
type Story = StoryObj<typeof Toast>

export const AllVariants: Story = {
  render: () => ({
    components: { Toast },
    setup() {
      const dismissed = ref<Record<string, boolean>>({})
      function onDismiss(id: string) { dismissed.value[id] = true }
      return { dismissed, onDismiss }
    },
    template: `
      <div class="flex flex-col gap-3" style="max-width:360px">
        <Toast
          v-if="!dismissed['t-info']"
          id="t-info"
          variant="info"
          title="Information"
          description="Your account settings have been updated."
          @dismiss="onDismiss"
        />
        <Toast
          v-if="!dismissed['t-success']"
          id="t-success"
          variant="success"
          title="Success"
          description="Your changes have been saved successfully."
          @dismiss="onDismiss"
        />
        <Toast
          v-if="!dismissed['t-warning']"
          id="t-warning"
          variant="warning"
          title="Warning"
          description="Your subscription expires in 3 days."
          @dismiss="onDismiss"
        />
        <Toast
          v-if="!dismissed['t-danger']"
          id="t-danger"
          variant="danger"
          title="Error"
          description="Failed to save changes. Please try again."
          @dismiss="onDismiss"
        />
      </div>
    `,
  }),
}

export const WithAction: Story = {
  render: () => ({
    components: { Toast },
    template: `
      <div style="max-width:360px">
        <Toast
          id="t-action"
          variant="warning"
          title="Subscription expiring"
          description="Your free trial ends in 2 days."
        >
          <template #action>
            <button class="text-xs font-semibold underline underline-offset-2 cursor-pointer">
              Upgrade now
            </button>
            <button class="text-xs opacity-70 cursor-pointer">
              Dismiss
            </button>
          </template>
        </Toast>
      </div>
    `,
  }),
}

export const AutoDismiss: Story = {
  render: () => ({
    components: { ToastContainer },
    setup() {
      const { success, error, info, warning, dismissAll } = useToast()
      return { success, error, info, warning, dismissAll }
    },
    template: `
      <div>
        <div class="flex flex-wrap gap-2">
          <button
            class="px-3 py-1.5 text-sm rounded-[--radius-md] bg-[--color-info] text-white cursor-pointer"
            @click="info('Info toast', 'This will auto-dismiss in 5 seconds.')"
          >
            Show Info
          </button>
          <button
            class="px-3 py-1.5 text-sm rounded-[--radius-md] bg-[--color-success] text-white cursor-pointer"
            @click="success('Success toast', 'Operation completed successfully.')"
          >
            Show Success
          </button>
          <button
            class="px-3 py-1.5 text-sm rounded-[--radius-md] bg-[--color-warning] text-white cursor-pointer"
            @click="warning('Warning toast', 'Please review before continuing.')"
          >
            Show Warning
          </button>
          <button
            class="px-3 py-1.5 text-sm rounded-[--radius-md] bg-[--color-danger] text-white cursor-pointer"
            @click="error('Error toast', 'Something went wrong.')"
          >
            Show Error
          </button>
          <button
            class="px-3 py-1.5 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer"
            @click="dismissAll()"
          >
            Dismiss All
          </button>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
}

export const Persistent: Story = {
  render: () => ({
    components: { ToastContainer },
    setup() {
      const { toast, dismissAll } = useToast()
      function showPersistent() {
        toast({
          title: 'Persistent toast',
          description: 'This toast will not auto-dismiss. Click the X to close it.',
          variant: 'danger',
          duration: 0,
          dismissible: true,
        })
      }
      return { showPersistent, dismissAll }
    },
    template: `
      <div>
        <div class="flex gap-2">
          <button
            class="px-3 py-1.5 text-sm rounded-[--radius-md] bg-[--color-danger] text-white cursor-pointer"
            @click="showPersistent()"
          >
            Show Persistent Toast
          </button>
          <button
            class="px-3 py-1.5 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] cursor-pointer"
            @click="dismissAll()"
          >
            Dismiss All
          </button>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
}
