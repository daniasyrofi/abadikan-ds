<script setup lang="ts">
import '@/styles/landing.css'
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Textarea from '@/components/atoms/Textarea/Textarea.vue'
import SharedNavbar from '@/components/landing/shared/SharedNavbar.vue'
import SharedFloatingWA from '@/components/landing/shared/SharedFloatingWA.vue'
import LandingFooter from '@/components/landing/shared/LandingFooter.vue'

const WA_LINK = 'https://wa.me/6281234567890?text=Halo%20Abadikan%2C%20saya%20ingin%20tanya...'

// ── Form state ────────────────────────────────────────────────────────────────
const formNama = ref('')
const formEmail = ref('')
const formSubjek = ref('')
const formPesan = ref('')

function handleSubmit() {
  // Form submission placeholder
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────
const heroRef = ref<HTMLElement | null>(null)
const channelsRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const jamRef = ref<HTMLElement | null>(null)

useScrollReveal(heroRef)
useScrollReveal(channelsRef)
useScrollReveal(formRef)
useScrollReveal(jamRef)
</script>

<template>
  <div>
    <SharedNavbar />

    <!-- ── Mini Hero ──────────────────────────────────────────────────────────── -->
  <section ref="heroRef" class="landing-page-hero landing-reveal">
    <div class="landing-container--narrow" style="text-align: center;">
      <p class="landing-overline" style="margin-bottom: 0.75rem;">Kontak</p>
      <h1 class="landing-h2" style="color: var(--color-text-heading); margin-bottom: 1rem;">
        Hubungi Kami
      </h1>
      <p class="landing-subtitle" style="margin-inline: auto;">
        Tim kami siap membantu. Respons cepat, tidak bikin nunggu.
      </p>
    </div>
  </section>

  <!-- ── Contact Channels ───────────────────────────────────────────────────── -->
  <section ref="channelsRef" class="landing-section landing-reveal" style="background: var(--color-bg);">
    <div class="landing-container">
      <div class="channels-grid landing-reveal">

        <!-- Card 1: WhatsApp (Primary) -->
        <div class="channel-card channel-card--primary" data-reveal-child>
          <div class="channel-icon-wrap channel-icon-wrap--wa" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.7 2 12.04 2Zm5.52 14.41c-.23.65-1.35 1.24-1.84 1.28-.49.04-.48.37-3.05-.64-2.57-1.01-4.11-3.63-4.23-3.8-.12-.17-.97-1.28-.97-2.44s.61-1.73.83-1.97c.22-.24.47-.3.63-.3l.45.01c.14 0 .34-.05.53.4.19.45.65 1.57.71 1.68.06.11.1.24.02.38-.08.14-.12.22-.23.34l-.34.4c-.11.12-.23.25-.1.49.13.24.58 1 1.25 1.6.86.76 1.58 1 1.82 1.11.24.11.38.09.52-.05.14-.14.59-.69.75-.93.16-.24.32-.2.54-.12.22.08 1.39.65 1.63.77.24.12.4.18.46.28.06.1.06.55-.17 1.2Z"/>
            </svg>
          </div>
          <div class="channel-body">
            <p class="channel-title">WhatsApp <span class="channel-badge">Diutamakan</span></p>
            <p class="channel-desc">Chat langsung, respons dalam hitungan menit. Tim kami aktif 7 hari seminggu.</p>
            <p class="channel-sub">Senin–Sabtu, 09:00–21:00 WIB</p>
          </div>
          <Button
            variant="primary"
            size="md"
            as="a"
            :href="WA_LINK"
            target="_blank"
            rel="noopener noreferrer"
            style="align-self: flex-start;"
          >
            Chat Sekarang →
          </Button>
        </div>

        <!-- Card 2: Email -->
        <div class="channel-card" data-reveal-child>
          <div class="channel-icon-wrap" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/>
            </svg>
          </div>
          <div class="channel-body">
            <p class="channel-title">Email</p>
            <p class="channel-desc">Untuk pertanyaan tertulis atau lampiran dokumen.</p>
            <a href="mailto:support@abadikan.id" class="channel-contact">support@abadikan.id</a>
          </div>
          <Button
            variant="outline"
            size="md"
            as="a"
            href="mailto:support@abadikan.id"
            style="align-self: flex-start;"
          >
            Kirim Email →
          </Button>
        </div>

        <!-- Card 3: Instagram -->
        <div class="channel-card" data-reveal-child>
          <div class="channel-icon-wrap channel-icon-wrap--ig" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>
            </svg>
          </div>
          <div class="channel-body">
            <p class="channel-title">Instagram DM</p>
            <p class="channel-desc">Follow kami dan kirim DM untuk pertanyaan cepat.</p>
            <a href="https://instagram.com/abadikan.id" target="_blank" rel="noopener noreferrer" class="channel-contact">@abadikan.id</a>
          </div>
          <Button
            variant="outline"
            size="md"
            as="a"
            href="https://instagram.com/abadikan.id"
            target="_blank"
            rel="noopener noreferrer"
            style="align-self: flex-start;"
          >
            DM Kami →
          </Button>
        </div>

      </div>
    </div>
  </section>

  <!-- ── Contact Form ───────────────────────────────────────────────────────── -->
  <section ref="formRef" class="landing-section landing-reveal" style="background: var(--color-bg-subtle);">
    <div class="landing-container--narrow">
      <h2 class="landing-h2" style="color: var(--color-text-heading); text-align: center; margin-bottom: 0.75rem;">
        Atau Kirim Pesan
      </h2>
      <p class="landing-subtitle" style="text-align: center; margin-inline: auto; margin-bottom: 2.5rem;">
        Isi form di bawah dan kami akan membalas dalam 1x24 jam.
      </p>

      <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
        <Input
          v-model="formNama"
          label="Nama Lengkap"
          placeholder="Masukkan nama kamu"
        />
        <Input
          v-model="formEmail"
          label="Email"
          type="email"
          placeholder="nama@email.com"
        />
        <Input
          v-model="formSubjek"
          label="Subjek"
          placeholder="Tentang apa pertanyaanmu?"
        />
        <Textarea
          v-model="formPesan"
          label="Pesan"
          placeholder="Tulis pesanmu di sini..."
          :rows="5"
        />

        <Button variant="primary" size="lg" type="submit" :full-width="true">
          Kirim Pesan
        </Button>

        <p class="form-note">
          Data kamu aman dan tidak akan dibagikan ke pihak ketiga.
        </p>
      </form>
    </div>
  </section>

  <!-- ── Jam Operasional ────────────────────────────────────────────────────── -->
  <section
    ref="jamRef"
    class="landing-reveal"
    style="padding-block: clamp(48px, 8vh, 80px); background: var(--color-bg);"
  >
    <div class="landing-container--narrow">
      <div class="jam-card">
        <div class="jam-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm.5 10.7V7a.5.5 0 0 0-1 0v6l4.28 2.54a.5.5 0 0 0 .5-.86L12.5 12.7Z"/>
          </svg>
        </div>
        <h3 class="jam-title">Jam Operasional</h3>
        <div class="jam-rows">
          <div class="jam-row">
            <span class="jam-day">Senin–Jumat</span>
            <span class="jam-time">09:00 – 21:00 WIB</span>
          </div>
          <div class="jam-row">
            <span class="jam-day">Sabtu</span>
            <span class="jam-time">09:00 – 18:00 WIB</span>
          </div>
          <div class="jam-row">
            <span class="jam-day">Minggu</span>
            <span class="jam-time">10:00 – 16:00 WIB</span>
          </div>
        </div>
        <p class="jam-note">
          Di luar jam operasional, pesan tetap masuk dan akan dibalas pagi harinya.
        </p>
      </div>
    </div>
  </section>

    <LandingFooter />
    <SharedFloatingWA />
  </div>
</template>

<style scoped>
/* ── Channels grid ── */
.channels-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .channels-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .channels-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.channel-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.channel-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.channel-card--primary {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm), 0 0 0 1px var(--color-primary);
}

.channel-card--primary:hover {
  box-shadow: var(--shadow-md), 0 0 0 1px var(--color-primary);
}

.channel-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  background: var(--color-bg-subtle);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.channel-icon-wrap--wa {
  background: #dcfce7;
  color: #15803d;
}

.channel-icon-wrap--ig {
  background: #fce7f3;
  color: #be185d;
}

.channel-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.channel-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.channel-badge {
  font-family: var(--font-ui);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-primary);
  background: color-mix(in oklch, var(--color-primary) 12%, transparent);
  border-radius: 999px;
  padding: 0.15em 0.6em;
}

.channel-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
}

.channel-sub {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.channel-contact {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  margin-top: 0.15rem;
  transition: opacity 0.15s;
}

.channel-contact:hover {
  opacity: 0.75;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ── Contact Form ── */
.contact-form {
  max-width: 640px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-note {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;
}

/* ── Jam Operasional ── */
.jam-card {
  max-width: 480px;
  margin-inline: auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.jam-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  background: color-mix(in oklch, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.jam-title {
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text-heading);
  margin: 0;
}

.jam-rows {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.jam-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid var(--color-border);
}

.jam-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.jam-day {
  font-size: 0.875rem;
  color: var(--color-text-primary);
  font-weight: 500;
}

.jam-time {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-heading);
}

.jam-note {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  padding-top: 0.25rem;
  border-top: 1px solid var(--color-border);
}
</style>
