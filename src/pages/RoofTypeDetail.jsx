import { useParams, Navigate, Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../seo/Seo'
import { NAVY, ORANGE, OFF, MUTED, BORDER, WHITE } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { renderSection } from '../ui/primitives'
import { getRoofTypeBySlug, ROOF_TYPES } from '../data/roofTypes'

export default function RoofTypeDetail() {
  const { slug } = useParams()
  const rt = getRoofTypeBySlug(slug)
  if (!rt) return <Navigate to="/roof-types" replace />

  const crumbs = [
    { name:'Home', path:'/' },
    { name:'Roof Types', path:'/roof-types' },
    { name:rt.name, path:`/roof-types/${rt.slug}` },
  ]
  const others = ROOF_TYPES.filter(r => r.slug !== rt.slug).slice(0, 4)

  return (
    <>
      <Seo
        title={rt.metaTitle}
        description={rt.metaDescription}
        path={`/roof-types/${rt.slug}`}
        image={rt.img}
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero eyebrow={`${rt.tag} · ${rt.life}`} title={rt.name} intro={rt.intro} crumbs={crumbs}/>
      <section style={{ background:WHITE, padding:'0 48px' }}>
        <div style={{ maxWidth:900, margin:'-40px auto 0', position:'relative' }}>
          <img src={rt.img} alt={`${rt.name} roof installed by LD Roofing`} style={{ width:'100%', height:360, objectFit:'cover', border:`1px solid ${BORDER}` }} onError={e=>{e.target.style.display='none'}}/>
        </div>
      </section>
      <section style={{ background:WHITE, padding:'48px 48px 64px' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:40, flexWrap:'wrap', padding:'0 0 32px', marginBottom:8, borderBottom:`1px solid ${BORDER}` }}>
            <div><div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:6 }}>Best For</div><div style={{ fontSize:15, color:NAVY, fontWeight:600 }}>{rt.good}</div></div>
            <div><div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:6 }}>Lifespan</div><div style={{ fontSize:15, color:ORANGE, fontWeight:700 }}>{rt.life}</div></div>
          </div>
          {rt.body.map(renderSection)}
          <CtaBand heading={`Considering a ${rt.name.toLowerCase()} roof?`}/>

          <div style={{ marginTop:56 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:18 }}>Other Roof Types</div>
            <div className="ld-rel" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
              {others.map(o=>(
                <Link key={o.slug} to={`/roof-types/${o.slug}`} style={{ display:'block', padding:'18px 20px', border:`1px solid ${BORDER}`, background:OFF, textDecoration:'none' }}>
                  <div style={{ fontSize:15, fontWeight:700, color:NAVY, marginBottom:4 }}>{o.name}</div>
                  <div style={{ fontSize:13, color:MUTED }}>{o.life} · Learn more →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:600px){.ld-rel{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
