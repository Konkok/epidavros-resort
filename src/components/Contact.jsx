import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BOOKING_RECIPIENT, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from '../config'
import './styling/Contact.css'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: '', email: '', checkin: '', checkout: '', room: '', guests: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => {
      const next = { ...f, [name]: value }
      if (name === 'checkin' && value && f.checkout && f.checkout <= value) {
        const d = new Date(value)
        d.setDate(d.getDate() + 1)
        next.checkout = d.toISOString().split('T')[0]
      }
      return next
    })
  }

  const today = new Date().toISOString().split('T')[0]
  const minCheckout = form.checkin
    ? (() => { const d = new Date(form.checkin); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0] })()
    : today

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    setSendError(null)
    try {
      const villaLabel = form.room
        ? t(`contact.villaOptions.${form.room}`, form.room)
        : 'Not specified'
      const res = await fetch(`https://formsubmit.co/ajax/${BOOKING_RECIPIENT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Booking Request from ${form.name} — Epidavros Resort`,
          _template: 'table',
          _replyto: form.email,
          Name: form.name,
          Email: form.email,
          'Check-in': form.checkin,
          'Check-out': form.checkout,
          Villa: villaLabel,
          Guests: form.guests || 'Not specified',
          'Special Requests': form.message || '—',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setSubmitted(true)
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch {
      setSendError(t('contact.errorMsg', 'Could not send your request. Please try again or email us directly at info@akros.gr'))
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact section">
      <div className="container contact__grid">
        <div className="contact__info">
          <span className="section-label">{t('contact.label')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="contact__subtitle">{t('contact.subtitle')}</p>

          <div className="contact__details">
            <div className="contact__detail">
              <span className="contact__detail-icon">📍</span>
              <div>
                <strong>{t('contact.addressLabel')}</strong>
                <a
                  href="https://maps.app.goo.gl/hmMvPFRB5vWhwgTe9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__detail-link"
                >
                  {CONTACT_ADDRESS}
                </a>
              </div>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-icon">📞</span>
              <div>
                <strong>{t('contact.phoneLabel')}</strong>
                <span>{CONTACT_PHONE}</span>
              </div>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-icon">✉️</span>
              <div>
                <strong>{t('contact.emailLabel')}</strong>
                <span>{CONTACT_EMAIL}</span>
              </div>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-icon">🕐</span>
              <div>
                <strong>{t('contact.hoursLabel')}</strong>
                <span>{t('contact.hoursValue')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact__form-wrap">
          {submitted ? (
            <div className="contact__success">
              <span className="contact__success-icon">✅</span>
              <h3>{t('contact.successTitle', { name: form.name })}</h3>
              <p>{t('contact.successMsg')}</p>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                {t('contact.sendAnother')}
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="name">{t('contact.fullName')} *</label>
                  <input id="name" name="name" type="text"
                    placeholder={t('contact.fullNamePlaceholder')}
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">{t('contact.emailAddress')} *</label>
                  <input id="email" name="email" type="email"
                    placeholder={t('contact.emailPlaceholder')}
                    value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="checkin">{t('contact.checkIn')} *</label>
                  <input id="checkin" name="checkin" type="date"
                    min={today} value={form.checkin} onChange={handleChange} required />
                </div>
                <div className="contact__field">
                  <label htmlFor="checkout">{t('contact.checkOut')} *</label>
                  <input id="checkout" name="checkout" type="date"
                    min={minCheckout} value={form.checkout} onChange={handleChange} required />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="room">{t('contact.roomType')}</label>
                  <select id="room" name="room" value={form.room} onChange={handleChange}>
                    <option value="">{t('contact.selectVilla')}</option>
                    {Object.entries(t('contact.villaOptions', { returnObjects: true })).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="contact__field">
                  <label htmlFor="guests">{t('contact.numGuests')}</label>
                  <select id="guests" name="guests" value={form.guests} onChange={handleChange}>
                    <option value="">{t('contact.selectGuests')}</option>
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{t('contact.guest', { count: n })}</option>
                    ))}
                    <option value="5+">{t('contact.guestsPlus')}</option>
                  </select>
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="message">{t('contact.specialRequests')}</label>
                <textarea id="message" name="message" rows={4}
                  placeholder={t('contact.specialPlaceholder')}
                  value={form.message} onChange={handleChange} />
              </div>

              {sendError && (
                <p className="contact__error">{sendError}</p>
              )}

              <button type="submit" className="btn btn-accent contact__submit" disabled={sending}>
                {sending ? t('contact.sending', 'Sending…') : t('contact.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
