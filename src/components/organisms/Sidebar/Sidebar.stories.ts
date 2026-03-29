import { computed, ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icons } from '@/lib/icons'
import Sidebar from './Sidebar.vue'
import type { SidebarItem } from './Sidebar.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type LocaleText = {
  brand: string
  footerEmail: string
  items: {
    basic: SidebarItem[]
    badges: SidebarItem[]
    children: SidebarItem[]
  }
  content: {
    default: string
    collapsed: string
    withBadges: string
    withChildren: string
    iconOnly: string
  }
  storyNames: {
    default: string
    collapsed: string
    withBadges: string
    withChildren: string
    iconOnly: string
  }
  docs: {
    categoryProps: string
    propNames: {
      modelValue: string
      collapsible: string
      width: string
      collapsedWidth: string
      activeId: string
    }
    descriptions: {
      modelValue: string
      collapsible: string
      width: string
      collapsedWidth: string
      activeId: string
    }
  }
}

const buildItems = (copy: {
  dashboard: string
  inbox: string
  calendar: string
  team: string
  settings: string
  messages: string
  projects: string
  active: string
  archived: string
  drafts: string
  reports: string
  weekly: string
  monthly: string
  annual: string
  documentation: string
  newBadge: string
}): LocaleText['items'] => ({
  basic: [
    { id: 'dashboard', label: copy.dashboard, icon: Icons.Dashboard },
    { id: 'inbox', label: copy.inbox, icon: Icons.Inbox },
    { id: 'calendar', label: copy.calendar, icon: Icons.Calendar },
    { id: 'team', label: copy.team, icon: Icons.Team },
    { id: 'settings', label: copy.settings, icon: Icons.Settings },
  ],
  badges: [
    { id: 'dashboard', label: copy.dashboard, icon: Icons.Dashboard },
    { id: 'inbox', label: copy.inbox, icon: Icons.Inbox, badge: 12 },
    { id: 'calendar', label: copy.calendar, icon: Icons.Calendar, badge: 3 },
    { id: 'team', label: copy.team, icon: Icons.Team },
    { id: 'mail', label: copy.messages, icon: Icons.Mail, badge: copy.newBadge },
    { id: 'settings', label: copy.settings, icon: Icons.Settings },
  ],
  children: [
    { id: 'dashboard', label: copy.dashboard, icon: Icons.Dashboard },
    { id: 'inbox', label: copy.inbox, icon: Icons.Inbox, badge: 5 },
    {
      id: 'projects',
      label: copy.projects,
      icon: Icons.Folder,
      children: [
        { id: 'proj-active', label: copy.active },
        { id: 'proj-archived', label: copy.archived },
        { id: 'proj-drafts', label: copy.drafts, badge: 2 },
      ],
    },
    {
      id: 'reports',
      label: copy.reports,
      icon: Icons.BarChart,
      children: [
        { id: 'rpt-weekly', label: copy.weekly },
        { id: 'rpt-monthly', label: copy.monthly },
        { id: 'rpt-annual', label: copy.annual },
      ],
    },
    { id: 'docs', label: copy.documentation, icon: Icons.Book },
    { id: 'settings', label: copy.settings, icon: Icons.Settings },
  ],
})

const localeText: Record<Locale, LocaleText> = {
  en: {
    brand: 'Acme Inc',
    footerEmail: 'john@acme.com',
    items: buildItems({
      dashboard: 'Dashboard',
      inbox: 'Inbox',
      calendar: 'Calendar',
      team: 'Team',
      settings: 'Settings',
      messages: 'Messages',
      projects: 'Projects',
      active: 'Active',
      archived: 'Archived',
      drafts: 'Drafts',
      reports: 'Reports',
      weekly: 'Weekly',
      monthly: 'Monthly',
      annual: 'Annual',
      documentation: 'Documentation',
      newBadge: 'New',
    }),
    content: {
      default: 'Main content area',
      collapsed: 'Main content area. Click the arrow to expand the sidebar.',
      withBadges: 'Sidebar with badge counts on items.',
      withChildren: 'Sidebar with expandable child items. Click "Projects" or "Reports" to toggle.',
      iconOnly: 'Icon-only collapsed mode. Hover over icons to see tooltips.',
    },
    storyNames: {
      default: 'Default',
      collapsed: 'Collapsed',
      withBadges: 'With Badges',
      withChildren: 'With Children',
      iconOnly: 'Icon Only',
    },
    docs: {
      categoryProps: 'Props',
      propNames: {
        modelValue: 'modelValue',
        collapsible: 'collapsible',
        width: 'width',
        collapsedWidth: 'collapsedWidth',
        activeId: 'activeId',
      },
      descriptions: {
        modelValue: 'Control the collapsed state',
        collapsible: 'Show the collapse/expand control',
        width: 'Expanded sidebar width',
        collapsedWidth: 'Width used when collapsed',
        activeId: 'Active navigation item id',
      },
    },
  },
  id: {
    brand: 'Acme Inc',
    footerEmail: 'budi@contoh.com',
    items: buildItems({
      dashboard: 'Dasbor',
      inbox: 'Kotak Masuk',
      calendar: 'Kalender',
      team: 'Tim',
      settings: 'Pengaturan',
      messages: 'Pesan',
      projects: 'Proyek',
      active: 'Aktif',
      archived: 'Diarsipkan',
      drafts: 'Draf',
      reports: 'Laporan',
      weekly: 'Mingguan',
      monthly: 'Bulanan',
      annual: 'Tahunan',
      documentation: 'Dokumentasi',
      newBadge: 'Baru',
    }),
    content: {
      default: 'Area konten utama',
      collapsed: 'Area konten utama. Klik panah untuk membuka sidebar.',
      withBadges: 'Sidebar dengan jumlah lencana pada item.',
      withChildren: 'Sidebar dengan item anak yang dapat dibuka. Klik "Proyek" atau "Laporan" untuk men-toggle.',
      iconOnly: 'Mode tertutup hanya ikon. Arahkan kursor ke ikon untuk melihat tooltip.',
    },
    storyNames: {
      default: 'Bawaan',
      collapsed: 'Tertutup',
      withBadges: 'Dengan Lencana',
      withChildren: 'Dengan Anak Item',
      iconOnly: 'Hanya Ikon',
    },
    docs: {
      categoryProps: 'Properti',
      propNames: {
        modelValue: 'modelValue',
        collapsible: 'dapatDilipat',
        width: 'lebar',
        collapsedWidth: 'lebarTertutup',
        activeId: 'idAktif',
      },
      descriptions: {
        modelValue: 'Mengontrol status tertutup',
        collapsible: 'Tampilkan kontrol buka/tutup',
        width: 'Lebar sidebar saat terbuka',
        collapsedWidth: 'Lebar yang dipakai saat tertutup',
        activeId: 'ID item navigasi aktif',
      },
    },
  },
  zh: {
    brand: 'Acme Inc',
    footerEmail: 'wang@example.cn',
    items: buildItems({
      dashboard: '仪表板',
      inbox: '收件箱',
      calendar: '日历',
      team: '团队',
      settings: '设置',
      messages: '消息',
      projects: '项目',
      active: '进行中',
      archived: '已归档',
      drafts: '草稿',
      reports: '报告',
      weekly: '每周',
      monthly: '每月',
      annual: '每年',
      documentation: '文档',
      newBadge: '新',
    }),
    content: {
      default: '主内容区域',
      collapsed: '主内容区域。点击箭头可展开侧边栏。',
      withBadges: '带有项目徽标计数的侧边栏。',
      withChildren: '带可展开子项的侧边栏。点击“项目”或“报告”切换。',
      iconOnly: '仅图标的折叠模式。悬停图标可查看提示。',
    },
    storyNames: {
      default: '默认',
      collapsed: '已折叠',
      withBadges: '带徽标',
      withChildren: '带子项',
      iconOnly: '仅图标',
    },
    docs: {
      categoryProps: '属性',
      propNames: {
        modelValue: 'modelValue',
        collapsible: '可折叠',
        width: '宽度',
        collapsedWidth: '折叠宽度',
        activeId: '活动ID',
      },
      descriptions: {
        modelValue: '控制折叠状态',
        collapsible: '显示折叠/展开控制',
        width: '展开时的侧边栏宽度',
        collapsedWidth: '折叠时使用的宽度',
        activeId: '活动导航项 ID',
      },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => localeText[getLocale()])
const getStoryName = (key: keyof LocaleText['storyNames']) => localeText[getLocale()].storyNames[key]

const buildArgTypes = (locale: Locale): NonNullable<Meta<typeof Sidebar>['argTypes']> => {
  const copy = localeText[locale]
  return {
    modelValue: {
      name: copy.docs.propNames.modelValue,
      description: copy.docs.descriptions.modelValue,
      control: 'boolean',
      table: { category: copy.docs.categoryProps },
    },
    collapsible: {
      name: copy.docs.propNames.collapsible,
      description: copy.docs.descriptions.collapsible,
      control: 'boolean',
      table: { category: copy.docs.categoryProps },
    },
    width: {
      name: copy.docs.propNames.width,
      description: copy.docs.descriptions.width,
      control: { type: 'select' },
      options: ['narrow', 'default', 'wide'],
      table: { category: copy.docs.categoryProps },
    },
    collapsedWidth: {
      name: copy.docs.propNames.collapsedWidth,
      description: copy.docs.descriptions.collapsedWidth,
      control: { type: 'select' },
      options: ['icon-only', 'hidden'],
      table: { category: copy.docs.categoryProps },
    },
    activeId: {
      name: copy.docs.propNames.activeId,
      description: copy.docs.descriptions.activeId,
      control: 'text',
      table: { category: copy.docs.categoryProps },
    },
  }
}

// ── Logo box helper (inline-styled to avoid broken Tailwind arbitrary values)
const logoBox = `
  <div style="
    width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
    background:var(--color-primary);display:flex;align-items:center;
    justify-content:center;font-size:12px;font-weight:700;color:white;
  ">A</div>
`

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
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
      template: `
        <div style="
          display:flex;height:520px;
          border:1px solid var(--color-border);border-radius:var(--radius-lg);
          overflow:hidden;
        "><story /></div>
      `,
    }),
  ],
  argTypes: buildArgTypes('en'),
  args: {
    modelValue:     false,
    collapsible:    true,
    width:          'default',
    collapsedWidth: 'icon-only',
    activeId:       'dashboard',
  },
}
export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const copy = useCopy()
      const collapsed = ref(args.modelValue)
      return { args, copy, collapsed }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="copy.items.basic">
        <template #header="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            ${logoBox}
            <span v-if="!c" style="
              font-size:14px;font-weight:600;color:var(--color-text-heading);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">{{ copy.brand }}</span>
          </div>
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.content.default }}</p>
      </div>
    `,
  }),
}

export const Collapsed: Story = {
  get name() {
    return getStoryName('collapsed')
  },
  args: { modelValue: true },
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const copy = useCopy()
      const collapsed = ref(args.modelValue)
      return { args, copy, collapsed }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="copy.items.basic">
        <template #header="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            ${logoBox}
            <span v-if="!c" style="
              font-size:14px;font-weight:600;color:var(--color-text-heading);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">{{ copy.brand }}</span>
          </div>
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">
          {{ copy.content.collapsed }}
        </p>
      </div>
    `,
  }),
}

export const WithBadges: Story = {
  get name() {
    return getStoryName('withBadges')
  },
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const copy = useCopy()
      const collapsed = ref(args.modelValue)
      return { args, copy, collapsed }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="copy.items.badges" active-id="inbox">
        <template #header="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            ${logoBox}
            <span v-if="!c" style="
              font-size:14px;font-weight:600;color:var(--color-text-heading);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">{{ copy.brand }}</span>
          </div>
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.content.withBadges }}</p>
      </div>
    `,
  }),
}

export const WithChildren: Story = {
  get name() {
    return getStoryName('withChildren')
  },
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const copy = useCopy()
      const collapsed = ref(args.modelValue)
      return { args, copy, collapsed }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="copy.items.children" active-id="proj-active">
        <template #header="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            ${logoBox}
            <span v-if="!c" style="
              font-size:14px;font-weight:600;color:var(--color-text-heading);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">{{ copy.brand }}</span>
          </div>
        </template>
        <template #footer="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="
              width:32px;height:32px;border-radius:9999px;flex-shrink:0;
              background:var(--color-neutral-light);display:flex;align-items:center;
              justify-content:center;font-size:12px;font-weight:600;color:var(--color-text-primary);
            ">JD</div>
            <span v-if="!c" style="
              font-size:13px;color:var(--color-text-secondary);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">{{ copy.footerEmail }}</span>
          </div>
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.content.withChildren }}</p>
      </div>
    `,
  }),
}

export const IconOnly: Story = {
  get name() {
    return getStoryName('iconOnly')
  },
  args: {
    modelValue:     true,
    collapsedWidth: 'icon-only',
  },
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const copy = useCopy()
      const collapsed = ref(args.modelValue)
      return { args, copy, collapsed }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="copy.items.basic">
        <template #header>
          ${logoBox}
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.content.iconOnly }}</p>
      </div>
    `,
  }),
}
