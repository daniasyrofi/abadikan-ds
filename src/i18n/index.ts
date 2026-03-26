import { createI18n } from 'vue-i18n'
import type { MessageSchema } from './types'
import id from './locales/id'
import en from './locales/en'

type SupportedLocale = 'id' | 'en'

const savedLocale = (localStorage.getItem('ds-locale') as SupportedLocale) ?? 'id'

export const i18n = createI18n<[MessageSchema], SupportedLocale>({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { id, en },
})

// Persist locale changes
i18n.global.locale.value = savedLocale
