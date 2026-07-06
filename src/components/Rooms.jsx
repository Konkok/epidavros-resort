import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { rooms } from '../config'
import RoomCard from './RoomCard'
import './styling/Rooms.css'

const CATEGORY_VALUES = ['All', 'Villa', 'Suite']

export default function Rooms() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? rooms
    : rooms.filter(r => r.category === activeCategory)

  const categoryLabel = cat => {
    if (cat === 'All') return t('rooms.filterAll')
    if (cat === 'Suite') return t('rooms.filterSuite', 'Suites')
    return t(`rooms.category.${cat.toLowerCase()}`, cat)
  }

  return (
    <section id="rooms" className="rooms section">
      <div className="container">
        <div className="rooms__header">
          <div>
            <span className="section-label">{t('rooms.label')}</span>
            <h2 className="section-title">{t('rooms.title')}</h2>
            <p className="section-subtitle">{t('rooms.subtitle')}</p>
          </div>
        </div>

        <div className="rooms__filters">
          {CATEGORY_VALUES.map(cat => (
            <button
              key={cat}
              className={`rooms__filter-btn ${activeCategory === cat ? 'rooms__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>

        <div className="rooms__grid">
          {filtered.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}
