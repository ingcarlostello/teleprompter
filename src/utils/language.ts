import type { Language } from '@/types/i18n.types'

export const detectBrowserLanguage = (fallback: Language = 'en'): Language => {
  if (typeof navigator === 'undefined') return fallback
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export const toggleLanguageValue = (language: Language): Language =>
  language === 'en' ? 'es' : 'en'
