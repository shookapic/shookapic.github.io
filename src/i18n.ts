import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './data/content.en.ts'
import fr from './data/content.fr.ts'

export const locales = { en, fr }
export type Locale = keyof typeof locales
export const LOCALES: Locale[] = ['en', 'fr']

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value)
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // The bundles double as i18next resources, so t('ui.copy') works, and as
    // typed objects the components read structured content from directly.
    resources: { en: { translation: en }, fr: { translation: fr } },
    fallbackLng: 'en',
    supportedLngs: LOCALES,
    // 'fr-FR' and friends should resolve to 'fr', not fall back to English.
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

const applyLang = (lng: string) => {
  document.documentElement.lang = isLocale(lng) ? lng : 'en'
}
applyLang(i18n.resolvedLanguage ?? 'en')
i18n.on('languageChanged', applyLang)

export default i18n
