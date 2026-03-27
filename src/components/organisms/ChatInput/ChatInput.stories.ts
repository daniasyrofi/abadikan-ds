import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { RiAttachmentLine, RiEmotionLine } from '@remixicon/vue'
import ChatInput from './ChatInput.vue'

const meta: Meta<typeof ChatInput> = {
  title: 'Organisms/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled:    { control: 'boolean' },
    maxRows:     { control: 'number' },
    loading:     { control: 'boolean' },
  },
  args: {
    placeholder: 'Type a message...',
    disabled: false,
    maxRows: 5,
    loading: false,
  },
  decorators: [
    () => ({
      template: '<div class="max-w-xl mx-auto p-6"><story /></div>',
    }),
  ],
}
export default meta
type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  render: (args) => ({
    components: { ChatInput },
    setup() {
      const value = ref('')
      const onSubmit = (msg: string) => {
        alert(`Submitted: ${msg}`)
        value.value = ''
      }
      return { args, value, onSubmit }
    },
    template: `
      <ChatInput
        v-bind="args"
        v-model="value"
        @submit="onSubmit"
      />
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { ChatInput },
    setup() {
      const value = ref('Generating response...')
      return { value }
    },
    template: `
      <ChatInput
        v-model="value"
        :loading="true"
        placeholder="Type a message..."
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { ChatInput },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <ChatInput
        v-model="value"
        :disabled="true"
        placeholder="Chat is disabled..."
      />
    `,
  }),
}

export const WithCustomActions: Story = {
  render: () => ({
    components: { ChatInput, RiAttachmentLine, RiEmotionLine },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <ChatInput v-model="value" placeholder="Type a message...">
        <template #actions-start>
          <button
            type="button"
            class="flex items-center justify-center size-8 rounded-[--radius-md] text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light] transition-colors duration-[--duration-fast] cursor-pointer"
            aria-label="Attach file"
          >
            <RiAttachmentLine :size="18" />
          </button>
          <button
            type="button"
            class="flex items-center justify-center size-8 rounded-[--radius-md] text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light] transition-colors duration-[--duration-fast] cursor-pointer"
            aria-label="Add emoji"
          >
            <RiEmotionLine :size="18" />
          </button>
        </template>
      </ChatInput>
    `,
  }),
}
