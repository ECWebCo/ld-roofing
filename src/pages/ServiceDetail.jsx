import { useParams, Navigate, Link } from 'react-router-dom'
import Seo, { breadcrumbSchema, serviceSchema, faqSchema } from '../seo/Seo'
import { NAVY, ORANGE, OFF, MUTED, BORDER, WHITE } from '../ui/theme'
import { PageHero, CtaBand } from '../ui/page-bits'
import { renderSection } from '../ui/primitives'
import { getServiceBySlug, SERVICES } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)
  if (!service) return <Navigate to="/services" replace />

  const crumbs = [
    { name:'Home', path:'/' },
    { name:'Services', path:'/services' },
    { name:service.title, path:`/services/${service.slug}` },
  ]
  const related = SERVICES.filter(s => s.slug !== service.slug && s.audience === service.audience).slice(0, 4)

  return (
    <>
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
        schema={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: service.title, description: service.metaDescription }),
        ]}
      />
      <PageHero eyebrow="Roofing Service" title={service.h1} intro={service.intro} crumbs={crumbs}/>
      <section style={{ background:WHITE, padding:'64px 48px' }}>
        <div style={{ maxWidth:780, margin:'0 auto' }}>
          {service.body.map(renderSection)}
          <CtaBand heading={`Need ${service.title.toLowerCase()} in Houston or Dallas?`}/>

          <div style={{ marginTop:56 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:18 }}>Related Services</div>
            <div className="ld-rel" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
              {related.map(r=>(
                <Link key={r.slug} to={`/services/${r.slug}`} style={{ display:'block', padding:'18px 20px', border:`1px solid ${BORDER}`, background:OFF, textDecoration:'none' }}>
                  <div style={{ fontSize:15, fontWeight:700, color:NAVY, marginBottom:4 }}>{r.title}</div>
                  <div style={{ fontSize:13, color:MUTED }}>Learn more →</div>
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
