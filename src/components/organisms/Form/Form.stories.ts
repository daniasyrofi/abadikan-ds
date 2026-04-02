import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Form from './Form.vue'
import Input from '../../atoms/Input/Input.vue'
import Button from '../../atoms/Button/Button.vue'
import Select from '../../molecules/Select/Select.vue'
import Textarea from '../../atoms/Textarea/Textarea.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type LocaleText = {
  fieldLabels: {
    fullName: string
    email: string
    role: string
    message: string
    firstName: string
    lastName: string
    phone: string
    company: string
    jobTitle: string
    country: string
    searchGuests: string
    status: string
  }
  placeholders: {
    name: string
    email: string
    role: string
    message: string
    firstName: string
    lastName: string
    phone: string
    company: string
    jobTitle: string
    country: string
    searchGuests: string
    status: string
  }
  buttons: {
    submit: string
    register: string
    filter: string
  }
  options: {
    role: Array<{ label: string; value: string }>
    country: Array<{ label: string; value: string }>
    status: Array<{ label: string; value: string }>
  }
  validation: {
    nameRequired: string
    emailRequired: string
    emailInvalid: string
    roleRequired: string
  }
  storyNames: {
    stackLayout: string
    gridLayout: string
    inlineLayout: string
    withValidation: string
  }
  docs: {
    categoryProps: string
    propNames: {
      layout: string
      gap: string
    }
    descriptions: {
      layout: string
      gap: string
    }
  }
}

const localeText: Record<Locale, LocaleText> = {
  en: {
    fieldLabels: {
      fullName: 'Full Name',
      email: 'Email',
      role: 'Role',
      message: 'Message',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      company: 'Company',
      jobTitle: 'Job Title',
      country: 'Country',
      searchGuests: 'Search guests',
      status: 'Status',
    },
    placeholders: {
      name: 'Enter your name',
      email: 'you@example.com',
      role: 'Select a role',
      message: 'Any special requests?',
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '+1 (555) 000-0000',
      company: 'Acme Inc.',
      jobTitle: 'Product Designer',
      country: 'Select country',
      searchGuests: 'Search guests...',
      status: 'Status',
    },
    buttons: {
      submit: 'Submit',
      register: 'Register',
      filter: 'Filter',
    },
    options: {
      role: [
        { label: 'Guest', value: 'guest' },
        { label: 'VIP', value: 'vip' },
        { label: 'Speaker', value: 'speaker' },
        { label: 'Organizer', value: 'organizer' },
      ],
      country: [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
        { label: 'Germany', value: 'de' },
      ],
      status: [
        { label: 'All', value: '' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
    },
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      roleRequired: 'Please select a role',
    },
    storyNames: {
      stackLayout: 'Stack Layout',
      gridLayout: 'Grid Layout',
      inlineLayout: 'Inline Layout (Search Filter)',
      withValidation: 'With Validation',
    },
    docs: {
      categoryProps: 'Props',
      propNames: {
        layout: 'layout',
        gap: 'gap',
      },
      descriptions: {
        layout: 'Form layout arrangement',
        gap: 'Spacing between fields',
      },
    },
  },
  id: {
    fieldLabels: {
      fullName: 'Nama Lengkap',
      email: 'Email',
      role: 'Peran',
      message: 'Pesan',
      firstName: 'Nama Depan',
      lastName: 'Nama Belakang',
      phone: 'Telepon',
      company: 'Perusahaan',
      jobTitle: 'Jabatan',
      country: 'Negara',
      searchGuests: 'Cari tamu',
      status: 'Status',
    },
    placeholders: {
      name: 'Masukkan nama Anda',
      email: 'anda@contoh.com',
      role: 'Pilih peran',
      message: 'Ada permintaan khusus?',
      firstName: 'Budi',
      lastName: 'Santoso',
      phone: '+62 812-0000-0000',
      company: 'PT Nusantara',
      jobTitle: 'Desainer Produk',
      country: 'Pilih negara',
      searchGuests: 'Cari tamu...',
      status: 'Status',
    },
    buttons: {
      submit: 'Kirim',
      register: 'Daftar',
      filter: 'Filter',
    },
    options: {
      role: [
        { label: 'Tamu', value: 'guest' },
        { label: 'VIP', value: 'vip' },
        { label: 'Pembicara', value: 'speaker' },
        { label: 'Penyelenggara', value: 'organizer' },
      ],
      country: [
        { label: 'Indonesia', value: 'id' },
        { label: 'Singapura', value: 'sg' },
        { label: 'Malaysia', value: 'my' },
        { label: 'Jepang', value: 'jp' },
        { label: 'Korea Selatan', value: 'kr' },
      ],
      status: [
        { label: 'Semua', value: '' },
        { label: 'Aktif', value: 'active' },
        { label: 'Nonaktif', value: 'inactive' },
        { label: 'Tertunda', value: 'pending' },
      ],
    },
    validation: {
      nameRequired: 'Nama wajib diisi',
      emailRequired: 'Email wajib diisi',
      emailInvalid: 'Silakan masukkan alamat email yang valid',
      roleRequired: 'Silakan pilih peran',
    },
    storyNames: {
      stackLayout: 'Tata Letak Stack',
      gridLayout: 'Tata Letak Grid',
      inlineLayout: 'Tata Letak Inline (Filter Pencarian)',
      withValidation: 'Dengan Validasi',
    },
    docs: {
      categoryProps: 'Properti',
      propNames: {
        layout: 'tataLetak',
        gap: 'jarak',
      },
      descriptions: {
        layout: 'Susunan tata letak form',
        gap: 'Jarak antar field',
      },
    },
  },
  zh: {
    fieldLabels: {
      fullName: '全名',
      email: '电子邮件',
      role: '角色',
      message: '消息',
      firstName: '名',
      lastName: '姓',
      phone: '电话',
      company: '公司',
      jobTitle: '职位',
      country: '国家',
      searchGuests: '搜索宾客',
      status: '状态',
    },
    placeholders: {
      name: '请输入姓名',
      email: 'you@example.com',
      role: '选择角色',
      message: '有特殊需求吗？',
      firstName: '小明',
      lastName: '王',
      phone: '+1 (555) 000-0000',
      company: '示例公司',
      jobTitle: '产品设计师',
      country: '选择国家',
      searchGuests: '搜索宾客...',
      status: '状态',
    },
    buttons: {
      submit: '提交',
      register: '注册',
      filter: '筛选',
    },
    options: {
      role: [
        { label: '访客', value: 'guest' },
        { label: 'VIP', value: 'vip' },
        { label: '演讲者', value: 'speaker' },
        { label: '组织者', value: 'organizer' },
      ],
      country: [
        { label: '中国', value: 'cn' },
        { label: '新加坡', value: 'sg' },
        { label: '日本', value: 'jp' },
        { label: '韩国', value: 'kr' },
        { label: '美国', value: 'us' },
      ],
      status: [
        { label: '全部', value: '' },
        { label: '活跃', value: 'active' },
        { label: '未激活', value: 'inactive' },
        { label: '待处理', value: 'pending' },
      ],
    },
    validation: {
      nameRequired: '姓名为必填项',
      emailRequired: '电子邮件为必填项',
      emailInvalid: '请输入有效的电子邮件地址',
      roleRequired: '请选择一个角色',
    },
    storyNames: {
      stackLayout: '堆叠布局',
      gridLayout: '网格布局',
      inlineLayout: '内联布局（搜索筛选）',
      withValidation: '带验证',
    },
    docs: {
      categoryProps: '属性',
      propNames: {
        layout: '布局',
        gap: '间距',
      },
      descriptions: {
        layout: '表单布局方式',
        gap: '字段之间的间距',
      },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => localeText[getLocale()])
const getStoryName = (key: keyof LocaleText['storyNames']) =>
  localeText[getLocale()].storyNames[key]

const buildArgTypes = (locale: Locale): NonNullable<Meta<typeof Form>['argTypes']> => {
  const copy = localeText[locale]
  return {
    layout: {
      name: copy.docs.propNames.layout,
      description: copy.docs.descriptions.layout,
      control: { type: 'select' },
      options: ['stack', 'grid', 'inline'],
      table: {
        category: copy.docs.categoryProps,
      },
    },
    gap: {
      name: copy.docs.propNames.gap,
      description: copy.docs.descriptions.gap,
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        category: copy.docs.categoryProps,
      },
    },
  }
}

const meta: Meta<typeof Form> = {
  title: 'Organisms/Form',
  component: Form,
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
    layout: 'stack',
    gap: 'md',
  },
}
export default meta
type Story = StoryObj<typeof Form>

export const StackLayout: Story = {
  get name() {
    return getStoryName('stackLayout')
  },
  render: () => ({
    components: { Form, Input, Select, Textarea, Button },
    setup: () => {
      const copy = useCopy()
      const name = ref('')
      const email = ref('')
      const role = ref('')
      const message = ref('')
      return { copy, name, email, role, message }
    },
    template: `
      <div class="max-w-md">
        <Form layout="stack" gap="md" @submit.prevent>
          <Input v-model="name" :label="copy.fieldLabels.fullName" :placeholder="copy.placeholders.name" required />
          <Input v-model="email" :label="copy.fieldLabels.email" type="email" :placeholder="copy.placeholders.email" required />
          <Select v-model="role" :options="copy.options.role" :label="copy.fieldLabels.role" :placeholder="copy.placeholders.role" />
          <Textarea v-model="message" :label="copy.fieldLabels.message" :placeholder="copy.placeholders.message" :rows="3" />
          <Button type="submit">{{ copy.buttons.submit }}</Button>
        </Form>
      </div>
    `,
  }),
}

export const GridLayout: Story = {
  get name() {
    return getStoryName('gridLayout')
  },
  render: () => ({
    components: { Form, Input, Select, Button },
    setup: () => {
      const copy = useCopy()
      const firstName = ref('')
      const lastName = ref('')
      const email = ref('')
      const phone = ref('')
      const company = ref('')
      const title = ref('')
      const country = ref('')
      return { copy, firstName, lastName, email, phone, company, title, country }
    },
    template: `
      <div class="max-w-2xl">
        <Form layout="grid" gap="md" @submit.prevent>
          <Input v-model="firstName" :label="copy.fieldLabels.firstName" :placeholder="copy.placeholders.firstName" required />
          <Input v-model="lastName" :label="copy.fieldLabels.lastName" :placeholder="copy.placeholders.lastName" required />
          <Input v-model="email" :label="copy.fieldLabels.email" type="email" :placeholder="copy.placeholders.email" required />
          <Input v-model="phone" :label="copy.fieldLabels.phone" type="tel" :placeholder="copy.placeholders.phone" />
          <Input v-model="company" :label="copy.fieldLabels.company" :placeholder="copy.placeholders.company" />
          <Input v-model="title" :label="copy.fieldLabels.jobTitle" :placeholder="copy.placeholders.jobTitle" />
          <Select v-model="country" :options="copy.options.country" :label="copy.fieldLabels.country" :placeholder="copy.placeholders.country" />
          <div class="md:col-span-2 flex justify-end">
            <Button type="submit">{{ copy.buttons.register }}</Button>
          </div>
        </Form>
      </div>
    `,
  }),
}

export const InlineLayout: Story = {
  get name() {
    return getStoryName('inlineLayout')
  },
  render: () => ({
    components: { Form, Input, Select, Button },
    setup: () => {
      const copy = useCopy()
      const query = ref('')
      const status = ref('')
      return { copy, query, status }
    },
    template: `
      <Form layout="inline" gap="sm" @submit.prevent>
        <div class="w-64">
          <Input v-model="query" :placeholder="copy.placeholders.searchGuests" type="search" />
        </div>
        <div class="w-48">
          <Select v-model="status" :options="copy.options.status" :placeholder="copy.placeholders.status" />
        </div>
        <Button type="submit" variant="secondary">{{ copy.buttons.filter }}</Button>
      </Form>
    `,
  }),
}

export const WithValidation: Story = {
  get name() {
    return getStoryName('withValidation')
  },
  render: () => ({
    components: { Form, Input, Select, Textarea, Button },
    setup: () => {
      const copy = useCopy()
      const name = ref('')
      const email = ref('invalid-email')
      const role = ref('')
      const message = ref('')
      return { copy, name, email, role, message }
    },
    template: `
      <div class="max-w-md">
        <Form layout="stack" gap="md" @submit.prevent>
          <Input v-model="name" :label="copy.fieldLabels.fullName" :placeholder="copy.placeholders.name" required :error="copy.validation.nameRequired" />
          <Input v-model="email" :label="copy.fieldLabels.email" type="email" :placeholder="copy.placeholders.email" required :error="copy.validation.emailInvalid" />
          <Select v-model="role" :options="copy.options.role.slice(0, 3)" :label="copy.fieldLabels.role" :placeholder="copy.placeholders.role" :error="copy.validation.roleRequired" />
          <Textarea v-model="message" :label="copy.fieldLabels.message" :placeholder="copy.placeholders.message" :rows="3" />
          <Button type="submit">{{ copy.buttons.submit }}</Button>
        </Form>
      </div>
    `,
  }),
}
