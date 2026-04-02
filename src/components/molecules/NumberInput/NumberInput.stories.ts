import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import NumberInput from './NumberInput.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    guestCount: string
    stepValues: string
    allSizes: string
    disabled: string
  }
  cart: {
    title: string
    package: string
    quantity: string
    total: string
  }
  eventPlanning: {
    label: string
    title: string
    subtitle: string
    guests: string
    tables: string
  }
  stepValues: {
    decimal: string
    large: string
    tempLabel: string
    tempValue: string
    budgetLabel: string
  }
  allSizes: {
    small: string
    medium: string
    large: string
  }
  disabled: {
    label: string
    helper: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Cart Quantity',
      guestCount: 'Guest Count',
      stepValues: 'Step Values',
      allSizes: 'All Sizes',
      disabled: 'Disabled',
    },
    cart: {
      title: 'Premium Digital Invitation',
      package: 'Complete Package',
      quantity: 'Quantity',
      total: 'Total',
    },
    eventPlanning: {
      label: 'Event Planning',
      title: 'Guest Estimate',
      subtitle: 'Enter the estimated number of invited guests',
      guests: 'Guests',
      tables: 'Tables',
    },
    stepValues: {
      decimal: 'Decimal step (0.5)',
      large: 'Large step (500000)',
      tempLabel: 'Room Temperature (°C)',
      tempValue: 'Value',
      budgetLabel: 'Budget (Rp)',
    },
    allSizes: {
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
    },
    disabled: {
      label: 'Locked',
      helper: 'Value is locked and cannot be changed.',
    },
  },
  id: {
    storyNames: {
      default: 'Jumlah Keranjang',
      guestCount: 'Jumlah Tamu',
      stepValues: 'Nilai Langkah',
      allSizes: 'Semua Ukuran',
      disabled: 'Nonaktif',
    },
    cart: {
      title: 'Undangan Digital Premium',
      package: 'Paket Lengkap',
      quantity: 'Jumlah',
      total: 'Total',
    },
    eventPlanning: {
      label: 'Perencanaan Acara',
      title: 'Perkiraan Tamu',
      subtitle: 'Masukkan estimasi jumlah tamu undangan',
      guests: 'Tamu',
      tables: 'Meja',
    },
    stepValues: {
      decimal: 'Langkah desimal (0.5)',
      large: 'Langkah besar (500000)',
      tempLabel: 'Suhu Ruangan (°C)',
      tempValue: 'Nilai',
      budgetLabel: 'Anggaran (Rp)',
    },
    allSizes: {
      small: 'Kecil',
      medium: 'Sedang',
      large: 'Besar',
    },
    disabled: {
      label: 'Terkunci',
      helper: 'Nilai dikunci, tidak dapat diubah.',
    },
  },
  zh: {
    storyNames: {
      default: '购物车数量',
      guestCount: '宾客数量',
      stepValues: '步进值',
      allSizes: '所有尺寸',
      disabled: '禁用',
    },
    cart: {
      title: '高级电子邀请函',
      package: '完整套餐',
      quantity: '数量',
      total: '合计',
    },
    eventPlanning: {
      label: '活动规划',
      title: '宾客预估',
      subtitle: '输入预计受邀宾客数量',
      guests: '宾客',
      tables: '桌',
    },
    stepValues: {
      decimal: '小数步进 (0.5)',
      large: '大步进 (500000)',
      tempLabel: '室温 (°C)',
      tempValue: '数值',
      budgetLabel: '预算 (Rp)',
    },
    allSizes: {
      small: '小',
      medium: '中',
      large: '大',
    },
    disabled: {
      label: '已锁定',
      helper: '数值已锁定，无法更改。',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas decorator ───────────────────────────────────────────────────────────
const withCanvas = () => ({
  template: `
    <div style="
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:48px 32px;background-color:var(--color-bg);
      background-image:radial-gradient(circle,var(--color-border) 1px,transparent 1px);
      background-size:24px 24px;
    "><story /></div>`,
})

const meta: Meta<typeof NumberInput> = {
  title: 'Molecules/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    modelValue: 1,
    min: 0,
    step: 1,
    size: 'md',
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof NumberInput>

// ── Cart Quantity ──────────────────────────────────────────────────────────────
export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: () => ({
    components: { NumberInput },
    setup() {
      const qty = ref(1)
      const unitPrice = 480000
      const total = computed(() => (qty.value * unitPrice).toLocaleString('id-ID'))
      return { qty, total, copy: useCopy() }
    },
    template: `
      <div style="
        background:var(--color-surface);border-radius:var(--radius-xl);
        border:1px solid var(--color-border);padding:20px;width:100%;max-width:360px;
        display:flex;flex-direction:column;gap:16px;
      ">
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <div style="
            width:64px;height:64px;border-radius:var(--radius-lg);flex-shrink:0;
            background:var(--color-neutral-light);display:flex;align-items:center;justify-content:center;
            font-size:24px;
          ">🎴</div>
          <div style="flex:1;min-width:0;">
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);margin-bottom:2px;">{{ copy.cart.title }}</p>
            <p style="font-size:12px;color:var(--color-text-tertiary);">{{ copy.cart.package }}</p>
            <p style="font-size:14px;font-weight:700;color:var(--color-text-primary);margin-top:6px;">
              Rp 480.000
            </p>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--color-border-subtle);">
          <div style="width:140px;">
            <NumberInput v-model="qty" :min="1" :max="10" :label="copy.cart.quantity" />
          </div>
          <div style="text-align:right;">
            <p style="font-size:11px;color:var(--color-text-tertiary);margin-bottom:2px;">{{ copy.cart.total }}</p>
            <p style="font-size:16px;font-weight:700;color:var(--color-text-heading);">Rp {{ total }}</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Guest Count ────────────────────────────────────────────────────────────────
export const GuestCount: Story = {
  get name() {
    return getStoryName('guestCount')
  },
  render: () => ({
    components: { NumberInput },
    setup() {
      const guests = ref(50)
      const perTable = 8
      const tables = computed(() => Math.ceil(guests.value / perTable))
      return { guests, tables, copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:380px;display:flex;flex-direction:column;gap:16px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.eventPlanning.label }}</p>
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);padding:20px;
          display:flex;flex-direction:column;gap:16px;
        ">
          <div>
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);margin-bottom:4px;">{{ copy.eventPlanning.title }}</p>
            <p style="font-size:12px;color:var(--color-text-secondary);">{{ copy.eventPlanning.subtitle }}</p>
          </div>
          <NumberInput v-model="guests" :min="10" :max="500" :step="5" :label="copy.eventPlanning.title" />
          <div style="
            display:grid;grid-template-columns:1fr 1fr;gap:10px;
            padding-top:12px;border-top:1px solid var(--color-border-subtle);
          ">
            <div style="padding:12px;background:var(--color-neutral-light);border-radius:var(--radius-lg);text-align:center;">
              <p style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.02em;">{{ guests }}</p>
              <p style="font-size:11px;color:var(--color-text-tertiary);margin-top:2px;">{{ copy.eventPlanning.guests }}</p>
            </div>
            <div style="padding:12px;background:var(--color-neutral-light);border-radius:var(--radius-lg);text-align:center;">
              <p style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.02em;">{{ tables }}</p>
              <p style="font-size:11px;color:var(--color-text-tertiary);margin-top:2px;">{{ copy.eventPlanning.tables }}</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Step Values ────────────────────────────────────────────────────────────────
export const StepValues: Story = {
  get name() {
    return getStoryName('stepValues')
  },
  render: () => ({
    components: { NumberInput },
    setup() {
      const temp = ref(22.5)
      const budget = ref(5000000)
      return { temp, budget, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:100%;max-width:280px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.stepValues.decimal }}</p>
          <NumberInput v-model="temp" :label="copy.stepValues.tempLabel" :min="-10" :max="40" :step="0.5" />
          <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">{{ copy.stepValues.tempValue }}: {{ temp }}°C</p>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.stepValues.large }}</p>
          <NumberInput v-model="budget" :label="copy.stepValues.budgetLabel" :min="0" :max="50000000" :step="500000" />
          <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">
            Rp {{ budget.toLocaleString('id-ID') }}
          </p>
        </div>
      </div>
    `,
  }),
}

// ── All Sizes ──────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { NumberInput },
    setup() {
      const sm = ref(2)
      const md = ref(5)
      const lg = ref(8)
      return { sm, md, lg, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:200px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.allSizes.small }}</p>
          <NumberInput v-model="sm" size="sm" :label="copy.allSizes.small" :min="0" :max="10" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.allSizes.medium }}</p>
          <NumberInput v-model="md" size="md" :label="copy.allSizes.medium" :min="0" :max="10" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.allSizes.large }}</p>
          <NumberInput v-model="lg" size="lg" :label="copy.allSizes.large" :min="0" :max="10" />
        </div>
      </div>
    `,
  }),
}

// ── Disabled ───────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { NumberInput },
    setup() {
      return { val: ref(3), copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:200px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.disabled.label }}</p>
        <NumberInput v-model="val" :label="copy.disabled.label" :min="0" :max="10" disabled />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">
          {{ copy.disabled.helper }}
        </p>
      </div>
    `,
  }),
}
