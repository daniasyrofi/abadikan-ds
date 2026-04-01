import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from './Table.vue'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
]

const data = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Carol', email: 'carol@example.com', role: 'User' },
]

describe('Table', () => {
  it('renders a table element', () => {
    const wrapper = mount(Table, { props: { columns, data } })
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('renders column headers', () => {
    const wrapper = mount(Table, { props: { columns, data } })
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Role')
  })

  it('renders data rows', () => {
    const wrapper = mount(Table, { props: { columns, data } })
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('Bob')
    expect(wrapper.text()).toContain('Carol')
  })

  it('renders correct number of rows', () => {
    const wrapper = mount(Table, { props: { columns, data } })
    const rows = wrapper.find('tbody').findAll('tr')
    expect(rows.length).toBe(3)
  })

  it('shows empty state when data is empty', () => {
    const wrapper = mount(Table, { props: { columns, data: [], emptyText: 'No records' } })
    expect(wrapper.text()).toContain('No records')
  })

  it('shows loading overlay when loading=true', () => {
    const wrapper = mount(Table, { props: { columns, data, loading: true } })
    // Loading state should show spinner
    expect(wrapper.html()).toMatch(/spinner|loading/i)
  })

  it('emits sort event when sortable column header is clicked', async () => {
    const wrapper = mount(Table, { props: { columns, data } })
    const sortableHeader = wrapper.findAll('th').find(th => th.text().includes('Name'))
    if (sortableHeader) {
      await sortableHeader.trigger('click')
      expect(wrapper.emitted('sort')).toBeTruthy()
      const [payload] = wrapper.emitted('sort')![0] as [{ key: string; direction: string }]
      expect(payload.key).toBe('name')
      expect(payload.direction).toMatch(/asc|desc/)
    }
  })

  it('toggles sort direction on second click', async () => {
    const wrapper = mount(Table, { props: { columns, data } })
    const nameHeader = wrapper.findAll('th').find(th => th.text().includes('Name'))
    if (nameHeader) {
      await nameHeader.trigger('click')
      await nameHeader.trigger('click')
      const emissions = wrapper.emitted('sort')!
      expect(emissions.length).toBe(2)
      const first = (emissions[0][0] as any).direction
      const second = (emissions[1][0] as any).direction
      expect(first).not.toBe(second)
    }
  })

  it('does not emit sort for non-sortable column', async () => {
    const wrapper = mount(Table, { props: { columns, data } })
    const emailHeader = wrapper.findAll('th').find(th => th.text().includes('Email'))
    if (emailHeader) {
      await emailHeader.trigger('click')
      expect(wrapper.emitted('sort')).toBeFalsy()
    }
  })

  it('renders selection checkboxes when selectable=true', () => {
    const wrapper = mount(Table, { props: { columns, data, selectable: true } })
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    // 1 header + 3 row checkboxes
    expect(checkboxes.length).toBe(4)
  })

  it('emits select event when a row is checked', async () => {
    const wrapper = mount(Table, { props: { columns, data, selectable: true } })
    const rowCheckboxes = wrapper.find('tbody').findAll('input[type="checkbox"]')
    await rowCheckboxes[0].trigger('change')
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('select-all checkbox selects all rows', async () => {
    const wrapper = mount(Table, { props: { columns, data, selectable: true } })
    const selectAll = wrapper.find('thead input[type="checkbox"]')
    await selectAll.trigger('change')
    const emitted = wrapper.emitted('select')!
    expect(emitted).toBeTruthy()
    const selected = emitted[emitted.length - 1][0] as any[]
    expect(selected.length).toBe(3)
  })

  it('applies striped classes when striped=true', () => {
    const striped = mount(Table, { props: { columns, data, striped: true } })
    const plain = mount(Table, { props: { columns, data, striped: false } })
    expect(striped.html()).not.toBe(plain.html())
  })

  it('renders custom cell slot', () => {
    const wrapper = mount(Table, {
      props: { columns, data },
      slots: { 'cell-name': '<strong>Custom</strong>' },
    })
    expect(wrapper.text()).toContain('Custom')
  })
})
