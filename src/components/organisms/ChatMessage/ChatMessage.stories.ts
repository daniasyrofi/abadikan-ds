import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ChatMessage from './ChatMessage.vue'

const meta: Meta<typeof ChatMessage> = {
  title: 'Organisms/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  argTypes: {
    role:     { control: 'select', options: ['user', 'assistant'] },
    status:   { control: 'select', options: ['sending', 'sent', 'error'] },
    isTyping: { control: 'boolean' },
    actions:  { control: 'boolean' },
  },
  args: {
    status:   'sent',
    isTyping: false,
    actions:  false,
    timestamp: new Date(),
  },
  decorators: [
    () => ({
      template: '<div class="max-w-xl mx-auto p-6"><story /></div>',
    }),
  ],
}
export default meta
type Story = StoryObj<typeof ChatMessage>

export const UserMessage: Story = {
  args: {
    role: 'user',
    content: 'Hey, can you help me with a Vue component?',
    timestamp: new Date(),
    userName: 'Sarah Chen',
  },
}

export const AssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: 'Of course! I\'d be happy to help you with a Vue component. What are you trying to build?',
    timestamp: new Date(),
    userName: 'Assistant',
  },
}

export const WithAvatar: Story = {
  render: () => ({
    components: { ChatMessage },
    setup: () => ({ now: new Date() }),
    template: `
      <div class="flex flex-col gap-4">
        <ChatMessage
          role="user"
          content="Hello! I have a question about design systems."
          :timestamp="now"
          avatar="https://i.pravatar.cc/150?img=5"
          userName="Sarah Chen"
        />
        <ChatMessage
          role="assistant"
          content="Hi Sarah! I'd be happy to help with your design system question. What would you like to know?"
          :timestamp="now"
          avatar="https://i.pravatar.cc/150?img=68"
          userName="Assistant"
        />
      </div>
    `,
  }),
}

export const Typing: Story = {
  args: {
    role: 'assistant',
    content: '',
    timestamp: new Date(),
    isTyping: true,
    userName: 'Assistant',
  },
}

export const ErrorState: Story = {
  args: {
    role: 'user',
    content: 'This message failed to send.',
    timestamp: new Date(),
    status: 'error',
    userName: 'Sarah Chen',
  },
}

export const WithActions: Story = {
  render: () => ({
    components: { ChatMessage },
    setup: () => ({ now: new Date() }),
    template: `
      <div class="flex flex-col gap-4">
        <ChatMessage
          role="user"
          content="Can you write me a function that sorts an array?"
          :timestamp="now"
          userName="Sarah Chen"
          :actions="true"
        />
        <ChatMessage
          role="assistant"
          content="Sure! Here's a simple sort function:\n\nfunction sortArray(arr) {\n  return [...arr].sort((a, b) => a - b);\n}\n\nThis creates a new sorted array without mutating the original."
          :timestamp="now"
          userName="Assistant"
          :actions="true"
        />
      </div>
    `,
  }),
}
