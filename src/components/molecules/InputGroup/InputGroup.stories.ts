import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import InputGroup from './InputGroup.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    withSearch: string
    urlInput: string
    promoCode: string
    allPatterns: string
  }
  newsletter: {
    label: string
    placeholder: string
    button: string
    helper: string
  }
  search: {
    label: string
    placeholder: string
    button: string
  }
  url: {
    label: string
    placeholder: string
    helperPrefix: string
  }
  promo: {
    label: string
    placeholder: string
    apply: string
    success: string
    error: string
  }
  patterns: {
    first: string
    second: string
    third: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Email Subscribe',
      withSearch: 'Search Bar',
      urlInput: 'URL Builder',
      promoCode: 'Promo Code',
      allPatterns: 'All Patterns',
    },
    newsletter: {
      label: 'Newsletter',
      placeholder: 'Enter your email address',
      button: 'Subscribe',
      helper: 'No spam. Unsubscribe anytime.',
    },
    search: {
      label: 'Guest Search',
      placeholder: 'Search guests...',
      button: 'Search',
    },
    url: {
      label: 'Custom Invitation URL',
      placeholder: 'syrofi-nadira-2025',
      helperPrefix: 'Your link:',
    },
    promo: {
      label: 'Promo Code',
      placeholder: 'Enter code (try SAVE20)',
      apply: 'Apply',
      success: '20% discount applied',
      error: 'Code not found. Try SAVE20.',
    },
    patterns: {
      first: 'Input -> Button (right)',
      second: 'Button -> Input (prefix)',
      third: 'Button -> Input -> Button (wrap)',
    },
  },
  id: {
    storyNames: {
      default: 'Berlangganan Email',
      withSearch: 'Bilah Pencarian',
      urlInput: 'Pembuat URL',
      promoCode: 'Kode Promo',
      allPatterns: 'Semua Pola',
    },
    newsletter: {
      label: 'Buletin',
      placeholder: 'Masukkan alamat email Anda',
      button: 'Berlangganan',
      helper: 'Tanpa spam. Berhenti berlangganan kapan saja.',
    },
    search: {
      label: 'Cari Tamu',
      placeholder: 'Cari tamu...',
      button: 'Cari',
    },
    url: {
      label: 'URL Undangan Kustom',
      placeholder: 'syrofi-nadira-2025',
      helperPrefix: 'Tautan Anda:',
    },
    promo: {
      label: 'Kode Promo',
      placeholder: 'Masukkan kode (coba SAVE20)',
      apply: 'Terapkan',
      success: 'Diskon 20% diterapkan',
      error: 'Kode tidak ditemukan. Coba SAVE20.',
    },
    patterns: {
      first: 'Input -> Tombol (kanan)',
      second: 'Tombol -> Input (awalan)',
      third: 'Tombol -> Input -> Tombol (wrap)',
    },
  },
  zh: {
    storyNames: {
      default: '邮件订阅',
      withSearch: '搜索栏',
      urlInput: 'URL 构建器',
      promoCode: '优惠码',
      allPatterns: '所有模式',
    },
    newsletter: {
      label: '简报',
      placeholder: '输入你的电子邮箱地址',
      button: '订阅',
      helper: '无垃圾邮件。可随时取消订阅。',
    },
    search: {
      label: '宾客搜索',
      placeholder: '搜索宾客...',
      button: '搜索',
    },
    url: {
      label: '自定义邀请链接',
      placeholder: 'syrofi-nadira-2025',
      helperPrefix: '你的链接：',
    },
    promo: {
      label: '优惠码',
      placeholder: '输入代码（试试 SAVE20）',
      apply: '应用',
      success: '已应用 20% 折扣',
      error: '未找到代码。试试 SAVE20。',
    },
    patterns: {
      first: '输入 -> 按钮（右侧）',
      second: '按钮 -> 输入（前缀）',
      third: '按钮 -> 输入 -> 按钮（换行）',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const withCanvas = () => ({
  template: `
    <div style="
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:48px 32px;background-color:var(--color-bg);
      background-image:radial-gradient(circle,var(--color-border) 1px,transparent 1px);
      background-size:24px 24px;
    "><story /></div>`,
})

const meta: Meta<typeof InputGroup> = {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof InputGroup>

// ── Email Subscribe ───────────────────────────────────────────────────────────
export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() {
      return { email: ref(''), copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:480px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.newsletter.label }}</p>
        <InputGroup>
          <Input v-model="email" :placeholder="copy.newsletter.placeholder" type="email" />
          <Button>{{ copy.newsletter.button }}</Button>
        </InputGroup>
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">{{ copy.newsletter.helper }}</p>
      </div>
    `,
  }),
}

// ── Search ────────────────────────────────────────────────────────────────────
export const WithSearch: Story = {
  get name() {
    return getStoryName('withSearch')
  },
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() {
      return { q: ref(''), copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:480px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.search.label }}</p>
        <InputGroup>
          <Input v-model="q" :placeholder="copy.search.placeholder" />
          <Button variant="secondary">{{ copy.search.button }}</Button>
        </InputGroup>
      </div>
    `,
  }),
}

// ── URL Builder ───────────────────────────────────────────────────────────────
export const URLInput: Story = {
  get name() {
    return getStoryName('urlInput')
  },
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() {
      return { slug: ref(''), copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:480px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.url.label }}</p>
        <InputGroup>
          <Button variant="secondary">undangan.id/</Button>
          <Input v-model="slug" :placeholder="copy.url.placeholder" />
        </InputGroup>
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">
          {{ copy.url.helperPrefix }}
          <span style="color:var(--color-text-primary);font-weight:500;">
            undangan.id/{{ slug || copy.url.placeholder }}
          </span>
        </p>
      </div>
    `,
  }),
}

// ── Promo Code ────────────────────────────────────────────────────────────────
export const PromoCode: Story = {
  get name() {
    return getStoryName('promoCode')
  },
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() {
      const code = ref('')
      const status = ref<'idle' | 'ok' | 'error'>('idle')
      function apply() {
        status.value = code.value.toUpperCase() === 'SAVE20' ? 'ok' : 'error'
      }
      return { code, status, apply, copy: useCopy() }
    },
    template: `
      <div style="width:100%;max-width:380px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.promo.label }}</p>
        <InputGroup :error="status === 'error'">
          <Input
            v-model="code"
            :placeholder="copy.promo.placeholder"
          />
          <Button @click="apply">{{ copy.promo.apply }}</Button>
        </InputGroup>
        <p v-if="status === 'ok'" style="font-size:12px;color:var(--color-success);margin-top:6px;font-weight:500;">✓ {{ copy.promo.success }}</p>
        <p v-else-if="status === 'error'" style="font-size:12px;color:var(--color-danger);margin-top:6px;">{{ copy.promo.error }}</p>
      </div>
    `,
  }),
}

// ── All Patterns ──────────────────────────────────────────────────────────────
export const AllPatterns: Story = {
  get name() {
    return getStoryName('allPatterns')
  },
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() {
      return { v1: ref(''), v2: ref(''), v3: ref(''), copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:480px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.patterns.first }}</p>
          <InputGroup>
            <Input v-model="v1" placeholder="your@email.com" type="email" />
            <Button>{{ copy.newsletter.button }}</Button>
          </InputGroup>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.patterns.second }}</p>
          <InputGroup>
            <Button variant="secondary">undangan.id/</Button>
            <Input v-model="v2" :placeholder="copy.url.placeholder" />
          </InputGroup>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">{{ copy.patterns.third }}</p>
          <InputGroup>
            <Button variant="secondary">https://</Button>
            <Input v-model="v3" placeholder="yourdomain.com" />
            <Button variant="secondary">/rsvp</Button>
          </InputGroup>
        </div>
      </div>
    `,
  }),
}
