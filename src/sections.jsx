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
        style={{ position:'absolute', inset:0, width:'100%', height:'110%', objectFit:'cover', objectPosition:'center 45%', opacity:0.5, transform:`translateY(${scrollY * 0.18}px)`, willChange:'transform' }}>
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(100deg, ${NAVY}E0 30%, ${NAVY}99 65%, rgba(15,31,75,0.4) 100%)` }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:5, background:ORANGE }}/>
      <div style={{ position:'relative', maxWidth:1200, margin:'0 auto', padding:'140px 48px 100px', width:'100%' }}>
        <div className="ld-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:64, alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <div style={{ width:28, height:3, background:ORANGE }}/>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, fontFamily:"'Barlow',sans-serif" }}>Family-Owned · Houston & Dallas</span>
            </div>
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(48px,7vw,88px)', fontWeight:800, color:WHITE, lineHeight:0.95, marginBottom:24, textTransform:'uppercase', letterSpacing:'-0.5px' }}>
              Roofing You<br/>Can Actually<br/><span style={{ color:ORANGE }}>Trust.</span>
            </h1>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.78)', lineHeight:1.75, marginBottom:36, maxWidth:480, fontFamily:"'Barlow',sans-serif" }}>
              We're a family crew, not a call center. Lane runs Houston, Robert runs Dallas, and an owner is on-site for every job from the first inspection to the final cleanup. Free inspections, straight answers, and roofs built to handle Texas hail and heat.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 28px', maxWidth:380 }}>
              {[['BBB A+ Rated','Accredited Business'],['5.0 ★ Google','Verified Reviews'],['Fully Insured','Workers Comp Covered'],['Free Inspections','No Commitment']].map(([a,b])=>(
                <div key={a} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ color:ORANGE, marginTop:2, flexShrink:0, fontSize:14 }}>✓</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:WHITE, fontFamily:"'Barlow',sans-serif" }}>{a}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.45)', marginTop:1 }}>{b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:WHITE, borderRadius:4, overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.35)' }}>
            <div style={{ background:NAVY, borderBottom:`4px solid ${ORANGE}`, padding:'22px 24px' }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', color:WHITE, marginBottom:2 }}>Get a Free Inspection</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.55)' }}>We respond within 24 hours</div>
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
    <div style={{ background:ORANGE, padding:'16px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        {['Free Inspections, No Commitment','Fully Insured & Workers Comp','Residential & Commercial','Serving Houston & Dallas','BBB A+ Accredited'].map((t,i)=>(
          <span key={i} style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.92)', letterSpacing:'0.3px' }}>✓ {t}</span>
        ))}
      </div>
    </div>
  )
}

export function StatsStrip() {
  const [ref, shown] = useReveal(0.2)
  return (
    <section ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'72px 48px', borderBottom:`1px solid ${BORDER}` }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32 }} className="ld-stats">
        {STATS.map((s,i)=>(
          <div key={i} style={{ textAlign:'center', borderLeft: i>0 ? `1px solid ${BORDER}` : 'none', paddingLeft: i>0 ? 32 : 0 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(38px,5vw,62px)', fontWeight:800, color:NAVY, lineHeight:1, marginBottom:8 }}>
              <Counter to={s.num} suffix={s.suffix}/>
            </div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.ld-stats{grid-template-columns:repeat(2,1fr)!important;gap:24px!important}.ld-stats>div{border-left:none!important;padding-left:0!important}}`}</style>
    </section>
  )
}

export function ServicesSection() {
  const { openSchedule } = useModals()
  const [tab, setTab] = useState('residential')
  const [ref, shown] = useReveal(0.1)
  const list = SERVICES.filter(s => tab === 'commercial' ? s.audience === 'commercial' : s.audience === 'residential')

  return (
    <section id="services" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:24 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>What We Do</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY, lineHeight:1.1 }}>Complete Roofing<br/>Services</h2>
          </div>
          <button onClick={openSchedule} style={BTN} onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Schedule Free Inspection</button>
        </div>

        <div style={{ display:'inline-flex', background:OFF, border:`1px solid ${BORDER}`, padding:4, marginBottom:40, borderRadius:2 }}>
          {[['residential','Residential'],['commercial','Commercial']].map(([k,label])=>{
            const active = tab===k
            return (
              <button key={k} onClick={()=>setTab(k)} style={{ background: active ? NAVY : 'transparent', color: active ? WHITE : MUTED, border:'none', padding:'12px 32px', fontSize:13, fontWeight:700, fontFamily:'inherit', cursor:'pointer', letterSpacing:'1px', textTransform:'uppercase', transition:'all 0.25s ease', borderRadius:2 }}>{label}</button>
            )
          })}
        </div>

        <div key={tab} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:BORDER, border:`1px solid ${BORDER}` }} className="ld-svc">
          {list.map((s,i)=>(
            <Link key={s.slug} to={`/services/${s.slug}`} style={{ display:'block', background:WHITE, padding:'36px 32px', transition:'background 0.2s', textDecoration:'none', animation:`fadeUp 0.5s ${i*60}ms ease both` }}
              onMouseOver={e=>e.currentTarget.style.background=OFF} onMouseOut={e=>e.currentTarget.style.background=WHITE}>
              <div style={{ width:36, height:3, background:ORANGE, marginBottom:24 }}/>
              <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:18, color:NAVY, marginBottom:12, lineHeight:1.3 }}>{s.title}</h3>
              <p style={{ fontSize:14, color:MUTED, lineHeight:1.85, marginBottom:14 }}>{s.short}</p>
              <span style={{ fontSize:12, fontWeight:700, color:ORANGE, letterSpacing:'0.5px', textTransform:'uppercase' }}>Learn more →</span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop:28, textAlign:'center' }}>
          <Link to="/services" style={{ fontSize:14, fontWeight:700, color:NAVY, textDecoration:'none' }}>View all roofing services →</Link>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@media(max-width:900px){.ld-svc{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

export function RoofTypesSection() {
  const [active, setActive] = useState(0)
  const [ref, shown] = useReveal(0.1)
  const t = ROOF_TYPES[active]
  return (
    <section id="roof-types" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:DARK, padding:'96px 48px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, right:0, width:'40%', height:'100%', background:`linear-gradient(135deg, transparent 0%, ${NAVY}40 100%)`, pointerEvents:'none' }}/>
      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative' }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:14 }}>Roof Types We Install</div>
          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,46px)', color:WHITE, lineHeight:1.1, marginBottom:18, maxWidth:720 }}>Every Type of Roof.<br/>Every Budget.</h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.8, maxWidth:560 }}>From asphalt shingle to standing seam metal, we install the right roof for your property and your wallet. Pick a type below to learn more.</p>
        </div>

        <div className="ld-rt-mobile-select" style={{ display:'none', marginBottom:0 }}>
          <label style={{ display:'block', fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.55)', marginBottom:10 }}>Choose a roof type</label>
          <div style={{ position:'relative' }}>
            <select value={active} onChange={e => setActive(Number(e.target.value))} style={{ width:'100%', padding:'16px 44px 16px 18px', fontSize:16, fontFamily:'inherit', fontWeight:700, background:NAVY, color:WHITE, border:`2px solid ${ORANGE}`, borderRadius:2, appearance:'none', WebkitAppearance:'none', cursor:'pointer', outline:'none' }}>
              {ROOF_TYPES.map((rt,i)=>(<option key={i} value={i} style={{ background:NAVY, color:WHITE }}>{String(i+1).padStart(2,'0')} - {rt.name} · {rt.tag}</option>))}
            </select>
            <span style={{ position:'absolute', right:18, top:'50%', transform:'translateY(-50%)', color:ORANGE, fontSize:14, pointerEvents:'none' }}>▼</span>
          </div>
        </div>

        <div className="ld-rt-grid" style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:0, border:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ background:'rgba(0,0,0,0.3)', borderRight:'1px solid rgba(255,255,255,0.08)' }}>
            {ROOF_TYPES.map((rt, i) => {
              const isActive = i === active
              return (
                <button key={i} onClick={() => setActive(i)} style={{ display:'block', width:'100%', textAlign:'left', background: isActive ? ORANGE : 'transparent', border:'none', borderBottom: i < ROOF_TYPES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', padding:'18px 24px', cursor:'pointer', fontFamily:'inherit', transition:'all 0.25s ease' }}
                  onMouseOver={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  onMouseOut={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <span style={{ fontSize:11, fontWeight:700, letterSpacing:'1px', color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)', minWidth:24 }}>{String(i+1).padStart(2,'0')}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15, fontWeight:700, color: isActive ? WHITE : 'rgba(255,255,255,0.85)', fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:2 }}>{rt.name}</div>
                      <div style={{ fontSize:11, fontWeight:600, color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)', letterSpacing:'0.5px' }}>{rt.tag}</div>
                    </div>
                    {isActive && <span style={{ color:WHITE, fontSize:18 }}>→</span>}
                  </div>
                </button>
              )
            })}
          </div>

          <div style={{ position:'relative', minHeight:520, background:NAVY, overflow:'hidden' }}>
            <div key={active} style={{ animation:'rtFade 0.5s ease' }}>
              <div style={{ position:'relative', height:340, overflow:'hidden' }}>
                <img src={t.img} alt={`${t.name} roofing`} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  onError={e => { e.target.style.display='none'; e.target.parentElement.style.background = `linear-gradient(135deg, ${NAVY} 0%, ${DARK} 100%)` }}/>
                <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, transparent 50%, rgba(15,31,75,0.85) 100%)` }}/>
                <div style={{ position:'absolute', top:20, left:20, background:`${ORANGE}E6`, color:WHITE, fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'6px 12px' }}>{t.tag}</div>
              </div>
              <div style={{ padding:'32px 40px' }}>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(32px,3.5vw,42px)', fontWeight:800, color:WHITE, marginBottom:16, textTransform:'uppercase', letterSpacing:'-0.3px', lineHeight:1 }}>{t.name}</h3>
                <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.8, marginBottom:24 }}>{t.desc}</p>
                <div style={{ display:'flex', gap:40, flexWrap:'wrap', paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.1)', marginBottom:24 }}>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:6 }}>Best For</div>
                    <div style={{ fontSize:14, color:WHITE, fontWeight:600 }}>{t.good}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:6 }}>Lifespan</div>
                    <div style={{ fontSize:14, color:ORANGE, fontWeight:700 }}>{t.life}</div>
                  </div>
                </div>
                <Link to={`/roof-types/${t.slug}`} style={{ fontSize:13, fontWeight:700, color:ORANGE, textDecoration:'none', letterSpacing:'0.5px', textTransform:'uppercase' }}>Learn about {t.name} →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes rtFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media(max-width:900px){.ld-rt-mobile-select{display:block!important;margin-bottom:24px!important}.ld-rt-grid{grid-template-columns:1fr!important}.ld-rt-grid > div:first-child{display:none!important}}`}</style>
    </section>
  )
}

export function Divisions() {
  const [ref, shown] = useReveal(0.1)
  return (
    <section ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:OFF, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Our Teams</div>
          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY }}>Two Divisions. One Standard.</h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:520, margin:'16px auto 0', lineHeight:1.8 }}>Get the customer service you deserve. Lane and Robert make sure your needs are met.</p>
        </div>
        <div className="ld-div" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
          {[
            { city:'Houston', accent:NAVY,   name:'Lane & Dana Pauly',     title:'Houston Division', desc:'Lane and Dana founded LD Roofing to be the company they would want working on their own home. Responsive, customer-focused, and detail-oriented. Lane personally oversees every Houston job from inspection to final walkthrough.', img:laneFamilyImg, phone:PHONE_HOUSTON },
            { city:'Dallas',  accent:ORANGE, name:'Robert & Loren Wolf',   title:'Dallas Division',  desc:'Robert and Loren Wolf bring the same family-first values to DFW. Their team specializes in both residential and commercial roofing, and they have built their reputation on communication and clean, lasting work.', img:wolfFamilyImg, phone:PHONE_DALLAS },
          ].map((d,i)=>(
            <div key={i} style={{ background:WHITE, border:`1px solid ${BORDER}`, overflow:'hidden' }}>
              <div style={{ position:'relative', height:320, overflow:'hidden' }}>
                <img src={d.img} alt={`${d.name}, ${d.title}`} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform 0.6s ease' }}
                  onMouseOver={e=>e.target.style.transform='scale(1.04)'} onMouseOut={e=>e.target.style.transform='scale(1)'}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}/>
                <div style={{ position:'absolute', bottom:18, left:22, fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:WHITE, background:d.accent, padding:'5px 12px' }}>{d.city}</div>
              </div>
              <div style={{ padding:'32px' }}>
                <div style={{ fontFamily:"'Source Serif 4',serif", fontSize:21, color:NAVY, marginBottom:4 }}>{d.name}</div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:20 }}>{d.title}</div>
                <p style={{ fontSize:14, color:MUTED, lineHeight:1.85, marginBottom:24 }}>{d.desc}</p>
                <a href={`tel:${d.phone}`} style={{ fontSize:14, fontWeight:700, color:NAVY, textDecoration:'none' }}
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

export function Gallery() {
  const [ref, shown] = useReveal(0.1)
  return (
    <section ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:DARK }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 48px 48px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:10 }}>Portfolio</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(26px,3.5vw,40px)', color:WHITE }}>Recent Projects</h2>
          </div>
          <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)', maxWidth:280, textAlign:'right', lineHeight:1.7 }}>Residential and commercial across Houston and Dallas.</p>
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

export function ProcessSection() {
  const { openSchedule } = useModals()
  const [ref, shown] = useReveal(0.1)
  return (
    <section id="process" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:NAVY, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }} className="ld-proc">
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>How It Works</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,46px)', color:WHITE, lineHeight:1.12, marginBottom:24 }}>Our 4-Step<br/>Process</h2>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:40, maxWidth:380 }}>Every step is designed to make your experience transparent, easy, and stress-free.</p>
            <button onClick={openSchedule} style={{...BTN, padding:'16px 28px'}} onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Start with Free Inspection</button>
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

export function ReviewsSection() {
  const [ref, shown] = useReveal(0.1)
  return (
    <section id="reviews" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:OFF, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:56, flexWrap:'wrap', gap:24 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Testimonials</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY }}>What Our Customers Say</h2>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end', marginBottom:4 }}><Stars/><span style={{ fontSize:18, fontWeight:800, color:NAVY }}>5.0</span></div>
            <div style={{ fontSize:12, color:MUTED }}>63 Google Reviews</div>
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
    <div style={{ background:WHITE, padding:'30px 26px', border:`1px solid ${BORDER}` }}>
      <Stars/>
      <p style={{ fontSize:14, color:DARK, lineHeight:1.85, margin:'18px 0 22px', fontFamily:"'Source Serif 4',serif", fontStyle:'italic' }}>{r.text}</p>
      <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:18, display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:36, height:36, borderRadius:'50%', background:accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <span style={{ fontSize:13, fontWeight:700, color:WHITE }}>{r.name[0]}</span>
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
    <section id="service-areas" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Coverage</div>
          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY, marginBottom:14 }}>Serving Houston & Dallas</h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>
            We service the greater Houston and Dallas-Fort Worth metro areas, plus surrounding cities across Texas. <button onClick={openCall} style={{ background:'none', border:'none', color:ORANGE, fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:16, padding:0 }}>Give us a call</button> to discuss your project.
          </p>
        </div>
        <div className="ld-area" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
          {metros.map(m => (
            <div key={m.city} style={{ border:`1px solid ${BORDER}`, overflow:'hidden', background:WHITE }}>
              <div style={{ padding:'24px 28px', borderBottom:`1px solid ${BORDER}`, display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:4, height:32, background:m.accent, borderRadius:2 }}/>
                <div style={{ flex:1 }}>
                  <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:22, color:NAVY, lineHeight:1.2 }}>{m.city} Metro</h3>
                  <div style={{ fontSize:12, color:MUTED, marginTop:2 }}>Greater metro area & surrounding cities</div>
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:m.accent, letterSpacing:'2px', textTransform:'uppercase' }}>Active</div>
              </div>
              <div style={{ position:'relative', width:'100%', aspectRatio:'4/3', background:OFF, overflow:'hidden' }}>
                <iframe src={m.src} title={`${m.city} service area map`} width="100%" height="100%" style={{ border:0, position:'absolute', inset:0, width:'100%', height:'100%' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-100%)', pointerEvents:'none', display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <div style={{ background:m.accent, color:WHITE, padding:'6px 14px', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', borderRadius:2, whiteSpace:'nowrap', boxShadow:'0 4px 12px rgba(0,0,0,0.25)', marginBottom:4 }}>{m.hub}</div>
                  <div style={{ width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:`8px solid ${m.accent}` }}/>
                </div>
              </div>
              <div style={{ padding:'24px 28px' }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:14 }}>Cities Served</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {m.cities.map(c=>(<Link key={c.slug} to={`/service-areas/${c.slug}`} style={{ fontSize:12, background:OFF, border:`1px solid ${BORDER}`, padding:'5px 12px', color:DARK, textDecoration:'none' }}>{c.name}</Link>))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:28, textAlign:'center' }}>
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
    <section ref={ref} style={{ position:'relative', overflow:'hidden', background:NAVY, padding:'96px 48px' }}>
      <video autoPlay muted loop playsInline poster={CTA_IMG} aria-hidden="true"
        style={{ position:'absolute', inset:0, width:'100%', height:'120%', objectFit:'cover', opacity:0.22, transform:`translateY(${scrollY * -0.12}px)`, willChange:'transform' }}>
        <source src={WORK_VIDEO} type="video/mp4" />
      </video>
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg, ${NAVY}D0 0%, ${NAVY}99 100%)` }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:ORANGE }}/>
      <div style={{ position:'relative', maxWidth:700, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:20 }}>Get Started Today</div>
        <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4.5vw,54px)', color:WHITE, lineHeight:1.12, marginBottom:20 }}>Your Roof Deserves<br/>a Second Opinion.</h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.65)', lineHeight:1.8, marginBottom:44 }}>Free, thorough inspections from a team built on customer service. Schedule yours today.</p>
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={openSchedule} style={{...BTN, padding:'16px 36px', fontSize:14}} onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Schedule Free Inspection</button>
          <button onClick={openCall} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', color:WHITE, border:'1px solid rgba(255,255,255,0.4)', padding:'15px 22px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', borderRadius:2, transition:'all 0.2s' }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>↗ Call Us</button>
        </div>
      </div>
    </section>
  )
}
