import Seo, { breadcrumbSchema } from '../seo/Seo'
import { WHITE } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { Gallery } from '../sections'

export default function GalleryPage() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'Gallery', path:'/gallery' }]
  return (
    <>
      <Seo
        title="Project Gallery | LD Roofing & Exteriors — Houston & Dallas"
        description="See recent residential and commercial roofing projects by LD Roofing & Exteriors across Houston and Dallas: replacements, repairs, flat roofs, gutters, and siding."
        path="/gallery"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        eyebrow="Portfolio"
        title="Recent Projects"
        intro="A look at recent residential and commercial roofing work across the Houston and Dallas metros."
        crumbs={crumbs}
      />
      <Gallery/>
      <section style={{ background:WHITE, padding:'72px 48px' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}><CtaBand/></div>
      </section>
    </>
  )
}
