import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function PortalLayout({ clientData, onSignOut }) {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    onSignOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Contract', path: '/contract', icon: '📝' },
    { name: 'Requests', path: '/requests', icon: '📨' },
    { name: 'Invoices', path: '/invoices', icon: '💳' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between fixed h-full z-10">
        <div>
          {/* Header/Client Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🤖</span>
              <span className="font-bold text-lg text-gray-900 tracking-tight">Automaitee</span>
            </div>
            <div className="mt-2">
              <h3 className="font-semibold text-gray-900 truncate">{clientData?.name}</h3>
              <p className="text-xs text-gray-500 truncate">{clientData?.company}</p>
            </div>
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
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer / Sign Out */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleSignOutClick}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <span>🚪</span>
            <span>Sign out</span>
          </button>
        </div>
      </</aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="text-sm font-medium text-gray-500">
            Client Portal &bull; <span className="text-gray-800">{clientData?.plan}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
              {clientData?.accountStatus}
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
