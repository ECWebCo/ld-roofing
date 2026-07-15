import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  NAVY, ORANGE, ORANGE2, OFF, DARK, MUTED, BORDER, WHITE, BTN,
  PHONE_HOUSTON, PHONE_DALLAS, HERO_IMG, CTA_IMG,
  HERO_VIDEO, HERO_POSTER, WORK_VIDEO,
} from './ui/theme'
import { useReveal, Counter, Stars, InspectionForm, useModals } from './ui/primitives'
import laneFamilyImg from './lane-family.png'
import wolfFamilyImg from './wolf-family.png'
import { SERVICES } from './data/services'
import { ROOF_TYPES } from './data/roofTypes'
import { REVIEWS, STATS, GALLERY, PROCESS } from './data/content'
import { citiesByMetro } from './data/locations'

// ─── Shared aesthetic tokens ────────────────────────────────────────────────
const CARD = '0 12px 40px rgba(15,31,75,0.08)'
const CARD_HOVER = '0 24px 64px rgba(15,31,75,0.16)'
const RADIUS = 8
const eyebrow = { fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE }
const serifH2 = { fontFamily:"'Source Serif 4',serif", fontSize:'clamp(30px,4vw,46px)', color:NAVY, lineHeight:1.08, letterSpacing:'-0.5px' }

// Reusable eyebrow + heading block
function Kicker({ label, title, sub, light = false, center = false, maxW = 620 }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: center ? maxW : 'none', margin: center ? '0 auto' : 0 }}>
      <div style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:16 }}>
        <span style={{ width:26, height:2, background:ORANGE }}/>
        <span style={eyebrow}>{label}</span>
      </div>
      <h2 style={{ ...serifH2, color: light ? WHITE : NAVY }}>{title}</h2>
      {sub && <p style={{ fontSize:16.5, color: light ? 'rgba(255,255,255,0.62)' : MUTED, lineHeight:1.8, marginTop:16, maxWidth:maxW, ...(center ? { marginLeft:'auto', marginRight:'auto' } : {}) }}>{sub}</p>}
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export function Hero() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', background:NAVY, overflow:'hidden' }}>
      <video autoPlay muted loop playsInline poster={HERO_POSTER} aria-hidden="true"
        style={{ position:'absolute', inset:0, width:'100%', height:'116%', objectFit:'cover', objectPosition:'center 45%', opacity:1, transform:`translateY(${scrollY * 0.18}px)`, willChange:'transform' }}>
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      {/* Directional scrim: readable on the left, video breathes on the right */}
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(102deg, rgba(15,31,75,0.86) 0%, rgba(15,31,75,0.58) 38%, rgba(15,31,75,0.22) 68%, rgba(15,31,75,0.06) 100%)` }}/>
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(to top, rgba(15,31,75,0.55) 0%, transparent 30%)` }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:5, background:ORANGE }}/>

      <div style={{ position:'relative', maxWidth:1240, margin:'0 auto', padding:'150px 48px 110px', width:'100%' }}>
        <div className="ld-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:72, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:22 }}>
              <div style={{ width:28, height:3, background:ORANGE }}/>
              <span style={{ ...eyebrow, textShadow:'0 1px 12px rgba(0,0,0,0.4)' }}>Family-Owned · Houston & Dallas</span>
            </div>
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(50px,7.2vw,92px)', fontWeight:800, color:WHITE, lineHeight:0.92, marginBottom:26, textTransform:'uppercase', letterSpacing:'-0.5px', textShadow:'0 2px 30px rgba(0,0,0,0.35)' }}>
              Roofing You<br/>Can Actually<br/><span style={{ color:ORANGE }}>Trust.</span>
            </h1>
            <p style={{ fontSize:17.5, color:'rgba(255,255,255,0.9)', lineHeight:1.75, marginBottom:36, maxWidth:490, textShadow:'0 1px 16px rgba(0,0,0,0.5)' }}>
              We're a family crew, not a call center. Lane runs Houston, Robert runs Dallas, and an owner is on-site for every job from the first inspection to the final cleanup. Free inspections, straight answers, and roofs built to handle Texas hail and heat.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px 30px', maxWidth:400 }}>
              {[['BBB A+ Rated','Accredited Business'],['5.0 ★ Google','71 Verified Reviews'],['Fully Insured','Workers Comp Covered'],['Free Inspections','No Commitment']].map(([a,b])=>(
                <div key={a} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ color:ORANGE, marginTop:2, flexShrink:0, fontSize:14 }}>✓</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:WHITE }}>{a}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.55)', marginTop:1 }}>{b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:WHITE, borderRadius:RADIUS, overflow:'hidden', boxShadow:'0 30px 80px rgba(0,0,0,0.45)' }}>
            <div style={{ background:NAVY, borderBottom:`4px solid ${ORANGE}`, padding:'22px 24px' }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', color:WHITE, marginBottom:2 }}>Get a Free Inspection</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)' }}>We respond within 24 hours</div>
            </div>
            <InspectionForm/>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.ld-hero-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

export function TrustBar() {
  return (
    <div style={{ background:ORANGE, padding:'15px 48px' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        {['Free Inspections, No Commitment','Fully Insured & Workers Comp','Residential & Commercial','Serving Houston & Dallas','BBB A+ Accredited'].map((t,i)=>(
          <span key={i} style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.95)', letterSpacing:'0.3px' }}>✓ {t}</span>
        ))}
      </div>
    </div>
  )
}

export function StatsStrip() {
  const [ref, shown] = useReveal(0.2)
  return (
    <section ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'64px 48px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }} className="ld-stats">
        {STATS.map((s,i)=>(
          <div key={i} style={{ textAlign:'center', padding:'8px 0' }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(42px,5vw,64px)', fontWeight:800, color:NAVY, lineHeight:1, marginBottom:6 }}>
              <Counter to={s.num} suffix={s.suffix}/>
            </div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.ld-stats{grid-template-columns:repeat(2,1fr)!important;gap:32px!important}}`}</style>
    </section>
  )
}

export function ServicesSection() {
  const { openSchedule } = useModals()
  const [tab, setTab] = useState('residential')
  const [ref, shown] = useReveal(0.1)
  const list = SERVICES.filter(s => tab === 'commercial' ? s.audience === 'commercial' : s.audience === 'residential')

  return (
    <section id="services" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:OFF, padding:'104px 48px' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:36, flexWrap:'wrap', gap:24 }}>
          <Kicker label="What We Do" title={<>Complete roofing,<br/>done by owners.</>} />
          <button onClick={openSchedule} style={{ ...BTN, borderRadius:RADIUS }} onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Schedule Free Inspection</button>
        </div>

        <div style={{ display:'inline-flex', background:WHITE, border:`1px solid ${BORDER}`, padding:4, marginBottom:36, borderRadius:100, boxShadow:CARD }}>
          {[['residential','Residential'],['commercial','Commercial']].map(([k,label])=>{
            const active = tab===k
            return (
              <button key={k} onClick={()=>setTab(k)} style={{ background: active ? NAVY : 'transparent', color: active ? WHITE : MUTED, border:'none', padding:'11px 30px', fontSize:13, fontWeight:700, fontFamily:'inherit', cursor:'pointer', letterSpacing:'0.5px', transition:'all 0.25s ease', borderRadius:100 }}>{label}</button>
            )
          })}
        </div>

        <div key={tab} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="ld-svc">
          {list.map((s,i)=>(
            <Link key={s.slug} to={`/services/${s.slug}`} style={{ display:'block', background:WHITE, padding:'32px 30px', textDecoration:'none', borderRadius:RADIUS, boxShadow:CARD, transition:'transform 0.28s ease, box-shadow 0.28s ease', animation:`fadeUp 0.5s ${i*55}ms ease both` }}
              onMouseOver={e=>{ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=CARD_HOVER }}
              onMouseOut={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=CARD }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:15, fontWeight:800, color:ORANGE, letterSpacing:'1px', marginBottom:16 }}>{String(i+1).padStart(2,'0')}</div>
              <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:19, color:NAVY, marginBottom:10, lineHeight:1.3 }}>{s.title}</h3>
              <p style={{ fontSize:14, color:MUTED, lineHeight:1.8, marginBottom:16 }}>{s.short}</p>
              <span style={{ fontSize:12, fontWeight:700, color:NAVY, letterSpacing:'0.5px' }}>Learn more <span style={{ color:ORANGE }}>→</span></span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop:32, textAlign:'center' }}>
          <Link to="/services" style={{ fontSize:14, fontWeight:700, color:NAVY, textDecoration:'none' }}>View all roofing services →</Link>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@media(max-width:900px){.ld-svc{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Roof Types — visual image mosaic (replaces the old sidebar selector) ────
export function RoofTypesSection() {
  const [ref, shown] = useReveal(0.08)
  return (
    <section id="roof-types" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:`linear-gradient(180deg, ${NAVY} 0%, ${DARK} 100%)`, padding:'104px 48px', position:'relative', overflow:'hidden' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', position:'relative' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20, marginBottom:44 }}>
          <Kicker label="Roof Types We Install" title={<span style={{ color:WHITE }}>Every type of roof.<br/>Every budget.</span>} light
            sub="From asphalt shingle to standing seam metal and commercial flat systems, we install the right roof for your property and your wallet." />
          <Link to="/roof-types" style={{ fontSize:13, fontWeight:700, color:ORANGE, textDecoration:'none', letterSpacing:'0.5px', whiteSpace:'nowrap', paddingBottom:8 }}>Compare all materials →</Link>
        </div>

        <div className="ld-rt-mosaic" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
          {ROOF_TYPES.map((rt, i) => (
            <Link key={rt.slug} to={`/roof-types/${rt.slug}`}
              className="ld-rt-card"
              style={{ position:'relative', display:'block', overflow:'hidden', borderRadius:RADIUS, textDecoration:'none', minHeight: i===0 ? 0 : 260, gridColumn: i===0 ? 'span 2' : 'span 1', gridRow: i===0 ? 'span 2' : 'span 1', background:NAVY }}>
              <img src={rt.img} alt={`${rt.name} roofing`} loading="lazy"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s ease' }}
                onError={e=>{ e.target.style.display='none'; e.target.parentElement.style.background=`linear-gradient(135deg, ${NAVY}, ${DARK})` }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(6,12,32,0.9) 0%, rgba(6,12,32,0.15) 55%, transparent 100%)' }}/>
              <div style={{ position:'absolute', top:14, left:14, background:`${ORANGE}`, color:WHITE, fontSize:9.5, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', padding:'5px 10px', borderRadius:3 }}>{rt.tag}</div>
              <div style={{ position:'absolute', left:0, right:0, bottom:0, padding: i===0 ? '30px 30px' : '20px 20px' }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize: i===0 ? 'clamp(28px,3vw,40px)' : 22, fontWeight:800, color:WHITE, textTransform:'uppercase', letterSpacing:'-0.3px', lineHeight:1, marginBottom:8 }}>{rt.name}</div>
                <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:12, color:'rgba(255,255,255,0.75)' }}>
                  <span style={{ color:ORANGE, fontWeight:700 }}>{rt.life}</span>
                  <span style={{ opacity:0.5 }}>·</span>
                  <span className="ld-rt-cta" style={{ fontWeight:700, letterSpacing:'0.5px' }}>Learn more →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .ld-rt-card:hover img{transform:scale(1.07)}
        @media(max-width:900px){.ld-rt-mosaic{grid-template-columns:repeat(2,1fr)!important}.ld-rt-card{grid-column:span 1!important;grid-row:span 1!important;min-height:220px!important}}
        @media(max-width:520px){.ld-rt-mosaic{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}

export function Divisions() {
  const [ref, shown] = useReveal(0.1)
  const teams = [
    { city:'Houston', accent:NAVY,   name:'Lane & Dana Pauly',   title:'Houston Division', desc:'Lane and Dana founded LD Roofing to be the company they would want working on their own home. Lane personally oversees every Houston job, from the first inspection to the final walkthrough.', img:laneFamilyImg, phone:PHONE_HOUSTON },
    { city:'Dallas',  accent:ORANGE, name:'Robert & Loren Wolf', title:'Dallas Division',  desc:'Robert and Loren Wolf bring the same family-first values to DFW. Their team handles both residential and commercial roofing, and they have built their name on communication and clean, lasting work.', img:wolfFamilyImg, phone:PHONE_DALLAS },
  ]
  return (
    <section ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'104px 48px' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        <Kicker center label="Our Teams" title="Two families. One standard." sub="You get the real owners, not a call center. Lane and Robert stand behind every job." />
        <div className="ld-div" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28, marginTop:56 }}>
          {teams.map((d,i)=>(
            <div key={i} style={{ background:WHITE, borderRadius:RADIUS, overflow:'hidden', boxShadow:CARD }}>
              <div style={{ position:'relative', height:340, overflow:'hidden' }}>
                <img src={d.img} alt={`${d.name}, ${d.title}`} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform 0.7s ease' }}
                  onMouseOver={e=>e.target.style.transform='scale(1.05)'} onMouseOut={e=>e.target.style.transform='scale(1)'}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }}/>
                <div style={{ position:'absolute', bottom:18, left:22, fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:WHITE, background:d.accent, padding:'6px 14px', borderRadius:3 }}>{d.city} Division</div>
              </div>
              <div style={{ padding:'32px 34px' }}>
                <div style={{ fontFamily:"'Source Serif 4',serif", fontSize:23, color:NAVY, marginBottom:4 }}>{d.name}</div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:18 }}>{d.title}</div>
                <p style={{ fontSize:14.5, color:MUTED, lineHeight:1.85, marginBottom:24 }}>{d.desc}</p>
                <a href={`tel:${d.phone}`} style={{ fontSize:15, fontWeight:700, color:NAVY, textDecoration:'none' }}
                  onMouseOver={e=>e.currentTarget.style.color=ORANGE} onMouseOut={e=>e.currentTarget.style.color=NAVY}>{d.phone} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-div{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

// ─── Gallery — mosaic (first tile large) ─────────────────────────────────────
export function Gallery() {
  const [ref, shown] = useReveal(0.08)
  return (
    <section ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:DARK, padding:'96px 48px' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:36, flexWrap:'wrap', gap:16 }}>
          <Kicker label="Portfolio" title={<span style={{ color:WHITE }}>Recent projects</span>} light />
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', maxWidth:300, textAlign:'right', lineHeight:1.7 }}>Real drone shots of residential and commercial jobs across Houston and Dallas.</p>
        </div>
        <div className="ld-gal" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridAutoRows:'clamp(150px,15vw,230px)', gap:12 }}>
          {GALLERY.map((g,i)=>(
            <div key={i} className="ld-gal-cell" style={{ position:'relative', overflow:'hidden', borderRadius:6, gridColumn: i===0 ? 'span 2' : 'span 1', gridRow: i===0 ? 'span 2' : 'span 1' }}>
              <img src={g.src} alt={g.label} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s ease', display:'block' }}
                onMouseOver={e=>e.target.style.transform='scale(1.06)'} onMouseOut={e=>e.target.style.transform='scale(1)'}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 50%)' }}/>
              <div style={{ position:'absolute', bottom:16, left:16, fontSize:12, fontWeight:600, color:WHITE, letterSpacing:'0.3px' }}>{g.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-gal{grid-template-columns:repeat(2,1fr)!important}.ld-gal-cell{grid-column:span 1!important;grid-row:span 1!important;aspect-ratio:4/3!important}}`}</style>
    </section>
  )
}

export function ProcessSection() {
  const { openSchedule } = useModals()
  const [ref, shown] = useReveal(0.1)
  return (
    <section id="process" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:NAVY, padding:'104px 48px' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'0.85fr 1.15fr', gap:80, alignItems:'start' }} className="ld-proc">
          <div>
            <Kicker label="How It Works" title={<span style={{ color:WHITE }}>Our 4-step process</span>} light
              sub="Every step is built to keep your roofing project transparent, easy, and low-stress." />
            <button onClick={openSchedule} style={{ ...BTN, padding:'16px 30px', borderRadius:RADIUS, marginTop:36 }} onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Start with a Free Inspection</button>
          </div>
          <div>
            {PROCESS.map((p,i)=>(
              <div key={i} style={{ display:'flex', gap:28, paddingBottom:28, borderBottom:i<PROCESS.length-1?'1px solid rgba(255,255,255,0.1)':'none', marginBottom:i<PROCESS.length-1?28:0 }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:34, fontWeight:800, color:ORANGE, lineHeight:1, minWidth:44 }}>{p.n}</div>
                <div>
                  <div style={{ fontSize:17, fontWeight:700, color:WHITE, marginBottom:6, fontFamily:"'Source Serif 4',serif" }}>{p.title}</div>
                  <div style={{ fontSize:14.5, color:'rgba(255,255,255,0.55)', lineHeight:1.75 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-proc{grid-template-columns:1fr!important;gap:44px!important}}`}</style>
    </section>
  )
}

export function ReviewsSection() {
  const [ref, shown] = useReveal(0.08)
  return (
    <section id="reviews" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:OFF, padding:'104px 48px' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:48, flexWrap:'wrap', gap:24 }}>
          <Kicker label="Testimonials" title="What our customers say" />
          <div style={{ textAlign:'right' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end', marginBottom:4 }}><Stars/><span style={{ fontSize:20, fontWeight:800, color:NAVY }}>5.0</span></div>
            <div style={{ fontSize:12, color:MUTED }}>71 Google Reviews</div>
          </div>
        </div>
        <div className="ld-rev3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:20 }}>
          {REVIEWS.slice(0,3).map((r,i)=>(<ReviewCard key={i} r={r} accent={NAVY}/>))}
        </div>
        <div className="ld-rev2" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 }}>
          {REVIEWS.slice(3).map((r,i)=>(<ReviewCard key={i} r={r} accent={ORANGE}/>))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-rev3,.ld-rev2{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
function ReviewCard({ r, accent }) {
  return (
    <div style={{ background:WHITE, padding:'32px 28px', borderRadius:RADIUS, boxShadow:CARD }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <Stars/>
        <span style={{ fontSize:30, lineHeight:0.6, color:ORANGE, opacity:0.25, fontFamily:"'Source Serif 4',serif" }}>”</span>
      </div>
      <p style={{ fontSize:15, color:DARK, lineHeight:1.85, marginBottom:22, fontFamily:"'Source Serif 4',serif", fontStyle:'italic' }}>{r.text}</p>
      <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:18, display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:38, height:38, borderRadius:'50%', background:accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontSize:14, fontWeight:700, color:WHITE }}>{r.name[0]}</span>
        </div>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:NAVY }}>{r.name}</div>
          <div style={{ fontSize:11, color:MUTED, marginTop:1 }}>{r.role}</div>
        </div>
      </div>
    </div>
  )
}

export function ServiceAreasSection() {
  const { openCall } = useModals()
  const [ref, shown] = useReveal(0.1)
  const houstonMap = 'https://www.google.com/maps?q=Houston,TX&t=&z=8&ie=UTF8&iwloc=&output=embed'
  const dallasMap  = 'https://www.google.com/maps?q=Dallas,TX&t=&z=8&ie=UTF8&iwloc=&output=embed'
  const metros = [
    { city:'Houston', accent:NAVY, src:houstonMap, hub:'Houston, TX', cities:citiesByMetro('houston') },
    { city:'Dallas',  accent:ORANGE, src:dallasMap, hub:'Dallas-Fort Worth, TX', cities:citiesByMetro('dallas') },
  ]
  return (
    <section id="service-areas" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'104px 48px' }}>
      <div style={{ maxWidth:1240, margin:'0 auto' }}>
        <Kicker center label="Coverage" title="Serving Houston & Dallas"
          sub={<>We service the greater Houston and Dallas-Fort Worth metros, plus surrounding cities across Texas. <button onClick={openCall} style={{ background:'none', border:'none', color:ORANGE, fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:'inherit', padding:0 }}>Give us a call</button> to discuss your project.</>} />
        <div className="ld-area" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28, marginTop:56 }}>
          {metros.map(m => (
            <div key={m.city} style={{ borderRadius:RADIUS, overflow:'hidden', background:WHITE, boxShadow:CARD }}>
              <div style={{ padding:'24px 28px', borderBottom:`1px solid ${BORDER}`, display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:4, height:32, background:m.accent, borderRadius:2 }}/>
                <div style={{ flex:1 }}>
                  <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:22, color:NAVY, lineHeight:1.2 }}>{m.city} Metro</h3>
                  <div style={{ fontSize:12, color:MUTED, marginTop:2 }}>Greater metro area & surrounding cities</div>
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:m.accent, letterSpacing:'2px', textTransform:'uppercase' }}>Active</div>
              </div>
              <div style={{ position:'relative', width:'100%', aspectRatio:'16/9', background:OFF, overflow:'hidden' }}>
                <iframe src={m.src} title={`${m.city} service area map`} width="100%" height="100%" style={{ border:0, position:'absolute', inset:0, width:'100%', height:'100%' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
              </div>
              <div style={{ padding:'24px 28px' }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:14 }}>Cities Served</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {m.cities.map(c=>(<Link key={c.slug} to={`/service-areas/${c.slug}`} style={{ fontSize:12, background:OFF, border:`1px solid ${BORDER}`, padding:'5px 12px', color:DARK, textDecoration:'none', borderRadius:100 }}>{c.name}</Link>))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:32, textAlign:'center' }}>
          <Link to="/service-areas" style={{ fontSize:14, fontWeight:700, color:NAVY, textDecoration:'none' }}>See all cities & counties we serve →</Link>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-area{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

export function CTA() {
  const { openSchedule, openCall } = useModals()
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const fn = () => { if (!ref.current) return; setScrollY(ref.current.getBoundingClientRect().top) }
    fn()
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <section ref={ref} style={{ position:'relative', overflow:'hidden', background:NAVY, padding:'120px 48px' }}>
      <video autoPlay muted loop playsInline poster={CTA_IMG} aria-hidden="true"
        style={{ position:'absolute', inset:0, width:'100%', height:'124%', objectFit:'cover', opacity:0.6, transform:`translateY(${scrollY * -0.1}px)`, willChange:'transform' }}>
        <source src={WORK_VIDEO} type="video/mp4" />
      </video>
      {/* Center scrim keeps text readable while the drone footage stays visible */}
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(130% 130% at 50% 45%, rgba(15,31,75,0.35) 0%, rgba(15,31,75,0.82) 78%)` }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:ORANGE }}/>
      <div style={{ position:'relative', maxWidth:740, margin:'0 auto', textAlign:'center' }}>
        <div style={{ ...eyebrow, marginBottom:20, textShadow:'0 1px 12px rgba(0,0,0,0.5)' }}>Get Started Today</div>
        <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(30px,4.5vw,56px)', color:WHITE, lineHeight:1.1, marginBottom:20, textShadow:'0 2px 30px rgba(0,0,0,0.4)' }}>Your roof deserves<br/>a second opinion.</h2>
        <p style={{ fontSize:16.5, color:'rgba(255,255,255,0.82)', lineHeight:1.8, marginBottom:44, textShadow:'0 1px 16px rgba(0,0,0,0.5)' }}>Free, thorough inspections from a team built on customer service. Schedule yours today.</p>
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={openSchedule} style={{ ...BTN, padding:'17px 38px', fontSize:14, borderRadius:RADIUS }} onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Schedule Free Inspection</button>
          <button onClick={openCall} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.08)', color:WHITE, border:'1px solid rgba(255,255,255,0.45)', padding:'16px 26px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', borderRadius:RADIUS, transition:'all 0.2s', backdropFilter:'blur(4px)' }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.16)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}>↗ Call Us</button>
        </div>
      </div>
    </section>
  )
}
