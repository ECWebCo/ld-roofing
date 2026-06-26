// Generates dist/sitemap.xml from the same data the routes are built from.
// Runs after `vite-react-ssg build`. Plain ESM, no JSX imports.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { SERVICES } from '../src/data/services.js'
import { ROOF_TYPES } from '../src/data/roofTypes.js'
import { LOCATIONS } from '../src/data/locations.js'
import { BLOG_POSTS } from '../src/blog/posts.js'

const SITE = 'https://ld-roofing.com'
const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')

// path -> priority. Higher = more important.
const staticPaths = [
  ['/', 1.0],
  ['/services', 0.9],
  ['/service-areas', 0.9],
  ['/roof-types', 0.8],
  ['/about', 0.6],
  ['/contact', 0.7],
  ['/reviews', 0.6],
  ['/process', 0.5],
  ['/financing', 0.6],
  ['/faq', 0.6],
  ['/gallery', 0.5],
  ['/blog', 0.6],
]

const urls = [
  ...staticPaths.map(([path, priority]) => ({ path, priority })),
  ...SERVICES.map(s => ({ path: `/services/${s.slug}`, priority: 0.8 })),
  ...ROOF_TYPES.map(r => ({ path: `/roof-types/${r.slug}`, priority: 0.6 })),
  ...LOCATIONS.map(l => ({ path: `/service-areas/${l.slug}`, priority: 0.8 })),
  ...BLOG_POSTS.map(p => ({ path: `/blog/${p.slug}`, priority: 0.6, lastmod: p.published })),
]

const today = new Date().toISOString().slice(0, 10)
const body = urls.map(u => `  <url>
    <loc>${SITE}${u.path}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true })
writeFileSync(resolve(distDir, 'sitemap.xml'), xml)
console.log(`✓ sitemap.xml written with ${urls.length} URLs`)
