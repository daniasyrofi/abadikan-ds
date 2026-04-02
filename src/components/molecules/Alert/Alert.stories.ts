import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { RiShieldCheckLine } from '@remixicon/vue'
import Alert from './Alert.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allVariants: string
    allSizes: string
    dismissible: string
    dismissibleAllVariants: string
    withoutTitle: string
    withoutIcon: string
    withCustomIcon: string
    withAction: string
  }
  default: {
    title: string
    context: string
  }
  allVariants: Record<'info' | 'success' | 'warning' | 'danger', { title: string; desc: string }>
  allSizes: Array<{ key: 'sm' | 'md' | 'lg'; label: string; body: string }>
  dismissible: {
    title: string
    body: string
    showAgain: string
  }
  dismissibleAllVariants: Record<
    'info' | 'success' | 'warning' | 'danger',
    { title: string; body: string }
  >
  dismissibleAllReset: string
  withoutTitle: Record<'info' | 'success' | 'warning' | 'danger', string>
  withoutIcon: Record<'info' | 'danger', { title: string; body: string }>
  withCustomIcon: {
    title: string
    body: string
  }
  withAction: {
    warning: { title: string; body: string; dismiss: string; upgrade: string }
    danger: { title: string; body: string; skip: string; send: string }
    info: { title: string; body: string; view: string }
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allVariants: 'All Variants',
      allSizes: 'All Sizes',
      dismissible: 'Dismissible',
      dismissibleAllVariants: 'Dismissible - All Variants',
      withoutTitle: 'Without Title',
      withoutIcon: 'Without Icon',
      withCustomIcon: 'With Custom Icon',
      withAction: 'With Actions',
    },
    default: {
      title: 'Informational alert',
      context: 'This is the default alert content.',
    },
    allVariants: {
      info: { title: 'System update available', desc: 'A new version is ready to install.' },
      success: { title: 'Payment successful', desc: 'Your invoice has been paid.' },
      warning: {
        title: 'Storage almost full',
        desc: 'You have used most of your available space.',
      },
      danger: { title: 'Failed to save changes', desc: 'Your changes could not be saved.' },
    },
    allSizes: [
      { key: 'sm', label: 'Small', body: 'Compact alert for tight spaces or inline feedback.' },
      { key: 'md', label: 'Medium', body: 'Default size - balanced for panel and page content.' },
      { key: 'lg', label: 'Large', body: 'Prominent alert for critical or page-level messages.' },
    ],
    dismissible: {
      title: 'Unsaved changes',
      body: 'You have unsaved changes. They will be lost if you navigate away.',
      showAgain: 'Show alert again',
    },
    dismissibleAllVariants: {
      info: { title: 'Update available', body: 'Version 2.4.1 is ready to install.' },
      success: { title: 'Profile saved', body: 'Your changes have been published successfully.' },
      warning: {
        title: 'Low disk space',
        body: 'Only 500 MB remaining. Free up space to continue.',
      },
      danger: {
        title: 'Connection error',
        body: 'Failed to sync data. Check your network connection.',
      },
    },
    dismissibleAllReset: 'Reset all',
    withoutTitle: {
      info: 'Your session will expire in 10 minutes.',
      success: 'Profile updated successfully.',
      warning: 'Unsaved changes will be lost if you leave.',
      danger: 'Invalid credentials. Please try again.',
    },
    withoutIcon: {
      info: {
        title: 'Maintenance window',
        body: 'Scheduled maintenance on Sunday 02:00-04:00 UTC.',
      },
      danger: {
        title: 'Account suspended',
        body: 'Your account has been suspended due to a policy violation.',
      },
    },
    withCustomIcon: {
      title: 'Identity verified',
      body: 'Your identity has been verified. You now have full account access.',
    },
    withAction: {
      warning: {
        title: 'Free trial expires in 2 days',
        body: 'Upgrade your plan to keep access to all features after the trial ends.',
        dismiss: 'Dismiss',
        upgrade: 'Upgrade now',
      },
      danger: {
        title: 'Email not verified',
        body: 'Please verify your email address to unlock all account features.',
        skip: 'Skip for now',
        send: 'Send email',
      },
      info: {
        title: 'New features available',
        body: 'We have shipped improvements to the dashboard, reporting, and exports.',
        view: 'View changelog',
      },
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allVariants: 'Semua Varian',
      allSizes: 'Semua Ukuran',
      dismissible: 'Bisa Ditutup',
      dismissibleAllVariants: 'Bisa Ditutup - Semua Varian',
      withoutTitle: 'Tanpa Judul',
      withoutIcon: 'Tanpa Ikon',
      withCustomIcon: 'Dengan Ikon Kustom',
      withAction: 'Dengan Aksi',
    },
    default: {
      title: 'Peringatan informatif',
      context: 'Ini adalah konten alert bawaan.',
    },
    allVariants: {
      info: { title: 'Pembaruan sistem tersedia', desc: 'Versi baru siap dipasang.' },
      success: { title: 'Pembayaran berhasil', desc: 'Tagihan Anda telah dibayar.' },
      warning: {
        title: 'Penyimpanan hampir penuh',
        desc: 'Anda telah menggunakan sebagian besar ruang yang tersedia.',
      },
      danger: { title: 'Gagal menyimpan perubahan', desc: 'Perubahan Anda tidak dapat disimpan.' },
    },
    allSizes: [
      {
        key: 'sm',
        label: 'Kecil',
        body: 'Alert ringkas untuk ruang sempit atau umpan balik inline.',
      },
      {
        key: 'md',
        label: 'Sedang',
        body: 'Ukuran default - seimbang untuk panel dan konten halaman.',
      },
      {
        key: 'lg',
        label: 'Besar',
        body: 'Alert menonjol untuk pesan penting atau tingkat halaman.',
      },
    ],
    dismissible: {
      title: 'Perubahan belum disimpan',
      body: 'Ada perubahan yang belum disimpan. Perubahan akan hilang jika Anda meninggalkan halaman.',
      showAgain: 'Tampilkan alert lagi',
    },
    dismissibleAllVariants: {
      info: { title: 'Pembaruan tersedia', body: 'Versi 2.4.1 siap dipasang.' },
      success: { title: 'Profil tersimpan', body: 'Perubahan Anda berhasil dipublikasikan.' },
      warning: {
        title: 'Ruang disk rendah',
        body: 'Tersisa 500 MB. Bebaskan ruang untuk melanjutkan.',
      },
      danger: {
        title: 'Kesalahan koneksi',
        body: 'Gagal menyinkronkan data. Periksa koneksi jaringan Anda.',
      },
    },
    dismissibleAllReset: 'Atur ulang semua',
    withoutTitle: {
      info: 'Sesi Anda akan habis dalam 10 menit.',
      success: 'Profil berhasil diperbarui.',
      warning: 'Perubahan yang belum disimpan akan hilang jika Anda keluar.',
      danger: 'Kredensial tidak valid. Silakan coba lagi.',
    },
    withoutIcon: {
      info: {
        title: 'Jadwal pemeliharaan',
        body: 'Pemeliharaan terjadwal pada Minggu 02:00-04:00 UTC.',
      },
      danger: {
        title: 'Akun ditangguhkan',
        body: 'Akun Anda telah ditangguhkan karena pelanggaran kebijakan.',
      },
    },
    withCustomIcon: {
      title: 'Identitas terverifikasi',
      body: 'Identitas Anda telah diverifikasi. Anda kini memiliki akses penuh ke akun.',
    },
    withAction: {
      warning: {
        title: 'Uji coba gratis berakhir dalam 2 hari',
        body: 'Tingkatkan paket Anda agar tetap bisa mengakses semua fitur setelah masa uji coba berakhir.',
        dismiss: 'Tutup',
        upgrade: 'Tingkatkan sekarang',
      },
      danger: {
        title: 'Email belum diverifikasi',
        body: 'Silakan verifikasi alamat email Anda untuk membuka semua fitur akun.',
        skip: 'Lewati dulu',
        send: 'Kirim email',
      },
      info: {
        title: 'Fitur baru tersedia',
        body: 'Kami telah menghadirkan peningkatan pada dasbor, pelaporan, dan ekspor.',
        view: 'Lihat changelog',
      },
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allVariants: '所有变体',
      allSizes: '所有尺寸',
      dismissible: '可关闭',
      dismissibleAllVariants: '可关闭 - 所有变体',
      withoutTitle: '无标题',
      withoutIcon: '无图标',
      withCustomIcon: '自定义图标',
      withAction: '带操作',
    },
    default: {
      title: '信息提示',
      context: '这是默认的提示内容。',
    },
    allVariants: {
      info: { title: '系统更新可用', desc: '新版本已准备好安装。' },
      success: { title: '付款成功', desc: '你的账单已支付。' },
      warning: { title: '存储空间几乎已满', desc: '你已经使用了大部分可用空间。' },
      danger: { title: '保存更改失败', desc: '你的更改无法保存。' },
    },
    allSizes: [
      { key: 'sm', label: '小', body: '适合狭小空间或行内反馈的紧凑提示。' },
      { key: 'md', label: '中', body: '默认尺寸 - 适合面板和页面内容。' },
      { key: 'lg', label: '大', body: '适合关键或页面级消息的显著提示。' },
    ],
    dismissible: {
      title: '未保存的更改',
      body: '你有未保存的更改。如果离开页面，这些更改将丢失。',
      showAgain: '再次显示提示',
    },
    dismissibleAllVariants: {
      info: { title: '更新可用', body: '版本 2.4.1 已准备好安装。' },
      success: { title: '资料已保存', body: '你的更改已成功发布。' },
      warning: { title: '磁盘空间不足', body: '仅剩 500 MB。请释放空间以继续。' },
      danger: { title: '连接错误', body: '同步数据失败。请检查你的网络连接。' },
    },
    dismissibleAllReset: '全部重置',
    withoutTitle: {
      info: '你的会话将在 10 分钟后过期。',
      success: '资料已成功更新。',
      warning: '如果离开，未保存的更改将丢失。',
      danger: '凭证无效。请重试。',
    },
    withoutIcon: {
      info: { title: '维护窗口', body: '计划维护时间为周日 02:00-04:00 UTC。' },
      danger: { title: '账户已停用', body: '由于违反政策，你的账户已被停用。' },
    },
    withCustomIcon: {
      title: '身份已验证',
      body: '你的身份已验证。你现在拥有完整的账户访问权限。',
    },
    withAction: {
      warning: {
        title: '免费试用将于 2 天后到期',
        body: '升级你的方案以在试用结束后继续使用所有功能。',
        dismiss: '关闭',
        upgrade: '立即升级',
      },
      danger: {
        title: '邮箱未验证',
        body: '请验证你的邮箱地址以解锁全部账户功能。',
        skip: '暂不处理',
        send: '发送邮件',
      },
      info: {
        title: '新功能已上线',
        body: '我们已为仪表盘、报表和导出功能带来改进。',
        view: '查看更新日志',
      },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas decorator — neutral dot-grid, alerts float above ───────────────────
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

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    title: { control: 'text' },
    icon: { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
  args: {
    variant: 'info',
    size: 'md',
    title: 'Informational alert',
    icon: true,
    dismissible: false,
  },
}
export default meta
type Story = StoryObj<typeof Alert>

const W = 'width:440px;max-width:100%;display:flex;flex-direction:column;gap:10px;'

// Inline text-link style (no solid buttons — matches macOS notification)
const lP =
  'background:none;border:none;padding:0;cursor:pointer;font-size:13px;font-weight:600;color:var(--color-text-primary);letter-spacing:-0.01em;'
const lM =
  'background:none;border:none;padding:0;cursor:pointer;font-size:13px;font-weight:400;color:var(--color-text-tertiary);letter-spacing:-0.01em;'
const lD =
  'background:color-mix(in oklab, var(--color-danger) 10%, transparent);border:1px solid color-mix(in oklab, var(--color-danger) 35%, transparent);padding:4px 10px;border-radius:999px;cursor:pointer;font-size:13px;font-weight:600;color:var(--color-danger-hover) !important;letter-spacing:-0.01em;line-height:1.2;'

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args, copy: useCopy() }),
    template: `<div style="${W}"><Alert v-bind="{ ...args, title: copy.default.title }">{{ copy.default.context }}</Alert></div>`,
  }),
}

// ── All Variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  get name() {
    return getStoryName('allVariants')
  },
  render: () => ({
    components: { Alert },
    template: `
      <div style="${W}">
        <Alert variant="info" :title="copy.allVariants.info.title">
          {{ copy.allVariants.info.desc }}
        </Alert>
        <Alert variant="success" :title="copy.allVariants.success.title">
          {{ copy.allVariants.success.desc }}
        </Alert>
        <Alert variant="warning" :title="copy.allVariants.warning.title">
          {{ copy.allVariants.warning.desc }}
        </Alert>
        <Alert variant="danger" :title="copy.allVariants.danger.title">
          {{ copy.allVariants.danger.desc }}
        </Alert>
      </div>
    `,
    setup: () => ({ copy: useCopy() }),
  }),
}

// ── All Sizes ─────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Alert },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="${W} gap:16px;">
        <div v-for="s in copy.allSizes" :key="s.key" style="display:flex;flex-direction:column;gap:6px;">
          <span style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(0,0,0,0.35);">{{ s.label }}</span>
          <Alert variant="info" :size="s.key" :title="s.label">{{ s.body }}</Alert>
        </div>
      </div>
    `,
  }),
}

// ── Dismissible ───────────────────────────────────────────────────────────────

export const Dismissible: Story = {
  get name() {
    return getStoryName('dismissible')
  },
  render: () => ({
    components: { Alert },
    setup() {
      const show = ref(true)
      return { show, copy: useCopy() }
    },
    template: `
      <div style="${W}">
        <Alert v-if="show" variant="warning" :title="copy.dismissible.title" dismissible @dismiss="show = false">
          {{ copy.dismissible.body }}
        </Alert>
        <button v-else style="font-size:13px;color:var(--color-text-tertiary);cursor:pointer;background:none;border:none;" @click="show = true">
          {{ copy.dismissible.showAgain }}
        </button>
      </div>
    `,
  }),
}

// ── Dismissible — All Variants ────────────────────────────────────────────────

export const DismissibleAllVariants: Story = {
  get name() {
    return getStoryName('dismissibleAllVariants')
  },
  render: () => ({
    components: { Alert },
    setup() {
      const visible = ref({ info: true, success: true, warning: true, danger: true })
      const resetAll = () => {
        visible.value = { info: true, success: true, warning: true, danger: true }
      }
      return { visible, resetAll, copy: useCopy() }
    },
    template: `
      <div style="${W}">
        <Alert v-if="visible.info"    variant="info"    :title="copy.dismissibleAllVariants.info.title"    dismissible @dismiss="visible.info = false">{{ copy.dismissibleAllVariants.info.body }}</Alert>
        <Alert v-if="visible.success" variant="success" :title="copy.dismissibleAllVariants.success.title" dismissible @dismiss="visible.success = false">{{ copy.dismissibleAllVariants.success.body }}</Alert>
        <Alert v-if="visible.warning" variant="warning" :title="copy.dismissibleAllVariants.warning.title" dismissible @dismiss="visible.warning = false">{{ copy.dismissibleAllVariants.warning.body }}</Alert>
        <Alert v-if="visible.danger"  variant="danger"  :title="copy.dismissibleAllVariants.danger.title"  dismissible @dismiss="visible.danger = false">{{ copy.dismissibleAllVariants.danger.body }}</Alert>
        <button style="font-size:12px;color:var(--color-text-tertiary);margin-top:4px;cursor:pointer;background:none;border:none;" @click="resetAll">{{ copy.dismissibleAllReset }}</button>
      </div>
    `,
  }),
}

// ── Without Title ─────────────────────────────────────────────────────────────

export const WithoutTitle: Story = {
  get name() {
    return getStoryName('withoutTitle')
  },
  render: () => ({
    components: { Alert },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="${W}">
        <Alert variant="info" :title="copy.withoutTitle.info" />
        <Alert variant="success" :title="copy.withoutTitle.success" />
        <Alert variant="warning" :title="copy.withoutTitle.warning" />
        <Alert variant="danger" :title="copy.withoutTitle.danger" />
      </div>
    `,
  }),
}

// ── Without Icon ──────────────────────────────────────────────────────────────

export const WithoutIcon: Story = {
  get name() {
    return getStoryName('withoutIcon')
  },
  render: () => ({
    components: { Alert },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="${W}">
        <Alert variant="info" :title="copy.withoutIcon.info.title" :icon="false">{{ copy.withoutIcon.info.body }}</Alert>
        <Alert variant="danger" :title="copy.withoutIcon.danger.title" :icon="false">{{ copy.withoutIcon.danger.body }}</Alert>
      </div>
    `,
  }),
}

// ── With Custom Icon ──────────────────────────────────────────────────────────

export const WithCustomIcon: Story = {
  get name() {
    return getStoryName('withCustomIcon')
  },
  render: () => ({
    components: { Alert, RiShieldCheckLine },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="${W}">
        <Alert variant="success" :title="copy.withCustomIcon.title">
          <template #icon><RiShieldCheckLine :size="'16'" /></template>
          {{ copy.withCustomIcon.body }}
        </Alert>
      </div>
    `,
  }),
}

// ── With Actions ─────────────────────────────────────────────────────────────

export const WithAction: Story = {
  get name() {
    return getStoryName('withAction')
  },
  render: () => ({
    components: { Alert },
    setup: () => ({ lP, lM, lD, copy: useCopy() }),
    template: `
      <div style="${W}">
        <Alert variant="warning" :title="copy.withAction.warning.title">
          {{ copy.withAction.warning.body }}
          <template #action>
            <button :style="lM">{{ copy.withAction.warning.dismiss }}</button>
            <button :style="lP">{{ copy.withAction.warning.upgrade }}</button>
          </template>
        </Alert>
        <Alert variant="danger" :title="copy.withAction.danger.title" dismissible>
          {{ copy.withAction.danger.body }}
          <template #action>
            <button :style="lM">{{ copy.withAction.danger.skip }}</button>
            <button :style="lD">{{ copy.withAction.danger.send }}</button>
          </template>
        </Alert>
        <Alert variant="info" :title="copy.withAction.info.title">
          {{ copy.withAction.info.body }}
          <template #action>
            <button :style="lP">{{ copy.withAction.info.view }}</button>
          </template>
        </Alert>
      </div>
    `,
  }),
}
