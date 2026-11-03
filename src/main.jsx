import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './i18n/index.js'
import './index.css'
import App from './App.jsx'

// createRoot (not hydrateRoot) on purpose: the prerendered HTML is English,
// but the visitor's language is detected client-side, so a hydration match
// isn't guaranteed. React replaces the static markup on first render.
// React renders its own <title>/<meta>/<link>; drop the prerendered copies
// so the head doesn't end up with two of each.
document.querySelectorAll('[data-prerender]').forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
