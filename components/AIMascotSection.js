/**
 * AIMascotSection — Premium "3D floor" AI automation storytelling
 * White / light theme — blends seamlessly with the existing site.
 * Five-phase auto-cycling animation:
 *   response → organizing → followup → escalation → outcome
 */

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ─── Phase sequencer ──────────────────────────────────────────────────────── */
const SEQ      = ['response', 'organizing', 'followup', 'escalation', 'outcome']
const DUR      = { response: 3600, organizing: 3600, followup: 3200, escalation: 3000, outcome: 3600 }
const CAPTIONS = {
  response:   'Responding to every channel — instantly',
  organizing: 'Organising all leads into your CRM',
  followup:   'Sending automated follow-ups & offers',
  escalation: 'Escalating complex requests to your team',
  outcome:    'Your business runs on autopilot',
}

function usePhase(active) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setI(p => (p + 1) % SEQ.length), DUR[SEQ[i]])
    return () => clearTimeout(t)
  }, [i, active])
  return SEQ[i]
}

/* ─── Channel sources ──────────────────────────────────────────────────────── */
const CHANNELS = [
  { id: 'email', icon: '✉',  name: 'Email',     left: '6%',  top: '10%' },
  { id: 'wa',    icon: '💬', name: 'WhatsApp',  left: '74%', top: '12%' },
  { id: 'ig',    icon: '📷', name: 'Instagram', left: '4%',  top: '65%' },
  { id: 'chat',  icon: '🔔', name: 'Web Chat',  left: '76%', top: '63%' },
]

// Approx midpoints between mascot (50 %, 50 %) and each channel
const REPLY_POS = [
  { left: '21%', top: '24%' },
  { left: '64%', top: '27%' },
  { left: '19%', top: '55%' },
  { left: '65%', top: '53%' },
]

/* ─── Ease ──────────────────────────────────────────────────────────────────── */
const EASE = [0.25, 0, 0, 1]

/* ─── Mascot (white body · blue eyes · light theme) ────────────────────────── */
function Mascot({ eyeDX, eyeDY, phase }) {
  const isAlert  = phase === 'escalation'
  const iris     = isAlert ? '#ff6b35' : '#0071e3'
  const glow     = isAlert ? 'rgba(255,107,53,0.55)' : 'rgba(0,113,227,0.55)'

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
      style={{ position: 'absolute', left: '50%', top: '47%', transform: 'translate(-50%,-50%)', zIndex: 20, pointerEvents: 'none' }}
    >
      <svg viewBox="0 0 80 100" width="78" height="97" style={{ overflow: 'visible' }}>
        {/* Floor shadow */}
        <ellipse cx={40} cy={103} rx={26} ry={5} fill="rgba(0,113,227,0.1)" />

        {/* Body */}
        <rect x={7} y={7} width={66} height={82} rx={20}
          fill="#f0f4ff" stroke="rgba(0,113,227,0.2)" strokeWidth={1.5}
        />
        {/* Visor */}
        <rect x={13} y={15} width={54} height={46} rx={13}
          fill="rgba(255,255,255,0.75)" stroke="rgba(0,113,227,0.13)" strokeWidth={0.8}
        />

        {/* Left eye socket */}
        <circle cx={28} cy={38} r={9.5} fill="white" />
        <circle cx={28} cy={38} r={6.2}
          style={{ fill: iris, filter: `drop-shadow(0 0 5px ${glow})`, transition: 'fill 0.4s, filter 0.4s' }}
        />
        {/* Left pupil – moves with cursor */}
        <motion.g animate={{ x: eyeDX, y: eyeDY }} transition={{ type: 'spring', stiffness: 80, damping: 16 }}>
          <circle cx={28} cy={38} r={2.3} fill="white" />
        </motion.g>

        {/* Right eye socket */}
        <circle cx={52} cy={38} r={9.5} fill="white" />
        <circle cx={52} cy={38} r={6.2}
          style={{ fill: iris, filter: `drop-shadow(0 0 5px ${glow})`, transition: 'fill 0.4s, filter 0.4s' }}
        />
        {/* Right pupil */}
        <motion.g animate={{ x: eyeDX, y: eyeDY }} transition={{ type: 'spring', stiffness: 80, damping: 16 }}>
          <circle cx={52} cy={38} r={2.3} fill="white" />
        </motion.g>

        {/* Mouth grill */}
        {[0, 7, 14].map((o, i) => (
          <line key={i} x1={20} y1={66 + o} x2={60} y2={66 + o}
            stroke="rgba(0,113,227,0.17)" strokeWidth={1.5} strokeLinecap="round"
          />
        ))}

        {/* Antenna */}
        <line x1={40} y1={7} x2={40} y2={-6} stroke="rgba(0,113,227,0.38)" strokeWidth={1.5} />
        <motion.circle cx={40} cy={-9} r={3.5} fill="#0071e3"
          animate={{ opacity: [1, 0.18, 1], r: [3.5, 4.6, 3.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(0,113,227,0.65))' }}
        />

        {/* Side fins */}
        <rect x={-1} y={27} width={10} height={26} rx={4}
          fill="rgba(0,113,227,0.06)" stroke="rgba(0,113,227,0.17)" strokeWidth={1}
        />
        <rect x={71} y={27} width={10} height={26} rx={4}
          fill="rgba(0,113,227,0.06)" stroke="rgba(0,113,227,0.17)" strokeWidth={1}
        />
      </svg>

      {/* Glass floor reflection */}
      <svg viewBox="0 0 80 100" width="78" height="28"
        style={{ display: 'block', marginTop: '-4px', opacity: 0.1, transform: 'scaleY(-1)' }}
      >
        <rect x={7} y={7} width={66} height={82} rx={20} fill="#0071e3" />
      </svg>
    </motion.div>
  )
}

/* ─── Shared channel icon pill ─────────────────────────────────────────────── */
function ChannelPill({ ch, delay, badge, faded }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72 }}
      animate={{ opacity: faded ? 0.35 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.72 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      style={{ position: 'absolute', left: ch.left, top: ch.top, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 15 }}
    >
      <motion.div
        animate={faded ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 2.8 + delay * 0.6, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.4 }}
        style={{
          width: '40px', height: '40px', borderRadius: '12px', background: 'white',
          border: '1px solid rgba(0,113,227,0.18)', boxShadow: '0 2px 14px rgba(0,113,227,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', position: 'relative',
        }}
      >
        {ch.icon}
        {badge && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.35, type: 'spring' }}
            style={{
              position: 'absolute', top: '-5px', right: '-5px',
              width: '16px', height: '16px', borderRadius: '50%', background: '#0071e3',
              border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: '7.5px', fontWeight: 800, lineHeight: 1 }}>1</span>
          </motion.div>
        )}
      </motion.div>
      {!faded && <span style={{ fontSize: '9px', color: '#6e6e73', fontWeight: 500 }}>{ch.name}</span>}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   PHASE 1 — CUSTOMER RESPONSE
══════════════════════════════════════════════════════════ */
function ResponsePhase() {
  return (
    <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    >
      {CHANNELS.map((ch, i) => <ChannelPill key={ch.id} ch={ch} delay={i * 0.12} badge faded={false} />)}

      {/* "Replied" bubbles at midpoints */}
      {REPLY_POS.map((pos, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0.5, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 1.1 + i * 0.14, ease: EASE }}
          style={{
            position: 'absolute', left: pos.left, top: pos.top, zIndex: 16,
            background: '#0071e3', borderRadius: '10px 10px 2px 10px',
            padding: '4px 10px', boxShadow: '0 2px 12px rgba(0,113,227,0.32)',
          }}
        >
          <span style={{ color: 'white', fontSize: '9px', fontWeight: 700, whiteSpace: 'nowrap' }}>✓ Replied</span>
        </motion.div>
      ))}

      {/* "AI responding" chip near mascot */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        style={{
          position: 'absolute', left: '50%', top: '64%', transform: 'translateX(-50%)',
          zIndex: 17, background: 'rgba(0,113,227,0.07)', border: '1px solid rgba(0,113,227,0.2)',
          borderRadius: '20px', padding: '4px 12px', whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '9px', color: '#0071e3', fontWeight: 600 }}>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>●</motion.span>
          {' '}AI responding to all channels
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   PHASE 2 — DATA ORGANISATION (CRM)
══════════════════════════════════════════════════════════ */
const CRM_CARDS = [
  { label: 'Hot Lead',     color: '#ff6b35', left: '58%', top: '10%', d: 0.00 },
  { label: 'New Customer', color: '#0071e3', left: '74%', top: '26%', d: 0.18 },
  { label: 'Follow-up',   color: '#34c759', left: '56%', top: '26%', d: 0.36 },
  { label: 'Returning',   color: '#af52de', left: '74%', top: '42%', d: 0.54 },
]

function OrganizingPhase() {
  return (
    <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    >
      {CHANNELS.map((ch, i) => <ChannelPill key={ch.id} ch={ch} delay={i * 0.08} badge={false} faded />)}

      {/* CRM header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          position: 'absolute', left: '56%', top: '3%', zIndex: 16,
          fontSize: '9px', color: '#6e6e73', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}
      >CRM · Auto-organised</motion.div>

      {CRM_CARDS.map(c => (
        <motion.div key={c.label}
          initial={{ opacity: 0, y: -18, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.52, delay: c.d, ease: EASE }}
          style={{
            position: 'absolute', left: c.left, top: c.top, zIndex: 15,
            background: 'white', borderRadius: '9px',
            border: '1px solid rgba(0,0,0,0.06)', borderLeft: `3px solid ${c.color}`,
            padding: '7px 10px', minWidth: '74px',
            boxShadow: `0 2px 12px rgba(0,0,0,0.06)`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: c.color }} />
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#1d1d1f' }}>{c.label}</span>
          </div>
          <div style={{ fontSize: '8px', color: '#a1a1aa', fontFamily: 'ui-monospace, monospace' }}>
            Auto-tagged ✓
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   PHASE 3 — FOLLOW-UP & LOYALTY
══════════════════════════════════════════════════════════ */
const OFFERS = [
  { text: '7-day re-engagement', sub: 'Email sequence',  icon: '📤', left: '55%', top: '8%',  d: 0.10 },
  { text: 'Loyalty reward',      sub: 'WhatsApp offer',  icon: '🎁', left: '62%', top: '58%', d: 0.38 },
  { text: 'Win-back campaign',   sub: 'Auto-triggered',  icon: '🔄', left: '6%',  top: '30%', d: 0.65 },
]

function FollowupPhase() {
  return (
    <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    >
      {/* Clock */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ duration: 0.4, scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ position: 'absolute', right: '14%', top: '10%', fontSize: '28px', zIndex: 15 }}
      >⏱</motion.div>

      {OFFERS.map(o => (
        <motion.div key={o.text}
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, delay: o.d, ease: EASE }}
          style={{ position: 'absolute', left: o.left, top: o.top, zIndex: 15 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: o.d * 0.5 }}
            style={{
              background: 'white', borderRadius: '11px',
              border: '1px solid rgba(0,113,227,0.18)',
              boxShadow: '0 4px 18px rgba(0,113,227,0.1)',
              padding: '8px 11px', minWidth: '112px',
            }}
          >
            <div style={{ fontSize: '14px', marginBottom: '4px' }}>{o.icon}</div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#1d1d1f' }}>{o.text}</div>
            <div style={{ fontSize: '8px', color: '#0071e3', fontWeight: 500, marginTop: '2px' }}>{o.sub}</div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   PHASE 4 — HUMAN ESCALATION
══════════════════════════════════════════════════════════ */
function EscalationPhase() {
  return (
    <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    >
      {/* Alert card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          position: 'absolute', left: '5%', top: '17%', zIndex: 15,
          background: 'white', borderRadius: '11px',
          border: '1px solid rgba(255,107,53,0.32)', borderLeft: '3px solid #ff6b35',
          boxShadow: '0 4px 18px rgba(255,107,53,0.14)',
          padding: '9px 13px', minWidth: '110px',
        }}
      >
        <div style={{ fontSize: '9px', color: '#ff6b35', fontWeight: 700, marginBottom: '3px' }}>⚠ Complex Request</div>
        <div style={{ fontSize: '8px', color: '#6e6e73' }}>Needs human review</div>
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
          style={{ fontSize: '8px', color: '#ff6b35', fontWeight: 600, marginTop: '5px' }}
        >Escalating →</motion.div>
      </motion.div>

      {/* Dotted connector line */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
        style={{
          position: 'absolute', left: '30%', top: '26%', zIndex: 14,
          fontSize: '13px', color: '#ff6b35', letterSpacing: '2px',
        }}
      >· · · ·</motion.div>

      {/* Human avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.75, ease: EASE }}
        style={{
          position: 'absolute', right: '8%', top: '12%', zIndex: 15,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
        }}
      >
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'rgba(0,113,227,0.07)', border: '2px solid rgba(0,113,227,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', position: 'relative',
        }}>
          👤
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            style={{
              position: 'absolute', top: '-5px', right: '-5px',
              width: '18px', height: '18px', borderRadius: '50%',
              background: '#ff6b35', border: '2.5px solid white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: '9px', fontWeight: 800, lineHeight: 1 }}>!</span>
          </motion.div>
        </div>
        <span style={{ fontSize: '9px', color: '#6e6e73', fontWeight: 600 }}>Your Team</span>
      </motion.div>

      {/* "All other tasks continue" label */}
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.4 }}
        style={{
          position: 'absolute', left: '50%', bottom: '20%', transform: 'translateX(-50%)',
          zIndex: 16, background: 'rgba(52,199,89,0.08)',
          border: '1px solid rgba(52,199,89,0.25)', borderRadius: '20px',
          padding: '5px 13px', whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '9px', color: '#34c759', fontWeight: 600 }}>
          ✓ All other tasks continue automatically
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   PHASE 5 — OUTCOME STATS
══════════════════════════════════════════════════════════ */
const STATS = [
  { val: '10+ hrs', label: 'Saved every week',  left: '4%',  top: '7%',  color: '#0071e3', d: 0.00 },
  { val: '< 60s',  label: 'Response time',      left: '60%', top: '7%',  color: '#34c759', d: 0.18 },
  { val: '+35%',   label: 'More conversions',   left: '4%',  top: '62%', color: '#af52de', d: 0.36 },
  { val: '−40%',   label: 'Operational cost',   left: '60%', top: '62%', color: '#ff9f0a', d: 0.54 },
]

function OutcomePhase() {
  return (
    <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    >
      {/* Radial glow from mascot */}
      <motion.div
        animate={{ opacity: [0, 0.3, 0], scale: [0.6, 1.6, 2.0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
        style={{
          position: 'absolute', left: '50%', top: '47%', transform: 'translate(-50%,-50%)',
          width: '130px', height: '130px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.28) 0%, transparent 70%)',
          zIndex: 8,
        }}
      />

      {STATS.map(s => (
        <motion.div key={s.label}
          initial={{ opacity: 0, y: 16, scale: 0.84 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55, delay: s.d, ease: EASE }}
          style={{
            position: 'absolute', left: s.left, top: s.top, zIndex: 15,
            background: 'white', borderRadius: '13px',
            border: '1px solid rgba(0,0,0,0.055)',
            boxShadow: `0 4px 22px ${s.color}1a`,
            padding: '11px 14px', minWidth: '110px',
          }}
        >
          <div style={{ fontSize: '22px', fontWeight: 800, color: s.color, lineHeight: 1, letterSpacing: '-0.5px' }}>
            {s.val}
          </div>
          <div style={{ fontSize: '9px', color: '#6e6e73', marginTop: '4px', fontWeight: 500 }}>
            {s.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORTED SECTION
══════════════════════════════════════════════════════════ */
export default function AIMascotSection() {
  const sectionRef = useRef()
  const panelRef   = useRef()
  const [active, setActive] = useState(false)
  const [eyeDX, setEyeDX]   = useState(0)
  const [eyeDY, setEyeDY]   = useState(0)
  const phase = usePhase(active)

  /* Start animation when section enters viewport */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Cursor / touch → eye tracking */
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const track = (cx, cy) => {
      const r = el.getBoundingClientRect()
      const px = (cx - r.left) / r.width  - 0.5
      const py = (cy - r.top)  / r.height - 0.5
      setEyeDX(Math.max(-3,   Math.min(3,   px * 6  )))
      setEyeDY(Math.max(-2.5, Math.min(2.5, py * 5  )))
    }
    const mm = e => track(e.clientX, e.clientY)
    const mt = e => { if (e.touches[0]) track(e.touches[0].clientX, e.touches[0].clientY) }
    const ml = () => { setEyeDX(0); setEyeDY(0) }
    el.addEventListener('mousemove',  mm)
    el.addEventListener('mouseleave', ml)
    el.addEventListener('touchmove',  mt, { passive: true })
    return () => {
      el.removeEventListener('mousemove',  mm)
      el.removeEventListener('mouseleave', ml)
      el.removeEventListener('touchmove',  mt)
    }
  }, [])

  return (
    <section ref={sectionRef} className="services-section" style={{ paddingTop: '6rem' }}>
      <div className="container">
        <div className="mascot-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* ─── LEFT · 3D scene panel ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div
              ref={panelRef}
              className="mascot-panel"
              style={{
                position: 'relative',
                height: '480px',
                borderRadius: '22px',
                background: 'linear-gradient(148deg, rgba(237,244,255,0.55) 0%, rgba(252,253,255,0.85) 100%)',
                border: '1px solid rgba(0,113,227,0.1)',
                boxShadow: '0 8px 48px rgba(0,113,227,0.08), 0 2px 12px rgba(0,0,0,0.04)',
                overflow: 'hidden',
              }}
            >
              {/* ── Subtle grid overlay on panel bg ────────────────── */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 0, borderRadius: '22px',
                backgroundImage: 'linear-gradient(rgba(0,113,227,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.04) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
              }} />

              {/* ── 3D glass floor ──────────────────────────────────── */}
              <div style={{
                position: 'absolute',
                left: '6%', right: '6%', bottom: '-3%', height: '44%',
                background: 'linear-gradient(to bottom, rgba(233,242,255,0.72) 0%, rgba(220,234,255,0.45) 100%)',
                backgroundImage: 'linear-gradient(rgba(0,113,227,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.07) 1px, transparent 1px)',
                backgroundSize: '38px 38px',
                borderRadius: '18px 18px 0 0',
                border: '1px solid rgba(0,113,227,0.13)', borderBottom: 'none',
                transform: 'perspective(520px) rotateX(26deg)',
                transformOrigin: 'center bottom',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85)',
                zIndex: 1,
              }} />

              {/* Floor edge glow */}
              <div style={{
                position: 'absolute', left: '10%', right: '10%', bottom: 0, height: '18px',
                background: 'radial-gradient(ellipse, rgba(0,113,227,0.18) 0%, transparent 70%)',
                filter: 'blur(5px)', zIndex: 2,
              }} />

              {/* ── Phase elements ──────────────────────────────────── */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                <AnimatePresence mode="sync">
                  {phase === 'response'   && <ResponsePhase   key="response"   />}
                  {phase === 'organizing' && <OrganizingPhase key="organizing" />}
                  {phase === 'followup'   && <FollowupPhase   key="followup"   />}
                  {phase === 'escalation' && <EscalationPhase key="escalation" />}
                  {phase === 'outcome'    && <OutcomePhase    key="outcome"    />}
                </AnimatePresence>
              </div>

              {/* ── Mascot (always visible, z above phases) ────────── */}
              <Mascot eyeDX={eyeDX} eyeDY={eyeDY} phase={phase} />

              {/* ── Caption bar ─────────────────────────────────────── */}
              <div style={{
                position: 'absolute', bottom: '14px', left: '12px', right: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                zIndex: 30,
              }}>
                {/* Caption pill */}
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    background: 'rgba(255,255,255,0.88)',
                    border: '1px solid rgba(0,113,227,0.13)',
                    borderRadius: '20px', padding: '5px 13px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <motion.div
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0071e3', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: '10px', color: '#1d1d1f', fontWeight: 500 }}>
                    {CAPTIONS[phase]}
                  </span>
                </motion.div>

                {/* Phase progress indicator */}
                <div style={{ display: 'flex', gap: '5px', paddingRight: '2px' }}>
                  {SEQ.map(s => (
                    <motion.div key={s}
                      animate={{
                        background: phase === s ? '#0071e3' : 'rgba(0,113,227,0.18)',
                        width: phase === s ? '20px' : '6px',
                      }}
                      transition={{ duration: 0.35, ease: EASE }}
                      style={{ height: '6px', borderRadius: '3px' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT · text content ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <p style={{
              fontSize: '0.78rem', letterSpacing: '0.1em', fontWeight: 600,
              textTransform: 'uppercase', color: '#0071e3', marginBottom: '1rem',
            }}>Intelligent Automation</p>

            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              What we automate
            </h2>

            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              We build intelligent AI agents that work alongside your team, automating routine tasks and helping your business operate faster, smarter, and more efficiently.
            </p>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '3rem' }}>
              To explore how automation can transform your workflows, visit our Services page to discover the solutions we offer. Our automation engineers will review your needs and get back to you promptly with tailored recommendations.
            </p>

            <Link href="/services" className="cta-button">
              View Services
            </Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mascot-grid  { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .mascot-panel { height: 340px !important; }
        }
      `}</style>
    </section>
  )
}
