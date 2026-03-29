import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import Navbar from './Navbar.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type LocaleText = {
  brand: string
  links: {
    home: string
    products: string
    about: string
  }
  actionTitles: {
    theme: string
    language: string
    avatar: string
  }
  stickyHint: string
  storyNames: {
    default: string
    transparent: string
    colored: string
    sticky: string
  }
  docs: {
    categoryProps: string
    propNames: {
      variant: string
      sticky: string
      border: string
      title: string
    }
    descriptions: {
      variant: string
      sticky: string
      border: string
      title: string
    }
  }
}

const localeText: Record<Locale, LocaleText> = {
  en: {
    brand: 'Acme',
    links: {
      home: 'Home',
      products: 'Products',
      about: 'About',
    },
    actionTitles: {
      theme: 'Theme toggle',
      language: 'Language toggle',
      avatar: 'User avatar',
    },
    stickyHint: 'Scroll down to see the sticky navbar remain at the top. The content below is just filler for the demo.',
    storyNames: {
      default: 'Default',
      transparent: 'Transparent',
      colored: 'Colored',
      sticky: 'Sticky',
    },
    docs: {
      categoryProps: 'Props',
      propNames: {
        variant: 'variant',
        sticky: 'sticky',
        border: 'border',
        title: 'title',
      },
      descriptions: {
        variant: 'Navbar visual variant',
        sticky: 'Keep the navbar pinned to the top while scrolling',
        border: 'Show a bottom border in the default variant',
        title: 'Brand or page title shown in the start slot',
      },
    },
  },
  id: {
    brand: 'Acme',
    links: {
      home: 'Beranda',
      products: 'Produk',
      about: 'Tentang',
    },
    actionTitles: {
      theme: 'Beralih tema',
      language: 'Beralih bahasa',
      avatar: 'Avatar pengguna',
    },
    stickyHint: 'Gulir ke bawah untuk melihat navbar sticky tetap berada di bagian atas. Konten di bawah ini hanya pengisi untuk demo.',
    storyNames: {
      default: 'Bawaan',
      transparent: 'Transparan',
      colored: 'Berwarna',
      sticky: 'Menempel',
    },
    docs: {
      categoryProps: 'Properti',
      propNames: {
        variant: 'varian',
        sticky: 'menempel',
        border: 'batas',
        title: 'judul',
      },
      descriptions: {
        variant: 'Varian visual navbar',
        sticky: 'Tetap menempel di bagian atas saat digulir',
        border: 'Tampilkan garis bawah pada varian bawaan',
        title: 'Nama merek atau judul halaman yang ditampilkan di slot awal',
      },
    },
  },
  zh: {
    brand: 'Acme',
    links: {
      home: '首页',
      products: '产品',
      about: '关于',
    },
    actionTitles: {
      theme: '切换主题',
      language: '切换语言',
      avatar: '用户头像',
    },
    stickyHint: '向下滚动以查看固定导航栏保持在顶部。下方内容只是演示用的占位文本。',
    storyNames: {
      default: '默认',
      transparent: '透明',
      colored: '彩色',
      sticky: '吸顶',
    },
    docs: {
      categoryProps: '属性',
      propNames: {
        variant: '变体',
        sticky: '吸顶',
        border: '边框',
        title: '标题',
      },
      descriptions: {
        variant: '导航栏视觉变体',
        sticky: '滚动时固定在顶部',
        border: '在默认变体中显示底部边框',
        title: '在起始槽中显示的品牌或页面标题',
      },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => localeText[getLocale()])
const getStoryName = (key: keyof LocaleText['storyNames']) => localeText[getLocale()].storyNames[key]

const buildArgTypes = (locale: Locale): NonNullable<Meta<typeof Navbar>['argTypes']> => {
  const copy = localeText[locale]
  return {
    variant: {
      name: copy.docs.propNames.variant,
      description: copy.docs.descriptions.variant,
      control: { type: 'select' },
      options: ['default', 'transparent', 'colored'],
      table: {
        category: copy.docs.categoryProps,
      },
    },
    sticky: {
      name: copy.docs.propNames.sticky,
      description: copy.docs.descriptions.sticky,
      control: 'boolean',
      table: {
        category: copy.docs.categoryProps,
      },
    },
    border: {
      name: copy.docs.propNames.border,
      description: copy.docs.descriptions.border,
      control: 'boolean',
      table: {
        category: copy.docs.categoryProps,
      },
    },
    title: {
      name: copy.docs.propNames.title,
      description: copy.docs.descriptions.title,
      control: 'text',
      table: {
        category: copy.docs.categoryProps,
      },
    },
  }
}

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  decorators: [
    (story, context) => {
      const locale = resolveLocale(context.globals.locale)
      ;(context as { argTypes: Record<string, unknown> }).argTypes = {
        ...(context.argTypes as Record<string, unknown>),
        ...(buildArgTypes(locale) as Record<string, unknown>),
      }
      return story()
    },
    () => ({
      template: '<div style="width:100%;min-width:640px;"><story /></div>',
    }),
  ],
  argTypes: buildArgTypes('en'),
  args: {
    variant: 'default',
    sticky:  false,
    border:  true,
    title:   '',
  },
}
export default meta
type Story = StoryObj<typeof Navbar>

// ── Shared slot helpers ────────────────────────────────────────────────────────

const navLinks = `
  <template #center>
    <nav style="display:flex;align-items:center;gap:4px;">
      <a href="#" style="
        padding:6px 12px;font-size:14px;font-weight:500;
        border-radius:var(--radius-md);color:var(--color-text-primary);
        text-decoration:none;transition:background 0.15s;
      ">{{ copy.links.home }}</a>
      <a href="#" style="
        padding:6px 12px;font-size:14px;font-weight:500;
        border-radius:var(--radius-md);color:var(--color-text-primary);
        text-decoration:none;transition:background 0.15s;
      ">{{ copy.links.products }}</a>
      <a href="#" style="
        padding:6px 12px;font-size:14px;font-weight:500;
        border-radius:var(--radius-md);color:var(--color-text-primary);
        text-decoration:none;transition:background 0.15s;
      ">{{ copy.links.about }}</a>
    </nav>
  </template>
`

const actions = `
  <template #end>
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="
        width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
        background:var(--color-neutral-light);display:flex;align-items:center;
        justify-content:center;font-size:12px;color:var(--color-text-secondary);
      " :title="copy.actionTitles.theme">T</div>
      <div style="
        width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
        background:var(--color-neutral-light);display:flex;align-items:center;
        justify-content:center;font-size:12px;color:var(--color-text-secondary);
      " :title="copy.actionTitles.language">ID</div>
      <div style="
        width:32px;height:32px;border-radius:9999px;flex-shrink:0;
        background:var(--color-primary-light);display:flex;align-items:center;
        justify-content:center;font-size:12px;font-weight:600;color:var(--color-primary);
      " :title="copy.actionTitles.avatar">A</div>
    </div>
  </template>
`

const coloredActions = `
  <template #end>
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="
        width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
        background:rgba(255,255,255,0.1);display:flex;align-items:center;
        justify-content:center;font-size:12px;color:white;
      " :title="copy.actionTitles.theme">T</div>
      <div style="
        width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
        background:rgba(255,255,255,0.1);display:flex;align-items:center;
        justify-content:center;font-size:12px;color:white;
      " :title="copy.actionTitles.language">ID</div>
      <div style="
        width:32px;height:32px;border-radius:9999px;flex-shrink:0;
        background:rgba(255,255,255,0.2);display:flex;align-items:center;
        justify-content:center;font-size:12px;font-weight:600;color:white;
      " :title="copy.actionTitles.avatar">A</div>
    </div>
  </template>
`

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => {
      const copy = useCopy()
      const resolvedArgs = computed(() => ({
        ...args,
        title: args.title || copy.value.brand,
      }))
      return { copy, resolvedArgs }
    },
    template: `
      <Navbar v-bind="resolvedArgs">
        ${navLinks}
        ${actions}
      </Navbar>
    `,
  }),
}

export const Transparent: Story = {
  get name() {
    return getStoryName('transparent')
  },
  args: {
    variant: 'transparent',
    border:  false,
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => {
      const copy = useCopy()
      const resolvedArgs = computed(() => ({
        ...args,
        title: args.title || copy.value.brand,
      }))
      return { copy, resolvedArgs }
    },
    template: `
      <div style="
        background:linear-gradient(to right, var(--color-primary-light), var(--color-secondary-light));
        border-radius:var(--radius-lg);overflow:hidden;
      ">
        <Navbar v-bind="resolvedArgs">
          ${navLinks}
          ${actions}
        </Navbar>
      </div>
    `,
  }),
}

export const Colored: Story = {
  get name() {
    return getStoryName('colored')
  },
  args: {
    variant: 'colored',
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => {
      const copy = useCopy()
      const resolvedArgs = computed(() => ({
        ...args,
        title: args.title || copy.value.brand,
      }))
      return { copy, resolvedArgs }
    },
    template: `
      <Navbar v-bind="resolvedArgs">
        <template #center>
          <nav style="display:flex;align-items:center;gap:4px;">
            <a href="#" style="
              padding:6px 12px;font-size:14px;font-weight:500;
              border-radius:var(--radius-md);color:white;
              text-decoration:none;transition:background 0.15s;
            ">{{ copy.links.home }}</a>
            <a href="#" style="
              padding:6px 12px;font-size:14px;font-weight:500;
              border-radius:var(--radius-md);color:white;
              text-decoration:none;transition:background 0.15s;
            ">{{ copy.links.products }}</a>
            <a href="#" style="
              padding:6px 12px;font-size:14px;font-weight:500;
              border-radius:var(--radius-md);color:white;
              text-decoration:none;transition:background 0.15s;
            ">{{ copy.links.about }}</a>
          </nav>
        </template>
        ${coloredActions}
      </Navbar>
    `,
  }),
}

export const Sticky: Story = {
  get name() {
    return getStoryName('sticky')
  },
  args: {
    sticky: true,
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => {
      const copy = useCopy()
      const resolvedArgs = computed(() => ({
        ...args,
        title: args.title || copy.value.brand,
      }))
      return { copy, resolvedArgs }
    },
    template: `
      <div style="
        height:400px;overflow-y:auto;
        border:1px solid var(--color-border);border-radius:var(--radius-lg);
      ">
        <Navbar v-bind="resolvedArgs">
          ${navLinks}
          ${actions}
        </Navbar>
        <div style="padding:24px;display:flex;flex-direction:column;gap:16px;">
          <p v-for="i in 20" :key="i" style="font-size:14px;color:var(--color-text-secondary);">
            {{ copy.stickyHint }}
          </p>
        </div>
      </div>
    `,
  }),
}
