import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, Megaphone, CreditCard, LogOut, Zap, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Manage Client', path: '/admin/clients', icon: Users },
  { name: 'Manage Requests', path: '/admin/requests', icon: MessageSquare },
  { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { name: 'Issue Bills', path: '/admin/billing', icon: CreditCard },
];

function AdminSidebar({ onSignOut, onClose, showClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-sm flex-shrink-0">
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
        <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200/70">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          <span>Admin Console</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isActive
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

export default function AdminLayout({ onSignOut }) {
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
        <AdminSidebar
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
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 z-50 shadow-2xl transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <AdminSidebar
          onSignOut={handleSignOut}
          onClose={() => setSidebarOpen(false)}
          showClose
        />
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-14 lg:h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden h-12 w-12 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-all mr-2 z-10"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>

            {/* Desktop breadcrumb */}
            <div className="text-sm font-medium text-gray-400 hidden sm:block">
              Admin Console &bull;{' '}
              <span className="text-gray-700 font-semibold">System Operator</span>
            </div>

            {/* Mobile brand */}
            <div className="flex items-center gap-2 sm:hidden">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <Zap className="h-3 w-3 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-sm text-gray-900">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              online
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
