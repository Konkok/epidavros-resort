import { useTranslation } from 'react-i18next'
import './styling/Hero.css'

export default function Hero() {
  const { t } = useTranslation()

  const scrollToIframe = (e) => {
    e.preventDefault()
    const target =
      document.querySelector('.booking-search__iframe-wrap') ||
      document.querySelector('.booking-search__iframe') ||
      document.getElementById('availability')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="home" className="hero">
      <div className="hero__bg" />
      <div className="hero__grain" />

      <div className="hero__content container">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-bar" aria-hidden="true" />
          <span className="hero__eyebrow-text">{t('hero.label')}</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-row hero__title-row--bold">{t('hero.title1')}</span>
          <em className="hero__title-row hero__title-row--italic">{t('hero.title2')}</em>
        </h1>

        <div className="hero__rule" aria-hidden="true" />

        <p className="hero__subtitle">{t('hero.subtitle')}</p>

        <div className="hero__actions">
          <a href="#rooms" className="hero__cta hero__cta--primary">
            {t('hero.exploreVillas')}
            <svg className="hero__cta-arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </a>
          <a href="#availability" className="hero__cta hero__cta--ghost" onClick={scrollToIframe}>{t('hero.bookStay')}</a>
        </div>

        <div className="hero__stats" role="list" aria-label="Resort highlights">
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-number">{t('hero.stat1Value')}</span>
            <span className="hero__stat-label">{t('hero.stat1Label')}</span>
          </div>
          <div className="hero__stat-sep" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-number">{t('hero.stat2Value')}</span>
            <span className="hero__stat-label">{t('hero.stat2Label')}</span>
          </div>
          <div className="hero__stat-sep" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <span className="hero__stat-number">{t('hero.stat3Value')}</span>
            <span className="hero__stat-label">{t('hero.stat3Label')}</span>
          </div>
        </div>
      </div>

      <div className="hero__location">
        <svg className="hero__location-pin" viewBox="0 0 12 16" aria-hidden="true">
          <path d="M6 0C2.69 0 0 2.69 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.31-2.69-6-6-6zm0 8.5C4.62 8.5 3.5 7.38 3.5 6S4.62 3.5 6 3.5 8.5 4.62 8.5 6 7.38 8.5 6 8.5z" fill="currentColor"/>
        </svg>
        <span>Nea Epidavros, Greece</span>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
        <span className="hero__scroll-text">Scroll</span>
      </a>
    </section>
  )
}
