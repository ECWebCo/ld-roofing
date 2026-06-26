import Seo, { breadcrumbSchema, orgSchema } from '../seo/Seo'
import { NAVY, ORANGE, OFF, MUTED, BORDER, WHITE, DARK, PHONE_HOUSTON, PHONE_DALLAS, EMAIL } from '../ui/theme'
import { PageHero } from '../ui/page-bits'
import { InspectionForm } from '../ui/primitives'

const DIVISIONS = [
  { city:'Houston Division', team:'Lane & Dana Pauly', phone:PHONE_HOUSTON, accent:NAVY },
  { city:'Dallas Division', team:'Robert & Loren Wolf', phone:PHONE_DALLAS, accent:ORANGE },
]

export default function Contact() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'Contact', path:'/contact' }]
  return (
    <>
      <Seo
        title="Contact LD Roofing & Exteriors | Houston & Dallas"
        description="Contact LD Roofing & Exteriors for a free roof inspection in Houston or Dallas. Call our Houston or Dallas division, or request your free inspection online."
        path="/contact"
        schema={[breadcrumbSchema(crumbs), orgSchema()]}
      />
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        intro="Request a free, no-obligation roof inspection, or call the division nearest you. We respond within 24 hours."
        crumbs={crumbs}
      />
      <section style={{ background:WHITE, padding:'64px 48px' }}>
        <div className="ld-contact" style={{ maxWidth:1000, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
          <div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:28, color:NAVY, marginBottom:24 }}>Call the right division</h2>
            {DIVISIONS.map(d=>(
              <div key={d.city} style={{ border:`1px solid ${BORDER}`, borderLeft:`4px solid ${d.accent}`, padding:'22px 26px', marginBottom:16 }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:d.accent, marginBottom:6 }}>{d.city}</div>
                <a href={`tel:${d.phone}`} style={{ fontSize:24, fontWeight:800, color:NAVY, textDecoration:'none', display:'block', marginBottom:4 }}>{d.phone}</a>
                <div style={{ fontSize:13, color:MUTED }}>{d.team}</div>
              </div>
            ))}
            <div style={{ marginTop:24, fontSize:15, color:DARK }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:8 }}>Email</div>
              <a href={`mailto:${EMAIL}`} style={{ color:ORANGE, fontWeight:700, textDecoration:'none' }}>{EMAIL}</a>
            </div>
          </div>
          <div style={{ background:WHITE, border:`1px solid ${BORDER}`, overflow:'hidden' }}>
            <div style={{ background:NAVY, borderBottom:`4px solid ${ORANGE}`, padding:'22px 24px' }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', color:WHITE }}>Request a Free Inspection</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.55)' }}>We respond within 24 hours</div>
            </div>
            <InspectionForm/>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){.ld-contact{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
