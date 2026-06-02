
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Search, RefreshCw, CalendarCheck, X } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

const SERVICES = [
  { label: 'Full Funnel Automation', value: 'book-consultation' },
  { label: 'Micro Service - SilentChurn', value: 'book-silentchurn' },
]

const SERVICE_LABEL = Object.fromEntries(SERVICES.map(s => [s.value, s.label]))

const STATUSES = ['enquiry', 'confirmed', 'pending', 'cancelled']

function resolveName(c) {
  return (
    c.name ||
    c.fullName ||
    `${c.firstName || ''} ${c.lastName || ''}`.trim() ||
    'N/A'
  )
}

function resolveStatus(c) {
  return (c.status || 'enquiry').toLowerCase()
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

export default function AdminConsultations() {
  const router = useRouter()
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Action modal state
  const [modal, setModal] = useState(null) // { row: object, service: string, status: string }
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

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

  function openModal(row) {
    setModal({
      row,
      service: 'book-consultation',
      status: resolveStatus(row),
    })
    setUpdateError(null)
    setUpdateSuccess(false)
  }

  function closeModal() {
    setModal(null)
    setUpdateError(null)
    setUpdateSuccess(false)
  }

  async function handleUpdate() {
    if (!modal) return
    setUpdating(true)
    setUpdateError(null)
    setUpdateSuccess(false)
    try {
      const { username, token } = JSON.parse(localStorage.getItem('adminAuth') || '{}')
      const res = await fetch('/api/admin/update-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': username || '',
          'x-admin-token': token || '',
        },
        body: JSON.stringify({
          rowNumber: modal.row.row_number,
          name: resolveName(modal.row),
          email: modal.row.email || '',
          phone: modal.row.whatsapp || '',
          company: modal.row.companyName || '',
          bookingDate: modal.row.bookingDate || '',
          bookingTime: modal.row.bookingTime || '',
          duration: modal.row.duration || '',
          companyName: modal.row.companyName || '',
          exp: Date.now() + (48 * 60 * 60 * 1000),
          status: modal.status,
          service: SERVICE_LABEL[modal.service] || modal.service,
        }),
      })
      if (res.status === 401) {
        localStorage.removeItem('adminAuth')
        router.push('/admin')
        return
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Request failed (${res.status})`)
      }
      setUpdateSuccess(true)
      // Update the row locally so the badge reflects the change immediately
      setConsultations(prev =>
        prev.map(c =>
          c.row_number === modal.row.row_number ? { ...c, status: modal.status } : c
        )
      )
    } catch (err) {
      setUpdateError(err.message)
    } finally {
      setUpdating(false)
    }
  }

  const filtered = consultations.filter(c => {
    const name = resolveName(c).toLowerCase()
    const email = (c.email || '').toLowerCase()
    const company = (c.companyName || c.businessName || c.company || '').toLowerCase()
    const status = resolveStatus(c)
    const q = search.toLowerCase()
    const matchSearch = !q || name.includes(q) || email.includes(q) || company.includes(q)
    const matchStatus = statusFilter === 'all' || status === statusFilter
    return matchSearch && matchStatus
  })

  const statusCounts = {
    all: consultations.length,
    enquiry: consultations.filter(c => resolveStatus(c) === 'enquiry').length,
    confirmed: consultations.filter(c => resolveStatus(c) === 'confirmed').length,
    pending: consultations.filter(c => resolveStatus(c) === 'pending').length,
    cancelled: consultations.filter(c => resolveStatus(c) === 'cancelled').length,
  }

  return (
    <>
      <Head>
        <title>Manage Consultations | Automaitee Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminLayout>
        <div className="admin-page-header">
          <h1>Manage Consultations</h1>
          <p>All consultation bookings received through your website</p>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">
              All Consultations
              {!loading && (
                <span style={{ color: '#86868b', fontWeight: 400, fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                  ({filtered.length})
                </span>
              )}
            </span>

            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search
                  size={14}
                  style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#86868b', pointerEvents: 'none' }}
                />
                <input
                  type="text"
                  className="admin-search-input"
                  style={{ paddingLeft: '2.25rem' }}
                  placeholder="Search name, email or company..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {/* Status filter */}
              <select
                className="admin-filter-select"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status ({statusCounts.all})</option>
                <option value="enquiry">Enquiry ({statusCounts.enquiry})</option>
                <option value="confirmed">Confirmed ({statusCounts.confirmed})</option>
                <option value="pending">Pending ({statusCounts.pending})</option>
                <option value="cancelled">Cancelled ({statusCounts.cancelled})</option>
              </select>

              {/* Refresh */}
              <button
                className="admin-refresh-btn"
                onClick={fetchData}
                disabled={loading}
                title="Refresh data"
              >
                <RefreshCw
                  size={14}
                  style={{ animation: loading ? 'admin-spin 0.8s linear infinite' : 'none' }}
                />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="admin-loading">
              <div className="admin-spinner" />
              <span>Fetching consultations from n8n...</span>
            </div>
          ) : error ? (
            <div className="admin-empty">
              <p style={{ color: '#cc2f26', marginBottom: '1rem' }}>Failed to load: {error}</p>
              <button className="admin-btn-secondary" onClick={fetchData}>Try Again</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty">
              <CalendarCheck size={44} className="admin-empty-icon" />
              <p style={{ marginBottom: '0.5rem' }}>
                {search || statusFilter !== 'all'
                  ? 'No results match your filters.'
                  : 'No consultations yet.'}
              </p>
              {(search || statusFilter !== 'all') && (
                <button
                  className="admin-btn-secondary"
                  onClick={() => { setSearch(''); setStatusFilter('all') }}
                  style={{ marginTop: '0.75rem' }}
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>WhatsApp</th>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Booking Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th style={{ width: '90px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => {
                    const name = resolveName(c)
                    const email = c.email || '—'
                    const whatsapp = c.whatsapp ? String(c.whatsapp) : '—'
                    const company = c.companyName || c.businessName || c.company || '—'
                    const industry = c.industry || c.service || c.serviceType || '—'
                    const bookingDate = c.bookingDate || c.preferredDate || c.date || null
                    const time = c.bookingTime || c.preferredTime || c.time || '—'
                    const duration = c.duration || '—'
                    const status = resolveStatus(c)
                    const submitted = c.timestamp || c.createdAt || c.submittedAt || null

                    return (
                      <tr key={i}>
                        <td style={{ color: '#86868b', fontSize: '0.78rem' }}>{i + 1}</td>
                        <td><span style={{ fontWeight: 600 }}>{name}</span></td>
                        <td>
                          {email !== '—' ? (
                            <a href={`mailto:${email}`} style={{ color: '#0071e3', textDecoration: 'none', fontSize: '0.85rem' }}>
                              {email}
                            </a>
                          ) : (
                            <span style={{ color: '#86868b' }}>—</span>
                          )}
                        </td>
                        <td style={{ color: whatsapp === '—' ? '#86868b' : 'inherit', whiteSpace: 'nowrap' }}>{whatsapp}</td>
                        <td style={{ color: company === '—' ? '#86868b' : 'inherit', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company}</td>
                        <td style={{ color: industry === '—' ? '#86868b' : 'inherit', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{industry}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{formatDate(bookingDate)}</td>
                        <td style={{ color: time === '—' ? '#86868b' : 'inherit', whiteSpace: 'nowrap' }}>{time}</td>
                        <td style={{ color: duration === '—' ? '#86868b' : 'inherit', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{duration}</td>
                        <td>
                          <span className={`admin-badge ${status}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </td>
                        <td style={{ color: '#86868b', whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{formatDate(submitted)}</td>
                        <td>
                          <button
                            className="admin-btn-secondary"
                            style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                            onClick={() => openModal(c)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminLayout>

      {/* Action Modal */}
      {modal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={e => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div style={{
            background: '#fff', borderRadius: '14px', padding: '1.75rem',
            width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1d1d1f' }}>
                  Update Consultation
                </div>
                <div style={{ fontSize: '0.82rem', color: '#86868b', marginTop: '2px' }}>
                  {resolveName(modal.row)} · Row #{modal.row.row_number}
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Service selector */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1d1d1f', marginBottom: '0.4rem' }}>
                Service
              </label>
              <select
                className="admin-filter-select"
                style={{ width: '100%' }}
                value={modal.service}
                onChange={e => setModal(m => ({ ...m, service: e.target.value }))}
              >
                {SERVICES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Status selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1d1d1f', marginBottom: '0.4rem' }}>
                Status
              </label>
              <select
                className="admin-filter-select"
                style={{ width: '100%' }}
                value={modal.status}
                onChange={e => setModal(m => ({ ...m, status: e.target.value }))}
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Feedback */}
            {updateError && (
              <p style={{ color: '#cc2f26', fontSize: '0.82rem', marginBottom: '1rem' }}>
                {updateError}
              </p>
            )}
            {updateSuccess && (
              <p style={{ color: '#1a7f37', fontSize: '0.82rem', marginBottom: '1rem' }}>
                Updated successfully.
              </p>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.625rem', justifyContent: 'flex-end' }}>
              <button className="admin-btn-secondary" onClick={closeModal} disabled={updating}>
                Cancel
              </button>
              <button
                className="admin-btn-primary"
                onClick={handleUpdate}
                disabled={updating || updateSuccess}
              >
                {updating ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
