import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  trackingEnabled, getConsent, setConsent, pageView, OPEN_COOKIE_SETTINGS,
} from '../tracking'
import './styling/CookieConsent.css'

// Asks before any ad tracking loads. Hidden when no tracking ID is configured.
// The footer's "Cookie Policy" link reopens it so visitors can change their mind.
export default function CookieConsent() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!trackingEnabled) return
    if (getConsent() === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen)
  }, [])

  if (!open) return null

  const choose = (value) => {
    setConsent(value)
    setOpen(false)
    if (value === 'granted') pageView() // count the page they accepted on
  }

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label={t('cookies.title')}>
      <p className="cookie-consent__text">{t('cookies.text')}</p>
      <div className="cookie-consent__actions">
        <button className="btn cookie-consent__reject" onClick={() => choose('denied')}>
          {t('cookies.reject')}
        </button>
        <button className="btn btn-primary" onClick={() => choose('granted')}>
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  )
}
