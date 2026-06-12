import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { dataService } from '../services/dataService';
import Button from '../components/ui/Button';

export default function Login({ clientData, onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Admin credentials (always local — not stored in Sheets)
      if (email.toLowerCase() === 'admin@automaitee.com' && password === 'Admin-2026') {
        dataService.setSession('admin-user');
        onLoginSuccess();
        navigate('/admin/dashboard');
        return;
      }

      // Client credentials — checked against Google Sheet first, then local fallback
      const result = await dataService.authenticate(email, password);
      if (result.success) {
        dataService.setSession(result.user.userId);
        onLoginSuccess(result.user);
        navigate(result.user.onboardingComplete ? '/dashboard' : '/onboarding');
      } else {
        setError(result.error || 'Incorrect email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 font-sans portal-root">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="h-30 w-40 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Client Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to get started</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {showPwd
                    ? <EyeOff className="h-4 w-4" strokeWidth={2} />
                    : <Eye className="h-4 w-4" strokeWidth={2} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                mt-4
                h-12 sm:h-14
                flex
                items-center
                justify-center
                rounded-full
                bg-blue-600
                text-white
                font-semibold
                text-sm sm:text-lg
                shadow-lg
                shadow-blue-200
                hover:bg-blue-700
                hover:shadow-xl
                disabled:bg-blue-400
                disabled:cursor-not-allowed
                disabled:opacity-70
                transition-all
                duration-300
                active:scale-[0.98]
              "
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-500">First time?</strong> Use the credentials
              provided by your service provider.
            </p>
          </div>
        </div>

        {/* Powered-by */}
        <p className="text-center text-xs text-slate-300 mt-6">Powered by Automaitee</p>
      </div>
    </div>
  );
}
