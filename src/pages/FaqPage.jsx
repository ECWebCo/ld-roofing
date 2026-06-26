import Seo, { breadcrumbSchema, faqSchema } from '../seo/Seo'
import { WHITE } from '../ui/theme'
import { PageHero, CtaBand, FaqAccordion } from '../ui/page-bits'
import { FAQS } from '../blog/faqs'

export default function FaqPage() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'FAQ', path:'/faq' }]
  return (
    <>
      <Seo
        title="Roofing FAQ | LD Roofing & Exteriors — Houston & Dallas"
        description="Answers to common roofing questions: are inspections free, how long does a replacement take, do you work with insurance, how much does a roof cost, financing, and more."
        path="/faq"
        schema={[breadcrumbSchema(crumbs), faqSchema(FAQS)]}
      />
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Questions Homeowners Ask"
        intro="Straight answers to the questions we hear most often. Do not see yours? Reach out and we will get you the answer."
        crumbs={crumbs}
      />
      <section style={{ background:WHITE, padding:'64px 48px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <FaqAccordion faqs={FAQS} heading={null}/>
          <CtaBand/>
        </div>
      </section>
    </>
  )
}
