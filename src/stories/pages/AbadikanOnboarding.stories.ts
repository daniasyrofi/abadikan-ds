import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed, defineComponent, onMounted, onUnmounted, watch } from 'vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Checkbox from '@/components/atoms/Checkbox/Checkbox.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'
import Stepper from '@/components/molecules/Stepper/Stepper.vue'
import Tag from '@/components/molecules/Tag/Tag.vue'
import DatePicker from '@/components/molecules/DatePicker/DatePicker.vue'
import SegmentedControl from '@/components/molecules/SegmentedControl/SegmentedControl.vue'
import {
  RiArrowLeftSLine,
  RiCheckboxCircleFill,
  RiCheckLine,
  RiEyeLine,
  RiHeartFill,
  RiTimeLine,
  RiShareForwardLine,
  RiWhatsappLine,
  RiMailLine,
  RiLinkM,
  RiSparklingFill,
  RiFireFill,
  RiPriceTag3Line,
  RiShieldCheckLine,
  RiRefreshLine,
  RiDownload2Line,
  RiUser3Line,
  RiUserSmileLine,
  RiEditLine,
  RiStarFill,
} from '@remixicon/vue'

// ── Canvas & Meta ──────────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="min-height:100vh;display:flex;background-color:var(--color-bg);">
      <story />
    </div>
  `,
})

const OnboardingPage = defineComponent({ template: '<div />' })

const meta: Meta = {
  title: 'Pages/Abadikan — Onboarding',
  component: OnboardingPage,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Onboarding flow **Abadikan.id** — redesigned dengan pattern wedding industry (Invitato, Matchbox) + Indonesian top apps (Tokopedia, Traveloka). Preview-first, stepper orientation, satu-kali data entry.',
      },
    },
  },
}
export default meta
type Story = StoryObj

// ── Tokens & Shared Styles ─────────────────────────────────────────────────────
// Research: Canva/Notion/Linear remove sidebar during onboarding (reduces cognitive load).
// Shopee/Traveloka use sticky header + progress bar + sticky bottom CTA for higher conversion.
// Zeigarnik effect: visible progress drives completion.

const RED = '#D0003E'
const RED_SOFT = 'rgba(208,0,62,0.08)'
const BASE = import.meta.env.BASE_URL
const WORDMARK_URL = `${BASE}abadikan-wordmark.svg`

// Full-width layout — no left panel
const PAGE = 'min-height:100vh;background:var(--color-bg);display:flex;flex-direction:column;'
const HEADER_OUTER = 'position:sticky;top:0;z-index:50;background:var(--color-bg);border-bottom:1px solid var(--color-border);'
const HEADER = 'max-width:1120px;margin:0 auto;width:100%;padding:0.8rem 2rem;display:flex;align-items:center;gap:0.75rem;box-sizing:border-box;'
const HEADER_LOGO = 'flex:1;display:flex;justify-content:center;'
const STEPPER_WRAP = 'max-width:600px;margin:0 auto;width:100%;padding:0.75rem 2rem 0.5rem;box-sizing:border-box;'
const CONTENT_AREA = 'flex:1;display:flex;flex-direction:column;align-items:center;padding:2rem 1.5rem 7rem;box-sizing:border-box;'
const CONTENT_NARROW = 'width:100%;max-width:480px;--radius-2xl:20px;'
const CONTENT_WIDE = 'width:100%;max-width:1120px;--radius-2xl:20px;'
const STICKY_BTM = 'position:fixed;bottom:0;left:0;right:0;background:var(--color-bg);border-top:1px solid var(--color-border);padding:0.875rem 1.5rem;z-index:40;display:flex;justify-content:center;'
const STICKY_INNER = 'width:100%;max-width:480px;display:flex;flex-direction:column;gap:0.5rem;align-items:center;'
const BTN = 'border-radius:999px;gap:0.25rem;padding-inline-start:1.25rem;padding-inline-end:1.25rem;'
const BTN_ICON = 'border-radius:999px;gap:0.5rem;padding-inline-start:0.75rem;padding-inline-end:1rem;'
const LANG = 'display:flex;align-items:center;gap:2px;background:var(--color-bg-subtle);border-radius:6px;padding:2px;flex-shrink:0;'
const LANG_BTN = 'font-size:13px;padding:3px 8px;border:none;border-radius:4px;cursor:pointer;transition:all 0.15s;'
const LANG_ACTIVE = 'background:var(--color-surface);font-weight:600;color:var(--color-text-heading);box-shadow:0 1px 2px rgba(0,0,0,0.06);'
const LANG_IDLE = 'background:transparent;color:var(--color-text-secondary);'
const HEADING = 'font-size:26px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.5px;margin:0 0 8px;line-height:1.2;'
const SUBHEADING = 'font-size:15px;color:var(--color-text-secondary);line-height:1.5rem;margin:0;'

// ── Theme Data ─────────────────────────────────────────────────────────────────
type ThemeStyle = 'cartoon' | 'floral' | 'minimalist' | 'islamic'
type Theme = {
  id: string
  name: string
  style: ThemeStyle
  interactive: boolean
  priceOriginal: number
  priceDiscount: number
  badge?: 'popular' | 'new' | 'sale'
  usedBy: number
  rating: number
  // Visual hint for unique thumbnail
  gradient: string
  accent: string
  emoji: string
  variants: string[]
  features: string[]
}

const THEMES: Theme[] = [
  {
    id: 'aruma',
    name: 'Aruma',
    style: 'cartoon',
    interactive: true,
    priceOriginal: 499000,
    priceDiscount: 329000,
    badge: 'popular',
    usedBy: 642,
    rating: 4.9,
    gradient: 'linear-gradient(135deg,#FFE8D6 0%,#FFB5A7 55%,#F4978E 100%)',
    accent: '#D0003E',
    emoji: '🏠',
    variants: ['Default', 'Jawa', 'Sunda', 'Minang', 'Bugis', 'Melayu', 'Betawi', 'Chinese', 'Beach', 'Camp', 'Penthouse'],
    features: [
      'Animasi premium yang hidup',
      'Efek scroll interaktif',
      'RSVP otomatis + statistik',
      'Dibantu admin 1×24 jam',
      'Akses aktif 1 tahun',
    ],
  },
  {
    id: 'estella',
    name: 'Estella',
    style: 'floral',
    interactive: true,
    priceOriginal: 499000,
    priceDiscount: 369000,
    badge: 'new',
    usedBy: 128,
    rating: 4.8,
    gradient: 'linear-gradient(135deg,#E8F5E9 0%,#C8E6C9 45%,#A5D6A7 100%)',
    accent: '#2E7D32',
    emoji: '🌿',
    variants: ['Default', 'Rose', 'Lavender', 'Eucalyptus', 'Sakura'],
    features: [
      'Ilustrasi floral custom',
      'Musik latar embedded',
      'Guestbook interaktif',
      'Live RSVP counter',
      'Akses aktif 1 tahun',
    ],
  },
  {
    id: 'jingga',
    name: 'Jingga',
    style: 'minimalist',
    interactive: false,
    priceOriginal: 499000,
    priceDiscount: 299000,
    badge: 'sale',
    usedBy: 384,
    rating: 4.7,
    gradient: 'linear-gradient(135deg,#FFF3E0 0%,#FFCC80 50%,#FB8C00 100%)',
    accent: '#E65100',
    emoji: '🌅',
    variants: ['Default', 'Sunset', 'Golden Hour', 'Dusk'],
    features: [
      'Desain minimalis modern',
      'Typography premium',
      'Galeri foto unlimited',
      'RSVP dengan QR code',
      'Akses aktif 1 tahun',
    ],
  },
  {
    id: 'sakina',
    name: 'Sakina',
    style: 'islamic',
    interactive: false,
    priceOriginal: 299000,
    priceDiscount: 199000,
    usedBy: 891,
    rating: 4.9,
    gradient: 'linear-gradient(135deg,#E8EAF6 0%,#C5CAE9 50%,#5C6BC0 100%)',
    accent: '#283593',
    emoji: '🕌',
    variants: ['Default', 'Klasik', 'Nuansa Emas', 'Marble'],
    features: [
      'Ornamen islami elegan',
      'Ayat pernikahan pilihan',
      'Doa & ucapan otomatis',
      'Mode gelap tersedia',
      'Akses aktif 1 tahun',
    ],
  },
]

const fmtIDR = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

// ── Page Transition ───────────────────────────────────────────────────────────
function usePageTransition() {
  onMounted(() => {
    if (!document.getElementById('onb-page-css')) {
      const s = document.createElement('style')
      s.id = 'onb-page-css'
      s.textContent = [
        '@keyframes onb-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}',
        '@keyframes onb-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.04);opacity:0.9}}',
        '@keyframes onb-shine{0%{transform:translateX(-100%) skewX(-20deg)}100%{transform:translateX(200%) skewX(-20deg)}}',
        '.tagline-leave-active{transition:opacity .18s ease-in,transform .18s ease-in}',
        '.tagline-leave-to{opacity:0;transform:translateY(-5px)}',
        '.tagline-enter-active{transition:opacity .38s cubic-bezier(0.22,1,0.36,1),transform .38s cubic-bezier(0.22,1,0.36,1)}',
        '.tagline-enter-from{opacity:0;transform:translateY(6px)}',
        '.onb-theme-card{transition:transform .2s cubic-bezier(0.22,1,0.36,1),box-shadow .2s ease}',
        '.onb-theme-card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,0.12)}',
        '.onb-variant-chip{transition:all .15s ease}',
        '.onb-shine::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent);animation:onb-shine 2.6s infinite;pointer-events:none}',
      ].join('')
      document.head.appendChild(s)
    }
  })
  onUnmounted(() => { document.getElementById('onb-page-css')?.remove() })

  function onEnter(el: Element, done: () => void) {
    const e = el as HTMLElement
    let delay = 0, maxEnd = 0
    for (const child of e.children) {
      const c = child as HTMLElement
      c.style.animation = `onb-in 420ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`
      if (delay + 420 > maxEnd) maxEnd = delay + 420
      delay += 60
    }
    setTimeout(done, maxEnd)
  }
  function onLeave(el: Element, done: () => void) {
    const e = el as HTMLElement
    e.style.transition = 'opacity 180ms ease-in'
    e.style.opacity = '0'
    setTimeout(done, 180)
  }
  return { onEnter, onLeave }
}

// ── Step definitions (used by Stepper) ────────────────────────────────────────
const STEPS_ID = [
  { title: 'Info', description: 'Pengantin & tanggal' },
  { title: 'Tema', description: 'Pilih desain' },
  { title: 'Atur', description: 'Sesuaikan' },
  { title: 'Review', description: 'Ringkasan' },
  { title: 'Bayar', description: 'Selesaikan' },
]
const STEPS_EN = [
  { title: 'Info', description: 'Couple & date' },
  { title: 'Theme', description: 'Pick design' },
  { title: 'Customize', description: 'Personalize' },
  { title: 'Review', description: 'Summary' },
  { title: 'Pay', description: 'Complete' },
]

// ── Fake preview "phone" frame used in multiple stories ───────────────────────
function phoneFrame(theme: Theme, groom: string, bride: string, date: string) {
  const d = date ? new Date(date) : new Date('2026-05-07')
  const day = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  return `
    <div style="position:relative;width:230px;height:470px;border-radius:36px;background:#0a0a0a;padding:8px;box-shadow:0 18px 40px rgba(0,0,0,0.22);">
      <div style="position:absolute;top:10px;left:50%;transform:translateX(-50%);width:84px;height:22px;background:#0a0a0a;border-radius:12px;z-index:3;"></div>
      <div style="position:relative;width:100%;height:100%;border-radius:28px;overflow:hidden;background:${theme.gradient};display:flex;flex-direction:column;justify-content:flex-end;padding:28px 16px 22px;box-sizing:border-box;">
        <div style="position:absolute;inset:0;background:
          radial-gradient(circle at 20% 15%,rgba(255,255,255,0.45) 0%,transparent 40%),
          radial-gradient(circle at 80% 25%,rgba(255,255,255,0.3) 0%,transparent 35%);
        "></div>
        <div style="position:absolute;top:40px;left:0;right:0;text-align:center;font-size:42px;line-height:1;z-index:2;">${theme.emoji}</div>
        <div style="position:relative;z-index:2;text-align:center;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.3);">
          <div style="font-size:10px;letter-spacing:4px;font-weight:600;opacity:0.85;text-transform:uppercase;margin-bottom:4px;">The Wedding of</div>
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;line-height:1.15;margin-bottom:4px;">${groom || 'Dani'} &amp; ${bride || 'Ra'}</div>
          <div style="width:24px;height:1px;background:#fff;opacity:0.7;margin:6px auto;"></div>
          <div style="font-size:11px;opacity:0.9;letter-spacing:1px;">${day}</div>
        </div>
      </div>
    </div>`
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 0 — Welcome
// ═══════════════════════════════════════════════════════════════════════════════
export const Welcome: Story = {
  name: 'Step 0 — Welcome',
  render: () => ({
    components: { Button },
    setup() {
      const lang = ref<'ID' | 'EN'>('ID')
      const t = computed(() => lang.value === 'ID' ? {
        tagline: 'Kita bikin undangan digital,<br/>jadi kamu tinggal<br/>nikmatin momennya.',
        badge: 'Akun berhasil dibuat',
        heading: 'Selamat, akunmu siap!',
        sub: 'Tinggal beberapa langkah lagi, undanganmu siap dibagikan. Rata-rata selesai ± 3 menit.',
        b1t: 'Pilih tema yang kalian banget',
        b1d: 'Lebih dari 20 tema dengan variasi budaya Indonesia',
        b2t: 'Preview dulu, baru bayar',
        b2d: 'Ga perlu khawatir, liat jadinya dulu',
        b3t: 'Gratis revisi & bantuan admin',
        b3d: 'Admin standby 1×24 jam kalau kamu bingung',
        cta: 'Mulai bikin undangan',
        ctaSub: '± 3 menit',
        secondary: 'Lihat contoh dulu',
      } : {
        tagline: 'We handle the invitation<br/>so you can focus on<br/>the moment that matters.',
        badge: 'Account created',
        heading: 'Welcome aboard!',
        sub: 'Just a few steps and your invitation is ready. Most couples finish in ± 3 minutes.',
        b1t: 'Pick a theme that feels like you',
        b1d: '20+ themes with Indonesian cultural variants',
        b2t: 'Preview before you pay',
        b2d: 'See the final invitation first, no guesswork',
        b3t: 'Free revisions + admin support',
        b3d: 'Admin responds within 24 hours if you get stuck',
        cta: 'Start creating',
        ctaSub: '± 3 min',
        secondary: 'See examples first',
      })
      return { lang, t }
    },
    template: `
      <div style="${PAGE}">
        <!-- Header — no back button on Welcome -->
        <div style="${HEADER_OUTER}">
          <div style="${HEADER}">
            <div style="width:88px;"></div>
            <div style="${HEADER_LOGO}"><img src="${WORDMARK_URL}" height="21" alt="abadikan.id" /></div>
            <div style="width:88px;display:flex;justify-content:flex-end;align-items:center;">
              <div style="${LANG}">
                <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
                <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
              </div>
            </div>
          </div>
        </div>

        <div style="${CONTENT_AREA}padding-top:3rem;">
        <div style="${CONTENT_NARROW}text-align:center;">

          <div style="display:inline-flex;align-items:center;gap:6px;background:${RED_SOFT};color:${RED};padding:6px 14px;border-radius:999px;font-size:12px;font-weight:600;margin-bottom:20px;">
            <span style="width:7px;height:7px;border-radius:50%;background:${RED};display:inline-block;animation:onb-pulse 1.6s infinite;flex-shrink:0;"></span>
            {{ t.badge }}
          </div>

          <h1 style="${HEADING}font-size:30px;margin-bottom:10px;">{{ t.heading }}</h1>
          <p style="${SUBHEADING}max-width:400px;margin:0 auto 2.25rem;">{{ t.sub }}</p>

          <div style="display:flex;flex-direction:column;gap:10px;text-align:left;margin-bottom:2.25rem;">
            <div v-for="b in [{icon:'🎨',t:t.b1t,d:t.b1d},{icon:'👀',t:t.b2t,d:t.b2d},{icon:'💬',t:t.b3t,d:t.b3d}]" :key="b.t"
              style="display:flex;gap:14px;align-items:flex-start;padding:14px 16px;background:var(--color-bg-subtle);border-radius:16px;border:1px solid var(--color-border);">
              <div style="width:36px;height:36px;flex-shrink:0;border-radius:10px;background:${RED_SOFT};display:flex;align-items:center;justify-content:center;font-size:18px;">{{ b.icon }}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-weight:600;color:var(--color-text-heading);font-size:14px;line-height:1.3;margin-bottom:2px;">{{ b.t }}</div>
                <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.35;">{{ b.d }}</div>
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:1.5rem;">
            <div style="display:flex;gap:-6px;">
              <div v-for="i in 5" :key="i" style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#FFE8D6,#F4978E);border:2px solid var(--color-bg);margin-left:-8px;first:margin-left:0;display:flex;align-items:center;justify-content:center;font-size:11px;">👰</div>
            </div>
            <span style="font-size:13px;color:var(--color-text-secondary);">{{ lang === 'ID' ? '1.200+ pasangan udah pakai Abadikan' : '1,200+ couples use Abadikan' }}</span>
          </div>

          <Button variant="default" full-width size="lg" style="${BTN}">
            <span style="display:inline-flex;align-items:baseline;gap:6px;">{{ t.cta }}<span style="font-size:12px;opacity:0.8;font-weight:500;">· {{ t.ctaSub }}</span></span>
          </Button>
          <button type="button" style="background:transparent;border:none;color:var(--color-text-secondary);font-size:14px;cursor:pointer;padding:10px;margin-top:4px;">{{ t.secondary }} →</button>

        </div>
        </div>
      </div>
    `,
  }),
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 1 — BasicInfo
// ═══════════════════════════════════════════════════════════════════════════════
export const BasicInfo: Story = {
  name: 'Step 1 — Info Dasar',
  render: () => ({
    components: { Input, Button, Stepper, DatePicker, RiUserSmileLine, RiUser3Line, RiArrowLeftSLine },
    setup() {
      const lang = ref<'ID' | 'EN'>('ID')
      const groom = ref('Dani'), bride = ref(''), date = ref('')
      const groomErr = ref(''), brideErr = ref(''), dateErr = ref('')
      const loading = ref(false)
      const steps = computed(() => lang.value === 'ID' ? STEPS_ID : STEPS_EN)
      const t = computed(() => lang.value === 'ID' ? {
        heading: 'Ceritain soal kalian',
        sub: 'Info dasar ini dipakai untuk preview undangan. Tenang, bisa diubah lagi nanti.',
        groom: 'Nama pengantin pria',
        bride: 'Nama pengantin wanita',
        date: 'Tanggal pernikahan',
        groomPh: 'Mis. Dani',
        bridePh: 'Mis. Rara',
        help: 'Cukup nama panggilan dulu juga oke, bisa lengkapin nanti',
        cta: 'Lanjut pilih tema',
        save: 'Simpan draft & lanjut nanti',
        back: 'Balik',
      } : {
        heading: 'Tell us about you two',
        sub: 'We use this for your invitation preview. You can edit it anytime.',
        groom: "Groom's name",
        bride: "Bride's name",
        date: 'Wedding date',
        groomPh: 'e.g. Dani',
        bridePh: 'e.g. Rara',
        help: 'Nicknames are fine — you can complete full names later',
        cta: 'Continue to themes',
        save: 'Save draft for later',
        back: 'Back',
      })
      function handleNext() {
        groomErr.value = brideErr.value = dateErr.value = ''
        if (!groom.value) groomErr.value = lang.value === 'ID' ? 'Belum diisi' : 'Required'
        if (!bride.value) brideErr.value = lang.value === 'ID' ? 'Belum diisi' : 'Required'
        if (!date.value) dateErr.value = lang.value === 'ID' ? 'Belum diisi' : 'Required'
        if (groomErr.value || brideErr.value || dateErr.value) return
        loading.value = true
        setTimeout(() => { loading.value = false }, 1200)
      }
      function goBack() {}
      return { lang, t, steps, groom, bride, date, groomErr, brideErr, dateErr, loading, handleNext, goBack }
    },
    template: `
      <div style="${PAGE}">
        <!-- Sticky header -->
        <div style="${HEADER_OUTER}">
          <div style="${HEADER}">
            <div style="width:88px;">
              <Button type="button" variant="outline" size="sm" style="${BTN_ICON}" @click="goBack">
                <template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}
              </Button>
            </div>
            <div style="${HEADER_LOGO}"><img src="${WORDMARK_URL}" height="21" alt="abadikan.id" /></div>
            <div style="width:88px;display:flex;justify-content:flex-end;align-items:center;gap:8px;">
              <span style="font-size:11px;font-weight:600;color:var(--color-text-secondary);">1 / 5</span>
              <div style="${LANG}">
                <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
                <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
              </div>
            </div>
          </div>
          <div style="height:3px;background:var(--color-border);"><div style="height:100%;width:36%;background:${RED};transition:width .5s ease;border-radius:0 2px 2px 0;"></div></div>
        </div>
        <!-- Stepper -->
        <div style="${STEPPER_WRAP}"><Stepper :steps="steps" :activeStep="0" /></div>
        <!-- Content -->
        <div style="${CONTENT_AREA}">
          <div style="${CONTENT_NARROW}">
            <div style="text-align:center;margin-bottom:1.5rem;">
              <h1 style="${HEADING}">{{ t.heading }}</h1>
              <p style="${SUBHEADING}">{{ t.sub }}</p>
            </div>
            <form novalidate style="display:flex;flex-direction:column;gap:0.9rem;" @submit.prevent="handleNext">
              <Input v-model="groom" :label="t.groom" required :placeholder="t.groomPh" :error="groomErr" @update:modelValue="groomErr = ''">
                <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
              </Input>
              <Input v-model="bride" :label="t.bride" required :placeholder="t.bridePh" :error="brideErr" @update:modelValue="brideErr = ''">
                <template #leading><RiUserSmileLine style="width:16px;height:16px;" /></template>
              </Input>
              <DatePicker v-model="date" :label="t.date" :placeholder="lang === 'ID' ? 'Pilih tanggal' : 'Pick a date'" :error="dateErr" @update:modelValue="dateErr = ''" />
              <p style="font-size:12px;color:var(--color-text-secondary);margin:0 0 0.25rem;line-height:1rem;">💡 {{ t.help }}</p>
            </form>
          </div>
        </div>
        <!-- Sticky bottom CTA -->
        <div style="${STICKY_BTM}">
          <div style="${STICKY_INNER}">
            <Button type="button" variant="default" full-width size="md" :loading="loading" style="${BTN}" @click="handleNext">{{ t.cta }}</Button>
            <button type="button" style="background:transparent;border:none;color:var(--color-text-secondary);font-size:13px;cursor:pointer;padding:4px;">{{ t.save }}</button>
            <div style="font-size:12px;color:var(--color-text-secondary);">💡 {{ lang === 'ID' ? 'nama bisa diubah nanti' : 'names can be changed later' }}</div>
          </div>
        </div>
      </div>
    `,
  }),
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 2 — ThemeGallery
// ═══════════════════════════════════════════════════════════════════════════════
export const ThemeGallery: Story = {
  name: 'Step 2 — Pilih Tema',
  render: () => ({
    components: { Button, Stepper, Tag, RiArrowLeftSLine, RiFireFill, RiSparklingFill, RiPriceTag3Line, RiStarFill, RiHeartFill },
    setup() {
      const lang = ref<'ID' | 'EN'>('ID')
      const filter = ref<'all' | ThemeStyle | 'popular' | 'sale' | 'new'>('all')
      const sort = ref<'popular' | 'newest' | 'price-low' | 'price-high'>('popular')
      const favs = ref<Set<string>>(new Set())

      const steps = computed(() => lang.value === 'ID' ? STEPS_ID : STEPS_EN)
      const t = computed(() => lang.value === 'ID' ? {
        heading: 'Pilih desain undanganmu',
        sub: 'Setiap pasangan punya cerita unik. Filter berdasarkan gaya atau lihat yang paling populer.',
        back: 'Balik',
        save: 'Simpan draft',
        filters: { all: 'Semua', popular: 'Populer', sale: 'Diskon', new: 'Baru', cartoon: 'Kartun', floral: 'Floral', minimalist: 'Minimalis', islamic: 'Islami' },
        sortLabel: 'Urutkan',
        sorts: { popular: 'Populer', newest: 'Terbaru', 'price-low': 'Harga ↑', 'price-high': 'Harga ↓' },
        interactive: 'Tema Interaktif',
        used: 'dipakai',
        preview: 'Preview',
        choose: 'Pilih tema',
        badges: { popular: '🔥 Populer', new: '✨ Baru', sale: '🏷️ Diskon' },
      } : {
        heading: 'Choose your invitation design',
        sub: 'Every couple has a unique story. Filter by style or see what is trending.',
        back: 'Back',
        save: 'Save draft',
        filters: { all: 'All', popular: 'Popular', sale: 'On sale', new: 'New', cartoon: 'Cartoon', floral: 'Floral', minimalist: 'Minimalist', islamic: 'Islamic' },
        sortLabel: 'Sort',
        sorts: { popular: 'Popular', newest: 'Newest', 'price-low': 'Price ↑', 'price-high': 'Price ↓' },
        interactive: 'Interactive theme',
        used: 'chose this',
        preview: 'Preview',
        choose: 'Choose theme',
        badges: { popular: '🔥 Popular', new: '✨ New', sale: '🏷️ Sale' },
      })

      const filtered = computed(() => {
        let arr = [...THEMES]
        if (filter.value === 'popular') arr = arr.filter(x => x.badge === 'popular' || x.usedBy > 500)
        else if (filter.value === 'sale') arr = arr.filter(x => x.badge === 'sale')
        else if (filter.value === 'new') arr = arr.filter(x => x.badge === 'new')
        else if (filter.value !== 'all') arr = arr.filter(x => x.style === filter.value)
        if (sort.value === 'popular') arr.sort((a, b) => b.usedBy - a.usedBy)
        else if (sort.value === 'newest') arr.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0))
        else if (sort.value === 'price-low') arr.sort((a, b) => a.priceDiscount - b.priceDiscount)
        else if (sort.value === 'price-high') arr.sort((a, b) => b.priceDiscount - a.priceDiscount)
        return arr
      })

      function toggleFav(id: string) {
        const s = new Set(favs.value)
        if (s.has(id)) s.delete(id); else s.add(id)
        favs.value = s
      }

      const filterChips: Array<'all' | ThemeStyle | 'popular' | 'sale' | 'new'> = ['all', 'popular', 'new', 'sale', 'cartoon', 'floral', 'minimalist', 'islamic']

      function goBack() {}
      return { lang, t, steps, filter, sort, filtered, themes: THEMES, favs, toggleFav, fmtIDR, filterChips, goBack }
    },
    template: `
      <div style="${PAGE}">
        <!-- Sticky header -->
        <div style="${HEADER_OUTER}">
          <div style="${HEADER}">
            <div style="width:88px;">
              <Button type="button" variant="outline" size="sm" style="${BTN_ICON}" @click="goBack">
                <template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}
              </Button>
            </div>
            <div style="${HEADER_LOGO}"><img src="${WORDMARK_URL}" height="21" alt="abadikan.id" /></div>
            <div style="width:88px;display:flex;justify-content:flex-end;align-items:center;gap:8px;">
              <span style="font-size:11px;font-weight:600;color:var(--color-text-secondary);">2 / 5</span>
              <div style="${LANG}">
                <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
                <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
              </div>
            </div>
          </div>
          <div style="height:3px;background:var(--color-border);"><div style="height:100%;width:54%;background:${RED};transition:width .5s ease;border-radius:0 2px 2px 0;"></div></div>
        </div>
        <!-- Stepper -->
        <div style="${STEPPER_WRAP}"><Stepper :steps="steps" :activeStep="1" /></div>
        <!-- Content -->
        <div style="${CONTENT_AREA}">
          <div style="${CONTENT_WIDE}">
            <div style="text-align:center;margin-bottom:1.5rem;">
              <h1 style="${HEADING}">{{ t.heading }}</h1>
              <p style="${SUBHEADING}">{{ t.sub }}</p>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;">
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                <button
                  v-for="f in filterChips" :key="f"
                  type="button"
                  @click="filter = f"
                  :style="filter === f ? 'background:${RED};color:white;border:1px solid ${RED};' : 'background:var(--color-surface);color:var(--color-text);border:1px solid var(--color-border);'"
                  style="padding:7px 14px;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s ease;"
                >{{ t.filters[f] }}</button>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <label style="font-size:13px;color:var(--color-text-secondary);">{{ t.sortLabel }}:</label>
                <select v-model="sort" style="padding:7px 12px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);font-size:13px;cursor:pointer;">
                  <option value="popular">{{ t.sorts.popular }}</option>
                  <option value="newest">{{ t.sorts.newest }}</option>
                  <option value="price-low">{{ t.sorts['price-low'] }}</option>
                  <option value="price-high">{{ t.sorts['price-high'] }}</option>
                </select>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:1.25rem;">
              <div v-for="theme in filtered" :key="theme.id" class="onb-theme-card" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;position:relative;">
                <div :style="'position:relative;aspect-ratio:3/4;background:' + theme.gradient + ';display:flex;align-items:flex-end;justify-content:center;padding:18px;overflow:hidden;'">
                  <div style="position:absolute;inset:0;background:radial-gradient(circle at 25% 20%,rgba(255,255,255,0.5) 0%,transparent 45%),radial-gradient(circle at 75% 30%,rgba(255,255,255,0.3) 0%,transparent 40%);"></div>
                  <div style="position:absolute;top:22px;left:0;right:0;text-align:center;font-size:52px;line-height:1;">{{ theme.emoji }}</div>
                  <div style="position:relative;z-index:2;text-align:center;color:white;text-shadow:0 2px 6px rgba(0,0,0,0.3);">
                    <div style="font-size:9px;letter-spacing:3px;font-weight:600;opacity:0.9;text-transform:uppercase;margin-bottom:3px;">The Wedding of</div>
                    <div style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;line-height:1.1;">Dani &amp; Ra</div>
                    <div style="width:18px;height:1px;background:white;opacity:0.7;margin:5px auto;"></div>
                    <div style="font-size:10px;opacity:0.9;letter-spacing:1px;">07 Mei 2026</div>
                  </div>
                  <div v-if="theme.badge" style="position:absolute;top:12px;left:12px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);color:white;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;">{{ t.badges[theme.badge] }}</div>
                  <button type="button" @click="toggleFav(theme.id)" :aria-pressed="favs.has(theme.id)" style="position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.95);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                    <RiHeartFill :style="favs.has(theme.id) ? 'color:${RED}' : 'color:#d0d0d0'" style="width:16px;height:16px;" />
                  </button>
                  <div v-if="theme.interactive" style="position:absolute;bottom:12px;right:12px;background:rgba(255,255,255,0.95);color:${RED};padding:4px 9px;border-radius:999px;font-size:10px;font-weight:600;display:flex;align-items:center;gap:3px;">✨ {{ t.interactive }}</div>
                </div>

                <div style="padding:14px 16px 16px;display:flex;flex-direction:column;gap:8px;flex:1;">
                  <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
                    <div style="font-size:17px;font-weight:700;color:var(--color-text-heading);line-height:1.2;">{{ theme.name }}</div>
                    <div style="display:flex;align-items:center;gap:3px;font-size:12px;color:var(--color-text-secondary);white-space:nowrap;">
                      <RiStarFill style="width:12px;height:12px;color:#F59E0B;" /> {{ theme.rating.toFixed(1) }}
                    </div>
                  </div>
                  <div style="font-size:12px;color:var(--color-text-secondary);display:flex;align-items:center;gap:5px;">
                    <span style="display:inline-flex;">👥</span> {{ theme.usedBy }}+ pasangan {{ t.used }}
                  </div>
                  <div style="display:flex;align-items:baseline;gap:8px;margin-top:2px;">
                    <span style="font-size:17px;font-weight:700;color:${RED};">{{ fmtIDR(theme.priceDiscount) }}</span>
                    <span v-if="theme.priceOriginal > theme.priceDiscount" style="font-size:12px;color:var(--color-text-secondary);text-decoration:line-through;">{{ fmtIDR(theme.priceOriginal) }}</span>
                  </div>
                  <Button variant="default" size="sm" full-width style="${BTN}margin-top:6px;">{{ t.choose }}</Button>
                </div>
              </div>
            </div>

            <div style="margin-top:2rem;text-align:center;">
              <button type="button" style="background:transparent;border:none;color:var(--color-text-secondary);font-size:14px;cursor:pointer;padding:10px;">{{ t.save }}</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 3 — ThemePersonalize
// ═══════════════════════════════════════════════════════════════════════════════
export const ThemePersonalize: Story = {
  name: 'Step 3 — Personalisasi',
  render: () => ({
    components: { Input, Button, Stepper, Checkbox, DatePicker, RiArrowLeftSLine, RiEditLine, RiEyeLine },
    setup() {
      const lang = ref<'ID' | 'EN'>('ID')
      const theme = ref<Theme>(THEMES[0])
      const variant = ref<string>(theme.value.variants[0])
      const groom = ref('Dani'), bride = ref('Ra'), date = ref('2026-05-07')
      const editingInfo = ref(false)

      const addons = ref({
        music: { enabled: false, price: 49000 },
        gallery: { enabled: true, price: 0 },
        rsvpPro: { enabled: false, price: 79000 },
        qrGate: { enabled: false, price: 99000 },
      })

      const steps = computed(() => lang.value === 'ID' ? STEPS_ID : STEPS_EN)
      const t = computed(() => lang.value === 'ID' ? {
        heading: 'Atur undanganmu',
        sub: 'Pilih variasi tema, tambahkan fitur kalau perlu. Preview di kiri update otomatis.',
        back: 'Balik ke tema',
        variant: 'Variasi tema',
        info: 'Info pernikahan',
        edit: 'Edit',
        done: 'Selesai',
        groom: 'Pengantin pria',
        bride: 'Pengantin wanita',
        date: 'Tanggal',
        addons: 'Fitur tambahan',
        addonsSub: 'Upgrade pengalaman tamu (opsional)',
        music: 'Musik latar',
        musicD: 'Tambahin lagu favorit kalian sebagai backsound',
        gallery: 'Galeri foto',
        galleryD: 'Upload foto prewedding, sudah termasuk',
        included: 'Termasuk',
        rsvp: 'RSVP Pro',
        rsvpD: 'Notifikasi real-time + segmentasi tamu',
        qr: 'QR Gate',
        qrD: 'Check-in tamu pakai QR code di venue',
        totalLabel: 'Total harga',
        from: 'Mulai dari',
        cta: 'Lanjut ke ringkasan',
        preview: 'Preview langsung',
        previewSub: 'Update otomatis sesuai input kamu',
      } : {
        heading: 'Customize your invitation',
        sub: 'Pick a variant, add features if needed. The preview on the left updates live.',
        back: 'Back to themes',
        variant: 'Theme variant',
        info: 'Wedding info',
        edit: 'Edit',
        done: 'Done',
        groom: "Groom",
        bride: "Bride",
        date: 'Date',
        addons: 'Optional add-ons',
        addonsSub: 'Upgrade your guests experience',
        music: 'Background music',
        musicD: 'Add your favorite song as background',
        gallery: 'Photo gallery',
        galleryD: 'Upload pre-wedding photos, included',
        included: 'Included',
        rsvp: 'RSVP Pro',
        rsvpD: 'Real-time notifications + guest segmentation',
        qr: 'QR Gate',
        qrD: 'Check-in guests via QR at venue',
        totalLabel: 'Estimated total',
        from: 'From',
        cta: 'Continue to summary',
        preview: 'Live preview',
        previewSub: 'Updates automatically as you edit',
      })

      const addonsTotal = computed(() =>
        Object.values(addons.value).reduce((s, a) => s + (a.enabled ? a.price : 0), 0)
      )
      const totalPrice = computed(() => theme.value.priceDiscount + addonsTotal.value)

      watch(theme, (v) => { variant.value = v.variants[0] })

      function goBack() {}
      return { lang, t, steps, theme, themes: THEMES, variant, groom, bride, date, editingInfo, addons, addonsTotal, totalPrice, fmtIDR, phoneFrame, goBack }
    },
    template: `
      <div style="${PAGE}">
        <!-- Sticky header -->
        <div style="${HEADER_OUTER}">
          <div style="${HEADER}">
            <div style="width:88px;">
              <Button type="button" variant="outline" size="sm" style="${BTN_ICON}" @click="goBack">
                <template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}
              </Button>
            </div>
            <div style="${HEADER_LOGO}"><img src="${WORDMARK_URL}" height="21" alt="abadikan.id" /></div>
            <div style="width:88px;display:flex;justify-content:flex-end;align-items:center;gap:8px;">
              <span style="font-size:11px;font-weight:600;color:var(--color-text-secondary);">3 / 5</span>
              <div style="${LANG}">
                <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
                <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
              </div>
            </div>
          </div>
          <div style="height:3px;background:var(--color-border);"><div style="height:100%;width:54%;background:${RED};transition:width .5s ease;border-radius:0 2px 2px 0;"></div></div>
        </div>
        <!-- Stepper -->
        <div style="${STEPPER_WRAP}"><Stepper :steps="steps" :activeStep="2" /></div>
        <!-- Content -->
        <div style="${CONTENT_AREA}">
          <div style="${CONTENT_WIDE}">

            <div style="display:grid;grid-template-columns:minmax(260px,0.9fr) 1.3fr;gap:2.5rem;align-items:start;">

              <!-- Preview Pane -->
              <div style="position:sticky;top:1rem;display:flex;flex-direction:column;align-items:center;gap:0.9rem;">
                <div style="display:flex;align-items:center;gap:6px;color:var(--color-text-secondary);font-size:12px;">
                  <RiEyeLine style="width:14px;height:14px;" /> {{ t.preview }}
                </div>
                <div v-html="phoneFrame(theme, groom, bride, date)"></div>
                <div style="font-size:11px;color:var(--color-text-tertiary,var(--color-text-secondary));text-align:center;">{{ t.previewSub }}</div>
              </div>

              <!-- Controls -->
              <div style="display:flex;flex-direction:column;gap:1.75rem;">

                <div>
                  <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.3px;margin:0 0 6px;">{{ t.heading }}</h1>
                  <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.4rem;">{{ t.sub }}</p>
                </div>

                <!-- Theme picker tiny row -->
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                  <span style="font-size:13px;color:var(--color-text-secondary);margin-right:4px;">Tema:</span>
                  <button v-for="tm in themes" :key="tm.id" type="button"
                    @click="theme = tm"
                    :style="theme.id === tm.id ? 'background:' + tm.gradient + ';color:white;border-color:transparent;box-shadow:0 2px 8px rgba(0,0,0,0.12);font-weight:700;' : 'background:var(--color-surface);color:var(--color-text);border:1px solid var(--color-border);'"
                    style="padding:6px 12px;border-radius:999px;border:1px solid;font-size:12px;cursor:pointer;transition:all .15s;"
                  >{{ tm.emoji }} {{ tm.name }}</button>
                </div>

                <!-- Variant chips -->
                <div>
                  <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);margin-bottom:10px;">{{ t.variant }}</div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap;">
                    <button v-for="v in theme.variants" :key="v" type="button"
                      @click="variant = v"
                      class="onb-variant-chip"
                      :style="variant === v ? 'background:' + theme.accent + ';color:white;border-color:' + theme.accent + ';' : 'background:var(--color-surface);color:var(--color-text);border:1px solid var(--color-border);'"
                      style="padding:6px 14px;border-radius:999px;border:1px solid;font-size:13px;font-weight:500;cursor:pointer;"
                    >{{ v }}</button>
                  </div>
                </div>

                <!-- Info pernikahan (inline edit) -->
                <div style="border:1px solid var(--color-border);border-radius:16px;padding:1.1rem 1.25rem;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                    <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ t.info }}</div>
                    <button type="button" @click="editingInfo = !editingInfo" style="display:flex;align-items:center;gap:4px;background:transparent;border:none;color:${RED};font-size:13px;font-weight:600;cursor:pointer;padding:4px 8px;">
                      <RiEditLine style="width:13px;height:13px;" />
                      {{ editingInfo ? t.done : t.edit }}
                    </button>
                  </div>
                  <div v-if="!editingInfo" style="display:grid;grid-template-columns:1fr 1fr;gap:10px 20px;font-size:13px;">
                    <div><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ t.groom }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ groom }}</div></div>
                    <div><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ t.bride }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ bride }}</div></div>
                    <div style="grid-column:1/-1;"><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ t.date }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ new Date(date).toLocaleDateString(lang === 'ID' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }) }}</div></div>
                  </div>
                  <div v-else style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <Input v-model="groom" :label="t.groom" />
                    <Input v-model="bride" :label="t.bride" />
                    <div style="grid-column:1/-1;"><DatePicker v-model="date" :label="t.date" :placeholder="lang === 'ID' ? 'Pilih tanggal' : 'Pick a date'" /></div>
                  </div>
                </div>

                <!-- Add-ons -->
                <div>
                  <div style="margin-bottom:10px;">
                    <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);margin-bottom:2px;">{{ t.addons }}</div>
                    <div style="font-size:12px;color:var(--color-text-secondary);">{{ t.addonsSub }}</div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <div v-for="(cfg, key) in addons" :key="key" :style="cfg.enabled ? 'border-color:' + theme.accent + ';background:rgba(208,0,62,0.03);' : 'border-color:var(--color-border);'" style="display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:12px;border:1px solid;transition:all .15s;">
                      <Checkbox :modelValue="cfg.enabled" :disabled="key === 'gallery'" @update:modelValue="cfg.enabled = $event === true" />
                      <div style="flex:1;min-width:0;">
                        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px;">
                          <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);">
                            <template v-if="key === 'music'">🎵 {{ t.music }}</template>
                            <template v-else-if="key === 'gallery'">🖼️ {{ t.gallery }}</template>
                            <template v-else-if="key === 'rsvpPro'">📊 {{ t.rsvp }}</template>
                            <template v-else>📱 {{ t.qr }}</template>
                          </div>
                          <div v-if="key === 'gallery'" style="font-size:11px;color:var(--color-text-secondary);white-space:nowrap;background:var(--color-bg-subtle);padding:2px 8px;border-radius:999px;font-weight:500;">✓ {{ t.included }}</div>
                          <div v-else style="font-size:13px;font-weight:700;color:${RED};white-space:nowrap;">+{{ fmtIDR(cfg.price) }}</div>
                        </div>
                        <div style="font-size:12px;color:var(--color-text-secondary);line-height:1.35;">
                          <template v-if="key === 'music'">{{ t.musicD }}</template>
                          <template v-else-if="key === 'gallery'">{{ t.galleryD }}</template>
                          <template v-else-if="key === 'rsvpPro'">{{ t.rsvpD }}</template>
                          <template v-else>{{ t.qrD }}</template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        <!-- Sticky bottom price summary + CTA -->
        <div style="${STICKY_BTM}">
          <div style="width:100%;max-width:860px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
            <div>
              <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:2px;">{{ t.totalLabel }}</div>
              <div style="display:flex;align-items:baseline;gap:8px;">
                <span style="font-size:20px;font-weight:700;color:var(--color-text-heading);">{{ fmtIDR(totalPrice) }}</span>
                <span v-if="theme.priceOriginal > theme.priceDiscount" style="font-size:12px;color:var(--color-text-secondary);text-decoration:line-through;">{{ fmtIDR(theme.priceOriginal + addonsTotal) }}</span>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
              <Button variant="default" size="md" style="${BTN}flex-shrink:0;">
                {{ t.cta }}
                <template #trailing><span style="font-size:14px;">→</span></template>
              </Button>
              <span style="font-size:11px;color:var(--color-text-secondary);">🔒 {{ lang === 'ID' ? 'Aman' : 'Secure' }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 4 — Review
// ═══════════════════════════════════════════════════════════════════════════════
export const Review: Story = {
  name: 'Step 4 — Review',
  render: () => ({
    components: { Button, Stepper, Tag, RiArrowLeftSLine, RiTimeLine, RiShieldCheckLine, RiEditLine, RiSparklingFill },
    setup() {
      const lang = ref<'ID' | 'EN'>('ID')
      const theme = THEMES[0]
      const variant = 'Default'
      const groom = 'Dani', bride = 'Rara', date = '2026-05-07'
      const addonsSelected = [
        { label: 'Musik latar', labelEN: 'Background music', price: 49000 },
        { label: 'RSVP Pro', labelEN: 'RSVP Pro', price: 79000 },
      ]
      const bonusCountdown = ref(23 * 3600 + 47 * 60 + 12) // 23:47:12
      let timer: ReturnType<typeof setInterval> | null = null
      onMounted(() => {
        timer = setInterval(() => { if (bonusCountdown.value > 0) bonusCountdown.value-- }, 1000)
      })
      onUnmounted(() => { if (timer) clearInterval(timer) })

      const hh = computed(() => String(Math.floor(bonusCountdown.value / 3600)).padStart(2, '0'))
      const mm = computed(() => String(Math.floor((bonusCountdown.value % 3600) / 60)).padStart(2, '0'))
      const ss = computed(() => String(bonusCountdown.value % 60).padStart(2, '0'))

      const steps = computed(() => lang.value === 'ID' ? STEPS_ID : STEPS_EN)
      const t = computed(() => lang.value === 'ID' ? {
        heading: 'Hampir jadi, cek dulu ya',
        sub: 'Pastikan semuanya udah pas. Masih bisa ubah sebelum bayar.',
        back: 'Balik atur',
        themeLabel: 'Tema yang dipilih',
        variant: 'Variasi',
        info: 'Info pernikahan',
        addons: 'Fitur tambahan',
        edit: 'Ubah',
        priceDetail: 'Rincian biaya',
        basePrice: 'Tema Aruma',
        discount: 'Diskon launch',
        addonsLabel: 'Fitur tambahan',
        subtotal: 'Subtotal',
        total: 'Total bayar',
        you_save: 'Kamu hemat',
        bonus: 'Bonus kalau selesaikan hari ini',
        bonus1: 'Free premium font pack',
        bonus2: 'Prioritas admin 24 jam',
        cta: 'Lanjut ke pembayaran',
        save: 'Simpan draft & lanjut nanti',
        safe: 'Pembayaran aman via QRIS, VA, dll',
      } : {
        heading: 'Almost there — review',
        sub: 'Make sure everything looks right. You can still edit before paying.',
        back: 'Back to edit',
        themeLabel: 'Selected theme',
        variant: 'Variant',
        info: 'Wedding info',
        addons: 'Add-ons',
        edit: 'Edit',
        priceDetail: 'Price breakdown',
        basePrice: 'Aruma theme',
        discount: 'Launch discount',
        addonsLabel: 'Add-ons',
        subtotal: 'Subtotal',
        total: 'Total',
        you_save: 'You save',
        bonus: 'Bonus if you complete today',
        bonus1: 'Free premium font pack',
        bonus2: 'Priority admin within 24 hours',
        cta: 'Continue to payment',
        save: 'Save draft for later',
        safe: 'Secure payment via QRIS, VA, etc.',
      })

      const addonsTotal = addonsSelected.reduce((s, a) => s + a.price, 0)
      const subtotal = theme.priceOriginal + addonsTotal
      const discount = theme.priceOriginal - theme.priceDiscount
      const total = theme.priceDiscount + addonsTotal

      function goBack() {}
      return { lang, t, steps, theme, variant, groom, bride, date, addonsSelected, addonsTotal, subtotal, discount, total, hh, mm, ss, fmtIDR, phoneFrame, goBack }
    },
    template: `
      <div style="${PAGE}">
        <!-- Sticky header -->
        <div style="${HEADER_OUTER}">
          <div style="${HEADER}">
            <div style="width:88px;">
              <Button type="button" variant="outline" size="sm" style="${BTN_ICON}" @click="goBack">
                <template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}
              </Button>
            </div>
            <div style="${HEADER_LOGO}"><img src="${WORDMARK_URL}" height="21" alt="abadikan.id" /></div>
            <div style="width:88px;display:flex;justify-content:flex-end;align-items:center;gap:8px;">
              <span style="font-size:11px;font-weight:600;color:var(--color-text-secondary);">4 / 5</span>
              <div style="${LANG}">
                <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
                <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
              </div>
            </div>
          </div>
          <div style="height:3px;background:var(--color-border);"><div style="height:100%;width:72%;background:${RED};transition:width .5s ease;border-radius:0 2px 2px 0;"></div></div>
        </div>
        <!-- Stepper -->
        <div style="${STEPPER_WRAP}"><Stepper :steps="steps" :activeStep="3" /></div>
        <!-- Content -->
        <div style="${CONTENT_AREA}">
          <div style="${CONTENT_WIDE}max-width:860px;">

            <div style="text-align:center;margin-bottom:1.5rem;">
              <h1 style="${HEADING}">{{ t.heading }}</h1>
              <p style="${SUBHEADING}">{{ t.sub }}</p>
            </div>

            <!-- Bonus countdown banner -->
            <div style="background:linear-gradient(100deg,#FEF3C7,#FDE68A);border:1px solid #F59E0B33;border-radius:14px;padding:0.9rem 1.1rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:12px;">
              <div style="font-size:24px;">🎁</div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:13px;font-weight:700;color:#92400E;line-height:1.3;">{{ t.bonus }}</div>
                <div style="font-size:12px;color:#92400E;opacity:0.85;line-height:1.3;">{{ t.bonus1 }} · {{ t.bonus2 }}</div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;background:#92400E;color:white;padding:6px 12px;border-radius:10px;font-family:ui-monospace,monospace;font-size:14px;font-weight:700;">
                <RiTimeLine style="width:14px;height:14px;" /> {{ hh }}:{{ mm }}:{{ ss }}
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:1.5rem;align-items:start;">

              <div style="display:flex;flex-direction:column;gap:1rem;">

                <!-- Theme summary card -->
                <div style="border:1px solid var(--color-border);border-radius:16px;padding:1rem;display:flex;gap:1rem;align-items:center;">
                  <div :style="'width:80px;height:100px;flex-shrink:0;border-radius:10px;background:' + theme.gradient + ';display:flex;align-items:center;justify-content:center;font-size:34px;'">{{ theme.emoji }}</div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:3px;">{{ t.themeLabel }}</div>
                    <div style="font-size:18px;font-weight:700;color:var(--color-text-heading);margin-bottom:4px;">{{ theme.name }}</div>
                    <div style="font-size:12px;color:var(--color-text-secondary);">{{ t.variant }}: <strong style="color:var(--color-text-heading);">{{ variant }}</strong></div>
                  </div>
                  <button type="button" style="background:transparent;border:1px solid var(--color-border);border-radius:999px;padding:6px 14px;color:var(--color-text);font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;">
                    <RiEditLine style="width:12px;height:12px;" /> {{ t.edit }}
                  </button>
                </div>

                <!-- Info card -->
                <div style="border:1px solid var(--color-border);border-radius:16px;padding:1rem 1.1rem;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                    <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ t.info }}</div>
                    <button type="button" style="background:transparent;border:none;color:${RED};font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;"><RiEditLine style="width:12px;height:12px;" />{{ t.edit }}</button>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 16px;font-size:13px;">
                    <div><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ lang === 'ID' ? 'Pria' : 'Groom' }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ groom }}</div></div>
                    <div><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ lang === 'ID' ? 'Wanita' : 'Bride' }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ bride }}</div></div>
                    <div><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ lang === 'ID' ? 'Tanggal' : 'Date' }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ new Date(date).toLocaleDateString(lang === 'ID' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }}</div></div>
                  </div>
                </div>

                <!-- Add-ons card -->
                <div style="border:1px solid var(--color-border);border-radius:16px;padding:1rem 1.1rem;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                    <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ t.addons }}</div>
                    <button type="button" style="background:transparent;border:none;color:${RED};font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;"><RiEditLine style="width:12px;height:12px;" />{{ t.edit }}</button>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <div v-for="(a, i) in addonsSelected" :key="i" style="display:flex;justify-content:space-between;font-size:13px;">
                      <span style="color:var(--color-text);">✓ {{ lang === 'ID' ? a.label : a.labelEN }}</span>
                      <span style="font-weight:600;color:var(--color-text-heading);">{{ fmtIDR(a.price) }}</span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Price panel -->
              <div style="position:sticky;top:1rem;background:var(--color-bg-subtle);border:1px solid var(--color-border);border-radius:16px;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;">
                <div style="font-size:14px;font-weight:700;color:var(--color-text-heading);">{{ t.priceDetail }}</div>

                <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--color-text-secondary);">{{ t.basePrice }}</span>
                    <span style="color:var(--color-text);">{{ fmtIDR(theme.priceOriginal) }}</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;color:#059669;">
                    <span>− {{ t.discount }}</span>
                    <span>− {{ fmtIDR(discount) }}</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:var(--color-text-secondary);">{{ t.addonsLabel }} ({{ addonsSelected.length }})</span>
                    <span style="color:var(--color-text);">{{ fmtIDR(addonsTotal) }}</span>
                  </div>
                </div>

                <div style="border-top:1px dashed var(--color-border);padding-top:12px;display:flex;flex-direction:column;gap:4px;">
                  <div style="display:flex;justify-content:space-between;align-items:baseline;">
                    <span style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ t.total }}</span>
                    <span style="font-size:22px;font-weight:700;color:${RED};">{{ fmtIDR(total) }}</span>
                  </div>
                  <div style="text-align:right;font-size:11px;color:#059669;font-weight:600;">{{ t.you_save }} {{ fmtIDR(discount) }}</div>
                </div>

              </div>

            </div>

          </div>
        </div>
        <!-- Sticky bottom CTA -->
        <div style="${STICKY_BTM}">
          <div style="${STICKY_INNER}">
            <Button variant="default" full-width size="md" style="${BTN}">{{ t.cta }}</Button>
            <button type="button" style="background:transparent;border:none;color:var(--color-text-secondary);font-size:13px;cursor:pointer;padding:4px;">{{ t.save }}</button>
            <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--color-text-secondary);">
              <RiShieldCheckLine style="width:13px;height:13px;" /> 🔒 {{ lang === 'ID' ? 'Aman' : 'Secure' }} · {{ t.safe }}
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 5 — Payment (QR, auto-confirm simulation)
// ═══════════════════════════════════════════════════════════════════════════════

const PAYMENT_METHODS_ID = [
  { value: 'qris', label: 'QRIS' },
  { value: 'va', label: 'Virtual Account' },
  { value: 'ewallet', label: 'E-Wallet' },
]
const PAYMENT_METHODS_EN = [
  { value: 'qris', label: 'QRIS' },
  { value: 'va', label: 'Virtual Account' },
  { value: 'ewallet', label: 'E-Wallet' },
]

// Deterministic QR pattern (same seed gives same image — looks stable on refresh)
function buildQRBits() {
  return Array.from({ length: 25 * 25 }, (_, i) => {
    const x = i % 25, y = Math.floor(i / 25)
    if ((x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17)) {
      const inCorner = (x >= 1 && x <= 5 && y >= 1 && y <= 5) || (x >= 19 && x <= 23 && y >= 1 && y <= 5) || (x >= 1 && x <= 5 && y >= 19 && y <= 23)
      const outer = (x === 0 || x === 6 || y === 0 || y === 6) && x < 7 && y < 7
      const outer2 = ((x === 18 || x === 24 || y === 0 || y === 6) && x > 17 && y < 7)
      const outer3 = ((x === 0 || x === 6 || y === 18 || y === 24) && x < 7 && y > 17)
      const center = ((x >= 2 && x <= 4 && y >= 2 && y <= 4) || (x >= 20 && x <= 22 && y >= 2 && y <= 4) || (x >= 2 && x <= 4 && y >= 20 && y <= 22))
      return outer || outer2 || outer3 || center ? 1 : inCorner ? 0 : 1
    }
    return (x * 7 + y * 13 + x * y) % 3 === 0 ? 1 : 0
  })
}

type PaymentStatus = 'waiting' | 'confirming' | 'success'

/**
 * Simulates payment auto-authorization flow.
 * - Auto advances waiting → confirming → success
 * - Caller can override timing or trigger manually
 * - onSuccess fires once, used by FullFlow to auto-navigate
 */
function usePaymentSim(opts: { waitMs?: number; confirmMs?: number; onSuccess?: () => void } = {}) {
  const status = ref<PaymentStatus>('waiting')
  const waitMs = opts.waitMs ?? 8000
  const confirmMs = opts.confirmMs ?? 2200
  let t1: ReturnType<typeof setTimeout> | null = null
  let t2: ReturnType<typeof setTimeout> | null = null

  function start() {
    cancel()
    status.value = 'waiting'
    t1 = setTimeout(() => {
      status.value = 'confirming'
      t2 = setTimeout(() => {
        status.value = 'success'
        opts.onSuccess?.()
      }, confirmMs)
    }, waitMs)
  }
  function triggerNow() {
    cancel()
    status.value = 'confirming'
    t2 = setTimeout(() => {
      status.value = 'success'
      opts.onSuccess?.()
    }, 1200)
  }
  function cancel() {
    if (t1) { clearTimeout(t1); t1 = null }
    if (t2) { clearTimeout(t2); t2 = null }
  }
  onMounted(() => start())
  onUnmounted(() => cancel())
  return { status, start, triggerNow, cancel }
}

export const Payment: Story = {
  name: 'Step 5 — Pembayaran',
  render: () => ({
    components: { Button, Stepper, SegmentedControl, Spinner, RiArrowLeftSLine, RiRefreshLine, RiDownload2Line, RiTimeLine, RiShieldCheckLine, RiCheckboxCircleFill, RiCheckLine },
    setup() {
      const lang = ref<'ID' | 'EN'>('ID')
      const method = ref<string>('qris')
      const paymentLeft = ref(59 * 60 + 51) // 59:51
      let timer: ReturnType<typeof setInterval> | null = null
      onMounted(() => { timer = setInterval(() => { if (paymentLeft.value > 0) paymentLeft.value-- }, 1000) })
      onUnmounted(() => { if (timer) clearInterval(timer) })
      const mm = computed(() => String(Math.floor(paymentLeft.value / 60)).padStart(2, '0'))
      const ss = computed(() => String(paymentLeft.value % 60).padStart(2, '0'))

      const { status, triggerNow, start } = usePaymentSim({ waitMs: 9000, confirmMs: 2200 })

      const steps = computed(() => lang.value === 'ID' ? STEPS_ID : STEPS_EN)
      const methodOptions = computed(() => lang.value === 'ID' ? PAYMENT_METHODS_ID : PAYMENT_METHODS_EN)
      const t = computed(() => lang.value === 'ID' ? {
        heading: 'Selesaikan pembayaran',
        sub: 'Pilih metode favorit kamu. Kita pakai payment gateway tersertifikasi.',
        back: 'Balik',
        timer: 'Bayar dalam',
        qrisLabel: 'Scan QRIS',
        qrisSub: 'Buka m-banking atau e-wallet apa aja, scan QR di bawah.',
        downloadQR: 'Download QR',
        invoice: 'Invoice',
        simulate: 'Simulasi bayar sekarang',
        again: 'Ulang simulasi',
        waiting: 'Menunggu pembayaran',
        waitingD: 'Halaman akan update otomatis setelah pembayaran terdeteksi.',
        confirming: 'Mengonfirmasi pembayaran',
        confirmingD: 'Sebentar ya, lagi ngecek ke bank.',
        success: 'Pembayaran berhasil!',
        successD: 'Terima kasih — undanganmu lagi kami siapin.',
        continue: 'Lanjut ke halaman sukses',
        totalBayar: 'Total yang dibayar',
        safeText: 'Dilindungi enkripsi tingkat bank',
        orderSum: 'Rincian pesanan',
        theme: 'Tema Aruma',
        variant: 'Default',
        addons: '2 fitur tambahan',
        bank: 'Pilih bank',
        bankD: 'Salin nomor VA lalu bayar via mobile banking',
        ewallet: 'Pilih e-wallet',
        ewalletD: 'Redirect ke aplikasi e-wallet kamu',
        copy: 'Salin',
        copied: 'Tersalin',
      } : {
        heading: 'Complete your payment',
        sub: 'Pick your favorite method. We use certified payment gateways.',
        back: 'Back',
        timer: 'Pay within',
        qrisLabel: 'Scan QRIS',
        qrisSub: 'Open any m-banking or e-wallet app and scan the QR below.',
        downloadQR: 'Download QR',
        invoice: 'Invoice',
        simulate: 'Simulate payment now',
        again: 'Restart simulation',
        waiting: 'Waiting for payment',
        waitingD: 'This page updates automatically once payment is detected.',
        confirming: 'Confirming your payment',
        confirmingD: 'Hang on, verifying with your bank.',
        success: 'Payment received!',
        successD: 'Thank you — we are preparing your invitation now.',
        continue: 'Continue to success',
        totalBayar: 'Amount to pay',
        safeText: 'Protected by bank-grade encryption',
        orderSum: 'Order summary',
        theme: 'Aruma theme',
        variant: 'Default',
        addons: '2 add-ons',
        bank: 'Select bank',
        bankD: 'Copy VA number and pay via mobile banking',
        ewallet: 'Select e-wallet',
        ewalletD: 'Redirects to your e-wallet app',
        copy: 'Copy',
        copied: 'Copied',
      })

      const qr = buildQRBits()
      const totalPrice = 457000

      const vaCopied = ref('')
      function copyVA(bank: string) {
        const num = '88898' + bank.length + '1234567'
        navigator.clipboard?.writeText(num).catch(() => {})
        vaCopied.value = bank
        setTimeout(() => { if (vaCopied.value === bank) vaCopied.value = '' }, 1500)
      }

      function goBack() {}
      return { lang, t, steps, method, methodOptions, mm, ss, qr, status, triggerNow, start, totalPrice, fmtIDR, vaCopied, copyVA, goBack }
    },
    template: `
      <div style="${PAGE}">
        <!-- Sticky header -->
        <div style="${HEADER_OUTER}">
          <div style="${HEADER}">
            <div style="width:88px;">
              <Button type="button" variant="outline" size="sm" style="${BTN_ICON}" @click="goBack">
                <template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}
              </Button>
            </div>
            <div style="${HEADER_LOGO}"><img src="${WORDMARK_URL}" height="21" alt="abadikan.id" /></div>
            <div style="width:88px;display:flex;justify-content:flex-end;align-items:center;gap:8px;">
              <span style="font-size:11px;font-weight:600;color:var(--color-text-secondary);">5 / 5</span>
              <div style="${LANG}">
                <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
                <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
              </div>
            </div>
          </div>
          <div style="height:3px;background:var(--color-border);"><div style="height:100%;width:90%;background:${RED};transition:width .5s ease;border-radius:0 2px 2px 0;"></div></div>
        </div>
        <!-- Stepper -->
        <div style="${STEPPER_WRAP}"><Stepper :steps="steps" :activeStep="4" /></div>
        <!-- Content -->
        <div style="${CONTENT_AREA}">
          <div style="${CONTENT_WIDE}max-width:860px;">

            <div style="text-align:center;margin-bottom:1.5rem;">
              <h1 style="${HEADING}">{{ t.heading }}</h1>
              <p style="${SUBHEADING}">{{ t.sub }}</p>
            </div>

            <div style="display:grid;grid-template-columns:1fr 320px;gap:1.5rem;align-items:start;">

              <!-- LEFT: method + QR/list + status -->
              <div style="display:flex;flex-direction:column;gap:1rem;">

                <!-- Segmented method selector -->
                <SegmentedControl v-model="method" :options="methodOptions" size="md" full-width />

                <!-- QRIS -->
                <div v-if="method === 'qris'" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:20px;padding:1.5rem;display:flex;flex-direction:column;align-items:center;">
                  <div style="text-align:center;margin-bottom:1rem;">
                    <div style="font-size:16px;font-weight:700;color:var(--color-text-heading);margin-bottom:4px;">{{ t.qrisLabel }}</div>
                    <div style="font-size:13px;color:var(--color-text-secondary);max-width:340px;line-height:1.4rem;">{{ t.qrisSub }}</div>
                  </div>

                  <div :style="status === 'success' ? 'opacity:0.35;filter:grayscale(0.6);transition:all .3s;' : 'transition:all .3s;'" style="position:relative;padding:14px;background:white;border:2px solid ${RED};border-radius:18px;box-shadow:0 4px 14px rgba(208,0,62,0.1);">
                    <div style="display:grid;grid-template-columns:repeat(25,8px);gap:0;width:200px;height:200px;">
                      <div v-for="(bit, i) in qr" :key="i" :style="'width:8px;height:8px;background:' + (bit ? '#000' : 'transparent') + ';'"></div>
                    </div>
                    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:52px;height:52px;background:white;border-radius:10px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.18);">
                      <div style="width:38px;height:38px;background:${RED};border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:13px;font-weight:800;letter-spacing:-0.5px;">ab</div>
                    </div>
                  </div>

                  <div style="display:flex;gap:8px;margin-top:1.1rem;">
                    <Button variant="outline" size="sm" style="${BTN_ICON}">
                      <template #leading><RiDownload2Line style="width:14px;height:14px;" /></template>
                      {{ t.downloadQR }}
                    </Button>
                  </div>

                  <div style="margin-top:1rem;font-family:ui-monospace,monospace;font-size:12px;color:var(--color-text-secondary);">
                    {{ t.invoice }}: <strong style="color:var(--color-text-heading);">INVI20260323172122718</strong>
                  </div>
                </div>

                <!-- VA list -->
                <div v-else-if="method === 'va'" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:20px;padding:1.25rem;">
                  <div style="margin-bottom:12px;">
                    <div style="font-size:15px;font-weight:700;color:var(--color-text-heading);">{{ t.bank }}</div>
                    <div style="font-size:12px;color:var(--color-text-secondary);">{{ t.bankD }}</div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:4px;">
                    <div v-for="bank in ['BCA', 'Mandiri', 'BNI', 'BRI']" :key="bank" style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:12px;cursor:pointer;font-size:14px;border:1px solid transparent;transition:background .15s;" @mouseover="$event.currentTarget.style.background='var(--color-bg-subtle)'" @mouseout="$event.currentTarget.style.background='transparent'">
                      <div style="display:flex;gap:12px;align-items:center;">
                        <div style="width:44px;height:30px;border-radius:6px;background:var(--color-bg-subtle);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--color-text-secondary);">{{ bank }}</div>
                        <div>
                          <div style="font-weight:500;">{{ bank }} Virtual Account</div>
                          <div style="font-family:ui-monospace,monospace;font-size:11px;color:var(--color-text-secondary);">88898{{ bank.length }}1234567</div>
                        </div>
                      </div>
                      <button type="button" @click="copyVA(bank)" :style="vaCopied === bank ? 'color:#10B981;border-color:#10B981;' : 'color:${RED};border-color:${RED};'" style="background:transparent;border:1px solid;padding:5px 11px;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer;">{{ vaCopied === bank ? t.copied : t.copy }}</button>
                    </div>
                  </div>
                </div>

                <!-- E-Wallet list -->
                <div v-else style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:20px;padding:1.25rem;">
                  <div style="margin-bottom:12px;">
                    <div style="font-size:15px;font-weight:700;color:var(--color-text-heading);">{{ t.ewallet }}</div>
                    <div style="font-size:12px;color:var(--color-text-secondary);">{{ t.ewalletD }}</div>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                    <button v-for="ew in [{n:'GoPay',c:'#00AED6',e:'💚'},{n:'OVO',c:'#4C2A86',e:'💜'},{n:'Dana',c:'#118EEA',e:'💙'},{n:'ShopeePay',c:'#EE4D2D',e:'🧡'}]" :key="ew.n" type="button" style="display:flex;gap:10px;align-items:center;padding:12px 14px;border-radius:12px;cursor:pointer;font-size:13px;font-weight:600;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);transition:all .15s;" @mouseover="$event.currentTarget.style.borderColor='${RED}';$event.currentTarget.style.background='rgba(208,0,62,0.02)'" @mouseout="$event.currentTarget.style.borderColor='var(--color-border)';$event.currentTarget.style.background='var(--color-surface)'">
                      <div :style="'background:' + ew.c + '20;color:' + ew.c + ';'" style="width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;">{{ ew.e }}</div>
                      <span>{{ ew.n }}</span>
                    </button>
                  </div>
                </div>

                <!-- Auto-auth status card -->
                <div
                  :style="
                    status === 'success' ? 'background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.3);' :
                    status === 'confirming' ? 'background:#FEF3C7;border:1px solid #F59E0B33;' :
                    'background:var(--color-bg-subtle);border:1px solid var(--color-border);'
                  "
                  style="border-radius:16px;padding:1rem 1.15rem;display:flex;align-items:center;gap:14px;transition:all .3s ease;">
                  <div v-if="status === 'waiting'" style="width:36px;height:36px;border-radius:50%;background:rgba(208,0,62,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <Spinner size="sm" />
                  </div>
                  <div v-else-if="status === 'confirming'" style="width:36px;height:36px;border-radius:50%;background:#F59E0B22;display:flex;align-items:center;justify-content:center;flex-shrink:0;animation:onb-pulse 1.2s infinite;">
                    <RiRefreshLine style="color:#92400E;width:18px;height:18px;animation:onb-pulse 1s infinite;" />
                  </div>
                  <div v-else style="width:36px;height:36px;border-radius:50%;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <RiCheckboxCircleFill style="color:#10B981;" :size="22" />
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div :style="status === 'success' ? 'color:#065F46;' : status === 'confirming' ? 'color:#92400E;' : 'color:var(--color-text-heading);'" style="font-size:14px;font-weight:700;line-height:1.3;margin-bottom:2px;">
                      {{ status === 'success' ? t.success : status === 'confirming' ? t.confirming : t.waiting }}
                    </div>
                    <div :style="status === 'success' ? 'color:#065F4699;' : status === 'confirming' ? 'color:#92400Ebb;' : 'color:var(--color-text-secondary);'" style="font-size:12px;line-height:1.35;">
                      {{ status === 'success' ? t.successD : status === 'confirming' ? t.confirmingD : t.waitingD }}
                    </div>
                  </div>
                </div>

                <!-- Manual controls -->
                <div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;">
                  <Button v-if="status === 'waiting'" variant="default" size="sm" style="${BTN}" @click="triggerNow()">
                    <template #leading><RiCheckLine style="width:14px;height:14px;" /></template>
                    {{ t.simulate }}
                  </Button>
                  <Button v-else-if="status === 'success'" variant="default" size="sm" style="${BTN}">{{ t.continue }}</Button>
                  <Button variant="outline" size="sm" style="${BTN_ICON}" @click="start()">
                    <template #leading><RiRefreshLine style="width:14px;height:14px;" /></template>
                    {{ t.again }}
                  </Button>
                </div>

              </div>

              <!-- RIGHT: sticky summary -->
              <div style="position:sticky;top:1rem;display:flex;flex-direction:column;gap:1rem;">
                <div style="background:var(--color-bg-subtle);border:1px solid var(--color-border);border-radius:16px;padding:1.15rem;">
                  <div style="font-size:12px;font-weight:700;color:var(--color-text-heading);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">{{ t.orderSum }}</div>
                  <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;">
                    <div style="width:40px;height:52px;border-radius:8px;background:linear-gradient(135deg,#FFE8D6 0%,#FFB5A7 55%,#F4978E 100%);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🏠</div>
                    <div style="flex:1;min-width:0;">
                      <div style="font-size:14px;font-weight:700;color:var(--color-text-heading);">{{ t.theme }}</div>
                      <div style="font-size:11px;color:var(--color-text-secondary);">{{ t.variant }} · {{ t.addons }}</div>
                    </div>
                  </div>
                  <div style="border-top:1px dashed var(--color-border);padding-top:10px;">
                    <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:2px;">{{ t.totalBayar }}</div>
                    <div style="font-size:22px;font-weight:700;color:var(--color-text-heading);line-height:1.1;">{{ fmtIDR(totalPrice) }}</div>
                  </div>
                </div>

                <div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:10px 12px;background:#FEF3C7;color:#92400E;border-radius:10px;font-family:ui-monospace,monospace;font-size:13px;font-weight:700;">
                  <RiTimeLine style="width:14px;height:14px;" />
                  {{ t.timer }} {{ mm }}:{{ ss }}
                </div>

                <div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:11px;color:var(--color-text-secondary);text-align:center;line-height:1.4rem;">
                  <RiShieldCheckLine style="width:14px;height:14px;flex-shrink:0;" /> {{ t.safeText }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `,
  }),
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 6 — Success
// ═══════════════════════════════════════════════════════════════════════════════
export const Success: Story = {
  name: 'Step 6 — Sukses',
  render: () => ({
    components: { Button, RiCheckboxCircleFill, RiCheckLine, RiShareForwardLine, RiWhatsappLine, RiMailLine, RiLinkM, RiEyeLine },
    setup() {
      const lang = ref<'ID' | 'EN'>('ID')
      const copied = ref(false)
      const buildProgress = ref(0)
      let p: ReturnType<typeof setInterval> | null = null
      onMounted(() => {
        p = setInterval(() => { buildProgress.value = Math.min(100, buildProgress.value + 1.2) }, 90)
      })
      onUnmounted(() => { if (p) clearInterval(p) })

      const t = computed(() => lang.value === 'ID' ? {
        tagline: 'Udah beres. Sekarang\\ntinggal share ke pasangan\\nuntuk review bareng.',
        headingBuild: 'Undanganmu lagi disiapin...',
        headingDone: 'Undanganmu siap dibagikan!',
        subBuild: 'Ini butuh beberapa menit — kita kirim WhatsApp kalau sudah siap.',
        subDone: 'Selamat! Undanganmu udah aktif. Coba preview dulu atau share ke pasangan untuk review bareng.',
        progress: 'Estimasi siap dalam',
        progressMin: 'menit',
        share: 'Share link preview',
        shareSub: 'Review dulu bareng pasangan sebelum blast ke tamu',
        link: 'abadikan.id/d/dani-rara',
        copy: 'Salin',
        copied: 'Tersalin!',
        toDash: 'Ke Dashboard',
        viewInvite: 'Lihat undangan',
        whatsapp: 'Bagikan via WhatsApp',
        email: 'Bagikan via Email',
      } : {
        tagline: 'All done. Share the preview\\nwith your partner for\\na quick review.',
        headingBuild: 'Your invitation is being prepared...',
        headingDone: 'Your invitation is ready!',
        subBuild: 'This takes a few minutes — we will notify you via WhatsApp.',
        subDone: "Congrats! Your invitation is live. Preview it or share with your partner to review together.",
        progress: 'Ready in about',
        progressMin: 'min',
        share: 'Share preview link',
        shareSub: 'Review with your partner before sending to guests',
        link: 'abadikan.id/d/dani-rara',
        copy: 'Copy',
        copied: 'Copied!',
        toDash: 'Go to Dashboard',
        viewInvite: 'View invitation',
        whatsapp: 'Share via WhatsApp',
        email: 'Share via Email',
      })

      function copyLink() {
        navigator.clipboard?.writeText('https://abadikan.id/d/dani-rara').catch(() => {})
        copied.value = true
        setTimeout(() => { copied.value = false }, 1800)
      }

      function goBack() {}
      return { lang, t, copied, copyLink, buildProgress, goBack }
    },
    template: `
      <div style="${PAGE}">
        <!-- Minimal header (no back, no stepper, no progress) -->
        <div style="${HEADER_OUTER}">
          <div style="${HEADER}">
            <div style="width:88px;"></div>
            <div style="${HEADER_LOGO}"><img src="${WORDMARK_URL}" height="21" alt="abadikan.id" /></div>
            <div style="width:88px;display:flex;justify-content:flex-end;align-items:center;">
              <div style="${LANG}">
                <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
                <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Content -->
        <div style="${CONTENT_AREA}padding-top:3rem;">
          <div style="${CONTENT_NARROW}max-width:520px;text-align:center;">

            <!-- Success icon -->
            <div style="width:96px;height:96px;margin:0 auto 1.5rem;border-radius:50%;background:rgba(16,185,129,0.08);display:flex;align-items:center;justify-content:center;animation:onb-in 600ms cubic-bezier(0.34,1.56,0.64,1);">
              <div style="width:72px;height:72px;border-radius:50%;background:rgba(16,185,129,0.16);display:flex;align-items:center;justify-content:center;">
                <RiCheckboxCircleFill style="color:#10B981;" :size="40" />
              </div>
            </div>

            <h1 style="${HEADING}font-size:26px;">{{ buildProgress >= 100 ? t.headingDone : t.headingBuild }}</h1>
            <p style="${SUBHEADING}max-width:420px;margin:0 auto 1.5rem;">{{ buildProgress >= 100 ? t.subDone : t.subBuild }}</p>

            <!-- Build progress (dim after done) -->
            <div v-if="buildProgress < 100" style="background:var(--color-bg-subtle);border-radius:14px;padding:1rem 1.25rem;margin-bottom:1.5rem;text-align:left;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <div style="font-size:12px;color:var(--color-text-secondary);">{{ t.progress }} <strong style="color:var(--color-text-heading);">{{ Math.max(1, Math.ceil((100 - buildProgress) / 20)) }} {{ t.progressMin }}</strong></div>
                <div style="font-size:12px;font-weight:700;color:${RED};">{{ Math.floor(buildProgress) }}%</div>
              </div>
              <div style="height:6px;background:var(--color-border);border-radius:999px;overflow:hidden;">
                <div :style="'width:' + buildProgress + '%;'" style="height:100%;background:linear-gradient(90deg,${RED},#ff5e85);border-radius:999px;transition:width .4s ease;position:relative;" class="onb-shine"></div>
              </div>
            </div>

            <!-- Share section -->
            <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:16px;padding:1.25rem;margin-bottom:1.5rem;text-align:left;">
              <div style="font-size:14px;font-weight:700;color:var(--color-text-heading);margin-bottom:4px;">💌 {{ t.share }}</div>
              <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:12px;line-height:1.4rem;">{{ t.shareSub }}</div>

              <div style="display:flex;gap:6px;align-items:stretch;margin-bottom:10px;">
                <div style="flex:1;min-width:0;background:var(--color-bg-subtle);border-radius:10px;padding:10px 12px;font-family:ui-monospace,monospace;font-size:12px;color:var(--color-text-heading);display:flex;align-items:center;gap:6px;overflow:hidden;">
                  <RiLinkM style="width:13px;height:13px;flex-shrink:0;color:var(--color-text-secondary);" />
                  <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ t.link }}</span>
                </div>
                <button type="button" @click="copyLink" :style="copied ? 'background:#10B981;color:white;' : 'background:${RED};color:white;'" style="border:none;padding:0 14px;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;white-space:nowrap;transition:all .15s;">
                  <RiCheckLine v-if="copied" style="width:13px;height:13px;" /> {{ copied ? t.copied : t.copy }}
                </button>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <button type="button" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);font-size:13px;font-weight:500;cursor:pointer;">
                  <RiWhatsappLine style="width:15px;height:15px;color:#25D366;" /> WhatsApp
                </button>
                <button type="button" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);font-size:13px;font-weight:500;cursor:pointer;">
                  <RiMailLine style="width:15px;height:15px;" /> Email
                </button>
              </div>
            </div>

            <!-- Actions -->
            <Button variant="default" full-width size="md" style="${BTN}margin-bottom:8px;">{{ t.toDash }}</Button>
            <Button variant="outline" full-width size="md" style="${BTN_ICON}">
              <template #leading><RiEyeLine style="width:15px;height:15px;" /></template>
              {{ t.viewInvite }}
            </Button>

          </div>
        </div>
      </div>
    `,
  }),
}

// ═══════════════════════════════════════════════════════════════════════════════
// FULL FLOW — Connected interactive story
// ═══════════════════════════════════════════════════════════════════════════════
export const FullFlow: Story = {
  name: '🔗 Full Flow (Connected)',
  render: () => ({
    components: {
      Input, Button, Stepper, Checkbox, DatePicker, SegmentedControl, Spinner,
      RiArrowLeftSLine, RiUser3Line, RiUserSmileLine, RiHeartFill, RiStarFill,
      RiEditLine, RiTimeLine, RiShieldCheckLine, RiEyeLine, RiDownload2Line, RiRefreshLine,
      RiCheckboxCircleFill, RiCheckLine, RiLinkM, RiWhatsappLine, RiMailLine,
    },
    setup() {
      const { onEnter, onLeave } = usePageTransition()
      type Page = 'welcome' | 'info' | 'gallery' | 'personalize' | 'review' | 'payment' | 'success'
      const page = ref<Page>('welcome')
      const lang = ref<'ID' | 'EN'>('ID')

      // user data
      const groom = ref('Dani'), bride = ref('Rara'), date = ref('2026-05-07')
      const groomErr = ref(''), brideErr = ref(''), dateErr = ref('')
      const filter = ref<'all' | ThemeStyle | 'popular' | 'sale' | 'new'>('all')
      const sort = ref<'popular' | 'newest' | 'price-low' | 'price-high'>('popular')
      const theme = ref<Theme>(THEMES[0])
      const variant = ref<string>(THEMES[0].variants[0])
      const addons = ref({
        music: { enabled: false, price: 49000 },
        gallery: { enabled: true, price: 0 },
        rsvpPro: { enabled: true, price: 79000 },
        qrGate: { enabled: false, price: 99000 },
      })
      const favs = ref<Set<string>>(new Set())
      const method = ref<'qris' | 'va' | 'ewallet'>('qris')
      const copied = ref(false)
      const buildProgress = ref(0)

      const addonsTotal = computed(() => Object.values(addons.value).reduce((s, a) => s + (a.enabled ? a.price : 0), 0))
      const totalPrice = computed(() => theme.value.priceDiscount + addonsTotal.value)

      const pageIdx = computed<number>(() => {
        const map: Record<Page, number> = { welcome: -1, info: 0, gallery: 1, personalize: 2, review: 3, payment: 4, success: -1 }
        return map[page.value]
      })
      const showStepper = computed(() => pageIdx.value >= 0)

      const steps = computed(() => lang.value === 'ID' ? STEPS_ID : STEPS_EN)
      const filtered = computed(() => {
        let arr = [...THEMES]
        if (filter.value === 'popular') arr = arr.filter(x => x.badge === 'popular' || x.usedBy > 500)
        else if (filter.value === 'sale') arr = arr.filter(x => x.badge === 'sale')
        else if (filter.value === 'new') arr = arr.filter(x => x.badge === 'new')
        else if (filter.value !== 'all') arr = arr.filter(x => x.style === filter.value)
        if (sort.value === 'popular') arr.sort((a, b) => b.usedBy - a.usedBy)
        else if (sort.value === 'newest') arr.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0))
        else if (sort.value === 'price-low') arr.sort((a, b) => a.priceDiscount - b.priceDiscount)
        else if (sort.value === 'price-high') arr.sort((a, b) => b.priceDiscount - a.priceDiscount)
        return arr
      })
      const filterChips: Array<'all' | ThemeStyle | 'popular' | 'sale' | 'new'> = ['all', 'popular', 'new', 'sale', 'cartoon', 'floral', 'minimalist', 'islamic']

      function toggleFav(id: string) {
        const s = new Set(favs.value); if (s.has(id)) s.delete(id); else s.add(id); favs.value = s
      }
      function chooseTheme(tm: Theme) { theme.value = tm; variant.value = tm.variants[0]; page.value = 'personalize' }

      function handleInfo() {
        groomErr.value = brideErr.value = dateErr.value = ''
        if (!groom.value) groomErr.value = lang.value === 'ID' ? 'Belum diisi' : 'Required'
        if (!bride.value) brideErr.value = lang.value === 'ID' ? 'Belum diisi' : 'Required'
        if (!date.value) dateErr.value = lang.value === 'ID' ? 'Belum diisi' : 'Required'
        if (groomErr.value || brideErr.value || dateErr.value) return
        page.value = 'gallery'
      }

      const taglines: Record<Page, { id: string; en: string }> = {
        welcome: { id: 'Kita bikin undangan digital,<br/>jadi kamu tinggal<br/>nikmatin momennya.', en: 'We handle the invitation<br/>so you can focus on<br/>the moment that matters.' },
        info: { id: 'Langkah pertama,<br/>ceritain soal kalian dulu.', en: 'First, tell us<br/>about you two.' },
        gallery: { id: 'Pilih yang paling<br/>kalian banget.', en: 'Pick what feels<br/>most like you.' },
        personalize: { id: 'Poles sampai pas.<br/>Liat hasilnya live<br/>di sebelah.', en: 'Polish until perfect.<br/>See it live on<br/>the left.' },
        review: { id: 'Cek sekali lagi,<br/>tinggal selangkah lagi.', en: 'One last check<br/>before the final step.' },
        payment: { id: 'Tinggal bayar,<br/>undanganmu siap<br/>beberapa menit lagi.', en: 'Just one last step —<br/>your invitation is<br/>minutes away.' },
        success: { id: 'Udah beres. Sekarang<br/>tinggal share ke pasangan<br/>untuk review bareng.', en: 'All done. Share the preview<br/>with your partner for<br/>a quick review.' },
      }
      const tagline = computed(() => taglines[page.value][lang.value === 'ID' ? 'id' : 'en'])

      const paymentLeft = ref(59 * 60 + 51)
      const paymentStatus = ref<'waiting' | 'confirming' | 'success'>('waiting')
      let payTimer: ReturnType<typeof setInterval> | null = null
      let buildTimer: ReturnType<typeof setInterval> | null = null
      let payWait: ReturnType<typeof setTimeout> | null = null
      let payConfirm: ReturnType<typeof setTimeout> | null = null
      let payAdvance: ReturnType<typeof setTimeout> | null = null

      function clearPaySim() {
        if (payWait) { clearTimeout(payWait); payWait = null }
        if (payConfirm) { clearTimeout(payConfirm); payConfirm = null }
        if (payAdvance) { clearTimeout(payAdvance); payAdvance = null }
      }
      function startPaySim() {
        clearPaySim()
        paymentStatus.value = 'waiting'
        payWait = setTimeout(() => {
          paymentStatus.value = 'confirming'
          payConfirm = setTimeout(() => {
            paymentStatus.value = 'success'
            payAdvance = setTimeout(() => { page.value = 'success' }, 1400)
          }, 2200)
        }, 9000)
      }
      function triggerPayNow() {
        clearPaySim()
        paymentStatus.value = 'confirming'
        payConfirm = setTimeout(() => {
          paymentStatus.value = 'success'
          payAdvance = setTimeout(() => { page.value = 'success' }, 1400)
        }, 1200)
      }

      watch(page, (p) => {
        if (p === 'payment') {
          paymentLeft.value = 59 * 60 + 51
          if (payTimer) clearInterval(payTimer)
          payTimer = setInterval(() => { if (paymentLeft.value > 0) paymentLeft.value-- }, 1000)
          startPaySim()
        } else {
          if (payTimer) { clearInterval(payTimer); payTimer = null }
          clearPaySim()
        }
        if (p === 'success') {
          buildProgress.value = 0
          if (buildTimer) clearInterval(buildTimer)
          buildTimer = setInterval(() => { buildProgress.value = Math.min(100, buildProgress.value + 1.5) }, 100)
        } else if (buildTimer) { clearInterval(buildTimer); buildTimer = null }
      })
      onUnmounted(() => { if (payTimer) clearInterval(payTimer); if (buildTimer) clearInterval(buildTimer); clearPaySim() })

      const paymentMethodOptions = computed(() => lang.value === 'ID' ? PAYMENT_METHODS_ID : PAYMENT_METHODS_EN)
      const paymentQR = buildQRBits()

      const mm = computed(() => String(Math.floor(paymentLeft.value / 60)).padStart(2, '0'))
      const ss = computed(() => String(paymentLeft.value % 60).padStart(2, '0'))

      function copyLink() { navigator.clipboard?.writeText('https://abadikan.id/d/dani-rara').catch(() => {}); copied.value = true; setTimeout(() => { copied.value = false }, 1800) }

      // shared i18n for common labels
      const t = computed(() => lang.value === 'ID' ? {
        back: 'Balik',
        next: 'Lanjut',
      } : {
        back: 'Back',
        next: 'Continue',
      })

      function goBack() {
        const order: Page[] = ['welcome', 'info', 'gallery', 'personalize', 'review', 'payment', 'success']
        const i = order.indexOf(page.value)
        if (i > 0) page.value = order[i - 1]
      }

      return {
        page, lang, tagline, t, steps, showStepper, pageIdx,
        groom, bride, date, groomErr, brideErr, dateErr, handleInfo,
        themes: THEMES, theme, variant, filter, sort, filtered, filterChips, favs, toggleFav, chooseTheme,
        addons, addonsTotal, totalPrice, fmtIDR, phoneFrame,
        method, paymentLeft, mm, ss, copied, copyLink, buildProgress, goBack,
        paymentStatus, paymentMethodOptions, paymentQR, startPaySim, triggerPayNow,
        onEnter, onLeave,
      }
    },
    template: `
      <div style="${PAGE}">

        <!-- Reactive sticky header -->
        <div style="${HEADER_OUTER}">
          <div style="${HEADER}">
            <div style="width:88px;">
              <Button v-if="page !== 'welcome' && page !== 'success'" type="button" variant="outline" size="sm" style="${BTN_ICON}" @click="goBack">
                <template #leading><RiArrowLeftSLine style="width:1em;height:1em;" /></template>{{ lang === 'ID' ? 'Balik' : 'Back' }}
              </Button>
              <span v-else style="width:88px;display:block;"></span>
            </div>
            <div style="${HEADER_LOGO}"><img src="${WORDMARK_URL}" height="21" alt="abadikan.id" /></div>
            <div style="width:88px;display:flex;justify-content:flex-end;align-items:center;gap:8px;">
              <span v-if="showStepper" style="font-size:11px;font-weight:600;color:var(--color-text-secondary);">{{ pageIdx + 1 }} / 5</span>
              <div style="${LANG}">
                <button type="button" @click="lang = 'ID'" :style="lang === 'ID' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">ID</button>
                <button type="button" @click="lang = 'EN'" :style="lang === 'EN' ? '${LANG_ACTIVE}' : '${LANG_IDLE}'" style="${LANG_BTN}">EN</button>
              </div>
            </div>
          </div>
          <!-- Progress bar — only shown when stepper is visible -->
          <div v-if="showStepper" style="height:3px;background:var(--color-border);">
            <div :style="'height:100%;width:' + [36,54,54,72,90][pageIdx] + '%;background:${RED};transition:width .5s ease;border-radius:0 2px 2px 0;'"></div>
          </div>
        </div>

        <!-- Stepper — only for steps 0-4 -->
        <div v-if="showStepper" style="${STEPPER_WRAP}">
          <Stepper :steps="steps" :activeStep="pageIdx" />
        </div>

        <!-- Page content with transition -->
        <div style="${CONTENT_AREA}">

          <Transition mode="out-in" :css="false" @enter="onEnter" @leave="onLeave">

            <!-- ─── WELCOME ─── -->
            <div v-if="page === 'welcome'" :style="'${CONTENT_NARROW}text-align:center;padding-top:3rem;'">
              <div style="display:inline-flex;align-items:center;gap:6px;background:${RED_SOFT};color:${RED};padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;margin-bottom:18px;">
                <span style="width:8px;height:8px;border-radius:50%;background:${RED};display:inline-block;animation:onb-pulse 1.6s infinite;"></span>
                {{ lang === 'ID' ? 'Akun berhasil dibuat' : 'Account created' }}
              </div>
              <h1 style="${HEADING}font-size:32px;">{{ lang === 'ID' ? 'Selamat, akunmu siap!' : 'Welcome aboard!' }}</h1>
              <p style="${SUBHEADING}max-width:400px;margin:0 auto 2rem;">{{ lang === 'ID' ? 'Tinggal beberapa langkah lagi, undanganmu siap dibagikan. Rata-rata selesai ± 3 menit.' : 'Just a few steps and your invitation is ready. Most couples finish in ± 3 minutes.' }}</p>
              <div style="display:flex;flex-direction:column;gap:12px;text-align:left;margin-bottom:2rem;">
                <div v-for="b in [
                  {icon:'🎨', t: lang === 'ID' ? 'Pilih tema yang kalian banget' : 'Pick a theme that feels like you', d: lang === 'ID' ? 'Lebih dari 20 tema dengan variasi budaya Indonesia' : '20+ themes with Indonesian cultural variants'},
                  {icon:'👀', t: lang === 'ID' ? 'Preview dulu, baru bayar' : 'Preview before you pay', d: lang === 'ID' ? 'Ga perlu khawatir, liat jadinya dulu' : 'See the final invitation first, no guesswork'},
                  {icon:'💬', t: lang === 'ID' ? 'Gratis revisi & bantuan admin' : 'Free revisions + admin support', d: lang === 'ID' ? 'Admin standby 1×24 jam kalau kamu bingung' : 'Admin responds within 24 hours'}
                ]" :key="b.t" style="display:flex;gap:14px;align-items:flex-start;padding:14px 16px;background:var(--color-bg-subtle);border-radius:14px;">
                  <div style="width:36px;height:36px;flex-shrink:0;border-radius:10px;background:${RED_SOFT};display:flex;align-items:center;justify-content:center;font-size:18px;">{{ b.icon }}</div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;color:var(--color-text-heading);font-size:14px;line-height:1.3;margin-bottom:2px;">{{ b.t }}</div>
                    <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.35;">{{ b.d }}</div>
                  </div>
                </div>
              </div>
              <Button variant="default" full-width size="lg" style="${BTN}" @click="page = 'info'">
                <span style="display:inline-flex;align-items:baseline;gap:6px;">{{ lang === 'ID' ? 'Mulai bikin undangan' : 'Start creating' }}<span style="font-size:12px;opacity:0.85;font-weight:500;">· ± 3 {{ lang === 'ID' ? 'menit' : 'min' }}</span></span>
              </Button>
              <button type="button" style="background:transparent;border:none;color:var(--color-text-secondary);font-size:14px;cursor:pointer;padding:10px;margin-top:8px;">{{ lang === 'ID' ? 'Lihat contoh dulu' : 'See examples first' }} →</button>
            </div>

            <!-- ─── INFO ─── -->
            <div v-else-if="page === 'info'" :style="'${CONTENT_NARROW}'">
              <div style="text-align:center;margin-bottom:1.5rem;">
                <h1 style="${HEADING}">{{ lang === 'ID' ? 'Ceritain soal kalian' : 'Tell us about you two' }}</h1>
                <p style="${SUBHEADING}">{{ lang === 'ID' ? 'Info dasar ini dipakai untuk preview undangan. Tenang, bisa diubah lagi nanti.' : 'We use this for your invitation preview. You can edit it anytime.' }}</p>
              </div>
              <form novalidate style="display:flex;flex-direction:column;gap:0.9rem;" @submit.prevent="handleInfo">
                <Input v-model="groom" :label="lang === 'ID' ? 'Nama pengantin pria' : 'Groom\\'s name'" required :placeholder="lang === 'ID' ? 'Mis. Dani' : 'e.g. Dani'" :error="groomErr" @update:modelValue="groomErr = ''">
                  <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
                </Input>
                <Input v-model="bride" :label="lang === 'ID' ? 'Nama pengantin wanita' : 'Bride\\'s name'" required :placeholder="lang === 'ID' ? 'Mis. Rara' : 'e.g. Rara'" :error="brideErr" @update:modelValue="brideErr = ''">
                  <template #leading><RiUserSmileLine style="width:16px;height:16px;" /></template>
                </Input>
                <DatePicker v-model="date" :label="lang === 'ID' ? 'Tanggal pernikahan' : 'Wedding date'" :placeholder="lang === 'ID' ? 'Pilih tanggal' : 'Pick a date'" :error="dateErr" @update:modelValue="dateErr = ''" />
                <p style="font-size:12px;color:var(--color-text-secondary);margin:0 0 0.25rem;line-height:1rem;">💡 {{ lang === 'ID' ? 'Cukup nama panggilan dulu juga oke, bisa lengkapin nanti' : 'Nicknames are fine — complete them later' }}</p>
                <Button type="submit" variant="default" full-width size="md" style="${BTN}margin-top:0.5rem;">{{ lang === 'ID' ? 'Lanjut pilih tema' : 'Continue to themes' }}</Button>
              </form>
            </div>

            <!-- ─── GALLERY ─── -->
            <div v-else-if="page === 'gallery'" :style="'${CONTENT_WIDE}'">
              <div style="text-align:center;margin-bottom:1.5rem;">
                <h1 style="${HEADING}">{{ lang === 'ID' ? 'Pilih desain undanganmu' : 'Choose your invitation design' }}</h1>
                <p style="${SUBHEADING}">{{ lang === 'ID' ? 'Setiap pasangan punya cerita unik. Filter berdasarkan gaya atau lihat yang paling populer.' : 'Every couple has a unique story. Filter by style or see what is trending.' }}</p>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;">
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  <button v-for="f in filterChips" :key="f" type="button" @click="filter = f"
                    :style="filter === f ? 'background:${RED};color:white;border:1px solid ${RED};' : 'background:var(--color-surface);color:var(--color-text);border:1px solid var(--color-border);'"
                    style="padding:7px 14px;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s ease;">
                    {{ ({ all: lang === 'ID' ? 'Semua' : 'All', popular: lang === 'ID' ? 'Populer' : 'Popular', sale: lang === 'ID' ? 'Diskon' : 'On sale', new: lang === 'ID' ? 'Baru' : 'New', cartoon: lang === 'ID' ? 'Kartun' : 'Cartoon', floral: 'Floral', minimalist: lang === 'ID' ? 'Minimalis' : 'Minimalist', islamic: lang === 'ID' ? 'Islami' : 'Islamic' })[f] }}
                  </button>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <label style="font-size:13px;color:var(--color-text-secondary);">{{ lang === 'ID' ? 'Urutkan' : 'Sort' }}:</label>
                  <select v-model="sort" style="padding:7px 12px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);font-size:13px;cursor:pointer;">
                    <option value="popular">{{ lang === 'ID' ? 'Populer' : 'Popular' }}</option>
                    <option value="newest">{{ lang === 'ID' ? 'Terbaru' : 'Newest' }}</option>
                    <option value="price-low">{{ lang === 'ID' ? 'Harga ↑' : 'Price ↑' }}</option>
                    <option value="price-high">{{ lang === 'ID' ? 'Harga ↓' : 'Price ↓' }}</option>
                  </select>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:1.25rem;">
                <div v-for="tm in filtered" :key="tm.id" class="onb-theme-card" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;position:relative;">
                  <div :style="'position:relative;aspect-ratio:3/4;background:' + tm.gradient + ';display:flex;align-items:flex-end;justify-content:center;padding:18px;overflow:hidden;'">
                    <div style="position:absolute;inset:0;background:radial-gradient(circle at 25% 20%,rgba(255,255,255,0.5) 0%,transparent 45%),radial-gradient(circle at 75% 30%,rgba(255,255,255,0.3) 0%,transparent 40%);"></div>
                    <div style="position:absolute;top:22px;left:0;right:0;text-align:center;font-size:52px;line-height:1;">{{ tm.emoji }}</div>
                    <div style="position:relative;z-index:2;text-align:center;color:white;text-shadow:0 2px 6px rgba(0,0,0,0.3);">
                      <div style="font-size:9px;letter-spacing:3px;font-weight:600;opacity:0.9;text-transform:uppercase;margin-bottom:3px;">The Wedding of</div>
                      <div style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;line-height:1.1;">{{ groom }} &amp; {{ bride }}</div>
                      <div style="width:18px;height:1px;background:white;opacity:0.7;margin:5px auto;"></div>
                      <div style="font-size:10px;opacity:0.9;letter-spacing:1px;">{{ new Date(date).toLocaleDateString(lang === 'ID' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }}</div>
                    </div>
                    <div v-if="tm.badge" style="position:absolute;top:12px;left:12px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);color:white;padding:5px 10px;border-radius:999px;font-size:11px;font-weight:600;">
                      {{ tm.badge === 'popular' ? '🔥 Populer' : tm.badge === 'new' ? '✨ Baru' : '🏷️ Diskon' }}
                    </div>
                    <button type="button" @click="toggleFav(tm.id)" :aria-pressed="favs.has(tm.id)" style="position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.95);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                      <RiHeartFill :style="favs.has(tm.id) ? 'color:${RED}' : 'color:#d0d0d0'" style="width:16px;height:16px;" />
                    </button>
                    <div v-if="tm.interactive" style="position:absolute;bottom:12px;right:12px;background:rgba(255,255,255,0.95);color:${RED};padding:4px 9px;border-radius:999px;font-size:10px;font-weight:600;">✨ Tema Interaktif</div>
                  </div>
                  <div style="padding:14px 16px 16px;display:flex;flex-direction:column;gap:8px;flex:1;">
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
                      <div style="font-size:17px;font-weight:700;color:var(--color-text-heading);line-height:1.2;">{{ tm.name }}</div>
                      <div style="display:flex;align-items:center;gap:3px;font-size:12px;color:var(--color-text-secondary);white-space:nowrap;"><RiStarFill style="width:12px;height:12px;color:#F59E0B;" /> {{ tm.rating.toFixed(1) }}</div>
                    </div>
                    <div style="font-size:12px;color:var(--color-text-secondary);"><span style="display:inline-flex;">👥</span> {{ tm.usedBy }}+ {{ lang === 'ID' ? 'pasangan dipakai' : 'chose this' }}</div>
                    <div style="display:flex;align-items:baseline;gap:8px;margin-top:2px;">
                      <span style="font-size:17px;font-weight:700;color:${RED};">{{ fmtIDR(tm.priceDiscount) }}</span>
                      <span v-if="tm.priceOriginal > tm.priceDiscount" style="font-size:12px;color:var(--color-text-secondary);text-decoration:line-through;">{{ fmtIDR(tm.priceOriginal) }}</span>
                    </div>
                    <Button variant="default" size="sm" full-width style="${BTN}margin-top:6px;" @click="chooseTheme(tm)">{{ lang === 'ID' ? 'Pilih tema' : 'Choose theme' }}</Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ─── PERSONALIZE ─── -->
            <div v-else-if="page === 'personalize'" :style="'${CONTENT_WIDE}'">
              <div style="display:grid;grid-template-columns:minmax(260px,0.9fr) 1.3fr;gap:2.5rem;align-items:start;">
                <div style="position:sticky;top:1rem;display:flex;flex-direction:column;align-items:center;gap:0.9rem;">
                  <div style="display:flex;align-items:center;gap:6px;color:var(--color-text-secondary);font-size:12px;"><RiEyeLine style="width:14px;height:14px;" /> {{ lang === 'ID' ? 'Preview langsung' : 'Live preview' }}</div>
                  <div v-html="phoneFrame(theme, groom, bride, date)"></div>
                  <div style="font-size:11px;color:var(--color-text-secondary);text-align:center;">{{ lang === 'ID' ? 'Update otomatis sesuai input kamu' : 'Updates as you edit' }}</div>
                </div>
                <div style="display:flex;flex-direction:column;gap:1.75rem;">
                  <div>
                    <h1 style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.3px;margin:0 0 6px;">{{ lang === 'ID' ? 'Atur undanganmu' : 'Customize your invitation' }}</h1>
                    <p style="font-size:14px;color:var(--color-text-secondary);margin:0;line-height:1.4rem;">{{ lang === 'ID' ? 'Pilih variasi tema, tambahkan fitur kalau perlu.' : 'Pick a variant, add features if needed.' }}</p>
                  </div>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                    <span style="font-size:13px;color:var(--color-text-secondary);margin-right:4px;">{{ lang === 'ID' ? 'Tema' : 'Theme' }}:</span>
                    <button v-for="tm in themes" :key="tm.id" type="button" @click="theme = tm; variant = tm.variants[0]"
                      :style="theme.id === tm.id ? 'background:' + tm.gradient + ';color:white;border-color:transparent;box-shadow:0 2px 8px rgba(0,0,0,0.12);font-weight:700;' : 'background:var(--color-surface);color:var(--color-text);border:1px solid var(--color-border);'"
                      style="padding:6px 12px;border-radius:999px;border:1px solid;font-size:12px;cursor:pointer;transition:all .15s;">{{ tm.emoji }} {{ tm.name }}</button>
                  </div>
                  <div>
                    <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);margin-bottom:10px;">{{ lang === 'ID' ? 'Variasi tema' : 'Theme variant' }}</div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                      <button v-for="v in theme.variants" :key="v" type="button" @click="variant = v"
                        :style="variant === v ? 'background:' + theme.accent + ';color:white;border-color:' + theme.accent + ';' : 'background:var(--color-surface);color:var(--color-text);border:1px solid var(--color-border);'"
                        style="padding:6px 14px;border-radius:999px;border:1px solid;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;">{{ v }}</button>
                    </div>
                  </div>
                  <div>
                    <div style="margin-bottom:10px;">
                      <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);margin-bottom:2px;">{{ lang === 'ID' ? 'Fitur tambahan' : 'Optional add-ons' }}</div>
                      <div style="font-size:12px;color:var(--color-text-secondary);">{{ lang === 'ID' ? 'Upgrade pengalaman tamu (opsional)' : 'Upgrade your guests experience' }}</div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:8px;">
                      <div v-for="(cfg, key) in addons" :key="key" :style="cfg.enabled ? 'border-color:' + theme.accent + ';background:rgba(208,0,62,0.03);' : 'border-color:var(--color-border);'" style="display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:12px;border:1px solid;transition:all .15s;">
                        <Checkbox :modelValue="cfg.enabled" :disabled="key === 'gallery'" @update:modelValue="cfg.enabled = $event === true" />
                        <div style="flex:1;min-width:0;">
                          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px;">
                            <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);">
                              <template v-if="key === 'music'">🎵 {{ lang === 'ID' ? 'Musik latar' : 'Background music' }}</template>
                              <template v-else-if="key === 'gallery'">🖼️ {{ lang === 'ID' ? 'Galeri foto' : 'Photo gallery' }}</template>
                              <template v-else-if="key === 'rsvpPro'">📊 RSVP Pro</template>
                              <template v-else>📱 QR Gate</template>
                            </div>
                            <div v-if="key === 'gallery'" style="font-size:11px;color:var(--color-text-secondary);white-space:nowrap;background:var(--color-bg-subtle);padding:2px 8px;border-radius:999px;font-weight:500;">✓ {{ lang === 'ID' ? 'Termasuk' : 'Included' }}</div>
                            <div v-else style="font-size:13px;font-weight:700;color:${RED};white-space:nowrap;">+{{ fmtIDR(cfg.price) }}</div>
                          </div>
                          <div style="font-size:12px;color:var(--color-text-secondary);line-height:1.35;">
                            <template v-if="key === 'music'">{{ lang === 'ID' ? 'Tambahin lagu favorit kalian sebagai backsound' : 'Add your favorite song as background' }}</template>
                            <template v-else-if="key === 'gallery'">{{ lang === 'ID' ? 'Upload foto prewedding, sudah termasuk' : 'Upload pre-wedding photos, included' }}</template>
                            <template v-else-if="key === 'rsvpPro'">{{ lang === 'ID' ? 'Notifikasi real-time + segmentasi tamu' : 'Real-time notifications + guest segmentation' }}</template>
                            <template v-else>{{ lang === 'ID' ? 'Check-in tamu pakai QR code di venue' : 'Check-in guests via QR at venue' }}</template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="position:sticky;bottom:1rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:16px;padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 6px 20px rgba(0,0,0,0.08);">
                    <div>
                      <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:2px;">{{ lang === 'ID' ? 'Total harga' : 'Estimated total' }}</div>
                      <div style="display:flex;align-items:baseline;gap:8px;">
                        <span style="font-size:20px;font-weight:700;color:var(--color-text-heading);">{{ fmtIDR(totalPrice) }}</span>
                        <span v-if="theme.priceOriginal > theme.priceDiscount" style="font-size:12px;color:var(--color-text-secondary);text-decoration:line-through;">{{ fmtIDR(theme.priceOriginal + addonsTotal) }}</span>
                      </div>
                    </div>
                    <Button variant="default" size="md" style="${BTN}flex-shrink:0;" @click="page = 'review'">
                      {{ lang === 'ID' ? 'Lanjut review' : 'Continue to review' }}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ─── REVIEW ─── -->
            <div v-else-if="page === 'review'" :style="'${CONTENT_WIDE}max-width:860px;'">
              <div style="text-align:center;margin-bottom:1.5rem;">
                <h1 style="${HEADING}">{{ lang === 'ID' ? 'Hampir jadi, cek dulu ya' : 'Almost there — review' }}</h1>
                <p style="${SUBHEADING}">{{ lang === 'ID' ? 'Pastikan semuanya udah pas. Masih bisa ubah sebelum bayar.' : 'Make sure everything is right. You can still edit before paying.' }}</p>
              </div>
              <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:1.5rem;align-items:start;">
                <div style="display:flex;flex-direction:column;gap:1rem;">
                  <div style="border:1px solid var(--color-border);border-radius:16px;padding:1rem;display:flex;gap:1rem;align-items:center;">
                    <div :style="'width:80px;height:100px;flex-shrink:0;border-radius:10px;background:' + theme.gradient + ';display:flex;align-items:center;justify-content:center;font-size:34px;'">{{ theme.emoji }}</div>
                    <div style="flex:1;min-width:0;">
                      <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:3px;">{{ lang === 'ID' ? 'Tema yang dipilih' : 'Selected theme' }}</div>
                      <div style="font-size:18px;font-weight:700;color:var(--color-text-heading);margin-bottom:4px;">{{ theme.name }}</div>
                      <div style="font-size:12px;color:var(--color-text-secondary);">{{ lang === 'ID' ? 'Variasi' : 'Variant' }}: <strong style="color:var(--color-text-heading);">{{ variant }}</strong></div>
                    </div>
                    <button type="button" @click="page = 'personalize'" style="background:transparent;border:1px solid var(--color-border);border-radius:999px;padding:6px 14px;color:var(--color-text);font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;"><RiEditLine style="width:12px;height:12px;" /> {{ lang === 'ID' ? 'Ubah' : 'Edit' }}</button>
                  </div>
                  <div style="border:1px solid var(--color-border);border-radius:16px;padding:1rem 1.1rem;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                      <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ lang === 'ID' ? 'Info pernikahan' : 'Wedding info' }}</div>
                      <button type="button" @click="page = 'info'" style="background:transparent;border:none;color:${RED};font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;"><RiEditLine style="width:12px;height:12px;" />{{ lang === 'ID' ? 'Ubah' : 'Edit' }}</button>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 16px;font-size:13px;">
                      <div><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ lang === 'ID' ? 'Pria' : 'Groom' }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ groom }}</div></div>
                      <div><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ lang === 'ID' ? 'Wanita' : 'Bride' }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ bride }}</div></div>
                      <div><div style="color:var(--color-text-secondary);font-size:11px;margin-bottom:2px;">{{ lang === 'ID' ? 'Tanggal' : 'Date' }}</div><div style="font-weight:600;color:var(--color-text-heading);">{{ new Date(date).toLocaleDateString(lang === 'ID' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }}</div></div>
                    </div>
                  </div>
                  <div style="border:1px solid var(--color-border);border-radius:16px;padding:1rem 1.1rem;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                      <div style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ lang === 'ID' ? 'Fitur tambahan' : 'Add-ons' }}</div>
                      <button type="button" @click="page = 'personalize'" style="background:transparent;border:none;color:${RED};font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;"><RiEditLine style="width:12px;height:12px;" />{{ lang === 'ID' ? 'Ubah' : 'Edit' }}</button>
                    </div>
                    <div v-if="addonsTotal === 0" style="font-size:13px;color:var(--color-text-secondary);">{{ lang === 'ID' ? 'Belum ada fitur tambahan' : 'No add-ons selected' }}</div>
                    <div v-else style="display:flex;flex-direction:column;gap:8px;">
                      <div v-for="(cfg, key) in addons" :key="key" v-show="cfg.enabled && key !== 'gallery'" style="display:flex;justify-content:space-between;font-size:13px;">
                        <span style="color:var(--color-text);">✓
                          <template v-if="key === 'music'">{{ lang === 'ID' ? 'Musik latar' : 'Background music' }}</template>
                          <template v-else-if="key === 'rsvpPro'">RSVP Pro</template>
                          <template v-else>QR Gate</template>
                        </span>
                        <span style="font-weight:600;color:var(--color-text-heading);">{{ fmtIDR(cfg.price) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="position:sticky;top:1rem;background:var(--color-bg-subtle);border:1px solid var(--color-border);border-radius:16px;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;">
                  <div style="font-size:14px;font-weight:700;color:var(--color-text-heading);">{{ lang === 'ID' ? 'Rincian biaya' : 'Price breakdown' }}</div>
                  <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
                    <div style="display:flex;justify-content:space-between;"><span style="color:var(--color-text-secondary);">{{ lang === 'ID' ? 'Tema' : 'Theme' }} {{ theme.name }}</span><span style="color:var(--color-text);">{{ fmtIDR(theme.priceOriginal) }}</span></div>
                    <div v-if="theme.priceOriginal > theme.priceDiscount" style="display:flex;justify-content:space-between;color:#059669;"><span>− {{ lang === 'ID' ? 'Diskon' : 'Discount' }}</span><span>− {{ fmtIDR(theme.priceOriginal - theme.priceDiscount) }}</span></div>
                    <div style="display:flex;justify-content:space-between;"><span style="color:var(--color-text-secondary);">{{ lang === 'ID' ? 'Fitur tambahan' : 'Add-ons' }}</span><span style="color:var(--color-text);">{{ fmtIDR(addonsTotal) }}</span></div>
                  </div>
                  <div style="border-top:1px dashed var(--color-border);padding-top:12px;display:flex;flex-direction:column;gap:4px;">
                    <div style="display:flex;justify-content:space-between;align-items:baseline;">
                      <span style="font-size:14px;font-weight:600;color:var(--color-text-heading);">{{ lang === 'ID' ? 'Total bayar' : 'Total' }}</span>
                      <span style="font-size:22px;font-weight:700;color:${RED};">{{ fmtIDR(totalPrice) }}</span>
                    </div>
                    <div v-if="theme.priceOriginal > theme.priceDiscount" style="text-align:right;font-size:11px;color:#059669;font-weight:600;">{{ lang === 'ID' ? 'Kamu hemat' : 'You save' }} {{ fmtIDR(theme.priceOriginal - theme.priceDiscount) }}</div>
                  </div>
                  <Button variant="default" full-width size="md" style="${BTN}" @click="page = 'payment'">{{ lang === 'ID' ? 'Lanjut ke pembayaran' : 'Continue to payment' }}</Button>
                  <div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:11px;color:var(--color-text-secondary);"><RiShieldCheckLine style="width:14px;height:14px;" /> {{ lang === 'ID' ? 'Pembayaran aman via QRIS, VA, dll' : 'Secure payment via QRIS, VA, etc' }}</div>
                </div>
              </div>
            </div>

            <!-- ─── PAYMENT ─── -->
            <div v-else-if="page === 'payment'" :style="'${CONTENT_NARROW}max-width:520px;'">
              <div style="text-align:center;margin-bottom:1.5rem;">
                <h1 style="${HEADING}">{{ lang === 'ID' ? 'Selesaikan pembayaran' : 'Complete your payment' }}</h1>
                <p style="${SUBHEADING}">{{ lang === 'ID' ? 'Pilih metode favorit kamu.' : 'Pick your favorite method.' }}</p>
              </div>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;background:var(--color-bg-subtle);padding:4px;border-radius:14px;margin-bottom:1.25rem;">
                <button v-for="m in ['qris','va','ewallet']" :key="m" type="button" @click="method = m"
                  :style="method === m ? 'background:var(--color-surface);color:var(--color-text-heading);font-weight:600;box-shadow:0 1px 2px rgba(0,0,0,0.06);' : 'background:transparent;color:var(--color-text-secondary);'"
                  style="padding:9px 12px;border:none;border-radius:10px;font-size:13px;cursor:pointer;transition:all .15s;">{{ m === 'qris' ? 'QRIS' : m === 'va' ? (lang === 'ID' ? 'Virtual Account' : 'Virtual Account') : 'E-Wallet' }}</button>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;background:var(--color-bg-subtle);border-radius:12px;margin-bottom:1.25rem;">
                <div>
                  <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:2px;">{{ lang === 'ID' ? 'Total yang dibayar' : 'Amount to pay' }}</div>
                  <div style="font-size:18px;font-weight:700;color:var(--color-text-heading);">{{ fmtIDR(totalPrice) }}</div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;background:#FEF3C7;color:#92400E;padding:8px 12px;border-radius:10px;font-family:ui-monospace,monospace;font-size:14px;font-weight:700;"><RiTimeLine style="width:14px;height:14px;" /> {{ lang === 'ID' ? 'Bayar dalam' : 'Pay within' }} {{ mm }}:{{ ss }}</div>
              </div>
              <div v-if="method === 'qris'" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:16px;padding:1.5rem;display:flex;flex-direction:column;align-items:center;">
                <div style="text-align:center;margin-bottom:1rem;">
                  <div style="font-size:16px;font-weight:700;color:var(--color-text-heading);margin-bottom:4px;">{{ lang === 'ID' ? 'Scan QRIS' : 'Scan QRIS' }}</div>
                  <div style="font-size:12px;color:var(--color-text-secondary);max-width:320px;">{{ lang === 'ID' ? 'Pakai GoPay, OVO, Dana, ShopeePay, atau m-banking apa aja' : 'Use GoPay, OVO, Dana, or any m-banking app' }}</div>
                </div>
                <div style="position:relative;padding:12px;background:white;border:2px dashed #d0d0d0;border-radius:16px;">
                  <div style="width:200px;height:200px;background:
                    conic-gradient(from 0deg, #000 0 25%, transparent 25% 50%, #000 50% 75%, transparent 75%),
                    repeating-linear-gradient(0deg, #000 0, #000 8px, transparent 8px, transparent 16px),
                    repeating-linear-gradient(90deg, #000 0, #000 8px, transparent 8px, transparent 16px);
                    background-blend-mode:difference;
                  "></div>
                  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;background:white;border-radius:8px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                    <div style="width:32px;height:32px;background:${RED};border-radius:6px;display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:800;letter-spacing:-0.5px;">ab</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" style="${BTN_ICON}margin-top:1rem;" @click="page = 'success'">
                  <template #leading><RiCheckLine style="width:14px;height:14px;" /></template>
                  {{ lang === 'ID' ? 'Simulasi bayar (demo)' : 'Simulate payment (demo)' }}
                </Button>
                <div style="margin-top:1rem;font-family:ui-monospace,monospace;font-size:12px;color:var(--color-text-secondary);">Invoice: <strong style="color:var(--color-text-heading);">INVI20260323172122718</strong></div>
                <div style="margin-top:6px;display:flex;align-items:center;gap:5px;font-size:11px;color:var(--color-text-secondary);"><RiRefreshLine style="width:12px;height:12px;animation:onb-pulse 1.6s infinite;" /> {{ lang === 'ID' ? 'Halaman refresh otomatis setiap 5 detik' : 'Page refreshes every 5 seconds' }}</div>
              </div>
              <div v-else-if="method === 'va'" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:16px;padding:1.25rem;">
                <div v-for="bank in ['BCA', 'Mandiri', 'BNI', 'BRI']" :key="bank" @click="page = 'success'" style="display:flex;justify-content:space-between;align-items:center;padding:14px 12px;border-radius:10px;cursor:pointer;font-size:14px;" @mouseover="$event.currentTarget.style.background='var(--color-bg-subtle)'" @mouseout="$event.currentTarget.style.background='transparent'">
                  <div style="display:flex;gap:12px;align-items:center;"><div style="width:40px;height:28px;border-radius:6px;background:var(--color-bg-subtle);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--color-text-secondary);">{{ bank }}</div><div>{{ bank }} Virtual Account</div></div>
                  <span style="color:var(--color-text-secondary);">→</span>
                </div>
              </div>
              <div v-else style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:16px;padding:1.25rem;">
                <div v-for="ew in ['GoPay', 'OVO', 'Dana', 'ShopeePay']" :key="ew" @click="page = 'success'" style="display:flex;justify-content:space-between;align-items:center;padding:14px 12px;border-radius:10px;cursor:pointer;font-size:14px;" @mouseover="$event.currentTarget.style.background='var(--color-bg-subtle)'" @mouseout="$event.currentTarget.style.background='transparent'">
                  <div style="display:flex;gap:12px;align-items:center;"><div style="width:36px;height:36px;border-radius:8px;background:var(--color-bg-subtle);display:flex;align-items:center;justify-content:center;font-size:16px;">💳</div><div>{{ ew }}</div></div>
                  <span style="color:var(--color-text-secondary);">→</span>
                </div>
              </div>
              <div style="margin-top:1.25rem;display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;color:var(--color-text-secondary);"><RiShieldCheckLine style="width:14px;height:14px;" /> {{ lang === 'ID' ? 'Dilindungi enkripsi tingkat bank' : 'Protected by bank-grade encryption' }}</div>
            </div>

            <!-- ─── SUCCESS ─── -->
            <div v-else-if="page === 'success'" :style="'${CONTENT_NARROW}max-width:520px;text-align:center;padding-top:1rem;'">
              <div style="width:96px;height:96px;margin:0 auto 1.5rem;border-radius:50%;background:rgba(16,185,129,0.08);display:flex;align-items:center;justify-content:center;">
                <div style="width:72px;height:72px;border-radius:50%;background:rgba(16,185,129,0.16);display:flex;align-items:center;justify-content:center;">
                  <RiCheckboxCircleFill style="color:#10B981;" :size="40" />
                </div>
              </div>
              <h1 style="${HEADING}font-size:26px;">{{ buildProgress >= 100 ? (lang === 'ID' ? 'Undanganmu siap dibagikan!' : 'Your invitation is ready!') : (lang === 'ID' ? 'Undanganmu lagi disiapin...' : 'Preparing your invitation...') }}</h1>
              <p style="${SUBHEADING}max-width:420px;margin:0 auto 1.5rem;">{{ buildProgress >= 100 ? (lang === 'ID' ? 'Selamat! Undanganmu udah aktif. Share ke pasangan untuk review bareng.' : 'Congrats! Your invitation is live. Share it with your partner.') : (lang === 'ID' ? 'Butuh beberapa menit. Kita kirim WhatsApp kalau sudah siap.' : 'Takes a few minutes. We will notify you via WhatsApp.') }}</p>
              <div v-if="buildProgress < 100" style="background:var(--color-bg-subtle);border-radius:14px;padding:1rem 1.25rem;margin-bottom:1.5rem;text-align:left;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                  <div style="font-size:12px;color:var(--color-text-secondary);">{{ lang === 'ID' ? 'Estimasi siap dalam' : 'Ready in about' }} <strong style="color:var(--color-text-heading);">{{ Math.max(1, Math.ceil((100 - buildProgress) / 20)) }} {{ lang === 'ID' ? 'menit' : 'min' }}</strong></div>
                  <div style="font-size:12px;font-weight:700;color:${RED};">{{ Math.floor(buildProgress) }}%</div>
                </div>
                <div style="height:6px;background:var(--color-border);border-radius:999px;overflow:hidden;">
                  <div :style="'width:' + buildProgress + '%;'" style="height:100%;background:linear-gradient(90deg,${RED},#ff5e85);border-radius:999px;transition:width .4s ease;position:relative;" class="onb-shine"></div>
                </div>
              </div>
              <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:16px;padding:1.25rem;margin-bottom:1.5rem;text-align:left;">
                <div style="font-size:14px;font-weight:700;color:var(--color-text-heading);margin-bottom:4px;">💌 {{ lang === 'ID' ? 'Share link preview' : 'Share preview link' }}</div>
                <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:12px;line-height:1.4rem;">{{ lang === 'ID' ? 'Review dulu bareng pasangan sebelum blast ke tamu' : 'Review with your partner before sending to guests' }}</div>
                <div style="display:flex;gap:6px;align-items:stretch;margin-bottom:10px;">
                  <div style="flex:1;min-width:0;background:var(--color-bg-subtle);border-radius:10px;padding:10px 12px;font-family:ui-monospace,monospace;font-size:12px;color:var(--color-text-heading);display:flex;align-items:center;gap:6px;overflow:hidden;">
                    <RiLinkM style="width:13px;height:13px;flex-shrink:0;color:var(--color-text-secondary);" />
                    <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">abadikan.id/d/dani-rara</span>
                  </div>
                  <button type="button" @click="copyLink" :style="copied ? 'background:#10B981;color:white;' : 'background:${RED};color:white;'" style="border:none;padding:0 14px;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;white-space:nowrap;transition:all .15s;">
                    <RiCheckLine v-if="copied" style="width:13px;height:13px;" /> {{ copied ? (lang === 'ID' ? 'Tersalin!' : 'Copied!') : (lang === 'ID' ? 'Salin' : 'Copy') }}
                  </button>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                  <button type="button" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);font-size:13px;font-weight:500;cursor:pointer;"><RiWhatsappLine style="width:15px;height:15px;color:#25D366;" /> WhatsApp</button>
                  <button type="button" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text);font-size:13px;font-weight:500;cursor:pointer;"><RiMailLine style="width:15px;height:15px;" /> Email</button>
                </div>
              </div>
              <Button variant="default" full-width size="md" style="${BTN}margin-bottom:8px;" @click="page = 'welcome'">{{ lang === 'ID' ? 'Ke Dashboard' : 'Go to Dashboard' }}</Button>
              <Button variant="outline" full-width size="md" style="${BTN_ICON}">
                <template #leading><RiEyeLine style="width:15px;height:15px;" /></template>
                {{ lang === 'ID' ? 'Lihat undangan' : 'View invitation' }}
              </Button>
            </div>

          </Transition>

        </div>
      </div>
    `,
  }),
}
