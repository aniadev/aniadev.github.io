import { queryCollection } from '@nuxt/content/server'
import { siteUrl } from '../../app/data/site'

// Static sitemap, prerendered at build (see nitro.prerender.routes). Posts whose `canonical`
// points to an external original are left out: the canonical tag already hands those URLs to
// the source, so listing them here would send search engines a contradictory signal.
const STATIC_ROUTES = ['/', '/writing', '/projects', '/about']

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'writing')
    .select('path', 'date', 'draft', 'canonical')
    .order('date', 'DESC')
    .all()

  const postUrls = posts
    .filter((p) => !p.draft && !p.canonical)
    .map((p) => ({ loc: `${siteUrl}${p.path}`, lastmod: String(p.date).slice(0, 10) }))

  const urls = [...STATIC_ROUTES.map((r) => ({ loc: `${siteUrl}${r}` })), ...postUrls]

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => `  <url><loc>${u.loc}</loc>${'lastmod' in u && u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    `\n</urlset>\n`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
