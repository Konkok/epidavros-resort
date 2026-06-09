import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BOOKING_IFRAME_ENABLED, BOOKING_IFRAME_BASE, HOLIHOUSE_LANG_MAP } from '../config'
import './styling/BookingSearch.css'

const LISTING_FIELDS = [
  '_id', 'title', 'roomType', 'beds', 'publicDescription',
  'picture', 'accommodates', 'bedrooms', 'bathrooms',
  'propertyType', 'prices', 'reviews', 'nightlyRates', 'totalPrice', 'isRecommended',
].join('+')

function toDateStr(date) {
  return date.toISOString().split('T')[0]
}

function defaultDates() {
  const checkIn = new Date()
  checkIn.setDate(checkIn.getDate() + 7)
  const checkOut = new Date(checkIn)
  checkOut.setDate(checkOut.getDate() + 3)
  return { checkIn: toDateStr(checkIn), checkOut: toDateStr(checkOut) }
}

function nightsBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000)
}

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="star-rating" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? 'star star--full' : i === full && half ? 'star star--half' : 'star star--empty'}>★</span>
      ))}
    </span>
  )
}

function ListingCard({ listing, nights }) {
  const { t } = useTranslation()

  const photo =
    listing.picture?.regular ||
    listing.picture?.thumbnail ||
    listing.picture?.large ||
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'

  const totalPrice = listing.totalPrice ?? null
  const nightlyAvg = (() => {
    if (listing.nightlyRates) {
      const vals = Object.values(listing.nightlyRates)
      if (vals.length > 0) return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
    }
    return listing.prices?.basePrice ?? null
  })()

  const rating = listing.reviews?.avg ?? null
  const reviewCount = listing.reviews?.total ?? 0
  const description = listing.publicDescription?.summary || listing.publicDescription?.space || ''

  return (
    <article className="listing-card">
      {listing.isRecommended && (
        <span className="listing-card__badge">Recommended</span>
      )}
      <div className="listing-card__image-wrap">
        <img src={photo} alt={listing.picture?.caption || listing.title} loading="lazy" />
        <span className="listing-card__type">
          {listing.propertyType || listing.roomType || 'Villa'}
        </span>
      </div>

      <div className="listing-card__body">
        <div className="listing-card__meta">
          {listing.bedrooms != null && (
            <span className="listing-card__meta-item">
              <span>🛏</span> {t('booking.bedroom', { count: listing.bedrooms })}
            </span>
          )}
          {listing.bathrooms != null && (
            <span className="listing-card__meta-item">
              <span>🚿</span> {t('booking.bathroom', { count: listing.bathrooms })}
            </span>
          )}
          {listing.accommodates != null && (
            <span className="listing-card__meta-item">
              <span>👤</span> {t('booking.upTo')} {listing.accommodates}
            </span>
          )}
        </div>

        <h3 className="listing-card__title">{listing.title}</h3>
        {description && <p className="listing-card__desc">{description}</p>}

        {rating != null && (
          <div className="listing-card__reviews">
            <StarRating rating={rating} />
            <span className="listing-card__review-score">{rating.toFixed(1)}</span>
            {reviewCount > 0 && (
              <span className="listing-card__review-count">({reviewCount} reviews)</span>
            )}
          </div>
        )}

        <div className="listing-card__footer">
          <div className="listing-card__pricing">
            {nightlyAvg != null && (
              <span className="listing-card__nightly">
                <span className="listing-card__price-amount">€{nightlyAvg}</span>
                <span className="listing-card__price-per"> {t('booking.perNight')}</span>
              </span>
            )}
            {totalPrice != null && (
              <span className="listing-card__total">€{totalPrice} {t('booking.totalFees')}</span>
            )}
          </div>
          <a href="#availability" className="btn btn-primary listing-card__cta">
            {t('booking.bookNow')}
          </a>
        </div>
      </div>
    </article>
  )
}

// ── Iframe mode ───────────────────────────────────────────────────────────────
function BookingIframe() {
  const { t, i18n } = useTranslation()
  const lang = HOLIHOUSE_LANG_MAP[i18n.language?.split('-')[0]] || 'en'
  const src = `${BOOKING_IFRAME_BASE}/${lang}`

  return (
    <section id="availability" className="booking-search section">
      <div className="container">
        <div className="booking-search__header">
          <span className="section-label">{t('booking.label')}</span>
          <h2 className="section-title">{t('booking.title')}</h2>
          <p className="section-subtitle">{t('booking.subtitle')}</p>
        </div>
        <div className="booking-search__iframe-wrap">
          <iframe
            src={src}
            title={t('booking.iframeTitle')}
            className="booking-search__iframe"
            loading="lazy"
            allow="payment"
          />
        </div>
      </div>
    </section>
  )
}

// ── API search mode ───────────────────────────────────────────────────────────
function BookingAPISearch() {
  const { t } = useTranslation()
  const defaults = defaultDates()
  const [checkIn, setCheckIn] = useState(defaults.checkIn)
  const [checkOut, setCheckOut] = useState(defaults.checkOut)
  const [guests, setGuests] = useState(2)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)
  const today = toDateStr(new Date())

  const handleSearch = async e => {
    e.preventDefault()
    if (!checkIn || !checkOut || checkOut <= checkIn) return
    setLoading(true); setError(null); setResults(null); setSearched(true)
    const params = new URLSearchParams({ checkIn, checkOut, minOccupancy: guests, fields: LISTING_FIELDS })
    try {
      const res = await fetch(`/api/guesty/listings?${params}`)
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const data = await res.json()
      setResults(Array.isArray(data) ? data : (data.results ?? data.listings ?? []))
    } catch (err) {
      setError(t('booking.errorMsg'))
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0

  return (
    <section id="availability" className="booking-search section">
      <div className="container">
        <div className="booking-search__header">
          <span className="section-label">{t('booking.label')}</span>
          <h2 className="section-title">{t('booking.title')}</h2>
          <p className="section-subtitle">{t('booking.subtitle')}</p>
        </div>

        <form className="booking-search__form" onSubmit={handleSearch}>
          <div className="booking-search__field">
            <label htmlFor="bs-checkin">{t('booking.checkIn')}</label>
            <input id="bs-checkin" type="date" min={today} value={checkIn}
              onChange={e => {
                setCheckIn(e.target.value)
                if (e.target.value >= checkOut) {
                  const d = new Date(e.target.value); d.setDate(d.getDate() + 1)
                  setCheckOut(toDateStr(d))
                }
              }} required />
          </div>
          <div className="booking-search__field">
            <label htmlFor="bs-checkout">{t('booking.checkOut')}</label>
            <input id="bs-checkout" type="date" min={checkIn || today} value={checkOut}
              onChange={e => setCheckOut(e.target.value)} required />
          </div>
          <div className="booking-search__field booking-search__field--guests">
            <label>{t('booking.guests')}</label>
            <div className="booking-search__stepper">
              <button type="button" className="booking-search__step-btn" onClick={() => setGuests(g => Math.max(1, g - 1))} aria-label="Remove guest">−</button>
              <span className="booking-search__guest-count">{guests}</span>
              <button type="button" className="booking-search__step-btn" onClick={() => setGuests(g => Math.min(12, g + 1))} aria-label="Add guest">+</button>
            </div>
          </div>
          <button type="submit" className="btn btn-accent booking-search__submit" disabled={loading}>
            {loading ? <span className="booking-search__spinner" /> : t('booking.search')}
          </button>
        </form>

        {nights > 0 && (
          <p className="booking-search__nights-hint">
            {t('booking.guestHint', { nights: t('booking.night', { count: nights }), guests })}
          </p>
        )}

        {loading && (
          <div className="booking-search__loading">
            <div className="booking-search__loading-dots"><span /><span /><span /></div>
            <p>{t('booking.searching')}</p>
          </div>
        )}

        {error && <div className="booking-search__error"><span>⚠️</span> {error}</div>}

        {searched && !loading && results !== null && (
          results.length === 0 ? (
            <div className="booking-search__empty">
              <span className="booking-search__empty-icon">🌿</span>
              <h3>{t('booking.noResults')}</h3>
              <p>{t('booking.noResultsHint')}</p>
            </div>
          ) : (
            <div className="booking-search__results">
              <p className="booking-search__results-count">
                {t('booking.available', { count: results.length })}
              </p>
              <div className="booking-search__grid">
                {results.map(listing => (
                  <ListingCard key={listing._id} listing={listing} nights={nights} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default function BookingSearch() {
  return BOOKING_IFRAME_ENABLED ? <BookingIframe /> : <BookingAPISearch />
}
