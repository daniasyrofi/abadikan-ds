# Review Landing Page Abadikan.id

**Tanggal:** 9 April 2026
**Branch:** `develop`
**Reviewer:** Claude (AI Design Review)
**Scope:** Consumer landing page — 12 sections, 27+ components

---

## Ringkasan Eksekutif

Landing page sudah **solid secara struktural** — 12 section lengkap, responsive, scroll animations berjalan, DS tokens dipakai konsisten. Tapi secara **visual design quality**, masih ada gap cukup besar antara "functional SaaS landing" dan "memorable, high-converting wedding platform". Review ini breakdown per section + rekomendasi prioritas.

**Overall Score: 7.5 / 10** (functional, tapi belum memorable)

---

## Section-by-Section Review

### 1. Navbar (LandingHero.vue + SharedNavbar.vue)

**Yang sudah bagus:**
- Pill morphing animation on scroll (transparent full-width → white rounded pill) — smooth dan polished
- Mega menu 3-column layout clean, hover states proper
- Mode toggle (Personal/Bisnis) well-integrated
- Responsive: hamburger drawer di mobile

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **Duplikasi navbar logic** | `LandingHero.vue` punya navbar inline (line 111-321), `SharedNavbar.vue` punya versi terpisah (615 lines). Consumer page pakai yang di Hero, Business page pakai SharedNavbar. Ini bikin maintenance nightmare — edit di satu tempat nggak ngaruh ke yang lain. |
| 2 | Low | **Top bar + pill = double fixed** | Di Hero, ada top bar (dark, 48px) + pill navbar = 2 fixed layers. Scroll behavior sudah ok (top bar collapses), tapi transisi bisa terasa "jumpy" kalau scroll cepat. |
| 3 | Low | **Mega menu positioning** | Di Hero version, mega menu pakai `left-[-1px] w-[calc(100%+2px)]` — ini fragile. Di SharedNavbar, pakai `left-1/2 -translate-x-1/2 w-[640px]` — lebih robust tapi hardcoded width. |
| 4 | Medium | **SharedNavbar CTA color** | Saat hero state (!bgActive), CTA button pakai `--btn-bg: var(--color-text-heading)` yang hasilnya dark/black button di atas dark hero — low contrast. Hero version pakai white button, lebih tepat. |
| 5 | Low | **No active state indicator** | Nav items (Beranda, Produk, dll) nggak ada indicator mana yang aktif. Semua terlihat sama. |

---

### 2. Hero Section (LandingHero.vue)

**Yang sudah bagus:**
- Background: OKLCH red gradient (`oklch(0.3 0.18 18)` base + radial glow) — deep, rich, cinematic
- Typography hierarchy clear: overline pill → H1 → subtitle → CTA → trust line
- Responsive font sizing via `clamp()` — well calibrated
- Social proof bar fixed di bottom dengan animated counters (easeOutCubic, staggered)

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | High | **Hero terasa kosong / text-only** | Nggak ada visual element sama sekali — no mockup, no illustration, no photo, no floating UI cards. Untuk wedding platform, ini missed opportunity besar. Kompetitor pasti tampilkan preview undangan di hero. |
| 2 | Medium | **Overline pill readability** | `background: var(--color-primary-light)` (pink terang) di atas dark red hero — bisa work, tapi tergantung exact color. Kalau terlalu vibrant, bisa distract dari headline. |
| 3 | Medium | **Social proof bar duplikasi** | Counter stats (12K pasangan, 50K tamu, dll) muncul di Hero bar DAN di Testimonials section. Redundant — user lihat angka yang sama 2 kali. |
| 4 | Low | **Ghost button contrast** | "Lihat Contoh Undangan" ghost button punya border `rgba(255,255,255,0.4)` — mungkin terlalu subtle di atas dark gradient. |
| 5 | Low | **Trust line terlalu kecil** | `font-size: 12px; color: rgba(255,255,255,0.45)` — hampir invisible. Social proof penting, tapi ini terbuang. |
| 6 | Medium | **SOCIAL_BAR_H hardcoded** | `const SOCIAL_BAR_H = 82` — approximate, bisa mismatch di different screen/font sizes. |

---

### 3. Problem Section (LandingProblem.vue)

**Yang sudah bagus:**
- Copy sangat kuat dan relatable ("Cetak 500 undangan bisa habis Rp 2-5 juta")
- Icon + card layout bersih
- Transition copy di bawah ("Bagaimana kalau semua masalah itu...") — nice narrative bridge

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **Visual monoton** | 4 cards semua identical structure, same size, same color. No visual hierarchy — mata nggak tau harus fokus ke mana. |
| 2 | Low | **Heading terlalu panjang** | "Persiapan Nikah Itu Sudah Ribet. Jangan Tambah Ribet dengan Undangan." — 2 kalimat di H2 agak panjang untuk headline. |
| 3 | Low | **Icon circle terlalu generic** | Circle background + Remix icon = default look. Bisa lebih distinctive dengan custom illustrations atau iconography. |

---

### 4. Solution Section (LandingSolution.vue)

**Yang sudah bagus:**
- 4 pillars jelas: Undangan, Kelola Tamu, Kado Digital, QR Check-in
- Card structure dengan link "Lihat Template →" di bottom — good pattern

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **Visually identical ke Problem section** | Sama-sama card grid dengan icon circle + text. User bisa confused — "ini section berbeda atau lanjutan?" |
| 2 | Low | **Background contrast** | Problem = `--color-bg` (white), Solution = `--color-bg-subtle` (off-white). Perbedaan terlalu subtle untuk clear section separation. |
| 3 | Low | **4 columns cramped on tablet** | `lg:grid-cols-4` artinya 4 kolom baru di 1024px+. Di tablet, 2 cols → ok. Tapi di exactly 1024px, 4 narrow cards bisa terasa sempit. |

---

### 5. How It Works (LandingHowItWorks.vue)

**Yang sudah bagus:**
- 5-step timeline with numbered circles + connectors
- Time badges (monospace font) — clever detail
- Decorative background number (opacity 0.12) adds depth
- CTA di bawah langsung

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **Desktop layout cramped** | 5 items in flex row with no wrap. Each step gets ~20% width. Titles + body text jadi sangat narrow. Connector lines bisa juga terlalu pendek. |
| 2 | Low | **Mobile: no vertical connector** | Code explicitly sets `display: none` on mobile connector. Steps terlihat disconnected — nggak ada visual flow. |
| 3 | Low | **Step bg-num overlap** | `margin-bottom: -0.5rem; margin-top: -0.25rem` bisa overlap dengan content di certain viewport widths. |

---

### 6. Gallery (LandingGallery.vue)

**Yang sudah bagus:**
- Filter bar dengan 8 categories + active state animation
- Template cards dengan gradient placeholders + hover overlay
- Badges (Populer, Baru, Hits) with DS Badge component
- Grid responsive: 2 → 3 → 5 columns

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | High | **Gradient placeholders = cheap look** | Semua template cuma colored gradients. Ini SANGAT menurunkan perceived quality. Wedding templates harus tampilkan actual design preview — bahkan mockup/screenshot lebih baik dari solid gradient. |
| 2 | Medium | **No filter transition** | Saat ganti filter, cards langsung appear/disappear tanpa animation. Butuh fade/slide transition. |
| 3 | Low | **isDark function fragile** | Cek `gradient.includes('#1c1917')` — terlalu specific. Kalau nanti ada template gelap lain, harus manual update. |
| 4 | Low | **"Konsultasi Desain Custom" link** | Ini important upsell tapi cuma plain text link abu-abu. Kurang prominent. |

---

### 7. Feature Deep Dive (LandingFeatureDeep.vue)

**Yang sudah bagus:**
- Alternating layout (text-left/visual-left) — proper zigzag pattern
- Mock UI elements (dashboard, donut chart, QR code, gift cards, photo gallery) — adds credibility
- Collapsible supporting features grid — reduces initial overwhelm
- 5 deep features + 7 supporting features = comprehensive coverage

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **Mock UIs too simple** | Dashboard mock = 3 rows of gray bars. Donut chart = single color. Gallery = 4 solid rectangles. These need more detail to look real. |
| 2 | Medium | **Section sangat panjang** | 5 feature rows × `mb-24 md:mb-32` = massive vertical space. User harus scroll sangat banyak. Consider showing 2-3 highlights dan sisanya in collapsible. |
| 3 | Low | **Feature 3 body uses `white-space: pre-line`** | Ini bikin line breaks manual — works tapi bisa break on narrow screens. |
| 4 | Low | **Supporting features: hardcoded `max-height: 800px`** | Kalau content lebih dari 800px, akan terpotong. |

---

### 8. Testimonials (LandingTestimonials.vue)

**Yang sudah bagus:**
- Stats counter with IntersectionObserver (triggers once on scroll)
- Quote mark typography detail
- Star ratings + avatar + date = credible
- Background: subtle amber tint (`color-mix(in oklch, var(--color-bg-subtle) 92%, #f59e0b 8%)`) — nice warmth

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **Hanya 3 testimonial** | Untuk social proof section yang headline-nya "12.000+ Pasangan", 3 testimonials terasa kurang. Minimal 6 dengan horizontal scroll/carousel. |
| 2 | Medium | **Stats duplikasi dengan Hero** | 12,000+ Pasangan Bahagia, 50,000+ Tamu Diundang — exact same numbers. |
| 3 | Low | **No real photos** | Avatar pakai initials. Real photos (bahkan stock) jauh lebih convincing. |
| 4 | Low | **All 5 stars** | Semua testimonial 5 bintang — looks fake. Satu 4.5 atau variasi bikin lebih believable. |

---

### 9. Pricing (LandingPricing.vue)

**Yang sudah bagus:**
- 3-tier structure clear: Gratis / Premium / Exclusive
- Premium highlighted with border + scale
- Old price strikethrough + discount badge
- Payment methods pills
- Money-back guarantee
- Bold key features in Premium

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **Premium card `transform: scale(1.03)` inline style** | Ini bikin card slightly larger tapi bisa cause layout shift. Better pakai CSS class. |
| 2 | Medium | **Feature lists very long** | Premium has 14 features — wall of text. Group them into categories (Undangan, Tamu, Kado, dll) for scannability. |
| 3 | Low | **Exclusive price visible but no discount badge** | Gratis = no old price, Premium = 40% OFF badge, Exclusive = old price tapi no badge. Inconsistent. |
| 4 | Low | **"Pilihan 70% pasangan" di bawah Premium CTA** | Good social proof, tapi `text-[12px]` terlalu kecil. |
| 5 | Low | **Payment pills duplikasi** | Payment methods juga muncul di Footer. |

---

### 10. Comparison (LandingComparison.vue)

**Yang sudah bagus:**
- Table format clear dan scannable
- Emoji indicators (check, cross, warning)
- Alternating row colors
- 10 comparison points comprehensive
- Abadikan column has primary tint background

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **Table scroll horizontal di mobile** | `overflow-x-auto` + `min-w-[560px]` = horizontal scroll. Tapi most mobile users nggak expect horizontal scroll di table. Consider card-based layout for mobile. |
| 2 | Low | **"Platform Lain" too generic** | Nggak sebut competitor name (understandable legally), tapi "Platform Lain" terasa strawman. Bisa lebih specific: "Platform undangan lain pada umumnya". |
| 3 | Low | **Semua Abadikan = check** | Every single row Abadikan ✅. Zero honesty about limitations bikin less credible. |

---

### 11. FAQ (LandingFAQ.vue)

**Yang sudah bagus:**
- 2-column layout: sticky heading left, accordion right — modern pattern
- 12 FAQs comprehensive
- Accordion using DS component
- "Chat kami →" link prominent
- Sticky heading on scroll (desktop)

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Low | **12 FAQs might be too many** | Consider showing 6-8 most common, with "Lihat semua FAQ" link. |
| 2 | Low | **No search/filter** | Dengan 12 items, user harus scan semua. Quick search bisa help. |

---

### 12. CTA Section (LandingCTA.vue)

**Yang sudah bagus:**
- Strong copy: "Momen Ini Nggak Akan Terulang. Abadikan Sekarang."
- Social proof badge: "327 pasangan membuat undangan minggu ini"
- Risk reversal (Gratis, tanpa CC, 15 menit, garansi)
- Clean dark background with radial glow

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Medium | **CTA buttons rounded-full (999px)** | Inconsistent dengan DS button styling. Di tempat lain pakai DS `<Button>` component, di sini pakai custom `<a>` elements. |
| 2 | Low | **Risk reversal items too small** | `font-size: 0.75rem; color: rgba(255,255,255,0.5)` — almost invisible. |

---

### 13. Footer (LandingFooter.vue)

**Yang sudah bagus:**
- Clean 4-column grid
- Logo via CSS mask (consistent with navbar)
- Social icons, payment methods
- Legal info (Kominfo registered)

**Issues & Catatan:**

| # | Severity | Issue | Detail |
|---|----------|-------|--------|
| 1 | Low | **No newsletter/email signup** | Common for SaaS footers. Could capture leads. |
| 2 | Low | **Mobile: 2-column grid cramped** | Link columns di mobile bisa terasa tight. |

---

### 14. Floating WhatsApp (SharedFloatingWA.vue)

(Didn't read this file but based on agent description)

**Yang sudah bagus:**
- Green WA button, fixed bottom-right
- Pulse animation
- Tooltip with response time

**Potential issues:**
- Bisa overlap dengan social proof bar di hero (both fixed bottom)
- z-index conflicts (social bar z-10, WA likely z-50)

---

## Cross-Section Issues

### A. Design Quality & Visual Identity

| # | Severity | Issue |
|---|----------|-------|
| 1 | **Critical** | **Nggak ada real visual content** — No photos, no screenshots, no mockup preview, no actual template images. Seluruh page text + gradient placeholders. Untuk wedding platform, visual IS the product. |
| 2 | **High** | **Section-section terasa repetitif** — Problem, Solution, dan Feature cards semua pake pattern yang sama: icon circle + title + body text. Kurang variasi layout. |
| 3 | **High** | **Nggak ada "hero image" atau product shot** — User nggak bisa lihat seperti apa undangan yang dibuat. Ini deal-breaker untuk conversion. |
| 4 | **Medium** | **Background alternasi terlalu subtle** — White → off-white → white → off-white. Perlu lebih distinct section breaks (maybe 1-2 sections dengan colored/dark background di tengah). |
| 5 | **Medium** | **Micro-interactions minimal** — Hover effects cuma translateY(-2px) + shadow. Nggak ada parallax, nggak ada hover reveal, nggak ada cursor effects, nggak ada scroll-triggered animations beyond fade-up. |

### B. Typography & Fonts

| # | Severity | Issue |
|---|----------|-------|
| 1 | **Low** | **'Abadikan Sans' custom font** — Good branding move. Tapi `--font-ui: 'Inter'` masih generic. Consider pairing with something more distinctive for body. |
| 2 | **Low** | **H2 headings consistent tapi monoton** — Semua pake `landing-h2` class yang sama. Beberapa sections bisa benefit dari different heading treatment. |

### C. Color & Brand

| # | Severity | Issue |
|---|----------|-------|
| 1 | **Medium** | **Red-only brand palette** — Hero = dark red, CTA = dark neutral + red glow, overlines = red, buttons = red. No secondary accent color dipakai selain amber di testimonials. Monotone. |
| 2 | **Low** | **OKLCH colors inconsistent** — Hero uses raw `oklch(0.3 0.18 18)` while rest uses tokens. |

### D. Performance & Technical

| # | Severity | Issue |
|---|----------|-------|
| 1 | **Medium** | **Multiple scroll listeners** — Hero punya sendiri, SharedNavbar punya sendiri. Bisa pakai single scroll handler atau passive ResizeObserver. |
| 2 | **Medium** | **Counter animation duplicated** — `easeOutCubic`, `animateCounter`, `fmt` — copy-pasted between LandingHero and LandingTestimonials. Should be shared composable. |
| 3 | **Low** | **Inline SVG icons in navbar** — `megaIcons` object has raw SVG strings. Better use Icon component consistently. |
| 4 | **Low** | **No lazy loading** — All 12 sections render immediately. For mobile, heavy sections below fold should lazy load. |

### E. Accessibility

| # | Severity | Issue |
|---|----------|-------|
| 1 | **Medium** | **Nav items aren't `<button>` or `<a>`** — Menu items are `<span>` with `@click`. Screen readers won't announce as interactive. |
| 2 | **Medium** | **Comparison table** — Uses `✅❌⚠️` emojis as status indicators tanpa `aria-label`. Screen readers akan baca emoji name bukan status. |
| 3 | **Low** | **Color contrast** — Trust line di hero (`rgba(255,255,255,0.45)` on dark red), risk reversal di CTA (`rgba(255,255,255,0.5)` on dark) — below WCAG AA. |
| 4 | **Low** | **Scroll reveal** — Elements start at `opacity: 0`. Kalau JS fail, content invisible. (Mitigated by `prefers-reduced-motion` fallback, good.) |

### F. Architecture & Code

| # | Severity | Issue |
|---|----------|-------|
| 1 | **High** | **2 versi navbar** — LandingHero.vue dan SharedNavbar.vue punya logic hampir identik tapi diverge. Must consolidate. |
| 2 | **Medium** | **HelloWorld.vue as orchestrator** — Naming misleading. Should rename to `AppLanding.vue` or similar. |
| 3 | **Medium** | **LandingConsumer doesn't use SharedNavbar** — Consumer page renders navbar through LandingHero, while Business page uses SharedNavbar. Inconsistent architecture. |
| 4 | **Low** | **Deleted files still in git** — `LandingFeatures.vue` and `LandingStats.vue` are deleted but original spec references them. Spec out of date. |

---

## Conversion Optimization Notes

### Missing Elements (Industry Standard untuk Wedding Platform)

1. **Product Preview / Demo** — Nggak ada cara buat user lihat contoh undangan real tanpa sign up.
2. **Before/After** — Nggak ada visual perbandingan "undangan cetak vs digital Abadikan".
3. **Video Testimonial / Demo Video** — Text-based testimonials less convincing than video.
4. **Trust Badges** — "Terdaftar Kominfo" ada di footer tapi kecil. Security badges, review scores (Google, Trustpilot) nggak ada.
5. **Urgency/Scarcity** — "327 pasangan minggu ini" di CTA bagus, tapi bisa strengthen ("Diskon 40% berakhir dalam X hari").
6. **Exit Intent** — Nggak ada popup/intervention kalau user mau leave.
7. **Sticky CTA** — Nggak ada persistent CTA button saat scroll down (besides WA FAB).

### Conversion Flow Analysis

```
Hero (enter) → Problem (empathy) → Solution (promise) → How It Works (clarity)
→ Gallery (templates) → Features (depth) → Testimonials (proof)
→ Pricing (decision) → Comparison (confidence) → FAQ (objection handling)
→ CTA (action) → Footer
```

**Flow is good** — follows classic PAS (Problem-Agitate-Solution) + Social Proof + Pricing funnel. Tapi:
- **Gallery to Features** is 2 heavy sections back-to-back. User fatigue risk.
- **Pricing sebelum Comparison** — biasanya comparison dulu baru pricing (remove objections → show price).
- **Nggak ada "quick win" CTA** di middle page. CTAs only at: Hero, How It Works bottom, Gallery bottom, CTA section. That's 4 CTA touchpoints across ~15,000px scroll height.

---

## Priority Action Items

### P0 — Critical (Fix Immediately)

1. **Add real visual content** — At minimum, screenshots/mockups of actual invitation templates in Hero and Gallery sections. This is the single biggest impact item.
2. **Consolidate navbar** — Merge LandingHero navbar and SharedNavbar into one component. Current state = diverging codebases.

### P1 — High (This Sprint)

3. **Add hero visual** — Phone mockup showing invitation preview, or floating UI cards, or photo collage. Something visual.
4. **Replace gallery gradients** — Use actual template screenshots or high-fidelity mockups.
5. **Reduce section monotony** — Vary backgrounds (add 1-2 sections with dark/colored backgrounds mid-page), vary card layouts between sections.
6. **Add more CTA touchpoints** — Sticky bottom bar or inline CTAs between sections.

### P2 — Medium (Next Sprint)

7. **Enhance mock UIs** in Feature Deep section with more realistic data.
8. **Add carousel/scroll** for testimonials (show 6+ instead of 3).
9. **Fix accessibility** — nav items as `<button>`, proper aria-labels on comparison emojis, color contrast.
10. **Extract shared counter composable** to eliminate Hero/Testimonials duplication.
11. **Reorder sections**: consider Gallery → Features → Comparison → Pricing → Testimonials → FAQ.
12. **Group pricing features** into categories for better scannability.

### P3 — Low (Backlog)

13. **Lazy load** below-fold sections.
14. **Add newsletter signup** in footer.
15. **Improve micro-interactions** — more varied hover effects, parallax, scroll-triggered element reveals.
16. **Consider video embed** — short product demo video.
17. **Rename HelloWorld.vue** to something meaningful.

---

## Section Score Card

| Section | Visual | Copy | UX | Code | Overall |
|---------|--------|------|----|------|---------|
| Navbar | 8/10 | 7/10 | 8/10 | 6/10 | 7.3 |
| Hero | 6/10 | 9/10 | 7/10 | 7/10 | 7.3 |
| Problem | 7/10 | 9/10 | 8/10 | 8/10 | 8.0 |
| Solution | 6/10 | 8/10 | 7/10 | 8/10 | 7.3 |
| How It Works | 7/10 | 8/10 | 7/10 | 8/10 | 7.5 |
| Gallery | 4/10 | 7/10 | 7/10 | 7/10 | 6.3 |
| Feature Deep | 7/10 | 8/10 | 7/10 | 7/10 | 7.3 |
| Testimonials | 7/10 | 8/10 | 7/10 | 7/10 | 7.3 |
| Pricing | 7/10 | 8/10 | 8/10 | 7/10 | 7.5 |
| Comparison | 7/10 | 7/10 | 6/10 | 8/10 | 7.0 |
| FAQ | 8/10 | 8/10 | 8/10 | 9/10 | 8.3 |
| CTA | 7/10 | 9/10 | 8/10 | 7/10 | 7.8 |
| Footer | 7/10 | 7/10 | 7/10 | 8/10 | 7.3 |

**Weighted Average: 7.4 / 10**

---

## Bottom Line

**Strengths:**
- Excellent copywriting — relatable, emotional, action-oriented
- Solid information architecture — right sections in mostly right order
- DS token usage consistent — professional foundation
- Scroll reveal animations smooth and well-timed
- Responsive design thorough

**Weaknesses:**
- Critically lacking visual content (photos, mockups, screenshots)
- Sections visually monotonous — same card patterns repeated
- Navbar architecture fragmented (2 separate implementations)
- Limited micro-interactions and visual flair
- Some accessibility gaps

**Kalau cuma boleh fix 1 hal:** Tambahkan visual content — hero mockup + real template screenshots di gallery. Ini alone bisa naikin perceived quality dari 7.5 ke 8.5+.
