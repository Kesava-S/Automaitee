import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { AppProvider, useApp } from './context/AppContext';
import RouteGuard from './components/RouteGuard';
import PortalLayout from './components/PortalLayout';
import AdminLayout from './components/AdminLayout';

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────

const Login = lazy(() => import('./pages/Login'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contract = lazy(() => import('./pages/Contract'));
const Requests = lazy(() => import('./pages/Requests'));
const NewRequest = lazy(() => import('./pages/NewRequest'));
const Invoices = lazy(() => import('./pages/Invoices'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminClients = lazy(() => import('./pages/admin/AdminClients'));
const AdminRequests = lazy(() => import('./pages/admin/AdminRequests'));
const AdminAnnouncements = lazy(() => import('./pages/admin/AdminAnnouncements'));
const AdminBilling = lazy(() => import('./pages/admin/AdminBilling'));

// ── Responsive Page Spinner ────────────────────────────────────────────────────

function PageSpinner() {
  return (
    <div className="
      w-full
      h-screen
      min-h-screen
      bg-slate-50
      flex
      flex-col
      items-center
      justify-center
      gap-3
      md:gap-4
      text-slate-500
      font-sans
      px-4
      sm:px-6
      md:px-8
      py-4
      sm:py-6
      md:py-8
    ">
      <Loader2 className="
        h-8
        w-8
        sm:h-10
        sm:w-10
        md:h-12
        md:w-12
        animate-spin
        text-blue-500
      " />
      <div className="text-center space-y-1.5">
        <p className="
          text-sm
          sm:text-base
          md:text-lg
          font-semibold
          text-slate-700
        ">
          Loading…
        </p>
        <p className="
          text-xs
          sm:text-sm
          text-slate-400
        ">
          Please wait while we load your content
        </p>
      </div>
    </div>
  );
}

// ── Responsive Boot Spinner ────────────────────────────────────────────────────

function BootSpinner() {
  return (
    <div className="
      w-full
      h-screen
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      to-slate-100
      flex
      flex-col
      items-center
      justify-center
      gap-4
      md:gap-5
      text-slate-500
      font-sans
      px-4
      sm:px-6
      md:px-8
      py-4
      sm:py-6
      md:py-8
      portal-root
    ">
      <div className="
        h-12
        w-12
        sm:h-14
        sm:w-14
        md:h-16
        md:w-16
        rounded-xl
        sm:rounded-2xl
        md:rounded-3xl
        bg-gradient-to-br
        from-blue-500
        to-blue-600
        flex
        items-center
        justify-center
        shadow-lg
        shadow-blue-500/30
        mb-2
        sm:mb-3
        md:mb-4
      ">
        <Loader2 className="
          h-6
          w-6
          sm:h-7
          sm:w-7
          md:h-8
          md:w-8
          text-white
          animate-spin
        " />
      </div>

      <div className="text-center space-y-2 sm:space-y-3 max-w-xs">
        <p className="
          text-sm
          sm:text-base
          md:text-lg
          font-bold
          text-slate-900
        ">
          Initialising Portal
        </p>
        <p className="
          text-xs
          sm:text-sm
          text-slate-600
        ">
          Connecting to data source
        </p>
        <div className="
          pt-2
          sm:pt-3
          flex
          items-center
          justify-center
          gap-1
          text-slate-400
        ">
          <div className="h-1 w-1 bg-slate-400 rounded-full animate-bounce"></div>
          <div className="h-1 w-1 bg-slate-400 rounded-full animate-bounce delay-100"></div>
          <div className="h-1 w-1 bg-slate-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}

// ── Inner Router (reads from context) ────────────────────────────────────────

function PortalRouter() {
  const {
    currentUser, clientData, loading,
    requests, invoices, announcements,
    handleLoginSuccess, handleSignOut,
    handleAcceptTerms, handleUpdatePassword, handleCompleteOnboarding,
    handleUpdateClient, handleNewRequest,
    handleUpdateRequests, handleUpdateInvoices, handleUpdateAnnouncements,
  } = useApp();

  if (loading || !clientData) return <BootSpinner />;

  const isPortalPath =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/portal');

  const isLoggedIn = Boolean(currentUser);
  const isAdmin = currentUser === 'admin-user';
  const postLoginUrl = isAdmin
    ? '/admin/dashboard'
    : clientData.onboardingComplete
      ? '/dashboard'
      : '/onboarding';

  return (
    <BrowserRouter basename={isPortalPath ? '/portal' : '/'}>
      <Suspense fallback={<PageSpinner />}>
        <Routes>

          {/* ── Public Routes ── */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to={postLoginUrl} replace />
              ) : (
                <Login clientData={clientData} onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          {/* ── Protected Client Routes ── */}
          <Route element={<RouteGuard currentUser={currentUser} clientData={clientData} />}>
            <Route
              path="/onboarding"
              element={
                <Onboarding
                  clientData={clientData}
                  onAcceptTerms={handleAcceptTerms}
                  onUpdatePassword={handleUpdatePassword}
                  onCompleteOnboarding={handleCompleteOnboarding}
                />
              }
            />

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
              <Route path="/contract" element={<Contract clientData={clientData} />} />
              <Route path="/requests" element={<Requests requests={requests} />} />
              <Route path="/requests/new" element={<NewRequest onSubmitRequest={handleNewRequest} />} />
              <Route path="/invoices" element={<Invoices invoices={invoices} />} />
            </Route>
          </Route>

          {/* ── Protected Admin Routes ── */}
          <Route
            path="/admin"
            element={
              isAdmin ? (
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
                <AdminClients clientData={clientData} onUpdateClient={handleUpdateClient} />
              }
            />
            <Route
              path="requests"
              element={
                <AdminRequests requests={requests} onUpdateRequests={handleUpdateRequests} />
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
                <AdminBilling invoices={invoices} onUpdateInvoices={handleUpdateInvoices} />
              }
            />
          </Route>

          {/* ── Catch-all Routes ── */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to={postLoginUrl} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// ── Root Export ────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AppProvider>
      <PortalRouter />
    </AppProvider>
  );
}