import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import FileUpload from './FileUpload.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    imageOnly: string
    multiple: string
    withPreviews: string
    dragActive: string
    maxSize: string
    disabled: string
  }
  multipleHint: string
  previewsHint: string
  dragHint: string
  maxSizeHint: string
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      imageOnly: 'Image Only',
      multiple: 'Multiple',
      withPreviews: 'With Previews',
      dragActive: 'Drag Active (visual reference)',
      maxSize: 'Max Size',
      disabled: 'Disabled',
    },
    multipleHint: 'Up to 3 files',
    previewsHint: 'Select images to see thumbnails',
    dragHint: 'Drag a file over the dropzone to see the active highlight state.',
    maxSizeHint: 'Max 1MB per file - errors will show as alerts',
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      imageOnly: 'Hanya Gambar',
      multiple: 'Banyak',
      withPreviews: 'Dengan Pratinjau',
      dragActive: 'Seret Aktif (referensi visual)',
      maxSize: 'Ukuran Maks',
      disabled: 'Nonaktif',
    },
    multipleHint: 'Maksimal 3 file',
    previewsHint: 'Pilih gambar untuk melihat thumbnail',
    dragHint: 'Seret file ke dropzone untuk melihat keadaan sorotan aktif.',
    maxSizeHint: 'Maks 1MB per file - error akan ditampilkan sebagai alert',
  },
  zh: {
    storyNames: {
      default: '默认',
      imageOnly: '仅图片',
      multiple: '多个',
      withPreviews: '带预览',
      dragActive: '拖拽激活（视觉参考）',
      maxSize: '最大大小',
      disabled: '禁用',
    },
    multipleHint: '最多 3 个文件',
    previewsHint: '选择图片以查看缩略图',
    dragHint: '将文件拖到投放区可查看激活高亮状态。',
    maxSizeHint: '每个文件最大 1MB - 错误将显示为提示框',
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas decorator ──────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <story />
    </div>
  `,
})

const meta: Meta<typeof FileUpload> = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize: { control: 'number' },
    maxFiles: { control: 'number' },
    disabled: { control: 'boolean' },
    previews: { control: 'boolean' },
  },
  args: {
    accept: '',
    multiple: false,
    maxSize: 5242880,
    maxFiles: 5,
    disabled: false,
    previews: true,
  },
}
export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { FileUpload },
    setup() {
      const copy = useCopy()
      function onFiles(files: File[]) {
        console.log('Files selected:', files)
      }
      function onError(msg: string) {
        console.error('Upload error:', msg)
      }
      return { args, onFiles, onError, copy }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload v-bind="args" @files="onFiles" @error="onError" />
      </div>
    `,
  }),
}

export const ImageOnly: Story = {
  get name() {
    return getStoryName('imageOnly')
  },
  render: () => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Images:', files)
      }
      function onError(msg: string) {
        console.error(msg)
      }
      return { onFiles, onError }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload accept="image/*" multiple @files="onFiles" @error="onError" />
      </div>
    `,
  }),
}

export const Multiple: Story = {
  get name() {
    return getStoryName('multiple')
  },
  render: () => ({
    components: { FileUpload },
    setup() {
      const copy = useCopy()
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        console.error(msg)
      }
      return { onFiles, onError, copy }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload multiple :max-files="3" @files="onFiles" @error="onError" />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">{{ copy.multipleHint }}</p>
      </div>
    `,
  }),
}

export const WithPreviews: Story = {
  get name() {
    return getStoryName('withPreviews')
  },
  render: () => ({
    components: { FileUpload },
    setup() {
      const copy = useCopy()
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        console.error(msg)
      }
      return { onFiles, onError, copy }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload accept="image/*" multiple previews @files="onFiles" @error="onError" />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">{{ copy.previewsHint }}</p>
      </div>
    `,
  }),
}

export const DragActive: Story = {
  get name() {
    return getStoryName('dragActive')
  },
  render: () => ({
    components: { FileUpload },
    setup() {
      return { copy: useCopy() }
    },
    template: `
      <div style="max-width:448px;">
        <p style="font-size:14px;color:var(--color-text-secondary);margin-bottom:12px;">
          {{ copy.dragHint }}
        </p>
        <FileUpload accept="image/*" />
      </div>
    `,
  }),
}

export const MaxSize: Story = {
  get name() {
    return getStoryName('maxSize')
  },
  render: () => ({
    components: { FileUpload },
    setup() {
      const copy = useCopy()
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        alert(msg)
      }
      return { onFiles, onError, copy }
    },
    template: `
      <div style="max-width:448px;">
        <FileUpload
          accept="image/*,.pdf"
          :max-size="1048576"
          multiple
          @files="onFiles"
          @error="onError"
        />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">
          {{ copy.maxSizeHint }}
        </p>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { FileUpload },
    template: `
      <div style="max-width:448px;">
        <FileUpload disabled accept="image/*" />
      </div>
    `,
  }),
}
