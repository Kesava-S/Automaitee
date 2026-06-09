import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout({ onSignOut }) {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    onSignOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Manage Clients', path: '/admin/clients' },
    { name: 'Manage Requests', path: '/admin/requests' },
    { name: 'Announcements', path: '/admin/announcements' },
    { name: 'Issue Bills', path: '/admin/billing' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-350 border-r border-slate-800 flex flex-col justify-between fixed h-full z-10">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-lg text-white tracking-tight">Automaitee Admin</span>
            </div>
            <p className="text-xs text-slate-500">Service Provider Panel</p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`
                }
              >
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer / Sign Out */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleSignOutClick}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all"
          >
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="h-16 bg-white border-b border-gray-250 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="text-sm font-medium text-slate-500">
            Admin console &bull; <span className="text-slate-800">System Operator</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
              online
            </span>
          </div>
        </header>

        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
