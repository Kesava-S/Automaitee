/**
 * AIMascotSection — Baymax-style cinematic storytelling
 * 4-phase emotional arc: overwhelmed → activation → autorun → peace
 * Light / white theme — integrates into the existing site design.
 */

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ─── Phase sequencer ───────────────────────────────────────────────────── */
const SEQ  = ['overwhelmed', 'activation', 'autorun', 'peace']
const DUR  = { overwhelmed: 6200, activation: 2800, autorun: 4800, peace: 5200 }
const CAPS = {
  overwhelmed: 'Managing everything manually…',
  activation:  'Automaitee is now active',
  autorun:     'Everything runs automatically',
  peace:       'Focus on what actually matters',
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

/* ─── Platforms ─────────────────────────────────────────────────────────── */
const PLATFORMS = [
  { name: 'WhatsApp',   color: '#25D366', bg: '#dcfce7', icon: '💬', badge: 14 },
  { name: 'Instagram',  color: '#E1306C', bg: '#fce7f3', icon: '📷', badge: 8  },
  { name: 'Gmail',      color: '#EA4335', bg: '#fee2e2', icon: '✉',  badge: 23 },
  { name: 'Slack',      color: '#4A154B', bg: '#f3e8ff', icon: '#',  badge: 11 },
  { name: 'Sheets',     color: '#34A853', bg: '#dcfce7', icon: '📊', badge: 3  },
  { name: 'HubSpot',    color: '#FF7A59', bg: '#ffedd5', icon: '⚡', badge: 7  },
  { name: 'Calendly',   color: '#006BFF', bg: '#dbeafe', icon: '📅', badge: 5  },
  { name: 'Notion',     color: '#374151', bg: '#f3f4f6', icon: '◻',  badge: 9  },
  { name: 'Shopify',    color: '#96BF48', bg: '#ecfccb', icon: '🛍', badge: 2  },
  { name: 'Stripe',     color: '#6772E5', bg: '#ede9fe', icon: '💳', badge: 6  },
  { name: 'Zoom',       color: '#2D8CFF', bg: '#dbeafe', icon: '🎥', badge: 1  },
  { name: 'Salesforce', color: '#00A1E0', bg: '#e0f2fe', icon: '☁',  badge: 4  },
]

/* Badge positions for chaos phase */
const CHAOS_POS = [
  { left:  '3%', top:  '7%', dy: 7  },
  { left: '28%', top:  '4%', dy: 5  },
  { left: '64%', top:  '5%', dy: 8  },
  { left: '86%', top: '13%', dy: 9  },
  { left: '88%', top: '45%', dy: 7  },
  { left: '81%', top: '70%', dy: 8  },
  { left:  '2%', top: '25%', dy: 6  },
  { left:  '3%', top: '55%', dy: 9  },
  { left:  '6%', top: '76%', dy: 7  },
  { left: '44%', top:  '3%', dy: 6  },
  { left: '36%', top: '80%', dy: 8  },
  { left: '62%', top: '78%', dy: 7  },
]

/* Badge positions for autorun phase (organized, elliptical ring) */
const AUTO_POS = [
  { left: '80%', top: '15%' },
  { left: '84%', top: '42%' },
  { left: '78%', top: '68%' },
  { left: '46%', top:  '4%' },
  { left: '10%', top: '13%' },
  { left:  '5%', top: '40%' },
  { left:  '9%', top: '67%' },
  { left: '46%', top: '78%' },
]

const EASE = [0.25, 0, 0, 1]

/* ─── Baymax character ──────────────────────────────────────────────────── */
function Baymax({ phase }) {
  const overwhelmed = phase === 'overwhelmed'
  const activation  = phase === 'activation'
  const peace       = phase === 'peace'

  /* Whole-character motion */
  const bodyAnimate = overwhelmed ? {
    x:      [0, -28, -26, 0, 28, 26, 0],
    y:      [0,  -6,   2, 0, -6,  2, 0],
    rotate: [0,  -8,  -8, 0,  8,  8, 0],
  } : activation ? {
    x: 0, y: 0, rotate: 0,
  } : {
    x: 0, y: [0, -9, 0], rotate: 0,
  }

  const bodyTransition = overwhelmed ? {
    duration: 2.15,
    times: [0, 0.17, 0.22, 0.5, 0.67, 0.72, 1],
    repeat: Infinity,
    ease: 'easeInOut',
  } : activation ? {
    duration: 0.75, ease: EASE,
  } : {
    duration: peace ? 3.8 : 3.2,
    repeat: Infinity,
    ease: [0.45, 0.05, 0.55, 0.95],
  }

  const eyeR = overwhelmed ? 6.5 : activation ? 7.2 : peace ? 5.2 : 5.5

  return (
    <motion.div
      animate={bodyAnimate}
      transition={bodyTransition}
      style={{
        position: 'absolute',
        left: '50%',
        top: peace ? '54%' : '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <svg
        viewBox="0 0 180 255"
        width="168"
        height="238"
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          <radialGradient id="bm-body" cx="38%" cy="30%" r="68%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CDD5E0" />
          </radialGradient>
          <radialGradient id="bm-head" cx="38%" cy="28%" r="68%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CDD5E0" />
          </radialGradient>
          <radialGradient id="bm-limb" cx="35%" cy="28%" r="65%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#EEF1F7" />
            <stop offset="100%" stopColor="#C0C9D6" />
          </radialGradient>
          <filter id="bm-drop" x="-25%" y="-10%" width="150%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(0,0,0,0.11)" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx={90} cy={252} rx={58} ry={7} fill="rgba(0,0,0,0.07)" />

        {/* ── LEGS (rendered behind body) ─────────────────────── */}
        <ellipse cx={67}  cy={240} rx={21} ry={23} fill="url(#bm-limb)" stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
        <ellipse cx={113} cy={240} rx={21} ry={23} fill="url(#bm-limb)" stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
        {/* leg-torso joint seam */}
        <ellipse cx={67}  cy={221} rx={20} ry={7} fill="rgba(190,200,218,0.55)" />
        <ellipse cx={113} cy={221} rx={20} ry={7} fill="rgba(190,200,218,0.55)" />

        {/* ── ARMS (rendered behind body) ─────────────────────── */}
        {/* Left arm */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}
          animate={{ rotate: overwhelmed ? [-22, 18, -14, 22, -22] : peace ? [8, 8] : 0 }}
          transition={overwhelmed
            ? { duration: 1.05, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.65, ease: EASE }
          }
        >
          <ellipse cx={13} cy={136} rx={13} ry={30} fill="url(#bm-limb)" stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
          <circle  cx={12} cy={167} r={13}           fill="url(#bm-limb)" stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
        </motion.g>

        {/* Right arm */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}
          animate={{ rotate: overwhelmed ? [22, -18, 14, -22, 22] : peace ? [-8, -8] : 0 }}
          transition={overwhelmed
            ? { duration: 1.05, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }
            : { duration: 0.65, ease: EASE }
          }
        >
          <ellipse cx={167} cy={136} rx={13} ry={30} fill="url(#bm-limb)" stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
          <circle  cx={168} cy={167} r={13}           fill="url(#bm-limb)" stroke="rgba(0,0,0,0.06)" strokeWidth={1} />
        </motion.g>

        {/* ── BODY ─────────────────────────────────────────────── */}
        <ellipse cx={90} cy={154} rx={76} ry={88}
          fill="url(#bm-body)" stroke="rgba(0,0,0,0.07)" strokeWidth={1.5}
          filter="url(#bm-drop)"
        />
        {/* Specular highlight */}
        <ellipse cx={72} cy={113} rx={21} ry={17} fill="rgba(255,255,255,0.55)" />
        {/* Hip seam */}
        <path d="M 26 184 Q 90 194 154 184" stroke="rgba(185,195,215,0.65)" strokeWidth={1.5} fill="none" />
        {/* Chest badge (power button) */}
        <circle cx={112} cy={128} r={9.5}
          fill="rgba(225,232,245,0.7)" stroke="rgba(0,0,0,0.09)" strokeWidth={1}
        />
        <path d="M 112 121 L 112 125.5"
          stroke="rgba(0,0,0,0.18)" strokeWidth={1.5} fill="none" strokeLinecap="round"
        />
        <path d="M 107.5 123 Q 107 130 112 130 Q 117 130 116.5 123"
          stroke="rgba(0,0,0,0.15)" strokeWidth={1.2} fill="none" strokeLinecap="round"
        />

        {/* ── HEAD ─────────────────────────────────────────────── */}
        <motion.g
          animate={{ rotate: overwhelmed ? [-5, 5, -4, 5, -5] : 0 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
          transition={overwhelmed
            ? { duration: 2.15, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.65, ease: EASE }
          }
        >
          <ellipse cx={90} cy={42} rx={36} ry={27}
            fill="url(#bm-head)" stroke="rgba(0,0,0,0.07)" strokeWidth={1.5}
          />
          {/* Head highlight */}
          <ellipse cx={76} cy={31} rx={11} ry={8} fill="rgba(255,255,255,0.6)" />

          {/* Eye connecting line */}
          <line x1={72} y1={42} x2={108} y2={42}
            stroke="#1a1a1a" strokeWidth={1.6}
          />
          {/* Eyes */}
          <circle cx={72}  cy={42} r={eyeR} fill="#1a1a1a" />
          <circle cx={108} cy={42} r={eyeR} fill="#1a1a1a" />

          {/* Overwhelmed worry brows */}
          {overwhelmed && (
            <>
              <path d="M 63 34 L 77 31" stroke="#1a1a1a" strokeWidth={1.4} fill="none" strokeLinecap="round" />
              <path d="M 103 31 L 117 34" stroke="#1a1a1a" strokeWidth={1.4} fill="none" strokeLinecap="round" />
            </>
          )}

          {/* Peace smile */}
          {peace && (
            <motion.path
              d="M 76 49 Q 90 59 104 49"
              stroke="#1a1a1a" strokeWidth={1.6} fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            />
          )}
        </motion.g>

        {/* Sweat drop — overwhelmed only */}
        {overwhelmed && (
          <motion.g
            animate={{ y: [0, 12, 22], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.7, ease: 'easeIn' }}
          >
            <path d="M 124 24 Q 129 16 124 9 Q 119 16 124 24 Z"
              fill="#93C5FD" opacity={0.85}
            />
          </motion.g>
        )}
      </svg>
    </motion.div>
  )
}

/* ─── Phase 1: OVERWHELMED ─────────────────────────────────────────────── */
function OverwhelmedPhase() {
  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Scatter badges with erratic float + unread counts */}
      {CHAOS_POS.map((pos, i) => {
        const p = PLATFORMS[i % PLATFORMS.length]
        return (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={{
              opacity: [0, 1, 1, 0.85, 1],
              scale:   [0.6, 1, 1, 1, 1],
              y:       [0, pos.dy, 0, -pos.dy * 0.6, 0],
            }}
            transition={{
              duration:  2.0 + (i % 4) * 0.28,
              delay:     (i * 0.18) % 1.1,
              repeat:    Infinity,
              ease:      'easeInOut',
            }}
            style={{
              position: 'absolute', left: pos.left, top: pos.top, zIndex: 15,
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'white',
              border: `1px solid ${p.color}28`,
              borderLeft: `3px solid ${p.color}`,
              borderRadius: '9px',
              padding: '5px 8px',
              boxShadow: `0 2px 12px ${p.color}20`,
              minWidth: '76px',
            }}
          >
            <span style={{ fontSize: '13px' }}>{p.icon}</span>
            <div>
              <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#1d1d1f', lineHeight: 1.2 }}>{p.name}</div>
              <div style={{ fontSize: '7.5px', color: p.color, fontWeight: 600, marginTop: '1px' }}>
                {p.badge} pending
              </div>
            </div>
            {/* Pulsing notification dot */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.9 + (i % 3) * 0.2, repeat: Infinity }}
              style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#ef4444', marginLeft: 'auto', flexShrink: 0,
              }}
            />
          </motion.div>
        )
      })}

      {/* "Overwhelmed" status chip near character */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        style={{
          position: 'absolute', left: '50%', top: '68%',
          transform: 'translateX(-50%)', zIndex: 25,
          background: 'rgba(254,242,242,0.92)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '20px', padding: '5px 14px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
          style={{ fontSize: '10px', color: '#dc2626', fontWeight: 600, whiteSpace: 'nowrap' }}
        >
          ● 67 tasks unhandled
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Phase 2: ACTIVATION ──────────────────────────────────────────────── */
function ActivationPhase() {
  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Expanding glow ring from character center */}
      {[0, 0.5, 1.0].map(delay => (
        <motion.div key={delay}
          animate={{ scale: [0.5, 2.2], opacity: [0.55, 0] }}
          transition={{ duration: 1.8, delay, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '180px', height: '180px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,113,227,0.3) 0%, transparent 70%)',
            zIndex: 8,
          }}
        />
      ))}

      {/* "Automaitee activated" floating label */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, delay: 0.5, ease: EASE }}
        style={{
          position: 'absolute', left: '50%', top: '22%',
          transform: 'translateX(-50%)', zIndex: 25,
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid rgba(0,113,227,0.25)',
          borderRadius: '22px', padding: '8px 20px',
          boxShadow: '0 4px 24px rgba(0,113,227,0.18)',
          backdropFilter: 'blur(10px)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '11px', color: '#0071e3', fontWeight: 700, letterSpacing: '0.04em' }}>
          ✦ Automaitee Activated
        </span>
      </motion.div>

      {/* Chaos badges dissolving outward */}
      {CHAOS_POS.slice(0, 8).map((pos, i) => {
        const p = PLATFORMS[i % PLATFORMS.length]
        return (
          <motion.div key={i}
            initial={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 0.5, x: (i % 2 === 0 ? 1 : -1) * 30, y: -20 }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: [0.4, 0, 1, 1] }}
            style={{
              position: 'absolute', left: pos.left, top: pos.top, zIndex: 14,
              background: 'white', border: `1px solid ${p.color}28`,
              borderLeft: `3px solid ${p.color}`,
              borderRadius: '9px', padding: '5px 8px',
              fontSize: '12px',
            }}
          >
            {p.icon}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

/* ─── Phase 3: AUTO-RUN ────────────────────────────────────────────────── */
// Tasks completed silently by one system — no individual tool branding
const AUTORUN_TASKS = [
  { task: 'Customer inquiry',   done: 'Replied in 45 seconds',   left: '60%', top:  '8%', delay: 0.0  },
  { task: 'Missed call',        done: 'Follow-up sent',           left:  '5%', top: '13%', delay: 0.7  },
  { task: 'New lead captured',  done: 'Added to pipeline',        left: '68%', top: '46%', delay: 1.4  },
  { task: 'Loyalty offer due',  done: 'Campaign triggered',       left:  '3%', top: '50%', delay: 2.1  },
  { task: 'Appointment missed', done: 'Rescheduled automatically',left: '54%', top: '68%', delay: 2.8  },
  { task: 'Weekly report',      done: 'Generated & delivered',    left:  '5%', top: '72%', delay: 3.5  },
]

function AutorunPhase() {
  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient pulse — one unified system heartbeat */}
      {[0, 1.1, 2.2].map(delay => (
        <motion.div key={delay}
          animate={{ scale: [1, 1.6, 1], opacity: [0.12, 0, 0.12] }}
          transition={{ duration: 3.3, delay, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%,-50%)',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,113,227,0.22) 0%, transparent 70%)',
            zIndex: 7,
          }}
        />
      ))}

      {/* Floating task-completion chips — no tool logos, just outcomes */}
      {AUTORUN_TASKS.map((t, i) => (
        <motion.div key={i}
          animate={{ opacity: [0, 1, 1, 0], y: [8, 0, -5, -14], scale: [0.88, 1, 1, 0.93] }}
          transition={{ duration: 3.4, delay: t.delay, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: t.left, top: t.top, zIndex: 15,
            background: 'white', borderRadius: '10px',
            border: '1px solid rgba(0,113,227,0.13)',
            borderLeft: '3px solid #0071e3',
            padding: '6px 10px',
            boxShadow: '0 2px 12px rgba(0,113,227,0.1)',
            minWidth: '116px',
          }}
        >
          <div style={{ fontSize: '7.5px', color: '#6e6e73', fontWeight: 500, marginBottom: '2px' }}>{t.task}</div>
          <div style={{ fontSize: '8.5px', color: '#34c759', fontWeight: 700 }}>✓ {t.done}</div>
        </motion.div>
      ))}

      {/* "24/7" status chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{
          position: 'absolute', left: '50%', top: '68%',
          transform: 'translateX(-50%)', zIndex: 25,
          background: 'rgba(240,253,244,0.92)',
          border: '1px solid rgba(52,199,89,0.3)',
          borderRadius: '20px', padding: '5px 14px',
          backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: 600 }}>
          ✓ One system · zero missed tasks
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Phase 4: PEACE ───────────────────────────────────────────────────── */
function PeacePhase() {
  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Gentle ambient glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.32, 0.15] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '270px', height: '270px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.13) 0%, transparent 70%)',
          zIndex: 7,
        }}
      />

      {/* Outcome stats — pure results, zero tool branding */}
      {[
        { val: '10+ hrs', label: 'freed every week',   left:  '5%', top:  '8%', color: '#0071e3', delay: 0.3 },
        { val: '+35%',    label: 'more conversions',   left: '66%', top:  '8%', color: '#34c759', delay: 0.55 },
        { val: '0',       label: 'missed leads',       left:  '5%', top: '55%', color: '#af52de', delay: 0.8 },
      ].map(s => (
        <motion.div key={s.label}
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.52, delay: s.delay, ease: EASE }}
          style={{
            position: 'absolute', left: s.left, top: s.top, zIndex: 15,
            background: 'white', borderRadius: '13px',
            border: '1px solid rgba(0,0,0,0.055)',
            boxShadow: `0 4px 20px ${s.color}18`,
            padding: '10px 13px', minWidth: '100px',
          }}
        >
          <div style={{ fontSize: '22px', fontWeight: 800, color: s.color, lineHeight: 1, letterSpacing: '-0.5px' }}>{s.val}</div>
          <div style={{ fontSize: '9px', color: '#6e6e73', marginTop: '3px', fontWeight: 500 }}>{s.label}</div>
        </motion.div>
      ))}

      {/* "Your focus today" card — what the human does now without the tool chaos */}
      <motion.div
        initial={{ opacity: 0, x: 16, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, delay: 1.1, ease: EASE }}
        style={{
          position: 'absolute', right: '4%', top: '42%', zIndex: 15,
          background: 'white', borderRadius: '13px',
          border: '1px solid rgba(0,113,227,0.12)',
          boxShadow: '0 4px 20px rgba(0,113,227,0.1)',
          padding: '10px 12px', minWidth: '118px',
        }}
      >
        <div style={{ fontSize: '8px', color: '#0071e3', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '7px' }}>
          Your focus today
        </div>
        {['Business strategy', 'Client relationships', 'Team growth'].map((item, i) => (
          <motion.div key={item}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 1.4 + i * 0.18, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: i < 2 ? '5px' : 0 }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0071e3', flexShrink: 0 }} />
            <span style={{ fontSize: '8.5px', color: '#1d1d1f', fontWeight: 500 }}>{item}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Status chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, delay: 1.3 }}
        style={{
          position: 'absolute', left: '50%', top: '72%',
          transform: 'translateX(-50%)', zIndex: 25,
          background: 'rgba(240,249,255,0.92)',
          border: '1px solid rgba(0,113,227,0.22)',
          borderRadius: '20px', padding: '5px 14px',
          backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '10px', color: '#0071e3', fontWeight: 600 }}>
          ✦ You handle growth. We handle the rest.
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main section ──────────────────────────────────────────────────────── */
export default function AIMascotSection() {
  const sectionRef = useRef()
  const [active, setActive] = useState(false)
  const phase = usePhase(active)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="services-section" style={{ paddingTop: '6rem' }}>
      <div className="container">
        <div className="mascot-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* ── LEFT: cinematic animation panel ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div
              className="mascot-panel"
              style={{
                position: 'relative',
                height: '520px',
                borderRadius: '24px',
                background: 'linear-gradient(148deg, rgba(237,244,255,0.5) 0%, rgba(252,253,255,0.9) 100%)',
                border: '1px solid rgba(0,113,227,0.09)',
                boxShadow: '0 10px 52px rgba(0,113,227,0.07), 0 2px 14px rgba(0,0,0,0.04)',
                overflow: 'hidden',
              }}
            >
              {/* Subtle grid background */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 0, borderRadius: '24px',
                backgroundImage: 'linear-gradient(rgba(0,113,227,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.035) 1px, transparent 1px)',
                backgroundSize: '46px 46px',
              }} />

              {/* Glass floor surface */}
              <div style={{
                position: 'absolute', left: '6%', right: '6%', bottom: '-3%', height: '38%',
                background: 'linear-gradient(to bottom, rgba(230,240,255,0.6) 0%, rgba(218,232,255,0.35) 100%)',
                backgroundImage: 'linear-gradient(rgba(0,113,227,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.065) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                borderRadius: '18px 18px 0 0',
                border: '1px solid rgba(0,113,227,0.12)', borderBottom: 'none',
                transform: 'perspective(540px) rotateX(27deg)',
                transformOrigin: 'center bottom',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.88)',
                zIndex: 1,
              }} />
              {/* Floor edge glow */}
              <div style={{
                position: 'absolute', left: '10%', right: '10%', bottom: 0, height: '16px',
                background: 'radial-gradient(ellipse, rgba(0,113,227,0.16) 0%, transparent 70%)',
                filter: 'blur(4px)', zIndex: 2,
              }} />

              {/* Phase layers */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                <AnimatePresence mode="sync">
                  {phase === 'overwhelmed' && <OverwhelmedPhase key="overwhelmed" />}
                  {phase === 'activation'  && <ActivationPhase  key="activation"  />}
                  {phase === 'autorun'     && <AutorunPhase     key="autorun"     />}
                  {phase === 'peace'       && <PeacePhase       key="peace"       />}
                </AnimatePresence>
              </div>

              {/* Baymax character — always visible above phase layers */}
              <Baymax phase={phase} />

              {/* Caption bar */}
              <div style={{
                position: 'absolute', bottom: '14px', left: '12px', right: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                zIndex: 30,
              }}>
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(0,113,227,0.12)',
                    borderRadius: '20px', padding: '5px 13px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <motion.div
                    animate={{
                      background: phase === 'peace' ? '#34c759' : phase === 'activation' ? '#0071e3' : phase === 'overwhelmed' ? '#ef4444' : '#34c759',
                      opacity: [1, 0.3, 1],
                    }}
                    transition={{ opacity: { duration: 1.4, repeat: Infinity }, background: { duration: 0.4 } }}
                    style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: '10px', color: '#1d1d1f', fontWeight: 500 }}>
                    {CAPS[phase]}
                  </span>
                </motion.div>

                {/* Phase dots */}
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

          {/* ── RIGHT: text ─────────────────────────────────────── */}
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

            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>What we automate</h2>

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
          .mascot-panel { height: 360px !important; }
        }
      `}</style>
    </section>
  )
}
