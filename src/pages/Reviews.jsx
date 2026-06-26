import Seo, { breadcrumbSchema, orgSchema } from '../seo/Seo'
import { WHITE } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { ReviewsSection } from '../sections'

export default function Reviews() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'Reviews', path:'/reviews' }]
  return (
    <>
      <Seo
        title="Reviews | LD Roofing & Exteriors — 5.0 Stars in Houston & Dallas"
        description="Read what Houston and Dallas homeowners say about LD Roofing & Exteriors. 5.0-star rated across 63 Google reviews for honest, quality roofing and great communication."
        path="/reviews"
        schema={[breadcrumbSchema(crumbs), orgSchema()]}
      />
      <PageHero
        eyebrow="Testimonials"
        title="What Our Customers Say"
        intro="A 5.0-star reputation built one honest job at a time, across Houston and Dallas."
        crumbs={crumbs}
      />
      <ReviewsSection/>
      <section style={{ background:WHITE, padding:'0 48px 72px' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}><CtaBand/></div>
      </section>
    </>
  )
}
