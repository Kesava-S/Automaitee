import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding({ clientData, onUpdateClient }) {
  const navigate = useNavigate();
  const tcBoxRef = useRef(null);

  // Determine current active step based on client state
  const [activeStep, setActiveStep] = useState(1);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  
  // Step 2 Form States
  const [tcChecked, setTcChecked] = useState(false);
  const [legalName, setLegalName] = useState('');
  
  // Step 3 Form States
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Automatically compute step on mount and state change
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

  // Scroll detection for T&C box
  const handleScroll = () => {
    if (!tcBoxRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = tcBoxRef.current;
    
    // Check if scrolled within 3px of bottom to accommodate zoom levels
    if (scrollHeight - scrollTop <= clientHeight + 3) {
      setIsScrolledToBottom(true);
    }
  };

  // Step 2 - Accept Terms and Conditions
  const handleAcceptTc = (e) => {
    e.preventDefault();
    if (!tcChecked || !legalName.trim()) return;

    // Create updated client record
    const updatedClient = {
      ...clientData,
      tcAccepted: true,
      tcAcceptedName: legalName.trim(),
      tcAcceptedDate: new Date().toISOString(),
    };

    // TODO: Replace with API call to save T&C acceptance to database
    onUpdateClient(updatedClient);
  };

  // Step 3 - Set Permanent Password
  const handleSetPassword = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const hasNumber = /\d/.test(password);
    if (password.length < 8 || !hasNumber) {
      setPasswordError('Password must be at least 8 characters long and contain at least one number.');
      return;
    }

    const updatedClient = {
      ...clientData,
      customPassword: password,
      passwordChanged: true,
    };

    // TODO: Replace with API call to update password in backend
    onUpdateClient(updatedClient);
  };

  // Step 4 - Complete Onboarding
  const handleCompleteOnboarding = () => {
    const updatedClient = {
      ...clientData,
      onboardingComplete: true,
    };

    // TODO: Replace with API call to mark onboarding complete in database
    onUpdateClient(updatedClient);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Let's set up your account</h1>
          <p className="text-slate-500 mt-2">Complete these onboarding steps to access your portal</p>
        </div>

        {/* Horizontal Progress Tracker */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          <div className="relative flex justify-between z-10">
            {/* Step 1 indicator */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-slate-50">
                ✓
              </div>
              <span className="text-xs font-semibold text-slate-700 mt-2">Log in</span>
            </div>

            {/* Step 2 indicator */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-slate-50 transition-all ${
                clientData.tcAccepted 
                  ? 'bg-emerald-500 text-white' 
                  : activeStep === 2 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {clientData.tcAccepted ? '✓' : '2'}
              </div>
              <span className={`text-xs font-semibold mt-2 ${activeStep === 2 ? 'text-blue-600' : 'text-slate-400'}`}>Terms</span>
            </div>

            {/* Step 3 indicator */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-slate-50 transition-all ${
                clientData.passwordChanged 
                  ? 'bg-emerald-500 text-white' 
                  : activeStep === 3 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {clientData.passwordChanged ? '✓' : '3'}
              </div>
              <span className={`text-xs font-semibold mt-2 ${activeStep === 3 ? 'text-blue-600' : 'text-slate-400'}`}>Password</span>
            </div>

            {/* Step 4 indicator */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-slate-50 transition-all ${
                activeStep === 4 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 text-slate-500'
              }`}>
                4
              </div>
              <span className={`text-xs font-semibold mt-2 ${activeStep === 4 ? 'text-blue-600' : 'text-slate-400'}`}>Complete</span>
            </div>
          </div>
        </div>

        {/* Steps Cards */}
        <div className="space-y-6">
          {/* Card: Step 1 (Completed) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between opacity-75">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Step 1 — Logged in</h3>
                <p className="text-sm text-slate-400">Credentials verified</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              Complete
            </span>
          </div>

          {/* Card: Step 2 */}
          <div className={`bg-white rounded-2xl border shadow-sm p-8 transition-all ${
            activeStep === 2 
              ? 'border-blue-500 ring-2 ring-blue-500/10' 
              : clientData.tcAccepted 
              ? 'border-slate-200 opacity-75' 
              : 'border-slate-200 opacity-50 pointer-events-none'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Step 2 — Read and accept terms and conditions</h3>
                <p className="text-sm text-slate-500 mt-1">Review the portal service agreement below</p>
              </div>
              {clientData.tcAccepted && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Complete
                </span>
              )}
            </div>

            {activeStep === 2 ? (
              <div className="space-y-6">
                {/* Scrollable Terms */}
                <div 
                  ref={tcBoxRef}
                  onScroll={handleScroll}
                  className="h-[200px] overflow-y-auto p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed space-y-4"
                >
                  <h4 className="font-bold text-slate-800">1. Acceptance of Terms</h4>
                  <p>By checking the acceptance box and entering your full legal name below, you agree to comply with and be bound by the Service Provider terms. These terms govern your use of the client portal and project reporting interfaces.</p>
                  
                  <h4 className="font-bold text-slate-800">2. Privacy & Data Handling</h4>
                  <p>We respect client data and secure all integration endpoints. We do not distribute database files, credentials, or code assets to third parties without prior authorization.</p>
                  
                  <h4 className="font-bold text-slate-800">3. Electronic Signature</h4>
                  <p>Providing your name represents your legal consent to execute this portal terms record. This signature creates a write-once audit log that cannot be modified.</p>
                  
                  <p className="text-xs text-slate-400 font-semibold pt-4">--- END OF SERVICE AGREEMENT ---</p>
                </div>

                <form onSubmit={handleAcceptTc} className="space-y-5">
                  <div className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <input 
                      id="tc-checkbox"
                      type="checkbox"
                      checked={tcChecked}
                      onChange={(e) => setTcChecked(e.target.checked)}
                      disabled={!isScrolledToBottom}
                      className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="tc-checkbox" className={`text-sm leading-relaxed ${!isScrolledToBottom ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                      {!isScrolledToBottom 
                        ? 'Scroll to the bottom of the agreement to unlock agreement checkbox' 
                        : 'I have read and agree to the terms and conditions outlined above.'}
                    </label>
                  </div>

                  {tcChecked && (
                    <div className="animate-fadeIn">
                      <label htmlFor="legalName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Type your full legal name
                      </label>
                      <input 
                        id="legalName"
                        type="text"
                        value={legalName}
                        onChange={(e) => setLegalName(e.target.value)}
                        placeholder="Rajiv Menon"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!tcChecked || !legalName.trim()}
                    className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed transition-all"
                  >
                    Accept & Continue
                  </button>
                </form>
              </div>
            ) : clientData.tcAccepted && (
              <p className="text-sm text-slate-500">Accepted by <strong>{clientData.tcAcceptedName}</strong> on {new Date(clientData.tcAcceptedDate).toLocaleDateString()}</p>
            )}
          </div>

          {/* Card: Step 3 */}
          <div className={`bg-white rounded-2xl border shadow-sm p-8 transition-all ${
            activeStep === 3 
              ? 'border-blue-500 ring-2 ring-blue-500/10' 
              : clientData.passwordChanged 
              ? 'border-slate-200 opacity-75' 
              : 'border-slate-200 opacity-50 pointer-events-none'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Step 3 — Set permanent password</h3>
                <p className="text-sm text-slate-500 mt-1">Replace your temporary credentials with a secure password</p>
              </div>
              {clientData.passwordChanged && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Complete
                </span>
              )}
            </div>

            {activeStep === 3 && (
              <form onSubmit={handleSetPassword} className="space-y-5">
                {passwordError && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                    <span>{passwordError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="new-pw" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      New Password
                    </label>
                    <input 
                      id="new-pw"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters, 1 number"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-pw" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Confirm Password
                    </label>
                    <input 
                      id="confirm-pw"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!password || !confirmPassword}
                  className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed transition-all"
                >
                  Save & Continue
                </button>
              </form>
            )}
          </div>

          {/* Card: Step 4 */}
          <div className={`bg-white rounded-2xl border shadow-sm p-8 transition-all ${
            activeStep === 4 
              ? 'border-blue-500 ring-2 ring-blue-500/10' 
              : 'border-slate-200 opacity-55 pointer-events-none'
          }`}>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Step 4 — Complete</h3>
            
            {activeStep === 4 && (
              <div className="space-y-6 pt-2">
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm">
                  <div>
                    <strong className="block font-semibold">Onboarding complete!</strong>
                    <span className="text-emerald-700">Welcome to your portal. Your credentials are set and your contract accepted.</span>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOnboarding}
                  className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  Go to dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
