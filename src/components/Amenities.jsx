import { useTranslation } from 'react-i18next'
import './styling/Amenities.css'

const AMENITY_KEYS = ['pool', 'restaurant', 'spa', 'boat', 'theatre', 'bike', 'cooking', 'wifi']
const AMENITY_ICONS = {
  pool: '🏊', restaurant: '🍽️', spa: '💆', boat: '🚤',
  theatre: '🎭', bike: '🚲', cooking: '🍳', wifi: '📶',
}

export default function Amenities() {
  const { t } = useTranslation()

  return (
    <section id="amenities" className="amenities section">
      <div className="container">
        <div className="amenities__header">
          <span className="section-label">{t('amenities.label')}</span>
          <h2 className="section-title">{t('amenities.title')}</h2>
          <p className="section-subtitle">{t('amenities.subtitle')}</p>
        </div>

        <div className="amenities__grid">
          {AMENITY_KEYS.map(key => (
            <div key={key} className="amenity-item">
              <div className="amenity-item__icon">{AMENITY_ICONS[key]}</div>
              <h3 className="amenity-item__title">{t(`amenities.${key}.title`)}</h3>
              <p className="amenity-item__desc">{t(`amenities.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
