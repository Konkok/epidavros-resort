import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './styling/Gallery.css'

const photos = [
  { id: 1,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/Sea-view-Mountain-view-Akros-Eco-Estate-1.jpg',                                   alt: 'Sea and mountain view from Akros Eco Estate',        span: 'wide' },
  { id: 2,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/General-view-to-the-sea-and-the-mountain-from-Akros-Eco-Estate-4.jpg',            alt: 'Panoramic sea and mountain view from the estate' },
  { id: 3,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/Pool-area-of-Elia-rental-residence.jpg',                                          alt: 'Pool area of Elia villa' },
  { id: 4,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/percial-view-from-terrace-of-Thymari-rental-residence.jpg',                       alt: 'Terrace view from Thymari villa',                    span: 'tall' },
  { id: 5,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/Path-in-olive-trees-Akros-Eco-Estate.jpg',                                        alt: 'Path through olive trees at Akros Eco Estate' },
  { id: 6,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/Outdoor-dining-area-with-panoramic-view-of-Elia-rental-residence.jpg',            alt: 'Outdoor dining with panoramic view at Elia villa' },
  { id: 7,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/rental-residence-Rodia.jpg',                                                      alt: 'Rodia rental villa' },
  { id: 8,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/Sitting-Area-of-Thymari-rental-residence.jpg',                                   alt: 'Sitting area of Thymari villa' },
  { id: 9,  src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/Bedroom_A-of-Thymari-rental-residence.jpg',                                      alt: 'Bedroom at Thymari villa' },
  { id: 10, src: 'https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/evening-time-enjoy-a-glass-of-wine-in-endless-blue-sea-and-sky.jpg',             alt: 'Evening sea and sky view from the terrace',          span: 'wide' },
]

export default function Gallery() {
  const { t } = useTranslation()
  const [lightbox, setLightbox] = useState(null)

  const navigate = dir => {
    const idx = photos.findIndex(p => p.id === lightbox.id)
    setLightbox(photos[(idx + dir + photos.length) % photos.length])
  }

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <div className="gallery__header">
          <span className="section-label">{t('gallery.label')}</span>
          <h2 className="section-title">{t('gallery.title')}</h2>
          <p className="section-subtitle">{t('gallery.subtitle')}</p>
        </div>

        <div className="gallery__grid">
          {photos.map(photo => (
            <button
              key={photo.id}
              className={`gallery__item gallery__item--${photo.span || 'normal'}`}
              onClick={() => setLightbox(photo)}
              aria-label={`View photo: ${photo.alt}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="gallery__item-overlay">
                <span className="gallery__item-icon">⊕</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="gallery__lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery__lb-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button className="gallery__lb-nav gallery__lb-nav--prev" onClick={e => { e.stopPropagation(); navigate(-1) }} aria-label="Previous">‹</button>
          <div className="gallery__lb-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
            <p className="gallery__lb-caption">{lightbox.alt}</p>
          </div>
          <button className="gallery__lb-nav gallery__lb-nav--next" onClick={e => { e.stopPropagation(); navigate(1) }} aria-label="Next">›</button>
        </div>
      )}
    </section>
  )
}
