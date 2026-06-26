import Seo, { breadcrumbSchema, orgSchema } from '../seo/Seo'
import { NAVY, WHITE, DARK } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { Divisions, StatsStrip } from '../sections'

export default function About() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'About', path:'/about' }]
  return (
    <>
      <Seo
        title="About LD Roofing & Exteriors | Family-Owned in Houston & Dallas"
        description="LD Roofing & Exteriors is a family-owned roofing contractor serving Houston and Dallas. Two divisions, one standard: honest assessments, quality work, and real customer service."
        path="/about"
        schema={[breadcrumbSchema(crumbs), orgSchema()]}
      />
      <PageHero
        eyebrow="Our Story"
        title="Built on Customer Service"
        intro="LD Roofing & Exteriors was founded to be the roofing company we would want working on our own homes: responsive, honest, and genuinely focused on the customer."
        crumbs={crumbs}
      />
      <section style={{ background:WHITE, padding:'64px 48px' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}>
          <p style={{ fontSize:16, color:DARK, lineHeight:1.85, marginBottom:20 }}>
            Roofing has a reputation problem. Too many homeowners have been burned by high-pressure sales, inflated estimates, and crews that disappear when something goes wrong. We started LD Roofing to be the opposite of that, a family-owned company built on doing right by people.
          </p>
          <p style={{ fontSize:16, color:DARK, lineHeight:1.85, marginBottom:20 }}>
            Today we operate two divisions, one led by Lane and Dana Pauly in Houston, the other by Robert and Loren Wolf in Dallas-Fort Worth. Both teams hold to the same standard: arrive on time, tell you the truth about your roof, document everything with photos, and deliver clean, lasting work backed by a warranty.
          </p>
          <p style={{ fontSize:16, color:DARK, lineHeight:1.85 }}>
            We are BBB A+ accredited, fully insured, and carry workers compensation coverage, which protects you as the homeowner. With hundreds of roofs replaced and a 5.0-star reputation, we have earned our customers’ trust the only way that lasts: one honest job at a time.
          </p>
        </div>
      </section>
      <StatsStrip/>
      <Divisions/>
      <section style={{ background:WHITE, padding:'0 48px 72px' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}><CtaBand/></div>
      </section>
    </>
  )
}
