import { useParams, Navigate, Link } from 'react-router-dom'
import Seo, { breadcrumbSchema, localBusinessSchema, faqSchema } from '../seo/Seo'
import { NAVY, ORANGE, OFF, MUTED, BORDER, WHITE, DARK, SITE_URL, PHONE_HOUSTON, PHONE_DALLAS } from '../ui/theme'
import { PageHero, CtaBand, FaqAccordion } from '../ui/page-bits'
import { Stars } from '../ui/primitives'
import { getLocationBySlug, getLocationBySlug as findLoc } from '../data/locations'
import { CITIES } from '../data/locations'
import { SERVICES } from '../data/services'
import { ROOF_TYPES } from '../data/roofTypes'
import { REVIEWS } from '../data/content'

const phoneFor = (metro) => metro === 'dallas' ? PHONE_DALLAS : PHONE_HOUSTON

// Location-specific FAQs so each page has unique, useful Q&A (not boilerplate).
function localFaqs(loc) {
  const where = loc.kind === 'county' ? loc.name : `${loc.name}, TX`
  return [
    { q:`Do you offer free roof inspections in ${where}?`,
      a:`Yes. Our roof inspections in ${where} are completely free with no obligation. We arrive on time, inspect thoroughly, document every issue with photos, and walk you through exactly what we find.` },
    { q:`Do you help with insurance claims in ${where}?`,
      a:`Absolutely. ${loc.metro === 'dallas' ? 'North Texas' : 'the Gulf Coast'} sees frequent storm and hail damage, and we guide ${where} homeowners through the entire claim process. In most approved claims, homeowners pay only their deductible.` },
    { q:`What roofing services do you provide in ${where}?`,
      a:`We provide complete residential and commercial roofing in ${where}: free inspections, roof repair, leak repair, full replacement, storm and hail damage restoration, attic ventilation, and commercial flat-roof systems.` },
    { q:`How soon can you get to my ${loc.kind === 'county' ? 'property' : 'home'} in ${where}?`,
      a:`We serve ${where} regularly and can usually schedule an inspection within a few days, sooner for active leaks or emergencies. Call ${phoneFor(loc.metro)} and we will find a time that works.` },
  ]
}

export default function LocationDetail() {
  const { slug } = useParams()
  const loc = getLocationBySlug(slug)
  if (!loc) return <Navigate to="/service-areas" replace />

  const isCounty = loc.kind === 'county'
  const where = isCounty ? loc.name : `${loc.name}, TX`
  const phone = phoneFor(loc.metro)
  const url = `${SITE_URL}/service-areas/${loc.slug}`
  const crumbs = [
    { name:'Home', path:'/' },
    { name:'Service Areas', path:'/service-areas' },
    { name:loc.name, path:`/service-areas/${loc.slug}` },
  ]
  const faqs = localFaqs(loc)

  // Nearby links: cities use their `nearby` list; counties link their member cities.
  const nearby = isCounty
    ? CITIES.filter(c => (loc.cities || []).includes(c.name))
    : (loc.nearby || []).map(s => findLoc(s)).filter(Boolean)

  const featuredServices = SERVICES.filter(s => ['roof-replacement','roof-repair','roof-leak-repair','roof-inspection','storm-damage-repair','commercial-roofing'].includes(s.slug))

  return (
    <>
      <Seo
        title={`Roofing in ${where} | Roof Repair & Replacement | LD Roofing`}
        description={`Trusted roofing contractor in ${where}. Free inspections, roof repair, replacement, storm damage, and insurance-claim help. BBB A+ rated, fully insured. Call ${phone}.`}
        path={`/service-areas/${loc.slug}`}
        schema={[
          breadcrumbSchema(crumbs),
          localBusinessSchema({ areaName: where, url, phone }),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        eyebrow={isCounty ? 'County Service Area' : `${loc.metro === 'dallas' ? 'Dallas–Fort Worth' : 'Greater Houston'} · ${loc.county || ''}`}
        title={`Roofing in ${loc.name}`}
        intro={loc.blurb}
        crumbs={crumbs}
      />

      <section style={{ background:WHITE, padding:'56px 48px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          {/* Trust + call row */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:16, alignItems:'center', justifyContent:'space-between', padding:'18px 24px', background:OFF, border:`1px solid ${BORDER}`, marginBottom:40 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}><Stars/><span style={{ fontSize:14, fontWeight:700, color:NAVY }}>5.0 · 63 reviews</span></div>
            <div style={{ fontSize:14, color:MUTED }}>BBB A+ · Fully Insured · Free Inspections</div>
            <a href={`tel:${phone}`} style={{ fontSize:15, fontWeight:700, color:ORANGE, textDecoration:'none' }}>{phone} →</a>
          </div>

          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(24px,3.5vw,32px)', color:NAVY, marginBottom:16 }}>Your local roofing contractor in {loc.name}</h2>
          <p style={{ fontSize:16, color:DARK, lineHeight:1.85, marginBottom:20 }}>
            LD Roofing & Exteriors is a family-owned roofing contractor serving {where}{loc.county && !isCounty ? ` and the rest of ${loc.county}` : ''}. We bring honest assessments, quality workmanship, and genuine customer service to every job, from a small leak repair to a full roof replacement.
          </p>
          <p style={{ fontSize:16, color:DARK, lineHeight:1.85, marginBottom:8 }}>
            Whether you just weathered a storm, you are dealing with an aging roof, or you simply want peace of mind, our free, photo-documented inspection tells you exactly where your roof stands, with no pressure and no upselling.
          </p>

          {/* County: list member cities */}
          {isCounty && loc.cities?.length > 0 && (
            <div style={{ marginTop:40 }}>
              <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:22, color:NAVY, marginBottom:16 }}>Cities we serve in {loc.name}</h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {nearby.map(c=>(<Link key={c.slug} to={`/service-areas/${c.slug}`} style={{ fontSize:13, fontWeight:600, background:OFF, border:`1px solid ${BORDER}`, padding:'8px 14px', color:NAVY, textDecoration:'none', borderRadius:2 }}>{c.name}</Link>))}
              </div>
            </div>
          )}

          {/* Services */}
          <div style={{ marginTop:48 }}>
            <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:22, color:NAVY, marginBottom:20 }}>Roofing services in {loc.name}</h3>
            <div className="ld-loc-svc" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:1, background:BORDER, border:`1px solid ${BORDER}` }}>
              {featuredServices.map(s=>(
                <Link key={s.slug} to={`/services/${s.slug}`} style={{ display:'block', background:WHITE, padding:'22px 24px', textDecoration:'none' }}
                  onMouseOver={e=>e.currentTarget.style.background=OFF} onMouseOut={e=>e.currentTarget.style.background=WHITE}>
                  <div style={{ fontSize:16, fontWeight:700, color:NAVY, marginBottom:6 }}>{s.title}</div>
                  <div style={{ fontSize:13, color:MUTED, lineHeight:1.7 }}>{s.short}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured review */}
          <div style={{ marginTop:48, background:NAVY, padding:'36px 32px', position:'relative' }}>
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:ORANGE }}/>
            <Stars/>
            <p style={{ fontSize:18, color:WHITE, lineHeight:1.7, fontFamily:"'Source Serif 4',serif", fontStyle:'italic', margin:'16px 0 14px' }}>{REVIEWS[loc.metro === 'dallas' ? 4 : 1].text}</p>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)' }}>— {REVIEWS[loc.metro === 'dallas' ? 4 : 1].name}, {REVIEWS[loc.metro === 'dallas' ? 4 : 1].role}</div>
          </div>

          <CtaBand heading={`Get a free roof inspection in ${loc.name}`} text={`Call ${phone} or request your free, no-obligation inspection online. We respond within 24 hours.`}/>

          {/* Nearby areas */}
          {!isCounty && nearby.length > 0 && (
            <div style={{ marginTop:48 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>Nearby Areas We Serve</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {nearby.map(c=>(<Link key={c.slug} to={`/service-areas/${c.slug}`} style={{ fontSize:13, fontWeight:600, background:OFF, border:`1px solid ${BORDER}`, padding:'8px 14px', color:NAVY, textDecoration:'none', borderRadius:2 }}>{c.name}</Link>))}
              </div>
            </div>
          )}

          {/* FAQ */}
          <div style={{ marginTop:56 }}>
            <FaqAccordion faqs={faqs} heading={`${loc.name} Roofing FAQs`}/>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:600px){.ld-loc-svc{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
