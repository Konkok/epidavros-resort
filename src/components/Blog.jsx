import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useBlogIndex, usePost } from '../blog'
import { imageUrl } from '../media'
import { SITE_NAME, SITE_URL } from '../config'
import Img from './Img'
import './styling/VillaPage.css'
import './styling/Blog.css'

function formatDate(date, lang) {
  if (!date) return ''
  return new Date(date).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })
}

// Same sticky bar as the villa pages. "Back" returns to the previous page on
// this site (the browser restores its scroll position); a visitor who landed
// here directly goes to `to`, scrolled to the top.
function TopBar({ to, label }) {
  const navigate = useNavigate()

  const goBack = (e) => {
    e.preventDefault()
    // history.length > 1 rules out a link opened in a new tab (nothing to go back to).
    const cameFromSite =
      window.history.state?.idx > 0 ||
      (window.history.length > 1 &&
        document.referrer &&
        new URL(document.referrer).origin === window.location.origin)
    if (cameFromSite) {
      navigate(-1)
    } else {
      navigate(to)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  return (
    <div className="villa-page__topbar">
      <a href={to} className="villa-page__back" onClick={goBack}>← {label}</a>
    </div>
  )
}

// Pass a key (the article slug) to scroll up again when it changes.
function useScrollTop(key) {
  // Braces matter: scrollTo returns a Promise in current Chrome, and an effect
  // must not return anything but a cleanup function.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [key])
}

// Status line shown in place of content while loading or after an error.
function Notice({ children }) {
  return <p className="blog__empty">{children}</p>
}

export function BlogList() {
  const { t, i18n } = useTranslation()
  const { posts, failed } = useBlogIndex()
  useScrollTop()

  return (
    <div className="blog">
      <TopBar to="/" label={t('blog.back')} />
      <div className="blog__container">
        <header className="blog__header">
          <h1 className="section-title">{t('blog.title')}</h1>
          <p className="section-subtitle">{t('blog.subtitle')}</p>
        </header>

        {failed ? (
          <Notice>{t('blog.error')}</Notice>
        ) : !posts ? (
          <Notice>{t('blog.loading')}</Notice>
        ) : posts.length === 0 ? (
          <Notice>{t('blog.empty')}</Notice>
        ) : (
          <div className="blog__grid">
            {posts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="blog__card">
                {post.image && (
                  <Img className="blog__card-img" src={post.image} alt="" sizes="(max-width: 700px) 100vw, 400px" />
                )}
                <div className="blog__card-body">
                  <time className="blog__date" dateTime={post.date}>
                    {formatDate(post.date, i18n.language)}
                  </time>
                  <h2 className="blog__card-title">{post.title}</h2>
                  {post.description && <p className="blog__card-text">{post.description}</p>}
                  <span className="blog__more">{t('blog.readMore')} →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { post, loading, failed } = usePost(slug)
  const { posts } = useBlogIndex()
  useScrollTop(slug)

  if (!post) {
    return (
      <div className="blog">
        <TopBar to="/blog" label={t('blog.backToBlog')} />
        <article className="blog__article">
          {loading ? (
            <Notice>{t('blog.loading')}</Notice>
          ) : failed ? (
            <Notice>{t('blog.error')}</Notice>
          ) : (
            <>
              <h1 className="blog__article-title">{t('blog.notFound')}</h1>
              <p>{t('blog.notFoundText')}</p>
              <p><Link to="/blog" className="blog__more">{t('blog.backToBlog')} →</Link></p>
            </>
          )}
        </article>
      </div>
    )
  }

  const url = `${SITE_URL}/blog/${post.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image ? imageUrl(post.image, 1600) : undefined,
    url,
    mainEntityOfPage: url,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }

  // Index is newest first: the entry before this one is newer.
  const i = posts?.findIndex((p) => p.slug === post.slug) ?? -1
  const newer = i > 0 ? posts[i - 1] : null
  const older = i >= 0 ? posts[i + 1] : null

  // Links inside an article to this site ("/#availability", "/blog/…") stay in
  // the app instead of reloading the page.
  const onProseClick = (e) => {
    const a = e.target.closest('a')
    if (!a || a.target || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const href = new URL(a.href)
    if (href.origin !== window.location.origin) return
    e.preventDefault()
    const hash = href.hash.slice(1)
    navigate(href.pathname + href.search, { state: hash ? { scrollTo: hash } : undefined })
  }

  return (
    <div className="blog">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <TopBar to="/blog" label={t('blog.backToBlog')} />
      <article className="blog__article">
        <time className="blog__date" dateTime={post.date}>
          {formatDate(post.date, i18n.language)}
        </time>
        <h1 className="blog__article-title">{post.title}</h1>
        {post.image && (
          <Img className="blog__article-img" src={post.image} alt="" sizes="(max-width: 768px) 100vw, 720px" priority />
        )}
        {/* Articles come from the media repo, which only the site owners can write to, so the HTML is trusted. */}
        <div className="blog__prose" onClick={onProseClick} dangerouslySetInnerHTML={{ __html: post.html }} />
        {(newer || older) && (
          <nav className="blog__pager" aria-label={t('blog.title')}>
            {newer ? (
              <Link to={`/blog/${newer.slug}`} className="blog__pager-link">
                <span className="blog__date">← {t('blog.newer')}</span>
                <span className="blog__pager-title">{newer.title}</span>
              </Link>
            ) : <span />}
            {older && (
              <Link to={`/blog/${older.slug}`} className="blog__pager-link blog__pager-link--older">
                <span className="blog__date">{t('blog.older')} →</span>
                <span className="blog__pager-title">{older.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  )
}
