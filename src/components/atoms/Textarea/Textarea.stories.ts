import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref, watch } from 'vue'
import Textarea from './Textarea.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    states: string
    allSizes: string
    withHelperText: string
    withCounter: string
    autoResize: string
    fixedHeight: string
    feedbackForm: string
  }
  sizeLabels: Record<'sm' | 'md' | 'lg', string>
  labels: {
    message: string
    writeMessage: string
    normal: string
    filled: string
    error: string
    disabled: string
    readOnly: string
    errorValue: string
    disabledValue: string
    typeSomething: string
    filledContent: string
    filledContentReadonly: string
    messageTooShort: string
    cannotBeModified: string
    smallLabel: string
    mediumLabel: string
    largeLabel: string
    smallTextarea: string
    mediumTextarea: string
    largeTextarea: string
    description: string
    describeProject: string
    beDetailed: string
    bio: string
    tweet: string
    tellUsAboutYourself: string
    whatIsHappening: string
    autoResize: string
    typeMoreToGrow: string
    heightExpandsAutomatically: string
    fixedHeightScroll: string
    typeALot: string
    fixedHeightScrollsInternally: string
    subject: string
    briefIssue: string
    body: string
    whatHappened: string
    stepsToReproduce: string
    optionalHelpful: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      states: 'States',
      allSizes: 'All Sizes',
      withHelperText: 'With Helper Text',
      withCounter: 'With Counter',
      autoResize: 'Auto Resize',
      fixedHeight: 'Fixed Height',
      feedbackForm: 'Feedback Form',
    },
    sizeLabels: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
    labels: {
      message: 'Message',
      writeMessage: 'Write your message here...',
      normal: 'Normal',
      filled: 'Filled',
      error: 'Error',
      disabled: 'Disabled',
      readOnly: 'Read-only',
      errorValue: 'This is too short.',
      disabledValue: 'This cannot be edited.',
      typeSomething: 'Type something...',
      filledContent: 'This textarea already has some content in it, demonstrating a filled state.',
      filledContentReadonly: 'This is a read-only field that displays existing content.',
      messageTooShort: 'Message must be at least 50 characters.',
      cannotBeModified: 'Cannot be modified.',
      smallLabel: 'Small (sm)',
      mediumLabel: 'Medium (md)',
      largeLabel: 'Large (lg)',
      smallTextarea: 'Small textarea',
      mediumTextarea: 'Medium textarea',
      largeTextarea: 'Large textarea',
      description: 'Description',
      describeProject: 'Describe your project...',
      beDetailed: 'Be as detailed as possible. This will be shown to all collaborators.',
      bio: 'Bio',
      tweet: 'Tweet',
      tellUsAboutYourself: 'Tell us about yourself...',
      whatIsHappening: "What's happening?",
      autoResize: 'Auto Resize',
      typeMoreToGrow: 'Type more to watch it grow...',
      heightExpandsAutomatically: 'Height expands automatically as you type.',
      fixedHeightScroll: 'Fixed Height (scroll)',
      typeALot: 'Type a lot...',
      fixedHeightScrollsInternally: 'Fixed height - scrolls internally.',
      subject: 'Subject',
      briefIssue: 'Briefly describe the issue',
      body: 'Description',
      whatHappened: 'What happened?',
      stepsToReproduce: 'Steps to reproduce',
      optionalHelpful: 'Optional but very helpful.',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      states: 'Status',
      allSizes: 'Semua Ukuran',
      withHelperText: 'Dengan Teks Bantuan',
      withCounter: 'Dengan Penghitung',
      autoResize: 'Ukuran Otomatis',
      fixedHeight: 'Tinggi Tetap',
      feedbackForm: 'Formulir Masukan',
    },
    sizeLabels: {
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
    },
    labels: {
      message: 'Pesan',
      writeMessage: 'Tulis pesan Anda di sini...',
      normal: 'Normal',
      filled: 'Terisi',
      error: 'Galat',
      disabled: 'Dinonaktifkan',
      readOnly: 'Hanya baca',
      errorValue: 'Ini terlalu pendek.',
      disabledValue: 'Ini tidak dapat diedit.',
      typeSomething: 'Ketik sesuatu...',
      filledContent: 'Textarea ini sudah memiliki beberapa konten, menunjukkan status terisi.',
      filledContentReadonly: 'Ini adalah bidang hanya baca yang menampilkan konten yang ada.',
      messageTooShort: 'Pesan harus minimal 50 karakter.',
      cannotBeModified: 'Tidak dapat diubah.',
      smallLabel: 'Kecil (sm)',
      mediumLabel: 'Sedang (md)',
      largeLabel: 'Besar (lg)',
      smallTextarea: 'Textarea kecil',
      mediumTextarea: 'Textarea sedang',
      largeTextarea: 'Textarea besar',
      description: 'Deskripsi',
      describeProject: 'Jelaskan proyek Anda...',
      beDetailed: 'Sebisa mungkin jelaskan secara detail. Ini akan ditampilkan kepada semua kolaborator.',
      bio: 'Bio',
      tweet: 'Tweet',
      tellUsAboutYourself: 'Ceritakan tentang diri Anda...',
      whatIsHappening: 'Apa yang sedang terjadi?',
      autoResize: 'Ukuran Otomatis',
      typeMoreToGrow: 'Ketik lebih banyak untuk melihatnya membesar...',
      heightExpandsAutomatically: 'Tinggi akan bertambah otomatis saat Anda mengetik.',
      fixedHeightScroll: 'Tinggi Tetap (gulir)',
      typeALot: 'Ketik banyak...',
      fixedHeightScrollsInternally: 'Tinggi tetap - menggulir di dalam.',
      subject: 'Subjek',
      briefIssue: 'Jelaskan masalah secara singkat',
      body: 'Deskripsi',
      whatHappened: 'Apa yang terjadi?',
      stepsToReproduce: 'Langkah untuk mereproduksi',
      optionalHelpful: 'Opsional tetapi sangat membantu.',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      states: '状态',
      allSizes: '全部尺寸',
      withHelperText: '带帮助文本',
      withCounter: '带计数器',
      autoResize: '自动调整大小',
      fixedHeight: '固定高度',
      feedbackForm: '反馈表单',
    },
    sizeLabels: {
      sm: '小',
      md: '中',
      lg: '大',
    },
    labels: {
      message: '消息',
      writeMessage: '在此输入你的消息...',
      normal: '正常',
      filled: '已填充',
      error: '错误',
      disabled: '禁用',
      readOnly: '只读',
      errorValue: '这太短了。',
      disabledValue: '此内容无法编辑。',
      typeSomething: '输入一些内容...',
      filledContent: '这个文本框已经有一些内容，展示已填充状态。',
      filledContentReadonly: '这是一个显示现有内容的只读字段。',
      messageTooShort: '消息长度必须至少为 50 个字符。',
      cannotBeModified: '无法修改。',
      smallLabel: '小 (sm)',
      mediumLabel: '中 (md)',
      largeLabel: '大 (lg)',
      smallTextarea: '小文本框',
      mediumTextarea: '中等文本框',
      largeTextarea: '大文本框',
      description: '描述',
      describeProject: '描述你的项目...',
      beDetailed: '请尽可能详细说明。这将显示给所有协作者。',
      bio: '简介',
      tweet: '推文',
      tellUsAboutYourself: '介绍一下你自己...',
      whatIsHappening: '发生了什么？',
      autoResize: '自动调整大小',
      typeMoreToGrow: '输入更多内容以观察它增高...',
      heightExpandsAutomatically: '你输入时高度会自动扩展。',
      fixedHeightScroll: '固定高度（滚动）',
      typeALot: '输入很多内容...',
      fixedHeightScrollsInternally: '固定高度 - 在内部滚动。',
      subject: '主题',
      briefIssue: '简要描述问题',
      body: '描述',
      whatHappened: '发生了什么？',
      stepsToReproduce: '复现步骤',
      optionalHelpful: '可选，但非常有帮助。',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'docList' },
  argTypes: {
    modelValue:  { control: 'text' },
    size:        { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    error:       { control: 'text' },
    disabled:    { control: 'boolean' },
    readonly:    { control: 'boolean' },
    autoResize:  { control: 'boolean' },
    counter:     { control: 'boolean' },
    rows:        { control: 'number' },
    maxlength:   { control: 'number' },
  },
  args: {
    modelValue:  '',
    size:        'md',
    autoResize:  true,
    disabled:    false,
    readonly:    false,
    counter:     false,
  },
  decorators: [
    () => ({ template: '<div style="width:360px;"><story /></div>' }),
  ],
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args: any) => ({
    components: { Textarea },
    setup() {
      const copy = useCopy()
      const val = ref(args.modelValue ?? '')
      return { args, copy, val }
    },
    template: '<Textarea v-bind="args" v-model="val" :label="copy.labels.message" :placeholder="copy.labels.writeMessage" />',
  }),
}

export const States: Story = {
  get name() {
    return getStoryName('states')
  },
  render: () => ({
    components: { Textarea },
    setup() {
      const copy = useCopy()
      const normal = ref('')
      const filled = ref('')
      const error = ref('')
      const disabled = ref('')
      const readonly = ref('')

      watch(copy, (current) => {
        filled.value = current.labels.filledContent
        error.value = current.labels.errorValue
        disabled.value = current.labels.disabledValue
        readonly.value = current.labels.filledContentReadonly
      }, { immediate: true })

      return { copy, normal, filled, error, disabled, readonly }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Textarea v-model="normal"   :label="copy.labels.normal"    :placeholder="copy.labels.typeSomething" />
        <Textarea v-model="filled"   :label="copy.labels.filled" />
        <Textarea v-model="error"    :label="copy.labels.error"     :error="copy.labels.messageTooShort" />
        <Textarea v-model="disabled" :label="copy.labels.disabled"  disabled />
        <Textarea v-model="readonly" :label="copy.labels.readOnly" readonly :helper-text="copy.labels.cannotBeModified" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Textarea },
    setup: () => ({
      copy: useCopy(),
      sm: ref(''), md: ref(''), lg: ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Textarea v-model="sm" size="sm" :label="copy.labels.smallLabel"  :placeholder="copy.labels.smallTextarea" :rows="2" />
        <Textarea v-model="md" size="md" :label="copy.labels.mediumLabel" :placeholder="copy.labels.mediumTextarea" :rows="3" />
        <Textarea v-model="lg" size="lg" :label="copy.labels.largeLabel"  :placeholder="copy.labels.largeTextarea"  :rows="3" />
      </div>
    `,
  }),
}

export const WithHelperText: Story = {
  get name() {
    return getStoryName('withHelperText')
  },
  render: () => ({
    components: { Textarea },
    setup: () => ({ copy: useCopy(), val: ref('') }),
    template: `
      <Textarea
        v-model="val"
        :label="copy.labels.description"
        :placeholder="copy.labels.describeProject"
        :helper-text="copy.labels.beDetailed"
      />
    `,
  }),
}

export const WithCounter: Story = {
  get name() {
    return getStoryName('withCounter')
  },
  render: () => ({
    components: { Textarea },
    setup: () => ({ copy: useCopy(), bio: ref(''), tweet: ref('') }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Textarea v-model="bio"   :label="copy.labels.bio"   :maxlength="160" counter :placeholder="copy.labels.tellUsAboutYourself" />
        <Textarea v-model="tweet" :label="copy.labels.tweet" :maxlength="280" counter :placeholder="copy.labels.whatIsHappening" :rows="4" />
      </div>
    `,
  }),
}

export const AutoResize: Story = {
  get name() {
    return getStoryName('autoResize')
  },
  render: () => ({
    components: { Textarea },
    setup: () => ({ copy: useCopy(), val: ref('') }),
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <Textarea
          v-model="val"
          :label="copy.labels.autoResize"
          :placeholder="copy.labels.typeMoreToGrow"
          :auto-resize="true"
          :rows="2"
          :helper-text="copy.labels.heightExpandsAutomatically"
        />
      </div>
    `,
  }),
}

export const FixedHeight: Story = {
  get name() {
    return getStoryName('fixedHeight')
  },
  render: () => ({
    components: { Textarea },
    setup: () => ({ copy: useCopy(), val: ref('') }),
    template: `
      <Textarea
        v-model="val"
        :label="copy.labels.fixedHeightScroll"
        :placeholder="copy.labels.typeALot"
        :auto-resize="false"
        :rows="4"
        :max-rows="4"
        resize="none"
        :helper-text="copy.labels.fixedHeightScrollsInternally"
      />
    `,
  }),
}

export const FormExample: Story = {
  get name() {
    return getStoryName('feedbackForm')
  },
  decorators: [
    () => ({ template: '<div style="width:380px;"><story /></div>' }),
  ],
  render: () => ({
    components: { Textarea },
    setup() {
      const copy = useCopy()
      const subject = ref('')
      const body    = ref('')
      const steps   = ref('')
      return { copy, subject, body, steps }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <Textarea v-model="subject" :label="copy.labels.subject"            :placeholder="copy.labels.briefIssue" :rows="1" :auto-resize="true" required />
        <Textarea v-model="body"    :label="copy.labels.body"               :placeholder="copy.labels.whatHappened" :rows="4" :maxlength="500" counter required />
        <Textarea v-model="steps"   :label="copy.labels.stepsToReproduce"   :placeholder="'1. ' + copy.labels.whatHappened + '&#10;2. ...&#10;3. ...'" :rows="3" :helper-text="copy.labels.optionalHelpful" />
      </div>
    `,
  }),
}
