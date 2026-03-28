<template>
  <div class="welcome-container">
    <div class="sb-section-title">
      <h1>{{ $t('welcome.welcome_title') }}</h1>
      <p>{{ $t('welcome.welcome_subtitle') }}</p>
      <p>{{ $t('welcome.welcome_tech') }}</p>
    </div>

    <div class="sb-section">
      <div class="sb-section-item">
        <h4 class="sb-section-item-heading">🎨 {{ $t('welcome.visual_title') }}</h4>
        <p class="sb-section-item-paragraph" v-html="$t('welcome.visual_desc')"></p>
      </div>
      
      <div class="sb-section-item">
        <h4 class="sb-section-item-heading">🌐 {{ $t('welcome.i18n_title') }}</h4>
        <p class="sb-section-item-paragraph" v-html="$t('welcome.i18n_desc')"></p>
      </div>
    </div>

    <div class="sb-section-title" style="margin-top: 48px;">
      <h1>{{ $t('welcome.guide_title') }}</h1>
    </div>

    <div class="sb-features-grid">
      <div class="sb-grid-item">
        <h4 class="sb-section-item-heading">1. {{ $t('welcome.atomic_title') }}</h4>
        <p class="sb-section-item-paragraph" v-html="$t('welcome.atomic_desc')"></p>
      </div>

      <div class="sb-grid-item">
        <h4 class="sb-section-item-heading">2. {{ $t('welcome.controls_title') }}</h4>
        <p class="sb-section-item-paragraph" v-html="$t('welcome.controls_desc')"></p>
      </div>

      <div class="sb-grid-item">
        <h4 class="sb-section-item-heading">3. {{ $t('welcome.theme_title') }}</h4>
        <p class="sb-section-item-paragraph" v-html="$t('welcome.theme_desc')"></p>
      </div>

      <div class="sb-grid-item">
        <h4 class="sb-section-item-heading">4. {{ $t('welcome.a11y_title') }}</h4>
        <p class="sb-section-item-paragraph" v-html="$t('welcome.a11y_desc')"></p>
      </div>
    </div>
  </div>
</template>

<style>
  .welcome-container {
    padding-bottom: 48px;
    font-family: 'AbadikanSans', sans-serif;
  }

  .sb-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 24px;
    margin-top: 24px;
  }

  .sb-section-title {
    margin-bottom: 32px;
  }
  .sb-section-title h1 {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 16px;
  }
  .sb-section-title p {
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-secondary, #666);
    margin-bottom: 12px;
  }

  .sb-section-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #ddd);
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .sb-section-item-heading {
    padding-top: 0 !important;
    padding-bottom: 8px !important;
    margin: 0 !important;
    font-weight: 700;
  }

  .sb-section-item-paragraph {
    margin: 0;
    font-size: 14px;
    color: var(--color-text-secondary, #666);
    line-height: 1.6;
  }
  .sb-section-item-paragraph code {
    background: rgba(0,0,0,0.05);
    padding: 2px 4px;
    border-radius: 4px;
  }

  .sb-features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;
  }

  .sb-grid-item {
    display: flex;
    flex-direction: column;
    background: var(--color-surface, #fff);
    border: 1px solid var(--color-border, #ddd);
    padding: 24px;
    border-radius: 12px;
    transition: all 0.2s;
  }

  .sb-grid-item:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: #999;
  }

  /* Dark mode overrides (from manager) */
  [data-theme='dark'] .sb-section-item,
  [data-theme='dark'] .sb-grid-item {
    background: var(--color-surface-glass, #1a1a1a);
    border-color: var(--color-border, #333);
  }
  [data-theme='dark'] .sb-section-title p,
  [data-theme='dark'] .sb-section-item-paragraph {
    color: #999;
  }
  [data-theme='dark'] .sb-section-item-paragraph code {
    background: rgba(255,255,255,0.1);
  }

  @media screen and (max-width: 768px) {
    .sb-section, .sb-features-grid {
      flex-direction: column;
      grid-template-columns: 1fr;
    }
  }
</style>
