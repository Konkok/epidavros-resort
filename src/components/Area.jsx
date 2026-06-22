import { useTranslation } from 'react-i18next'
import './styling/Area.css'

const POIS = [
  { icon: '🏛️', key: 'theatre',       type: 'history', dist: '7 km',  programmeBase: 'https://aefestival.gr/schedule/?category=&place=134&schedule_year=2026' },
  { icon: '🎭', key: 'littleTheatre', type: 'history', dist: '8 km',  programmeBase: 'https://aefestival.gr/schedule/?category=&place=142&schedule_year=2026' },
  { icon: '⚕️', key: 'asklepion',     type: 'history', dist: '7 km'    },
  { icon: '🏖️', key: 'beach',         type: 'nature',  dist: '1 km'    },
  { icon: '⛵',  key: 'palea',         type: 'nature',  dist: '8 km'    },
  { icon: '🏰', key: 'nafplio',       type: 'town',    dist: '35 km'   },
  { icon: '🦁', key: 'mycenae',       type: 'history', dist: '30 km'   },
  { icon: '🫒', key: 'farm',          type: 'nature',  dist: null      },
]

const ACTIVITIES = [
  { icon: '🏊', key: 'act1' },
  { icon: '🎭', key: 'act2' },
  { icon: '🥾', key: 'act3' },
  { icon: '🐟', key: 'act4' },
  { icon: '🫒', key: 'act5' },
  { icon: '⛵', key: 'act6' },
]

const DISTANCES = [
  { icon: '✈️', key: 'dist1', km: '110 km', time: '~1h 20min' },
  { icon: '🏙️', key: 'dist2', km: '100 km', time: '~1h 15min' },
  { icon: '🏰', key: 'dist3', km: '35 km',  time: '~35 min'   },
  { icon: '🌉', key: 'dist4', km: '45 km',  time: '~45 min'   },
]

export default function Area() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.split('-')[0]
  const programmeUrl = (base) => lang === 'el' ? base : `${base}&lang=en`

  return (
    <section id="area" className="area section">
      <div className="container">

        {/* Header */}
        <div className="area__header">
          <span className="section-label">{t('area.label')}</span>
          <h2 className="section-title">{t('area.title')}</h2>
          <p className="section-subtitle">{t('area.subtitle')}</p>
        </div>

        {/* Intro */}
        <div className="area__intro">
          <div className="area__intro-image">
            <img
              src="https://epidavrosrentalvillas.gr/wp-content/uploads/2025/02/General-view-to-the-sea-and-the-mountain-from-Akros-Eco-Estate-4.jpg"
              alt="Sea and mountain view — Epidavros area"
              loading="lazy"
            />
          </div>
          <div className="area__intro-text">
            <p className="area__body">{t('area.body1')}</p>
            <p className="area__body">{t('area.body2')}</p>
            <div className="area__intro-stats">
              <div className="area__intro-stat">
                <span className="area__intro-stat-num">3</span>
                <span className="area__intro-stat-label">{t('area.statUNESCO')}</span>
              </div>
              <div className="area__intro-stat">
                <span className="area__intro-stat-num">5+</span>
                <span className="area__intro-stat-label">{t('area.statBeaches')}</span>
              </div>
              <div className="area__intro-stat">
                <span className="area__intro-stat-num">2,500</span>
                <span className="area__intro-stat-label">{t('area.statYears')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Points of Interest */}
        <div className="area__subsection">
          <h3 className="area__subsection-title">{t('area.poisTitle')}</h3>
          <div className="area__poi-grid">
            {POIS.map(poi => (
              <div key={poi.key} className={`area__poi-card area__poi-card--${poi.type}`}>
                <div className="area__poi-icon">{poi.icon}</div>
                <div className="area__poi-body">
                  <div className="area__poi-header">
                    <h4 className="area__poi-name">{t(`area.${poi.key}Name`)}</h4>
                    {poi.dist
                      ? <span className="area__poi-dist">{poi.dist}</span>
                      : <span className="area__poi-dist area__poi-dist--onsite">{t('area.onSite')}</span>
                    }
                  </div>
                  <p className="area__poi-desc">{t(`area.${poi.key}Desc`)}</p>
                  {poi.programmeBase && (
                    <a
                      href={programmeUrl(poi.programmeBase)}
                      className="area__poi-programme"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="13" height="13">
                        <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {t('area.theatreProgrammeBtn')}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="area__subsection">
          <h3 className="area__subsection-title">{t('area.activitiesTitle')}</h3>
          <div className="area__activities">
            {ACTIVITIES.map(act => (
              <div key={act.key} className="area__activity">
                <span className="area__activity-icon">{act.icon}</span>
                <span className="area__activity-label">{t(`area.${act.key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Here */}
        <div className="area__subsection">
          <h3 className="area__subsection-title">{t('area.gettingHereTitle')}</h3>
          <div className="area__distances">
            {DISTANCES.map(d => (
              <div key={d.key} className="area__dist-card">
                <span className="area__dist-icon">{d.icon}</span>
                <div className="area__dist-info">
                  <span className="area__dist-place">{t(`area.${d.key}`)}</span>
                  <span className="area__dist-km">{d.km}</span>
                  <span className="area__dist-time">{d.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
