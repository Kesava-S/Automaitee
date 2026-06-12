/**
 * AppContext.jsx
 *
 * Single source of truth for the entire portal.
 * Wraps dataService so all pages get consistent state and automatic
 * Google Sheets / localStorage sync.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dataService } from '../services/dataService';

// ─── Context shape ────────────────────────────────────────────────────────────

const AppContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }) {
  const [currentUser,    setCurrentUser]    = useState(null);
  const [clientData,     setClientData]     = useState(null);
  const [requests,       setRequests]       = useState([]);
  const [invoices,       setInvoices]       = useState([]);
  const [announcements,  setAnnouncements]  = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [syncStatus,     setSyncStatus]     = useState('idle'); // idle | syncing | ok | error

  // ── Bootstrap (runs once on mount) ─────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setSyncStatus('syncing');
      try {
        const data = await dataService.bootstrap();
        if (!cancelled) {
          setClientData(data.client);
          setRequests(data.requests);
          setInvoices(data.invoices);
          setAnnouncements(data.announcements);
          setCurrentUser(dataService.getSession());
          setSyncStatus('ok');
        }
      } catch (err) {
        console.error('[AppContext] bootstrap error:', err);
        if (!cancelled) setSyncStatus('error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  // ── Periodic re-sync when Sheets is configured ──────────────────────────────

  useEffect(() => {
    if (syncStatus !== 'ok') return;

    const INTERVAL = 30_000; // 30 s
    const id = setInterval(async () => {
      try {
        const data = await dataService.syncFromSheets();
        if (data) {
          setClientData(data.client);
          setRequests(data.requests);
          setInvoices(data.invoices);
          setAnnouncements(data.announcements);
        }
      } catch { /* silent */ }
    }, INTERVAL);

    return () => clearInterval(id);
  }, [syncStatus]);

  // ── Watchers — auto sign-out on cancelled account ─────────────────────────

  useEffect(() => {
    if (!clientData || !currentUser || currentUser === 'admin-user') return;
    if (clientData.accountStatus === 'cancelled') {
      handleSignOut();
    }
  }, [clientData?.accountStatus]);

  // ── Auth ───────────────────────────────────────────────────────────────────

  const handleLoginSuccess = useCallback((updatedUser) => {
    // If authenticate returned a fresh user object, sync it into state
    if (updatedUser) setClientData(updatedUser);
    setCurrentUser(dataService.getSession());
  }, []);

  const handleSignOut = useCallback(() => {
    dataService.clearSession();
    setCurrentUser(null);
  }, []);

  // ── Onboarding-specific handlers ───────────────────────────────────────────

  /**
   * Step 2 — Accept Terms & Conditions.
   * Called from Onboarding.jsx with (email, legalName, isoDateString).
   */
  const handleAcceptTerms = useCallback(async (email, userName, tcAcceptedDate) => {
    const updated = await dataService.acceptTerms(email, userName, tcAcceptedDate);
    setClientData(updated);
    return updated;
  }, []);

  /**
   * Step 3 — Set permanent password.
   * Called from Onboarding.jsx with (email, newPassword).
   */
  const handleUpdatePassword = useCallback(async (email, newPassword) => {
    const updated = await dataService.updatePassword(email, newPassword);
    setClientData(updated);
    return updated;
  }, []);

  /**
   * Step 4 — Mark onboarding complete.
   * Called from Onboarding.jsx with (email).
   */
  const handleCompleteOnboarding = useCallback(async (email) => {
    const updated = await dataService.completeOnboarding(email);
    setClientData(updated);
    return updated;
  }, []);

  // ── Generic client update (used by admin panel) ────────────────────────────

  const handleUpdateClient = useCallback(async (updated) => {
    setClientData(updated);
    await dataService.updateClient(updated);
  }, []);

  // ── Requests ───────────────────────────────────────────────────────────────

  const handleNewRequest = useCallback(async (newReq) => {
    // Attach the logged-in user's ID so the sheet can filter per-client
    const reqWithUser = { ...newReq, userid: clientData?.userId ?? '' };
    const updated = await dataService.createRequest(reqWithUser);
    setRequests(updated);
  }, [clientData?.userId]);

  const handleUpdateRequests = useCallback(async (updatedReqs) => {
    setRequests(updatedReqs);
    await dataService.updateRequests(updatedReqs);
  }, []);

  // ── Invoices ───────────────────────────────────────────────────────────────

  const handleUpdateInvoices = useCallback(async (updatedInvs) => {
    setInvoices(updatedInvs);
    await dataService.updateInvoices(updatedInvs);
  }, []);

  // ── Announcements ──────────────────────────────────────────────────────────

  const handleUpdateAnnouncements = useCallback(async (updatedAnns) => {
    setAnnouncements(updatedAnns);
    await dataService.updateAnnouncements(updatedAnns);
  }, []);

  // ── Context value ──────────────────────────────────────────────────────────

  const value = {
    // State
    currentUser,
    clientData,
    requests,
    invoices,
    announcements,
    loading,
    syncStatus,

    // Computed helpers
    isAdmin:  currentUser === 'admin-user',
    isClient: currentUser && currentUser !== 'admin-user',

    // Auth
    handleLoginSuccess,
    handleSignOut,

    // Onboarding — specific per-step handlers
    handleAcceptTerms,
    handleUpdatePassword,
    handleCompleteOnboarding,

    // Generic (admin panel)
    handleUpdateClient,

    // Data
    handleNewRequest,
    handleUpdateRequests,
    handleUpdateInvoices,
    handleUpdateAnnouncements,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
