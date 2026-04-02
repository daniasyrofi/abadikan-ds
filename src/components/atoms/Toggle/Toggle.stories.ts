import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Toggle from './Toggle.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allSizes: string
    onOff: string
    disabled: string
    settingsPanel: string
    withLabel: string
    allColors: string
  }
  sizeLabels: Record<'sm' | 'md' | 'lg', string>
  labels: {
    toggle: string
    on: string
    off: string
    disabledOff: string
    disabledOn: string
    preferences: string
    pushNotifications: string
    getNotified: string
    emailUpdates: string
    weeklyDigest: string
    usageAnalytics: string
    helpImprove: string
    twoFactorAuth: string
    extraLoginSecurity: string
    receiveNotifications: string
    statusEnabled: string
    statusDisabled: string
    primary: string
    secondary: string
    neutral: string
    danger: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allSizes: 'All Sizes',
      onOff: 'On / Off',
      disabled: 'Disabled',
      settingsPanel: 'Settings Panel',
      withLabel: 'With Label',
      allColors: 'All Colors',
    },
    sizeLabels: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
    labels: {
      toggle: 'Toggle',
      on: 'On',
      off: 'Off',
      disabledOff: 'Disabled off',
      disabledOn: 'Disabled on',
      preferences: 'Preferences',
      pushNotifications: 'Push notifications',
      getNotified: 'Get notified about activity',
      emailUpdates: 'Email updates',
      weeklyDigest: 'Weekly digest emails',
      usageAnalytics: 'Usage analytics',
      helpImprove: 'Help improve the product',
      twoFactorAuth: 'Two-factor auth',
      extraLoginSecurity: 'Extra login security',
      receiveNotifications: 'Receive notifications',
      statusEnabled: 'Status: Enabled',
      statusDisabled: 'Status: Disabled',
      primary: 'Primary - Brand Pink',
      secondary: 'Secondary',
      neutral: 'Neutral - Black',
      danger: 'Danger - Red',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allSizes: 'Semua Ukuran',
      onOff: 'Nyala / Mati',
      disabled: 'Dinonaktifkan',
      settingsPanel: 'Panel Pengaturan',
      withLabel: 'Dengan Label',
      allColors: 'Semua Warna',
    },
    sizeLabels: {
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
    },
    labels: {
      toggle: 'Sakelar',
      on: 'Nyala',
      off: 'Mati',
      disabledOff: 'Mati dinonaktifkan',
      disabledOn: 'Nyala dinonaktifkan',
      preferences: 'Preferensi',
      pushNotifications: 'Notifikasi dorong',
      getNotified: 'Dapatkan notifikasi tentang aktivitas',
      emailUpdates: 'Pembaruan email',
      weeklyDigest: 'Email ringkasan mingguan',
      usageAnalytics: 'Analitik penggunaan',
      helpImprove: 'Bantu tingkatkan produk',
      twoFactorAuth: 'Otentikasi dua faktor',
      extraLoginSecurity: 'Keamanan login ekstra',
      receiveNotifications: 'Terima notifikasi',
      statusEnabled: 'Status: Aktif',
      statusDisabled: 'Status: Nonaktif',
      primary: 'Utama - Pink Merek',
      secondary: 'Sekunder',
      neutral: 'Netral - Hitam',
      danger: 'Bahaya - Merah',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allSizes: '全部尺寸',
      onOff: '开 / 关',
      disabled: '禁用',
      settingsPanel: '设置面板',
      withLabel: '带标签',
      allColors: '全部颜色',
    },
    sizeLabels: {
      sm: '小',
      md: '中',
      lg: '大',
    },
    labels: {
      toggle: '切换',
      on: '开',
      off: '关',
      disabledOff: '禁用关闭',
      disabledOn: '禁用开启',
      preferences: '偏好设置',
      pushNotifications: '推送通知',
      getNotified: '获取活动通知',
      emailUpdates: '邮件更新',
      weeklyDigest: '每周摘要邮件',
      usageAnalytics: '使用分析',
      helpImprove: '帮助改进产品',
      twoFactorAuth: '双因素认证',
      extraLoginSecurity: '额外登录安全',
      receiveNotifications: '接收通知',
      statusEnabled: '状态：已启用',
      statusDisabled: '状态：已禁用',
      primary: '主要 - 品牌粉',
      secondary: '次要',
      neutral: '中性 - 黑色',
      danger: '危险 - 红色',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'switchAlt' },
  argTypes: {
    modelValue: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    modelValue: false,
    size: 'md',
    disabled: false,
    label: '',
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args: any) => ({
    components: { Toggle },
    setup() {
      const copy = useCopy()
      const val = ref(args.modelValue ?? false)
      const resolvedArgs = computed(() => ({
        ...args,
        label: args.label || copy.value.labels.toggle,
      }))
      return { resolvedArgs, val }
    },
    template: '<Toggle v-bind="resolvedArgs" v-model="val" />',
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Toggle },
    setup: () => ({
      copy: useCopy(),
      sm: ref(true),
      md: ref(true),
      lg: ref(true),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Toggle v-model="sm" size="sm" :label="copy.sizeLabels.sm" />
        <Toggle v-model="md" size="md" :label="copy.sizeLabels.md" />
        <Toggle v-model="lg" size="lg" :label="copy.sizeLabels.lg" />
      </div>
    `,
  }),
}

export const OnOff: Story = {
  get name() {
    return getStoryName('onOff')
  },
  render: () => ({
    components: { Toggle },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;gap:24px;align-items:center;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Toggle :model-value="true" :label="copy.labels.on" />
          <span style="font-size:12px;color:var(--color-text-secondary);">{{ copy.labels.on }}</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Toggle :model-value="false" :label="copy.labels.off" />
          <span style="font-size:12px;color:var(--color-text-secondary);">{{ copy.labels.off }}</span>
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { Toggle },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Toggle :model-value="false" disabled :label="copy.labels.disabledOff" />
        <Toggle :model-value="true"  disabled :label="copy.labels.disabledOn" />
      </div>
    `,
  }),
}

export const SettingsPanel: Story = {
  get name() {
    return getStoryName('settingsPanel')
  },
  render: () => ({
    components: { Toggle },
    setup() {
      const copy = useCopy()
      const settings = ref({
        notifications: true,
        emails: false,
        dark: false,
        analytics: true,
        twoFactor: false,
      })
      return { copy, settings }
    },
    template: `
      <div style="width:320px;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:var(--color-surface);overflow:hidden;">
        <div style="padding:14px 16px;border-bottom:1px solid var(--color-border);">
          <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ copy.labels.preferences }}</p>
        </div>
        <div style="display:flex;flex-direction:column;">
          <div v-for="([key, label, desc], index) in [
            ['notifications', copy.labels.pushNotifications, copy.labels.getNotified],
            ['emails',        copy.labels.emailUpdates,      copy.labels.weeklyDigest],
            ['analytics',     copy.labels.usageAnalytics,    copy.labels.helpImprove],
            ['twoFactor',     copy.labels.twoFactorAuth,     copy.labels.extraLoginSecurity],
          ]" :key="key" :style="{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom: index < 3 ? '1px solid var(--color-border)' : 'none' }">
            <div>
              <p style="font-size:14px;font-weight:500;color:var(--color-text-primary);">{{ label }}</p>
              <p style="font-size:12px;color:var(--color-text-secondary);margin-top:2px;">{{ desc }}</p>
            </div>
            <Toggle v-model="settings[key]" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  get name() {
    return getStoryName('withLabel')
  },
  render: () => ({
    components: { Toggle },
    setup: () => ({ copy: useCopy(), active: ref(true) }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Toggle v-model="active" :label="copy.labels.receiveNotifications" />
        <p style="font-size:13px;color:var(--color-text-secondary);">{{ active ? copy.labels.statusEnabled : copy.labels.statusDisabled }}</p>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  get name() {
    return getStoryName('allColors')
  },
  render: () => ({
    components: { Toggle },
    setup: () => ({
      copy: useCopy(),
      val: ref(true),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Toggle v-model="val" color="primary" :label="copy.labels.primary" />
        <Toggle v-model="val" color="secondary" :label="copy.labels.secondary" />
        <Toggle v-model="val" color="neutral" :label="copy.labels.neutral" />
        <Toggle v-model="val" color="danger" :label="copy.labels.danger" />
      </div>
    `,
  }),
}
