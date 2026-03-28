import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from './Card.vue'

// ── Canvas decorator ───────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background-color: var(--color-bg);
      background-image: radial-gradient(circle, var(--color-border) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <story />
    </div>
  `,
})

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant:   { control: 'select', options: ['default', 'outlined', 'elevated', 'flat', 'glass'] },
    padding:   { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    radius:    { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
    as:        { control: 'text' },
  },
  args: {
    variant:   'default',
    padding:   'md',
    radius:    'lg',
    hoverable: false,
    clickable: false,
    as:        'div',
  },
}
export default meta
type Story = StoryObj<typeof Card>

// ── Helpers ────────────────────────────────────────────────────────────────────

const avatar = (initials: string, color: string) => `
  <div style="
    width:40px; height:40px; border-radius:var(--radius-full);
    background:${color}; display:flex; align-items:center; justify-content:center;
    font-size:14px; font-weight:700; color:#fff; flex-shrink:0; letter-spacing:0.03em;
  ">${initials}</div>
`

const badge = (label: string, color: string, bg: string) => `
  <span style="
    display:inline-flex; align-items:center;
    padding:2px 8px; border-radius:var(--radius-full);
    font-size:11px; font-weight:600; letter-spacing:0.04em;
    color:${color}; background:${bg};
  ">${label}</span>
`

const divider = `<div style="height:1px; background:var(--color-border); margin:12px 0;"></div>`

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" style="width:320px">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:16px;">
          <div>
            <p style="font-size:12px; font-weight:500; color:var(--color-text-secondary); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;">Monthly Revenue</p>
            <p style="font-size:28px; font-weight:700; color:var(--color-text-heading); line-height:1;">$48,295</p>
          </div>
          <span style="
            display:inline-flex; align-items:center; gap:3px;
            padding:4px 8px; border-radius:var(--radius-full);
            font-size:12px; font-weight:600;
            color:var(--color-success); background:var(--color-success-light);
          ">↑ 12.4%</span>
        </div>
        <div style="height:56px; border-radius:var(--radius-md); background:var(--color-neutral-light); display:flex; align-items:flex-end; gap:3px; padding:8px;">
          ${[40, 60, 45, 70, 55, 80, 65, 90, 72, 95, 82, 100].map(h =>
            `<div style="flex:1; height:${h}%; border-radius:2px 2px 0 0; background:var(--color-primary); opacity:${0.3 + h / 200};"></div>`
          ).join('')}
        </div>
        <p style="font-size:12px; color:var(--color-text-tertiary); margin-top:8px;">vs. $42,810 last month</p>
      </Card>
    `,
  }),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:20px; align-items:flex-start; max-width:900px;">

        <Card variant="default" style="width:200px; min-height:110px">
          <p style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-text-tertiary); margin-bottom:8px;">Default</p>
          <p style="font-size:13px; color:var(--color-text-primary); line-height:1.5;">Shadow + inset border. The standard card style.</p>
        </Card>

        <Card variant="outlined" style="width:200px; min-height:110px">
          <p style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-text-tertiary); margin-bottom:8px;">Outlined</p>
          <p style="font-size:13px; color:var(--color-text-primary); line-height:1.5;">Border only, no shadow. Clean & flat.</p>
        </Card>

        <Card variant="elevated" style="width:200px; min-height:110px">
          <p style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-text-tertiary); margin-bottom:8px;">Elevated</p>
          <p style="font-size:13px; color:var(--color-text-primary); line-height:1.5;">Strong shadow. Floats above the page.</p>
        </Card>

        <Card variant="flat" style="width:200px; min-height:110px">
          <p style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-text-tertiary); margin-bottom:8px;">Flat</p>
          <p style="font-size:13px; color:var(--color-text-primary); line-height:1.5;">No border, no shadow. Just background.</p>
        </Card>

      </div>
    `,
  }),
}

export const ProfileCard: Story = {
  name: 'Profile Card',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start;">

        <Card style="width:280px">
          <div style="display:flex; flex-direction:column; align-items:center; text-align:center; gap:12px; padding:8px 0 4px;">
            <div style="position:relative;">
              <div style="
                width:64px; height:64px; border-radius:var(--radius-full);
                background:linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
                display:flex; align-items:center; justify-content:center;
                font-size:22px; font-weight:700; color:#fff;
              ">DA</div>
              <div style="
                position:absolute; bottom:2px; right:2px;
                width:12px; height:12px; border-radius:50%;
                background:var(--color-success); border:2px solid var(--color-surface);
              "></div>
            </div>
            <div>
              <p style="font-size:15px; font-weight:600; color:var(--color-text-heading);">Dania Syrofi</p>
              <p style="font-size:13px; color:var(--color-text-secondary); margin-top:2px;">Product Designer · Jakarta</p>
            </div>
            <div style="display:flex; gap:8px;">
              <span style="display:inline-flex; align-items:center; padding:3px 10px; border-radius:var(--radius-full); font-size:11px; font-weight:600; color:var(--color-primary); background:var(--color-primary-light);">Design</span>
              <span style="display:inline-flex; align-items:center; padding:3px 10px; border-radius:var(--radius-full); font-size:11px; font-weight:600; color:var(--color-secondary); background:var(--color-secondary-light);">UI/UX</span>
            </div>
            <div style="height:1px; background:var(--color-border); width:100%;"></div>
            <div style="display:flex; gap:24px; width:100%; justify-content:center;">
              <div style="text-align:center;">
                <p style="font-size:16px; font-weight:700; color:var(--color-text-heading);">128</p>
                <p style="font-size:11px; color:var(--color-text-tertiary);">Projects</p>
              </div>
              <div style="text-align:center;">
                <p style="font-size:16px; font-weight:700; color:var(--color-text-heading);">4.9k</p>
                <p style="font-size:11px; color:var(--color-text-tertiary);">Followers</p>
              </div>
              <div style="text-align:center;">
                <p style="font-size:16px; font-weight:700; color:var(--color-text-heading);">312</p>
                <p style="font-size:11px; color:var(--color-text-tertiary);">Following</p>
              </div>
            </div>
            <button style="
              width:100%; padding:8px; border-radius:var(--radius-md);
              background:var(--color-neutral); color:var(--color-text-inverse);
              font-size:13px; font-weight:600; border:none; cursor:pointer;
            ">Follow</button>
          </div>
        </Card>

        <Card style="width:280px">
          <div style="display:flex; align-items:flex-start; gap:12px; margin-bottom:12px;">
            <div style="
              width:44px; height:44px; border-radius:var(--radius-full); flex-shrink:0;
              background:var(--color-info-light);
              display:flex; align-items:center; justify-content:center;
              font-size:16px; font-weight:700; color:var(--color-info);
            ">RA</div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; justify-content:space-between;">
                <p style="font-size:14px; font-weight:600; color:var(--color-text-heading);">Rizky Aulia</p>
                <span style="font-size:11px; color:var(--color-text-tertiary);">2h ago</span>
              </div>
              <p style="font-size:12px; color:var(--color-text-secondary);">Frontend Engineer</p>
            </div>
          </div>
          <p style="font-size:13px; color:var(--color-text-primary); line-height:1.6; margin-bottom:12px;">
            Just shipped the new design system tokens. Dark mode is finally working flawlessly across all components! 🎉
          </p>
          <div style="height:1px; background:var(--color-border); margin-bottom:10px;"></div>
          <div style="display:flex; gap:16px;">
            <button style="display:flex; align-items:center; gap:5px; background:none; border:none; cursor:pointer; font-size:12px; color:var(--color-text-secondary);">
              ♡ 48
            </button>
            <button style="display:flex; align-items:center; gap:5px; background:none; border:none; cursor:pointer; font-size:12px; color:var(--color-text-secondary);">
              ↩ Reply
            </button>
            <button style="display:flex; align-items:center; gap:5px; background:none; border:none; cursor:pointer; font-size:12px; color:var(--color-text-secondary);">
              ⤴ Share
            </button>
          </div>
        </Card>

      </div>
    `,
  }),
}

export const WithMedia: Story = {
  name: 'With Media',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start;">

        <Card style="width:280px">
          <template #media>
            <div style="height:160px; background:linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); display:flex; align-items:flex-end; padding:16px;">
              <span style="
                display:inline-flex; align-items:center; padding:3px 10px; border-radius:var(--radius-full);
                font-size:11px; font-weight:600; color:#fff; background:rgba(255,255,255,0.2);
                backdrop-filter:blur(8px);
              ">Wedding</span>
            </div>
          </template>
          <template #header>
            <div style="width:100%;">
              <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:8px;">
                <h3 style="font-size:15px; font-weight:600; color:var(--color-text-heading); line-height:1.3;">Syrofi & Nadira Wedding</h3>
                <span style="
                  flex-shrink:0; display:inline-flex; align-items:center; padding:2px 8px;
                  border-radius:var(--radius-full); font-size:11px; font-weight:600;
                  color:var(--color-success); background:var(--color-success-light);
                ">Published</span>
              </div>
              <p style="font-size:12px; color:var(--color-text-tertiary); margin-top:4px;">📅 12 Maret 2025 · Gedung Serbaguna Jakarta</p>
            </div>
          </template>
          <p style="font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
            A beautiful celebration of love. 248 guests confirmed, 12 pending RSVP.
          </p>
          <template #footer>
            <div style="display:flex; align-items:center; gap:8px; width:100%;">
              <button style="
                flex:1; padding:7px; border-radius:var(--radius-md);
                background:var(--color-neutral); color:var(--color-text-inverse);
                font-size:13px; font-weight:600; border:none; cursor:pointer;
              ">View Invitation</button>
              <button style="
                padding:7px 12px; border-radius:var(--radius-md);
                background:transparent; color:var(--color-text-secondary);
                font-size:13px; font-weight:500; border:1px solid var(--color-border); cursor:pointer;
              ">Edit</button>
            </div>
          </template>
        </Card>

        <Card style="width:280px">
          <template #media>
            <div style="height:160px; background:linear-gradient(135deg, var(--color-info) 0%, #6366f1 100%); display:flex; align-items:flex-end; padding:16px;">
              <span style="
                display:inline-flex; align-items:center; padding:3px 10px; border-radius:var(--radius-full);
                font-size:11px; font-weight:600; color:#fff; background:rgba(255,255,255,0.2);
                backdrop-filter:blur(8px);
              ">Birthday</span>
            </div>
          </template>
          <template #header>
            <div style="width:100%;">
              <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:8px;">
                <h3 style="font-size:15px; font-weight:600; color:var(--color-text-heading); line-height:1.3;">Ahmad's 30th Birthday</h3>
                <span style="
                  flex-shrink:0; display:inline-flex; align-items:center; padding:2px 8px;
                  border-radius:var(--radius-full); font-size:11px; font-weight:600;
                  color:var(--color-warning); background:var(--color-warning-light);
                ">Draft</span>
              </div>
              <p style="font-size:12px; color:var(--color-text-tertiary); margin-top:4px;">📅 5 Juli 2025 · Sky Rooftop, Bandung</p>
            </div>
          </template>
          <p style="font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
            A rooftop celebration under the stars. RSVP not yet opened.
          </p>
          <template #footer>
            <div style="display:flex; align-items:center; gap:8px; width:100%;">
              <button style="
                flex:1; padding:7px; border-radius:var(--radius-md);
                background:var(--color-neutral); color:var(--color-text-inverse);
                font-size:13px; font-weight:600; border:none; cursor:pointer;
              ">Continue Editing</button>
              <button style="
                padding:7px 12px; border-radius:var(--radius-md);
                background:transparent; color:var(--color-text-secondary);
                font-size:13px; font-weight:500; border:1px solid var(--color-border); cursor:pointer;
              ">Preview</button>
            </div>
          </template>
        </Card>

      </div>
    `,
  }),
}

export const StatsRow: Story = {
  name: 'Stats Row',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:stretch; max-width:900px;">

        <Card style="flex:1; min-width:180px">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px;">
            <div style="
              width:36px; height:36px; border-radius:var(--radius-md); flex-shrink:0;
              background:var(--color-primary-light);
              display:flex; align-items:center; justify-content:center; font-size:18px;
            ">💌</div>
            <span style="
              padding:2px 7px; border-radius:var(--radius-full);
              font-size:11px; font-weight:600;
              color:var(--color-success); background:var(--color-success-light);
            ">+8.2%</span>
          </div>
          <p style="font-size:26px; font-weight:700; color:var(--color-text-heading); line-height:1;">1,284</p>
          <p style="font-size:12px; color:var(--color-text-secondary); margin-top:4px;">Total Invitations</p>
        </Card>

        <Card style="flex:1; min-width:180px">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px;">
            <div style="
              width:36px; height:36px; border-radius:var(--radius-md); flex-shrink:0;
              background:var(--color-success-light);
              display:flex; align-items:center; justify-content:center; font-size:18px;
            ">👥</div>
            <span style="
              padding:2px 7px; border-radius:var(--radius-full);
              font-size:11px; font-weight:600;
              color:var(--color-success); background:var(--color-success-light);
            ">+24.1%</span>
          </div>
          <p style="font-size:26px; font-weight:700; color:var(--color-text-heading); line-height:1;">8,942</p>
          <p style="font-size:12px; color:var(--color-text-secondary); margin-top:4px;">Guest RSVPs</p>
        </Card>

        <Card style="flex:1; min-width:180px">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px;">
            <div style="
              width:36px; height:36px; border-radius:var(--radius-md); flex-shrink:0;
              background:var(--color-warning-light);
              display:flex; align-items:center; justify-content:center; font-size:18px;
            ">👁</div>
            <span style="
              padding:2px 7px; border-radius:var(--radius-full);
              font-size:11px; font-weight:600;
              color:var(--color-warning); background:var(--color-warning-light);
            ">+3.8%</span>
          </div>
          <p style="font-size:26px; font-weight:700; color:var(--color-text-heading); line-height:1;">42.6k</p>
          <p style="font-size:12px; color:var(--color-text-secondary); margin-top:4px;">Total Views</p>
        </Card>

        <Card style="flex:1; min-width:180px">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px;">
            <div style="
              width:36px; height:36px; border-radius:var(--radius-md); flex-shrink:0;
              background:var(--color-info-light);
              display:flex; align-items:center; justify-content:center; font-size:18px;
            ">⭐</div>
            <span style="
              padding:2px 7px; border-radius:var(--radius-full);
              font-size:11px; font-weight:600;
              color:var(--color-danger); background:color-mix(in oklch, var(--color-danger) 12%, transparent);
            ">-0.2</span>
          </div>
          <p style="font-size:26px; font-weight:700; color:var(--color-text-heading); line-height:1;">4.87</p>
          <p style="font-size:12px; color:var(--color-text-secondary); margin-top:4px;">Avg. Rating</p>
        </Card>

      </div>
    `,
  }),
}

export const Clickable: Story = {
  name: 'Clickable Cards',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; max-width:720px;">

        <Card v-for="(item, i) in features" :key="i"
          hoverable clickable radius="lg"
          @click="() => {}"
        >
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div :style="{
              width:'40px', height:'40px', borderRadius:'var(--radius-md)',
              background:item.bg, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'20px',
            }">{{ item.icon }}</div>
            <div>
              <p style="font-size:13px; font-weight:600; color:var(--color-text-heading);">{{ item.name }}</p>
              <p style="font-size:12px; color:var(--color-text-secondary); margin-top:3px; line-height:1.5;">{{ item.desc }}</p>
            </div>
            <div style="
              display:flex; align-items:center; gap:4px;
              font-size:12px; font-weight:500; color:var(--color-primary);
            ">Open →</div>
          </div>
        </Card>

      </div>
    `,
    setup() {
      return {
        features: [
          { icon: '✉️', name: 'Invitations',  desc: 'Create and manage your event invitations',     bg: 'var(--color-primary-light)' },
          { icon: '👥', name: 'Guest List',   desc: 'Track RSVPs and manage your guests',           bg: 'var(--color-success-light)' },
          { icon: '🎨', name: 'Themes',       desc: 'Beautiful templates for every occasion',       bg: 'var(--color-secondary-light)' },
          { icon: '📊', name: 'Analytics',    desc: 'View page visits, opens, and responses',       bg: 'var(--color-info-light)' },
          { icon: '💬', name: 'Messages',     desc: 'Chat with guests and send announcements',      bg: 'var(--color-warning-light)' },
          { icon: '⚙️', name: 'Settings',     desc: 'Configure your account and preferences',      bg: 'var(--color-neutral-light)' },
        ],
      }
    },
  }),
}

export const WithSlots: Story = {
  name: 'With Header & Footer',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex; gap:20px; flex-wrap:wrap; align-items:flex-start;">

        <Card style="width:320px">
          <template #header>
            <div style="display:flex; align-items:center; gap:10px; width:100%;">
              <div style="
                width:36px; height:36px; border-radius:var(--radius-full); flex-shrink:0;
                background:linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                display:flex; align-items:center; justify-content:center;
                font-size:14px; font-weight:700; color:#fff;
              ">WN</div>
              <div style="flex:1; min-width:0;">
                <p style="font-size:14px; font-weight:600; color:var(--color-text-heading);">Wedding Night</p>
                <p style="font-size:12px; color:var(--color-text-tertiary);">Last edited 2 hours ago</p>
              </div>
              <span style="
                padding:3px 8px; border-radius:var(--radius-full);
                font-size:11px; font-weight:600;
                color:var(--color-success); background:var(--color-success-light);
              ">Live</span>
            </div>
          </template>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="
              display:grid; grid-template-columns:1fr 1fr; gap:8px;
            ">
              <div style="
                padding:10px 12px; border-radius:var(--radius-md);
                background:var(--color-neutral-light);
              ">
                <p style="font-size:20px; font-weight:700; color:var(--color-text-heading);">248</p>
                <p style="font-size:11px; color:var(--color-text-tertiary); margin-top:1px;">Confirmed</p>
              </div>
              <div style="
                padding:10px 12px; border-radius:var(--radius-md);
                background:var(--color-neutral-light);
              ">
                <p style="font-size:20px; font-weight:700; color:var(--color-warning);">12</p>
                <p style="font-size:11px; color:var(--color-text-tertiary); margin-top:1px;">Pending</p>
              </div>
            </div>
            <div style="height:6px; border-radius:var(--radius-full); background:var(--color-neutral-light); overflow:hidden;">
              <div style="height:100%; width:95%; border-radius:var(--radius-full); background:var(--color-success);"></div>
            </div>
            <p style="font-size:12px; color:var(--color-text-secondary);">260 of 275 guests responded · <strong>95%</strong> response rate</p>
          </div>

          <template #footer>
            <button style="
              flex:1; padding:7px 16px; border-radius:var(--radius-md);
              background:var(--color-neutral); color:var(--color-text-inverse);
              font-size:13px; font-weight:600; border:none; cursor:pointer;
            ">View Details</button>
            <button style="
              padding:7px 12px; border-radius:var(--radius-md);
              background:transparent; color:var(--color-text-secondary);
              font-size:13px; font-weight:500; border:1px solid var(--color-border); cursor:pointer;
            ">Share</button>
          </template>
        </Card>

        <Card variant="outlined" style="width:280px">
          <template #header>
            <div>
              <h3 style="font-size:15px; font-weight:600; color:var(--color-text-heading);">Recent Activity</h3>
              <p style="font-size:12px; color:var(--color-text-tertiary); margin-top:2px;">Last 24 hours</p>
            </div>
          </template>
          <div style="display:flex; flex-direction:column; gap:0;">
            ${[
              ['🎉', 'Ahmad confirmed attendance', '5m ago'],
              ['✉️', 'New invitation sent to Sari', '1h ago'],
              ['👁', 'Invitation viewed 12 times', '2h ago'],
              ['💬', '3 new messages from guests', '4h ago'],
            ].map(([icon, text, time]) => `
              <div style="display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--color-border-subtle);">
                <span style="font-size:16px; flex-shrink:0;">${icon}</span>
                <p style="flex:1; font-size:12px; color:var(--color-text-primary); line-height:1.4;">${text}</p>
                <span style="font-size:11px; color:var(--color-text-tertiary); white-space:nowrap; flex-shrink:0;">${time}</span>
              </div>
            `).join('')}
          </div>
          <template #footer>
            <button style="
              width:100%; padding:6px; border-radius:var(--radius-md);
              background:transparent; color:var(--color-primary);
              font-size:13px; font-weight:500; border:none; cursor:pointer;
              text-align:center;
            ">View all activity →</button>
          </template>
        </Card>

      </div>
    `,
  }),
}

export const AllRadii: Story = {
  name: 'All Radii',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:flex-start;">
        <Card v-for="r in ['sm','md','lg','xl']" :key="r" :radius="r" variant="default" style="width:140px; min-height:100px">
          <p style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; color:var(--color-text-tertiary); margin-bottom:6px;">{{ r.toUpperCase() }}</p>
          <p style="font-size:20px; font-weight:700; color:var(--color-text-heading);">{{ { sm: '8px', md: '12px', lg: '16px', xl: '20px' }[r] }}</p>
          <p style="font-size:12px; color:var(--color-text-secondary); margin-top:2px;">radius</p>
        </Card>
      </div>
    `,
  }),
}

export const Notification: Story = {
  name: 'Notification Card',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex; flex-direction:column; gap:8px; width:360px;">

        <Card variant="outlined" padding="sm" radius="lg">
          <div style="display:flex; align-items:flex-start; gap:12px;">
            <div style="
              width:36px; height:36px; border-radius:var(--radius-full); flex-shrink:0;
              background:var(--color-success-light);
              display:flex; align-items:center; justify-content:center; font-size:16px;
            ">✅</div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:3px;">
                <p style="font-size:13px; font-weight:600; color:var(--color-text-heading);">RSVP Confirmed</p>
                <span style="font-size:11px; color:var(--color-text-tertiary);">now</span>
              </div>
              <p style="font-size:12px; color:var(--color-text-secondary); line-height:1.5;">Budi Santoso confirmed attendance for <strong>Syrofi & Nadira Wedding</strong>.</p>
            </div>
          </div>
        </Card>

        <Card variant="outlined" padding="sm" radius="lg">
          <div style="display:flex; align-items:flex-start; gap:12px; opacity:0.65;">
            <div style="
              width:36px; height:36px; border-radius:var(--radius-full); flex-shrink:0;
              background:var(--color-neutral-light);
              display:flex; align-items:center; justify-content:center; font-size:16px;
            ">👁</div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:3px;">
                <p style="font-size:13px; font-weight:600; color:var(--color-text-heading);">Invitation Viewed</p>
                <span style="font-size:11px; color:var(--color-text-tertiary);">5m ago</span>
              </div>
              <p style="font-size:12px; color:var(--color-text-secondary); line-height:1.5;">Your invitation was opened 8 times in the last hour.</p>
            </div>
          </div>
        </Card>

        <Card variant="outlined" padding="sm" radius="lg">
          <div style="display:flex; align-items:flex-start; gap:12px; opacity:0.65;">
            <div style="
              width:36px; height:36px; border-radius:var(--radius-full); flex-shrink:0;
              background:var(--color-primary-light);
              display:flex; align-items:center; justify-content:center; font-size:16px;
            ">💬</div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:3px;">
                <p style="font-size:13px; font-weight:600; color:var(--color-text-heading);">New Message</p>
                <span style="font-size:11px; color:var(--color-text-tertiary);">1h ago</span>
              </div>
              <p style="font-size:12px; color:var(--color-text-secondary); line-height:1.5;">Siti: "Can we add a +1 to the guest list? 🙏"</p>
            </div>
          </div>
        </Card>

      </div>
    `,
  }),
}
