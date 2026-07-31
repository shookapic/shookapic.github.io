import { useTranslation } from 'react-i18next'
import { LOCALES } from '../i18n.ts'
import { useContent } from './useContent.ts'

export default function LangToggle() {
  const { i18n } = useTranslation()
  const { ui } = useContent()
  const current = i18n.resolvedLanguage ?? 'en'

  return (
    <div className="lang" role="group" aria-label={ui.language}>
      {LOCALES.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`lang-btn${current === lng ? ' is-active' : ''}`}
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          lang={lng}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
