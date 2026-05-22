import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  CalendarCheck,
  LogOut,
  Menu,
  ChevronDown,
  User,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/consultations', label: 'Manage Consultations', icon: CalendarCheck },
]

const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/consultations': 'Manage Consultations',
}

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [adminName, setAdminName] = useState('Admin')
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin')
      return
    }
    try {
      const { username } = JSON.parse(auth)
      if (username) setAdminName(username)
    } catch {}
  }, [])

  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const pageTitle = PAGE_TITLES[router.pathname] || 'Admin Panel'
  const initials = adminName.slice(0, 2).toUpperCase()

  return (
    <div className="admin-wrapper">
      {/* Mobile overlay */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-logo">
          <img src="/logo.png" alt="Automaitee" />
          <span className="admin-sidebar-brand">Admin Panel</span>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section">
            <p className="admin-nav-section-title">Navigation</p>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`admin-nav-item ${router.pathname === href ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-nav-item admin-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
            <span className="admin-page-title">{pageTitle}</span>
          </div>

          <div className="admin-header-right" ref={dropdownRef}>
            <button
              className="admin-profile-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="admin-profile-avatar">{initials}</div>
              <span className="admin-profile-name">{adminName}</span>
              <ChevronDown size={14} />
            </button>

            {dropdownOpen && (
              <div className="admin-dropdown">
                <div className="admin-dropdown-item" style={{ cursor: 'default', pointerEvents: 'none' }}>
                  <User size={14} />
                  <span>{adminName}</span>
                </div>
                <hr className="admin-dropdown-divider" />
                <button className="admin-dropdown-item danger" onClick={handleLogout}>
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">{children}</main>

        {/* Footer */}
        <footer className="admin-footer">
          <p>&copy; 2026 Automaitee Digital. All rights reserved.</p>
          <p>Admin Panel v1.0</p>
        </footer>
      </div>
    </div>
  )
}
