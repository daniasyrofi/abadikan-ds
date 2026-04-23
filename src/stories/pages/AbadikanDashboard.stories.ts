import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Divider from '@/components/atoms/Divider/Divider.vue'
import KBD from '@/components/atoms/KBD/KBD.vue'
import Input from '@/components/atoms/Input/Input.vue'

const DashboardPage = defineComponent({ template: '<div />' })

// Override --color-primary to pink so Button variant="primary" renders pink
const canvas = () => ({
  template: `
    <div style="min-height:100vh;background-color:#FAFAF7;--color-primary:#EC4899;--color-primary-hover:#DB2777;--color-primary-subtle:rgba(236,72,153,0.08);--color-primary-text:#EC4899;">
      <story />
    </div>
  `,
})

const meta: Meta = {
  title: 'Pages/Abadikan — Dashboard',
  component: DashboardPage,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dashboard **Abadikan.id** — pink brand palette, inspired by Jenius (pink-black-white authority), Linear (workspace → project hierarchy), Notion (workspace switcher), Bridestory (premium wedding editorial), Flip (warm conversational copy). Tiga state: baru, aktif, H-1.',
      },
    },
  },
}
export default meta
type Story = StoryObj

// ── Brand tokens ──────────────────────────────────────────────────────────────
const BRAND = '#EC4899'
const BRAND_DEEP = '#DB2777'
const BRAND_DARK = '#BE185D'
const BRAND_SOFT = '#FDF2F8'
const BRAND_TINT = '#FCE7F3'
const BRAND_LINE = '#F9A8D4'

const BG = '#FAFAF7'
const INK = '#0F172A'
const INK_SOFT = '#1E293B'
const MUTED = '#64748B'
const MUTED_SOFT = '#94A3B8'
const SURFACE = '#FFFFFF'
const BORDER = '#E8E6E0'
const BORDER_SOFT = '#F0EEE8'
const HAIRLINE = '#EEECEA'
const SUCCESS = '#047857'
const SUCCESS_BG = 'rgba(16,185,129,0.09)'
const DANGER = '#DC2626'

// ── Shell (topbar full-width above sidebar+main) ──────────────────────────────
const SHELL = `display:flex;flex-direction:column;height:100vh;overflow:hidden;width:100%;background-color:${BG};`
const CONTENT_AREA = `display:grid;grid-template-columns:244px 1fr;flex:1;overflow:hidden;min-height:0;`
const SIDEBAR = `background-color:${SURFACE};border-right:1px solid ${BORDER};display:flex;flex-direction:column;height:100%;padding:0.75rem 0.625rem 0.75rem;box-sizing:border-box;z-index:20;overflow-y:auto;`
const SCROLL_COL = `overflow-y:auto;height:100%;`

// ── Popups ────────────────────────────────────────────────────────────────────
const POPUP_BASE = `position:absolute;z-index:50;background:${SURFACE};border:1px solid ${BORDER};border-radius:14px;box-shadow:0 2px 4px rgba(15,23,42,0.04), 0 12px 28px -8px rgba(15,23,42,0.12), 0 16px 64px -16px rgba(15,23,42,0.08);padding:0.375rem;`
const POPUP_LABEL = `font-size:10.5px;font-weight:600;letter-spacing:0.08em;color:${MUTED_SOFT};text-transform:uppercase;padding:0.625rem 0.625rem 0.375rem;`

// Context switcher popup (tiles)
const CTX_POP_TILE = `display:block;padding:0.75rem;border-radius:10px;border:1px solid ${BORDER_SOFT};background:${SURFACE};cursor:pointer;text-decoration:none;color:inherit;transition:all .15s;text-align:left;font-family:inherit;width:100%;`
const CTX_POP_TILE_ACTIVE = `border-color:${BRAND};background:${BRAND_SOFT};`

// Account menu
const ACCT_HEADER = `display:flex;align-items:center;gap:0.625rem;padding:0.75rem;border-radius:10px;`
const ACCT_ITEM = `display:flex;align-items:center;gap:0.625rem;padding:0.625rem 0.75rem;border-radius:8px;cursor:pointer;text-decoration:none;color:${INK};transition:background .12s;font-family:inherit;width:100%;border:none;background:transparent;text-align:left;font-size:13.5px;font-weight:500;`

// ── Topbar (compact Attio/Notion-style, ~52px) ───────────────────────────────
const TOPBAR = `display:flex;align-items:center;justify-content:space-between;height:52px;padding:0 1.5rem;background-color:${SURFACE};border-bottom:1px solid ${BORDER};position:sticky;top:0;z-index:15;`
const TOPBAR_LEFT = 'display:flex;align-items:center;gap:0.5rem;flex-shrink:0;'
const TOPBAR_SEP = `width:1px;height:18px;background:${BORDER};margin:0 0.125rem;`
const TOPBAR_WS_BTN = `display:inline-flex;align-items:center;gap:0.375rem;padding:0.3125rem 0.5rem;border-radius:7px;border:none;background:transparent;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;color:${INK};letter-spacing:-0.1px;transition:background .12s;`
const TOPBAR_RIGHT = 'display:flex;align-items:center;gap:0.375rem;'
const ICON_BTN = `width:34px;height:34px;border-radius:9px;border:1px solid transparent;background:transparent;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;color:${MUTED};transition:all .15s;position:relative;`

// Logo mark (inline SVG pink box with heart)
// LOGO_MARK moved to ICO.logoMark

// ── Sidebar nav ───────────────────────────────────────────────────────────────
const NAV = 'display:flex;flex-direction:column;gap:1px;'
const NAV_LABEL = `font-size:10.5px;font-weight:600;letter-spacing:0.09em;color:${MUTED_SOFT};text-transform:uppercase;padding:0.625rem 0.5rem 0.375rem;`
const NAV_ITEM = `display:flex;align-items:center;gap:0.625rem;padding:0.4375rem 0.5rem;border-radius:7px;font-size:13px;font-weight:500;color:${INK_SOFT};cursor:pointer;transition:all .12s ease;text-decoration:none;line-height:1rem;position:relative;`

// Plan banner
const PLAN_BANNER = `margin:0 0 0.625rem;padding:0.75rem;border-radius:12px;background:linear-gradient(135deg, ${BRAND_SOFT} 0%, #FDE8F4 100%);border:1px solid ${BRAND_TINT};`

// Tip card (bottom of sidebar)
const TIP_CARD = `margin:0.5rem 0 0;padding:0.875rem;border-radius:12px;background:linear-gradient(135deg, ${BRAND_SOFT} 0%, #FDE8F4 100%);border:1px solid ${BRAND_TINT};position:relative;`

// Nav sub-items (indented)
const NAV_SUB_ITEM = `display:flex;align-items:center;gap:0.5rem;padding:0.375rem 0.5rem 0.375rem 1.75rem;border-radius:7px;font-size:12.5px;font-weight:500;color:${MUTED};cursor:pointer;transition:all .12s ease;text-decoration:none;line-height:1rem;`
const NAV_NEW_INV = `display:flex;align-items:center;gap:0.5rem;padding:0.375rem 0.5rem 0.375rem 1.5rem;border-radius:7px;font-size:12.5px;font-weight:500;color:${BRAND_DEEP};cursor:pointer;transition:all .12s ease;text-decoration:none;line-height:1rem;`

// ── Bento hero ───────────────────────────────────────────────────────────────
const BENTO_HERO = 'display:grid;grid-template-columns:1.7fr 1fr;gap:1rem;'

const COUPLE_CARD = `position:relative;padding:1.75rem 1.75rem 1.5rem;border-radius:18px;background:${SURFACE};border:1px solid ${BORDER};overflow:hidden;`
const COUPLE_CARD_DECOR = `position:absolute;right:-40px;top:-30px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle, ${BRAND_SOFT} 0%, transparent 70%);pointer-events:none;`
const COUPLE_META = `font-size:11.5px;color:${MUTED};font-weight:500;letter-spacing:0.02em;`
const COUPLE_NAMES = `font-family:'AbadikanSans', 'Playfair Display', Georgia, serif;font-size:52px;font-weight:500;letter-spacing:-0.02em;color:${INK};margin:1.5rem 0 0.25rem;line-height:1.05;position:relative;z-index:1;`
const COUPLE_AMP = `color:${BRAND};font-style:italic;font-weight:400;padding:0 0.125rem;`
const COUPLE_SUB = `font-size:13.5px;color:${MUTED};margin:0;line-height:1.25rem;position:relative;z-index:1;`
const URL_STRIP = `display:flex;align-items:center;gap:0.5rem;margin-top:1.25rem;padding:0.5rem 0.5rem 0.5rem 0.875rem;border-radius:12px;background:${BG};border:1px solid ${BORDER_SOFT};position:relative;z-index:1;`
const URL_TEXT = `flex:1;min-width:0;font-size:13px;color:${INK_SOFT};font-family:'SF Mono',ui-monospace,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;`

// Countdown card
const COUNTDOWN_CARD = `position:relative;padding:1.75rem;border-radius:18px;background:linear-gradient(155deg, ${BRAND} 0%, ${BRAND_DARK} 100%);color:white;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;min-height:220px;box-shadow:0 12px 32px -12px rgba(219,39,119,0.5);`
const COUNTDOWN_LABEL = 'font-size:12px;font-weight:500;opacity:0.9;margin:0;letter-spacing:0.01em;display:flex;align-items:center;gap:5px;'
const COUNTDOWN_NUMBER = `font-family:'AbadikanSans', 'Playfair Display', Georgia, serif;font-size:96px;font-weight:500;letter-spacing:-0.04em;line-height:1;margin:0.25rem 0 0.125rem;font-variant-numeric:tabular-nums;`
const COUNTDOWN_UNIT = 'font-size:14px;font-weight:500;opacity:0.95;margin:0;'
const COUNTDOWN_DATE = 'display:flex;align-items:center;gap:6px;font-size:13px;font-weight:500;opacity:0.95;margin-top:1.25rem;position:relative;z-index:1;'

// ── Action strip ──────────────────────────────────────────────────────────────
const ACTION_STRIP = `display:flex;align-items:center;gap:1rem;padding:0.875rem 1.25rem;border-radius:14px;background:${SURFACE};border:1px solid ${BORDER};`
const ACTION_TEXT = 'flex:1;display:flex;flex-direction:column;gap:2px;min-width:0;'
const ACTION_TITLE = `font-size:14px;font-weight:600;color:${INK};margin:0;line-height:1.25rem;`
const ACTION_SUB = `font-size:13px;color:${MUTED};margin:0;line-height:1.125rem;`

// ── Metric tiles ─────────────────────────────────────────────────────────────
const METRIC_GRID = 'display:grid;grid-template-columns:repeat(4, 1fr);gap:1rem;'
const METRIC_TILE = `padding:1.125rem 1.25rem 1.25rem;border-radius:14px;background:${SURFACE};border:1px solid ${BORDER};position:relative;transition:border-color .15s;`
const METRIC_LABEL = `font-size:12.5px;font-weight:500;color:${MUTED};margin:0;letter-spacing:0.01em;`
const METRIC_VALUE_ROW = 'display:flex;align-items:baseline;gap:0.5rem;margin:0.375rem 0 0.5rem;'
const METRIC_VALUE = `font-size:32px;font-weight:700;color:${INK};letter-spacing:-0.6px;line-height:1;font-variant-numeric:tabular-nums;`
const DELTA_UP = 'display:inline-flex;align-items:center;gap:2px;font-size:11.5px;font-weight:600;color:#047857;'
const DELTA_DOWN = 'display:inline-flex;align-items:center;gap:2px;font-size:11.5px;font-weight:600;color:#B91C1C;'
const DELTA_FLAT = `display:inline-flex;align-items:center;gap:2px;font-size:11.5px;font-weight:500;color:${MUTED_SOFT};`
const METRIC_HINT = `font-size:12px;color:${MUTED};margin:0;line-height:1rem;`
const METRIC_HINT_LINK = `font-size:12px;color:${BRAND_DEEP};font-weight:500;margin:0;line-height:1rem;text-decoration:none;display:inline-flex;align-items:center;gap:2px;`

// ── Chart ────────────────────────────────────────────────────────────────────
const CHART_SECTION = `padding:1.5rem 1.5rem 1.25rem;border-radius:16px;background:${SURFACE};border:1px solid ${BORDER};`
const CHART_HEAD = 'display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;'
const CHART_TITLE = `font-size:15px;font-weight:600;color:${INK};margin:0;letter-spacing:-0.1px;`
const CHART_SUB = `font-size:12.5px;color:${MUTED};margin:2px 0 0;`
const SEGMENTED = `display:inline-flex;padding:3px;border-radius:10px;background:${BG};border:1px solid ${BORDER};gap:2px;`
const SEG_BTN = `padding:0.3125rem 0.75rem;border-radius:7px;font-size:12.5px;font-weight:500;cursor:pointer;transition:all .15s;border:none;background:transparent;color:${MUTED};font-family:inherit;`
const SEG_BTN_ACTIVE = `background:${SURFACE};color:${INK};font-weight:600;box-shadow:0 1px 2px rgba(15,23,42,0.06);`

// ── Bottom row ────────────────────────────────────────────────────────────────
const BOTTOM_GRID = 'display:grid;grid-template-columns:1.5fr 1fr;gap:1rem;'
const CARD_STD = `padding:1.25rem 1.5rem;border-radius:16px;background:${SURFACE};border:1px solid ${BORDER};`
const CARD_HEAD = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;'
const CARD_LINK = `font-size:12.5px;color:${INK_SOFT};font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:2px;`

const ACTIVITY_ROW = `display:flex;align-items:flex-start;gap:0.75rem;padding:0.75rem 0;border-top:1px solid ${HAIRLINE};`
const ACTIVITY_AVA = 'width:32px;height:32px;border-radius:999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;font-weight:600;color:white;'
const ACTIVITY_NAME = `font-size:13px;font-weight:600;color:${INK};margin:0;line-height:1.125rem;`
const ACTIVITY_TEXT = `font-size:13px;color:${INK_SOFT};margin:0;line-height:1.25rem;`
const ACTIVITY_TIME = `font-size:11.5px;color:${MUTED_SOFT};margin-top:2px;`
const ACTIVITY_QUOTE = `font-size:13px;color:${MUTED};margin:4px 0 0;line-height:1.25rem;font-style:italic;padding:0.375rem 0.75rem;border-left:2px solid ${BRAND_LINE};background:${BRAND_SOFT};border-radius:0 6px 6px 0;`

const ACTION_ROW = `display:flex;align-items:center;gap:0.75rem;padding:0.75rem 0;border-top:1px solid ${HAIRLINE};cursor:pointer;text-decoration:none;color:inherit;transition:padding-left .2s;`
const ACTION_ROW_ICON = `width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:${BRAND_SOFT};color:${BRAND_DEEP};flex-shrink:0;`
const ACTION_ROW_TITLE = `font-size:13.5px;font-weight:600;color:${INK};margin:0;line-height:1.125rem;`
const ACTION_ROW_SUB = `font-size:12px;color:${MUTED};margin:2px 0 0;line-height:1rem;`

// ── Types ─────────────────────────────────────────────────────────────────────
type Activity = {
  kind: 'rsvp-yes' | 'rsvp-no' | 'message' | 'view' | 'share'
  name: string
  text: string
  quote?: string
  time: string
  avatarBg: string
}

type InvitationItem = {
  id: string
  couple: string
  date: string
  slug: string
  status: 'aktif' | 'draft' | 'selesai'
}

type ProgressStep = { label: string; done: boolean; key?: 'slug' }

type DashboardData = {
  user: { firstName: string; fullName: string; email: string }
  couple: { first: string; second: string; date: string; day: string; url: string; daysLeft: number; hasSlug: boolean }
  activeInvId: string
  invitations: InvitationItem[]
  progress: {
    ready: boolean
    percent: number
    title: string
    sub: string
    ctaLabel: string
    ctaIcon?: string
    linkLabel?: string
    steps?: ProgressStep[]
  }
  metrics: Array<{ label: string; value: number; delta: number; hint: string; hintLink?: boolean }>
  chart: { views: number[]; unique: number[]; labels: string[] }
  activities: Activity[]
  referralEarnings: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtID(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' jt'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'rb'
  return String(n)
}

function fmtRp(n: number): string {
  if (n >= 1_000_000) return 'Rp ' + (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' jt'
  if (n >= 1_000) return 'Rp ' + (n / 1_000).toFixed(0) + 'rb'
  return 'Rp ' + n
}

function deltaChip(n: number): string {
  if (n > 0) return `<span style="${DELTA_UP}"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>${n}%</span>`
  if (n < 0) return `<span style="${DELTA_DOWN}"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>${Math.abs(n)}%</span>`
  return `<span style="${DELTA_FLAT}">—</span>`
}

function lineChartSVG(data: DashboardData['chart']): string {
  const W = 960, H = 240
  const padL = 36, padR = 16, padT = 12, padB = 32
  const innerW = W - padL - padR, innerH = H - padT - padB
  const { views, unique, labels } = data
  const n = views.length
  const maxVal = Math.max(10, ...views, ...unique)
  const niceMax = maxVal <= 10 ? 10 : Math.ceil(maxVal / 10) * 10
  const x = (i: number) => padL + (innerW * i) / (n - 1)
  const y = (v: number) => padT + innerH - (innerH * v) / niceMax

  const gridVals = [0, niceMax / 2, niceMax]
  const grid = gridVals.map(v => `<line x1="${padL}" x2="${W - padR}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="${BORDER_SOFT}" stroke-width="1" stroke-dasharray="${v === 0 ? '0' : '2 3'}" /><text x="${padL - 8}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end" fill="${MUTED_SOFT}" font-size="10.5">${fmtID(v)}</text>`).join('')

  const vPath = views.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const vArea = `M${padL},${(padT + innerH).toFixed(1)} ` + views.map((v, i) => `L${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ') + ` L${(W - padR).toFixed(1)},${(padT + innerH).toFixed(1)} Z`
  const uPath = unique.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const allZero = views.every(v => v === 0) && unique.every(v => v === 0)
  const lastDot = !allZero ? `<circle cx="${x(n - 1).toFixed(1)}" cy="${y(views[n - 1]).toFixed(1)}" r="10" fill="${BRAND}" fill-opacity="0.2" class="chart-pulse" /><circle cx="${x(n - 1).toFixed(1)}" cy="${y(views[n - 1]).toFixed(1)}" r="5" fill="${BRAND}" stroke="white" stroke-width="2" />` : ''
  const xLabels = labels.map((l, i) => `<text x="${x(i).toFixed(1)}" y="${(H - 12).toFixed(1)}" text-anchor="middle" fill="${MUTED_SOFT}" font-size="10.5">${l}</text>`).join('')

  return `
    <svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="display:block;max-height:280px;">
      <defs>
        <linearGradient id="viewsGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.14" />
          <stop offset="100%" stop-color="${BRAND}" stop-opacity="0" />
        </linearGradient>
      </defs>
      ${grid}
      ${allZero ? '' : `<path d="${vArea}" fill="url(#viewsGrad)" class="chart-area" />`}
      <path d="${vPath}" fill="none" stroke="${BRAND}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="chart-line" />
      <path d="${uPath}" fill="none" stroke="${MUTED_SOFT}" stroke-width="1.5" stroke-dasharray="4 5" stroke-linecap="round" class="chart-line" />
      ${lastDot}
      ${xLabels}
    </svg>
  `
}

// ── SVG icon strings (inline to avoid heavy imports) ──────────────────────────
const ICO = {
  grid: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>',
  heart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  heartFill: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  music: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  gift: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
  screen: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="22" x2="16" y2="22"/><line x1="12" y1="18" x2="12" y2="22"/></svg>',
  qr: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 14v3M17 21v-3M21 17v4"/></svg>',
  table: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="10" x2="9" y2="20"/></svg>',
  help: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  chevron: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
  chevRight: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  bell: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  giftSmall: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
  logout: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  sparkle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.39 7.36L22 12l-7.61 2.64L12 22l-2.39-7.36L2 12l7.61-2.64z"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  link: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  copy: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  wa: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.449C12.831-3.984.504 1.407.5 12.031.5 14.215.996 16.266 2.013 18.014L.5 23.5l5.636-1.477c6.906 1.76 16.364-3.58 16.38-10.992.014-6.614-6.055-11.606-1.996-7.582z"/></svg>',
  eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  logoMark: '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="30" rx="7" fill="#EC4899"/><path d="M15 21.5l-1.32-1.2C9.9 16.54 7.5 14.38 7.5 11.75A4.25 4.25 0 0 1 11.75 7.5c1.34 0 2.63.62 3.5 1.6A4.73 4.73 0 0 1 18.75 7.5 4.25 4.25 0 0 1 23 11.75c0 2.63-2.4 4.79-6.18 8.56L15 21.5z" fill="white"/></svg>',
}

// ── Page entrance styles ─────────────────────────────────────────────────────
function usePageEntrance() {
  onMounted(() => {
    if (document.getElementById('dash-page-css')) return
    const s = document.createElement('style')
    s.id = 'dash-page-css'
    s.textContent = [
      '@keyframes dash-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
      '@keyframes dash-draw{from{stroke-dashoffset:2200}to{stroke-dashoffset:0}}',
      '@keyframes dash-area{from{opacity:0}to{opacity:1}}',
      '@keyframes dash-pulse{0%,100%{opacity:0.15;r:8}50%{opacity:0.35;r:14}}',
      '.dash-block{animation:dash-in 480ms cubic-bezier(0.22,1,0.36,1) both}',
      '.dash-block:nth-of-type(1){animation-delay:0ms}.dash-block:nth-of-type(2){animation-delay:60ms}.dash-block:nth-of-type(3){animation-delay:120ms}.dash-block:nth-of-type(4){animation-delay:180ms}.dash-block:nth-of-type(5){animation-delay:240ms}',
      '.chart-line{stroke-dasharray:2200;animation:dash-draw 1100ms cubic-bezier(0.22,1,0.36,1) 320ms both}',
      '.chart-area{animation:dash-area 600ms ease-out 900ms both}',
      '.chart-pulse{animation:dash-pulse 2600ms ease-in-out 1400ms infinite}',
      `.metric-tile:hover{border-color:${BRAND_TINT}}`,
      `.icon-btn:hover{background:${BRAND_SOFT};color:${BRAND_DARK}}`,
      `.topbar-ws-btn:hover{background:${BRAND_SOFT}}`,
      `.url-btn:hover,.profile-btn:hover{border-color:${BRAND_TINT};background:${BRAND_SOFT}}`,
      `.nav-item:not(.nav-item-active):hover{background:${BRAND_SOFT};color:${BRAND_DARK}}`,
      `.nav-sub-item:hover{background:${BRAND_SOFT};color:${BRAND_DARK}}`,
      `.nav-new-inv:hover{background:${BRAND_SOFT}}`,
      `.action-row:hover{padding-left:4px}`,
      `.action-tile:hover{border-color:${BRAND_TINT}}`,
      `.ctx-tile:hover{border-color:${BRAND_TINT};background:${BRAND_SOFT}}`,
      `.inv-item:not(.inv-item-active):hover{background:${BRAND_SOFT}}`,
      `.acct-item:hover{background:${BRAND_SOFT}}`,
      '.popup-enter-active,.popup-leave-active{transition:opacity .14s ease,transform .14s cubic-bezier(0.22,1,0.36,1)}',
      '.popup-enter-from,.popup-leave-to{opacity:0;transform:translateY(-4px) scale(0.98)}',
      '.popup-enter-to,.popup-leave-from{opacity:1;transform:translateY(0) scale(1)}',
      '.hero-amp{background:linear-gradient(135deg,' + BRAND + ' 0%,' + BRAND_DARK + ' 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.tabbar-wrap::-webkit-scrollbar{display:none}',
    ].join('')
    document.head.appendChild(s)
  })
  onUnmounted(() => {
    document.getElementById('dash-page-css')?.remove()
  })
}

// ── Content renderer (static HTML) ───────────────────────────────────────────
function renderContent(d: DashboardData): string {
  const ZONE_PINK = `background:${BRAND_SOFT};padding:1.25rem 2rem;`
  const ZONE_WHITE = `background:${SURFACE};padding:1.25rem 2rem 2.5rem;`
  return `
    <div style="${ZONE_PINK}">
      <div style="display:flex;flex-direction:column;gap:0.875rem;max-width:1280px;width:100%;box-sizing:border-box;" class="main-content">
        ${bentoHeroHTML(d)}
        ${d.progress.ready ? actionStripHTML(d) : progressChecklistHTML(d)}
      </div>
    </div>
    <div style="${ZONE_WHITE}">
      <div style="display:flex;flex-direction:column;gap:1rem;max-width:1280px;width:100%;box-sizing:border-box;">
        ${metricsHTML(d)}
        ${chartSectionHTML(d)}
        <section style="${BOTTOM_GRID}" class="dash-block">
          ${activityHTML(d)}
          ${quickActionsHTML(d)}
        </section>
      </div>
    </div>
  `
}

function bentoHeroHTML(d: DashboardData): string {
  const urlStrip = `
    <div style="${URL_STRIP}">
      <span style="color:${MUTED};display:inline-flex;flex-shrink:0;">${ICO.link}</span>
      <span style="${URL_TEXT}">${d.couple.url}</span>
      <Button variant="outline" size="sm">Salin</Button>
      <Button variant="primary" size="sm">Lihat</Button>
    </div>
  `
  const slugCTA = `
    <button type="button" @click="showSlugModal = true" style="margin-top:1rem;display:inline-flex;align-items:center;gap:6px;padding:0.5rem 1rem;border-radius:999px;background:${BRAND};color:white;font-size:12.5px;font-weight:600;border:none;cursor:pointer;font-family:inherit;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      Atur link undangan dulu
    </button>
  `
  return `
    <section style="${BENTO_HERO}" class="dash-block">
      <div style="${COUPLE_CARD}">
        <div style="${COUPLE_CARD_DECOR}"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1;">
          <Badge variant="success" badge-style="subtle" :dot="true">Undangan aktif</Badge>
          <span style="${COUPLE_META}">Tema · Estella Red Series</span>
        </div>
        <h2 style="${COUPLE_NAMES}">${d.couple.first}<span style="${COUPLE_AMP}" class="hero-amp">&amp;</span>${d.couple.second}</h2>
        <p style="${COUPLE_SUB}">${d.couple.day}, ${d.couple.date} · Kami udah siapkan semuanya dengan sepenuh hati buat kalian.</p>
        ${d.couple.hasSlug ? urlStrip : slugCTA}
      </div>

      <div style="${COUNTDOWN_CARD}">
        <svg width="100%" height="100%" viewBox="0 0 300 240" preserveAspectRatio="none" style="position:absolute;inset:0;opacity:0.14;pointer-events:none;">
          <circle cx="260" cy="40" r="80" fill="white" />
          <circle cx="30" cy="220" r="60" fill="white" />
          <path d="M30 60 Q50 50, 70 60 T 110 60" stroke="white" stroke-width="1.5" fill="none" opacity="0.5" />
        </svg>
        <div style="position:relative;z-index:1;">
          <p style="${COUNTDOWN_LABEL}">${ICO.sparkle} Menuju hari bahagia</p>
          ${d.couple.daysLeft > 0 ? `
            <div style="display:flex;align-items:baseline;gap:10px;">
              <span style="${COUNTDOWN_NUMBER}">${d.couple.daysLeft}</span>
              <span style="${COUNTDOWN_UNIT}">hari</span>
            </div>
          ` : d.couple.daysLeft === 0 ? `
            <div style="${COUNTDOWN_NUMBER};font-size:44px;">Hari ini</div>
          ` : `
            <div style="${COUNTDOWN_NUMBER};font-size:44px;">Selesai</div>
            <p style="${COUNTDOWN_UNIT};opacity:0.9;">${Math.abs(d.couple.daysLeft)} hari yang lalu</p>
          `}
        </div>
        <div style="${COUNTDOWN_DATE}">
          ${ICO.calendar.replace('width="16"', 'width="14"').replace('height="16"', 'height="14"')}
          <span>${d.couple.day}, ${d.couple.date}</span>
        </div>
      </div>
    </section>
  `
}

function progressChecklistHTML(d: DashboardData): string {
  const steps = d.progress.steps || []
  const visible = steps.slice(0, 4)
  const extra = steps.length - 4
  const PROG_WRAP = `background:linear-gradient(135deg, #fff0f5 0%, #fde8f4 50%, #fce7f3 100%);border:1px solid ${BRAND_TINT};border-radius:16px;padding:1.5rem 1.75rem;`
  const PROG_HEAD = 'display:flex;align-items:flex-start;gap:0.875rem;margin-bottom:1.25rem;'
  const PROG_ICON = `width:42px;height:42px;border-radius:12px;background:${BRAND};color:white;display:flex;align-items:center;justify-content:center;flex-shrink:0;`
  const PROG_ROW = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:0.625rem;'
  const PROG_BAR_WRAP = 'width:100%;height:7px;background:rgba(236,72,153,0.15);border-radius:999px;overflow:hidden;'
  const PROG_BAR_FILL = `height:100%;background:linear-gradient(90deg, ${BRAND} 0%, ${BRAND_DARK} 100%);border-radius:999px;transition:width .6s cubic-bezier(0.22,1,0.36,1);`
  const STEP_GRID = 'display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:0.875rem;'
  const STEP_ITEM = `display:flex;align-items:center;gap:0.75rem;padding:0.75rem 0.875rem 0.75rem 0;border-bottom:1px solid rgba(236,72,153,0.1);cursor:pointer;text-decoration:none;`
  const STEP_DOT_PENDING = 'width:26px;height:26px;border-radius:999px;background:rgba(234,179,8,0.15);color:#CA8A04;display:flex;align-items:center;justify-content:center;flex-shrink:0;'
  const STEP_DOT_DONE = 'width:26px;height:26px;border-radius:999px;background:rgba(16,185,129,0.1);color:#059669;display:flex;align-items:center;justify-content:center;flex-shrink:0;'

  return `
    <section style="${PROG_WRAP}" class="dash-block">
      <div style="${PROG_HEAD}">
        <div style="${PROG_ICON}">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div>
          <h3 style="font-size:16px;font-weight:700;color:${INK};margin:0 0 3px;letter-spacing:-0.2px;">Progress Undangan</h3>
          <p style="font-size:13px;color:${MUTED};margin:0;">Langkah-langkah menuju undangan sempurna</p>
        </div>
      </div>
      <div style="${PROG_ROW}">
        <span style="font-size:13.5px;font-weight:500;color:${INK_SOFT};">Kelengkapan</span>
        <span style="font-size:13.5px;font-weight:700;color:${INK};">${d.progress.percent}%</span>
      </div>
      <div style="${PROG_BAR_WRAP}"><div style="${PROG_BAR_FILL}width:${d.progress.percent}%;"></div></div>
      <p style="font-size:12.5px;font-weight:600;color:${INK};margin:1rem 0 0;">Langkah Selanjutnya:</p>
      <div style="${STEP_GRID}">
        ${visible.map((s, i) => `
          <a href="#" data-step="${s.key || ''}" style="${STEP_ITEM}${i % 2 === 0 ? 'padding-right:1.5rem;border-right:1px solid rgba(236,72,153,0.1);' : 'padding-left:1.25rem;'}${s.done ? 'opacity:0.75;' : ''}">
            ${s.done
              ? `<div style="${STEP_DOT_DONE}"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>`
              : `<div style="${STEP_DOT_PENDING}"><svg width="8" height="8" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="#EF4444"/></svg></div>`
            }
            <div style="flex:1;min-width:0;">
              <p style="font-size:13px;font-weight:600;color:${INK};margin:0;line-height:1.125rem;${s.done ? 'text-decoration:line-through;color:' + MUTED + ';' : ''}">${s.label}</p>
              ${s.done
                ? `<p style="font-size:11.5px;color:${SUCCESS};margin:1px 0 0;">Sudah dilengkapi ✓</p>`
                : `<p style="font-size:11.5px;color:${MUTED};margin:1px 0 0;">Klik untuk melengkapi • ~2 menit</p>`
              }
            </div>
            ${!s.done ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${MUTED_SOFT}" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>` : ''}
          </a>
        `).join('')}
      </div>
      ${extra > 0 ? `<p style="font-size:12.5px;color:${MUTED};text-align:center;margin-top:0.75rem;">+${extra} langkah lainnya</p>` : ''}
    </section>
  `
}

function actionStripHTML(d: DashboardData): string {
  return `
    <section style="${ACTION_STRIP}" class="dash-block">
      <div style="width:40px;height:40px;border-radius:12px;background:${SUCCESS_BG};color:${SUCCESS};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
      <div style="${ACTION_TEXT}">
        <p style="${ACTION_TITLE}">${d.progress.title}</p>
        <p style="${ACTION_SUB}">${d.progress.sub}</p>
      </div>
      ${d.progress.linkLabel ? `<Button variant="ghost" size="sm">${d.progress.linkLabel}</Button>` : ''}
      <Button variant="primary" size="sm">${d.progress.ctaLabel}</Button>
    </section>
  `
}

function metricsHTML(d: DashboardData): string {
  function emptyHint(label: string, value: number): { text: string; isLink: boolean } {
    if (label === 'Tamu diundang' && value === 0) return { text: 'Tambah tamu pertama →', isLink: true }
    if (label === 'Pasti datang' && value === 0) return { text: 'Bagikan dulu, RSVP menyusul 👋', isLink: false }
    if (label === 'Ucapan masuk' && value === 0) return { text: 'Ucapan tamu akan muncul di sini', isLink: false }
    if (label === 'Undangan dilihat' && value === 0) return { text: 'Undangan belum dibagikan', isLink: false }
    if (label === 'Undangan dilihat' && value > 0 && value < 20) return { text: `${value} pengunjung unik sejauh ini`, isLink: false }
    return { text: '', isLink: false }
  }

  return `
    <section style="${METRIC_GRID}" class="dash-block">
      ${d.metrics.map(m => {
        const isZero = m.value === 0 && m.delta === 0
        const empty = isZero ? emptyHint(m.label, m.value) : null
        const hintText = empty ? empty.text : m.hint
        const hintIsLink = empty ? empty.isLink : (m.hintLink ?? false)
        return `
          <div style="${METRIC_TILE}" class="metric-tile">
            <p style="${METRIC_LABEL}">${m.label}</p>
            <div style="${METRIC_VALUE_ROW}">
              <span style="${METRIC_VALUE}">${fmtID(m.value)}</span>
              ${!isZero && m.delta !== 0 ? deltaChip(m.delta) : ''}
            </div>
            ${hintIsLink
              ? `<a href="#" style="${METRIC_HINT_LINK}">${hintText}<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></a>`
              : `<p style="${METRIC_HINT}">${hintText}</p>`}
          </div>
        `
      }).join('')}
    </section>
  `
}

function chartSectionHTML(d: DashboardData): string {
  return `
    <section style="${CHART_SECTION}" class="dash-block">
      <div style="${CHART_HEAD}">
        <div>
          <h3 style="${CHART_TITLE}">Traffic undangan</h3>
          <p style="${CHART_SUB}">7 hari terakhir · update tiap jam</p>
        </div>
        <div style="${SEGMENTED}">
          <button type="button" style="${SEG_BTN};${SEG_BTN_ACTIVE}">7 hari</button>
          <button type="button" style="${SEG_BTN}">30 hari</button>
          <button type="button" style="${SEG_BTN}">Semua</button>
        </div>
      </div>
      ${lineChartSVG(d.chart)}
      <div style="display:flex;align-items:center;gap:1.5rem;margin-top:1rem;padding-top:0.75rem;border-top:1px solid ${HAIRLINE};">
        <span style="display:inline-flex;align-items:center;gap:8px;font-size:12px;color:${INK_SOFT};font-weight:500;">
          <span style="width:16px;height:3px;border-radius:2px;background:${BRAND};"></span>
          Dilihat
        </span>
        <span style="display:inline-flex;align-items:center;gap:8px;font-size:12px;color:${INK_SOFT};font-weight:500;">
          <span style="width:16px;height:2px;border-radius:2px;background:repeating-linear-gradient(90deg, ${MUTED_SOFT} 0 4px, transparent 4px 8px);"></span>
          Pengunjung unik
        </span>
      </div>
    </section>
  `
}

function activityHTML(d: DashboardData): string {
  if (d.activities.length === 0) {
    return `
      <div style="${CARD_STD}">
        <div style="${CARD_HEAD}">
          <div>
            <h3 style="${CHART_TITLE}">Aktivitas terakhir</h3>
            <p style="${CHART_SUB}">Momen dari tamu kamu akan muncul di sini</p>
          </div>
        </div>
        <div style="padding:2rem 0.5rem 1.25rem;text-align:center;">
          <div style="width:56px;height:56px;border-radius:999px;background:${BRAND_SOFT};margin:0 auto 0.75rem;display:flex;align-items:center;justify-content:center;color:${BRAND_DEEP};">
            ${ICO.bell.replace('width="16"', 'width="24"').replace('height="16"', 'height="24"')}
          </div>
          <p style="font-size:13.5px;font-weight:600;color:${INK};margin:0 0 6px;">Belum ada aktivitas</p>
          <p style="font-size:12.5px;color:${MUTED};margin:0 0 1rem;line-height:1.5rem;">Begitu pertama orang membuka undangan kamu,<br/>namanya akan muncul di sini. Yuk bagikan dulu!</p>
          <Button variant="primary" size="sm">Bagikan undangan</Button>
        </div>
      </div>
    `
  }

  const verbs: Record<Activity['kind'], string> = {
    'rsvp-yes': 'konfirmasi hadir',
    'rsvp-no': 'belum bisa datang',
    'message': 'kirim ucapan',
    'view': 'membuka undangan',
    'share': 'membagikan undangan',
  }

  return `
    <div style="${CARD_STD}">
      <div style="${CARD_HEAD}">
        <div>
          <h3 style="${CHART_TITLE}">Aktivitas terakhir</h3>
          <p style="${CHART_SUB}">${d.activities.length} momen · terakhir update ${d.activities[0].time}</p>
        </div>
        <a href="#" style="${CARD_LINK}">Lihat semua ${ICO.chevRight}</a>
      </div>
      <div style="margin-top:-0.25rem;">
        ${d.activities.map(a => {
          const initials = a.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
          return `
            <div style="${ACTIVITY_ROW}">
              <div style="${ACTIVITY_AVA};background:${a.avatarBg};">${initials}</div>
              <div style="flex:1;min-width:0;">
                <p style="${ACTIVITY_NAME}">${a.name} <span style="font-weight:400;color:${MUTED};">${verbs[a.kind]}</span></p>
                ${a.quote ? `<p style="${ACTIVITY_QUOTE}">"${a.quote}"</p>` : ''}
                ${a.text && !a.quote ? `<p style="${ACTIVITY_TEXT}">${a.text}</p>` : ''}
                <p style="${ACTIVITY_TIME}">${a.time}</p>
              </div>
            </div>
          `
        }).join('')}
      </div>
    </div>
  `
}

function quickActionsHTML(d: DashboardData): string {
  const items = d.progress.ready
    ? [
        { icon: ICO.wa, title: 'Sebar via WhatsApp', sub: 'Kirim undangan ke grup keluarga' },
        { icon: ICO.plus, title: 'Tambah tamu baru', sub: 'Impor dari kontak atau ketik manual' },
        { icon: ICO.music, title: 'Ganti musik latar', sub: 'Pilih dari 200+ lagu bebas royalti' },
        { icon: ICO.qr, title: 'Cetak QR untuk undangan fisik', sub: 'Untuk tamu yang diundang offline' },
      ]
    : [
        { icon: ICO.heart, title: 'Lengkapi info mempelai', sub: 'Nama lengkap, orang tua, cerita kalian' },
      ]

  return `
    <div style="${CARD_STD}">
      <div style="${CARD_HEAD}">
        <div>
          <h3 style="${CHART_TITLE}">Yang bisa dilakuin</h3>
          <p style="${CHART_SUB}">Shortcut aksi yang sering kepake</p>
        </div>
      </div>
      <div style="margin-top:-0.25rem;">
        ${items.map(it => `
          <a href="#" style="${ACTION_ROW}" class="action-row">
            <div style="${ACTION_ROW_ICON}">${it.icon}</div>
            <div style="flex:1;min-width:0;">
              <p style="${ACTION_ROW_TITLE}">${it.title}</p>
              <p style="${ACTION_ROW_SUB}">${it.sub}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${MUTED_SOFT}" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        `).join('')}
      </div>
    </div>
  `
}

// ── Story builder (Vue reactive template) ────────────────────────────────────
function buildStory(data: DashboardData) {
  return {
    setup() {
      usePageEntrance()

      const showAccount = ref(false)
      const showContext = ref(false)
      const showProject = ref(false)
      const showNotif = ref(false)
      const activeContext = ref<'invitation' | 'planner'>('invitation')
      const activeInvId = ref(data.activeInvId)
      const copied = ref(false)
      const showInvExpanded = ref(true)
      const showTip = ref(true)
      const showSlugModal = ref(false)
      const slugInput = ref('')

      const closeAll = () => {
        showAccount.value = false
        showContext.value = false
        showProject.value = false
        showNotif.value = false
      }

      const toggle = (which: 'account' | 'context' | 'project' | 'notif', e?: Event) => {
        e?.stopPropagation()
        const target =
          which === 'account' ? showAccount
          : which === 'context' ? showContext
          : which === 'project' ? showProject
          : showNotif
        const was = target.value
        closeAll()
        target.value = !was
      }

      const switchContext = (ctx: 'invitation' | 'planner', e: Event) => {
        e.stopPropagation()
        activeContext.value = ctx
        closeAll()
      }

      const pickInvitation = (id: string, e: Event) => {
        e.stopPropagation()
        activeInvId.value = id
        closeAll()
      }

      const doCopy = (e: Event) => {
        e.stopPropagation()
        copied.value = true
        navigator.clipboard?.writeText('https://' + data.couple.url).catch(() => {})
        setTimeout(() => { copied.value = false }, 1600)
      }

      const onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeAll()
      }

      onMounted(() => {
        document.addEventListener('click', closeAll)
        document.addEventListener('keydown', onKeydown)
      })
      onUnmounted(() => {
        document.removeEventListener('click', closeAll)
        document.removeEventListener('keydown', onKeydown)
      })

      const activeInv = data.invitations.find(i => i.id === activeInvId.value) || data.invitations[0]

      return {
        data, showAccount, showContext, showProject, showNotif,
        activeContext, activeInvId, activeInv, copied,
        showInvExpanded, showTip,
        toggle, switchContext, pickInvitation, doCopy,
        closeAll, icons: ICO,
        showSlugModal, slugInput,
      }
    },
    components: { Button, Badge, Avatar, Divider, KBD, Input },
    template: `
      <div style="${SHELL}" @click="closeAll">

        <!-- ── Topbar (full-width, first child) ── -->
        <header style="${TOPBAR}" @click.stop>
          <!-- Left: logo + separator + workspace context switcher -->
          <div style="${TOPBAR_LEFT}">
            <span v-html="icons.logoMark"></span>
            <div style="${TOPBAR_SEP}"></div>

            <!-- Workspace / context switcher button -->
            <div style="position:relative;">
              <button type="button" style="${TOPBAR_WS_BTN}" class="topbar-ws-btn" @click="toggle('context', $event)">
                <span>{{ activeContext === 'invitation' ? 'Invitation' : 'Wedding Planner' }}</span>
                <span style="font-size:10px;color:${MUTED_SOFT};">▼</span>
              </button>
              <Transition name="popup">
                <div v-if="showContext" @click.stop style="${POPUP_BASE};top:calc(100% + 6px);left:0;width:260px;padding:0.5rem;">
                  <div style="${POPUP_LABEL};padding:0.5rem 0.625rem 0.375rem;">Akses</div>
                  <div style="display:flex;flex-direction:column;gap:6px;padding:0 2px;">
                    <button type="button"
                      :style="[\`${CTX_POP_TILE}\`, activeContext === 'invitation' ? \`${CTX_POP_TILE_ACTIVE}\` : '']"
                      class="ctx-tile"
                      @click="switchContext('invitation', $event)">
                      <div style="display:flex;align-items:center;gap:0.625rem;">
                        <div style="width:34px;height:34px;border-radius:9px;background:${BRAND_SOFT};color:${BRAND_DEEP};display:flex;align-items:center;justify-content:center;" v-html="icons.heartFill"></div>
                        <div style="flex:1;min-width:0;">
                          <div style="font-size:13px;font-weight:600;color:${INK};line-height:1.125rem;">Invitation</div>
                          <div style="font-size:11.5px;color:${MUTED};line-height:1rem;">Undangan digital &amp; RSVP</div>
                        </div>
                        <span v-if="activeContext === 'invitation'" style="color:${BRAND_DEEP};display:inline-flex;" v-html="icons.check"></span>
                      </div>
                    </button>
                    <button type="button"
                      :style="[\`${CTX_POP_TILE}\`, activeContext === 'planner' ? \`${CTX_POP_TILE_ACTIVE}\` : '']"
                      class="ctx-tile"
                      @click="switchContext('planner', $event)">
                      <div style="display:flex;align-items:center;gap:0.625rem;">
                        <div style="width:34px;height:34px;border-radius:9px;background:#EEF2FF;color:#4F46E5;display:flex;align-items:center;justify-content:center;" v-html="icons.calendar"></div>
                        <div style="flex:1;min-width:0;">
                          <div style="font-size:13px;font-weight:600;color:${INK};line-height:1.125rem;">Wedding Planner</div>
                          <div style="font-size:11.5px;color:${MUTED};line-height:1rem;">Rundown, vendor, &amp; budget</div>
                        </div>
                        <span v-if="activeContext === 'planner'" style="color:${BRAND_DEEP};display:inline-flex;" v-html="icons.check"></span>
                      </div>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Right: icon buttons + avatar -->
          <div style="${TOPBAR_RIGHT}">
            <button type="button" style="${ICON_BTN}" class="icon-btn" aria-label="Bantuan" v-html="icons.help"></button>

            <!-- Notif bell with red dot -->
            <div style="position:relative;">
              <button type="button" style="${ICON_BTN}" class="icon-btn" aria-label="Notifikasi" @click="toggle('notif', $event)">
                <span v-html="icons.bell"></span>
                <span v-if="data.activities.length > 0" style="position:absolute;top:8px;right:8px;width:7px;height:7px;border-radius:50%;background:${BRAND};border:1.5px solid ${SURFACE};"></span>
              </button>
            </div>

            <button type="button" style="${ICON_BTN}" class="icon-btn" aria-label="Pengaturan" v-html="icons.settings"></button>

            <!-- Profile / Account menu -->
            <div style="position:relative;margin-left:0.125rem;">
              <button type="button" style="display:flex;align-items:center;gap:0.375rem;padding:0.1875rem 0.375rem 0.1875rem 0.1875rem;border-radius:999px;border:1px solid ${BORDER};background:${SURFACE};cursor:pointer;transition:border-color .15s;font-family:inherit;" class="profile-btn" @click="toggle('account', $event)">
                <Avatar :name="data.user.fullName" size="sm" shape="circle" />
                <span style="color:${MUTED_SOFT};margin-right:1px;display:inline-flex;" v-html="icons.chevron"></span>
              </button>
              <Transition name="popup">
                <div v-if="showAccount" @click.stop style="${POPUP_BASE};top:calc(100% + 6px);right:0;width:280px;">
                  <div style="${ACCT_HEADER}">
                    <Avatar :name="data.user.fullName" size="md" shape="circle" />
                    <div style="flex:1;min-width:0;">
                      <div style="font-size:13.5px;font-weight:600;color:${INK};line-height:1.125rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ data.user.fullName }}</div>
                      <div style="font-size:11.5px;color:${MUTED};line-height:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ data.user.email }}</div>
                    </div>
                  </div>
                  <Divider />
                  <a href="#" style="${ACCT_ITEM}" class="acct-item">
                    <span style="color:${MUTED};display:inline-flex;" v-html="icons.settings"></span>
                    <div style="flex:1;">
                      <div>Pengaturan Akun</div>
                      <div style="font-size:11.5px;color:${MUTED};font-weight:400;margin-top:1px;">Profil, password, privasi</div>
                    </div>
                  </a>
                  <a href="#" style="${ACCT_ITEM}" class="acct-item">
                    <span style="color:${MUTED};display:inline-flex;" v-html="icons.giftSmall"></span>
                    <div style="flex:1;">
                      <div style="display:flex;align-items:center;gap:6px;">
                        Program Referral
                        <Badge v-if="data.referralEarnings > 0" variant="success" badge-style="subtle" size="sm">{{ fmtRpText(data.referralEarnings) }}</Badge>
                      </div>
                      <div style="font-size:11.5px;color:${MUTED};font-weight:400;margin-top:1px;">Ajak teman, dapat komisi</div>
                    </div>
                  </a>
                  <Divider />
                  <a href="#" style="${ACCT_ITEM};color:${DANGER};" class="acct-item">
                    <span style="display:inline-flex;" v-html="icons.logout"></span>
                    <span style="flex:1;">Keluar</span>
                    <KBD size="sm">⌘⇧Q</KBD>
                  </a>
                </div>
              </Transition>
            </div>
          </div>
        </header>

        <!-- ── Content area: sidebar + scroll column ── -->
        <div style="${CONTENT_AREA}">

        <!-- ── Sidebar (Attio-style) ── -->
        <aside style="${SIDEBAR}" @click.stop>

          <!-- Plan upgrade banner -->
          <div style="${PLAN_BANNER}">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.5rem;">
              <span style="font-size:12.5px;font-weight:600;color:${INK};">Coba Abadikan Pro</span>
            </div>
            <Button variant="primary" size="sm" style="width:100%;">Upgrade</Button>
          </div>

          <Divider />

          <!-- Global nav -->
          <nav style="${NAV};margin-bottom:0.25rem;">
            <a href="#" style="${NAV_ITEM}" class="nav-item">
              <span style="color:${MUTED};" v-html="icons.search"></span>
              <span>Cari</span>
              <KBD size="sm" style="margin-left:auto;">⌘K</KBD>
            </a>
            <div style="position:relative;">
              <a href="#" style="${NAV_ITEM}" class="nav-item" @click.prevent="toggle('notif', $event)">
                <span style="color:${MUTED};" v-html="icons.bell"></span>
                <span>Notifikasi</span>
                <Badge v-if="data.activities.length > 0" variant="danger" size="sm" style="margin-left:auto;">{{ data.activities.length }}</Badge>
              </a>
              <Transition name="popup">
                <div v-if="showNotif" @click.stop style="${POPUP_BASE};top:0;left:calc(100% + 8px);width:320px;padding:0.5rem;">
                  <div style="${POPUP_LABEL};display:flex;align-items:center;justify-content:space-between;">
                    <span>Notifikasi</span>
                    <a href="#" style="font-weight:500;letter-spacing:0;text-transform:none;color:${BRAND_DEEP};text-decoration:none;font-size:11px;">Tandai dibaca semua</a>
                  </div>
                  <div v-if="data.activities.length === 0" style="padding:1.5rem 0.75rem 1rem;text-align:center;">
                    <p style="font-size:13px;color:${MUTED};margin:0;">Belum ada notifikasi baru</p>
                  </div>
                  <div v-else style="max-height:360px;overflow-y:auto;">
                    <div v-for="(a, i) in data.activities.slice(0, 4)" :key="i" style="display:flex;gap:0.625rem;padding:0.625rem 0.75rem;border-radius:8px;cursor:pointer;" class="acct-item">
                      <div :style="\`width:32px;height:32px;border-radius:999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;font-weight:600;color:white;background:\` + a.avatarBg">{{ a.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() }}</div>
                      <div style="flex:1;min-width:0;">
                        <p style="font-size:12.5px;color:${INK};margin:0;line-height:1.125rem;"><span style="font-weight:600;">{{ a.name }}</span> <span style="color:${MUTED};">{{ a.kind === 'rsvp-yes' ? 'konfirmasi hadir' : a.kind === 'message' ? 'kirim ucapan' : a.kind === 'view' ? 'buka undangan' : 'aksi' }}</span></p>
                        <p style="font-size:11px;color:${MUTED_SOFT};margin:2px 0 0;">{{ a.time }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            <a href="#" style="${NAV_ITEM}" class="nav-item">
              <span style="color:${MUTED};" v-html="icons.users"></span>
              <span>Pesan tamu</span>
            </a>
          </nav>

          <Divider />

          <!-- Section: Undangan -->
          <div style="${NAV_LABEL}">Undangan</div>
          <nav style="${NAV}">
            <!-- Couple item (expandable) -->
            <button type="button" style="${NAV_ITEM};width:100%;background:${INK};color:white;" class="nav-item nav-item-active" @click.stop="showInvExpanded = !showInvExpanded">
              <span v-html="icons.heartFill"></span>
              <span style="flex:1;text-align:left;font-weight:600;">{{ activeInv ? activeInv.couple : 'Ais & Rani' }}</span>
              <span :style="\`display:inline-flex;transition:transform .2s;\` + (showInvExpanded ? 'transform:rotate(0deg);' : 'transform:rotate(-90deg);')" v-html="icons.chevron"></span>
            </button>
            <!-- Sub-items -->
            <template v-if="showInvExpanded">
              <a href="#" style="${NAV_SUB_ITEM};background:${BRAND_SOFT};color:${BRAND_DEEP};font-weight:600;" class="nav-sub-item">
                <span style="color:${BRAND_DEEP};" v-html="icons.grid"></span>
                <span>Beranda</span>
              </a>
              <a href="#" style="${NAV_SUB_ITEM}" class="nav-sub-item">
                <span style="color:${MUTED};" v-html="icons.heart"></span>
                <span>Edit Undangan</span>
              </a>
              <a href="#" style="${NAV_SUB_ITEM}" class="nav-sub-item">
                <span style="color:${MUTED};" v-html="icons.music"></span>
                <span>Musik</span>
              </a>
              <a href="#" style="${NAV_SUB_ITEM}" class="nav-sub-item">
                <span style="color:${MUTED};" v-html="icons.users"></span>
                <span>RSVP & Tamu</span>
              </a>
              <a href="#" style="${NAV_SUB_ITEM}" class="nav-sub-item">
                <span style="color:${MUTED};" v-html="icons.gift"></span>
                <span>Kado</span>
              </a>
            </template>
            <a href="#" style="${NAV_NEW_INV}" class="nav-new-inv">
              <span v-html="icons.plus"></span>
              <span>Buat undangan baru</span>
            </a>
          </nav>

          <!-- Section: Hari H -->
          <div style="${NAV_LABEL};margin-top:0.5rem;">Hari H</div>
          <nav style="${NAV}">
            <a href="#" style="${NAV_ITEM}" class="nav-item">
              <span style="color:${MUTED};" v-html="icons.screen"></span>
              <span>Layar Tamu</span>
            </a>
            <a href="#" style="${NAV_ITEM}" class="nav-item">
              <span style="color:${MUTED};" v-html="icons.qr"></span>
              <span>Scan Kehadiran</span>
            </a>
            <a href="#" style="${NAV_ITEM}" class="nav-item">
              <span style="color:${MUTED};" v-html="icons.table"></span>
              <span>Manajemen Meja</span>
            </a>
          </nav>

          <!-- Spacer -->
          <div style="flex:1;min-height:0.5rem;"></div>

          <!-- Bantuan -->
          <nav style="${NAV};margin-bottom:0.5rem;">
            <a href="#" style="${NAV_ITEM}" class="nav-item">
              <span style="color:${MUTED};" v-html="icons.help"></span>
              <span>Bantuan</span>
            </a>
          </nav>

          <!-- Bottom tip card -->
          <div v-if="showTip" style="${TIP_CARD}">
            <button type="button" @click.stop="showTip = false" style="position:absolute;top:0.5rem;right:0.5rem;width:20px;height:20px;border-radius:4px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:${MUTED};padding:0;" v-html="icons.x"></button>
            <p style="font-size:12.5px;font-weight:700;color:${INK};margin:0 0 4px;padding-right:1rem;">Undangan kamu makin dilihat ✨</p>
            <p style="font-size:11.5px;color:${MUTED};margin:0 0 0.75rem;line-height:1.5;">Bagikan ke lebih banyak orang untuk makin banyak RSVP</p>
            <Button variant="primary" size="sm">Sebar sekarang</Button>
          </div>
        </aside>

        <!-- ── Scroll column ── -->
        <div style="${SCROLL_COL}">
          ${renderContent(data)}
        </div>
        </div><!-- end CONTENT_AREA -->

        <!-- Slug modal overlay -->
        <Transition name="popup">
          <div v-if="showSlugModal" @click.stop style="position:fixed;inset:0;z-index:100;background:rgba(15,23,42,0.55);display:flex;align-items:center;justify-content:center;padding:1.5rem;" @click="showSlugModal = false">
            <div @click.stop style="background:${SURFACE};border-radius:20px;padding:2rem;width:100%;max-width:520px;box-shadow:0 20px 60px -10px rgba(15,23,42,0.25);">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;">
                <div>
                  <h2 style="font-size:20px;font-weight:700;color:${INK};margin:0 0 6px;letter-spacing:-0.4px;">Atur Link Undangan</h2>
                  <p style="font-size:14px;color:${MUTED};margin:0;line-height:1.5rem;">Buat link unik untuk undangan pernikahan kamu agar mudah dibagikan.</p>
                </div>
                <button type="button" @click="showSlugModal = false" style="width:32px;height:32px;border-radius:8px;border:1px solid ${BORDER};background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:${MUTED};font-family:inherit;flex-shrink:0;" v-html="icons.x"></button>
              </div>
              <p style="font-size:13.5px;font-weight:600;color:${INK};margin:0 0 0.5rem;">Link Undangan</p>
              <div style="display:flex;align-items:center;border:1.5px solid ${BORDER};border-radius:12px;overflow:hidden;margin-bottom:0.625rem;">
                <span style="padding:0.625rem 0.875rem;background:${BG};border-right:1.5px solid ${BORDER};font-size:13.5px;color:${MUTED};white-space:nowrap;font-family:inherit;">abadikan.id/</span>
                <Input v-model="slugInput" placeholder="ais-rani-2025" style="border:none;border-radius:0;flex:1;" />
              </div>
              <p style="font-size:12px;color:${MUTED};margin:0 0 1rem;">Gunakan huruf kecil, angka, dan tanda minus (-). Contoh: ais-rani-2025</p>
              <div style="display:flex;align-items:flex-start;gap:0.625rem;padding:0.875rem;border-radius:12px;background:#FFF7ED;border:1px solid #FED7AA;margin-bottom:1.5rem;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C2410C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p style="font-size:13px;color:#C2410C;margin:0;line-height:1.5rem;"><strong style="font-weight:700;">Peringatan:</strong> Link undangan hanya dapat diatur sekali. Pastikan ejaan sudah benar sebelum menyimpan.</p>
              </div>
              <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
                <Button variant="outline" size="md" @click="showSlugModal = false">Batal</Button>
                <Button variant="primary" size="md" @click="showSlugModal = false">Simpan Link</Button>
              </div>
            </div>
          </div>
        </Transition>

      </div><!-- end SHELL -->
    `,
    methods: {
      fmtRpText(n: number) { return fmtRp(n) },
    },
  }
}

// ── Mock data (shared invitations list) ───────────────────────────────────────
const LABELS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

const INVITATIONS: InvitationItem[] = [
  { id: 'estella-red-series', couple: 'Ais & Rani', date: '6 Sep 2025', slug: 'estella-red-series', status: 'aktif' },
  { id: 'estella-red-video', couple: 'Ais & Rani', date: '6 Sep 2025', slug: 'estella-red-video', status: 'draft' },
  { id: 'estella-simple', couple: 'Ais & Rani', date: '6 Sep 2025', slug: 'estella-simple', status: 'draft' },
  { id: 'dika-putri', couple: 'Dika & Putri', date: '31 Des 2026', slug: 'dika-putri-sunda', status: 'aktif' },
  { id: 'rendi-maya', couple: 'Rendi & Maya', date: '18 Jan 2026', slug: 'rendi-maya-java', status: 'draft' },
  { id: 'daniel-sekar', couple: 'Daniel & Sekar', date: '12 Mar 2025', slug: 'daniel-sekar', status: 'selesai' },
  { id: 'agus-lisa', couple: 'Agus & Lisa', date: '4 Nov 2024', slug: 'agus-lisa', status: 'selesai' },
]

const BASE_USER = { firstName: 'Aisha', fullName: 'Aisha Pramita', email: 'aisha.p@gmail.com' }

const DATA_NEW: DashboardData = {
  user: BASE_USER,
  couple: { first: 'Ais', second: 'Rani', date: '6 September 2025', day: 'Sabtu', url: 'abadikan.id/', daysLeft: 135, hasSlug: false },
  activeInvId: 'estella-red-series',
  invitations: INVITATIONS,
  progress: {
    ready: false,
    percent: 28,
    title: 'Undangan belum siap dibagikan',
    sub: 'Selesaikan langkah-langkah berikut biar undanganmu sempurna.',
    ctaLabel: 'Lanjutkan',
    steps: [
      { label: 'Info Mempelai', done: true },
      { label: 'Tanggal & Tempat', done: true },
      { label: 'Galeri Foto', done: false },
      { label: 'Love Story', done: false },
      { label: 'Template WhatsApp', done: false },
      { label: 'Musik Latar', done: false },
      { label: 'Atur Link Undangan', done: false, key: 'slug' },
    ],
  },
  metrics: [
    { label: 'Tamu diundang', value: 0, delta: 0, hint: 'Tambah daftar tamu', hintLink: true },
    { label: 'Pasti datang', value: 0, delta: 0, hint: 'Nunggu konfirmasi pertama' },
    { label: 'Ucapan masuk', value: 0, delta: 0, hint: 'Belum ada ucapan' },
    { label: 'Undangan dilihat', value: 19, delta: 0, hint: '4 pengunjung unik' },
  ],
  chart: {
    views: [0, 0, 0, 2, 4, 8, 5],
    unique: [0, 0, 0, 1, 2, 3, 2],
    labels: LABELS,
  },
  activities: [
    { kind: 'view', name: 'Seseorang', text: 'dari Jakarta', time: '12 menit lalu', avatarBg: '#94A3B8' },
    { kind: 'view', name: 'Seseorang', text: 'dari Bandung', time: '1 jam lalu', avatarBg: '#A78BFA' },
    { kind: 'share', name: 'Kamu', text: 'bagikan ke WhatsApp keluarga besar', time: 'kemarin, 19:42', avatarBg: INK },
  ],
  referralEarnings: 0,
}

const DATA_ACTIVE: DashboardData = {
  user: BASE_USER,
  couple: { first: 'Ais', second: 'Rani', date: '6 September 2025', day: 'Sabtu', url: 'abadikan.id/estella-red-series', daysLeft: 42, hasSlug: true },
  activeInvId: 'estella-red-series',
  invitations: INVITATIONS,
  progress: {
    ready: true,
    percent: 100,
    title: 'Undangan jalan lancar',
    sub: '45 dari 120 tamu udah konfirmasi. Sisa 75 yang belum respon — mau kirim reminder?',
    ctaLabel: 'Kirim reminder RSVP',
    ctaIcon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    linkLabel: 'Lihat daftar tamu',
  },
  metrics: [
    { label: 'Tamu diundang', value: 120, delta: 12, hint: '15 ditambah minggu ini' },
    { label: 'Pasti datang', value: 45, delta: 34, hint: '37% konfirmasi rate' },
    { label: 'Ucapan masuk', value: 23, delta: 28, hint: '5 ucapan hari ini' },
    { label: 'Undangan dilihat', value: 234, delta: 18, hint: '87 pengunjung unik' },
  ],
  chart: {
    views: [12, 18, 24, 20, 32, 41, 42],
    unique: [8, 12, 15, 14, 21, 26, 26],
    labels: LABELS,
  },
  activities: [
    { kind: 'rsvp-yes', name: 'Dian Permata', text: '', time: '8 menit lalu', avatarBg: '#DB2777' },
    { kind: 'message', name: 'Budi Santoso', text: '', quote: 'Selamat ya Ais, Rani! Semoga lancar sampai hari H. Doakan kami juga di sana ya 🤍', time: '32 menit lalu', avatarBg: '#0891B2' },
    { kind: 'rsvp-yes', name: 'Keluarga Wicaksono', text: '4 orang · mengonfirmasi hadir', time: '1 jam lalu', avatarBg: '#7C3AED' },
    { kind: 'message', name: 'Sarah Amanda', text: '', quote: 'Akhirnyaaa! Gak sabar lihat Ais cantik di pelaminan.', time: '2 jam lalu', avatarBg: '#059669' },
    { kind: 'rsvp-no', name: 'Pak Hendra', text: 'masih pertimbangan — tugas luar kota', time: '3 jam lalu', avatarBg: '#64748B' },
  ],
  referralEarnings: 250_000,
}

const DATA_PEAK: DashboardData = {
  user: BASE_USER,
  couple: { first: 'Ais', second: 'Rani', date: '6 September 2025', day: 'Sabtu', url: 'abadikan.id/estella-red-series', daysLeft: 1, hasSlug: true },
  activeInvId: 'estella-red-series',
  invitations: INVITATIONS,
  progress: {
    ready: true,
    percent: 100,
    title: 'Besok hari kamu',
    sub: '142 tamu pasti datang dari 180 yang diundang. Jangan lupa brief vendor & cek panitia pagi ini.',
    ctaLabel: 'Buka checklist H-1',
    ctaIcon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:2px;"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    linkLabel: 'Lihat manifest meja',
  },
  metrics: [
    { label: 'Tamu diundang', value: 180, delta: 0, hint: 'Final · daftar sudah dikunci' },
    { label: 'Pasti datang', value: 142, delta: 4, hint: '79% konfirmasi rate' },
    { label: 'Ucapan masuk', value: 87, delta: 32, hint: '12 ucapan hari ini' },
    { label: 'Undangan dilihat', value: 1234, delta: 56, hint: '456 pengunjung unik' },
  ],
  chart: {
    views: [48, 62, 78, 95, 142, 186, 295],
    unique: [32, 44, 52, 61, 88, 112, 178],
    labels: LABELS,
  },
  activities: [
    { kind: 'message', name: 'Mama Rani', text: '', quote: 'Ma sayang, semoga besok semuanya berjalan lancar. Ibu bangga sama kalian berdua 🤍', time: '2 menit lalu', avatarBg: '#DB2777' },
    { kind: 'rsvp-yes', name: 'Teman SMA Ais', text: '12 orang · reuni sekalian', time: '15 menit lalu', avatarBg: '#0891B2' },
    { kind: 'message', name: 'Pak Jaka (Dosen)', text: '', quote: 'Barakallah ya Nak Ais. Ditunggu undangan keluarga Rani suatu saat 🙏', time: '42 menit lalu', avatarBg: '#7C3AED' },
    { kind: 'rsvp-yes', name: 'Rekan Kantor', text: '8 orang · satu meja', time: '1 jam lalu', avatarBg: '#059669' },
    { kind: 'view', name: 'Seseorang', text: 'dari Yogyakarta · buka 3× hari ini', time: '2 jam lalu', avatarBg: '#EA580C' },
  ],
  referralEarnings: 750_000,
}

// ── Stories ───────────────────────────────────────────────────────────────────
export const NewInvitation: Story = {
  name: 'Baru Dibagikan',
  parameters: {
    docs: {
      description: {
        story: 'State: undangan baru diterbitkan. Countdown 135 hari jadi anchor visual, activity feed sudah hidup dengan event anonim — pattern Flip/Bibit agar dashboard gak terasa kosong.',
      },
    },
  },
  render: () => buildStory(DATA_NEW),
}

export const ActiveInvitation: Story = {
  name: 'Menjelang Acara',
  parameters: {
    docs: {
      description: {
        story: 'State: ~6 minggu sebelum. Activity feed berisi ucapan asli, konfirmasi keluarga. Progress copy adaptif — "45 dari 120 tamu udah konfirmasi". Badge earning muncul di account menu.',
      },
    },
  },
  render: () => buildStory(DATA_ACTIVE),
}

export const PeakInvitation: Story = {
  name: 'H-1 Hari Bahagia',
  parameters: {
    docs: {
      description: {
        story: 'State: H-1. Copy emosional "Besok hari kamu". Activity feed berisi ucapan dari orang-orang penting (Mama Rani, dosen). CTA fokus checklist H-1, bukan share.',
      },
    },
  },
  render: () => buildStory(DATA_PEAK),
}
