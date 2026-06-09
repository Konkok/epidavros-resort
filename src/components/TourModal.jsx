import { useEffect } from 'react'
import './styling/TourModal.css'

export default function TourModal({ roomName, url, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="tour-modal" role="dialog" aria-modal="true">
      <div className="tour-modal__bar">
        <div className="tour-modal__title">
          <svg className="tour-modal__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M3 12c2.5-4 5.5-6 9-6s6.5 2 9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M3 12c2.5 4 5.5 6 9 6s6.5-2 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.8"/>
          </svg>
          <span>{roomName}</span>
          <span className="tour-modal__badge">360° Virtual Tour</span>
        </div>
        <button className="tour-modal__close" onClick={onClose} aria-label="Close tour">
          <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="tour-modal__frame">
        <iframe
          src={url}
          title={`360° virtual tour — ${roomName}`}
          className="tour-modal__iframe"
          allow="fullscreen; gyroscope; accelerometer; xr-spatial-tracking"
          loading="lazy"
        />
      </div>
    </div>
  )
}
