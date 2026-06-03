import { useState, useEffect, useRef } from 'react'
import { FAQS } from '../blog/faqs'

const NAVY    = '#0F1F4B'
const ORANGE  = '#E8701A'
const OFF     = '#F8F7F4'
const DARK    = '#0D0D0D'
const MUTED   = '#6B7280'
const BORDER  = '#E2E0DB'
const WHITE   = '#FFFFFF'

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect() }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, shown]
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const [ref, shown] = useReveal(0.1)

  // Inject FAQPage JSON-LD schema for SEO rich results
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
      })),
    }
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'faq-schema'
    el.textContent = JSON.stringify(schema)
    // Remove any existing FAQ schema before adding new one
    const existing = document.getElementById('faq-schema')
    if (existing) existing.remove()
    document.head.appendChild(el)
    return () => {
      const cleanup = document.getElementById('faq-schema')
      if (cleanup) cleanup.remove()
    }
  }, [])

  return (
    <section id="faq" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'96px 48px' }}>
      <div style={{ maxWidth:960, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Frequently Asked Questions</div>
          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY, marginBottom:14 }}>Questions Homeowners Ask</h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>
            Straight answers to the questions we hear most often. Do not see yours? Reach out and we will get you the answer.
          </p>
        </div>

        <div style={{ border:`1px solid ${BORDER}`, background:WHITE }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width:'100%', background: isOpen ? OFF : WHITE,
                    border:'none', padding:'22px 28px', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    gap:20, textAlign:'left', fontFamily:'inherit',
                    transition:'background 0.2s',
                  }}
                  onMouseOver={e=>{ if(!isOpen) e.currentTarget.style.background=OFF }}
                  onMouseOut={e=>{ if(!isOpen) e.currentTarget.style.background=WHITE }}
                >
                  <span style={{
                    fontFamily:"'Source Serif 4',serif", fontSize:17, fontWeight:600,
                    color:NAVY, lineHeight:1.4,
                  }}>{f.q}</span>
                  <span style={{
                    flexShrink:0, width:28, height:28, borderRadius:'50%',
                    background: isOpen ? ORANGE : 'transparent',
                    border: isOpen ? 'none' : `1.5px solid ${BORDER}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color: isOpen ? WHITE : NAVY, fontSize:16, fontWeight:700,
                    transition:'all 0.25s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 600 : 0,
                  overflow:'hidden',
                  transition:'max-height 0.4s ease',
                }}>
                  <div style={{ padding:'4px 28px 28px', fontSize:15, color:MUTED, lineHeight:1.85, fontFamily:"'Barlow',sans-serif" }}>
                    {f.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
