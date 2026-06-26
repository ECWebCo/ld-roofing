import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NAVY, ORANGE, ORANGE2, OFF, DARK, MUTED, BORDER, WHITE, BTN, TOP_BAR_HEIGHT } from './theme'
import { useModals } from './primitives'

// ─── Breadcrumb trail (visual; pair with breadcrumbSchema in <Seo>) ──────────
export function Breadcrumbs({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize:13, color:'rgba(255,255,255,0.6)', marginBottom:18, display:'flex', flexWrap:'wrap', gap:8 }}>
      {crumbs.map((c, i) => (
        <span key={c.path} style={{ display:'inline-flex', gap:8 }}>
          {i > 0 && <span style={{ color:'rgba(255,255,255,0.3)' }}>/</span>}
          {i < crumbs.length - 1
            ? <Link to={c.path} style={{ color:'rgba(255,255,255,0.6)', textDecoration:'none' }}>{c.name}</Link>
            : <span style={{ color:ORANGE }}>{c.name}</span>}
        </span>
      ))}
    </nav>
  )
}

// ─── Sub-page hero (navy band with eyebrow, H1, intro, breadcrumbs) ──────────
export function PageHero({ eyebrow, title, intro, crumbs }) {
  return (
    <section style={{ background:NAVY, padding:`${TOP_BAR_HEIGHT + 130}px 48px 64px`, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:5, background:ORANGE }}/>
      <div style={{ maxWidth:1000, margin:'0 auto', position:'relative' }}>
        {crumbs && <Breadcrumbs crumbs={crumbs}/>}
        {eyebrow && <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>{eyebrow}</div>}
        <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(40px,6vw,72px)', fontWeight:800, color:WHITE, lineHeight:1, marginBottom:20, textTransform:'uppercase', letterSpacing:'-0.5px' }}>{title}</h1>
        {intro && <p style={{ fontSize:18, color:'rgba(255,255,255,0.72)', lineHeight:1.7, maxWidth:680 }}>{intro}</p>}
      </div>
    </section>
  )
}

// ─── Mid/late-page CTA band ──────────────────────────────────────────────────
export function CtaBand({ heading = 'Ready for a free inspection?', text = 'Free, thorough inspections from a team built on customer service. Houston and Dallas.' }) {
  const { openSchedule, openCall } = useModals()
  return (
    <div style={{ background:NAVY, padding:'40px 36px', marginTop:56, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:ORANGE }}/>
      <div style={{ position:'relative' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:14 }}>Get Started Today</div>
        <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(22px,3.5vw,30px)', color:WHITE, lineHeight:1.2, marginBottom:14 }}>{heading}</h2>
        <p style={{ fontSize:15, color:'rgba(255,255,255,0.7)', lineHeight:1.7, marginBottom:24, maxWidth:560 }}>{text}</p>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <button onClick={openSchedule} style={BTN} onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Schedule Free Inspection</button>
          <button onClick={openCall} style={{ background:'transparent', color:WHITE, border:'1px solid rgba(255,255,255,0.3)', padding:'14px 22px', fontSize:13, fontWeight:600, fontFamily:'inherit', cursor:'pointer', borderRadius:2 }}>Call Us</button>
        </div>
      </div>
    </div>
  )
}

// ─── Reusable FAQ accordion (pair with faqSchema in <Seo>) ───────────────────
export function FaqAccordion({ faqs, heading = 'Frequently Asked Questions' }) {
  const [open, setOpen] = useState(0)
  return (
    <div>
      {heading && <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(24px,3.5vw,34px)', color:NAVY, marginBottom:28 }}>{heading}</h2>}
      <div style={{ border:`1px solid ${BORDER}`, background:WHITE }}>
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{ width:'100%', background: isOpen ? OFF : WHITE, border:'none', padding:'22px 28px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, textAlign:'left', fontFamily:'inherit' }}>
                <span style={{ fontFamily:"'Source Serif 4',serif", fontSize:17, fontWeight:600, color:NAVY, lineHeight:1.4 }}>{f.q}</span>
                <span style={{ flexShrink:0, width:28, height:28, borderRadius:'50%', background: isOpen ? ORANGE : 'transparent', border: isOpen ? 'none' : `1.5px solid ${BORDER}`, display:'flex', alignItems:'center', justifyContent:'center', color: isOpen ? WHITE : NAVY, fontSize:16, fontWeight:700, transition:'all 0.25s ease', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              <div style={{ maxHeight: isOpen ? 800 : 0, overflow:'hidden', transition:'max-height 0.4s ease' }}>
                <div style={{ padding:'4px 28px 28px', fontSize:15, color:MUTED, lineHeight:1.85 }}>{f.a}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
