import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Table from './Table.vue'
import Badge from '../../atoms/Badge/Badge.vue'

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    loading:      { control: 'boolean' },
    selectable:   { control: 'boolean' },
    hoverable:    { control: 'boolean' },
    striped:      { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    emptyText:    { control: 'text' },
  },
  args: {
    loading:      false,
    selectable:   false,
    hoverable:    true,
    striped:      false,
    stickyHeader: false,
    emptyText:    'No data',
  },
}
export default meta
type Story = StoryObj<typeof Table>

const columns = [
  { key: 'name',   label: 'Name',       sortable: true },
  { key: 'email',  label: 'Email',      sortable: true },
  { key: 'status', label: 'Status',     sortable: true },
  { key: 'rsvp',   label: 'RSVP',       sortable: false },
  { key: 'date',   label: 'Date Added', sortable: true, align: 'right' as const },
]

const data = [
  { name: 'Olivia Martin',     email: 'olivia@example.com',     status: 'Active',   rsvp: 'Accepted',  date: '2026-01-15' },
  { name: 'James Chen',        email: 'james@example.com',      status: 'Active',   rsvp: 'Pending',   date: '2026-01-18' },
  { name: 'Sophia Rodriguez',  email: 'sophia@example.com',     status: 'Inactive', rsvp: 'Declined',  date: '2026-02-02' },
  { name: 'Liam Patel',        email: 'liam@example.com',       status: 'Active',   rsvp: 'Accepted',  date: '2026-02-10' },
  { name: 'Emma Wilson',       email: 'emma@example.com',       status: 'Pending',  rsvp: 'Pending',   date: '2026-02-14' },
  { name: 'Noah Kim',          email: 'noah@example.com',       status: 'Active',   rsvp: 'Accepted',  date: '2026-03-01' },
  { name: 'Ava Thompson',      email: 'ava@example.com',        status: 'Inactive', rsvp: 'Declined',  date: '2026-03-05' },
  { name: 'Mason Garcia',      email: 'mason@example.com',      status: 'Active',   rsvp: 'Accepted',  date: '2026-03-12' },
]

export const Default: Story = {
  render: (args) => ({
    components: { Table },
    setup: () => ({ args, columns, data }),
    template: '<Table v-bind="args" :columns="columns" :data="data" />',
  }),
}

export const WithSorting: Story = {
  render: () => ({
    components: { Table },
    setup: () => ({
      columns,
      data,
      handleSort(payload: { key: string; direction: string }) {
        console.log('Sort:', payload)
      },
    }),
    template: '<Table :columns="columns" :data="data" @sort="handleSort" />',
  }),
}

export const Selectable: Story = {
  render: () => ({
    components: { Table },
    setup: () => ({
      columns,
      data,
      handleSelect(rows: Record<string, any>[]) {
        console.log('Selected:', rows.length, 'rows')
      },
    }),
    template: '<Table :columns="columns" :data="data" selectable @select="handleSelect" />',
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { Table },
    setup: () => ({ columns, data }),
    template: '<Table :columns="columns" :data="data" loading />',
  }),
}

export const Empty: Story = {
  render: () => ({
    components: { Table },
    setup: () => ({ columns }),
    template: '<Table :columns="columns" :data="[]" empty-text="No guests have been added yet." />',
  }),
}

export const CustomCells: Story = {
  name: 'Custom Cells (Status Badge)',
  render: () => ({
    components: { Table, Badge },
    setup: () => {
      const statusVariant: Record<string, string> = {
        Active:   'success',
        Inactive: 'danger',
        Pending:  'warning',
      }
      return { columns, data, statusVariant }
    },
    template: `
      <Table :columns="columns" :data="data">
        <template #cell-status="{ value }">
          <Badge :variant="statusVariant[value]" size="sm" dot>{{ value }}</Badge>
        </template>
        <template #cell-rsvp="{ value }">
          <Badge
            :variant="value === 'Accepted' ? 'success' : value === 'Declined' ? 'danger' : 'neutral'"
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
  render: () => ({
    components: { Table },
    setup: () => ({ columns, data }),
    template: '<Table :columns="columns" :data="data" striped :hoverable="false" />',
  }),
}

export const StickyHeader: Story = {
  render: () => ({
    components: { Table },
    setup: () => {
      const manyRows = [...data, ...data, ...data]
      return { columns, data: manyRows }
    },
    template: `
      <div style="height: 320px; overflow: auto;">
        <Table :columns="columns" :data="data" sticky-header />
      </div>
    `,
  }),
}
