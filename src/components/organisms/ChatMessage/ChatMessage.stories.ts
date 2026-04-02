import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import ChatMessage from './ChatMessage.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type LocaleText = {
  userName: string
  assistantName: string
  userMessage: string
  assistantMessage: string
  avatarUserMessage: string
  avatarAssistantMessage: string
  typingLabel: string
  errorMessage: string
  actionsUserMessage: string
  actionsAssistantMessage: string
  storyNames: {
    userMessage: string
    assistantMessage: string
    withAvatar: string
    typing: string
    errorState: string
    withActions: string
  }
}

const localeText: Record<Locale, LocaleText> = {
  en: {
    userName: 'User',
    assistantName: 'Assistant',
    userMessage: 'Hey, can you help me with a Vue component?',
    assistantMessage:
      "Of course! I'd be happy to help you with a Vue component. What are you trying to build?",
    avatarUserMessage: 'Hello! I have a question about design systems.',
    avatarAssistantMessage:
      "Hi! I'd be happy to help with your design system question. What would you like to know?",
    typingLabel: 'Typing...',
    errorMessage: 'This message failed to send.',
    actionsUserMessage: 'Can you write me a function that sorts an array?',
    actionsAssistantMessage:
      "Sure! Here's a simple sort function:\n\nfunction sortArray(arr) {\n  return [...arr].sort((a, b) => a - b);\n}\n\nThis creates a new sorted array without mutating the original.",
    storyNames: {
      userMessage: 'User Message',
      assistantMessage: 'Assistant Message',
      withAvatar: 'With Avatar',
      typing: 'Typing',
      errorState: 'Error State',
      withActions: 'With Actions',
    },
  },
  id: {
    userName: 'Pengguna',
    assistantName: 'Asisten',
    userMessage: 'Hei, bisa bantu saya dengan komponen Vue?',
    assistantMessage:
      'Tentu! Saya senang membantu Anda dengan komponen Vue. Apa yang ingin Anda bangun?',
    avatarUserMessage: 'Halo! Saya punya pertanyaan tentang design system.',
    avatarAssistantMessage:
      'Hai! Saya senang membantu pertanyaan design system Anda. Apa yang ingin Anda ketahui?',
    typingLabel: 'Mengetik...',
    errorMessage: 'Pesan ini gagal dikirim.',
    actionsUserMessage: 'Bisakah kamu menulis fungsi untuk mengurutkan array?',
    actionsAssistantMessage:
      'Tentu! Berikut fungsi pengurutan sederhana:\n\nfunction sortArray(arr) {\n  return [...arr].sort((a, b) => a - b);\n}\n\nIni membuat array baru yang terurut tanpa mengubah array aslinya.',
    storyNames: {
      userMessage: 'Pesan Pengguna',
      assistantMessage: 'Pesan Asisten',
      withAvatar: 'Dengan Avatar',
      typing: 'Sedang Mengetik',
      errorState: 'Status Galat',
      withActions: 'Dengan Aksi',
    },
  },
  zh: {
    userName: '用户',
    assistantName: '助手',
    userMessage: '嘿，你能帮我处理一个 Vue 组件吗？',
    assistantMessage: '当然！我很乐意帮你处理 Vue 组件。你想构建什么？',
    avatarUserMessage: '你好！我有一个关于设计系统的问题。',
    avatarAssistantMessage: '你好！我很乐意帮助你解决设计系统问题。你想了解什么？',
    typingLabel: '正在输入...',
    errorMessage: '此消息发送失败。',
    actionsUserMessage: '你能帮我写一个排序数组的函数吗？',
    actionsAssistantMessage:
      '当然！这是一个简单的排序函数：\n\nfunction sortArray(arr) {\n  return [...arr].sort((a, b) => a - b);\n}\n\n这会在不修改原数组的情况下创建一个新的有序数组。',
    storyNames: {
      userMessage: '用户消息',
      assistantMessage: '助手消息',
      withAvatar: '带头像',
      typing: '输入中',
      errorState: '错误状态',
      withActions: '带操作',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => localeText[getLocale()])
const getStoryName = (key: keyof LocaleText['storyNames']) =>
  localeText[getLocale()].storyNames[key]

const meta: Meta<typeof ChatMessage> = {
  title: 'Organisms/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  argTypes: {
    role: { control: 'select', options: ['user', 'assistant'] },
    status: { control: 'select', options: ['sending', 'sent', 'error'] },
    isTyping: { control: 'boolean' },
    actions: { control: 'boolean' },
  },
  args: {
    status: 'sent',
    isTyping: false,
    actions: false,
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
  get name() {
    return getStoryName('userMessage')
  },
  args: {
    role: 'user',
  },
  render: (args) => ({
    components: { ChatMessage },
    setup: () => {
      const copy = useCopy()
      return { args, copy, now: new Date() }
    },
    template: `
      <ChatMessage
        v-bind="args"
        :content="copy.userMessage"
        :timestamp="now"
        :user-name="copy.userName"
      />
    `,
  }),
}

export const AssistantMessage: Story = {
  get name() {
    return getStoryName('assistantMessage')
  },
  args: {
    role: 'assistant',
  },
  render: (args) => ({
    components: { ChatMessage },
    setup: () => {
      const copy = useCopy()
      return { args, copy, now: new Date() }
    },
    template: `
      <ChatMessage
        v-bind="args"
        :content="copy.assistantMessage"
        :timestamp="now"
        :user-name="copy.assistantName"
      />
    `,
  }),
}

export const WithAvatar: Story = {
  get name() {
    return getStoryName('withAvatar')
  },
  render: () => ({
    components: { ChatMessage },
    setup: () => {
      const copy = useCopy()
      return { copy, now: new Date() }
    },
    template: `
      <div class="flex flex-col gap-4">
        <ChatMessage
          role="user"
          :content="copy.avatarUserMessage"
          :timestamp="now"
          avatar="https://i.pravatar.cc/150?img=5"
          :user-name="copy.userName"
        />
        <ChatMessage
          role="assistant"
          :content="copy.avatarAssistantMessage"
          :timestamp="now"
          avatar="https://i.pravatar.cc/150?img=68"
          :user-name="copy.assistantName"
        />
      </div>
    `,
  }),
}

export const Typing: Story = {
  get name() {
    return getStoryName('typing')
  },
  args: {
    role: 'assistant',
    isTyping: true,
  },
  render: (args) => ({
    components: { ChatMessage },
    setup: () => {
      const copy = useCopy()
      return { args, copy, now: new Date() }
    },
    template: `
      <ChatMessage
        v-bind="args"
        :content="copy.typingLabel"
        :timestamp="now"
        :user-name="copy.assistantName"
      />
    `,
  }),
}

export const ErrorState: Story = {
  get name() {
    return getStoryName('errorState')
  },
  args: {
    role: 'user',
    status: 'error',
  },
  render: (args) => ({
    components: { ChatMessage },
    setup: () => {
      const copy = useCopy()
      return { args, copy, now: new Date() }
    },
    template: `
      <ChatMessage
        v-bind="args"
        :content="copy.errorMessage"
        :timestamp="now"
        :user-name="copy.userName"
      />
    `,
  }),
}

export const WithActions: Story = {
  get name() {
    return getStoryName('withActions')
  },
  render: () => ({
    components: { ChatMessage },
    setup: () => {
      const copy = useCopy()
      return { copy, now: new Date() }
    },
    template: `
      <div class="flex flex-col gap-4">
        <ChatMessage
          role="user"
          :content="copy.actionsUserMessage"
          :timestamp="now"
          :user-name="copy.userName"
          :actions="true"
        />
        <ChatMessage
          role="assistant"
          :content="copy.actionsAssistantMessage"
          :timestamp="now"
          :user-name="copy.assistantName"
          :actions="true"
        />
      </div>
    `,
  }),
}
