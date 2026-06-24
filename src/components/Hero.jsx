import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ESTATE_TOUR_URL } from '../config'
import TourModal from './TourModal'
import VideoModal from './VideoModal'
import promoVideo from '../assets/Epidavros mp4 Promo Video.mp4'
import homePoster from '../assets/Home.png'
import './styling/Hero.css'

export default function Hero() {
  const { t } = useTranslation()
  const [tourOpen, setTourOpen] = useState(false)
  const [filmOpen, setFilmOpen] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause()
    }
  }, [])

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

      {/* Video background */}
      <div className="hero__media">
        {/* Always-visible static fallback — shown before video loads */}
        <img
          className="hero__poster"
          src={homePoster}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
        />
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={promoVideo} type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlay (previously on hero__bg) */}
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

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
          <button className="hero__cta hero__cta--ghost hero__cta--tour" onClick={() => setTourOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="15" height="15">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M3 12c2.5-4 5.5-6 9-6s6.5 2 9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M3 12c2.5 4 5.5 6 9 6s6.5-2 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            {t('about.tourBtn')}
          </button>
          <button className="hero__watch-film" onClick={() => setFilmOpen(true)}>
            <span className="hero__watch-film-ring" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7z"/>
              </svg>
            </span>
            <span className="hero__watch-film-text">
              <span className="hero__watch-film-label">{t('hero.watchFilm')}</span>
              <span className="hero__watch-film-sub">{t('hero.watchFilmSub')}</span>
            </span>
          </button>
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

      {tourOpen && (
        <TourModal
          roomName={t('about.tourModalTitle')}
          url={ESTATE_TOUR_URL}
          onClose={() => setTourOpen(false)}
        />
      )}

      {filmOpen && (
        <VideoModal
          src={promoVideo}
          onClose={() => setFilmOpen(false)}
        />
      )}

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
        <span className="hero__scroll-text">Scroll</span>
      </a>
    </section>
  )
}
