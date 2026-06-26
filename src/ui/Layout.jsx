import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  NAVY, ORANGE, ORANGE2, DARK, MUTED, WHITE, BTN,
  PHONE_HOUSTON, PHONE_DALLAS, EMAIL, LOGO, TOP_BAR_HEIGHT, BUSINESS_NAME,
} from './theme'
import { ModalProvider, ScheduleModal, CallPicker } from './primitives'
import { SERVICES } from '../data/services'
import { citiesByMetro } from '../data/locations'

const NAV_LINKS = [
  ['/services', 'Services'],
  ['/roof-types', 'Roof Types'],
  ['/service-areas', 'Service Areas'],
  ['/about', 'About'],
  ['/blog', 'Blog'],
]

function TopBar() {
  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, height:TOP_BAR_HEIGHT, zIndex:301,
      background:DARK, display:'flex', alignItems:'center', justifyContent:'center',
      gap:24, padding:'0 16px', borderBottom:`1px solid rgba(255,255,255,0.06)`,
    }}>
      {[['HOUSTON',PHONE_HOUSTON],['DALLAS',PHONE_DALLAS]].map(([label,phone],i)=>(
        <span key={label} style={{ display:'flex', alignItems:'center', gap:24 }}>
          {i===1 && <span style={{ color:'rgba(255,255,255,0.25)' }}>·</span>}
          <a href={`tel:${phone}`} className="ld-topbar-link" style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:600, color:WHITE, textDecoration:'none', letterSpacing:'0.3px' }}>
            <span style={{ color:ORANGE, marginRight:6, fontWeight:700, letterSpacing:'1px' }}>{label}</span>{phone}
          </a>
        </span>
      ))}
      <style>{`.ld-topbar-link:hover{color:${ORANGE} !important}@media(max-width:480px){.ld-topbar-link{font-size:11px !important}}`}</style>
    </div>
  )
}

function Nav({ onSchedule, onCall }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    fn()
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const bg = scrolled || open || !isHome
  const linkStyle = (active) => ({ fontFamily:'inherit', fontSize:13, fontWeight:500, letterSpacing:'0.5px', color: active ? WHITE : 'rgba(255,255,255,0.7)', cursor:'pointer', transition:'color 0.2s', textDecoration:'none' })

  return (
    <>
      <nav style={{ position:'fixed', top:TOP_BAR_HEIGHT, left:0, right:0, zIndex:300, background:bg?'rgba(15,31,75,0.97)':'transparent', backdropFilter:bg?'blur(12px)':'none', borderBottom:bg?'1px solid rgba(255,255,255,0.08)':'none', transition:'all 0.35s ease' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', height: bg ? 72 : 110, display:'flex', alignItems:'center', justifyContent:'space-between', transition:'height 0.4s ease' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center' }} aria-label={BUSINESS_NAME}>
            <img src={LOGO} alt={`${BUSINESS_NAME} logo`} style={{ height: bg ? 44 : 110, width:'auto', objectFit:'contain', cursor:'pointer', transition:'height 0.4s ease' }}
              onError={e=>{e.target.style.display='none'; e.target.nextSibling.style.display='block'}}/>
            <span style={{ display:'none', fontFamily:"'Source Serif 4',serif", fontSize:18, fontWeight:700, color:WHITE }}>LD Roofing</span>
          </Link>

          <div className="ld-links" style={{ display:'flex', gap:36 }}>
            {NAV_LINKS.map(([to,label])=>(
              <NavLink key={to} to={to} style={({isActive})=>linkStyle(isActive)}
                onMouseOver={e=>e.target.style.color=WHITE} onMouseOut={e=>e.target.style.color = location.pathname.startsWith(to) ? WHITE : 'rgba(255,255,255,0.7)'}>{label}</NavLink>
            ))}
          </div>

          <div className="ld-cta" style={{ display:'flex', gap:20, alignItems:'center' }}>
            <button onClick={onCall} style={{ background:'none', border:'none', fontSize:14, fontWeight:700, color:WHITE, cursor:'pointer', fontFamily:'inherit' }}>Call Us</button>
            <button onClick={onSchedule} style={{...BTN, padding:'10px 20px'}}
              onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Free Inspection</button>
          </div>

          <button className="ld-ham" onClick={()=>setOpen(!open)} aria-label="Menu" style={{ display:'none', background:'none', border:'none', cursor:'pointer', flexDirection:'column', gap:5, padding:4 }}>
            {[0,1,2].map(i=><span key={i} style={{ display:'block', width:22, height:2, background:WHITE, transition:'0.3s', transform:i===0&&open?'rotate(45deg) translate(5px,5px)':i===2&&open?'rotate(-45deg) translate(5px,-5px)':'none', opacity:i===1&&open?0:1 }}/>)}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ position:'fixed', inset:0, top:72+TOP_BAR_HEIGHT, background:NAVY, zIndex:299, display:'flex', flexDirection:'column', padding:'8px 0 32px', overflowY:'auto' }}>
          {NAV_LINKS.map(([to,label])=>(
            <Link key={to} to={to} style={{ borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'20px 32px', fontFamily:'inherit', fontSize:16, fontWeight:600, color:WHITE, textDecoration:'none' }}>{label}</Link>
          ))}
          <div style={{ padding:'28px 32px', display:'flex', flexDirection:'column', gap:12 }}>
            <button onClick={()=>{onCall()}} style={{ background:'none', border:'none', fontSize:18, fontWeight:700, color:ORANGE, cursor:'pointer', textAlign:'left', padding:0, fontFamily:'inherit' }}>Call Us →</button>
            <button onClick={()=>{onSchedule()}} style={{...BTN, textAlign:'center'}}
              onMouseOver={e=>e.currentTarget.style.background=ORANGE2} onMouseOut={e=>e.currentTarget.style.background=ORANGE}>Schedule Free Inspection</button>
          </div>
        </div>
      )}

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        img{display:block;max-width:100%}
        body{font-family:'Barlow',sans-serif}
        a{color:inherit}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s ease, transform 0.8s ease}
        .reveal.is-in{opacity:1;transform:none}
        @media(max-width:900px){.ld-links{display:none!important}.ld-cta{display:none!important}.ld-ham{display:flex!important}}
      `}</style>
    </>
  )
}

function Footer() {
  const houston = citiesByMetro('houston')
  const dallas = citiesByMetro('dallas')
  return (
    <footer style={{ background:DARK, padding:'72px 48px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div className="ld-ft" style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap:48, marginBottom:56, paddingBottom:56, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <img src={LOGO} alt={`${BUSINESS_NAME} logo`} style={{ height:48, width:'auto', objectFit:'contain', marginBottom:20 }}
              onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='block'}}/>
            <span style={{ display:'none', fontFamily:"'Source Serif 4',serif", fontSize:20, fontWeight:700, color:WHITE, marginBottom:20 }}>{BUSINESS_NAME}</span>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.38)', lineHeight:1.9, maxWidth:280, marginBottom:20 }}>Family-owned roofing contractor serving Houston and Dallas. Free inspections, customer-service oriented, and work we stand behind.</p>
            <a href={`mailto:${EMAIL}`} style={{ fontSize:13, color:'rgba(255,255,255,0.38)', textDecoration:'none' }}>{EMAIL}</a>
          </div>

          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>Services</div>
            {SERVICES.slice(0,8).map(s=>(
              <Link key={s.slug} to={`/services/${s.slug}`} style={{ fontSize:12, color:'rgba(255,255,255,0.38)', marginBottom:8, display:'block', textDecoration:'none' }}>{s.title}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>Houston Area</div>
            <a href={`tel:${PHONE_HOUSTON}`} style={{ fontSize:15, fontWeight:700, color:WHITE, textDecoration:'none', display:'block', marginBottom:14 }}>{PHONE_HOUSTON}</a>
            {houston.slice(0,8).map(c=>(<Link key={c.slug} to={`/service-areas/${c.slug}`} style={{ fontSize:12, color:'rgba(255,255,255,0.38)', marginBottom:6, display:'block', textDecoration:'none' }}>{c.name}</Link>))}
          </div>

          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:ORANGE, marginBottom:16 }}>Dallas–Fort Worth</div>
            <a href={`tel:${PHONE_DALLAS}`} style={{ fontSize:15, fontWeight:700, color:WHITE, textDecoration:'none', display:'block', marginBottom:14 }}>{PHONE_DALLAS}</a>
            {dallas.slice(0,8).map(c=>(<Link key={c.slug} to={`/service-areas/${c.slug}`} style={{ fontSize:12, color:'rgba(255,255,255,0.38)', marginBottom:6, display:'block', textDecoration:'none' }}>{c.name}</Link>))}
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} {BUSINESS_NAME} LLC · BBB A+ Accredited · <Link to="/service-areas" style={{ color:'rgba(255,255,255,0.3)', textDecoration:'none' }}>All Service Areas</Link></div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.2)' }}>Website by <a href="https://ecwebco.com" target="_blank" rel="noreferrer" style={{ color:ORANGE, textDecoration:'none' }}>EC Web Co</a></div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.ld-ft{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){.ld-ft{grid-template-columns:1fr!important}}`}</style>
    </footer>
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const modals = { openSchedule: () => setScheduleOpen(true), openCall: () => setCallOpen(true) }

  return (
    <ModalProvider value={modals}>
      <div style={{ fontFamily:"'Barlow', sans-serif", color:DARK, paddingTop:TOP_BAR_HEIGHT }}>
        <ScrollToTop/>
        <TopBar/>
        <Nav onSchedule={modals.openSchedule} onCall={modals.openCall}/>
        <Outlet/>
        <Footer/>
        <StickyBar onSchedule={modals.openSchedule} onCall={modals.openCall}/>
        {scheduleOpen && <ScheduleModal onClose={()=>setScheduleOpen(false)}/>}
        {callOpen && <CallPicker onClose={()=>setCallOpen(false)}/>}
      </div>
    </ModalProvider>
  )
}
