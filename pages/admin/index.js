import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const auth = localStorage.getItem('adminAuth')
      if (auth) {
        const { loggedIn } = JSON.parse(auth)
        if (loggedIn) router.push('/admin/dashboard')
      }
    } catch {}
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      })
      const data = await res.json()

      if (data.success) {
        // Store n8n token (used for verify-admin on every data fetch)
        localStorage.setItem('adminAuth', JSON.stringify({ username: data.username, token: data.token, loggedIn: true }))
        router.push('/admin/dashboard')
      } else {
        setError(data.message || 'Invalid username or password')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login | Automaitee</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <img src="/logo.png" alt="Automaitee" style={{ height: '48px', width: 'auto' }} />
          </div>

          <h1 className="admin-login-title">Admin Panel</h1>
          <p className="admin-login-subtitle">Sign in to manage consultations</p>

          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="username">Username</label>
              <div style={{ position: 'relative' }}>
                <User
                  size={15}
                  style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#86868b', pointerEvents: 'none' }}
                />
                <input
                  id="username"
                  type="text"
                  className="admin-form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={15}
                  style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#86868b', pointerEvents: 'none' }}
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="admin-form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#86868b', display: 'flex', alignItems: 'center', padding: 0 }}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <div className="admin-error-msg">{error}</div>}

            <button
              type="submit"
              className="admin-btn-primary"
              disabled={loading || !username || !password}
              style={{ marginTop: '1.5rem' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.8rem', color: '#86868b', margin: '2rem 0 0' }}>
            Automaitee Digital | Internal use only
          </p>
        </div>
      </div>
    </>
  )
}
