import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ─── Viewport & mascot geometry ─────────────────────────────────────────── */
const VW = 400, VH = 480
const MX = 200, MY = 192          // mascot centre
const OX = MX,  OY = MY + 48     // connection-line origin (mascot base)

/* ─── Workflow nodes ─────────────────────────────────────────────────────── */
const NODES = [
  { id: 'crm',      label: 'CRM',      x:  66, y: 338, d: 0.00 },
  { id: 'email',    label: 'Email',    x: 200, y: 356, d: 0.18 },
  { id: 'calendar', label: 'Calendar', x: 334, y: 338, d: 0.36 },
  { id: 'whatsapp', label: 'WhatsApp', x: 116, y: 438, d: 0.54 },
  { id: 'database', label: 'Database', x: 284, y: 438, d: 0.72 },
]

/* ─── Bezier helpers ──────────────────────────────────────────────────────── */
function bq(a, b, c, t) { return (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c }
function ctrl(nx, ny)    { return { cx: OX + (nx - OX) * 0.4, cy: OY + (ny - OY) * 0.35 } }
function svgPath(nx, ny) { const { cx, cy } = ctrl(nx, ny); return `M ${OX} ${OY} Q ${cx} ${cy} ${nx} ${ny}` }
function bqPts(nx, ny) {
  const { cx, cy } = ctrl(nx, ny)
  const T = [0, 0.25, 0.5, 0.75, 1]
  return { xs: T.map(t => bq(OX, cx, nx, t)), ys: T.map(t => bq(OY, cy, ny, t)) }
}

/* ─── Phase sequencer ────────────────────────────────────────────────────── */
const SEQ = ['idle', 'incoming', 'processing', 'routing', 'organizing', 'notifying', 'completing']
const DUR = { idle: 2400, incoming: 2600, processing: 2800, routing: 3600, organizing: 2800, notifying: 2500, completing: 2600 }

function usePhase(active) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setI(p => (p + 1) % SEQ.length), DUR[SEQ[i]])
    return () => clearTimeout(t)
  }, [i, active])
  return SEQ[i]
}

/* ─── Ambient background particles ───────────────────────────────────────── */
const PTCL = [
  { x:  42, y:  68, r: 1.2, dur: 5.5, dx:  6, dy:  4 },
  { x: 340, y:  45, r: 1.0, dur: 7.0, dx: -4, dy:  6 },
  { x:  80, y: 420, r: 1.5, dur: 6.5, dx:  5, dy: -4 },
  { x: 355, y: 400, r: 1.1, dur: 8.0, dx: -6, dy: -3 },
  { x: 155, y:  35, r: 0.9, dur: 6.0, dx:  3, dy:  7 },
  { x: 270, y:  55, r: 1.3, dur: 7.5, dx: -5, dy:  5 },
  { x:  30, y: 230, r: 1.0, dur: 5.0, dx:  7, dy: -5 },
  { x: 370, y: 220, r: 1.2, dur: 6.2, dx: -6, dy:  4 },
]

/* ─── Mascot character (SVG) ─────────────────────────────────────────────── */
function Mascot({ phase, eyeDX, eyeDY }) {
  const isScan   = phase === 'processing'
  const isWide   = phase === 'incoming' || phase === 'notifying'
  const isBright = phase === 'completing'
  const ec       = isBright ? '#60b8ff' : '#0071e3'
  const eyeRY    = isWide ? 10.5 : 7.5

  const irisAnim  = isScan ? { ry: [7.5, 1.5, 7.5] }  : { ry: eyeRY }
  const irisTrans = isScan
    ? { duration: 0.75, repeat: Infinity, ease: 'easeInOut' }
    : { duration: 0.42, ease: 'easeOut' }

  const floatAnim = { y: [0, -8, 0] }
  const floatTransition = { duration: 3.4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }

  return (
    <motion.g animate={floatAnim} transition={floatTransition}>

      {/* Scan / completion ring */}
      <AnimatePresence>
        {(isScan || isBright) && (
          <motion.circle key="ring1" cx={MX} cy={MY} r={60}
            fill="none" stroke="rgba(0,113,227,0.22)" strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 0.65, 0], scale: [0.9, 1.1, 0.9] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        {isBright && (
          <motion.circle key="ring2" cx={MX} cy={MY} r={82}
            fill="none" stroke="rgba(0,113,227,0.1)" strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0], scale: [0.94, 1.07, 0.94] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Body */}
      <rect x={MX - 40} y={MY - 62} width={80} height={106} rx={19}
        fill="#0b0b1c" stroke="rgba(0,113,227,0.38)" strokeWidth={1.5}
      />
      {/* Visor */}
      <rect x={MX - 32} y={MY - 52} width={64} height={52} rx={11}
        fill="rgba(0,113,227,0.065)" stroke="rgba(0,113,227,0.18)" strokeWidth={0.8}
      />

      {/* LEFT EYE */}
      <ellipse cx={MX - 14} cy={MY - 24} rx={9.5} ry={12} fill="rgba(0,70,180,0.25)" />
      <motion.ellipse cx={MX - 14} cy={MY - 24} rx={6.5}
        animate={irisAnim} transition={irisTrans}
        style={{ fill: ec, filter: `drop-shadow(0 0 6px ${ec})` }}
      />
      <motion.g animate={{ x: eyeDX, y: eyeDY }} transition={{ type: 'spring', stiffness: 90, damping: 18 }}>
        <ellipse cx={MX - 14} cy={MY - 24} rx={2.4} ry={2.9} fill="rgba(255,255,255,0.92)" />
      </motion.g>

      {/* RIGHT EYE */}
      <ellipse cx={MX + 14} cy={MY - 24} rx={9.5} ry={12} fill="rgba(0,70,180,0.25)" />
      <motion.ellipse cx={MX + 14} cy={MY - 24} rx={6.5}
        animate={irisAnim} transition={irisTrans}
        style={{ fill: ec, filter: `drop-shadow(0 0 6px ${ec})` }}
      />
      <motion.g animate={{ x: eyeDX, y: eyeDY }} transition={{ type: 'spring', stiffness: 90, damping: 18 }}>
        <ellipse cx={MX + 14} cy={MY - 24} rx={2.4} ry={2.9} fill="rgba(255,255,255,0.92)" />
      </motion.g>

      {/* Mouth grill */}
      {[0, 6, 12].map((o, i) => (
        <line key={i}
          x1={MX - 23} y1={MY + 14 + o} x2={MX + 23} y2={MY + 14 + o}
          stroke="rgba(0,113,227,0.22)" strokeWidth={1.5} strokeLinecap="round"
        />
      ))}

      {/* Antenna */}
      <line x1={MX} y1={MY - 62} x2={MX} y2={MY - 84}
        stroke="rgba(0,113,227,0.45)" strokeWidth={1.5}
      />
      <motion.circle cx={MX} cy={MY - 87} r={4.5} fill="#0071e3"
        animate={{ opacity: [1, 0.22, 1], r: [4.5, 5.5, 4.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 8px #0071e3)' }}
      />

      {/* Side fins */}
      <rect x={MX - 56} y={MY - 36} width={16} height={30} rx={5}
        fill="rgba(0,113,227,0.09)" stroke="rgba(0,113,227,0.25)" strokeWidth={1}
      />
      <rect x={MX + 40} y={MY - 36} width={16} height={30} rx={5}
        fill="rgba(0,113,227,0.09)" stroke="rgba(0,113,227,0.25)" strokeWidth={1}
      />
    </motion.g>
  )
}

/* ─── Workflow connection + data pulse ───────────────────────────────────── */
function Conn({ node, show, pulse }) {
  const p = svgPath(node.x, node.y)
  const { xs, ys } = bqPts(node.x, node.y)
  return (
    <AnimatePresence>
      {show && (
        <motion.g key={node.id + '-c'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ delay: node.d, duration: 0.3 }}
        >
          <motion.path d={p} fill="none"
            stroke="rgba(0,113,227,0.28)" strokeWidth={1.2}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.85, delay: node.d, ease: 'easeOut' }}
          />
          {pulse && (
            <motion.g
              animate={{ x: xs, y: ys, opacity: [0, 1, 1, 1, 0] }}
              transition={{
                duration: 1.7, repeat: Infinity,
                repeatDelay: node.d * 0.4 + 0.2,
                ease: 'easeInOut', delay: node.d * 0.5,
              }}
            >
              <circle cx={0} cy={0} r={3.5} fill="#0071e3"
                style={{ filter: 'drop-shadow(0 0 5px rgba(0,113,227,0.9))' }}
              />
            </motion.g>
          )}
        </motion.g>
      )}
    </AnimatePresence>
  )
}

/* ─── Workflow node pill ──────────────────────────────────────────────────── */
function NodePill({ node, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.g key={node.id}
          initial={{ opacity: 0, y: 9, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.5, delay: node.d, ease: [0.25, 0, 0, 1] }}
        >
          <rect x={node.x - 36} y={node.y - 14} width={72} height={27} rx={8}
            fill="rgba(0,113,227,0.1)" stroke="rgba(0,113,227,0.38)" strokeWidth={1}
          />
          <text x={node.x} y={node.y + 4.5} textAnchor="middle"
            fill="rgba(190,215,255,0.88)" fontSize={10.5}
            fontFamily="ui-sans-serif,system-ui,sans-serif" fontWeight="500"
          >{node.label}</text>
        </motion.g>
      )}
    </AnimatePresence>
  )
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export default function AIMascotSection() {
  const sectionRef = useRef()
  const svgRef     = useRef()
  const [active, setActive] = useState(false)
  const [eyeDX, setEyeDX]   = useState(0)
  const [eyeDY, setEyeDY]   = useState(0)
  const phase = usePhase(active)

  /* Scroll-triggered start */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Cursor & touch tracking → subtle eye movement */
  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const track = (clientX, clientY) => {
      const r  = el.getBoundingClientRect()
      const sx = (clientX - r.left) / r.width  * VW
      const sy = (clientY - r.top)  / r.height * VH
      setEyeDX(Math.max(-3,   Math.min(3,   (sx - MX) / 200 * 3  )))
      setEyeDY(Math.max(-2.5, Math.min(2.5, (sy - MY) / 240 * 2.5)))
    }
    const onMove  = e => track(e.clientX, e.clientY)
    const onTouch = e => { if (e.touches[0]) track(e.touches[0].clientX, e.touches[0].clientY) }
    const onLeave = () => { setEyeDX(0); setEyeDY(0) }
    el.addEventListener('mousemove',  onMove)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('touchmove',  onTouch, { passive: true })
    return () => {
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('touchmove',  onTouch)
    }
  }, [])

  /* Derived visibility */
  const showMsg    = phase === 'incoming'  || phase === 'processing'
  const showHolo   = phase === 'processing'
  const showNodes  = ['routing','organizing','notifying','completing'].includes(phase)
  const showPulse  = ['organizing','notifying','completing'].includes(phase)
  const showHuman  = phase === 'notifying' || phase === 'completing'

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#08080f',
        padding: '6rem 0',
        borderTop:    '1px solid rgba(0,113,227,0.1)',
        borderBottom: '1px solid rgba(0,113,227,0.1)',
      }}
    >
      <div className="container">
        <div className="mascot-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* ── LEFT: animation canvas ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.25, 0, 0, 1] }}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(0,113,227,0.15)',
              borderRadius: '24px',
              overflow: 'hidden',
              aspectRatio: '5 / 6',
              maxHeight: '520px',
            }}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VW} ${VH}`}
              style={{ width: '100%', height: '100%', display: 'block' }}
            >
              {/* Radial ambient glow */}
              <defs>
                <radialGradient id="ambientGlow" cx="50%" cy="40%" r="60%">
                  <stop offset="0%"   stopColor="rgba(0,113,227,0.07)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>
              <rect width={VW} height={VH} fill="url(#ambientGlow)" />

              {/* Background particles */}
              {PTCL.map((p, i) => (
                <motion.circle key={i} cx={p.x} cy={p.y} r={p.r}
                  fill="rgba(0,113,227,0.35)"
                  animate={{ x: [0, p.dx, 0], y: [0, p.dy, 0], opacity: [0.3, 0.55, 0.3] }}
                  transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                />
              ))}

              {/* Floating shadow */}
              <motion.ellipse cx={MX} cy={MY + 62} rx={42} ry={7}
                fill="rgba(0,113,227,0.12)"
                animate={{ scaleX: [1, 1.2, 1], opacity: [0.35, 0.15, 0.35] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
              />

              {/* Connections behind nodes */}
              {NODES.map(n => <Conn key={n.id} node={n} show={showNodes} pulse={showPulse} />)}

              {/* Workflow node pills */}
              {NODES.map(n => <NodePill key={n.id} node={n} show={showNodes} />)}

              {/* Mascot character */}
              <Mascot phase={phase} eyeDX={eyeDX} eyeDY={eyeDY} />

              {/* ── Message bubble (incoming / processing) ───────────── */}
              <AnimatePresence>
                {showMsg && (
                  <motion.g key="msg"
                    initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.55, ease: [0.25, 0, 0, 1] }}
                  >
                    <rect x={143} y={16} width={114} height={44} rx={12}
                      fill="rgba(0,113,227,0.12)" stroke="rgba(0,113,227,0.42)" strokeWidth={1}
                    />
                    {/* Bubble tail */}
                    <polygon points="194,60 200,72 206,60"
                      fill="rgba(0,113,227,0.12)" stroke="rgba(0,113,227,0.42)" strokeWidth={1}
                    />
                    <text x={200} y={34} textAnchor="middle"
                      fill="rgba(190,215,255,0.6)" fontSize={9}
                      fontFamily="ui-sans-serif,system-ui,sans-serif"
                    >New customer inquiry</text>
                    <text x={200} y={50} textAnchor="middle"
                      fill="rgba(0,113,227,0.9)" fontSize={10} fontWeight="600"
                      fontFamily="ui-sans-serif,system-ui,sans-serif"
                    >✉  received</text>
                    {/* Pulse indicator */}
                    <motion.circle cx={250} cy={22} r={4} fill="#0071e3"
                      animate={{ opacity: [1, 0.15, 1], r: [4, 5.5, 4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      style={{ filter: 'drop-shadow(0 0 5px #0071e3)' }}
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* ── Holographic data readout (processing) ────────────── */}
              <AnimatePresence>
                {showHolo && (
                  <motion.g key="holo"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <text x={MX + 66} y={MY - 46} fill="rgba(0,113,227,0.5)" fontSize={8}
                      fontFamily="ui-monospace,Menlo,monospace"
                    >scanning</text>
                    {[{ w: 48, dy: 0 }, { w: 32, dy: 14 }, { w: 44, dy: 28 }].map((bar, i) => (
                      <g key={i}>
                        <rect x={MX + 66} y={MY - 38 + bar.dy} width={bar.w} height={8} rx={3}
                          fill="rgba(0,113,227,0.1)" stroke="rgba(0,113,227,0.28)" strokeWidth={0.8}
                        />
                        <motion.rect x={MX + 66} y={MY - 38 + bar.dy} height={8} rx={3}
                          fill="rgba(0,113,227,0.45)"
                          initial={{ width: 0 }} animate={{ width: bar.w }}
                          transition={{ duration: 0.65, delay: i * 0.2, ease: 'easeOut' }}
                        />
                      </g>
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>

              {/* ── Human notification (notifying / completing) ───────── */}
              <AnimatePresence>
                {showHuman && (
                  <motion.g key="human"
                    initial={{ opacity: 0, scale: 0.78 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
                  >
                    {/* Avatar ring */}
                    <circle cx={342} cy={44} r={14}
                      fill="rgba(0,113,227,0.1)" stroke="rgba(0,113,227,0.38)" strokeWidth={1}
                    />
                    {/* Head */}
                    <circle cx={342} cy={40} r={6} fill="rgba(100,165,255,0.55)" />
                    {/* Shoulders */}
                    <path d="M 326 63 Q 342 55 358 63" fill="none" stroke="rgba(100,165,255,0.5)" strokeWidth={1.5} />
                    {/* Check badge */}
                    <circle cx={353} cy={33} r={7} fill="#0071e3"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(0,113,227,0.7))' }}
                    />
                    <text x={353} y={37} textAnchor="middle" fill="white" fontSize={9} fontWeight="700">✓</text>
                    {/* Label */}
                    <text x={342} y={78} textAnchor="middle"
                      fill="rgba(190,215,255,0.7)" fontSize={8.5}
                      fontFamily="ui-sans-serif,system-ui,sans-serif"
                    >Team notified</text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* ── Phase progress dots ───────────────────────────────── */}
              <g>
                {SEQ.map((s, i) => (
                  <motion.circle key={s}
                    cx={200 + (i - 3) * 18} cy={468} r={3}
                    animate={{
                      fill:  phase === s ? '#0071e3' : 'rgba(0,113,227,0.2)',
                      r:     phase === s ? 4.5 : 3,
                    }}
                    transition={{ duration: 0.35 }}
                  />
                ))}
              </g>
            </svg>
          </motion.div>

          {/* ── RIGHT: text content ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.25, 0, 0, 1], delay: 0.15 }}
            style={{ color: 'white' }}
          >
            <p style={{
              fontSize: '0.78rem', letterSpacing: '0.12em', fontWeight: 600,
              color: 'rgba(0,160,255,0.85)', marginBottom: '1rem', textTransform: 'uppercase',
            }}>
              Intelligent Automation
            </p>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 3vw, 2.7rem)', fontWeight: 700, lineHeight: 1.2,
              marginBottom: '1.5rem',
              background: 'linear-gradient(155deg, #ffffff 30%, rgba(255,255,255,0.5))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              What we automate
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.78, marginBottom: '1.25rem' }}>
              We build intelligent AI agents that work alongside your team — automating routine tasks and helping your business operate faster, smarter, and more efficiently.
            </p>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.78, marginBottom: '2.5rem' }}>
              To explore how automation can transform your workflows, visit our Services page to discover the solutions we offer. Our automation engineers will review your needs and get back to you with tailored recommendations.
            </p>
            <Link href="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: '#0071e3', color: 'white',
                padding: '14px 28px', borderRadius: '12px',
                textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0058b0' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0071e3' }}
            >
              View Services <span style={{ fontSize: '1.1rem' }}>→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mascot-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .mascot-grid > div:first-child {
            max-height: 320px !important;
          }
        }
      `}</style>
    </section>
  )
}
