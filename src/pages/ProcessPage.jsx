import Seo, { breadcrumbSchema } from '../seo/Seo'
import { WHITE } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { ProcessSection } from '../sections'

export default function ProcessPage() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'Our Process', path:'/process' }]
  return (
    <>
      <Seo
        title="Our Roofing Process | LD Roofing & Exteriors"
        description="How LD Roofing works: free inspection and honest assessment, clear itemized estimate, expert installation, and a final walkthrough. Transparent, easy, and stress-free."
        path="/process"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        eyebrow="How It Works"
        title="Our 4-Step Process"
        intro="Every step is designed to make your roofing experience transparent, easy, and stress-free, from the first inspection to the final walkthrough."
        crumbs={crumbs}
      />
      <ProcessSection/>
      <section style={{ background:WHITE, padding:'72px 48px' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}><CtaBand/></div>
      </section>
    </>
  )
}
