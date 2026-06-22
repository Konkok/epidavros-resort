import { useTranslation } from 'react-i18next'
import './styling/About.css'

export default function About() {
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

        </div>
      </div>
    </section>
  )
}
