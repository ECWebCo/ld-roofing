import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'
import { NAVY, ORANGE, MUTED, WHITE, BTN, TOP_BAR_HEIGHT } from '../ui/theme'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | LD Roofing & Exteriors" description="The page you are looking for could not be found." path="/404" noindex />
      <section style={{ background:NAVY, minHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center', padding:`${TOP_BAR_HEIGHT + 140}px 48px 100px`, textAlign:'center' }}>
        <div style={{ maxWidth:560 }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:96, fontWeight:800, color:ORANGE, lineHeight:1 }}>404</div>
          <h1 style={{ fontFamily:"'Source Serif 4',serif", fontSize:32, color:WHITE, marginBottom:16 }}>Page not found</h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.6)', lineHeight:1.7, marginBottom:32 }}>The page you are looking for moved or no longer exists. Let’s get you back on track.</p>
          <Link to="/" style={{ ...BTN, textDecoration:'none', display:'inline-block' }}>Back to Home</Link>
        </div>
      </section>
    </>
  )
}
