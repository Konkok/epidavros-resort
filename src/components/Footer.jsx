import { useTranslation } from 'react-i18next'
import {
  SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, SOCIAL_TIKTOK,
  CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS,
} from '../config'
import { rooms } from '../config'
import './styling/Footer.css'

const SOCIALS = [
  {
    label: 'Facebook',
    href: SOCIAL_FACEBOOK,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: SOCIAL_INSTAGRAM,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: SOCIAL_TIKTOK,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.79a8.18 8.18 0 0 0 4.79 1.53V6.87a4.85 4.85 0 0 1-1.02-.18z"/>
      </svg>
    ),
  },
]

const NAV_KEYS = ['home', 'about', 'amenities', 'gallery', 'contact']

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <span className="footer__logo-icon">&#9670;</span>
            <span className="footer__logo-name">Epidavros Resort</span>
          </a>
          <p className="footer__tagline">{t('footer.tagline')}</p>
          <div className="footer__socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className="footer__social"
                 aria-label={s.label} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">{t('footer.navigate')}</h4>
            <ul>
              {NAV_KEYS.map(k => (
                <li key={k}><a href={`#${k}`}>{t(`nav.${k}`)}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">{t('footer.ourVillas')}</h4>
            <ul>
              {rooms.map(r => (
                <li key={r.id}><a href="#rooms">{r.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">{t('footer.contactTitle')}</h4>
            <ul className="footer__contact-list">
              <li>📍 {CONTACT_ADDRESS}</li>
              <li>📞 {CONTACT_PHONE}</li>
              <li>✉️ {CONTACT_EMAIL}</li>
              <li>🕐 {t('footer.openYearRound')}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>{t('footer.copyright', { year })}</span>
          <div className="footer__bottom-links">
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
            <a href="#">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
