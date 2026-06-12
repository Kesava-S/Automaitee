import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare, Receipt, LogOut, Zap, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Contract',  path: '/contract',  icon: FileText },
  { name: 'Requests',  path: '/requests',  icon: MessageSquare },
  { name: 'Invoices',  path: '/invoices',  icon: Receipt },
];

function Sidebar({ clientData, onSignOut, onClose, showClose }) {
  const initials = clientData?.name
    ? clientData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'CL';

  return (
    <div className="flex flex-col h-full">
      {/* Brand + Client */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm shadow-blue-200 flex-shrink-0">
              <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-base text-gray-900 tracking-tight">Automaitee</span>
          </div>
          {showClose && (
            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all z-20"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 border border-blue-200/60">
            <span className="text-xs font-bold text-blue-700">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate text-sm leading-tight">{clientData?.name}</p>
            <p className="text-xs text-gray-400 truncate mt-0.5">{clientData?.company}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                    strokeWidth={2}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:border-red-200 hover:text-red-700 transition-all duration-150"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}

export default function PortalLayout({ clientData, onSignOut }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    onSignOut();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">

      {/* ── Desktop Sidebar (lg+) ── */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-30">
        <Sidebar
          clientData={clientData}
          onSignOut={handleSignOut}
          onClose={null}
          showClose={false}
        />
      </aside>

      {/* ── Mobile: Backdrop ── */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile: Slide-in Drawer ── */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 z-50 shadow-2xl transition-transform duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          clientData={clientData}
          onSignOut={handleSignOut}
          onClose={() => setSidebarOpen(false)}
          showClose
        />
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">

        {/* Top bar */}
        <header className="h-14 lg:h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden h-12 w-12 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-all mr-2 z-10"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>

            {/* Desktop breadcrumb */}
            <div className="text-sm font-medium text-gray-400 hidden sm:block">
              Client Portal &bull;{' '}
              <span className="text-gray-700 font-semibold">{clientData?.plan}</span>
            </div>

            {/* Mobile brand */}
            <div className="flex items-center gap-2 sm:hidden">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Zap className="h-3 w-3 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-sm text-gray-900">Automaitee</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              {clientData?.accountStatus}
            </span>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
