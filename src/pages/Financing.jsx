import Seo, { breadcrumbSchema } from '../seo/Seo'
import { WHITE } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { renderSection } from '../ui/primitives'

const BODY = [
  { type:'p', text:'A new roof is a major investment, and it rarely happens on your schedule. Storms do not wait for a convenient time, and an aging roof will not hold off until next year. That is why we offer flexible financing, so you can protect your home now and pay over time.' },
  { type:'h2', text:'Financing options' },
  { type:'p', text:'We work with multiple financing partners to find a plan that fits your situation. Options typically include low monthly payments, competitive rates, and plans with no prepayment penalty. Approval depends on credit and other factors, and we will walk you through what is available during your inspection or estimate.' },
  { type:'h2', text:'Insurance claims first' },
  { type:'p', text:'If your roof was damaged by a storm or hail, your homeowner’s insurance may cover most of the cost. In that case, you typically pay only your deductible. We will inspect your roof for free, document any storm damage, and help you understand whether a claim makes sense before you consider financing.' },
  { type:'callout', text:'Not sure which path is right for you? Start with a free inspection. We will lay out your options clearly, including insurance, financing, and out-of-pocket, with no pressure.' },
]

export default function Financing() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'Financing', path:'/financing' }]
  return (
    <>
      <Seo
        title="Roof Financing in Houston & Dallas | LD Roofing & Exteriors"
        description="Flexible roof financing in Houston and Dallas. Low monthly payments and competitive rates so you can replace your roof now and pay over time. Insurance-claim help too."
        path="/financing"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        eyebrow="Flexible Payments"
        title="Roof Financing"
        intro="Protect your home now and pay over time. We work with multiple financing partners to find a plan that fits."
        crumbs={crumbs}
      />
      <section style={{ background:WHITE, padding:'64px 48px' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}>
          {BODY.map(renderSection)}
          <CtaBand/>
        </div>
      </section>
    </>
  )
}
