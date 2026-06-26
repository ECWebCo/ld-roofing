import { Head } from 'vite-react-ssg'
import { SITE_URL, BUSINESS_NAME, OG_IMAGE } from '../ui/theme'

// ─── Per-page SEO ────────────────────────────────────────────────────────────
// Renders title, meta description, canonical, Open Graph, Twitter, and any
// JSON-LD schema into the static HTML <head> at build time (via vite-react-ssg).
//
//   <Seo title="..." description="..." path="/services" schema={[...]} />
//
// `path` should start with "/". `schema` is an array of JSON-LD objects.
export default function Seo({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
  schema = [],
  noindex = false,
}) {
  const url = `${SITE_URL}${path === '/' ? '' : path.replace(/\/$/, '')}` || SITE_URL
  const fullTitle = title.includes('LD Roofing') ? title : `${title} | ${BUSINESS_NAME}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={BUSINESS_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schema.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Head>
  )
}

// ─── Reusable schema builders ────────────────────────────────────────────────
export const orgSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  '@id': `${SITE_URL}/#organization`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  image: OG_IMAGE,
  logo: OG_IMAGE,
  telephone: '+1-469-585-8908',
  email: 'Info@ld-roofing.com',
  areaServed: [
    { '@type': 'City', name: 'Houston' },
    { '@type': 'City', name: 'Dallas' },
  ],
  address: { '@type': 'PostalAddress', addressRegion: 'TX', addressCountry: 'US' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '63',
  },
})

export const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.path}`,
  })),
})

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

export const serviceSchema = ({ name, description, areaName }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: name,
  description,
  provider: { '@type': 'RoofingContractor', name: BUSINESS_NAME, url: SITE_URL },
  areaServed: { '@type': 'State', name: 'Texas' },
  ...(areaName && { areaServed: { '@type': 'Place', name: areaName } }),
})

export const localBusinessSchema = ({ areaName, url, phone }) => ({
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: `${BUSINESS_NAME} — ${areaName}`,
  url,
  image: OG_IMAGE,
  telephone: phone,
  email: 'Info@ld-roofing.com',
  areaServed: { '@type': 'Place', name: areaName },
  address: { '@type': 'PostalAddress', addressRegion: 'TX', addressCountry: 'US' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '63' },
})
