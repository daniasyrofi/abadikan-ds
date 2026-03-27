import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FileUpload from './FileUpload.vue'

const meta: Meta<typeof FileUpload> = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    accept:   { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize:  { control: 'number' },
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
  render: (args) => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Files selected:', files)
      }
      function onError(msg: string) {
        console.error('Upload error:', msg)
      }
      return { args, onFiles, onError }
    },
    template: `
      <div class="max-w-md">
        <FileUpload v-bind="args" @files="onFiles" @error="onError" />
      </div>
    `,
  }),
}

export const ImageOnly: Story = {
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
      <div class="max-w-md">
        <FileUpload accept="image/*" multiple @files="onFiles" @error="onError" />
      </div>
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        console.error(msg)
      }
      return { onFiles, onError }
    },
    template: `
      <div class="max-w-md">
        <FileUpload multiple :max-files="3" @files="onFiles" @error="onError" />
        <p class="text-xs text-[--color-text-tertiary] mt-2">Up to 3 files</p>
      </div>
    `,
  }),
}

export const WithPreviews: Story = {
  render: () => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        console.error(msg)
      }
      return { onFiles, onError }
    },
    template: `
      <div class="max-w-md">
        <FileUpload accept="image/*" multiple previews @files="onFiles" @error="onError" />
        <p class="text-xs text-[--color-text-tertiary] mt-2">Select images to see thumbnails</p>
      </div>
    `,
  }),
}

export const DragActive: Story = {
  name: 'Drag Active (visual reference)',
  render: () => ({
    components: { FileUpload },
    template: `
      <div class="max-w-md">
        <p class="text-sm text-[--color-text-secondary] mb-3">
          Drag a file over the dropzone to see the active highlight state.
        </p>
        <FileUpload accept="image/*" />
      </div>
    `,
  }),
}

export const MaxSize: Story = {
  render: () => ({
    components: { FileUpload },
    setup() {
      function onFiles(files: File[]) {
        console.log('Files:', files)
      }
      function onError(msg: string) {
        alert(msg)
      }
      return { onFiles, onError }
    },
    template: `
      <div class="max-w-md">
        <FileUpload
          accept="image/*,.pdf"
          :max-size="1048576"
          multiple
          @files="onFiles"
          @error="onError"
        />
        <p class="text-xs text-[--color-text-tertiary] mt-2">
          Max 1MB per file — errors will show as alerts
        </p>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <div class="max-w-md">
        <FileUpload disabled accept="image/*" />
      </div>
    `,
  }),
}
