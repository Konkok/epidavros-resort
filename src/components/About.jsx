import { useTranslation } from 'react-i18next'
import Img from './Img'
import './styling/About.css'

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <div className="about__images">
          <div className="about__img-main">
            <Img
              sizes="(max-width: 900px) 100vw, 45vw"
              src="images/properties/elia/General-View-of-Elia-rental-residence.jpg"
              alt="Elia villa at Akros Eco Estate"
            />
          </div>
          <div className="about__img-accent">
            <Img
              sizes="(max-width: 900px) 50vw, 20vw"
              src="images/general/Church-Akros-Eco-Estate-3.jpg"
              alt="Chapel at Akros Eco Estate"
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

        </div>
      </div>
    </section>
  )
}
