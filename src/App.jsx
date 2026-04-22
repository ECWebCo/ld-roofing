import { useState, useEffect } from 'react'
import laneFamilyImg from './lane-family.png'
import wolfFamilyImg from './wolf-family.png'

const NAVY    = '#0F1F4B'
const NAVY2   = '#1a3070'
const ORANGE  = '#E8701A'
const ORANGE2 = '#c85e10'
const OFF     = '#F8F7F4'
const DARK    = '#0D0D0D'
const MUTED   = '#6B7280'
const BORDER  = '#E2E0DB'
const WHITE   = '#FFFFFF'

const PHONE = '(469) 585-8908'
const EMAIL = 'Info@ld-roofing.com'
const LOGO  = 'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/ChatGPT%20Image%20Apr%2021,%202026,%2009_48_39%20PM.png'

const REVIEWS = [
  { name:'Rick', role:'Business Owner', stars:5, text:'"LD Roofing & Exteriors are the most professional and friendly contractors I have ever worked with. Top quality work and great pricing. Lane the owner really cares about helping his clients."' },
  { name:'Jason', role:'Homeowner, Houston', stars:5, text:'"Lane was superb. He kept us informed and was timely along the way. We will certainly use his service again and recommend LD Roofing and Exteriors."' },
  { name:'Ruben', role:'Property Manager', stars:5, text:'"LD Roofing offered a free roof assessment after a hailstorm. Very professional, provided full assistance with our claim process. Our roof was completed in a single day."' },
  { name:'ABNB Owner', role:'Airbnb Host', stars:5, text:'"Lane sent progress photos throughout and made the whole process seamless. It was important they finished the same day — they did, and left everything spotless."' },
  { name:'Robert', role:'Homeowner, Dallas', stars:5, text:'"Robert Wolf was a great communicator — quick to answer questions and walk us through everything. Could not be happier with how the project turned out."' },
]

const SERVICES = [
  { title:'Free Roof Inspection', desc:'Thorough inspection at zero cost. We document every issue with photos and give you an honest report — no pressure, no upselling.' },
  { title:'Roof Replacement', desc:'Full residential and commercial replacement using premium shingles, TPO, metal, and tile. Done right the first time.' },
  { title:'Roof Repair', desc:'From minor leaks to major storm damage, our crew diagnoses and fixes the root cause — not just the symptom.' },
  { title:'Roof Leak Repair', desc:'Emergency response available. We stop active leaks fast and provide a lasting repair, not a temporary patch.' },
  { title:'Attic Venting', desc:'Improper ventilation is a leading cause of premature roof failure in Texas. We design and install systems that work.' },
  { title:'Commercial Roofing', desc:'Flat roofs, TPO, EPDM, and coatings for commercial properties of any size. Minimal disruption, maximum durability.' },
]

const PROCESS = [
  { n:'01', title:'Free Inspection', desc:'Call or submit a form. We schedule at your convenience and arrive on time.' },
  { n:'02', title:'Honest Assessment', desc:'We inspect thoroughly, document everything with photos, and explain what we find — clearly.' },
  { n:'03', title:'Clear Estimate', desc:'You receive a detailed, itemized quote. No hidden fees, no pressure, no surprises.' },
  { n:'04', title:'Expert Installation', desc:'Our certified crew works efficiently using premium materials, protecting your property throughout.' },
  { n:'05', title:'Final Walkthrough', desc:'We review the completed work with you and leave your property cleaner than we found it.' },
]

const GALLERY = [
  { src:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85', label:'Residential · Houston' },
  { src:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85', label:'Commercial Flat · Dallas' },
  { src:'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=900&q=85', label:'Storm Repair · Katy' },
  { src:'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=85', label:'Full Replacement · Sugar Land' },
  { src:'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=85', label:'Shingle Install · Plano' },
  { src:'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=900&q=85', label:'TPO Coating · Frisco' },
]

function Stars() {
  return <span style={{ color:ORANGE, fontSize:15, letterSpacing:3 }}>★★★★★</span>
}

const BTN = {
  background:ORANGE, color:WHITE, border:'none',
  padding:'14px 28px', fontSize:13, fontWeight:700,
  fontFamily:'inherit', cursor:'pointer', borderRadius:2,
  letterSpacing:'0.5px', textTransform:'uppercase', transition:'background 0.2s',
}

// ─── Nav ──────────────────────────────────────────────────────
function Nav({ onSchedule }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const go = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setOpen(false) }
  const bg = scrolled || open
  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:300, background:bg?'rgba(15,31,75,0.97)':'transparent', backdropFilter:bg?'blur(12px)':'none', borderBottom:bg?'1px solid rgba(255,255,255,0.08)':'none', transition:'all 0.35s ease' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', height:72, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <img src={LOGO} alt="LD Roofing" style={{ height:44, width:'auto', objectFit:'contain', cursor:'pointer', filter:'none' }}
            onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
            onError={e=>{e.target.style.display='none'; e.target.nextSibling.style.display='block'}}/>
          <span style={{ display:'none', fontFamily:"'Source Serif 4',serif", fontSize:18, fontWeight:700, color:WHITE, cursor:'pointer' }} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>LD Roofing</span>

          <div className="ld-links" style={{ display:'flex', gap:36 }}>
            {[['services','Services'],['process','Process'],['reviews','Reviews'],['service-areas','Areas']].map(([id,label])=>(
              <button key={id} onClick={()=>go(id)} style={{ background:'none', border:'none', fontFamily:'inherit', fontSize:13, fontWeight:500, letterSpacing:'0.5px', color:'rgba(255,255,255,0.7)', cursor:'pointer', transition:'color 0.2s' }}
                onMouseOver={e=>e.target.style.color=WHITE} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.7)'}>{label}</button>
            ))}
          </div>

          <div className="ld-cta" style={{ display:'flex', gap:20, alignItems:'center' }}>
            <a href={`tel:${PHONE}`} style={{ fontSize:14, fontWeight:700, color:WHITE, textDecoration:'none' }}>{PHONE}</a>
            <button onClick={onSchedule} style={{...BTN, padding:'10px 20px'}}
              onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
              Free Inspection
            </button>
          </div>

          <button className="ld-ham" onClick={()=>setOpen(!open)} style={{ display:'none', background:'none', border:'none', cursor:'pointer', flexDirection:'column', gap:5, padding:4 }}>
            {[0,1,2].map(i=><span key={i} style={{ display:'block', width:22, height:2, background:WHITE, transition:'0.3s', transform:i===0&&open?'rotate(45deg) translate(5px,5px)':i===2&&open?'rotate(-45deg) translate(5px,-5px)':'none', opacity:i===1&&open?0:1 }}/>)}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ position:'fixed', inset:0, top:72, background:NAVY, zIndex:299, display:'flex', flexDirection:'column', padding:'8px 0 32px' }}>
          {[['services','Services'],['process','Our Process'],['reviews','Reviews'],['service-areas','Areas Served']].map(([id,label])=>(
            <button key={id} onClick={()=>go(id)} style={{ background:'none', border:'none', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'20px 32px', textAlign:'left', fontFamily:'inherit', fontSize:16, fontWeight:600, color:WHITE, cursor:'pointer' }}>{label}</button>
          ))}
          <div style={{ padding:'28px 32px', display:'flex', flexDirection:'column', gap:12 }}>
            <a href={`tel:${PHONE}`} style={{ fontSize:18, fontWeight:700, color:ORANGE, textDecoration:'none' }}>{PHONE}</a>
            <button onClick={()=>{onSchedule();setOpen(false)}} style={{...BTN, textAlign:'center'}}
              onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
              Schedule Free Inspection
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        img{display:block;max-width:100%}
        body{font-family:'Barlow',sans-serif}
        @media(max-width:900px){.ld-links{display:none!important}.ld-cta{display:none!important}.ld-ham{display:flex!important}}
      `}</style>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero({ onSchedule }) {
  const [form, setForm] = useState({ name:'', phone:'', service:'' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}))
  const submit = () => {
    const body = `Name: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}`
    window.location.href = `mailto:${EMAIL}?subject=Free Roof Inspection Request&body=${body}`
    setSent(true)
  }
  const inp = { width:'100%', padding:'13px 16px', fontSize:14, fontFamily:"'Barlow',sans-serif", border:'none', outline:'none', background:'rgba(255,255,255,0.95)', color:DARK, boxSizing:'border-box', marginBottom:10, borderRadius:2 }

  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', background:NAVY, overflow:'hidden' }}>
      {/* Real aerial roof replacement photo */}
      <img
        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=85"
        alt="Roof replacement Texas"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 35%', opacity:0.55 }}
      />
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(100deg, ${NAVY}CC 35%, ${NAVY}88 65%, rgba(15,31,75,0.3) 100%)` }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:5, background:ORANGE }}/>

      <div style={{ position:'relative', maxWidth:1200, margin:'0 auto', padding:'140px 48px 100px', width:'100%' }}>
        <div className="ld-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:64, alignItems:'center' }}>

          {/* Left — copy */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <div style={{ width:28, height:3, background:ORANGE }}/>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, fontFamily:"'Barlow',sans-serif" }}>Houston & Dallas, Texas</span>
            </div>
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(48px,7vw,88px)', fontWeight:800, color:WHITE, lineHeight:0.95, marginBottom:24, textTransform:'uppercase', letterSpacing:'-0.5px' }}>
              Roofing You<br/>Can Actually<br/><span style={{ color:ORANGE }}>Trust.</span>
            </h1>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.7)', lineHeight:1.75, marginBottom:36, maxWidth:460, fontFamily:"'Barlow',sans-serif" }}>
              Family-owned. BBB A+ rated. Free inspections with zero pressure. Residential and commercial roofing done right — the first time.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 28px', maxWidth:380 }}>
              {[['BBB A+ Rated','Accredited Business'],['5.0 ★ Google','Verified Reviews'],['Licensed & Insured','Texas Certified'],['Free Inspections','No Commitment']].map(([a,b])=>(
                <div key={a} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ color:ORANGE, marginTop:2, flexShrink:0, fontSize:14 }}>✓</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:WHITE, fontFamily:"'Barlow',sans-serif" }}>{a}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:1 }}>{b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — inline form */}
          <div style={{ background:WHITE, borderRadius:4, overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.35)' }}>
            <div style={{ background:NAVY, borderBottom:`4px solid ${ORANGE}`, padding:'22px 24px' }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', color:WHITE, marginBottom:2 }}>Get a Free Inspection</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.55)' }}>We respond within 24 hours</div>
            </div>
            {sent ? (
              <div style={{ padding:'40px 24px', textAlign:'center' }}>
                <div style={{ fontSize:36, marginBottom:12 }}>✅</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:700, color:NAVY, textTransform:'uppercase', marginBottom:8 }}>Request Sent!</div>
                <p style={{ fontSize:14, color:MUTED, lineHeight:1.7 }}>We'll call you within 24 hours to schedule your free inspection.</p>
              </div>
            ) : (
              <div style={{ padding:'24px' }}>
                <input style={inp} placeholder="Your Name *" value={form.name} onChange={set('name')}/>
                <input style={{...inp, background:'#f0f0f0'}} placeholder="Phone Number *" value={form.phone} onChange={set('phone')}/>
                <select style={{...inp, color:form.service?DARK:MUTED}} value={form.service} onChange={set('service')}>
                  <option value="">Service Needed</option>
                  {['Free Roof Inspection','Roof Repair','Roof Replacement','Roof Leak Repair','Attic Venting','Commercial Roofing','Free Estimate'].map(s=><option key={s}>{s}</option>)}
                </select>
                <button onClick={submit} style={{ width:'100%', background:ORANGE, color:WHITE, border:'none', padding:'15px', fontSize:14, fontWeight:700, fontFamily:"'Barlow',sans-serif", cursor:'pointer', borderRadius:2, letterSpacing:'0.5px', textTransform:'uppercase', transition:'background 0.2s', marginBottom:12 }}
                  onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
                  Request Free Inspection →
                </button>
                <div style={{ textAlign:'center', fontSize:13, color:MUTED }}>
                  Or call: <a href={`tel:${PHONE}`} style={{ color:ORANGE, fontWeight:700, textDecoration:'none' }}>{PHONE}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.ld-hero-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Trust Bar ────────────────────────────────────────────────
function TrustBar() {
  return (
    <div style={{ background:ORANGE, padding:'16px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        {['Free Inspections — No Commitment','Licensed, Bonded & Insured','Residential & Commercial','Serving Houston & Dallas','BBB A+ Accredited'].map((t,i)=>(
          <span key={i} style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.92)', letterSpacing:'0.3px' }}>✓ {t}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────
function Services({ onSchedule }) {
  return (
    <section id="services" style={{ background:WHITE, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:56, flexWrap:'wrap', gap:24 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>What We Do</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY, lineHeight:1.1 }}>Complete Roofing<br/>Services</h2>
          </div>
          <button onClick={onSchedule} style={BTN}
            onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
            Schedule Free Inspection
          </button>
        </div>
        <div className="ld-svc" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:BORDER, border:`1px solid ${BORDER}` }}>
          {SERVICES.map((s,i)=>(
            <div key={i} style={{ background:WHITE, padding:'36px 32px', transition:'background 0.2s' }}
              onMouseOver={e=>e.currentTarget.style.background=OFF} onMouseOut={e=>e.currentTarget.style.background=WHITE}>
              <div style={{ width:36, height:3, background:ORANGE, marginBottom:24 }}/>
              <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:18, color:NAVY, marginBottom:12, lineHeight:1.3 }}>{s.title}</h3>
              <p style={{ fontSize:14, color:MUTED, lineHeight:1.85 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.ld-svc{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Divisions ────────────────────────────────────────────────
function Divisions() {
  return (
    <section style={{ background:OFF, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Our Teams</div>
          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY }}>Two Divisions. One Standard.</h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:480, margin:'16px auto 0', lineHeight:1.8 }}>Two family-run teams. When you call, you reach a real person who owns the business.</p>
        </div>
        <div className="ld-div" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
          {[
            { city:'Houston', accent:NAVY, name:'Lane & Dana Pauly', title:'Houston Division', desc:'Lane and Dana founded LD Roofing to be the company they\'d want working on their own home — honest, responsive, and detail-oriented. Lane personally oversees every Houston job from inspection to final walkthrough.', img:laneFamilyImg },
            { city:'Dallas', accent:ORANGE, name:'Robert & Lauren Wolf', title:'Dallas Division', desc:'Robert and Lauren Wolf bring the same family-first values to DFW. Their team specializes in both residential and commercial roofing, and they\'ve built their reputation on communication and clean, lasting work.', img:wolfFamilyImg },
          ].map((d,i)=>(
            <div key={i} style={{ background:WHITE, border:`1px solid ${BORDER}`, overflow:'hidden' }}>
              <div style={{ position:'relative', height:320, overflow:'hidden' }}>
                <img src={d.img} alt={d.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform 0.6s ease' }}
                  onMouseOver={e=>e.target.style.transform='scale(1.04)'} onMouseOut={e=>e.target.style.transform='scale(1)'}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}/>
                <div style={{ position:'absolute', bottom:18, left:22, fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:WHITE, background:d.accent, padding:'5px 12px' }}>{d.city}</div>
              </div>
              <div style={{ padding:'32px' }}>
                <div style={{ fontFamily:"'Source Serif 4',serif", fontSize:21, color:NAVY, marginBottom:4 }}>{d.name}</div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:20 }}>{d.title}</div>
                <p style={{ fontSize:14, color:MUTED, lineHeight:1.85, marginBottom:24 }}>{d.desc}</p>
                <a href={`tel:${PHONE}`} style={{ fontSize:14, fontWeight:700, color:NAVY, textDecoration:'none', transition:'color 0.2s' }}
                  onMouseOver={e=>e.currentTarget.style.color=ORANGE} onMouseOut={e=>e.currentTarget.style.color=NAVY}>{PHONE} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-div{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────
function Gallery() {
  return (
    <section style={{ background:DARK }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 48px 48px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:10 }}>Portfolio</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(26px,3.5vw,40px)', color:WHITE }}>Recent Projects</h2>
          </div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)', maxWidth:280, textAlign:'right', lineHeight:1.7 }}>Residential and commercial across Houston & Dallas.</p>
        </div>
      </div>
      <div className="ld-gal" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
        {GALLERY.map((g,i)=>(
          <div key={i} style={{ position:'relative', overflow:'hidden', aspectRatio:'4/3' }}>
            <img src={g.src} alt={g.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s ease', display:'block' }}
              onMouseOver={e=>e.target.style.transform='scale(1.06)'} onMouseOut={e=>e.target.style.transform='scale(1)'}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }}/>
            <div style={{ position:'absolute', bottom:18, left:18, fontSize:11, fontWeight:600, color:WHITE, letterSpacing:'0.5px' }}>{g.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.ld-gal{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────
function Process({ onSchedule }) {
  return (
    <section id="process" style={{ background:NAVY, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }} className="ld-proc">
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>How It Works</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,46px)', color:WHITE, lineHeight:1.12, marginBottom:24 }}>Our 5-Step<br/>Process</h2>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:40, maxWidth:380 }}>Every step is designed to make your experience transparent, easy, and stress-free.</p>
            <button onClick={onSchedule} style={{...BTN, padding:'16px 28px'}}
              onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
              Start with Free Inspection
            </button>
          </div>
          <div>
            {PROCESS.map((p,i)=>(
              <div key={i} style={{ display:'flex', gap:24, paddingBottom:30, borderBottom:i<PROCESS.length-1?'1px solid rgba(255,255,255,0.08)':'none', marginBottom:i<PROCESS.length-1?30:0 }}>
                <div style={{ fontSize:11, fontWeight:700, color:ORANGE, letterSpacing:'2px', minWidth:26, paddingTop:2 }}>{p.n}</div>
                <div>
                  <div style={{ fontSize:16, fontWeight:700, color:WHITE, marginBottom:6, fontFamily:"'Source Serif 4',serif" }}>{p.title}</div>
                  <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', lineHeight:1.75 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-proc{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────
function Reviews() {
  return (
    <section id="reviews" style={{ background:OFF, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:56, flexWrap:'wrap', gap:24 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Testimonials</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY }}>What Our Customers Say</h2>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end', marginBottom:4 }}>
              <Stars/><span style={{ fontSize:18, fontWeight:800, color:NAVY }}>5.0</span>
            </div>
            <div style={{ fontSize:12, color:MUTED }}>63 Google Reviews</div>
          </div>
        </div>
        <div className="ld-rev3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:20 }}>
          {REVIEWS.slice(0,3).map((r,i)=>(
            <div key={i} style={{ background:WHITE, padding:'30px 26px', border:`1px solid ${BORDER}` }}>
              <Stars/>
              <p style={{ fontSize:14, color:DARK, lineHeight:1.85, margin:'18px 0 22px', fontFamily:"'Source Serif 4',serif", fontStyle:'italic' }}>{r.text}</p>
              <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:18, display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:NAVY, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:WHITE }}>{r.name[0]}</span>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:NAVY }}>{r.name}</div>
                  <div style={{ fontSize:11, color:MUTED, marginTop:1 }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ld-rev2" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 }}>
          {REVIEWS.slice(3).map((r,i)=>(
            <div key={i} style={{ background:WHITE, padding:'30px 26px', border:`1px solid ${BORDER}` }}>
              <Stars/>
              <p style={{ fontSize:14, color:DARK, lineHeight:1.85, margin:'18px 0 22px', fontFamily:"'Source Serif 4',serif", fontStyle:'italic' }}>{r.text}</p>
              <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:18, display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:ORANGE, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:WHITE }}>{r.name[0]}</span>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:NAVY }}>{r.name}</div>
                  <div style={{ fontSize:11, color:MUTED, marginTop:1 }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-rev3,.ld-rev2{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Areas ────────────────────────────────────────────────────
function ServiceAreas() {
  return (
    <section id="service-areas" style={{ background:WHITE, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Coverage</div>
          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY }}>Serving Houston & Dallas</h2>
        </div>
        <div className="ld-area" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
          {[
            { city:'Houston', color:NAVY, areas:['Houston','Bellaire','Sugar Land','Katy','The Woodlands','Pearland','Cypress','Missouri City','Spring','Friendswood','Clear Lake','Pasadena','Humble','League City','Memorial','River Oaks'] },
            { city:'Dallas', color:ORANGE, areas:['Dallas','Plano','Frisco','Allen','McKinney','Irving','Garland','Mesquite','Carrollton','Richardson','Grand Prairie','Arlington','Denton','Lewisville','Grapevine','Southlake'] },
          ].map(({city,color,areas})=>(
            <div key={city} style={{ border:`1px solid ${BORDER}`, padding:'36px 32px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
                <div style={{ width:4, height:36, background:color, borderRadius:2 }}/>
                <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:22, color:NAVY }}>{city} Metro</h3>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {areas.map(a=><span key={a} style={{ fontSize:12, background:OFF, border:`1px solid ${BORDER}`, padding:'5px 12px', color:DARK }}>{a}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-area{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────
function CTA({ onSchedule }) {
  return (
    <section style={{ position:'relative', overflow:'hidden', background:NAVY, padding:'96px 48px' }}>
      <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=70" alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.1 }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:ORANGE }}/>
      <div style={{ position:'relative', maxWidth:700, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:20 }}>Get Started Today</div>
        <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4.5vw,54px)', color:WHITE, lineHeight:1.12, marginBottom:20 }}>Your Roof Deserves<br/>a Second Opinion.</h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.8, marginBottom:44 }}>Our inspection is completely free — no obligation, no pressure. Just an honest assessment from people who care.</p>
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={onSchedule} style={{...BTN, padding:'16px 36px', fontSize:14}}
            onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
            Schedule Free Inspection
          </button>
          <a href={`tel:${PHONE}`} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', color:WHITE, border:'1px solid rgba(255,255,255,0.4)', padding:'15px 22px', fontSize:13, fontWeight:600, textDecoration:'none', borderRadius:2, transition:'all 0.2s' }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
            ↗ {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background:DARK, padding:'72px 48px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div className="ld-ft" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:56, marginBottom:56, paddingBottom:56, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <img src={LOGO} alt="LD Roofing & Exteriors" style={{ height:48, width:'auto', objectFit:'contain', marginBottom:20, filter:'none' }}
              onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='block'}}/>
            <span style={{ display:'none', fontFamily:"'Source Serif 4',serif", fontSize:20, fontWeight:700, color:WHITE, display:'block', marginBottom:20 }}>LD Roofing & Exteriors</span>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.38)', lineHeight:1.9, maxWidth:300, marginBottom:24 }}>Family-owned roofing contractor serving Houston and Dallas. Free inspections, honest estimates, and work we stand behind.</p>
            <a href={`tel:${PHONE}`} style={{ fontSize:15, fontWeight:700, color:WHITE, textDecoration:'none', display:'block', marginBottom:6, transition:'color 0.2s' }}
              onMouseOver={e=>e.target.style.color=ORANGE} onMouseOut={e=>e.target.style.color=WHITE}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`} style={{ fontSize:13, color:'rgba(255,255,255,0.38)', textDecoration:'none', transition:'color 0.2s' }}
              onMouseOver={e=>e.target.style.color=WHITE} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.38)'}>{EMAIL}</a>
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:20 }}>Services</div>
            {['Free Roof Inspection','Roof Replacement','Roof Repair','Leak Repair','Attic Venting','Commercial Roofing'].map(s=>(
              <div key={s} style={{ fontSize:13, color:'rgba(255,255,255,0.38)', marginBottom:10 }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:20 }}>Locations</div>
            {['Houston Metro','Katy · Sugar Land','The Woodlands','Pearland · Cypress','Dallas · Plano','Frisco · McKinney','DFW Metroplex'].map(a=>(
              <div key={a} style={{ fontSize:13, color:'rgba(255,255,255,0.38)', marginBottom:10 }}>{a}</div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} LD Roofing & Exteriors LLC · BBB A+ Accredited</div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.2)' }}>Website by <a href="https://ecwebco.com" target="_blank" rel="noreferrer" style={{ color:ORANGE, textDecoration:'none' }}>EC Web Co</a></div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-ft{grid-template-columns:1fr!important}}`}</style>
    </footer>
  )
}

// ─── Schedule Modal ───────────────────────────────────────────
function ScheduleModal({ onClose }) {
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', service:'', message:'' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}))
  const submit = () => {
    const body = `Name: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AAddress: ${form.address}%0AService: ${form.service}%0AMessage: ${form.message}`
    window.location.href = `mailto:${EMAIL}?subject=Free Roof Inspection Request&body=${body}`
    setSent(true)
  }
  useEffect(()=>{ document.body.style.overflow='hidden'; return ()=>{ document.body.style.overflow='' } },[])
  const inp = { width:'100%', padding:'13px 16px', fontSize:14, fontFamily:'inherit', border:`1px solid ${BORDER}`, outline:'none', background:WHITE, color:DARK, boxSizing:'border-box', marginBottom:12, borderRadius:2 }
  return (
    <div style={{ position:'fixed', inset:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)' }} onClick={onClose}/>
      <div style={{ position:'relative', width:'min(480px,94vw)', maxHeight:'90vh', overflowY:'auto', background:WHITE }}>
        <div style={{ background:NAVY, padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:4 }}>Free — No Obligation</div>
            <div style={{ fontFamily:"'Source Serif 4',serif", fontSize:20, color:WHITE }}>Schedule Your Inspection</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', fontSize:22, cursor:'pointer', lineHeight:1 }}>✕</button>
        </div>
        {sent ? (
          <div style={{ padding:'48px 32px', textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:16 }}>✅</div>
            <div style={{ fontFamily:"'Source Serif 4',serif", fontSize:22, color:NAVY, marginBottom:12 }}>Request Sent</div>
            <p style={{ fontSize:14, color:MUTED, lineHeight:1.7, marginBottom:24 }}>We'll be in touch within 24 hours to confirm your free inspection.</p>
            <button onClick={onClose} style={BTN} onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Close</button>
          </div>
        ) : (
          <div style={{ padding:'28px' }}>
            <input style={inp} placeholder="Full Name *" value={form.name} onChange={set('name')}/>
            <input style={inp} placeholder="Phone Number *" value={form.phone} onChange={set('phone')}/>
            <input style={inp} placeholder="Email Address" value={form.email} onChange={set('email')}/>
            <input style={inp} placeholder="Property Address" value={form.address} onChange={set('address')}/>
            <select style={{...inp, color:form.service?DARK:MUTED}} value={form.service} onChange={set('service')}>
              <option value="">Service Needed</option>
              {['Free Roof Inspection','Roof Repair','Roof Replacement','Roof Leak Repair','Attic Venting','Commercial Roofing','Free Estimate'].map(s=><option key={s}>{s}</option>)}
            </select>
            <textarea style={{...inp, resize:'vertical', minHeight:80, marginBottom:20}} placeholder="Additional notes (optional)" value={form.message} onChange={set('message')}/>
            <button onClick={submit} style={{...BTN, width:'100%', padding:'15px', fontSize:14, textAlign:'center'}}
              onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
              Request Free Inspection →
            </button>
            <div style={{ textAlign:'center', marginTop:14, fontSize:13, color:MUTED }}>
              Or call: <a href={`tel:${PHONE}`} style={{ color:ORANGE, fontWeight:700 }}>{PHONE}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Mobile Sticky ────────────────────────────────────────────
function StickyBar({ onSchedule }) {
  return (
    <>
      <div className="ld-sticky" style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:200, display:'none', paddingBottom:'env(safe-area-inset-bottom)' }}>
        <a href={`tel:${PHONE}`} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'15px', background:NAVY, color:WHITE, textDecoration:'none', fontFamily:'inherit', fontSize:12, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase' }}>Call</a>
        <button onClick={onSchedule} style={{ flex:2, display:'flex', alignItems:'center', justifyContent:'center', padding:'15px', background:ORANGE, color:WHITE, border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:12, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase' }}>Free Inspection →</button>
      </div>
      <style>{`@media(max-width:768px){.ld-sticky{display:flex!important}}`}</style>
    </>
  )
}

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ fontFamily:"'Barlow', sans-serif", color:DARK, overflowX:'hidden' }}>
      <Nav onSchedule={()=>setOpen(true)}/>
      <Hero onSchedule={()=>setOpen(true)}/>
      <TrustBar/>
      <Services onSchedule={()=>setOpen(true)}/>
      <Divisions/>
      <Gallery/>
      <Process onSchedule={()=>setOpen(true)}/>
      <Reviews/>
      <ServiceAreas/>
      <CTA onSchedule={()=>setOpen(true)}/>
      <Footer/>
      <StickyBar onSchedule={()=>setOpen(true)}/>
      {open && <ScheduleModal onClose={()=>setOpen(false)}/>}
    </div>
  )
}
