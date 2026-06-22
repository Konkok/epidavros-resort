import { useTranslation } from 'react-i18next'
import './styling/Testimonials.css'

const reviews = [
  {
    id: 1,
    name: 'Asli',
    origin: 'Netherlands',
    source: 'Booking.com',
    sourceColor: '#003580',
    sourceUrl: 'https://www.booking.com/hotel/gr/rodia-eco-stay-house-in-epidavros-akros-estate-nea-epidavros.en-gb.html?aid=1610684&label=rodhia-6qDhKcLl0F%2AuOwwqxZ94RgS626027454207%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-484199431665%3Alp9067676%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YfqnDqqG8nt10AsofPfvtt0&sid=aa547dafa7de373f44f65d818b14f41d&all_sr_blocks=900097901_396219092_4_0_0&checkin=2026-08-13&checkout=2026-08-16&dest_id=9000979&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=900097901_396219092_4_0_0&hpos=1&matching_block_id=900097901_396219092_4_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=900097901_396219092_4_0_0__82952&srepoch=1781285949&srpvid=52a97c1b067d01bc&type=total&ucfs=1&#tab-reviews',
    avatar: 'A',
    textKey: 'r1text',
  },
  { id: 2, name: 'Konstantinos Kokkinis', origin: 'Greece', source: 'Google', sourceColor: '#4285f4', sourceUrl: 'https://maps.app.goo.gl/dAc7T6Uor6busU2WA', avatar: 'K', textKey: 'r2text' },
  { id: 3, name: 'James & Laura', origin: 'London, UK',   source: 'TripAdvisor', sourceColor: '#00aa6c', sourceUrl: 'https://www.tripadvisor.com/Hotel_Review-g815573-d10350184-Reviews-Epidavros_Villas-Epidavros_Argolis_Region_Peloponnese.html', avatar: 'J', textKey: 'r3text' },
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
                {r.sourceUrl ? (
                  <a
                    href={r.sourceUrl}
                    className="testimonial-card__source"
                    style={{ color: r.sourceColor }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {r.source}
                  </a>
                ) : (
                  <span className="testimonial-card__source" style={{ color: r.sourceColor }}>
                    {r.source}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
