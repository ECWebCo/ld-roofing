import { useState, useEffect, useRef } from 'react'

// ─── Brand ────────────────────────────────────────────────────
const NAVY   = '#1B2B5E'
const ORANGE = '#F07B21'
const LIGHT  = '#F5F6FA'
const DARK   = '#111827'
const MUTED  = '#6B7280'
const BORDER = '#E5E7EB'
const WHITE  = '#FFFFFF'

const PHONE  = '(469) 585-8908'
const EMAIL  = 'Info@ld-roofing.com'
const GOOGLE_REVIEW = 'https://g.page/r/CaUKEJj0OhMkEB0/review'

// ─── Google Reviews (real) ────────────────────────────────────
const REVIEWS = [
  { name:'Rick', initial:'R', stars:5, text:'LD Roofing & Exteriors are the most professional and friendly contractors I have ever worked with! Top Quality work and great pricing! Lane the owner really cares about helping his clients!' },
  { name:'Jason', initial:'J', stars:5, text:'Lane was superb. He kept us informed and was timely along the way. We will certainly use his service again and recommend LD Roofing and Exteriors.' },
  { name:'Robert', initial:'R', stars:5, text:'Robert was great to work with!! Great communicator and quick to answer questions and walk us through everything.' },
  { name:'ABNB Owner', initial:'A', stars:5, text:'LD Roofing came in very competitively. Lane sent me progress photos and made the whole process seamless and simple. They finished on-time and did a thorough job cleaning up.' },
  { name:'Ruben', initial:'R', stars:5, text:'LD Roofing and Exteriors offered a free roof assessment after a recent hailstorm. Very professional and provided full assistance with our claim process. Roof completed in a day.' },
]

// ─── Services ─────────────────────────────────────────────────
const SERVICES = [
  { icon:'🔍', title:'Free Roof Inspection', desc:'Comprehensive inspection at no cost. We identify issues before they become expensive problems.' },
  { icon:'🔨', title:'Roof Repair', desc:'Fast, reliable repairs for leaks, storm damage, missing shingles, and all roofing issues.' },
  { icon:'🏠', title:'Roof Replacement', desc:'Full residential and commercial roof replacement using premium materials.' },
  { icon:'💨', title:'Attic Venting', desc:'Proper ventilation extends roof life and reduces energy costs year-round.' },
  { icon:'💧', title:'Roof Leak Repair', desc:'Emergency leak repair available. We stop the damage and fix the root cause.' },
  { icon:'📋', title:'Free Roof Estimates', desc:'Transparent, detailed estimates with no obligation. Know your costs upfront.' },
]

const PROCESS = [
  { step:'01', title:'Schedule Inspection', desc:'Call or fill out our form. We\'ll schedule a free roof inspection at your convenience.' },
  { step:'02', title:'Roof Assessment', desc:'Our experts inspect your roof and document all findings with photos and detailed notes.' },
  { step:'03', title:'Transparent Estimate', desc:'Receive a clear, itemized estimate with no hidden fees or pressure.' },
  { step:'04', title:'Expert Installation', desc:'Our certified crew completes the job efficiently with premium materials.' },
  { step:'05', title:'Final Walkthrough', desc:'We walk through the completed work with you and leave your property spotless.' },
]

// ─── Stars ────────────────────────────────────────────────────
function Stars({ n = 5 }) {
  return <span style={{ color: ORANGE, fontSize: 16, letterSpacing: 2 }}>{'★'.repeat(n)}</span>
}

// ─── Nav ──────────────────────────────────────────────────────
function Nav({ onSchedule }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        background: scrolled || mobileOpen ? WHITE : 'transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 48px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/LD%20Logo.png" alt="LD Roofing" style={{ height: 48, width: 'auto', objectFit: 'contain' }} onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}/>
            <div style={{ display: 'none', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'Georgia,serif', fontSize: 20, fontWeight: 700, color: NAVY }}>LD</span>
              <span style={{ fontFamily: 'Georgia,serif', fontSize: 14, color: ORANGE, fontWeight: 600 }}>Roofing & Exteriors</span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="ld-nav-links" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {[['services','Services'],['process','Our Process'],['reviews','Reviews'],['service-areas','Areas Served']].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: scrolled ? DARK : WHITE, cursor: 'pointer', transition: 'color 0.2s', textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.4)' }}
                onMouseOver={e => e.target.style.color = ORANGE} onMouseOut={e => e.target.style.color = scrolled ? DARK : WHITE}>
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="ld-nav-cta" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href={`tel:${PHONE}`} style={{ fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: ORANGE, textDecoration: 'none', textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.3)' }}>{PHONE}</a>
            <button onClick={onSchedule} style={{ background: ORANGE, color: WHITE, border: 'none', padding: '10px 22px', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 4, transition: 'all 0.2s' }}
              onMouseOver={e => e.currentTarget.style.background = '#d96a15'} onMouseOut={e => e.currentTarget.style.background = ORANGE}>
              Free Inspection
            </button>
          </div>

          {/* Hamburger */}
          <button className="ld-ham" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}>
            {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 24, height: 2, background: scrolled || mobileOpen ? NAVY : WHITE, transition: '0.3s', transform: i===0&&mobileOpen?'rotate(45deg) translate(5px,5px)':i===2&&mobileOpen?'rotate(-45deg) translate(5px,-5px)':'none', opacity: i===1&&mobileOpen?0:1 }}/>)}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, top: 72, background: WHITE, zIndex: 299, display: 'flex', flexDirection: 'column', padding: '16px 0' }}>
          {[['services','Services'],['process','Our Process'],['reviews','Reviews'],['service-areas','Areas Served']].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: 'none', border: 'none', borderBottom: `1px solid ${BORDER}`, padding: '18px 32px', textAlign: 'left', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: DARK, cursor: 'pointer' }}>
              {label}
            </button>
          ))}
          <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={`tel:${PHONE}`} style={{ fontFamily: 'inherit', fontSize: 16, fontWeight: 700, color: ORANGE, textDecoration: 'none' }}>{PHONE}</a>
            <button onClick={() => { onSchedule(); setMobileOpen(false) }} style={{ background: ORANGE, color: WHITE, border: 'none', padding: '14px', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 4 }}>
              Schedule Free Inspection
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .ld-nav-links{display:none!important}
          .ld-nav-cta{display:none!important}
          .ld-ham{display:flex!important}
          nav{padding:0 24px!important}
        }
      `}</style>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero({ onSchedule }) {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: NAVY }}>
      {/* Background image */}
      <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.25 }}/>

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${NAVY}F0 0%, ${NAVY}B0 50%, rgba(240,123,33,0.15) 100%)` }}/>

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '120px 48px 80px', width: '100%' }}>
        <div className="ld-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }}>

          {/* Left — copy */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(240,123,33,0.15)', border: '1px solid rgba(240,123,33,0.4)', borderRadius: 4, padding: '6px 14px', marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: ORANGE }}>Houston & Dallas, Texas</span>
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, color: WHITE, lineHeight: 1.15, marginBottom: 24 }}>
              Your Trusted<br/><span style={{ color: ORANGE }}>Roofing Experts</span><br/>in Texas
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              Residential & commercial roofing services done right. Free inspections, honest estimates, and certified installation — serving Houston and Dallas.
            </p>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 40, flexWrap: 'wrap' }}>
              {['BBB A+ Rated','Licensed & Insured','Free Inspections','5★ Google Reviews'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: ORANGE, fontSize: 16 }}>✓</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{b}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={onSchedule} style={{ background: ORANGE, color: WHITE, border: 'none', padding: '16px 32px', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 4, transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = '#d96a15'} onMouseOut={e => e.currentTarget.style.background = ORANGE}>
                Get Free Inspection →
              </button>
              <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', color: WHITE, textDecoration: 'none', padding: '16px 24px', fontSize: 15, fontWeight: 600, borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                📞 {PHONE}
              </a>
            </div>
          </div>

          {/* Right — inline form */}
          <ScheduleForm inline/>
        </div>
      </div>

      <style>{`@media(max-width:900px){.ld-hero-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Schedule Form ────────────────────────────────────────────
function ScheduleForm({ inline, onClose }) {
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', service:'', message:'' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = () => {
    const body = `Name: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AAddress: ${form.address}%0AService: ${form.service}%0AMessage: ${form.message}`
    window.location.href = `mailto:${EMAIL}?subject=Free Roof Inspection Request&body=${body}`
    setSent(true)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', fontSize: 14, fontFamily: 'inherit',
    border: `1px solid ${BORDER}`, borderRadius: 4, outline: 'none',
    background: WHITE, color: DARK, boxSizing: 'border-box', marginBottom: 10,
  }

  if (sent) return (
    <div style={{ background: WHITE, borderRadius: 8, padding: '40px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
      <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: NAVY, marginBottom: 12 }}>Request Sent!</h3>
      <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>We'll be in touch within 24 hours to schedule your free inspection.</p>
      {!inline && <button onClick={onClose} style={{ marginTop: 20, background: ORANGE, color: WHITE, border: 'none', padding: '12px 24px', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 4 }}>Close</button>}
    </div>
  )

  return (
    <div style={{ background: WHITE, borderRadius: 8, padding: '32px 28px', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'Georgia,serif', fontSize: 22, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Schedule Free Inspection</div>
        <div style={{ fontSize: 13, color: MUTED }}>We respond within 24 hours</div>
      </div>
      <input style={inputStyle} placeholder="Full Name *" value={form.name} onChange={set('name')}/>
      <input style={inputStyle} placeholder="Phone Number *" value={form.phone} onChange={set('phone')}/>
      <input style={inputStyle} placeholder="Email Address" value={form.email} onChange={set('email')}/>
      <input style={inputStyle} placeholder="Property Address" value={form.address} onChange={set('address')}/>
      <select style={inputStyle} value={form.service} onChange={set('service')}>
        <option value="">Service Type</option>
        <option>Free Roof Inspection</option>
        <option>Roof Repair</option>
        <option>Roof Replacement</option>
        <option>Roof Leak Repair</option>
        <option>Attic Venting</option>
        <option>Commercial Roofing</option>
        <option>Free Estimate</option>
      </select>
      <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80, marginBottom: 16 }} placeholder="Additional notes (optional)" value={form.message} onChange={set('message')}/>
      <button onClick={handleSubmit} style={{ width: '100%', background: ORANGE, color: WHITE, border: 'none', padding: '14px', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 4, transition: 'background 0.2s' }}
        onMouseOver={e => e.currentTarget.style.background = '#d96a15'} onMouseOut={e => e.currentTarget.style.background = ORANGE}>
        Request Free Inspection →
      </button>
      <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: MUTED }}>Or call us directly: <a href={`tel:${PHONE}`} style={{ color: ORANGE, fontWeight: 700 }}>{PHONE}</a></div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────
function Services({ onSchedule }) {
  return (
    <section id="services" style={{ background: LIGHT, padding: '96px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>What We Do</div>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,44px)', color: NAVY, marginBottom: 16 }}>Complete Roofing Services</h2>
          <p style={{ fontSize: 16, color: MUTED, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>Residential and commercial roofing solutions for Houston and Dallas. Every job backed by our satisfaction guarantee.</p>
        </div>

        <div className="ld-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ background: WHITE, borderRadius: 8, padding: '32px 28px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'all 0.3s', cursor: 'default' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 18, color: NAVY, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onSchedule} style={{ background: NAVY, color: WHITE, border: 'none', padding: '16px 36px', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 4, transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#142050'} onMouseOut={e => e.currentTarget.style.background = NAVY}>
            Schedule Your Free Inspection
          </button>
        </div>
      </div>
      <style>{`@media(max-width:900px){.ld-services-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Why Us ───────────────────────────────────────────────────
function WhyUs() {
  return (
    <section style={{ background: NAVY, padding: '96px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="ld-why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>Why LD Roofing</div>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,44px)', color: WHITE, marginBottom: 24, lineHeight: 1.2 }}>Family-Owned. Houston Proud. Dallas Strong.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 32 }}>
              My wife Dana and I built LD Roofing & Exteriors to be the company we'd want working on our own home — honest, thorough, and always available. We specialize in both residential and commercial roofing and treat every job like it's our own property.
            </p>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>— Lane Pauly, Owner</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { stat:'BBB A+', label:'Accredited Rating' },
                { stat:'5★', label:'Google Reviews' },
                { stat:'30+', label:'Years Combined Experience' },
                { stat:'Free', label:'Inspections & Estimates' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '20px 20px' }}>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: 28, fontWeight: 700, color: ORANGE, marginBottom: 4 }}>{item.stat}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" alt="Roofing team" style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 8 }}/>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.ld-why-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────
function Process({ onSchedule }) {
  return (
    <section id="process" style={{ background: WHITE, padding: '96px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>How It Works</div>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,44px)', color: NAVY }}>Our Proven Process</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PROCESS.map((step, i) => (
            <div key={i} className="ld-process-item" style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, padding: '32px 0', borderBottom: i < PROCESS.length - 1 ? `1px solid ${BORDER}` : 'none', alignItems: 'start' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: i % 2 === 0 ? ORANGE : NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 700, color: WHITE }}>{step.step}</span>
              </div>
              <div style={{ paddingTop: 12 }}>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: NAVY, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button onClick={onSchedule} style={{ background: ORANGE, color: WHITE, border: 'none', padding: '16px 36px', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 4, transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#d96a15'} onMouseOut={e => e.currentTarget.style.background = ORANGE}>
            Start with a Free Inspection
          </button>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-process-item{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────
function Reviews() {
  return (
    <section id="reviews" style={{ background: LIGHT, padding: '96px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>Testimonials</div>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,44px)', color: NAVY, marginBottom: 16 }}>What Our Customers Say</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Stars/>
            <span style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>5.0</span>
            <span style={{ fontSize: 14, color: MUTED }}>Google Rating</span>
          </div>
        </div>

        <div className="ld-reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: WHITE, borderRadius: 8, padding: '28px 24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <Stars/>
              <p style={{ fontSize: 14, color: DARK, lineHeight: 1.8, margin: '16px 0', fontStyle: 'italic' }}>"{r.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: WHITE }}>{r.initial}</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: MUTED }}>Google Review</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href={GOOGLE_REVIEW} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: WHITE, border: `2px solid ${BORDER}`, borderRadius: 4, padding: '12px 24px', textDecoration: 'none', fontSize: 14, fontWeight: 600, color: NAVY, transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE }} onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = NAVY }}>
            ⭐ Leave a Google Review
          </a>
        </div>
      </div>
      <style>{`@media(max-width:900px){.ld-reviews-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Service Areas ────────────────────────────────────────────
function ServiceAreas() {
  const houston = ['Houston','Bellaire','Sugar Land','Katy','The Woodlands','Pearland','Cypress','Missouri City','Spring','Friendswood','Clear Lake','Pasadena','Humble','League City']
  const dallas  = ['Dallas','Plano','Frisco','Allen','McKinney','Irving','Garland','Mesquite','Carrollton','Richardson','Grand Prairie','Arlington','Denton','Lewisville']

  return (
    <section id="service-areas" style={{ background: WHITE, padding: '96px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>Where We Work</div>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(28px,4vw,44px)', color: NAVY }}>Serving Houston & Dallas</h2>
        </div>

        <div className="ld-areas-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {[{ city: 'Houston', areas: houston }, { city: 'Dallas', areas: dallas }].map(({ city, areas }) => (
            <div key={city} style={{ background: LIGHT, borderRadius: 8, padding: '36px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 4, height: 32, background: ORANGE, borderRadius: 2 }}/>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: NAVY }}>{city} Area</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {areas.map(a => (
                  <span key={a} style={{ fontSize: 13, background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: '4px 10px', color: DARK }}>{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-areas-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────
function CTABanner({ onSchedule }) {
  return (
    <section style={{ background: ORANGE, padding: '72px 48px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(26px,4vw,40px)', color: WHITE, marginBottom: 16 }}>Ready for a Free Roof Inspection?</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 36, lineHeight: 1.7 }}>
          Don't wait until a small problem becomes a major repair. Our certified team will inspect your roof at no cost and give you an honest assessment.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onSchedule} style={{ background: WHITE, color: ORANGE, border: 'none', padding: '16px 32px', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 4, transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#f0f0f0'} onMouseOut={e => e.currentTarget.style.background = WHITE}>
            Schedule Free Inspection
          </button>
          <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', color: WHITE, textDecoration: 'none', padding: '16px 24px', fontSize: 15, fontWeight: 600, borderRadius: 4, border: '1px solid rgba(255,255,255,0.4)', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
            📞 {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: DARK, padding: '64px 48px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="ld-footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: 22, fontWeight: 700, color: WHITE, marginBottom: 4 }}>LD Roofing & Exteriors</div>
            <div style={{ fontSize: 13, color: ORANGE, marginBottom: 16 }}>Houston & Dallas, Texas</div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 300 }}>Family-owned roofing company serving Houston and Dallas with residential and commercial roofing, free inspections, and honest estimates.</p>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href={`tel:${PHONE}`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = ORANGE} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = ORANGE} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>{EMAIL}</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: ORANGE, marginBottom: 16 }}>Services</div>
            {['Free Roof Inspection','Roof Repair','Roof Replacement','Attic Venting','Roof Leak Repair','Commercial Roofing'].map(s => (
              <div key={s} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: ORANGE, marginBottom: 16 }}>Service Areas</div>
            {['Houston','Dallas','Sugar Land','Katy','Plano','Frisco','The Woodlands','McKinney'].map(a => (
              <div key={a} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{a}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© {new Date().getFullYear()} LD Roofing & Exteriors LLC. All rights reserved.</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Website by <a href="https://ecwebco.com" target="_blank" rel="noreferrer" style={{ color: ORANGE, textDecoration: 'none' }}>EC Web Co</a></div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-footer-grid{grid-template-columns:1fr!important}.ld-footer-grid>div{border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:24px}}`}</style>
    </footer>
  )
}

// ─── Schedule Modal ───────────────────────────────────────────
function ScheduleModal({ onClose }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onClose}/>
      <div style={{ position: 'relative', width: 'min(480px,92vw)', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: -40, right: 0, background: 'none', border: 'none', color: WHITE, fontSize: 24, cursor: 'pointer' }}>✕</button>
        <ScheduleForm onClose={onClose}/>
      </div>
    </div>
  )
}

// ─── Sticky mobile bar ────────────────────────────────────────
function StickyBar({ onSchedule }) {
  return (
    <>
      <div className="ld-sticky" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, display: 'none', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <a href={`tel:${PHONE}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 8px', background: NAVY, color: WHITE, textDecoration: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          📞 Call
        </a>
        <button onClick={onSchedule} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 8px', background: ORANGE, color: WHITE, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Free Inspection →
        </button>
      </div>
      <style>{`@media(max-width:768px){.ld-sticky{display:flex!important}}`}</style>
    </>
  )
}

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  const [scheduleOpen, setScheduleOpen] = useState(false)

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: DARK, overflowX: 'hidden' }}>
      <Nav onSchedule={() => setScheduleOpen(true)}/>
      <Hero onSchedule={() => setScheduleOpen(true)}/>
      <Services onSchedule={() => setScheduleOpen(true)}/>
      <WhyUs/>
      <Process onSchedule={() => setScheduleOpen(true)}/>
      <Reviews/>
      <ServiceAreas/>
      <CTABanner onSchedule={() => setScheduleOpen(true)}/>
      <Footer/>
      <StickyBar onSchedule={() => setScheduleOpen(true)}/>
      {scheduleOpen && <ScheduleModal onClose={() => setScheduleOpen(false)}/>}
    </div>
  )
}
