import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, EyeOff, AlertTriangle, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

const STEPS = [
  { id: 1, label: 'Log in',    key: null },
  { id: 2, label: 'Terms',     key: 'tcAccepted' },
  { id: 3, label: 'Password',  key: 'passwordChanged' },
  { id: 4, label: 'Complete',  key: null },
];

function StepDot({ step, activeStep, clientData }) {
  const isDone =
    (step.id === 1) ||
    (step.id === 2 && clientData.tcAccepted) ||
    (step.id === 3 && clientData.passwordChanged);
  const isActive = step.id === activeStep;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm',
          'ring-4 ring-white shadow-sm transition-all duration-300',
          isDone  ? 'bg-emerald-500 text-white'  :
          isActive? 'bg-blue-600 text-white scale-110' :
                    'bg-slate-200 text-slate-500',
        ].join(' ')}
      >
        {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : step.id}
      </div>
      <span className={`text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
        {step.label}
      </span>
    </div>
  );
}

export default function Onboarding({
  clientData,
  onAcceptTerms,
  onUpdatePassword,
  onCompleteOnboarding,
}) {
  const navigate  = useNavigate();
  const tcBoxRef  = useRef(null);

  const [activeStep,         setActiveStep]         = useState(1);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [tcChecked,          setTcChecked]          = useState(false);
  const [legalName,          setLegalName]          = useState('');
  const [password,           setPassword]           = useState('');
  const [confirmPassword,    setConfirmPassword]    = useState('');
  const [showPwd,            setShowPwd]            = useState(false);
  const [showConfirmPwd,     setShowConfirmPwd]     = useState(false);
  const [passwordError,      setPasswordError]      = useState('');
  const [saving,             setSaving]             = useState(false);

  // Derive active step from clientData
  useEffect(() => {
    if (clientData.onboardingComplete) {
      navigate('/dashboard');
    } else if (clientData.passwordChanged) {
      setActiveStep(4);
    } else if (clientData.tcAccepted) {
      setActiveStep(3);
    } else {
      setActiveStep(2);
    }
  }, [clientData, navigate]);

  const handleScroll = () => {
    if (!tcBoxRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = tcBoxRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 3) setIsScrolledToBottom(true);
  };

  // Password strength
  const pwStrength = () => {
    if (!password) return null;
    const hasUpper  = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const long      = password.length >= 8;
    const score     = [long, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
    if (score <= 1) return { label: 'Weak',   color: 'bg-red-400',    w: 'w-1/4' };
    if (score === 2) return { label: 'Fair',   color: 'bg-amber-400',  w: 'w-2/4' };
    if (score === 3) return { label: 'Good',   color: 'bg-blue-400',   w: 'w-3/4' };
    return              { label: 'Strong', color: 'bg-emerald-500', w: 'w-full' };
  };
  const strength = pwStrength();

  // Step 2 — Accept T&C
  const handleAcceptTc = async (e) => {
    e.preventDefault();
    if (!tcChecked || !legalName.trim()) return;
    setSaving(true);
    await onAcceptTerms(clientData.email, legalName.trim(), new Date().toISOString());
    setSaving(false);
  };

  // Step 3 — Set password
  const handleSetPassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    if (password !== confirmPassword) { setPasswordError('Passwords do not match'); return; }
    if (password.length < 8 || !/\d/.test(password)) {
      setPasswordError('Password must be at least 8 characters and contain a number.');
      return;
    }
    setSaving(true);
    await onUpdatePassword(clientData.email, password);
    setSaving(false);
  };

  // Step 4 — Complete
  const handleComplete = async () => {
    setSaving(true);
    await onCompleteOnboarding(clientData.email);
    navigate('/dashboard');
  };

  const cardBase = 'bg-white rounded-2xl border shadow-sm p-8 transition-all duration-300';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 font-sans portal-root">
      <div className="max-w-2xl mx-auto">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Zap className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-slate-900">Automaitee</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-slate-900">Account Setup</h1>
          <p className="text-slate-400 mt-1.5 text-sm">Complete the steps below to access your portal</p>
        </div>

        {/* Progress tracker */}
        <div className="relative mb-10">
          <div className="absolute top-[18px] left-0 w-full h-0.5 bg-slate-200 z-0" />
          <div className="relative flex justify-between z-10 px-4">
            {STEPS.map(step => (
              <StepDot key={step.id} step={step} activeStep={activeStep} clientData={clientData} />
            ))}
          </div>
        </div>

        <div className="space-y-4">

          {/* ── Step 1: completed ── */}
          <div className={`${cardBase} border-slate-100 opacity-75`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Step 1 — Logged in</p>
                  <p className="text-xs text-slate-400">Credentials verified</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                Complete
              </span>
            </div>
          </div>

          {/* ── Step 2: Terms ── */}
          <div className={`${cardBase} ${
            activeStep === 2
              ? 'border-blue-400 ring-2 ring-blue-500/10'
              : clientData.tcAccepted
              ? 'border-slate-100 opacity-75'
              : 'border-slate-100 opacity-40 pointer-events-none'
          }`}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Step 2 — Accept Terms &amp; Conditions</h3>
                <p className="text-xs text-slate-400 mt-0.5">Read and accept the portal service agreement</p>
              </div>
              {clientData.tcAccepted && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 flex-shrink-0">
                  Complete
                </span>
              )}
            </div>

            {activeStep === 2 ? (
              <div className="space-y-5">
                <div
                  ref={tcBoxRef}
                  onScroll={handleScroll}
                  className="h-[180px] overflow-y-auto p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed space-y-3"
                >
                  <h4 className="font-bold text-slate-800">1. Acceptance of Terms</h4>
                  <p>By checking the acceptance box and entering your full legal name below, you agree to comply with and be bound by the Service Provider terms. These terms govern your use of the client portal and project reporting interfaces.</p>
                  <h4 className="font-bold text-slate-800">2. Privacy &amp; Data Handling</h4>
                  <p>We respect client data and secure all integration endpoints. We do not distribute database files, credentials, or code assets to third parties without prior authorization.</p>
                  <h4 className="font-bold text-slate-800">3. Electronic Signature</h4>
                  <p>Providing your name represents your legal consent to execute this portal terms record. This signature creates a write-once audit log that cannot be modified.</p>
                  <p className="text-xs text-slate-400 font-semibold pt-2">— END OF SERVICE AGREEMENT —</p>
                </div>

                <form onSubmit={handleAcceptTc} className="space-y-4">
                  <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    !isScrolledToBottom ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/20'
                  }`}>
                    <input
                      type="checkbox"
                      checked={tcChecked}
                      onChange={e => setTcChecked(e.target.checked)}
                      disabled={!isScrolledToBottom}
                      className="mt-0.5 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                      {!isScrolledToBottom
                        ? 'Scroll to the bottom to unlock the checkbox'
                        : 'I have read and agree to the terms and conditions.'}
                    </span>
                  </label>

                  {tcChecked && (
                    <div className="animate-fadeIn">
                      <label htmlFor="legalName" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Full Legal Name
                      </label>
                      <input
                        id="legalName"
                        type="text"
                        value={legalName}
                        onChange={e => setLegalName(e.target.value)}
                        placeholder="Your full legal name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={saving}
                    disabled={!tcChecked || !legalName.trim()}
                  >
                    Accept &amp; Continue
                  </Button>
                </form>
              </div>
            ) : clientData.tcAccepted && (
              <p className="text-sm text-slate-500 mt-1">
                Accepted by <strong>{clientData.tcAcceptedName}</strong> on{' '}
                {new Date(clientData.tcAcceptedDate).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* ── Step 3: Password ── */}
          <div className={`${cardBase} ${
            activeStep === 3
              ? 'border-blue-400 ring-2 ring-blue-500/10'
              : clientData.passwordChanged
              ? 'border-slate-100 opacity-75'
              : 'border-slate-100 opacity-40 pointer-events-none'
          }`}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Step 3 — Set Permanent Password</h3>
                <p className="text-xs text-slate-400 mt-0.5">Replace your temporary credentials with a secure password</p>
              </div>
              {clientData.passwordChanged && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 flex-shrink-0">
                  Complete
                </span>
              )}
            </div>

            {activeStep === 3 && (
              <form onSubmit={handleSetPassword} className="space-y-5">
                {passwordError && (
                  <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2.5 animate-fadeIn">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                    {passwordError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="new-pw" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="new-pw"
                        type={showPwd ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Min 8 chars + 1 number"
                        required
                        autoComplete="new-password"
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {strength && (
                      <div className="mt-2 space-y-1">
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${strength.color} ${strength.w} transition-all duration-300 rounded-full`} />
                        </div>
                        <p className="text-xs text-slate-400">{strength.label}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirm-pw" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirm-pw"
                        type={showConfirmPwd ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        required
                        autoComplete="new-password"
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500 mt-1.5">Passwords do not match</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={saving}
                  disabled={!password || !confirmPassword}
                >
                  Save &amp; Continue
                </Button>
              </form>
            )}
          </div>

          {/* ── Step 4: Complete ── */}
          <div className={`${cardBase} ${
            activeStep === 4
              ? 'border-blue-400 ring-2 ring-blue-500/10'
              : 'border-slate-100 opacity-40 pointer-events-none'
          }`}>
            <h3 className="font-bold text-slate-900 text-base mb-4">Step 4 — Launch Portal</h3>

            {activeStep === 4 && (
              <div className="space-y-5">
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <div>
                    <strong className="block font-bold">Onboarding complete!</strong>
                    <span className="text-emerald-700">Your credentials are set and your contract accepted. Welcome aboard.</span>
                  </div>
                </div>

                <Button
                  variant="success"
                  size="lg"
                  loading={saving}
                  onClick={handleComplete}
                >
                  Go to Dashboard
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
