import { Link, useParams, Navigate } from 'react-router-dom'
import { getPostBySlug } from '../blog/posts'
import Seo, { breadcrumbSchema } from '../seo/Seo'
import { SITE_URL, OG_IMAGE } from '../ui/theme'
import { useModals } from '../ui/primitives'

const NAVY    = '#0F1F4B'
const ORANGE  = '#E8701A'
const OFF     = '#F8F7F4'
const DARK    = '#0D0D0D'
const MUTED   = '#6B7280'
const BORDER  = '#E2E0DB'
const WHITE   = '#FFFFFF'

const TOP_BAR_HEIGHT = 36

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const { openSchedule, openCall } = useModals()

  if (!post) return <Navigate to="/blog" replace />

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'LD Roofing & Exteriors', logo: { '@type': 'ImageObject', url: OG_IMAGE } },
    datePublished: post.published,
    dateModified: post.published,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
  }
  const breadcrumbs = breadcrumbSchema([
    { name:'Home', path:'/' }, { name:'Blog', path:'/blog' }, { name:post.title, path:`/blog/${post.slug}` },
  ])

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
  }

  const renderSection = (section, i) => {
    switch (section.type) {
      case 'h2':
        return <h2 key={i} style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(22px,3vw,30px)', color:NAVY, lineHeight:1.25, marginTop:48, marginBottom:18 }}>{section.text}</h2>
      case 'h3':
        return <h3 key={i} style={{ fontFamily:"'Source Serif 4',serif", fontSize:20, color:NAVY, lineHeight:1.3, marginTop:32, marginBottom:14 }}>{section.text}</h3>
      case 'ul':
        return (
          <ul key={i} style={{ paddingLeft:24, marginBottom:24, color:DARK, fontSize:16, lineHeight:1.85 }}>
            {section.items.map((item, j) => (
              <li key={j} style={{ marginBottom:10 }}>{item}</li>
            ))}
          </ul>
        )
      case 'callout':
        return (
          <div key={i} style={{ background:OFF, borderLeft:`4px solid ${ORANGE}`, padding:'22px 28px', margin:'40px 0', fontSize:16, color:DARK, lineHeight:1.8, fontStyle:'italic' }}>
            {section.text}
          </div>
        )
      case 'p':
      default:
        return <p key={i} style={{ fontSize:16, color:DARK, lineHeight:1.85, marginBottom:20 }}>{section.text}</p>
    }
  }

  return (
    <div style={{ background:WHITE, minHeight:'100vh', paddingTop:TOP_BAR_HEIGHT + 110 }}>
      <Seo
        title={`${post.title} | LD Roofing & Exteriors`}
        description={post.description}
        path={`/blog/${post.slug}`}
        image={post.coverImage}
        type="article"
        schema={[articleSchema, breadcrumbs]}
      />
      {/* Cover image */}
      <div style={{ position:'relative', width:'100%', aspectRatio:'21/9', maxHeight:480, overflow:'hidden', background:NAVY }}>
        <img src={post.coverImage} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, transparent 30%, rgba(15,31,75,0.7) 100%)` }}/>
      </div>

      {/* Article */}
      <article style={{ maxWidth:780, margin:'0 auto', padding:'56px 32px 96px' }}>
        {/* Back link */}
        <Link to="/blog" style={{ display:'inline-block', fontSize:13, fontWeight:600, color:ORANGE, textDecoration:'none', letterSpacing:'0.5px', marginBottom:24 }}>
          ← All Articles
        </Link>

        {/* Meta */}
        <div style={{ display:'flex', gap:14, fontSize:13, color:MUTED, marginBottom:18, letterSpacing:'0.5px', flexWrap:'wrap' }}>
          <span style={{ color:ORANGE, fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', fontSize:11 }}>{post.category}</span>
          <span style={{ color:BORDER }}>·</span>
          <span>{formatDate(post.published)}</span>
          <span style={{ color:BORDER }}>·</span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(32px,5vw,48px)', color:NAVY, lineHeight:1.15, marginBottom:18 }}>
          {post.title}
        </h1>

        {/* Author */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'20px 0', borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, marginBottom:40 }}>
          <div style={{ width:40, height:40, borderRadius:'50%', background:NAVY, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontSize:14, fontWeight:700, color:WHITE }}>{post.author[0]}</span>
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:NAVY }}>{post.author}</div>
            <div style={{ fontSize:12, color:MUTED, marginTop:1 }}>LD Roofing & Exteriors</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ fontFamily:"'Barlow',sans-serif" }}>
          {post.body.map(renderSection)}
        </div>

        {/* CTA */}
        <div style={{ background:NAVY, padding:'40px 36px', marginTop:64, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:ORANGE }}/>
          <div style={{ position:'relative' }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:14 }}>Get Started Today</div>
            <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(22px,3.5vw,30px)', color:WHITE, lineHeight:1.2, marginBottom:14 }}>
              Ready for a free inspection?
            </h3>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.7)', lineHeight:1.7, marginBottom:24 }}>
              Free, thorough inspections from a team built on customer service. Houston and Dallas.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <button onClick={openSchedule} style={{
                background:ORANGE, color:WHITE, border:'none', padding:'14px 28px', fontSize:13, fontWeight:700,
                fontFamily:'inherit', cursor:'pointer', borderRadius:2, letterSpacing:'0.5px', textTransform:'uppercase',
              }}>
                Schedule Free Inspection
              </button>
              <button onClick={openCall} style={{
                background:'transparent', color:WHITE, border:'1px solid rgba(255,255,255,0.3)',
                padding:'14px 22px', fontSize:13, fontWeight:600, fontFamily:'inherit', cursor:'pointer', borderRadius:2,
              }}>
                Call Us
              </button>
            </div>
          </div>
        </div>

        {/* Back to blog */}
        <div style={{ marginTop:48, textAlign:'center' }}>
          <Link to="/blog" style={{ fontSize:14, fontWeight:600, color:NAVY, textDecoration:'none', letterSpacing:'0.5px' }}>
            ← Back to all articles
          </Link>
        </div>
      </article>
    </div>
  )
}
