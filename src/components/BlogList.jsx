import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '../blog/posts'

const NAVY    = '#0F1F4B'
const ORANGE  = '#E8701A'
const OFF     = '#F8F7F4'
const DARK    = '#0D0D0D'
const MUTED   = '#6B7280'
const BORDER  = '#E2E0DB'
const WHITE   = '#FFFFFF'

const TOP_BAR_HEIGHT = 36

export default function BlogList() {
  useEffect(() => {
    document.title = 'Roofing Blog | LD Roofing & Exteriors'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', 'Expert roofing advice, guides, and insights for Texas homeowners from LD Roofing & Exteriors. Houston and Dallas roofing specialists.')
    window.scrollTo(0, 0)
  }, [])

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
  }

  return (
    <div style={{ background:WHITE, minHeight:'100vh', paddingTop:TOP_BAR_HEIGHT + 110 }}>
      {/* Hero */}
      <section style={{ background:NAVY, padding:'80px 48px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:5, background:ORANGE }}/>
        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative' }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:14 }}>The LD Roofing Blog</div>
          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(40px,6vw,68px)', fontWeight:800, color:WHITE, lineHeight:0.95, textTransform:'uppercase', letterSpacing:'-0.5px', marginBottom:18 }}>
            Roofing Guides<br/>& Insights
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.65)', lineHeight:1.75, maxWidth:560 }}>
            Honest, practical roofing advice for Texas homeowners and property managers. No fluff, no upsells, just clear answers from a team that does this every day.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding:'80px 48px 96px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          {BLOG_POSTS.length === 0 ? (
            <p style={{ fontSize:16, color:MUTED, textAlign:'center' }}>New articles coming soon.</p>
          ) : (
            <div className="ld-blog-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:32 }}>
              {BLOG_POSTS.map(post => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  style={{ textDecoration:'none', color:'inherit', display:'block', background:WHITE, border:`1px solid ${BORDER}`, transition:'transform 0.3s ease, box-shadow 0.3s ease' }}
                  onMouseOver={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(15,31,75,0.12)' }}
                  onMouseOut={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
                >
                  <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', background:OFF }}>
                    <img src={post.coverImage} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                    <div style={{ position:'absolute', top:16, left:16, background:`${ORANGE}E6`, color:WHITE, fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'6px 12px' }}>
                      {post.category}
                    </div>
                  </div>
                  <div style={{ padding:'28px 30px 32px' }}>
                    <div style={{ display:'flex', gap:14, fontSize:12, color:MUTED, marginBottom:14, letterSpacing:'0.5px' }}>
                      <span>{formatDate(post.published)}</span>
                      <span style={{ color:BORDER }}>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:22, color:NAVY, lineHeight:1.3, marginBottom:12 }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize:14, color:MUTED, lineHeight:1.75, marginBottom:18 }}>
                      {post.excerpt}
                    </p>
                    <span style={{ fontSize:13, fontWeight:700, color:ORANGE, letterSpacing:'0.5px' }}>
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`@media(max-width:768px){.ld-blog-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}
