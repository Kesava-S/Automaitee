import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SECRET = 'ai_automaitee'

const SERVICE_NAMES = {
  'book-consultation': 'Full Funnel Automation',
  'book-silentchurn': 'Micro Services – SilentChurn',
  'book-starter': 'Full Funnel – Starter Package',
  'book-pro': 'Full Funnel – Pro Package',
  'starter': 'Full Funnel – Starter Package',
  'pro': 'Full Funnel – Pro Package',
}

function getPriceDetails(service, customPrice) {
  if (customPrice) {
    const formatted = customPrice.startsWith('£') ? customPrice : `£${customPrice}`;
    return {
      priceDisplay: formatted,
      recurringDisplay: `${formatted}.00/month`
    };
  }

  if (service === 'book-starter' || service === 'starter') {
    return {
      priceDisplay: '£600',
      recurringDisplay: '£600.00/month'
    };
  }

  if (service === 'book-pro' || service === 'pro') {
    return {
      priceDisplay: '£1,200',
      recurringDisplay: '£1,200.00/month'
    };
  }

  return {
    priceDisplay: '£49',
    recurringDisplay: '£49.00/month'
  };
}

function verifyToken(token) {
  if (!token) return { state: 'invalid' }
  const parts = token.split('.')
  if (parts.length !== 2) return { state: 'invalid' }

  const [data, sig] = parts
  const str = SECRET + data
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  const expectedSig = Math.abs(hash).toString(36)
  if (sig !== expectedSig) return { state: 'invalid' }

  try {
    const payload = JSON.parse(atob(data))
    
    if (payload.exp <= Date.now()) return { state: 'expired', payload }
    return { state: 'valid', payload }
  } catch {
    return { state: 'invalid' }
  }
}

function loadRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function PayPage() {
  const router = useRouter()
  const [tokenState, setTokenState] = useState('loading') // loading | valid | invalid | expired
  const [payload, setPayload] = useState(null)
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(null) // seconds remaining before redirect

  useEffect(() => {
    if (!router.isReady) return
    const token = router.query.token
    const result = verifyToken(token)
    setTokenState(result.state)
    if (result.payload) setPayload(result.payload)
  }, [router.isReady, router.query.token])

  // Start countdown when success or final error is reached
  useEffect(() => {
    if (success || (payError && !paying)) {
      setCountdown(7)
    }
  }, [success, payError, paying])

  // Tick countdown and redirect at 0
  useEffect(() => {
    if (countdown === null) return
    if (countdown === 0) {
      router.push('/')
      return
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  async function handlePay() {
    if (!payload) return
    setPaying(true)
    setPayError(null)

    try {
      const loaded = await loadRazorpay()
      if (!loaded) throw new Error('Failed to load payment gateway. Please try again.')

      const subRes = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: payload.email,
          name: payload.name,
          consultationId: payload.consultationId,
          service: payload.service,
        }),
      })
      if (!subRes.ok) {
        const err = await subRes.json().catch(() => ({}))
        throw new Error(err.error || 'Could not create subscription.')
      }
      const { subscription_id } = await subRes.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id,
        name: 'Automaitee Digital',
        description: `${SERVICE_NAMES[payload.service] || 'Automaitee'} – 1 Week Free Trial`,
        prefill: {
          name: payload.name,
          email: payload.email,
          contact: String(payload.phone || ''),
        },
        theme: { color: '#1a56db' },
        handler: async function (response) {
          try {
            const successRes = await fetch('/api/payment-success', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
                ...payload,
              }),
            })
            if (!successRes.ok) throw new Error('Payment recorded but confirmation failed.')
            setSuccess(true)
          } catch (err) {
            setPayError(err.message)
          } finally {
            setPaying(false)
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      setPayError(err.message)
      setPaying(false)
    }
  }

  return (
    <>
      <Head>
        <title>Secure Payment | Automaitee Digital</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        {/* Header */}
        <header style={{ background: '#0f172a', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: 32, height: 32, background: '#1a56db', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em' }}>Automaitee Digital</span>
          </div>
          <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Secure Checkout</span>
        </header>

        <main style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1rem 4rem' }}>

          {/* LOADING */}
          {tokenState === 'loading' && (
            <div style={centerCard}>
              <div style={spinner} />
              <p style={{ color: '#64748b', marginTop: '1rem', fontSize: '0.9rem' }}>Verifying your payment link…</p>
            </div>
          )}

          {/* INVALID */}
          {tokenState === 'invalid' && (
            <div style={centerCard}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔒</div>
              <h2 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 0.5rem' }}>Invalid Link</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                This payment link is not valid. It may have been modified or is incorrect.
              </p>
              <a href="mailto:hello@automaitee.com" style={contactLink}>Contact Support →</a>
            </div>
          )}

          {/* EXPIRED */}
          {tokenState === 'expired' && (
            <div style={centerCard}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⏰</div>
              <h2 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 0.5rem' }}>Link Expired</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                This payment link has expired (valid for 48 hours). Please contact us to receive a new link.
              </p>
              <a href="mailto:hello@automaitee.com" style={contactLink}>Request New Link →</a>
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div style={centerCard}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
              <h2 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 0.5rem' }}>You&apos;re all set!</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                Your free week has started. We&apos;ll be in touch shortly to kick things off.
              </p>
              <RedirectBar countdown={countdown} total={7} />
            </div>
          )}

          {/* VALID PAYMENT UI */}
          {tokenState === 'valid' && payload && !success && (
            <>
              <h1 style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                Complete Your Booking
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
                Review your details and authorise payment to begin your free trial.
              </p>

              {/* User details card */}
              <div style={card}>
                <div style={cardLabel}>Booking Details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Detail label="Name" value={payload.name} />
                  <Detail label="Email" value={payload.email} />
                  <Detail label="Company" value={payload.company || payload.companyName || '—'} />
                  <Detail label="Phone" value={payload.phone ? `+${payload.phone}` : '—'} />
                  <Detail label="Date" value={payload.bookingDate || '—'} />
                  <Detail label="Time" value={payload.bookingTime || '—'} />
                  {payload.duration && <Detail label="Duration" value={payload.duration} span />}
                </div>
              </div>

              {/* Plan card */}
              <div style={{ ...card, marginTop: '1rem' }}>
                <div style={cardLabel}>Your Plan</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
                      {getPriceDetails(payload.service, payload.price).priceDisplay}
                      <span style={{ fontWeight: 400, fontSize: '0.875rem', color: '#64748b' }}>/month</span>
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      {SERVICE_NAMES[payload.service] || payload.service || 'Full Funnel Automation'}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                      Cancel anytime. No commitment.
                    </div>
                  </div>
                  <span style={{
                    background: '#dcfce7', color: '#166534',
                    fontWeight: 700, fontSize: '0.75rem',
                    padding: '0.3rem 0.75rem', borderRadius: 99,
                    whiteSpace: 'nowrap', alignSelf: 'flex-start',
                  }}>
                    1 Week Free
                  </span>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '1.25rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748b' }}>
                  <span>Due today</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>£0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748b', marginTop: '0.375rem' }}>
                  <span>After free week</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{getPriceDetails(payload.service, payload.price).recurringDisplay}</span>
                </div>
              </div>

              {/* Error */}
              {payError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '0.875rem 1rem', marginTop: '1rem', color: '#991b1b', fontSize: '0.85rem' }}>
                  {payError}
                  {countdown !== null && <RedirectBar countdown={countdown} total={7} color="#f87171" />}
                </div>
              )}

              {/* CTA */}
              <button
                onClick={handlePay}
                disabled={paying}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', marginTop: '1.25rem',
                  background: paying ? '#93c5fd' : '#1a56db',
                  color: '#fff', border: 'none', borderRadius: 12,
                  padding: '1rem 1.5rem',
                  fontWeight: 700, fontSize: '1rem',
                  cursor: paying ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s',
                  letterSpacing: '-0.01em',
                }}
              >
                {paying ? (
                  <>
                    <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'pay-spin 0.7s linear infinite' }} />
                    Processing…
                  </>
                ) : (
                  'Authorise Payment & Start Free Week'
                )}
              </button>

              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.875rem', lineHeight: 1.5 }}>
                🔒 Secured by Razorpay · Your card details are never stored by us
              </p>
            </>
          )}
        </main>
      </div>

      <style>{`
        @keyframes pay-spin { to { transform: rotate(360deg); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </>
  )
}

function RedirectBar({ countdown, total, color = '#1a56db' }) {
  if (countdown === null) return null
  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ overflow: 'hidden', borderRadius: 99, background: 'rgba(0,0,0,0.08)', height: 4 }}>
        <div
          style={{
            height: '100%',
            background: color,
            borderRadius: 99,
            animation: `shrink ${total}s linear forwards`,
          }}
        />
      </div>
      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem', textAlign: 'center' }}>
        Redirecting to home in {countdown}s…
      </p>
    </div>
  )
}

function Detail({ label, value, span }) {
  return (
    <div style={span ? { gridColumn: '1 / -1' } : {}}>
      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontSize: '0.875rem', color: '#0f172a', fontWeight: 500 }}>{value}</div>
    </div>
  )
}

const card = {
  background: '#fff',
  borderRadius: 14,
  padding: '1.25rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)',
}

const cardLabel = {
  fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8',
  textTransform: 'uppercase', letterSpacing: '0.06em',
  marginBottom: '1rem',
}

const centerCard = {
  background: '#fff', borderRadius: 14, padding: '2.5rem 1.5rem',
  textAlign: 'center', marginTop: '2rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)',
}

const contactLink = {
  display: 'inline-block',
  color: '#1a56db', fontWeight: 600, fontSize: '0.875rem',
  textDecoration: 'none',
}

const spinner = {
  width: 36, height: 36,
  border: '3px solid #e2e8f0',
  borderTopColor: '#1a56db',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
  margin: '0 auto',
}
