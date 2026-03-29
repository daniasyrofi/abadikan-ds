import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import Table from './Table.vue'
import Badge from '../../atoms/Badge/Badge.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type LocaleText = {
  emptyText: string
  columns: Array<{ key: string; label: string; sortable: boolean; align?: 'left' | 'center' | 'right' }>
  data: Record<string, any>[]
  statusVariant: Record<string, string>
  storyNames: {
    default: string
    withSorting: string
    selectable: string
    loading: string
    empty: string
    customCells: string
    striped: string
    stickyHeader: string
  }
  docs: {
    categoryProps: string
    propNames: {
      loading: string
      selectable: string
      hoverable: string
      striped: string
      stickyHeader: string
      emptyText: string
    }
    descriptions: {
      loading: string
      selectable: string
      hoverable: string
      striped: string
      stickyHeader: string
      emptyText: string
    }
  }
}

const localeText: Record<Locale, LocaleText> = {
  en: {
    emptyText: 'No data',
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'rsvp', label: 'RSVP', sortable: false },
      { key: 'date', label: 'Date Added', sortable: true, align: 'right' },
    ],
    data: [
      { name: 'Olivia Martin', email: 'olivia@example.com', status: 'Active', rsvp: 'Accepted', date: '2026-01-15' },
      { name: 'James Chen', email: 'james@example.com', status: 'Active', rsvp: 'Pending', date: '2026-01-18' },
      { name: 'Sophia Rodriguez', email: 'sophia@example.com', status: 'Inactive', rsvp: 'Declined', date: '2026-02-02' },
      { name: 'Liam Patel', email: 'liam@example.com', status: 'Active', rsvp: 'Accepted', date: '2026-02-10' },
      { name: 'Emma Wilson', email: 'emma@example.com', status: 'Pending', rsvp: 'Pending', date: '2026-02-14' },
      { name: 'Noah Kim', email: 'noah@example.com', status: 'Active', rsvp: 'Accepted', date: '2026-03-01' },
      { name: 'Ava Thompson', email: 'ava@example.com', status: 'Inactive', rsvp: 'Declined', date: '2026-03-05' },
      { name: 'Mason Garcia', email: 'mason@example.com', status: 'Active', rsvp: 'Accepted', date: '2026-03-12' },
    ],
    statusVariant: {
      Active: 'success',
      Inactive: 'danger',
      Pending: 'warning',
      Accepted: 'success',
      Declined: 'danger',
    },
    storyNames: {
      default: 'Default',
      withSorting: 'With Sorting',
      selectable: 'Selectable',
      loading: 'Loading',
      empty: 'Empty',
      customCells: 'Custom Cells (Status Badge)',
      striped: 'Striped',
      stickyHeader: 'Sticky Header',
    },
    docs: {
      categoryProps: 'Props',
      propNames: {
        loading: 'loading',
        selectable: 'selectable',
        hoverable: 'hoverable',
        striped: 'striped',
        stickyHeader: 'stickyHeader',
        emptyText: 'emptyText',
      },
      descriptions: {
        loading: 'Show a loading overlay',
        selectable: 'Show row selection checkboxes',
        hoverable: 'Highlight rows on hover',
        striped: 'Apply alternating row backgrounds',
        stickyHeader: 'Keep the header visible while scrolling',
        emptyText: 'Text shown when the table has no rows',
      },
    },
  },
  id: {
    emptyText: 'Tidak ada data',
    columns: [
      { key: 'name', label: 'Nama', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'rsvp', label: 'RSVP', sortable: false },
      { key: 'date', label: 'Tanggal Ditambahkan', sortable: true, align: 'right' },
    ],
    data: [
      { name: 'Alya Putri', email: 'alya@contoh.com', status: 'Aktif', rsvp: 'Diterima', date: '2026-01-15' },
      { name: 'Budi Santoso', email: 'budi@contoh.com', status: 'Aktif', rsvp: 'Tertunda', date: '2026-01-18' },
      { name: 'Citra Lestari', email: 'citra@contoh.com', status: 'Nonaktif', rsvp: 'Ditolak', date: '2026-02-02' },
      { name: 'Dewa Pratama', email: 'dewa@contoh.com', status: 'Aktif', rsvp: 'Diterima', date: '2026-02-10' },
      { name: 'Eka Wulandari', email: 'eka@contoh.com', status: 'Tertunda', rsvp: 'Tertunda', date: '2026-02-14' },
      { name: 'Fajar Nugraha', email: 'fajar@contoh.com', status: 'Aktif', rsvp: 'Diterima', date: '2026-03-01' },
      { name: 'Gita Maharani', email: 'gita@contoh.com', status: 'Nonaktif', rsvp: 'Ditolak', date: '2026-03-05' },
      { name: 'Hadi Saputra', email: 'hadi@contoh.com', status: 'Aktif', rsvp: 'Diterima', date: '2026-03-12' },
    ],
    statusVariant: {
      Aktif: 'success',
      Nonaktif: 'danger',
      Tertunda: 'warning',
      Diterima: 'success',
      Ditolak: 'danger',
    },
    storyNames: {
      default: 'Bawaan',
      withSorting: 'Dengan Pengurutan',
      selectable: 'Dapat Dipilih',
      loading: 'Memuat',
      empty: 'Kosong',
      customCells: 'Sel Kustom (Lencana Status)',
      striped: 'Bergaris',
      stickyHeader: 'Header Menempel',
    },
    docs: {
      categoryProps: 'Properti',
      propNames: {
        loading: 'memuat',
        selectable: 'dapatDipilih',
        hoverable: 'dapatDihover',
        striped: 'bergaris',
        stickyHeader: 'headerMenempel',
        emptyText: 'teksKosong',
      },
      descriptions: {
        loading: 'Tampilkan lapisan muat',
        selectable: 'Tampilkan kotak centang pilihan baris',
        hoverable: 'Sorot baris saat di-hover',
        striped: 'Terapkan latar belakang baris selang-seling',
        stickyHeader: 'Tetap tampilkan header saat menggulir',
        emptyText: 'Teks yang ditampilkan saat tabel tidak memiliki baris',
      },
    },
  },
  zh: {
    emptyText: '没有数据',
    columns: [
      { key: 'name', label: '姓名', sortable: true },
      { key: 'email', label: '电子邮件', sortable: true },
      { key: 'status', label: '状态', sortable: true },
      { key: 'rsvp', label: '回复', sortable: false },
      { key: 'date', label: '添加日期', sortable: true, align: 'right' },
    ],
    data: [
      { name: '王小明', email: 'wang@example.com', status: '活跃', rsvp: '已接受', date: '2026-01-15' },
      { name: '李华', email: 'li@example.com', status: '活跃', rsvp: '待处理', date: '2026-01-18' },
      { name: '张敏', email: 'zhang@example.com', status: '未激活', rsvp: '已拒绝', date: '2026-02-02' },
      { name: '赵强', email: 'zhao@example.com', status: '活跃', rsvp: '已接受', date: '2026-02-10' },
      { name: '陈静', email: 'chen@example.com', status: '待处理', rsvp: '待处理', date: '2026-02-14' },
      { name: '刘洋', email: 'liu@example.com', status: '活跃', rsvp: '已接受', date: '2026-03-01' },
      { name: '周婷', email: 'zhou@example.com', status: '未激活', rsvp: '已拒绝', date: '2026-03-05' },
      { name: '黄磊', email: 'huang@example.com', status: '活跃', rsvp: '已接受', date: '2026-03-12' },
    ],
    statusVariant: {
      活跃: 'success',
      未激活: 'danger',
      待处理: 'warning',
      已接受: 'success',
      已拒绝: 'danger',
    },
    storyNames: {
      default: '默认',
      withSorting: '带排序',
      selectable: '可选择',
      loading: '加载中',
      empty: '空状态',
      customCells: '自定义单元格（状态徽章）',
      striped: '斑马纹',
      stickyHeader: '固定表头',
    },
    docs: {
      categoryProps: '属性',
      propNames: {
        loading: '加载中',
        selectable: '可选择',
        hoverable: '可悬停',
        striped: '斑马纹',
        stickyHeader: '固定表头',
        emptyText: '空文本',
      },
      descriptions: {
        loading: '显示加载遮罩',
        selectable: '显示行选择复选框',
        hoverable: '悬停时高亮行',
        striped: '应用交替行背景',
        stickyHeader: '滚动时保持表头可见',
        emptyText: '表格没有行时显示的文本',
      },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => localeText[getLocale()])
const getStoryName = (key: keyof LocaleText['storyNames']) => localeText[getLocale()].storyNames[key]

const buildArgTypes = (locale: Locale): NonNullable<Meta<typeof Table>['argTypes']> => {
  const copy = localeText[locale]
  return {
    loading: {
      name: copy.docs.propNames.loading,
      description: copy.docs.descriptions.loading,
      control: 'boolean',
      table: { category: copy.docs.categoryProps },
    },
    selectable: {
      name: copy.docs.propNames.selectable,
      description: copy.docs.descriptions.selectable,
      control: 'boolean',
      table: { category: copy.docs.categoryProps },
    },
    hoverable: {
      name: copy.docs.propNames.hoverable,
      description: copy.docs.descriptions.hoverable,
      control: 'boolean',
      table: { category: copy.docs.categoryProps },
    },
    striped: {
      name: copy.docs.propNames.striped,
      description: copy.docs.descriptions.striped,
      control: 'boolean',
      table: { category: copy.docs.categoryProps },
    },
    stickyHeader: {
      name: copy.docs.propNames.stickyHeader,
      description: copy.docs.descriptions.stickyHeader,
      control: 'boolean',
      table: { category: copy.docs.categoryProps },
    },
    emptyText: {
      name: copy.docs.propNames.emptyText,
      description: copy.docs.descriptions.emptyText,
      control: 'text',
      table: { category: copy.docs.categoryProps },
    },
  }
}

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table',
  component: Table,
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
  ],
  argTypes: buildArgTypes('en'),
  args: {
    loading:      false,
    selectable:   false,
    hoverable:    true,
    striped:      false,
    stickyHeader: false,
    emptyText:    '',
  },
}
export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Table },
    setup: () => {
      const copy = useCopy()
      const resolvedArgs = computed(() => ({
        ...args,
        emptyText: args.emptyText || copy.value.emptyText,
      }))
      return { copy, resolvedArgs }
    },
    template: '<Table v-bind="resolvedArgs" :columns="copy.columns" :data="copy.data" />',
  }),
}

export const WithSorting: Story = {
  get name() {
    return getStoryName('withSorting')
  },
  render: () => ({
    components: { Table },
    setup: () => {
      const copy = useCopy()
      return {
        copy,
        handleSort(payload: { key: string; direction: string }) {
          console.log('Sort:', payload)
        },
      }
    },
    template: '<Table :columns="copy.columns" :data="copy.data" @sort="handleSort" />',
  }),
}

export const Selectable: Story = {
  get name() {
    return getStoryName('selectable')
  },
  render: () => ({
    components: { Table },
    setup: () => {
      const copy = useCopy()
      return {
        copy,
        handleSelect(rows: Record<string, any>[]) {
          console.log('Selected:', rows.length, 'rows')
        },
      }
    },
    template: '<Table :columns="copy.columns" :data="copy.data" selectable @select="handleSelect" />',
  }),
}

export const Loading: Story = {
  get name() {
    return getStoryName('loading')
  },
  render: () => ({
    components: { Table },
    setup: () => {
      const copy = useCopy()
      return { copy }
    },
    template: '<Table :columns="copy.columns" :data="copy.data" loading />',
  }),
}

export const Empty: Story = {
  get name() {
    return getStoryName('empty')
  },
  render: () => ({
    components: { Table },
    setup: () => {
      const copy = useCopy()
      return { copy }
    },
    template: '<Table :columns="copy.columns" :data="[]" :empty-text="copy.emptyText" />',
  }),
}

export const CustomCells: Story = {
  get name() {
    return getStoryName('customCells')
  },
  render: () => ({
    components: { Table, Badge },
    setup: () => {
      const copy = useCopy()
      return { copy }
    },
    template: `
      <Table :columns="copy.columns" :data="copy.data">
        <template #cell-status="{ value }">
          <Badge :variant="copy.statusVariant[value]" size="sm" dot>{{ value }}</Badge>
        </template>
        <template #cell-rsvp="{ value }">
          <Badge
            :variant="copy.statusVariant[value]"
            badge-style="outline"
            size="sm"
          >
            {{ value }}
          </Badge>
        </template>
      </Table>
    `,
  }),
}

export const Striped: Story = {
  get name() {
    return getStoryName('striped')
  },
  render: () => ({
    components: { Table },
    setup: () => {
      const copy = useCopy()
      return { copy }
    },
    template: '<Table :columns="copy.columns" :data="copy.data" striped :hoverable="false" />',
  }),
}

export const StickyHeader: Story = {
  get name() {
    return getStoryName('stickyHeader')
  },
  render: () => ({
    components: { Table },
    setup: () => {
      const copy = useCopy()
      return { copy }
    },
    template: `
      <div style="height: 320px; overflow: auto;">
        <Table :columns="copy.columns" :data="[...copy.data, ...copy.data, ...copy.data]" sticky-header />
      </div>
    `,
  }),
}
