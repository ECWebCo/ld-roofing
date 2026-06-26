import { useState, useEffect, useRef, createContext, useContext } from 'react'
import {
  NAVY, ORANGE, ORANGE2, OFF, DARK, MUTED, BORDER, WHITE,
  PHONE_HOUSTON, PHONE_DALLAS, EMAIL,
} from './theme'

// ─── Modal context (Schedule / Call), provided by Layout ─────────────────────
const ModalContext = createContext({ openSchedule: () => {}, openCall: () => {} })
export const ModalProvider = ModalContext.Provider
export const useModals = () => useContext(ModalContext)

// ─── Scroll-reveal hook ──────────────────────────────────────────────────────
export function useReveal(threshold = 0.15) {
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

// ─── Animated counter ────────────────────────────────────────────────────────
export function Counter({ to, suffix = '' }) {
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

export function Stars() {
  return <span style={{ color:ORANGE, fontSize:15, letterSpacing:3 }}>★★★★★</span>
}

// ─── Renders a body[] of {type:p|h2|h3|ul|callout} blocks ────────────────────
export function renderSection(section, i) {
  switch (section.type) {
    case 'h2':
      return <h2 key={i} style={{ fontFamily:"'Source Serif 4',serif", fontSize:'clamp(22px,3vw,30px)', color:NAVY, lineHeight:1.25, marginTop:48, marginBottom:18 }}>{section.text}</h2>
    case 'h3':
      return <h3 key={i} style={{ fontFamily:"'Source Serif 4',serif", fontSize:20, color:NAVY, lineHeight:1.3, marginTop:32, marginBottom:14 }}>{section.text}</h3>
    case 'ul':
      return (
        <ul key={i} style={{ paddingLeft:24, marginBottom:24, color:DARK, fontSize:16, lineHeight:1.85 }}>
          {section.items.map((item, j) => <li key={j} style={{ marginBottom:10 }}>{item}</li>)}
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

// ─── Shared inspection form ──────────────────────────────────────────────────
export function InspectionForm({ compact = false }) {
  const { openCall } = useModals()
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
    border:compact ? 'none' : `1px solid ${BORDER}`, outline:'none',
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
        Or <button onClick={openCall} style={{ background:'none', border:'none', color:ORANGE, fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:13, padding:0 }}>call us →</button>
      </div>
    </div>
  )
}

// ─── Schedule modal ──────────────────────────────────────────────────────────
export function ScheduleModal({ onClose }) {
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
        <InspectionForm/>
      </div>
    </div>
  )
}

// ─── Call-division picker ────────────────────────────────────────────────────
export function CallPicker({ onClose }) {
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
