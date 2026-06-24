import { useEffect, useRef } from 'react'
import './styling/VideoModal.css'

export default function VideoModal({ src, onClose }) {
  const videoRef = useRef(null)

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
    <div
      className="vmodal"
      role="dialog"
      aria-modal="true"
      aria-label="Promo video"
      onClick={onClose}
    >
      <div className="vmodal__inner" onClick={e => e.stopPropagation()}>
        <button
          className="vmodal__close"
          onClick={onClose}
          aria-label="Close video"
        >
          <svg viewBox="0 0 14 14" fill="none" width="14" height="14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="vmodal__frame">
          <video
            ref={videoRef}
            className="vmodal__video"
            controls
            autoPlay
            playsInline
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>

        <p className="vmodal__label">Epidavros Villas & Suites · Akros Eco Farm</p>
      </div>
    </div>
  )
}
