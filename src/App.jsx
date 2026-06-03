import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import laneFamilyImg from './lane-family.png'
import wolfFamilyImg from './wolf-family.png'
import FAQ from './components/FAQ'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'

const NAVY    = '#0F1F4B'
const NAVY2   = '#1a3070'
const ORANGE  = '#E8701A'
const ORANGE2 = '#c85e10'
const OFF     = '#F8F7F4'
const DARK    = '#0D0D0D'
const MUTED   = '#6B7280'
const BORDER  = '#E2E0DB'
const WHITE   = '#FFFFFF'

const PHONE_HOUSTON = '(469) 585-8908'
const PHONE_DALLAS  = '(214) 755-3159'
const EMAIL = 'Info@ld-roofing.com'
const LOGO  = 'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/ChatGPT%20Image%20Apr%2021,%202026,%2009_48_39%20PM.png'

const TOP_BAR_HEIGHT = 36

const HERO_IMG = 'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_1-1778199271017-0-residential-home-1280x853.jpg'
const CTA_IMG  = 'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_3-1778199361435-0-Our-Work.jpg'

const REVIEWS = [
  { name:'Rick', role:'Business Owner', stars:5, text:'"LD Roofing & Exteriors are the most professional and friendly contractors I have ever worked with. Top quality work and great pricing. Lane the owner really cares about helping his clients."' },
  { name:'Jason', role:'Homeowner, Houston', stars:5, text:'"Lane was superb. He kept us informed and was timely along the way. We will certainly use his service again and recommend LD Roofing and Exteriors."' },
  { name:'Ruben', role:'Property Manager', stars:5, text:'"LD Roofing offered a free roof assessment after a hailstorm. Very professional, provided full assistance with our claim process. Our roof was completed in a single day."' },
  { name:'ABNB Owner', role:'Airbnb Host', stars:5, text:'"Lane sent progress photos throughout and made the whole process seamless. It was important they finished the same day, they did, and left everything spotless."' },
  { name:'Robert', role:'Homeowner, Dallas', stars:5, text:'"Robert Wolf was a great communicator, quick to answer questions and walk us through everything. Could not be happier with how the project turned out."' },
]

const RES_SERVICES = [
  { title:'Free Roof Inspection', desc:'Thorough inspection at zero cost. We document every issue with photos and give you a complete report. No pressure, no upselling.' },
  { title:'Roof Replacement', desc:'Full residential replacement using the right material for your home and your budget. Done right the first time.' },
  { title:'Roof Repair', desc:'From minor leaks to major storm damage, our crew diagnoses and fixes the root cause, not just the symptom.' },
  { title:'Roof Leak Repair', desc:'Emergency response available. We stop active leaks fast and provide a lasting repair, not a temporary patch.' },
  { title:'Attic Venting', desc:'Improper ventilation is a leading cause of premature roof failure in Texas. We design and install systems that work.' },
  { title:'Insurance Claims Help', desc:'We work with your insurance carrier and guide you through the claim process. Most homeowners pay only their deductible.' },
]

const COM_SERVICES = [
  { title:'Commercial Inspection', desc:'Free, detailed inspection for property managers and business owners. Photo-documented report you can keep on file.' },
  { title:'Flat Roof Systems', desc:'TPO, EPDM, and modified bitumen installation for warehouses, retail, restaurants, and office buildings.' },
  { title:'Commercial Repair', desc:'Fast turnaround on leaks, ponding water, membrane damage, and storm repairs. We minimize disruption to your operations.' },
  { title:'Roof Coatings', desc:'Extend the life of your existing flat roof with a silicone or acrylic coating system, often half the cost of replacement.' },
  { title:'Metal Commercial Roofs', desc:'Standing seam and corrugated metal systems for industrial and agricultural buildings. Long-life, low maintenance.' },
  { title:'Maintenance Programs', desc:'Scheduled commercial maintenance to catch small issues before they become major capital expenses.' },
]

const ROOF_TYPES = [
  { name:'Asphalt Shingle',      tag:'Most popular',     img:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/43489564-5a0f-413b-9f7d-b35e4ac379f9/collage_3-1778202331445-0-shingle.png', desc:'The most common roof in Texas. Affordable, durable, and available in dozens of colors. 25 to 50 year warranties available depending on the line.', good:'Most homes, Best value', life:'25-50 yrs' },
  { name:'Standing Seam Metal',  tag:'Premium look',     img:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/43489564-5a0f-413b-9f7d-b35e4ac379f9/collage_2-1778202322708-0-metal.png', desc:'Hidden fastener metal panels for a clean, modern profile. Reflects heat, sheds water, and lasts 2 to 3 times longer than shingles.', good:'Modern homes, Coastal, High-end', life:'40-70 yrs' },
  { name:'Clay & Concrete Tile', tag:'Mediterranean',    img:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/43489564-5a0f-413b-9f7d-b35e4ac379f9/collage_1-1778202315029-0-clay.png', desc:'Heavy, beautiful, and built to last. Excellent for Spanish, Mediterranean, and Southwestern style homes. Resists fire and rot.', good:'Stucco homes, Spanish style', life:'50-100 yrs' },
  { name:'Slate & Cedar Shake',  tag:'Specialty',        img:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/43489564-5a0f-413b-9f7d-b35e4ac379f9/collage_1-1778202309750-0-cedar.png', desc:'Natural slate and cedar shake roofing for historic homes and high-end renovations. We handle the specialty install.', good:'Historic, Custom, Estate homes', life:'30-100+ yrs' },
  { name:'TPO Membrane',         tag:'Commercial flat',  img:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/43489564-5a0f-413b-9f7d-b35e4ac379f9/collage_3-1778202336712-0-tpo.png', desc:'The most popular commercial flat roof system. Heat-welded seams, energy-efficient white surface, and proven performance in Texas heat.', good:'Warehouses, Retail, Offices', life:'20-30 yrs' },
  { name:'EPDM Rubber',          tag:'Proven flat',      img:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/43489564-5a0f-413b-9f7d-b35e4ac379f9/collage_2-1778202327587-0-rubber.png', desc:'The original single-ply membrane. Black rubber roofing with decades of track record on commercial buildings of every size.', good:'Commercial, Industrial', life:'25-30 yrs' },
  { name:'Modified Bitumen',     tag:'Flat & low-slope', img:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/43489564-5a0f-413b-9f7d-b35e4ac379f9/collage_2-1778202325195-0-modified-bitumen.png', desc:'Asphalt-based rolled roofing for low-slope residential additions, garages, and small commercial. Affordable and reliable.', good:'Garages, Additions, Small commercial', life:'15-25 yrs' },
  { name:'Corrugated Metal',     tag:'Workhorse',        img:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/43489564-5a0f-413b-9f7d-b35e4ac379f9/collage_1-1778202318420-0-corrugated-metal.png', desc:'Exposed-fastener metal panels, economical and tough. The go-to for barns, shops, ag buildings, and budget-conscious homeowners.', good:'Outbuildings, Rural, Budget', life:'30-50 yrs' },
]

const PROCESS = [
  { n:'01', title:'Free Inspection & Honest Assessment', desc:'Call or submit a form. We arrive on time, inspect thoroughly, document everything with photos, and explain exactly what we find, clearly and honestly.' },
  { n:'02', title:'Clear Estimate', desc:'You receive a detailed, itemized quote. No hidden fees, no high-pressure sales, no surprises. Financing and insurance-claim support available.' },
  { n:'03', title:'Expert Installation', desc:'Our certified crew works efficiently using the right materials for your roof and your budget, protecting your property throughout.' },
  { n:'04', title:'Final Walkthrough', desc:'We review the completed work with you and leave your property cleaner than we found it. Workmanship warranty included.' },
]

const STATS = [
  { num: 500, suffix:'+', label:'Roofs Replaced' },
  { num: 10,  suffix:'+', label:'Years in Business' },
  { num: 63,  suffix:'',  label:'5-Star Reviews' },
  { num: 32,  suffix:'',  label:'Cities Served' },
]

const GALLERY = [
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_2-1778199338635-0-R-photo-gallery-3.jpg', label:'Residential Roof, Houston' },
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_3-1778199484168-0-C-Photo-gallery-6.jpg', label:'Commercial Project, Dallas' },
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_1-1778199330797-0-gutter-rapair.jpg', label:'Gutter Repair, Residential' },
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_4-1778199373951-0-C-photo-gallery-1.jpg', label:'Commercial Flat, DFW' },
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_2-1778199341205-0-R-photo-gallery-5.jpg', label:'Residential, Sugar Land' },
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_3-1778199367549-0-InstallationMore2.jpg', label:'Commercial Install, Houston' },
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_1-1778199334228-0-siding.jpg', label:'Siding Project, Residential' },
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_4-1778199380131-0-C-Photo-gallery-5.jpg', label:'Commercial, Plano' },
  { src:'https://snthchxrqjtriorgvakk.supabase.co/storage/v1/object/public/restaurant-photos/91a71a5c-5a1c-4814-b85d-b60b4f2cc6bc/collage_2-1778199344049-0-R-photo-gallery-6.jpg', label:'Roof Replacement, Katy' },
]

const HOUSTON_CITIES = ['Houston','Sugar Land','Katy','The Woodlands','Pearland','Cypress','Spring','League City','Galveston','Conroe','Baytown']
const DALLAS_CITIES = ['Dallas','Fort Worth','Plano','Frisco','Allen','McKinney','Arlington','Irving','Denton','Waco','Tyler']

function Stars() {
  return <span style={{ color:ORANGE, fontSize:15, letterSpacing:3 }}>★★★★★</span>
}

const BTN = {
  background:ORANGE, color:WHITE, border:'none',
  padding:'14px 28px', fontSize:13, fontWeight:700,
  fontFamily:'inherit', cursor:'pointer', borderRadius:2,
  letterSpacing:'0.5px', textTransform:'uppercase', transition:'background 0.2s',
}

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

function Counter({ to, suffix = '' }) {
  const [ref, shown] = useReveal(0.4)
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!shown) return
    const start = performance.now()
    const dur = 1600
    let raf
    const tick = now => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [shown, to])
  return <span ref={ref}>{val}{suffix}</span>
}

function TopBar() {
  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, height:TOP_BAR_HEIGHT, zIndex:301,
      background:DARK, display:'flex', alignItems:'center', justifyContent:'center',
      gap:24, padding:'0 16px', borderBottom:`1px solid rgba(255,255,255,0.06)`,
    }}>
      <a href={`tel:${PHONE_HOUSTON}`} className="ld-topbar-link" style={{
        fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:600,
        color:WHITE, textDecoration:'none', letterSpacing:'0.3px',
      }}>
        <span style={{ color:ORANGE, marginRight:6, fontWeight:700, letterSpacing:'1px' }}>HOUSTON</span>
        {PHONE_HOUSTON}
      </a>
      <span style={{ color:'rgba(255,255,255,0.25)' }}>·</span>
      <a href={`tel:${PHONE_DALLAS}`} className="ld-topbar-link" style={{
        fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:600,
        color:WHITE, textDecoration:'none', letterSpacing:'0.3px',
      }}>
        <span style={{ color:ORANGE, marginRight:6, fontWeight:700, letterSpacing:'1px' }}>DALLAS</span>
        {PHONE_DALLAS}
      </a>
      <style>{`
        .ld-topbar-link:hover{color:${ORANGE} !important}
        @media(max-width:480px){
          .ld-topbar-link{font-size:11px !important}
        }
      `}</style>
    </div>
  )
}

function CallPicker({ onClose }) {
  useEffect(()=>{ document.body.style.overflow='hidden'; return ()=>{ document.body.style.overflow='' } },[])
  const options = [
    { city:'Houston Division', subtitle:'Lane & Dana Pauly', phone:PHONE_HOUSTON, accent:NAVY },
    { city:'Dallas Division',  subtitle:'Robert & Loren Wolf', phone:PHONE_DALLAS, accent:ORANGE },
  ]
  return (
    <div style={{ position:'fixed', inset:0, zIndex:600, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)' }} onClick={onClose}/>
      <div style={{ position:'relative', width:'min(420px,94vw)', background:WHITE, overflow:'hidden' }}>
        <div style={{ background:NAVY, padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:4 }}>Call Us</div>
            <div style={{ fontFamily:"'Source Serif 4',serif", fontSize:20, color:WHITE }}>Which Division?</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', fontSize:22, cursor:'pointer', lineHeight:1 }}>✕</button>
        </div>
        <div>
          {options.map(d => (
            <a key={d.city} href={`tel:${d.phone}`} onClick={onClose}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'22px 28px', textDecoration:'none', borderBottom:`1px solid ${BORDER}`, transition:'background 0.2s' }}
              onMouseOver={e=>e.currentTarget.style.background=OFF}
              onMouseOut={e=>e.currentTarget.style.background=WHITE}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:d.accent, marginBottom:4 }}>{d.city}</div>
                <div style={{ fontSize:18, fontWeight:700, color:DARK, marginBottom:2 }}>{d.phone}</div>
                <div style={{ fontSize:12, color:MUTED }}>{d.subtitle}</div>
              </div>
              <span style={{ fontSize:20, color:d.accent, fontWeight:700 }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Nav (shared between all pages) ───────────────────────────
function Nav({ onSchedule, onCall }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // On non-home pages, nav should always be opaque
  const bg = scrolled || open || !isHome

  const go = id => {
    setOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
    } else {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth'}), 100)
    }
  }

  return (
    <>
      <nav style={{ position:'fixed', top:TOP_BAR_HEIGHT, left:0, right:0, zIndex:300, background:bg?'rgba(15,31,75,0.97)':'transparent', backdropFilter:bg?'blur(12px)':'none', borderBottom:bg?'1px solid rgba(255,255,255,0.08)':'none', transition:'all 0.35s ease' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', height: bg ? 72 : 110, display:'flex', alignItems:'center', justifyContent:'space-between', transition:'height 0.4s ease' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center' }} onClick={()=>setOpen(false)}>
            <img src={LOGO} alt="LD Roofing" style={{ height: bg ? 44 : 110, width:'auto', objectFit:'contain', cursor:'pointer', filter:'none', transition:'height 0.4s ease' }}
              onError={e=>{e.target.style.display='none'; e.target.nextSibling.style.display='block'}}/>
            <span style={{ display:'none', fontFamily:"'Source Serif 4',serif", fontSize:18, fontWeight:700, color:WHITE }}>LD Roofing</span>
          </Link>

          <div className="ld-links" style={{ display:'flex', gap:36 }}>
            {[['services','Services'],['roof-types','Roof Types'],['process','Process'],['reviews','Reviews'],['faq','FAQ']].map(([id,label])=>(
              <button key={id} onClick={()=>go(id)} style={{ background:'none', border:'none', fontFamily:'inherit', fontSize:13, fontWeight:500, letterSpacing:'0.5px', color:'rgba(255,255,255,0.7)', cursor:'pointer', transition:'color 0.2s' }}
                onMouseOver={e=>e.target.style.color=WHITE} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.7)'}>{label}</button>
            ))}
            <Link to="/blog" onClick={()=>setOpen(false)} style={{ background:'none', border:'none', fontFamily:'inherit', fontSize:13, fontWeight:500, letterSpacing:'0.5px', color: location.pathname.startsWith('/blog') ? WHITE : 'rgba(255,255,255,0.7)', cursor:'pointer', transition:'color 0.2s', textDecoration:'none' }}
              onMouseOver={e=>e.target.style.color=WHITE} onMouseOut={e=>e.target.style.color = location.pathname.startsWith('/blog') ? WHITE : 'rgba(255,255,255,0.7)'}>Blog</Link>
          </div>

          <div className="ld-cta" style={{ display:'flex', gap:20, alignItems:'center' }}>
            <button onClick={onCall} style={{ background:'none', border:'none', fontSize:14, fontWeight:700, color:WHITE, cursor:'pointer', fontFamily:'inherit' }}>Call Us</button>
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
        <div style={{ position:'fixed', inset:0, top:72+TOP_BAR_HEIGHT, background:NAVY, zIndex:299, display:'flex', flexDirection:'column', padding:'8px 0 32px' }}>
          {[['services','Services'],['roof-types','Roof Types'],['process','Our Process'],['reviews','Reviews'],['faq','FAQ']].map(([id,label])=>(
            <button key={id} onClick={()=>go(id)} style={{ background:'none', border:'none', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'20px 32px', textAlign:'left', fontFamily:'inherit', fontSize:16, fontWeight:600, color:WHITE, cursor:'pointer' }}>{label}</button>
          ))}
          <Link to="/blog" onClick={()=>setOpen(false)} style={{ borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'20px 32px', fontFamily:'inherit', fontSize:16, fontWeight:600, color:WHITE, textDecoration:'none' }}>Blog</Link>
          <div style={{ padding:'28px 32px', display:'flex', flexDirection:'column', gap:12 }}>
            <button onClick={()=>{onCall();setOpen(false)}} style={{ background:'none', border:'none', fontSize:18, fontWeight:700, color:ORANGE, cursor:'pointer', textAlign:'left', padding:0, fontFamily:'inherit' }}>Call Us →</button>
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
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s ease, transform 0.8s ease}
        .reveal.is-in{opacity:1;transform:none}
        @media(max-width:900px){.ld-links{display:none!important}.ld-cta{display:none!important}.ld-ham{display:flex!important}}
      `}</style>
    </>
  )
}

// ─── Shared Inspection Form ──────────────────────────────────
function InspectionForm({ onCall, compact = false }) {
  const [form, setForm] = useState({ name:'', phone:'', email:'', address:'', service:'', message:'' })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}))
  const submit = () => {
    if (!form.name || !form.phone) return
    const body = `Name: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AAddress: ${form.address}%0AService: ${form.service}%0AMessage: ${form.message}`
    window.location.href = `mailto:${EMAIL}?subject=Free Roof Inspection Request&body=${body}`
    setSent(true)
  }
  const inp = {
    width:'100%', padding:'13px 16px', fontSize:14, fontFamily:"'Barlow',sans-serif",
    border:compact ? 'none' : `1px solid ${BORDER}`,
    outline:'none',
    background:compact ? 'rgba(255,255,255,0.95)' : WHITE,
    color:DARK, boxSizing:'border-box', marginBottom:12, borderRadius:2,
  }

  if (sent) {
    return (
      <div style={{ padding:compact ? '40px 24px' : '48px 32px', textAlign:'center' }}>
        <div style={{ fontSize:compact ? 36 : 40, marginBottom:compact ? 12 : 16 }}>✅</div>
        <div style={{ fontFamily:compact ? "'Barlow Condensed',sans-serif" : "'Source Serif 4',serif", fontSize:22, fontWeight:compact ? 700 : 400, color:NAVY, textTransform:compact ? 'uppercase' : 'none', marginBottom:compact ? 8 : 12 }}>
          {compact ? 'Request Sent!' : 'Request Sent'}
        </div>
        <p style={{ fontSize:14, color:MUTED, lineHeight:1.7 }}>We will be in touch within 24 hours to confirm your free inspection.</p>
      </div>
    )
  }

  return (
    <div style={{ padding:compact ? '24px' : '28px' }}>
      <input style={inp} placeholder="Full Name *" value={form.name} onChange={set('name')}/>
      <input style={inp} placeholder="Phone Number *" value={form.phone} onChange={set('phone')}/>
      <input style={inp} placeholder="Email Address" value={form.email} onChange={set('email')}/>
      <input style={inp} placeholder="Property Address" value={form.address} onChange={set('address')}/>
      <select style={{...inp, color:form.service?DARK:MUTED}} value={form.service} onChange={set('service')}>
        <option value="">Service Needed</option>
        {['Free Roof Inspection','Roof Repair','Roof Replacement','Roof Leak Repair','Attic Venting','Commercial Roofing','Insurance Claim Help','Free Estimate'].map(s=><option key={s}>{s}</option>)}
      </select>
      <textarea style={{...inp, resize:'vertical', minHeight:80, marginBottom:20}} placeholder="Additional notes (optional)" value={form.message} onChange={set('message')}/>
      <button onClick={submit} disabled={!form.name || !form.phone}
        style={{
          width:'100%', background:ORANGE, color:WHITE, border:'none',
          padding:'15px', fontSize:14, fontWeight:700, fontFamily:"'Barlow',sans-serif",
          cursor:(!form.name||!form.phone)?'not-allowed':'pointer',
          opacity:(!form.name||!form.phone)?0.6:1,
          borderRadius:2, letterSpacing:'0.5px', textTransform:'uppercase',
          transition:'background 0.2s', marginBottom:12,
        }}
        onMouseOver={e=>{ if(form.name && form.phone) e.currentTarget.style.background=ORANGE2 }}
        onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
        Request Free Inspection →
      </button>
      <div style={{ textAlign:'center', fontSize:13, color:MUTED }}>
        Or <button onClick={onCall} style={{ background:'none', border:'none', color:ORANGE, fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:13, padding:0 }}>call us →</button>
      </div>
    </div>
  )
}

function Hero({ onCall }) {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', background:NAVY, overflow:'hidden' }}>
      <img
        src={HERO_IMG}
        alt="Texas home roof replacement"
        style={{ position:'absolute', inset:0, width:'100%', height:'110%', objectFit:'cover', objectPosition:'center 40%', opacity:0.45, transform:`translateY(${scrollY * 0.25}px)`, willChange:'transform' }}
      />
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(100deg, ${NAVY}E0 30%, ${NAVY}99 65%, rgba(15,31,75,0.4) 100%)` }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:5, background:ORANGE }}/>

      <div style={{ position:'relative', maxWidth:1200, margin:'0 auto', padding:'140px 48px 100px', width:'100%' }}>
        <div className="ld-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 400px', gap:64, alignItems:'center' }}>

          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <div style={{ width:28, height:3, background:ORANGE }}/>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, fontFamily:"'Barlow',sans-serif" }}>Houston & Dallas, Texas</span>
            </div>
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(48px,7vw,88px)', fontWeight:800, color:WHITE, lineHeight:0.95, marginBottom:24, textTransform:'uppercase', letterSpacing:'-0.5px' }}>
              Roofing You<br/>Can Actually<br/><span style={{ color:ORANGE }}>Trust.</span>
            </h1>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.78)', lineHeight:1.75, marginBottom:36, maxWidth:480, fontFamily:"'Barlow',sans-serif" }}>
              Family-owned. BBB A+ rated. Free inspections, customer-service-oriented estimates, and roofing for every budget, from asphalt shingle to standing seam metal. Financing and insurance-claim help available.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 28px', maxWidth:380 }}>
              {[['BBB A+ Rated','Accredited Business'],['5.0 ★ Google','Verified Reviews'],['Licensed & Insured','Fully Bonded'],['Free Inspections','No Commitment']].map(([a,b])=>(
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
            <InspectionForm onCall={onCall}/>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.ld-hero-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

function TrustBar() {
  return (
    <div style={{ background:ORANGE, padding:'16px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        {['Free Inspections, No Commitment','Licensed, Bonded & Insured','Residential & Commercial','Serving Houston & Dallas','BBB A+ Accredited'].map((t,i)=>(
          <span key={i} style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.92)', letterSpacing:'0.3px' }}>✓ {t}</span>
        ))}
      </div>
    </div>
  )
}

function StatsStrip() {
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

function Services({ onSchedule }) {
  const [tab, setTab] = useState('residential')
  const [ref, shown] = useReveal(0.1)
  const list = tab === 'residential' ? RES_SERVICES : COM_SERVICES

  return (
    <section id="services" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:24 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>What We Do</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY, lineHeight:1.1 }}>Complete Roofing<br/>Services</h2>
          </div>
          <button onClick={onSchedule} style={BTN}
            onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>
            Schedule Free Inspection
          </button>
        </div>

        <div style={{ display:'inline-flex', background:OFF, border:`1px solid ${BORDER}`, padding:4, marginBottom:40, borderRadius:2 }}>
          {[['residential','Residential'],['commercial','Commercial']].map(([k,label])=>{
            const active = tab===k
            return (
              <button key={k} onClick={()=>setTab(k)}
                style={{
                  background: active ? NAVY : 'transparent',
                  color: active ? WHITE : MUTED,
                  border:'none', padding:'12px 32px', fontSize:13, fontWeight:700,
                  fontFamily:'inherit', cursor:'pointer', letterSpacing:'1px',
                  textTransform:'uppercase', transition:'all 0.25s ease', borderRadius:2,
                }}>
                {label}
              </button>
            )
          })}
        </div>

        <div style={{ marginBottom:24, fontSize:14, color:MUTED, maxWidth:600 }}>
          {tab === 'residential'
            ? 'Roofing for homeowners across Houston and Dallas. From simple repairs to full replacements, every type of roof, every budget.'
            : 'Roofing for property managers, business owners, and commercial buildings. Flat systems, metal, coatings, and maintenance programs.'}
        </div>

        <div key={tab} className="ld-svc fade-swap" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:BORDER, border:`1px solid ${BORDER}` }}>
          {list.map((s,i)=>(
            <div key={i} style={{ background:WHITE, padding:'36px 32px', transition:'background 0.2s', animation:`fadeUp 0.5s ${i*60}ms ease both` }}
              onMouseOver={e=>e.currentTarget.style.background=OFF} onMouseOut={e=>e.currentTarget.style.background=WHITE}>
              <div style={{ width:36, height:3, background:ORANGE, marginBottom:24 }}/>
              <h3 style={{ fontFamily:"'Source Serif 4',serif", fontSize:18, color:NAVY, marginBottom:12, lineHeight:1.3 }}>{s.title}</h3>
              <p style={{ fontSize:14, color:MUTED, lineHeight:1.85 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        @media(max-width:900px){.ld-svc{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}

function RoofTypes() {
  const [active, setActive] = useState(0)
  const [ref, shown] = useReveal(0.1)
  const t = ROOF_TYPES[active]

  return (
    <section id="roof-types" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:DARK, padding:'96px 48px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, right:0, width:'40%', height:'100%', background:`linear-gradient(135deg, transparent 0%, ${NAVY}40 100%)`, pointerEvents:'none' }}/>
      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative' }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:14 }}>Roof Types We Install</div>
          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,46px)', color:WHITE, lineHeight:1.1, marginBottom:18, maxWidth:720 }}>
            Every Type of Roof.<br/>Every Budget.
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.8, maxWidth:560 }}>
            From asphalt shingle to standing seam metal, we install the right roof for your property and your wallet. Pick a type below to learn more.
          </p>
        </div>

        <div className="ld-rt-mobile-select" style={{ display:'none', marginBottom:0 }}>
          <label style={{ display:'block', fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.55)', marginBottom:10 }}>Choose a roof type</label>
          <div style={{ position:'relative' }}>
            <select value={active} onChange={e => setActive(Number(e.target.value))}
              style={{ width:'100%', padding:'16px 44px 16px 18px', fontSize:16, fontFamily:'inherit', fontWeight:700, background:NAVY, color:WHITE, border:`2px solid ${ORANGE}`, borderRadius:2, appearance:'none', WebkitAppearance:'none', MozAppearance:'none', cursor:'pointer', outline:'none' }}>
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
                <button key={i} onClick={() => setActive(i)}
                  style={{ display:'block', width:'100%', textAlign:'left', background: isActive ? ORANGE : 'transparent', border:'none', borderBottom: i < ROOF_TYPES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', padding:'18px 24px', cursor:'pointer', fontFamily:'inherit', transition:'all 0.25s ease', position:'relative' }}
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
                <img src={t.img} alt={t.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  onError={e => { e.target.style.display='none'; e.target.parentElement.style.background = `linear-gradient(135deg, ${NAVY} 0%, ${DARK} 100%)` }}/>
                <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, transparent 50%, rgba(15,31,75,0.85) 100%)` }}/>
                <div style={{ position:'absolute', top:20, left:20, background:`${ORANGE}E6`, color:WHITE, fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', padding:'6px 12px' }}>{t.tag}</div>
              </div>
              <div style={{ padding:'32px 40px' }}>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'clamp(32px,3.5vw,42px)', fontWeight:800, color:WHITE, marginBottom:16, textTransform:'uppercase', letterSpacing:'-0.3px', lineHeight:1 }}>{t.name}</h3>
                <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.8, marginBottom:24 }}>{t.desc}</p>
                <div style={{ display:'flex', gap:40, flexWrap:'wrap', paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.1)' }}>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:6 }}>Best For</div>
                    <div style={{ fontSize:14, color:WHITE, fontWeight:600 }}>{t.good}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:6 }}>Lifespan</div>
                    <div style={{ fontSize:14, color:ORANGE, fontWeight:700 }}>{t.life}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes rtFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @media(max-width:900px){.ld-rt-mobile-select{display:block!important;margin-bottom:24px!important}.ld-rt-grid{grid-template-columns:1fr!important}.ld-rt-grid > div:first-child{display:none!important}}
      `}</style>
    </section>
  )
}

function Divisions() {
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
                <img src={d.img} alt={d.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform 0.6s ease' }}
                  onMouseOver={e=>e.target.style.transform='scale(1.04)'} onMouseOut={e=>e.target.style.transform='scale(1)'}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}/>
                <div style={{ position:'absolute', bottom:18, left:22, fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:WHITE, background:d.accent, padding:'5px 12px' }}>{d.city}</div>
              </div>
              <div style={{ padding:'32px' }}>
                <div style={{ fontFamily:"'Source Serif 4',serif", fontSize:21, color:NAVY, marginBottom:4 }}>{d.name}</div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:20 }}>{d.title}</div>
                <p style={{ fontSize:14, color:MUTED, lineHeight:1.85, marginBottom:24 }}>{d.desc}</p>
                <a href={`tel:${d.phone}`} style={{ fontSize:14, fontWeight:700, color:NAVY, textDecoration:'none', transition:'color 0.2s' }}
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

function Gallery() {
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

function Process({ onSchedule }) {
  const [ref, shown] = useReveal(0.1)
  return (
    <section id="process" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:NAVY, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }} className="ld-proc">
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>How It Works</div>
            <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,46px)', color:WHITE, lineHeight:1.12, marginBottom:24 }}>Our 4-Step<br/>Process</h2>
            <p style={{ fontSize:16, color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:40, maxWidth:380 }}>Every step is designed to make your experience transparent, easy, and stress-free.</p>
            <button onClick={onSchedule} style={{...BTN, padding:'16px 28px'}}
              onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Start with Free Inspection</button>
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

function Reviews() {
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

function ServiceAreas({ onCall }) {
  const [ref, shown] = useReveal(0.1)
  const houstonMap = 'https://www.google.com/maps?q=Houston,TX&t=&z=8&ie=UTF8&iwloc=&output=embed'
  const dallasMap  = 'https://www.google.com/maps?q=Dallas,TX&t=&z=8&ie=UTF8&iwloc=&output=embed'

  const metros = [
    { city:'Houston', color:NAVY, accent:NAVY, src:houstonMap, hub:'Houston, TX', cities:HOUSTON_CITIES },
    { city:'Dallas',  color:ORANGE, accent:ORANGE, src:dallasMap, hub:'Dallas-Fort Worth, TX', cities:DALLAS_CITIES },
  ]

  return (
    <section id="service-areas" ref={ref} className={`reveal ${shown?'is-in':''}`} style={{ background:WHITE, padding:'96px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:12 }}>Coverage</div>
          <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4vw,44px)', color:NAVY, marginBottom:14 }}>Serving Houston & Dallas</h2>
          <p style={{ fontSize:16, color:MUTED, maxWidth:560, margin:'0 auto', lineHeight:1.8 }}>
            We service the greater Houston and Dallas-Fort Worth metro areas, plus surrounding cities across Texas. <button onClick={onCall} style={{ background:'none', border:'none', color:ORANGE, fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:16, padding:0 }}>Give us a call</button> to discuss your project.
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
                <iframe src={m.src} title={`${m.city} service area`} width="100%" height="100%"
                  style={{ border:0, position:'absolute', inset:0, width:'100%', height:'100%' }}
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-100%)', pointerEvents:'none', display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <div style={{ background:m.accent, color:WHITE, padding:'6px 14px', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', borderRadius:2, whiteSpace:'nowrap', boxShadow:'0 4px 12px rgba(0,0,0,0.25)', marginBottom:4 }}>{m.hub}</div>
                  <div style={{ width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:`8px solid ${m.accent}` }}/>
                </div>
              </div>

              <div style={{ padding:'24px 28px' }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:MUTED, marginBottom:14 }}>Cities Served (Including)</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {m.cities.map(c=>(<span key={c} style={{ fontSize:12, background:OFF, border:`1px solid ${BORDER}`, padding:'5px 12px', color:DARK }}>{c}</span>))}
                  <span style={{ fontSize:12, padding:'5px 12px', color:MUTED, fontStyle:'italic' }}>and many more...</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-area{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

function CTA({ onSchedule, onCall }) {
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setScrollY(rect.top)
    }
    fn()
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <section ref={ref} style={{ position:'relative', overflow:'hidden', background:NAVY, padding:'96px 48px' }}>
      <img src={CTA_IMG} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'120%', objectFit:'cover', opacity:0.18, transform:`translateY(${scrollY * -0.15}px)`, willChange:'transform' }}/>
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg, ${NAVY}D0 0%, ${NAVY}99 100%)` }}/>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:ORANGE }}/>
      <div style={{ position:'relative', maxWidth:700, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:ORANGE, marginBottom:20 }}>Get Started Today</div>
        <h2 style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(28px,4.5vw,54px)', color:WHITE, lineHeight:1.12, marginBottom:20 }}>Your Roof Deserves<br/>a Second Opinion.</h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,0.65)', lineHeight:1.8, marginBottom:44 }}>Free, thorough inspections from a team built on customer service. Schedule yours today.</p>
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={onSchedule} style={{...BTN, padding:'16px 36px', fontSize:14}}
            onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Schedule Free Inspection</button>
          <button onClick={onCall} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'transparent', color:WHITE, border:'1px solid rgba(255,255,255,0.4)', padding:'15px 22px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', borderRadius:2, transition:'all 0.2s' }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>↗ Call Us</button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background:DARK, padding:'72px 48px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div className="ld-ft" style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:48, marginBottom:56, paddingBottom:56, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <img src={LOGO} alt="LD Roofing & Exteriors" style={{ height:48, width:'auto', objectFit:'contain', marginBottom:20, filter:'none' }}
              onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='block'}}/>
            <span style={{ display:'none', fontFamily:"'Source Serif 4',serif", fontSize:20, fontWeight:700, color:WHITE, marginBottom:20 }}>LD Roofing & Exteriors</span>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.38)', lineHeight:1.9, maxWidth:280, marginBottom:20 }}>Family-owned roofing contractor serving Houston and Dallas. Free inspections, customer-service oriented, and work we stand behind.</p>
            <a href={`mailto:${EMAIL}`} style={{ fontSize:13, color:'rgba(255,255,255,0.38)', textDecoration:'none', transition:'color 0.2s' }}
              onMouseOver={e=>e.target.style.color=WHITE} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.38)'}>{EMAIL}</a>
          </div>

          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>Houston</div>
            <a href={`tel:${PHONE_HOUSTON}`} style={{ fontSize:15, fontWeight:700, color:WHITE, textDecoration:'none', display:'block', marginBottom:14, transition:'color 0.2s' }}
              onMouseOver={e=>e.target.style.color=ORANGE} onMouseOut={e=>e.target.style.color=WHITE}>{PHONE_HOUSTON}</a>
            {HOUSTON_CITIES.map(c=>(<div key={c} style={{ fontSize:12, color:'rgba(255,255,255,0.38)', marginBottom:6 }}>{c}</div>))}
          </div>

          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>Dallas</div>
            <a href={`tel:${PHONE_DALLAS}`} style={{ fontSize:15, fontWeight:700, color:WHITE, textDecoration:'none', display:'block', marginBottom:14, transition:'color 0.2s' }}
              onMouseOver={e=>e.target.style.color=ORANGE} onMouseOut={e=>e.target.style.color=WHITE}>{PHONE_DALLAS}</a>
            {DALLAS_CITIES.map(c=>(<div key={c} style={{ fontSize:12, color:'rgba(255,255,255,0.38)', marginBottom:6 }}>{c}</div>))}
          </div>

          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>Resources</div>
            <Link to="/blog" style={{ fontSize:12, color:'rgba(255,255,255,0.38)', textDecoration:'none', marginBottom:8, display:'block' }}>Blog</Link>
            {['Free Roof Inspection','Roof Replacement','Roof Repair','Leak Repair','Commercial Roofing','Insurance Claim Help'].map(s=>(
              <div key={s} style={{ fontSize:12, color:'rgba(255,255,255,0.38)', marginBottom:6 }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} LD Roofing & Exteriors LLC · BBB A+ Accredited</div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.2)' }}>Website by <a href="https://ecwebco.com" target="_blank" rel="noreferrer" style={{ color:ORANGE, textDecoration:'none' }}>EC Web Co</a></div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-ft{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.ld-ft{grid-template-columns:1fr!important}}`}</style>
    </footer>
  )
}

function ScheduleModal({ onClose, onCall }) {
  useEffect(()=>{ document.body.style.overflow='hidden'; return ()=>{ document.body.style.overflow='' } },[])
  return (
    <div style={{ position:'fixed', inset:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)' }} onClick={onClose}/>
      <div style={{ position:'relative', width:'min(480px,94vw)', maxHeight:'90vh', overflowY:'auto', background:WHITE }}>
        <div style={{ background:NAVY, padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:4 }}>Free, No Obligation</div>
            <div style={{ fontFamily:"'Source Serif 4',serif", fontSize:20, color:WHITE }}>Schedule Your Inspection</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', fontSize:22, cursor:'pointer', lineHeight:1 }}>✕</button>
        </div>
        <InspectionForm onCall={()=>{onClose();onCall && onCall()}}/>
      </div>
    </div>
  )
}

function StickyBar({ onSchedule, onCall }) {
  return (
    <>
      <div className="ld-sticky" style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:200, display:'none', paddingBottom:'env(safe-area-inset-bottom)' }}>
        <button onClick={onCall} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'15px', background:NAVY, color:WHITE, border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:12, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase' }}>Call</button>
        <button onClick={onSchedule} style={{ flex:2, display:'flex', alignItems:'center', justifyContent:'center', padding:'15px', background:ORANGE, color:WHITE, border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:12, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase' }}>Free Inspection →</button>
      </div>
      <style>{`@media(max-width:768px){.ld-sticky{display:flex!important}}`}</style>
    </>
  )
}

// ─── HomePage (full home content) ─────────────────────────────
function HomePage({ onSchedule, onCall }) {
  return (
    <>
      <Hero onCall={onCall}/>
      <TrustBar/>
      <StatsStrip/>
      <Services onSchedule={onSchedule}/>
      <RoofTypes/>
      <Divisions/>
      <Gallery/>
      <Process onSchedule={onSchedule}/>
      <Reviews/>
      <FAQ/>
      <ServiceAreas onCall={onCall}/>
      <CTA onSchedule={onSchedule} onCall={onCall}/>
    </>
  )
}

// ─── App ──────────────────────────────────────────────────────
export default function App() {
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  return (
    <div style={{ fontFamily:"'Barlow', sans-serif", color:DARK, paddingTop:TOP_BAR_HEIGHT }}>
      <TopBar/>
      <Nav onSchedule={()=>setScheduleOpen(true)} onCall={()=>setCallOpen(true)}/>

      <Routes>
        <Route path="/" element={<HomePage onSchedule={()=>setScheduleOpen(true)} onCall={()=>setCallOpen(true)}/>}/>
        <Route path="/blog" element={<BlogList/>}/>
        <Route path="/blog/:slug" element={<BlogPost onSchedule={()=>setScheduleOpen(true)} onCall={()=>setCallOpen(true)}/>}/>
      </Routes>

      <Footer/>
      <StickyBar onSchedule={()=>setScheduleOpen(true)} onCall={()=>setCallOpen(true)}/>
      {scheduleOpen && <ScheduleModal onClose={()=>setScheduleOpen(false)} onCall={()=>setCallOpen(true)}/>}
      {callOpen && <CallPicker onClose={()=>setCallOpen(false)}/>}
    </div>
  )
}
