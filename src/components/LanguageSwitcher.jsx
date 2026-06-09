import { useTranslation } from 'react-i18next'
import './styling/LanguageSwitcher.css'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'el', label: 'ΕΛ' },
  { code: 'de', label: 'DE' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language?.split('-')[0] || 'en'

  return (
    <div className="lang-switcher" role="group" aria-label="Language selection">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          className={`lang-switcher__btn ${current === code ? 'lang-switcher__btn--active' : ''}`}
          onClick={() => i18n.changeLanguage(code)}
          aria-label={`Switch to ${label}`}
          aria-pressed={current === code}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
