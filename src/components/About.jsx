import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ESTATE_TOUR_URL } from '../config'
import TourModal from './TourModal'
import './styling/About.css'

export default function About() {
  const [tourOpen, setTourOpen] = useState(false)
  const { t } = useTranslation()

  const features = [
    { icon: '🌊', key: 'feature1' },
    { icon: '🍋', key: 'feature2' },
    { icon: '🎭', key: 'feature3' },
    { icon: '🚣', key: 'feature4' },
  ]

  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <div className="about__images">
          <div className="about__img-main">
            <img
              src="https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/General-View-of-Elia-rental-residence.jpg"
              alt="Elia villa at Akros Eco Estate"
              loading="lazy"
            />
          </div>
          <div className="about__img-accent">
            <img
              src="https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/Church-Akros-Eco-Estate-3.jpg"
              alt="Chapel at Akros Eco Estate"
              loading="lazy"
            />
            <div className="about__badge">
              <span className="about__badge-year">{t('about.established')}</span>
              <span className="about__badge-num">1998</span>
            </div>
          </div>
        </div>

        <div className="about__text">
          <span className="section-label">{t('about.label')}</span>
          <h2 className="section-title">
            {t('about.title1')}<br />{t('about.title2')}
          </h2>
          <p className="about__body">{t('about.body1')}</p>
          <p className="about__body">{t('about.body2')}</p>

          <div className="about__features">
            {features.map(f => (
              <div key={f.key} className="about__feature">
                <span className="about__feature-icon">{f.icon}</span>
                <span className="about__feature-label">{t(`about.${f.key}`)}</span>
              </div>
            ))}
          </div>

          <button className="about__tour-btn" onClick={() => setTourOpen(true)}>
            <svg className="about__tour-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M3 12c2.5-4 5.5-6 9-6s6.5 2 9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M3 12c2.5 4 5.5 6 9 6s6.5-2 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            {t('about.tourBtn')}
          </button>
        </div>
      </div>

      {tourOpen && (
        <TourModal
          roomName={t('about.tourModalTitle')}
          url={ESTATE_TOUR_URL}
          onClose={() => setTourOpen(false)}
        />
      )}
    </section>
  )
}
