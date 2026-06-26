import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../seo/Seo'
import { NAVY, ORANGE, MUTED, BORDER, WHITE, DARK } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { ROOF_TYPES } from '../data/roofTypes'

export default function RoofTypes() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'Roof Types', path:'/roof-types' }]
  return (
    <>
      <Seo
        title="Roof Types We Install in Houston & Dallas, TX"
        description="Every roofing material we install in Houston and Dallas: asphalt shingle, standing seam metal, clay and concrete tile, slate, cedar shake, TPO, EPDM, and more. Costs, lifespan, and best uses."
        path="/roof-types"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        eyebrow="Roof Types We Install"
        title="Every Type of Roof"
        intro="From asphalt shingle to standing seam metal and commercial flat systems, we install the right roof for your property and your budget. Explore each material below."
        crumbs={crumbs}
      />
      <section style={{ background:WHITE, padding:'72px 48px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="ld-rtcards" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }}>
            {ROOF_TYPES.map(rt=>(
              <Link key={rt.slug} to={`/roof-types/${rt.slug}`} style={{ display:'flex', border:`1px solid ${BORDER}`, background:WHITE, textDecoration:'none', overflow:'hidden' }}>
                <div style={{ width:140, flexShrink:0, position:'relative', background:NAVY }}>
                  <img src={rt.img} alt={`${rt.name} roofing`} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{e.target.style.display='none'}}/>
                </div>
                <div style={{ padding:'22px 24px' }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:ORANGE, marginBottom:8 }}>{rt.tag} · {rt.life}</div>
                  <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:19, color:NAVY, marginBottom:8, lineHeight:1.25 }}>{rt.name}</h2>
                  <p style={{ fontSize:13, color:MUTED, lineHeight:1.7 }}>{rt.desc.slice(0, 110)}…</p>
                </div>
              </Link>
            ))}
          </div>
          <CtaBand heading="Not sure which roof is right for your home?"/>
        </div>
      </section>
      <style>{`@media(max-width:768px){.ld-rtcards{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
