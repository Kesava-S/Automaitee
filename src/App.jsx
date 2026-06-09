import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Data imports
import { mockClient } from './data/mockClient';
import { mockRequests } from './data/mockRequests';
import { mockInvoices } from './data/mockInvoices';

// Component imports
import RouteGuard from './components/RouteGuard';
import PortalLayout from './components/PortalLayout';

// Page imports
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Contract from './pages/Contract';
import Requests from './pages/Requests';
import NewRequest from './pages/NewRequest';
import Invoices from './pages/Invoices';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [clientData, setClientData] = useState(mockClient);
  const [requests, setRequests] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mount effect to check localStorage state and seed defaults
  useEffect(() => {
    // 1. Seed Client Data
    const storedClient = localStorage.getItem('portalClientData');
    if (storedClient) {
      setClientData(JSON.parse(storedClient));
    } else {
      localStorage.setItem('portalClientData', JSON.stringify(mockClient));
      setClientData(mockClient);
    }

    // 2. Seed Requests Data
    const storedRequests = localStorage.getItem('portalRequests');
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    } else {
      localStorage.setItem('portalRequests', JSON.stringify(mockRequests));
      setRequests(mockRequests);
    }

    // 3. Seed Invoices Data
    const storedInvoices = localStorage.getItem('portalInvoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    } else {
      localStorage.setItem('portalInvoices', JSON.stringify(mockInvoices));
      setInvoices(mockInvoices);
    }

    // 4. Check portalSession
    const session = localStorage.getItem('portalSession');
    if (session) {
      setCurrentUser(session);
    }

    setLoading(false);
  }, []);

  // Update global client record
  const handleUpdateClient = (updatedClient) => {
    setClientData(updatedClient);
    localStorage.setItem('portalClientData', JSON.stringify(updatedClient));
  };

  // Create a new support request
  const handleNewRequest = (newRequest) => {
    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    localStorage.setItem('portalRequests', JSON.stringify(updatedRequests));
  };

  // Authenticate login session
  const handleLoginSuccess = () => {
    const session = localStorage.getItem('portalSession');
    setCurrentUser(session);
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem('portalSession');
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 font-sans">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="font-semibold text-sm">Initializing portal session...</p>
      </div>
    );
  }

  const isPortalPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/portal');

  return (
    <BrowserRouter basename={isPortalPath ? '/portal' : '/'}>
      <Routes>
        {/* Public route */}
        <Route 
          path="/login" 
          element={
            currentUser ? (
              clientData.onboardingComplete ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            ) : (
              <Login clientData={clientData} onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />

        {/* Protected routes wrapped in RouteGuard */}
        <Route element={<RouteGuard currentUser={currentUser} clientData={clientData} />}>
          
          {/* Onboarding route (guarded inside RouteGuard) */}
          <Route 
            path="/onboarding" 
            element={
              <Onboarding 
                clientData={clientData} 
                onUpdateClient={handleUpdateClient} 
              />
            } 
          />

          {/* Post-onboarding routes wrapped in PortalLayout */}
          <Route element={<PortalLayout clientData={clientData} onSignOut={handleSignOut} />}>
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  clientData={clientData} 
                  requests={requests} 
                  invoices={invoices} 
                />
              } 
            />
            <Route 
              path="/contract" 
              element={<Contract clientData={clientData} />} 
            />
            <Route 
              path="/requests" 
              element={<Requests requests={requests} />} 
            />
            <Route 
              path="/requests/new" 
              element={<NewRequest onSubmitRequest={handleNewRequest} />} 
            />
            <Route 
              path="/invoices" 
              element={<Invoices invoices={invoices} />} 
            />
          </Route>
        </Route>

        {/* Catch-all redirects */}
        <Route 
          path="/" 
          element={
            currentUser ? (
              clientData.onboardingComplete ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
