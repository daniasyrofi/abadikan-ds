import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Modal from './Modal.vue'

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size:           { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    closable:       { control: 'boolean' },
    closeOnOverlay: { control: 'boolean' },
    preventClose:   { control: 'boolean' },
    scrollBehavior: { control: 'select', options: ['inside', 'outside'] },
  },
  args: {
    size:           'md',
    closable:       true,
    closeOnOverlay: true,
    preventClose:   false,
    scrollBehavior: 'inside',
  },
}
export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: (args) => ({
    components: { Modal },
    setup() {
      const open = ref(false)
      return { open, args }
    },
    template: `
      <div>
        <button
          class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse]"
          @click="open = true"
        >
          Open Modal
        </button>
        <Modal v-bind="args" v-model="open">
          <template #title>Modal title</template>
          <template #description>This is a description of the modal content.</template>
          <p class="text-sm text-[--color-text-secondary]">
            This is the body content of the modal. It can contain any kind of content
            including text, forms, images, and other components.
          </p>
          <template #footer>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] hover:bg-[--color-neutral-light]"
              @click="open = false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse]"
              @click="open = false"
            >
              Confirm
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Modal },
    setup() {
      const activeSize = ref<string | null>(null)
      return { activeSize }
    },
    template: `
      <div class="flex flex-wrap gap-3">
        <button
          v-for="size in ['sm', 'md', 'lg', 'xl', 'full']"
          :key="size"
          class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] hover:bg-[--color-neutral-light]"
          @click="activeSize = size"
        >
          {{ size.toUpperCase() }}
        </button>
        <Modal
          v-for="size in ['sm', 'md', 'lg', 'xl', 'full']"
          :key="size"
          :model-value="activeSize === size"
          :size="size"
          @update:model-value="activeSize = $event ? size : null"
        >
          <template #title>{{ size.toUpperCase() }} Modal</template>
          <template #description>This modal uses the "{{ size }}" size variant.</template>
          <p class="text-sm text-[--color-text-secondary]">
            Modal panel content at the {{ size }} breakpoint.
          </p>
          <template #footer>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse]"
              @click="activeSize = null"
            >
              Close
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const WithForm: Story = {
  render: () => ({
    components: { Modal },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <button
          class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse]"
          @click="open = true"
        >
          Edit Profile
        </button>
        <Modal v-model="open" size="md">
          <template #title>Edit Profile</template>
          <template #description>Update your personal information below.</template>
          <form class="flex flex-col gap-4" @submit.prevent="open = false">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-[--color-text-primary]">Full name</label>
              <input
                type="text"
                value="Jane Cooper"
                class="h-9 px-3 text-sm rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-[--color-text-primary] outline-none focus:outline-2 focus:outline-[--color-primary]"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-[--color-text-primary]">Email</label>
              <input
                type="email"
                value="jane@example.com"
                class="h-9 px-3 text-sm rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-[--color-text-primary] outline-none focus:outline-2 focus:outline-[--color-primary]"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-[--color-text-primary]">Bio</label>
              <textarea
                rows="3"
                class="px-3 py-2 text-sm rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-[--color-text-primary] outline-none focus:outline-2 focus:outline-[--color-primary] resize-none"
              >Product designer with 8 years of experience.</textarea>
            </div>
          </form>
          <template #footer>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] hover:bg-[--color-neutral-light]"
              @click="open = false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse]"
              @click="open = false"
            >
              Save changes
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const PreventClose: Story = {
  render: () => ({
    components: { Modal },
    setup() {
      const open = ref(false)
      const confirmed = ref(false)
      return { open, confirmed }
    },
    template: `
      <div>
        <button
          class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-danger] text-white"
          @click="open = true; confirmed = false"
        >
          Delete Account
        </button>
        <Modal v-model="open" size="sm" prevent-close>
          <template #title>Are you sure?</template>
          <template #description>This action cannot be undone.</template>
          <div class="flex items-start gap-3">
            <input
              id="confirm-check"
              type="checkbox"
              v-model="confirmed"
              class="mt-0.5 accent-[--color-danger]"
            />
            <label for="confirm-check" class="text-sm text-[--color-text-secondary]">
              I understand that deleting my account is permanent and all my data will be lost.
            </label>
          </div>
          <template #footer>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] hover:bg-[--color-neutral-light]"
              @click="open = false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-danger] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!confirmed"
              @click="open = false"
            >
              Delete Account
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const ScrollBehavior: Story = {
  render: () => ({
    components: { Modal },
    setup() {
      const insideOpen = ref(false)
      const outsideOpen = ref(false)
      return { insideOpen, outsideOpen }
    },
    template: `
      <div class="flex gap-3">
        <button
          class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] hover:bg-[--color-neutral-light]"
          @click="insideOpen = true"
        >
          Scroll Inside
        </button>
        <button
          class="px-4 py-2 text-sm rounded-[--radius-md] border border-[--color-border] text-[--color-text-primary] hover:bg-[--color-neutral-light]"
          @click="outsideOpen = true"
        >
          Scroll Outside
        </button>

        <Modal v-model="insideOpen" scroll-behavior="inside">
          <template #title>Inside scroll</template>
          <template #description>The modal body scrolls while header and footer stay fixed.</template>
          <div class="flex flex-col gap-3">
            <p v-for="i in 20" :key="i" class="text-sm text-[--color-text-secondary]">
              Paragraph {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <template #footer>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse]"
              @click="insideOpen = false"
            >
              Close
            </button>
          </template>
        </Modal>

        <Modal v-model="outsideOpen" scroll-behavior="outside">
          <template #title>Outside scroll</template>
          <template #description>The entire modal scrolls within the overlay.</template>
          <div class="flex flex-col gap-3">
            <p v-for="i in 20" :key="i" class="text-sm text-[--color-text-secondary]">
              Paragraph {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <template #footer>
            <button
              class="px-4 py-2 text-sm rounded-[--radius-md] bg-[--color-neutral] text-[--color-text-inverse]"
              @click="outsideOpen = false"
            >
              Close
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}
