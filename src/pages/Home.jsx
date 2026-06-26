import Seo, { orgSchema, faqSchema } from '../seo/Seo'
import { WHITE, NAVY, ORANGE, MUTED } from '../ui/theme'
import { FaqAccordion } from '../ui/page-bits'
import { FAQS } from '../blog/faqs'
import {
  Hero, TrustBar, StatsStrip, ServicesSection, RoofTypesSection,
  Divisions, Gallery, ProcessSection, ReviewsSection, ServiceAreasSection, CTA,
} from '../sections'

export default function Home() {
  return (
    <>
      <Seo
        title="LD Roofing & Exteriors | Houston & Dallas Roofing Contractor"
        description="Trusted residential and commercial roofing in Houston and Dallas. Free inspections, roof repair, roof replacement, attic venting. BBB A+ rated, fully insured."
        path="/"
        schema={[orgSchema(), faqSchema(FAQS)]}
      />
      <Hero/>
      <TrustBar/>
      <StatsStrip/>
      <ServicesSection/>
      <RoofTypesSection/>
      <Divisions/>
      <Gallery/>
      <ProcessSection/>
      <ReviewsSection/>
      <section style={{ background:WHITE, padding:'96px 48px' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Frequently Asked Questions</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY, marginBottom:14 }}>Questions Homeowners Ask</h2>
            <p style={{ fontSize:16, color:MUTED, maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>Straight answers to the questions we hear most often.</p>
          </div>
          <FaqAccordion faqs={FAQS} heading={null}/>
        </div>
      </section>
      <ServiceAreasSection/>
      <CTA/>
    </>
  )
}
