import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../seo/Seo'
import { NAVY, ORANGE, OFF, MUTED, BORDER, WHITE, DARK } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { SERVICES } from '../data/services'

function Group({ title, items }) {
  return (
    <div style={{ marginBottom:48 }}>
      <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(24px,3.5vw,32px)', color:NAVY, marginBottom:24 }}>{title}</h2>
      <div className="ld-grid3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:BORDER, border:`1px solid ${BORDER}` }}>
        {items.map(s=>(
          <Link key={s.slug} to={`/services/${s.slug}`} style={{ display:'block', background:WHITE, padding:'32px 28px', textDecoration:'none', transition:'background 0.2s' }}
            onMouseOver={e=>e.currentTarget.style.background=OFF} onMouseOut={e=>e.currentTarget.style.background=WHITE}>
            <div style={{ width:36, height:3, background:ORANGE, marginBottom:20 }}/>
            <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:18, color:NAVY, marginBottom:10, lineHeight:1.3 }}>{s.title}</h3>
            <p style={{ fontSize:14, color:MUTED, lineHeight:1.8, marginBottom:14 }}>{s.short}</p>
            <span style={{ fontSize:12, fontWeight:700, color:ORANGE, letterSpacing:'0.5px', textTransform:'uppercase' }}>Learn more →</span>
          </Link>
        ))}
      </div>
      <style>{`@media(max-width:900px){.ld-grid3{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

export default function Services() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'Services', path:'/services' }]
  return (
    <>
      <Seo
        title="Roofing Services in Houston & Dallas, TX"
        description="Complete residential and commercial roofing services in Houston and Dallas: roof replacement, repair, leak repair, free inspections, attic ventilation, insurance claims, and more."
        path="/services"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        eyebrow="What We Do"
        title="Roofing Services"
        intro="From free inspections to full replacements, residential and commercial, we handle every roofing need across Houston and Dallas, for every type of roof and every budget."
        crumbs={crumbs}
      />
      <section style={{ background:WHITE, padding:'72px 48px 32px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Group title="Residential Roofing" items={SERVICES.filter(s=>s.audience==='residential')}/>
          <Group title="Commercial Roofing" items={SERVICES.filter(s=>s.audience==='commercial')}/>
          <CtaBand/>
        </div>
      </section>
    </>
  )
}
