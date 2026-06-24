import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AMENITY_KEY_MAP, SAFETY_KEY_MAP, WELCOME_KEY_MAP, FAMILY_KEY_MAP } from '../config'
import TourModal from './TourModal'
import './styling/VillaPage.css'

const AMENITY_ICONS = {
  privateBalcony: '🌅', seaView: '🌊', kingBed: '🛏️', soakingTub: '🛁',
  airConditioning: '❄️', miniBar: '🍷', privateTerrace: '🌿', gardenView: '🌸',
  queenBed: '🛏️', rainShower: '🚿', safe: '🔒', doubleBed: '🛏️',
  enSuiteBathroom: '🚿', flatScreenTV: '📺', wifi: '📶', balcony: '🌅',
  twoBedrooms: '🏠', livingArea: '🛋️', largeTerrace: '🌿', kitchenette: '🍳',
  poolAccess: '🏊', privatePatio: '☀️', stoneWalls: '🏛️', outdoorShower: '🚿',
  privatePlungePool: '🏊', panoramicViews: '🌅', gourmetKitchen: '👨‍🍳',
  butlerService: '🛎️', premiumBar: '🍸', jacuzzi: '♨️',
  fullKitchen: '🍳', washingMachine: '👕', sharedPool: '🏊', privateParking: '🚗',
}

const familyIcon = (item) => {
  const s = item.toLowerCase()
  if (s.includes('crib') || s.includes('baby')) return '🛏️'
  if (s.includes('chair')) return '🪑'
  return '👶'
}

const safetyIcon = (item) => {
  const s = item.toLowerCase()
  if (s.includes('smoke')) return '🔥'
  if (s.includes('fire')) return '🧯'
  if (s.includes('first aid')) return '🩹'
  if (s.includes('camera')) return '📹'
  return '🛡️'
}

const welcomeIcon = (item) => {
  const s = item.toLowerCase()
  if (s.includes('wine')) return '🍷'
  if (s.includes('water')) return '💧'
  if (s.includes('coffee') || s.includes('nespresso')) return '☕'
  if (s.includes('tea')) return '🫖'
  return '🎁'
}

export default function VillaPage({ room, onBack }) {
  const { t } = useTranslation()
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [tourOpen, setTourOpen] = useState(false)

  const goToBooking = (e) => {
    e.preventDefault()
    onBack()
    setTimeout(() => {
      const target =
        document.querySelector('.booking-search__iframe-wrap') ||
        document.querySelector('.booking-search__iframe') ||
        document.getElementById('availability')
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
  }

  const photos = room.photos || [{ src: room.image, alt: room.name }]

  const go = useCallback(dir =>
    setActiveIdx(i => (i + dir + photos.length) % photos.length),
    [photos.length]
  )

  // Scroll to top on mount, restore on unmount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = e => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, go])

  return (
    <div className="villa-page">
      {/* Sticky top bar */}
      <div className="villa-page__topbar">
        <button className="villa-page__back" onClick={onBack}>
          ← {t('rooms.backToVillas')}
        </button>
        <a href="#availability" className="btn btn-primary villa-page__book-btn" onClick={goToBooking}>
          {t('rooms.bookNow')}
        </a>
      </div>

      <div className="villa-page__container">

        {/* Hero gallery */}
        <div className="villa-page__gallery">
          {/* Main photo */}
          <div className="villa-page__main-photo" onClick={() => setLightboxOpen(true)}>
            <img src={photos[activeIdx].src} alt={photos[activeIdx].alt} />
            <div className="villa-page__main-overlay">
              <span className="villa-page__view-all">
                📷 {t('rooms.viewAll', { count: photos.length })}
              </span>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="villa-page__thumbstrip">
            {photos.map((p, i) => (
              <button
                key={i}
                className={`villa-page__thumb ${i === activeIdx ? 'villa-page__thumb--active' : ''}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`View photo ${i + 1}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="villa-page__content">

          {/* Left: details */}
          <div className="villa-page__details">
            <div className="villa-page__title-row">
              <div>
                <span className="section-label">{t(`rooms.category.${room.category.toLowerCase()}`, room.category)}</span>
                <h1 className="villa-page__title">{room.name}</h1>
                <p className="villa-page__subtitle">{t(`rooms.villas.${room.villaKey}.subtitle`, '')}</p>
              </div>
              {room.badge && <span className="villa-page__badge">{room.badge}</span>}
            </div>

            {/* Stats row */}
            <div className="villa-page__stats">
              <div className="villa-page__stat">
                <span className="villa-page__stat-icon">📐</span>
                <div>
                  <span className="villa-page__stat-value">{room.size}</span>
                  <span className="villa-page__stat-label">{t('rooms.statSize')}</span>
                </div>
              </div>
              <div className="villa-page__stat">
                <span className="villa-page__stat-icon">👤</span>
                <div>
                  <span className="villa-page__stat-value">{room.capacity}</span>
                  <span className="villa-page__stat-label">{t('rooms.statGuests')}</span>
                </div>
              </div>
              {room.bedrooms != null && (
                <div className="villa-page__stat">
                  <span className="villa-page__stat-icon">🛏</span>
                  <div>
                    <span className="villa-page__stat-value">{room.bedrooms}</span>
                    <span className="villa-page__stat-label">{t('booking.bedroom', { count: room.bedrooms })}</span>
                  </div>
                </div>
              )}
              {room.bathrooms != null && (
                <div className="villa-page__stat">
                  <span className="villa-page__stat-icon">🚿</span>
                  <div>
                    <span className="villa-page__stat-value">{room.bathrooms}</span>
                    <span className="villa-page__stat-label">{t('booking.bathroom', { count: room.bathrooms })}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="villa-page__section">
              <h3 className="villa-page__section-title">{t('rooms.aboutVilla')}</h3>
              <p className="villa-page__desc">{t(`rooms.villas.${room.villaKey}.description`, '')}</p>
            </div>

            {/* Amenities */}
            <div className="villa-page__section">
              <h3 className="villa-page__section-title">{t('rooms.amenitiesTitle')}</h3>
              <div className="villa-page__amenities">
                {room.amenities.map(a => {
                  const key = AMENITY_KEY_MAP[a] || null
                  return (
                    <div key={a} className="villa-page__amenity">
                      <span className="villa-page__amenity-icon">
                        {(key && AMENITY_ICONS[key]) || '✓'}
                      </span>
                      <span>{key ? t(`rooms.amenity.${key}`, a) : a}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Views */}
            <div className="villa-page__section">
              <h3 className="villa-page__section-title">{t('rooms.viewsTitle')}</h3>
              <div className="villa-page__views">
                {['🌊 Sea View', '🌿 Garden View', '🏔️ Mountain View', '🌄 Valley View'].map(v => (
                  <span key={v} className="villa-page__view-tag">{v}</span>
                ))}
                <span className="villa-page__view-tag">🏖️ {t('rooms.beachAccess')}</span>
              </div>
            </div>

            {/* Family Friendly */}
            {room.familyFriendly?.length > 0 && (
              <div className="villa-page__section">
                <h3 className="villa-page__section-title">{t('rooms.familyTitle')}</h3>
                <div className="villa-page__amenities">
                  {room.familyFriendly.map(item => {
                    const key = FAMILY_KEY_MAP[item]
                    return (
                      <div key={item} className="villa-page__amenity">
                        <span className="villa-page__amenity-icon">{familyIcon(item)}</span>
                        <span>{key ? t(`rooms.familyItems.${key}`, item) : item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Safety */}
            {room.safety?.length > 0 && (
              <div className="villa-page__section">
                <h3 className="villa-page__section-title">{t('rooms.safetyTitle')}</h3>
                <div className="villa-page__amenities">
                  {room.safety.map(item => {
                    const key = SAFETY_KEY_MAP[item]
                    return (
                      <div key={item} className="villa-page__amenity">
                        <span className="villa-page__amenity-icon">{safetyIcon(item)}</span>
                        <span>{key ? t(`rooms.safetyItems.${key}`, item) : item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Welcome Amenities */}
            {room.welcomeAmenities?.length > 0 && (
              <div className="villa-page__section">
                <h3 className="villa-page__section-title">{t('rooms.welcomeTitle')}</h3>
                <div className="villa-page__amenities">
                  {room.welcomeAmenities.map(item => {
                    const key = WELCOME_KEY_MAP[item]
                    return (
                      <div key={item} className="villa-page__amenity">
                        <span className="villa-page__amenity-icon">{welcomeIcon(item)}</span>
                        <span>{key ? t(`rooms.welcomeItems.${key}`, item) : item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: price + CTA card */}
          <div className="villa-page__sidebar">
            <div className="villa-page__price-card">
              <a href="#availability" className="btn btn-accent villa-page__cta" onClick={goToBooking}>
                {t('rooms.checkAvailability')}
              </a>
              {room.tourUrl && (
                <button className="villa-page__tour-btn" onClick={() => setTourOpen(true)}>
                  <svg className="villa-page__tour-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M3 12c2.5-4 5.5-6 9-6s6.5 2 9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M3 12c2.5 4 5.5 6 9 6s6.5-2 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                  {t('rooms.explore360')}
                </button>
              )}
              <a href="#contact" className="btn btn-outline villa-page__cta-secondary" onClick={onBack}>
                {t('rooms.enquire')}
              </a>
              <ul className="villa-page__perks">
                <li>✓ {t('rooms.perk1')}</li>
                <li>✓ {t('rooms.perk2')}</li>
                <li>✓ {t('rooms.perk3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="villa-page__lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="villa-page__lb-close" onClick={() => setLightboxOpen(false)}>✕</button>
          <button className="villa-page__lb-nav villa-page__lb-nav--prev" onClick={e => { e.stopPropagation(); go(-1) }}>‹</button>
          <div className="villa-page__lb-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={photos[activeIdx].src} alt={photos[activeIdx].alt} />
            <p className="villa-page__lb-caption">{photos[activeIdx].alt} · {activeIdx + 1} / {photos.length}</p>
          </div>
          <button className="villa-page__lb-nav villa-page__lb-nav--next" onClick={e => { e.stopPropagation(); go(1) }}>›</button>
        </div>
      )}

      {tourOpen && room.tourUrl && <TourModal roomName={room.name} url={room.tourUrl} onClose={() => setTourOpen(false)} />}
    </div>
  )
}
