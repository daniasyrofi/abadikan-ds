<script setup lang="ts">
/**
 * KODA — "Meet the KODAs"
 * Landing page demo inspired by nvg8.io's visual style:
 * - Orange hero, pill navbar, massive bold type
 * - GSAP ScrollTrigger: parallax, pin, horizontal scroll, text reveal
 */
import { ref, onMounted, onUnmounted } from 'vue'

let gsapCtx: any = null

const heroRef    = ref<HTMLElement | null>(null)
const featRef    = ref<HTMLElement | null>(null)
const horzRef    = ref<HTMLElement | null>(null)
const trackRef   = ref<HTMLElement | null>(null)
const ctaRef     = ref<HTMLElement | null>(null)

const navLinks = ['About', 'Features', 'Rewards', 'FAQ']

const features = [
  {
    num: '01',
    title: 'Your Digital\nAlter Ego',
    body: 'Every KODA is unique to you. Built from your actions, shaped by your choices — no two are the same.',
  },
  {
    num: '02',
    title: 'Earn While\nYou Play',
    body: 'Complete missions, unlock rare gear, and convert your in-game progress into real-world value.',
  },
  {
    num: '03',
    title: 'Your Data,\nYour Rules',
    body: 'Your KODA guards your identity. You decide what to share, who sees it, and when to pull back.',
  },
]

const cards = [
  { step: 'Step 01', title: 'Create', desc: 'Mint your KODA — it starts minimal, just like you.' },
  { step: 'Step 02', title: 'Evolve',  desc: 'Complete quests. Your KODA adapts to who you become.' },
  { step: 'Step 03', title: 'Earn',    desc: 'Every contribution earns tokens, gear, and influence.' },
  { step: 'Step 04', title: 'Own',     desc: 'Your data, your KODA, your platform. Forever.' },
]

const stats = [
  { num: '48K+', label: 'Active KODAs' },
  { num: '2.1M', label: 'Missions Completed' },
  { num: '$12M', label: 'Rewards Distributed' },
]

onMounted(async () => {
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)

  gsapCtx = gsap.context(() => {

    /* ── 1. Hero: character floats upward on scroll (parallax) ── */
    gsap.to('.koda-character', {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    /* ── 2. Hero heading scrubs out upward ─────────────────────── */
    gsap.to('.hero-text-wrap', {
      y: -80,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: '50% top',
        scrub: 1,
      },
    })

    /* ── 3. Pinned features — dark panel sticks, cards scroll in ─ */
    const featEls = gsap.utils.toArray<HTMLElement>('.feat-card')
    const pinLen  = featEls.length * 400

    ScrollTrigger.create({
      trigger: featRef.value,
      pin: true,
      start: 'top top',
      end: `+=${pinLen}`,
      anticipatePin: 1,
    })

    featEls.forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        x: 80,
        duration: 0.01, // instant set
        scrollTrigger: {
          trigger: featRef.value,
          start: `top+=${i * 400} top`,
          end: `top+=${i * 400 + 360} top`,
          scrub: 0.6,
          toggleActions: 'play none none reverse',
        },
      })

      /* Active number highlight */
      gsap.fromTo(`.feat-num-${i}`,
        { color: 'rgba(255,255,255,0.15)' },
        {
          color: '#E8541C',
          scrollTrigger: {
            trigger: featRef.value,
            start: `top+=${i * 400} top`,
            end: `top+=${i * 400 + 360} top`,
            scrub: 0.6,
          },
        }
      )
    })

    /* ── 4. Horizontal scroll — card track ─────────────────────── */
    if (trackRef.value && horzRef.value) {
      const totalW = trackRef.value.scrollWidth
      const viewW  = horzRef.value.offsetWidth

      gsap.to(trackRef.value, {
        x: -(totalW - viewW),
        ease: 'none',
        scrollTrigger: {
          trigger: horzRef.value,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalW - viewW}`,
          anticipatePin: 1,
        },
      })

      /* Cards fade in as they enter */
      gsap.utils.toArray<HTMLElement>('.h-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          delay: i * 0.08,
          scrollTrigger: {
            trigger: horzRef.value,
            start: 'top 80%',
            once: true,
          },
        })
      })
    }

    /* ── 5. Stats: numbers count up on enter ────────────────────── */
    gsap.from('.stat-item', {
      opacity: 0,
      y: 60,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.koda-stats',
        start: 'top 70%',
        once: true,
      },
    })

    /* ── 6. CTA: words fly in from below ────────────────────────── */
    gsap.from('.cta-word', {
      opacity: 0,
      y: 60,
      stagger: 0.07,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ctaRef.value,
        start: 'top 70%',
        once: true,
      },
    })

  })
})

onUnmounted(() => {
  gsapCtx?.revert()
})
</script>

<template>
  <div class="koda-page">

    <!-- ── FLOATING PILL NAVBAR ──────────────────────────────── -->
    <nav class="koda-nav">
      <div class="nav-pill">
        <div class="nav-logo">
          <span class="logo-mark">K</span>
          <span class="logo-text">KODA</span>
        </div>
        <div class="nav-links">
          <a v-for="link in navLinks" :key="link" class="nav-link" href="#">{{ link }}</a>
        </div>
        <button class="nav-cta">Launch App →</button>
      </div>
    </nav>

    <!-- ── SECTION 1: HERO ───────────────────────────────────── -->
    <section ref="heroRef" class="koda-hero">
      <!-- Background blobs -->
      <div class="hero-blob hero-blob--1" aria-hidden="true"></div>
      <div class="hero-blob hero-blob--2" aria-hidden="true"></div>

      <!-- Text block -->
      <div class="hero-text-wrap">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Introducing Season 1
        </div>
        <h1 class="hero-heading">
          Meet the<br />KODAs
        </h1>
        <p class="hero-sub">
          Empowered digital alter-egos<br />
          built to represent who you really are.
        </p>
      </div>

      <!-- Character SVG illustration -->
      <div class="koda-character" aria-hidden="true">
        <svg viewBox="0 0 420 560" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Shadow -->
          <ellipse cx="210" cy="530" rx="130" ry="22" fill="#1a0800" opacity="0.35"/>
          <!-- Body / jacket -->
          <path d="M115 290 Q95 240 108 190 Q140 165 210 158 Q280 165 312 190 Q325 240 305 290 Q278 370 210 390 Q142 370 115 290Z" fill="#1C0D05"/>
          <!-- Jacket highlight -->
          <path d="M155 200 Q175 195 210 192 Q245 195 265 200 L275 230 Q248 215 210 213 Q172 215 145 230Z" fill="#2E1A0C" opacity="0.8"/>
          <!-- Collar detail -->
          <path d="M175 200 L210 235 L245 200" stroke="#E07030" stroke-width="2" fill="none" opacity="0.6"/>
          <!-- Neck -->
          <rect x="192" y="140" width="36" height="30" rx="8" fill="#C9835A"/>
          <!-- Head -->
          <ellipse cx="210" cy="118" rx="58" ry="62" fill="#C9835A"/>
          <!-- Face shading -->
          <ellipse cx="210" cy="130" rx="40" ry="44" fill="#B8723F" opacity="0.3"/>
          <!-- Eyes -->
          <ellipse cx="190" cy="108" rx="7" ry="8" fill="#1C0D05"/>
          <ellipse cx="230" cy="108" rx="7" ry="8" fill="#1C0D05"/>
          <circle cx="192" cy="106" r="2.5" fill="#fff" opacity="0.8"/>
          <circle cx="232" cy="106" r="2.5" fill="#fff" opacity="0.8"/>
          <!-- Eyebrows -->
          <path d="M182 98 Q190 94 198 97" stroke="#1C0D05" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M222 97 Q230 94 238 98" stroke="#1C0D05" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <!-- Nose -->
          <path d="M207 118 Q210 124 213 118" stroke="#B8723F" stroke-width="1.5" fill="none"/>
          <!-- Mouth -->
          <path d="M198 134 Q210 142 222 134" stroke="#9A5C2E" stroke-width="2" stroke-linecap="round" fill="none"/>
          <!-- Bucket hat brim -->
          <ellipse cx="210" cy="62" rx="76" ry="16" fill="#5B8DD4"/>
          <!-- Hat body -->
          <path d="M144 62 Q148 28 210 24 Q272 28 276 62Z" fill="#4A7BC3"/>
          <!-- Hat band -->
          <rect x="148" y="56" width="124" height="10" rx="3" fill="#3D69A8"/>
          <!-- Hat detail stripes -->
          <line x1="185" y1="24" x2="180" y2="58" stroke="#5B8DD4" stroke-width="1.5" opacity="0.5"/>
          <line x1="210" y1="24" x2="210" y2="58" stroke="#5B8DD4" stroke-width="1.5" opacity="0.5"/>
          <line x1="235" y1="24" x2="240" y2="58" stroke="#5B8DD4" stroke-width="1.5" opacity="0.5"/>
          <!-- Headphones arc left -->
          <path d="M154 108 Q142 85 148 62" stroke="#1C0D05" stroke-width="6" stroke-linecap="round" fill="none"/>
          <!-- Headphone cup left -->
          <ellipse cx="151" cy="112" rx="13" ry="17" fill="#1C0D05"/>
          <ellipse cx="151" cy="112" rx="7" ry="10" fill="#333"/>
          <!-- Headphones arc right -->
          <path d="M266 108 Q278 85 272 62" stroke="#1C0D05" stroke-width="6" stroke-linecap="round" fill="none"/>
          <!-- Headphone cup right -->
          <ellipse cx="269" cy="112" rx="13" ry="17" fill="#1C0D05"/>
          <ellipse cx="269" cy="112" rx="7" ry="10" fill="#333"/>
          <!-- Arm left -->
          <path d="M115 200 Q80 240 90 310 Q100 360 115 380" stroke="#1C0D05" stroke-width="28" stroke-linecap="round" fill="none"/>
          <!-- Arm right -->
          <path d="M305 200 Q340 240 330 310 Q320 360 305 380" stroke="#1C0D05" stroke-width="28" stroke-linecap="round" fill="none"/>
          <!-- Hand left -->
          <ellipse cx="91" cy="318" rx="18" ry="14" fill="#C9835A" transform="rotate(-20 91 318)"/>
          <!-- Hand right -->
          <ellipse cx="329" cy="318" rx="18" ry="14" fill="#C9835A" transform="rotate(20 329 318)"/>
          <!-- Jacket pocket detail -->
          <rect x="135" y="280" width="40" height="28" rx="6" stroke="#2E1A0C" stroke-width="2" fill="none" opacity="0.6"/>
          <rect x="245" y="280" width="40" height="28" rx="6" stroke="#2E1A0C" stroke-width="2" fill="none" opacity="0.6"/>
          <!-- Subtle shine on jacket -->
          <path d="M155 180 Q145 220 148 270" stroke="#fff" stroke-width="1.5" opacity="0.08" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Scroll hint -->
      <div class="hero-scroll-hint" aria-hidden="true">
        <div class="scroll-line"></div>
        <span>scroll</span>
      </div>
    </section>

    <!-- ── SECTION 2: PINNED FEATURES (dark) ─────────────────── -->
    <section ref="featRef" class="koda-features">
      <div class="feat-inner">
        <!-- Left sticky panel -->
        <div class="feat-left">
          <p class="feat-overline">What is a KODA?</p>
          <h2 class="feat-heading">
            More than<br />an avatar.
          </h2>
          <p class="feat-sub">
            Three things that make your KODA unlike anything you've seen before.
          </p>
          <!-- Progress dots -->
          <div class="feat-dots">
            <span
              v-for="(f, i) in features"
              :key="i"
              class="feat-dot"
              :class="`feat-num-${i}`"
            >{{ f.num }}</span>
          </div>
        </div>

        <!-- Right scrolling cards -->
        <div class="feat-right">
          <div
            v-for="f in features"
            :key="f.num"
            class="feat-card"
          >
            <div class="feat-card-num">{{ f.num }}</div>
            <h3 class="feat-card-title">{{ f.title }}</h3>
            <p class="feat-card-body">{{ f.body }}</p>
            <div class="feat-card-line"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SECTION 3: HORIZONTAL SCROLL ─────────────────────── -->
    <section ref="horzRef" class="koda-horizontal">
      <div class="horz-label">
        <span class="horz-overline">The KODA Journey</span>
        <h2 class="horz-heading">Four moves.<br />One destiny.</h2>
      </div>
      <div ref="trackRef" class="h-track">
        <div
          v-for="card in cards"
          :key="card.step"
          class="h-card"
        >
          <span class="h-card-step">{{ card.step }}</span>
          <div class="h-card-icon" aria-hidden="true"></div>
          <h3 class="h-card-title">{{ card.title }}</h3>
          <p class="h-card-desc">{{ card.desc }}</p>
        </div>
      </div>
      <div class="horz-drag-hint" aria-hidden="true">drag →</div>
    </section>

    <!-- ── SECTION 4: STATS ──────────────────────────────────── -->
    <section class="koda-stats">
      <div
        v-for="stat in stats"
        :key="stat.num"
        class="stat-item"
      >
        <div class="stat-num">{{ stat.num }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </section>

    <!-- ── SECTION 5: CTA ────────────────────────────────────── -->
    <section ref="ctaRef" class="koda-cta">
      <div class="cta-blob" aria-hidden="true"></div>
      <div class="cta-inner">
        <div class="cta-heading-wrap">
          <span class="cta-word">Your</span>
          <span class="cta-word">KODA</span>
          <span class="cta-word">is</span>
          <span class="cta-word">waiting.</span>
        </div>
        <p class="cta-sub">Season 1 is live. Claim yours before it's gone.</p>
        <div class="cta-buttons">
          <button class="cta-btn-primary">Launch Your KODA →</button>
          <button class="cta-btn-ghost">Read the Docs</button>
        </div>
        <p class="cta-note">Free to start · No wallet required</p>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ── Reset & base ─────────────────────────────────────────── */
.koda-page {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #0F0E0C;
  color: #F7F7F3;
  overflow-x: hidden;
}

/* ── NAV ──────────────────────────────────────────────────── */
.koda-nav {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.nav-pill {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: #0F0E0C;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  padding: 10px 14px 10px 18px;
  pointer-events: all;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 6px;
}

.logo-mark {
  width: 28px;
  height: 28px;
  background: #E8541C;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 900;
  color: #0F0E0C;
  line-height: 1;
  flex-shrink: 0;
}

.logo-text {
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #F7F7F3;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(247, 247, 243, 0.6);
  text-decoration: none;
  transition: color 150ms ease;
}
.nav-link:hover { color: #F7F7F3; }

.nav-cta {
  background: #3DBA6C;
  color: #0F0E0C;
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: opacity 150ms ease, transform 150ms ease;
  white-space: nowrap;
}
.nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
.nav-cta:active { transform: scale(0.96); transition-duration: 80ms; }

/* ── HERO ─────────────────────────────────────────────────── */
.koda-hero {
  position: relative;
  min-height: 100vh;
  background: #E8541C;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* Background blobs */
.hero-blob {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
}
.hero-blob--1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #F5702A 0%, transparent 70%);
  top: -100px;
  left: -100px;
  opacity: 0.6;
}
.hero-blob--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #C4380A 0%, transparent 70%);
  bottom: 0;
  right: 100px;
  opacity: 0.5;
}

/* Text block */
.hero-text-wrap {
  position: relative;
  z-index: 10;
  padding-top: clamp(100px, 18vh, 160px);
  padding-inline: 48px;
  text-align: left;
  max-width: 1200px;
  width: 100%;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 14, 12, 0.18);
  border: 1px solid rgba(15, 14, 12, 0.25);
  color: #0F0E0C;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #0F0E0C;
  animation: pulse-dot 1.8s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.7); }
}

.hero-heading {
  font-size: clamp(5rem, 14vw, 11rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.03em;
  color: #0F0E0C;
  margin: 0 0 1.5rem;
  text-transform: uppercase;
}

.hero-sub {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: rgba(15, 14, 12, 0.65);
  line-height: 1.55;
  font-weight: 400;
  max-width: 34ch;
}

/* Character illustration */
.koda-character {
  position: absolute;
  bottom: -20px;
  right: clamp(-20px, 5vw, 80px);
  width: clamp(300px, 45vw, 540px);
  z-index: 5;
  pointer-events: none;
  filter: drop-shadow(-20px 0 60px rgba(15, 14, 12, 0.25));
}

.koda-character svg {
  width: 100%;
  height: auto;
}

/* Scroll hint */
.hero-scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 10;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(15,14,12,0.6), transparent);
}

.hero-scroll-hint span {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(15,14,12,0.5);
  writing-mode: vertical-rl;
}

/* ── FEATURES (pinned dark section) ──────────────────────── */
.koda-features {
  min-height: 100vh;
  background: #0F0E0C;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feat-inner {
  display: flex;
  gap: 6rem;
  max-width: 1200px;
  width: 100%;
  padding-inline: 48px;
  padding-block: 80px;
}

/* Left sticky panel */
.feat-left {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feat-overline {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #E8541C;
  margin: 0;
}

.feat-heading {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #F7F7F3;
  margin: 0;
  text-transform: uppercase;
}

.feat-sub {
  font-size: 1rem;
  color: rgba(247, 247, 243, 0.45);
  line-height: 1.6;
  max-width: 30ch;
  margin: 0.5rem 0 1.5rem;
}

.feat-dots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feat-dot {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.15);
  transition: color 300ms ease;
  font-family: 'Courier New', monospace;
}

/* Right cards */
.feat-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: center;
}

.feat-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feat-card-num {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #E8541C;
  font-family: 'Courier New', monospace;
}

.feat-card-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #F7F7F3;
  line-height: 1.1;
  margin: 0;
  white-space: pre-line;
  text-transform: uppercase;
}

.feat-card-body {
  font-size: 0.9375rem;
  color: rgba(247, 247, 243, 0.5);
  line-height: 1.6;
  margin: 0;
  max-width: 36ch;
}

.feat-card-line {
  width: 32px;
  height: 2px;
  background: #E8541C;
  margin-top: 0.5rem;
  border-radius: 999px;
}

/* ── HORIZONTAL SCROLL ────────────────────────────────────── */
.koda-horizontal {
  background: #141210;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.horz-label {
  padding-inline: 48px;
  margin-bottom: 3rem;
  flex-shrink: 0;
}

.horz-overline {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #E8541C;
  display: block;
  margin-bottom: 0.5rem;
}

.horz-heading {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  color: #F7F7F3;
  margin: 0;
  line-height: 1.1;
  text-transform: uppercase;
}

.h-track {
  display: flex;
  gap: 24px;
  padding-inline: 48px;
  width: max-content;
  flex-shrink: 0;
}

.h-card {
  flex: 0 0 340px;
  background: #1C1916;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 250ms ease;
  min-height: 260px;
}
.h-card:hover {
  border-color: rgba(232, 84, 28, 0.4);
}

.h-card-step {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(247, 247, 243, 0.3);
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.h-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #E8541C, #C4380A);
  flex-shrink: 0;
}

.h-card-title {
  font-size: 1.875rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  color: #F7F7F3;
  margin: 0;
  text-transform: uppercase;
  line-height: 1;
}

.h-card-desc {
  font-size: 0.9rem;
  color: rgba(247, 247, 243, 0.45);
  line-height: 1.6;
  margin: 0;
}

.horz-drag-hint {
  position: absolute;
  bottom: 32px;
  right: 48px;
  font-size: 0.75rem;
  color: rgba(247, 247, 243, 0.25);
  letter-spacing: 0.08em;
  font-weight: 500;
}

/* ── STATS ────────────────────────────────────────────────── */
.koda-stats {
  background: #0F0E0C;
  display: flex;
  align-items: stretch;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: clamp(48px, 8vw, 96px) 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
}
.stat-item:last-child { border-right: none; }

.stat-num {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #E8541C;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(247, 247, 243, 0.4);
  font-weight: 500;
  letter-spacing: 0.04em;
}

/* ── CTA ──────────────────────────────────────────────────── */
.koda-cta {
  position: relative;
  background: #E8541C;
  overflow: hidden;
  padding: clamp(80px, 14vh, 160px) 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-blob {
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, #F5702A 0%, transparent 60%);
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.cta-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.cta-heading-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35em;
}

.cta-word {
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
  color: #0F0E0C;
  text-transform: uppercase;
  display: inline-block;
}

.cta-sub {
  font-size: 1.125rem;
  color: rgba(15, 14, 12, 0.6);
  max-width: 36ch;
  line-height: 1.5;
  margin: 0;
}

.cta-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.cta-btn-primary {
  background: #0F0E0C;
  color: #F7F7F3;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 2.25rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  transition: opacity 150ms ease, transform 150ms ease;
}
.cta-btn-primary:hover  { opacity: 0.85; transform: translateY(-2px); }
.cta-btn-primary:active { transform: scale(0.96); transition-duration: 80ms; }

.cta-btn-ghost {
  background: transparent;
  color: rgba(15, 14, 12, 0.75);
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 2.25rem;
  border-radius: 999px;
  border: 1.5px solid rgba(15, 14, 12, 0.35);
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease, transform 150ms ease;
}
.cta-btn-ghost:hover  { border-color: rgba(15,14,12,0.7); color: #0F0E0C; transform: translateY(-2px); }
.cta-btn-ghost:active { transform: scale(0.96); transition-duration: 80ms; }

.cta-note {
  font-size: 0.75rem;
  color: rgba(15, 14, 12, 0.45);
  margin: 0;
  letter-spacing: 0.04em;
}

/* ── Reduced motion ───────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .badge-dot { animation: none; }
}
</style>
