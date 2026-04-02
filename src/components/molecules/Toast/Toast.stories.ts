import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Toast from './Toast.vue'
import ToastContainer from './ToastContainer.vue'
import { useToast } from './useToast'
import Button from '@/components/atoms/Button/Button.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    allVariants: string
    withAction: string
    autoDismiss: string
    persistent: string
  }
  allVariants: Record<
    'info' | 'success' | 'warning' | 'danger',
    { title: string; description: string }
  >
  withAction: {
    warning: { title: string; description: string; dismiss: string; upgrade: string }
    danger: { title: string; description: string; retry: string }
  }
  autoDismiss: {
    info: { label: string; title: string; description: string }
    success: { label: string; title: string; description: string }
    warning: { label: string; title: string; description: string }
    error: { label: string; title: string; description: string }
    dismissAll: string
  }
  persistent: {
    button: string
    title: string
    description: string
    dismissAll: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      allVariants: 'All Variants',
      withAction: 'With Actions',
      autoDismiss: 'Auto Dismiss',
      persistent: 'Persistent',
    },
    allVariants: {
      info: {
        title: 'System update available',
        description: 'A new version (v2.4.1) is ready to install.',
      },
      success: {
        title: 'Payment successful',
        description: 'Your invoice has been paid. A receipt was sent.',
      },
      warning: {
        title: 'Storage almost full',
        description: "You've used 92% of your 5 GB storage.",
      },
      danger: {
        title: 'Failed to save changes',
        description: 'Your changes could not be saved. Please try again.',
      },
    },
    withAction: {
      warning: {
        title: 'Subscription expiring',
        description: 'Your free trial ends in 2 days.',
        dismiss: 'Dismiss',
        upgrade: 'Upgrade now',
      },
      danger: {
        title: 'Connection lost',
        description: 'Reconnecting to server…',
        retry: 'Retry now',
      },
    },
    autoDismiss: {
      info: {
        label: 'Show Info',
        title: 'Info toast',
        description: 'This will auto-dismiss in 5 seconds.',
      },
      success: {
        label: 'Show Success',
        title: 'Success toast',
        description: 'Operation completed successfully.',
      },
      warning: {
        label: 'Show Warning',
        title: 'Warning toast',
        description: 'Please review before continuing.',
      },
      error: { label: 'Show Error', title: 'Error toast', description: 'Something went wrong.' },
      dismissAll: 'Dismiss All',
    },
    persistent: {
      button: 'Show Persistent Toast',
      title: 'Persistent toast',
      description: 'This toast will not auto-dismiss. Click × to close it.',
      dismissAll: 'Dismiss All',
    },
  },
  id: {
    storyNames: {
      allVariants: 'Semua Varian',
      withAction: 'Dengan Aksi',
      autoDismiss: 'Tutup Otomatis',
      persistent: 'Persisten',
    },
    allVariants: {
      info: {
        title: 'Pembaruan sistem tersedia',
        description: 'Versi baru (v2.4.1) siap dipasang.',
      },
      success: {
        title: 'Pembayaran berhasil',
        description: 'Tagihan Anda telah dibayar. Tanda terima telah dikirim.',
      },
      warning: {
        title: 'Penyimpanan hampir penuh',
        description: 'Anda telah menggunakan 92% dari penyimpanan 5 GB.',
      },
      danger: {
        title: 'Gagal menyimpan perubahan',
        description: 'Perubahan Anda tidak dapat disimpan. Silakan coba lagi.',
      },
    },
    withAction: {
      warning: {
        title: 'Langganan akan berakhir',
        description: 'Uji coba gratis Anda berakhir dalam 2 hari.',
        dismiss: 'Tutup',
        upgrade: 'Tingkatkan sekarang',
      },
      danger: {
        title: 'Koneksi terputus',
        description: 'Menyambung ulang ke server…',
        retry: 'Coba lagi sekarang',
      },
    },
    autoDismiss: {
      info: {
        label: 'Tampilkan Info',
        title: 'Toast info',
        description: 'Ini akan tertutup otomatis dalam 5 detik.',
      },
      success: {
        label: 'Tampilkan Sukses',
        title: 'Toast sukses',
        description: 'Operasi berhasil diselesaikan.',
      },
      warning: {
        label: 'Tampilkan Peringatan',
        title: 'Toast peringatan',
        description: 'Silakan tinjau sebelum melanjutkan.',
      },
      error: { label: 'Tampilkan Error', title: 'Toast error', description: 'Terjadi kesalahan.' },
      dismissAll: 'Tutup Semua',
    },
    persistent: {
      button: 'Tampilkan Toast Persisten',
      title: 'Toast persisten',
      description: 'Toast ini tidak akan tertutup otomatis. Klik × untuk menutupnya.',
      dismissAll: 'Tutup Semua',
    },
  },
  zh: {
    storyNames: {
      allVariants: '所有变体',
      withAction: '带操作',
      autoDismiss: '自动关闭',
      persistent: '持久显示',
    },
    allVariants: {
      info: { title: '系统更新可用', description: '新版本（v2.4.1）已准备好安装。' },
      success: { title: '付款成功', description: '你的账单已支付。收据已发送。' },
      warning: { title: '存储空间几乎已满', description: '你已使用 92% 的 5 GB 存储空间。' },
      danger: { title: '保存更改失败', description: '你的更改无法保存。请再试一次。' },
    },
    withAction: {
      warning: {
        title: '订阅即将到期',
        description: '你的免费试用将在 2 天后结束。',
        dismiss: '关闭',
        upgrade: '立即升级',
      },
      danger: {
        title: '连接已丢失',
        description: '正在重新连接服务器…',
        retry: '立即重试',
      },
    },
    autoDismiss: {
      info: { label: '显示信息', title: '信息提示', description: '这条提示将在 5 秒后自动关闭。' },
      success: { label: '显示成功', title: '成功提示', description: '操作已成功完成。' },
      warning: { label: '显示警告', title: '警告提示', description: '请在继续前检查。' },
      error: { label: '显示错误', title: '错误提示', description: '出现了一些问题。' },
      dismissAll: '全部关闭',
    },
    persistent: {
      button: '显示持久提示',
      title: '持久提示',
      description: '此提示不会自动关闭。点击 × 可将其关闭。',
      dismissAll: '全部关闭',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas decorator — same as Alert ─────────────────────────────────────────
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

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    description: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    id: 'toast-preview',
    variant: 'info',
    title: 'Toast title',
    description: 'This is a toast description with extra context.',
    dismissible: true,
  },
}
export default meta
type Story = StoryObj<typeof Toast>

const W = 'display:flex;flex-direction:column;gap:10px;'

// Text-link action styles (macOS notification style)
const lP =
  'background:none;border:none;padding:0;cursor:pointer;font-size:13px;font-weight:600;color:var(--color-text-primary);letter-spacing:-0.01em;'
const lM =
  'background:none;border:none;padding:0;cursor:pointer;font-size:13px;font-weight:400;color:var(--color-text-tertiary);letter-spacing:-0.01em;'

// ── All Variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  get name() {
    return getStoryName('allVariants')
  },
  render: () => ({
    components: { Toast },
    setup() {
      const dismissed = ref<Record<string, boolean>>({})
      const onDismiss = (id: string) => {
        dismissed.value[id] = true
      }
      return { dismissed, onDismiss, copy: useCopy() }
    },
    template: `
      <div style="${W}">
        <Toast v-if="!dismissed['t-info']"    id="t-info"    variant="info"    :title="copy.allVariants.info.title"    :description="copy.allVariants.info.description" @dismiss="onDismiss" />
        <Toast v-if="!dismissed['t-success']" id="t-success" variant="success" :title="copy.allVariants.success.title" :description="copy.allVariants.success.description" @dismiss="onDismiss" />
        <Toast v-if="!dismissed['t-warning']" id="t-warning" variant="warning" :title="copy.allVariants.warning.title" :description="copy.allVariants.warning.description" @dismiss="onDismiss" />
        <Toast v-if="!dismissed['t-danger']"  id="t-danger"  variant="danger"  :title="copy.allVariants.danger.title"  :description="copy.allVariants.danger.description" @dismiss="onDismiss" />
      </div>
    `,
  }),
}

// ── With Action ───────────────────────────────────────────────────────────────

export const WithAction: Story = {
  get name() {
    return getStoryName('withAction')
  },
  render: () => ({
    components: { Toast },
    setup: () => ({ lP, lM, copy: useCopy() }),
    template: `
      <div style="${W}">
        <Toast id="t-action" variant="warning" :title="copy.withAction.warning.title" :description="copy.withAction.warning.description" :dismissible="false">
          <template #action>
            <button :style="lM">{{ copy.withAction.warning.dismiss }}</button>
            <button :style="lP">{{ copy.withAction.warning.upgrade }}</button>
          </template>
        </Toast>
        <Toast id="t-action2" variant="danger" :title="copy.withAction.danger.title" :description="copy.withAction.danger.description" :dismissible="false">
          <template #action>
            <button :style="lP">{{ copy.withAction.danger.retry }}</button>
          </template>
        </Toast>
      </div>
    `,
  }),
}

// ── Auto Dismiss (interactive) ────────────────────────────────────────────────

export const AutoDismiss: Story = {
  get name() {
    return getStoryName('autoDismiss')
  },
  parameters: { layout: 'padded' },
  render: () => ({
    components: { ToastContainer, Button },
    setup() {
      const { success, error, info, warning, dismissAll } = useToast()
      return { success, error, info, warning, dismissAll, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <Button variant="secondary" size="sm" @click="info(copy.autoDismiss.info.title, copy.autoDismiss.info.description)">{{ copy.autoDismiss.info.label }}</Button>
          <Button variant="secondary" size="sm" @click="success(copy.autoDismiss.success.title, copy.autoDismiss.success.description)">{{ copy.autoDismiss.success.label }}</Button>
          <Button variant="secondary" size="sm" @click="warning(copy.autoDismiss.warning.title, copy.autoDismiss.warning.description)">{{ copy.autoDismiss.warning.label }}</Button>
          <Button variant="danger"    size="sm" @click="error(copy.autoDismiss.error.title, copy.autoDismiss.error.description)">{{ copy.autoDismiss.error.label }}</Button>
          <Button variant="ghost"     size="sm" @click="dismissAll()">{{ copy.autoDismiss.dismissAll }}</Button>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
}

// ── Persistent ────────────────────────────────────────────────────────────────

export const Persistent: Story = {
  get name() {
    return getStoryName('persistent')
  },
  parameters: { layout: 'padded' },
  render: () => ({
    components: { ToastContainer, Button },
    setup() {
      const { toast, dismissAll } = useToast()
      const showPersistent = () =>
        toast({
          title: copyMap[getLocale()].persistent.title,
          description: copyMap[getLocale()].persistent.description,
          variant: 'danger',
          duration: 0,
          dismissible: true,
        })
      return { showPersistent, dismissAll, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;gap:8px;">
          <Button variant="danger" size="sm" @click="showPersistent()">{{ copy.persistent.button }}</Button>
          <Button variant="ghost"  size="sm" @click="dismissAll()">{{ copy.persistent.dismissAll }}</Button>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
}
