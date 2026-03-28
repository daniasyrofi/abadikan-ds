import type { Meta, StoryObj } from '@storybook/vue3'
import WelcomePage from './Welcome.vue'

const meta: Meta<typeof WelcomePage> = {
  title: 'Welcome',
  component: WelcomePage,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false, // hide the addons panel
    },
  },
}

export default meta

type Story = StoryObj<typeof WelcomePage>

export const Default: Story = {
  render: () => ({
    components: { WelcomePage },
    template: '<WelcomePage />',
  }),
}
