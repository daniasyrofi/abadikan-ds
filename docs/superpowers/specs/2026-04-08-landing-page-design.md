# Landing Page Abadikan.id — Design Spec

## Overview

Rebuild landing page abadikan.id di dalam project DS sebagai refactor dari `HelloWorld.vue`. Standar SaaS layout, red-dominant visual, placeholder copy, pricing per tema.

## Keputusan

- **Lokasi:** `HelloWorld.vue` sebagai orchestrator, section components di `src/components/landing/`
- **Visual:** Red-dominant brand (#d72539), white sections untuk contrast
- **Konten:** Placeholder, akan diedit manual nanti
- **Pricing:** Per tema (bukan subscription tier)
- **Navbar:** Pertahankan apa adanya (transparent→white, mega menu), refactor ke DS tokens
- **DS Usage:** Semua section wajib pakai DS components & tokens, bukan hardcoded values

## File Structure

```
src/
├── components/
│   ├── HelloWorld.vue          # Orchestrator — import semua sections
│   └── landing/
│       ├── LandingHero.vue      # Navbar + hero + social proof bar
│       ├── LandingFeatures.vue  # 6 fitur grid
│       ├── LandingStats.vue     # Social proof angka besar
│       ├── LandingTestimonials.vue  # 3 testimonial cards
│       ├── LandingPricing.vue   # Pricing per tema
│       ├── LandingCTA.vue       # Final CTA section
│       └── LandingFooter.vue    # Footer 4 kolom
```

## Sections Detail

### 1. LandingHero.vue

Berisi semua yang ada di HelloWorld.vue sekarang:
- **Navbar:** Sticky, transparent→white on scroll, mega menu 3 kolom. Pindahkan apa adanya. Refactor warna hardcoded ke `var(--color-primary)`.
- **Hero body:** Background `#d72539`, gradient vignette bawah. Headline besar centered, subtitle, CTA Button (DS `<Button>`).
- **Social proof bar:** 4 stat dengan animated counters (easeOutCubic). Background semi-transparent gelap, border top subtle.
- **Responsive:** Stack pada mobile, reduce font size.

DS Components: `Navbar`, `Button`

### 2. LandingFeatures.vue

- **Background:** Putih (`var(--color-bg)`)
- **Layout:** Container max-width, heading section centered, lalu grid 3×2
- **Tiap item:** Icon (Remixicon via `<Icon>`), judul bold, deskripsi 1-2 baris
- **6 placeholder fitur:** Undangan Digital, Buku Tamu RSVP, Filter Instagram, AI Generator, Otomatisasi WA, Keamanan Data (ambil dari mega menu yang sudah ada)
- **Spacing:** Section padding `py-20`, gap antar items `gap-8`

DS Components: `Container`, `Icon`, `Stack`

### 3. LandingStats.vue

- **Background:** Merah gelap (`#9e1a29` atau darker shade of primary)
- **Layout:** 4 stat besar dalam satu baris, centered
- **Tiap stat:** Angka besar (48-56px, white, bold), label di bawah (14px, white/70%)
- **Data:** Sama dengan social proof bar di hero (200+ pasangan, 10K+ tamu, 176K+ link, 61K+ pengunjung) tapi tampilan lebih lega dan prominent
- **Animation:** Counter animasi on scroll (Intersection Observer)

DS Components: `Container`

### 4. LandingTestimonials.vue

- **Background:** Putih atau subtle gray (`var(--color-bgSubtle)`)
- **Layout:** Heading centered, lalu grid 3 kolom
- **Tiap card:** `<Card>` dengan avatar (`<Avatar>`), nama, role/kota, quote text
- **3 placeholder testimonials** dengan dummy names dan quotes tentang pengalaman pakai Abadikan
- **Style:** Cards with subtle shadow, rounded corners via DS tokens

DS Components: `Container`, `Card`, `Avatar`, `Stack`

### 5. LandingPricing.vue

- **Background:** Subtle gray (`var(--color-bgSubtle)`)
- **Layout:** Heading centered + subtitle, lalu grid responsive (3-4 kolom)
- **Tiap card:** `<Card>` berisi:
  - Preview thumbnail area (placeholder colored rectangle)
  - Nama tema
  - Harga
  - `<Badge>` untuk label (Popular, New, dll)
  - `<Button>` CTA "Pilih Tema"
- **Placeholder:** 3-4 dummy tema dengan nama dan harga dummy
- **Highlight:** Satu card "Popular" dengan border/ring primary

DS Components: `Container`, `Card`, `Badge`, `Button`, `Stack`

### 6. LandingCTA.vue

- **Background:** Red brand solid (`var(--color-primary)`)
- **Layout:** Full-width, centered content
- **Content:** Headline besar putih, subtitle putih/80%, satu `<Button>` putih (variant default atau custom white style)
- **Minimal:** Tidak ada elemen lain, clean dan bold

DS Components: `Container`, `Button`

### 7. LandingFooter.vue

- **Background:** Dark (`#111827` atau `var(--color-textHeading)`)
- **Layout:** Container, grid 4 kolom
  - **Kolom 1:** Logo wordmark + deskripsi singkat + social media icons
  - **Kolom 2:** "Produk" — Undangan Digital, Buku Tamu, Filter IG, AI Generator
  - **Kolom 3:** "Perusahaan" — Tentang, Kontak, Karir, Blog
  - **Kolom 4:** "Bantuan" — FAQ, Panduan, Syarat & Ketentuan, Kebijakan Privasi
- **Bottom bar:** Divider + copyright text "© 2026 Abadikan. All rights reserved."
- **Warna teks:** White/70% untuk links, white untuk heading

DS Components: `Container`, `Divider`, `Stack`, `Icon`

## HelloWorld.vue (Orchestrator)

```vue
<script setup lang="ts">
import LandingHero from './landing/LandingHero.vue'
import LandingFeatures from './landing/LandingFeatures.vue'
import LandingStats from './landing/LandingStats.vue'
import LandingTestimonials from './landing/LandingTestimonials.vue'
import LandingPricing from './landing/LandingPricing.vue'
import LandingCTA from './landing/LandingCTA.vue'
import LandingFooter from './landing/LandingFooter.vue'
</script>

<template>
  <LandingHero />
  <LandingFeatures />
  <LandingStats />
  <LandingTestimonials />
  <LandingPricing />
  <LandingCTA />
  <LandingFooter />
</template>
```

## DS Token Usage

Semua section harus pakai:
- **Colors:** `var(--color-primary)`, `var(--color-bg)`, `var(--color-bgSubtle)`, `var(--color-textHeading)`, `var(--color-textPrimary)`, `var(--color-textSecondary)`
- **Spacing:** Tailwind spacing scale yang sudah di-configure di DS
- **Typography:** Font family dari DS (`font-display`, `font-ui`), font sizes dari token scale
- **Radius:** `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-xl)`
- **Shadows:** DS shadow tokens (`shadow-sm`, `shadow-md`)
- **Components:** Button, Card, Badge, Avatar, Icon, Container, Stack, Divider, Navbar

## Responsive Breakpoints

Mengikuti DS breakpoints:
- **Mobile (< 768px):** Single column, reduced font sizes, stacked stats
- **Tablet (768-1024px):** 2 kolom grids
- **Desktop (> 1024px):** Full layout 3-4 kolom

## Out of Scope

- Routing / multi-page setup
- Real content / copywriting
- Animasi kompleks selain counter
- Dark mode untuk landing page (pakai light mode saja)
- Backend integration
