import { useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AMENITY_KEY_MAP } from '../config'
import './styling/RoomCard.css'

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

export default function RoomCard({ room, onSelect }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const [hoverIdx, setHoverIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const intervalRef = useRef(null)

  const photos = room.photos?.length ? room.photos : [{ src: room.image, alt: room.name }]
  const amenityKey = name => AMENITY_KEY_MAP[name] || null

  const handleMouseEnter = useCallback(() => {
    if (photos.length <= 1) return
    setHovered(true)
    setHoverIdx(0)
    intervalRef.current = setInterval(() => {
      setHoverIdx(i => (i + 1) % photos.length)
    }, 900)
  }, [photos.length])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    setHoverIdx(0)
    clearInterval(intervalRef.current)
  }, [])

  const currentSrc = hovered ? photos[hoverIdx].src : room.image

  return (
    <article className="room-card">
      {/* Image — click opens VillaPage, hover cycles photos */}
      <div
        className="room-card__image-wrap"
        onClick={onSelect}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={currentSrc}
          alt={hovered ? photos[hoverIdx].alt : room.name}
          className="room-card__image"
          loading="lazy"
        />
        {room.badge && <span className="room-card__badge">{room.badge}</span>}
        <span className="room-card__category">
          {t(`rooms.category.${room.category.toLowerCase()}`, room.category)}
        </span>

        {/* Progress dots — visible on hover */}
        {hovered && photos.length > 1 && (
          <div className="room-card__dots">
            {photos.map((_, i) => (
              <span
                key={i}
                className={`room-card__dot ${i === hoverIdx ? 'room-card__dot--active' : ''}`}
              />
            ))}
          </div>
        )}

        {/* "View all photos" hint — visible on hover */}
        {hovered && (
          <div className="room-card__hover-hint">
            {t('rooms.viewAll', { count: photos.length })}
          </div>
        )}
      </div>

      <div className="room-card__body">
        <div className="room-card__meta">
          <div className="room-card__meta-item">
            <span className="room-card__meta-icon">📐</span>
            {room.size}
          </div>
          <div className="room-card__meta-item">
            <span className="room-card__meta-icon">👤</span>
            {t('rooms.capacity', { count: room.capacity })}
          </div>
          {room.bedrooms != null && (
            <div className="room-card__meta-item">
              <span className="room-card__meta-icon">🛏</span>
              {t('booking.bedroom', { count: room.bedrooms })}
            </div>
          )}
          {room.bathrooms != null && (
            <div className="room-card__meta-item">
              <span className="room-card__meta-icon">🚿</span>
              {t('booking.bathroom', { count: room.bathrooms })}
            </div>
          )}
        </div>

        <div className="room-card__name-wrap">
          <h3 className="room-card__name" onClick={onSelect} style={{ cursor: 'pointer' }}>
            {room.name}
          </h3>
          <span className="room-card__subtitle">
            {t(`rooms.villas.${room.villaKey}.subtitle`, '')}
          </span>
        </div>

        <p className={`room-card__description ${expanded ? 'room-card__description--expanded' : ''}`}>
          {t(`rooms.villas.${room.villaKey}.description`, '')}
        </p>
        <button className="room-card__toggle" onClick={() => setExpanded(v => !v)}>
          {expanded ? t('rooms.readLess') : t('rooms.readMore')}
        </button>

        <div className="room-card__amenities">
          {room.amenities.slice(0, 4).map(a => {
            const key = amenityKey(a)
            return (
              <span key={a} className="room-card__amenity">
                {(key && AMENITY_ICONS[key]) || '✓'}{' '}
                {key ? t(`rooms.amenity.${key}`, a) : a}
              </span>
            )
          })}
          {room.amenities.length > 4 && (
            <span className="room-card__amenity room-card__amenity--more">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="room-card__footer">
          <button className="btn btn-primary room-card__cta room-card__cta--full" onClick={onSelect}>
            {t('rooms.explore')}
          </button>
        </div>
      </div>
    </article>
  )
}
