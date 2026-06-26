import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../seo/Seo'
import { NAVY, ORANGE, OFF, MUTED, BORDER, WHITE, DARK, PHONE_HOUSTON, PHONE_DALLAS } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { citiesByMetro, countiesByMetro } from '../data/locations'

function MetroBlock({ label, phone, accent, cities, counties }) {
  return (
    <div style={{ marginBottom:56 }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
        <div style={{ width:4, height:30, background:accent, borderRadius:2 }}/>
        <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(24px,3.5vw,32px)', color:NAVY }}>{label}</h2>
        <a href={`tel:${phone}`} style={{ marginLeft:'auto', fontSize:15, fontWeight:700, color:accent, textDecoration:'none' }}>{phone} →</a>
      </div>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:12 }}>Cities</div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
        {cities.map(c=>(<Link key={c.slug} to={`/service-areas/${c.slug}`} style={{ fontSize:13, fontWeight:600, background:OFF, border:`1px solid ${BORDER}`, padding:'8px 14px', color:NAVY, textDecoration:'none', borderRadius:2 }}>{c.name}</Link>))}
      </div>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:12 }}>Counties</div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {counties.map(c=>(<Link key={c.slug} to={`/service-areas/${c.slug}`} style={{ fontSize:13, fontWeight:600, background:WHITE, border:`1px solid ${accent}`, padding:'8px 14px', color:accent, textDecoration:'none', borderRadius:2 }}>{c.name}</Link>))}
      </div>
    </div>
  )
}

export default function Locations() {
  const crumbs = [{ name:'Home', path:'/' }, { name:'Service Areas', path:'/service-areas' }]
  return (
    <>
      <Seo
        title="Roofing Service Areas in Houston, Dallas & Across Texas"
        description="LD Roofing serves the greater Houston and Dallas-Fort Worth metros and surrounding counties. Find roofing in your city: Sugar Land, Katy, Plano, Frisco, Fort Worth, and many more."
        path="/service-areas"
        schema={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        eyebrow="Coverage"
        title="Service Areas"
        intro="Two divisions, one standard. We serve homeowners and businesses across the greater Houston and Dallas-Fort Worth metros and the surrounding counties. Find your city or county below."
        crumbs={crumbs}
      />
      <section style={{ background:WHITE, padding:'72px 48px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>
          <MetroBlock label="Greater Houston" phone={PHONE_HOUSTON} accent={NAVY} cities={citiesByMetro('houston')} counties={countiesByMetro('houston')}/>
          <MetroBlock label="Dallas–Fort Worth" phone={PHONE_DALLAS} accent={ORANGE} cities={citiesByMetro('dallas')} counties={countiesByMetro('dallas')}/>
          <CtaBand heading="Don’t see your city? We probably still serve it."/>
        </div>
      </section>
    </>
  )
}
