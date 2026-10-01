import type { Dictionary, Language } from '@/types/i18n.types'
import { en } from './en'
import { es } from './es'

export const DICTIONARIES: Record<Language, Dictionary> = { en, es }

export const LANGUAGE_LABELS: Record<Language, string> = { en: 'EN', es: 'ES' }
