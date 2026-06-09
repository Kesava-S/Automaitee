import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Data imports
import { mockClient } from './data/mockClient';
import { mockRequests } from './data/mockRequests';
import { mockInvoices } from './data/mockInvoices';

// Component imports
import RouteGuard from './components/RouteGuard';
import PortalLayout from './components/PortalLayout';
import AdminLayout from './components/AdminLayout';

// Page imports
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Contract from './pages/Contract';
import Requests from './pages/Requests';
import NewRequest from './pages/NewRequest';
import Invoices from './pages/Invoices';

// Admin Page imports
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';
import AdminRequests from './pages/admin/AdminRequests';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminBilling from './pages/admin/AdminBilling';

const defaultAnnouncements = [
  {
    id: "ann-001",
    title: "System Update: Sync Upgraded",
    content: "The reporting synchronization hooks have been upgraded to the latest protocols for faster response speeds. Please submit a request if you face any issues.",
    date: "2026-06-08"
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [clientData, setClientData] = useState(mockClient);
  const [requests, setRequests] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
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

    // 4. Seed Announcements Data
    const storedAnnouncements = localStorage.getItem('portalAnnouncements');
    if (storedAnnouncements) {
      setAnnouncements(JSON.parse(storedAnnouncements));
    } else {
      localStorage.setItem('portalAnnouncements', JSON.stringify(defaultAnnouncements));
      setAnnouncements(defaultAnnouncements);
    }

    // 5. Check portalSession
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

  // Update requests list (from admin status updates)
  const handleUpdateRequests = (updatedRequests) => {
    setRequests(updatedRequests);
    localStorage.setItem('portalRequests', JSON.stringify(updatedRequests));
  };

  // Update invoices list (from admin billing generation)
  const handleUpdateInvoices = (updatedInvoices) => {
    setInvoices(updatedInvoices);
    localStorage.setItem('portalInvoices', JSON.stringify(updatedInvoices));
  };

  // Update announcements list (from admin broadcasts)
  const handleUpdateAnnouncements = (updatedAnnouncements) => {
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('portalAnnouncements', JSON.stringify(updatedAnnouncements));
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
              currentUser === 'admin-user' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : clientData.onboardingComplete ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            ) : (
              <Login clientData={clientData} onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />

        {/* Protected Client routes wrapped in RouteGuard */}
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

          {/* Post-onboarding Client routes wrapped in PortalLayout */}
          <Route element={<PortalLayout clientData={clientData} onSignOut={handleSignOut} />}>
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  clientData={clientData} 
                  requests={requests} 
                  invoices={invoices} 
                  announcements={announcements}
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

        {/* Protected Admin routes wrapped in AdminLayout */}
        <Route 
          path="/admin" 
          element={
            currentUser === 'admin-user' ? (
              <AdminLayout onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route 
            path="dashboard" 
            element={
              <AdminDashboard 
                clientData={clientData} 
                requests={requests} 
                invoices={invoices} 
                announcements={announcements} 
              />
            } 
          />
          <Route 
            path="clients" 
            element={
              <AdminClients 
                clientData={clientData} 
                onUpdateClient={handleUpdateClient} 
              />
            } 
          />
          <Route 
            path="requests" 
            element={
              <AdminRequests 
                requests={requests} 
                onUpdateRequests={handleUpdateRequests} 
              />
            } 
          />
          <Route 
            path="announcements" 
            element={
              <AdminAnnouncements 
                announcements={announcements} 
                onUpdateAnnouncements={handleUpdateAnnouncements} 
              />
            } 
          />
          <Route 
            path="billing" 
            element={
              <AdminBilling 
                invoices={invoices} 
                onUpdateInvoices={handleUpdateInvoices} 
              />
            } 
          />
        </Route>

        {/* Catch-all redirects */}
        <Route 
          path="/" 
          element={
            currentUser ? (
              currentUser === 'admin-user' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : clientData.onboardingComplete ? (
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
