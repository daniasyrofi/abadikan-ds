import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { RiHomeLine, RiUserLine, RiSettings4Line, RiBellLine } from '@remixicon/vue'
import Tabs from './Tabs.vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'
import TabsContent from './TabsContent.vue'

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: 'select', options: ['line', 'pill', 'boxed'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    modelValue:  'tab1',
    variant:     'line',
    orientation: 'horizontal',
    size:        'md',
  },
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: (args) => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const active = ref(args.modelValue ?? 'tab1')
      return { args, active }
    },
    template: `
      <Tabs v-bind="args" v-model="active">
        <TabsList>
          <TabsTrigger value="tab1">Overview</TabsTrigger>
          <TabsTrigger value="tab2">Details</TabsTrigger>
          <TabsTrigger value="tab3">Settings</TabsTrigger>
          <TabsTrigger value="tab4" disabled>Disabled</TabsTrigger>
        </TabsList>
        <div class="pt-4">
          <TabsContent value="tab1">
            <p class="text-sm text-[--color-text-secondary]">Overview content goes here. This is the first tab panel.</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p class="text-sm text-[--color-text-secondary]">Details content goes here. This is the second tab panel.</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p class="text-sm text-[--color-text-secondary]">Settings content goes here. This is the third tab panel.</p>
          </TabsContent>
        </div>
      </Tabs>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const line  = ref('a')
      const pill  = ref('a')
      const boxed = ref('a')
      return { line, pill, boxed }
    },
    template: `
      <div class="flex flex-col gap-10 p-4" style="max-width:600px">
        <div>
          <p class="text-xs font-semibold text-[--color-text-secondary] uppercase tracking-wider mb-3">Line</p>
          <Tabs variant="line" v-model="line">
            <TabsList>
              <TabsTrigger value="a">Dashboard</TabsTrigger>
              <TabsTrigger value="b">Analytics</TabsTrigger>
              <TabsTrigger value="c">Reports</TabsTrigger>
            </TabsList>
            <div class="pt-4">
              <TabsContent value="a"><p class="text-sm text-[--color-text-secondary]">Dashboard panel</p></TabsContent>
              <TabsContent value="b"><p class="text-sm text-[--color-text-secondary]">Analytics panel</p></TabsContent>
              <TabsContent value="c"><p class="text-sm text-[--color-text-secondary]">Reports panel</p></TabsContent>
            </div>
          </Tabs>
        </div>

        <div>
          <p class="text-xs font-semibold text-[--color-text-secondary] uppercase tracking-wider mb-3">Pill</p>
          <Tabs variant="pill" v-model="pill">
            <TabsList>
              <TabsTrigger value="a">Dashboard</TabsTrigger>
              <TabsTrigger value="b">Analytics</TabsTrigger>
              <TabsTrigger value="c">Reports</TabsTrigger>
            </TabsList>
            <div class="pt-4">
              <TabsContent value="a"><p class="text-sm text-[--color-text-secondary]">Dashboard panel</p></TabsContent>
              <TabsContent value="b"><p class="text-sm text-[--color-text-secondary]">Analytics panel</p></TabsContent>
              <TabsContent value="c"><p class="text-sm text-[--color-text-secondary]">Reports panel</p></TabsContent>
            </div>
          </Tabs>
        </div>

        <div>
          <p class="text-xs font-semibold text-[--color-text-secondary] uppercase tracking-wider mb-3">Boxed</p>
          <Tabs variant="boxed" v-model="boxed">
            <TabsList>
              <TabsTrigger value="a">Dashboard</TabsTrigger>
              <TabsTrigger value="b">Analytics</TabsTrigger>
              <TabsTrigger value="c">Reports</TabsTrigger>
            </TabsList>
            <div class="pt-4">
              <TabsContent value="a"><p class="text-sm text-[--color-text-secondary]">Dashboard panel</p></TabsContent>
              <TabsContent value="b"><p class="text-sm text-[--color-text-secondary]">Analytics panel</p></TabsContent>
              <TabsContent value="c"><p class="text-sm text-[--color-text-secondary]">Reports panel</p></TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const sm = ref('a')
      const md = ref('a')
      const lg = ref('a')
      return { sm, md, lg }
    },
    template: `
      <div class="flex flex-col gap-8 p-4" style="max-width:500px">
        <div>
          <p class="text-xs font-semibold text-[--color-text-secondary] uppercase tracking-wider mb-3">Small</p>
          <Tabs variant="pill" size="sm" v-model="sm">
            <TabsList>
              <TabsTrigger value="a">Home</TabsTrigger>
              <TabsTrigger value="b">Profile</TabsTrigger>
              <TabsTrigger value="c">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <p class="text-xs font-semibold text-[--color-text-secondary] uppercase tracking-wider mb-3">Medium (default)</p>
          <Tabs variant="pill" size="md" v-model="md">
            <TabsList>
              <TabsTrigger value="a">Home</TabsTrigger>
              <TabsTrigger value="b">Profile</TabsTrigger>
              <TabsTrigger value="c">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <p class="text-xs font-semibold text-[--color-text-secondary] uppercase tracking-wider mb-3">Large</p>
          <Tabs variant="pill" size="lg" v-model="lg">
            <TabsList>
              <TabsTrigger value="a">Home</TabsTrigger>
              <TabsTrigger value="b">Profile</TabsTrigger>
              <TabsTrigger value="c">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const active = ref('profile')
      return { active }
    },
    template: `
      <Tabs variant="line" orientation="vertical" v-model="active" style="max-width:500px">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <div class="flex-1 pl-4">
          <TabsContent value="profile">
            <h3 class="font-semibold text-[--color-text-heading] mb-2">Profile Settings</h3>
            <p class="text-sm text-[--color-text-secondary]">Manage your profile information and preferences.</p>
          </TabsContent>
          <TabsContent value="notifications">
            <h3 class="font-semibold text-[--color-text-heading] mb-2">Notifications</h3>
            <p class="text-sm text-[--color-text-secondary]">Configure how and when you receive notifications.</p>
          </TabsContent>
          <TabsContent value="security">
            <h3 class="font-semibold text-[--color-text-heading] mb-2">Security</h3>
            <p class="text-sm text-[--color-text-secondary]">Manage passwords, two-factor authentication, and sessions.</p>
          </TabsContent>
          <TabsContent value="billing">
            <h3 class="font-semibold text-[--color-text-heading] mb-2">Billing</h3>
            <p class="text-sm text-[--color-text-secondary]">View invoices and manage your payment methods.</p>
          </TabsContent>
        </div>
      </Tabs>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent, RiHomeLine, RiUserLine, RiSettings4Line, RiBellLine },
    setup() {
      const active = ref('home')
      return { active }
    },
    template: `
      <Tabs variant="pill" v-model="active" style="max-width:500px">
        <TabsList>
          <TabsTrigger value="home">
            <RiHomeLine :size="14" />
            Home
          </TabsTrigger>
          <TabsTrigger value="profile">
            <RiUserLine :size="14" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <RiBellLine :size="14" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="settings">
            <RiSettings4Line :size="14" />
            Settings
          </TabsTrigger>
        </TabsList>
        <div class="pt-4">
          <TabsContent value="home"><p class="text-sm text-[--color-text-secondary]">Home content</p></TabsContent>
          <TabsContent value="profile"><p class="text-sm text-[--color-text-secondary]">Profile content</p></TabsContent>
          <TabsContent value="notifications"><p class="text-sm text-[--color-text-secondary]">Notifications content</p></TabsContent>
          <TabsContent value="settings"><p class="text-sm text-[--color-text-secondary]">Settings content</p></TabsContent>
        </div>
      </Tabs>
    `,
  }),
}

export const WithDisabledTab: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    setup() {
      const active = ref('active1')
      return { active }
    },
    template: `
      <Tabs variant="line" v-model="active" style="max-width:500px">
        <TabsList>
          <TabsTrigger value="active1">Active Tab</TabsTrigger>
          <TabsTrigger value="active2">Another Tab</TabsTrigger>
          <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
          <TabsTrigger value="active3">Last Tab</TabsTrigger>
        </TabsList>
        <div class="pt-4">
          <TabsContent value="active1"><p class="text-sm text-[--color-text-secondary]">First tab content</p></TabsContent>
          <TabsContent value="active2"><p class="text-sm text-[--color-text-secondary]">Second tab content</p></TabsContent>
          <TabsContent value="active3"><p class="text-sm text-[--color-text-secondary]">Third tab content</p></TabsContent>
        </div>
      </Tabs>
    `,
  }),
}
