import { useTranslation } from 'react-i18next'
import './styling/Testimonials.css'

const reviews = [
  { id: 1, name: 'Alexandra & Nikos', origin: 'Athens, Greece',  source: 'Booking.com',  sourceColor: '#003580', avatar: 'A', textKey: 'r1text' },
  { id: 2, name: 'Sophie & Marc',     origin: 'Lyon, France',    source: 'Google',        sourceColor: '#4285f4', avatar: 'S', textKey: 'r2text' },
  { id: 3, name: 'James & Laura',     origin: 'London, UK',      source: 'TripAdvisor',   sourceColor: '#00aa6c', avatar: 'J', textKey: 'r3text' },
]

export default function Testimonials() {
  const { t } = useTranslation()

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="testimonials__header">
          <span className="section-label">{t('testimonials.label')}</span>
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-subtitle">{t('testimonials.subtitle')}</p>
        </div>

        <div className="testimonials__grid">
          {reviews.map(r => (
            <article key={r.id} className="testimonial-card">
              <div className="testimonial-card__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="testimonial-card__star">★</span>
                ))}
              </div>
              <blockquote className="testimonial-card__quote">
                "{t(`testimonials.${r.textKey}`)}"
              </blockquote>
              <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar">{r.avatar}</div>
                <div className="testimonial-card__author">
                  <strong>{r.name}</strong>
                  <span>{r.origin}</span>
                </div>
                <span className="testimonial-card__source" style={{ color: r.sourceColor }}>
                  {r.source}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
