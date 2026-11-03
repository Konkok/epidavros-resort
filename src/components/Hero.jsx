import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ESTATE_TOUR_URL } from '../config'
import TourModal from './TourModal'
import VideoModal from './VideoModal'
import { mediaUrl, VIDEOS } from '../media'
import './styling/Hero.css'

// Widths generated into /public alongside the preload hints in index.html.
const POSTER_SRCSET = (ext) =>
  `/hero-poster-800.${ext} 800w, /hero-poster-1200.${ext} 1200w, /hero-poster.${ext} 1672w`

export default function Hero() {
  const { t } = useTranslation()
  const [tourOpen, setTourOpen] = useState(false)
  const [filmOpen, setFilmOpen] = useState(false)
  // The background video is only attached after load — see below.
  const [videoSrc, setVideoSrc] = useState(null)
  const videoRef = useRef(null)

  /*
   * The promo video is far larger than the poster. With autoPlay and no
   * preload hint the browser starts buffering it immediately and it competes
   * with the poster for bandwidth, which pushed desktop LCP past 4s (mobile
   * was unaffected because mobile browsers throttle autoplay buffering).
   * So: don't give the element a src until the page has finished loading,
   * and skip the video entirely when the user can't or doesn't want it.
   */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const conn = navigator.connection
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType || '')) return

    let cancelled = false
    const attach = () => {
      const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
      idle(() => {
        // Phones get the 720p encode: same look on a small screen at half the bytes.
        const small = window.matchMedia('(max-width: 900px)').matches
        if (!cancelled) setVideoSrc(mediaUrl(small ? VIDEOS.heroLoopSmall : VIDEOS.heroLoop))
      })
    }

    if (document.readyState === 'complete') attach()
    else window.addEventListener('load', attach, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('load', attach)
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
        {/* Always-visible static fallback — this is the LCP element.
            Preloaded in index.html; keep the sources in sync with it. */}
        <picture>
          <source type="image/avif" srcSet={POSTER_SRCSET('avif')} sizes="100vw" />
          <source type="image/webp" srcSet={POSTER_SRCSET('webp')} sizes="100vw" />
          <img
            className="hero__poster"
            src="/hero-poster.jpg"
            srcSet={POSTER_SRCSET('jpg')}
            sizes="100vw"
            width="1672"
            height="941"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        {videoSrc && (
          <video
            ref={videoRef}
            className="hero__video"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={(e) => e.currentTarget.classList.add('is-ready')}
          />
        )}
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
          src={mediaUrl(VIDEOS.promo)}
          poster="/hero-poster-1200.jpg"
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
