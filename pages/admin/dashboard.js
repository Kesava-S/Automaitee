import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Users, Clock, CheckCircle, CalendarCheck, ArrowRight, RefreshCw } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

function getInitials(name) {
  if (!name || !name.trim()) return '?'
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function formatDate(val) {
  if (!val) return '—'
  try {
    const d = new Date(val)
    if (isNaN(d.getTime())) return val
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return val
  }
}

function resolveName(c) {
  return (
    c.name ||
    c.fullName ||
    `${c.firstName || ''} ${c.lastName || ''}`.trim() ||
    'Unknown'
  )
}

function resolveStatus(c) {
  return (c.status || 'enquiry').toLowerCase()
}

function resolveDate(c) {
  return c.timestamp || c.createdAt || c.submittedAt || c.bookingDate || c.preferredDate || null
}

export default function AdminDashboard() {
  const router = useRouter()
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const { username, token } = JSON.parse(localStorage.getItem('adminAuth') || '{}')
      const res = await fetch('/api/admin/consultations', {
        headers: {
          'x-admin-user': username || '',
          'x-admin-token': token || '',
        },
      })
      if (res.status === 401) {
        localStorage.removeItem('adminAuth')
        router.push('/admin')
        return
      }
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const json = await res.json()
      const rows = Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : []
      setConsultations(rows)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const total = consultations.length
  const enquiry = consultations.filter(c => resolveStatus(c) === 'enquiry').length
  const confirmed = consultations.filter(c => resolveStatus(c) === 'confirmed').length
  const pending = consultations.filter(c => resolveStatus(c) === 'pending').length

  const recent = [...consultations]
    .sort((a, b) => {
      const da = new Date(resolveDate(a) || 0)
      const db = new Date(resolveDate(b) || 0)
      return db - da
    })
    .slice(0, 5)

  const stats = [
    { label: 'Total Consultations', value: total, icon: Users, color: 'blue' },
    { label: 'Enquiries', value: enquiry, icon: Clock, color: 'orange' },
    { label: 'Confirmed', value: confirmed, icon: CheckCircle, color: 'green' },
    { label: 'Pending', value: pending, icon: CalendarCheck, color: 'purple' },
  ]

  return (
    <>
      <Head>
        <title>Dashboard | Automaitee Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminLayout>
        <div className="admin-page-header">
          <h1>Dashboard</h1>
          <p>Overview of all consultation bookings</p>
        </div>

        {/* Stats */}
        <div className="admin-stats-grid">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="admin-stat-card">
              <div className={`admin-stat-icon ${color}`}>
                <Icon size={20} />
              </div>
              <div className="admin-stat-value">{loading ? '—' : value}</div>
              <div className="admin-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Recent Consultations */}
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Recent Consultations</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                className="admin-refresh-btn"
                onClick={fetchData}
                disabled={loading}
                title="Refresh"
              >
                <RefreshCw
                  size={14}
                  style={{ animation: loading ? 'admin-spin 0.8s linear infinite' : 'none' }}
                />
              </button>
              <Link href="/admin/consultations" className="admin-view-all-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="admin-loading">
              <div className="admin-spinner" />
              <span>Loading consultations...</span>
            </div>
          ) : error ? (
            <div className="admin-empty">
              <p style={{ color: '#cc2f26', marginBottom: '1rem' }}>
                Failed to load: {error}
              </p>
              <button className="admin-btn-secondary" onClick={fetchData}>
                Retry
              </button>
            </div>
          ) : recent.length === 0 ? (
            <div className="admin-empty">
              <CalendarCheck size={40} className="admin-empty-icon" />
              <p>No consultations yet</p>
            </div>
          ) : (
            <div className="admin-recent-list">
              {recent.map((c, i) => {
                const name = resolveName(c)
                const email = c.email || '—'
                const status = resolveStatus(c)
                const date = resolveDate(c)
                return (
                  <div key={i} className="admin-recent-item">
                    <div className="admin-recent-info">
                      <div className="admin-recent-avatar">{getInitials(name)}</div>
                      <div style={{ minWidth: 0 }}>
                        <div className="admin-recent-name">{name}</div>
                        <div className="admin-recent-email">{email}</div>
                      </div>
                    </div>
                    <div className="admin-recent-meta">
                      <span className={`admin-badge ${status}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      <div className="admin-recent-date">{formatDate(date)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  )
}
