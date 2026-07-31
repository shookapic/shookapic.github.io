import { useTranslation } from 'react-i18next'
import type { Content } from '../data/types.ts'
import { isLocale, locales, type Locale } from '../i18n.ts'

/** The active language, narrowed to one we actually ship. */
export function useLocale(): Locale {
  const { i18n } = useTranslation()
  const lng = i18n.resolvedLanguage ?? 'en'
  return isLocale(lng) ? lng : 'en'
}

/**
 * The active locale's content bundle. i18next owns the language (detection,
 * persistence, the <html lang> attribute); this just hands back the matching
 * typed object so components keep full type-checking on structured content.
 */
export function useContent(): Content {
  return locales[useLocale()]
}
