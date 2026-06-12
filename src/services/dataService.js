/**
 * dataService.js
 *
 * Business-logic CRUD layer.
 *
 * Strategy:
 *   1. If Google Sheets API is configured → use sheetsApi (source of truth).
 *   2. Otherwise → use localStorage (offline / demo mode).
 *
 * Both paths expose the same interface so the rest of the app never knows
 * which backend is active.
 */

import { sheetsApi, SheetsApiError } from './sheetsApi';
import { mockClient } from '../data/mockClient';
import { mockRequests } from '../data/mockRequests';
import { mockInvoices } from '../data/mockInvoices';

// ─── localStorage keys ────────────────────────────────────────────────────────

const LS = {
  CLIENT:        'portalClientData',
  REQUESTS:      'portalRequests',
  INVOICES:      'portalInvoices',
  ANNOUNCEMENTS: 'portalAnnouncements',
  SESSION:       'portalSession',
};

// ─── Default announcements ────────────────────────────────────────────────────

const DEFAULT_ANNOUNCEMENTS = [
  {
    id:      'ann-001',
    title:   'System Update: Sync Upgraded',
    content: 'The reporting synchronization hooks have been upgraded to the latest protocols for faster response speeds. Please submit a request if you face any issues.',
    date:    '2026-06-08',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function lsSeed(key, seedValue) {
  if (!localStorage.getItem(key)) lsSet(key, seedValue);
  return lsGet(key, seedValue);
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const dataService = {

  // ── Bootstrap ──────────────────────────────────────────────────────────────

  async bootstrap() {
    if (sheetsApi.isConfigured()) {
      try {
        // Pass the cached user's email so the sheet returns the correct client row
        const cached = lsGet(LS.CLIENT, null);
        const email  = (cached?.email ?? '').trim().toLowerCase();
        const params = { action: 'getAll', ...(email ? { email } : {}) };
        const data   = await sheetsApi.get(params);
        lsSet(LS.CLIENT,        data.client);
        lsSet(LS.REQUESTS,      data.requests);
        lsSet(LS.INVOICES,      data.invoices);
        lsSet(LS.ANNOUNCEMENTS, data.announcements);
        return data;
      } catch (err) {
        console.warn('[dataService] Sheets bootstrap failed, using localStorage:', err.message);
      }
    }

    // Always refresh client seed so credential changes in mockClient.js take effect.
    // Other data (requests, invoices) only seeded once so demo edits persist.
    lsSet(LS.CLIENT, mockClient);
    return {
      client:        mockClient,
      requests:      lsSeed(LS.REQUESTS,      mockRequests),
      invoices:      lsSeed(LS.INVOICES,      mockInvoices),
      announcements: lsSeed(LS.ANNOUNCEMENTS, DEFAULT_ANNOUNCEMENTS),
    };
  },

  // ── Authentication ─────────────────────────────────────────────────────────

  /**
   * Authenticate a user by email + password.
   * Returns { success: true, user: clientObject } or { success: false, error: string }.
   *
   * When Sheets is configured, validates against live sheet data.
   * Falls back to localStorage / mockClient in demo mode.
   */
  async authenticate(email, password) {
    if (sheetsApi.isConfigured()) {
      try {
        const userData = await sheetsApi.post({ action: 'authenticate', data: { email, password } });
        lsSet(LS.CLIENT, userData);
        return { success: true, user: userData };
      } catch (err) {
        // isServiceError = true  → proxy/network/config problem → fall through to local fallback
        // isServiceError = false → Apps Script returned a real auth error → surface it
        if (err instanceof SheetsApiError && !err.isServiceError) {
          return { success: false, error: err.message };
        }
        // Service is down — fall through to local auth below
        console.warn('[dataService] Sheets auth unavailable, using local fallback:', err.message);
      }
    }

    // Local fallback: demo mode OR Sheets service temporarily unreachable
    const client = lsGet(LS.CLIENT, mockClient);
    if (client && email.trim().toLowerCase() === (client.email ?? '').trim().toLowerCase()) {
      const expected = client.passwordChanged ? client.customPassword : client.temporaryPassword;
      if (password.trim() === (expected || '').trim()) {
        return { success: true, user: client };
      }
    }
    return { success: false, error: 'Incorrect email or password. Please try again.' };
  },

  // ── Onboarding-specific mutations ──────────────────────────────────────────

  /**
   * Accept Terms & Conditions.
   * Writes tcAccepted / tcAcceptedName / tcAcceptedDate to Sheets then returns
   * the updated client object so the caller can update React state.
   */
  async acceptTerms(email, userName, tcAcceptedDate) {
    // Optimistic local update first
    const client  = lsGet(LS.CLIENT, mockClient);
    const updated = { ...client, tcAccepted: true, tcAcceptedName: userName, tcAcceptedDate };
    lsSet(LS.CLIENT, updated);

    if (sheetsApi.isConfigured()) {
      try {
        const result = await sheetsApi.post({
          action: 'acceptTerms',
          data:   { email, userName, tcAcceptedDate },
        });
        if (result) {
          lsSet(LS.CLIENT, result);
          return result;
        }
      } catch (err) {
        console.warn('[dataService] acceptTerms sheets error:', err.message);
      }
    }
    return updated;
  },

  /**
   * Set a permanent password and mark passwordChanged = true.
   */
  async updatePassword(email, newPassword) {
    const client  = lsGet(LS.CLIENT, mockClient);
    const updated = { ...client, customPassword: newPassword, passwordChanged: true };
    lsSet(LS.CLIENT, updated);

    if (sheetsApi.isConfigured()) {
      try {
        const result = await sheetsApi.post({
          action: 'updatePassword',
          data:   { email, newPassword },
        });
        if (result) {
          lsSet(LS.CLIENT, result);
          return result;
        }
      } catch (err) {
        console.warn('[dataService] updatePassword sheets error:', err.message);
      }
    }
    return updated;
  },

  /**
   * Mark onboarding complete and set accountStatus = active.
   */
  async completeOnboarding(email) {
    const client  = lsGet(LS.CLIENT, mockClient);
    const updated = { ...client, onboardingComplete: true, accountStatus: 'active' };
    lsSet(LS.CLIENT, updated);

    if (sheetsApi.isConfigured()) {
      try {
        const result = await sheetsApi.post({
          action: 'completeOnboarding',
          data:   { email },
        });
        if (result) {
          lsSet(LS.CLIENT, result);
          return result;
        }
      } catch (err) {
        console.warn('[dataService] completeOnboarding sheets error:', err.message);
      }
    }
    return updated;
  },

  // ── Generic client update (used by admin panel) ────────────────────────────

  async updateClient(updatedClient) {
    lsSet(LS.CLIENT, updatedClient);
    if (sheetsApi.isConfigured()) {
      try {
        await sheetsApi.post({ action: 'updateClient', data: updatedClient });
      } catch (err) {
        console.warn('[dataService] updateClient sheets error:', err.message);
      }
    }
    return updatedClient;
  },

  getClientLocal() {
    return lsGet(LS.CLIENT, mockClient);
  },

  // ── User lookup helpers ────────────────────────────────────────────────────

  async getUser(email) {
    if (sheetsApi.isConfigured()) {
      try {
        return await sheetsApi.get({ action: 'getUser', email });
      } catch (err) {
        console.warn('[dataService] getUser sheets error:', err.message);
      }
    }
    return lsGet(LS.CLIENT, mockClient);
  },

  async checkUserExists(email) {
    if (sheetsApi.isConfigured()) {
      try {
        const result = await sheetsApi.get({ action: 'checkUser', email });
        return result?.exists ?? false;
      } catch {
        return false;
      }
    }
    const client = lsGet(LS.CLIENT, mockClient);
    return Boolean(client && client.email.toLowerCase() === email.toLowerCase());
  },

  // ── Requests ───────────────────────────────────────────────────────────────

  async createRequest(newRequest) {
    const current = lsGet(LS.REQUESTS, []);
    const updated = [newRequest, ...current];
    lsSet(LS.REQUESTS, updated);
    if (sheetsApi.isConfigured()) {
      try {
        await sheetsApi.post({ action: 'createRequest', data: newRequest });
      } catch (err) {
        console.warn('[dataService] createRequest sheets error:', err.message);
      }
    }
    return updated;
  },

  async updateRequests(updatedRequests) {
    lsSet(LS.REQUESTS, updatedRequests);
    if (sheetsApi.isConfigured()) {
      try {
        await sheetsApi.post({ action: 'updateRequests', data: updatedRequests });
      } catch (err) {
        console.warn('[dataService] updateRequests sheets error:', err.message);
      }
    }
    return updatedRequests;
  },

  // ── Invoices ───────────────────────────────────────────────────────────────

  async updateInvoices(updatedInvoices) {
    lsSet(LS.INVOICES, updatedInvoices);
    if (sheetsApi.isConfigured()) {
      try {
        await sheetsApi.post({ action: 'updateInvoices', data: updatedInvoices });
      } catch (err) {
        console.warn('[dataService] updateInvoices sheets error:', err.message);
      }
    }
    return updatedInvoices;
  },

  // ── Announcements ──────────────────────────────────────────────────────────

  async updateAnnouncements(updatedAnnouncements) {
    lsSet(LS.ANNOUNCEMENTS, updatedAnnouncements);
    if (sheetsApi.isConfigured()) {
      try {
        await sheetsApi.post({ action: 'updateAnnouncements', data: updatedAnnouncements });
      } catch (err) {
        console.warn('[dataService] updateAnnouncements sheets error:', err.message);
      }
    }
    return updatedAnnouncements;
  },

  // ── Session ────────────────────────────────────────────────────────────────

  getSession()         { return localStorage.getItem(LS.SESSION); },
  setSession(userId)   { localStorage.setItem(LS.SESSION, userId); },
  clearSession()       { localStorage.removeItem(LS.SESSION); },

  // ── Sync from Sheets ───────────────────────────────────────────────────────

  async syncFromSheets() {
    if (!sheetsApi.isConfigured()) return null;
    const cached = lsGet(LS.CLIENT, null);
    const email  = (cached?.email ?? '').trim().toLowerCase();
    const params = { action: 'getAll', ...(email ? { email } : {}) };
    const data   = await sheetsApi.get(params);
    lsSet(LS.CLIENT,        data.client);
    lsSet(LS.REQUESTS,      data.requests);
    lsSet(LS.INVOICES,      data.invoices);
    lsSet(LS.ANNOUNCEMENTS, data.announcements);
    return data;
  },
};
