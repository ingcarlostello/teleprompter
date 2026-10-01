import { useCallback, useEffect, useState } from 'react'
import { DICTIONARIES } from '@/i18n/dictionaries'
import type { Dictionary, Language } from '@/types/i18n.types'
import { detectBrowserLanguage, toggleLanguageValue } from '@/utils/language'

export interface LanguageControls {
  language: Language
  labels: Dictionary
  toggleLanguage: () => void
}

export const useLanguage = (initialLanguage?: Language): LanguageControls => {
  const [language, setLanguage] = useState<Language>(
    () => initialLanguage ?? detectBrowserLanguage(),
  )

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = useCallback(() => setLanguage(toggleLanguageValue), [])

  return { language, labels: DICTIONARIES[language], toggleLanguage }
}
