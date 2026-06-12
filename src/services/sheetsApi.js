/**
 * sheetsApi.js
 *
 * Thin client that calls the Next.js proxy at /api/sheets.
 * The proxy forwards server-side to Google Apps Script — no CORS issues,
 * and APPSCRIPT_URL never reaches the browser bundle.
 *
 * Error taxonomy
 * ──────────────
 * SheetsApiError.isServiceError = true   → proxy / network / config problem
 *                               = false  → app-level error (wrong password, etc.)
 *
 * Callers use isServiceError to decide whether to fall back to localStorage.
 */

export class SheetsApiError extends Error {
  constructor(message, status, isServiceError = false) {
    super(message);
    this.name           = 'SheetsApiError';
    this.status         = status;
    this.isServiceError = isServiceError;
  }
}

async function parseResponse(res) {
  // 503 → proxy is up but APPSCRIPT_URL not configured
  if (res.status === 503) {
    throw new SheetsApiError('Sheets not configured (APPSCRIPT_URL missing)', 503, true);
  }
  // 502 → proxy reached Apps Script but got a bad (HTML) response
  if (res.status === 502) {
    let msg = 'Apps Script returned an unexpected response';
    try { const j = await res.json(); msg = j.error ?? msg; } catch (_) {}
    throw new SheetsApiError(msg, 502, true);
  }
  // Any other HTTP error from the proxy itself
  if (!res.ok) {
    throw new SheetsApiError(`Proxy error (HTTP ${res.status})`, res.status, true);
  }

  const json = await res.json();

  // Apps Script returned { success: false } — this is an app-level error (auth failure, etc.)
  if (!json.success) {
    throw new SheetsApiError(json.error ?? 'Unknown error from Apps Script', 422, false);
  }

  return json.data;
}

function proxyUrl(params = {}) {
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  const url  = new URL('/api/sheets', base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  return url.toString();
}

export const sheetsApi = {
  isConfigured() {
    return (
      typeof process !== 'undefined' &&
      (process.env?.NEXT_PUBLIC_SHEETS_ENABLED === 'true' ||
       Boolean(process.env?.NEXT_PUBLIC_SHEETS_API_URL))
    );
  },

  async get(params = {}) {
    const res = await fetch(proxyUrl(params), { cache: 'no-store' });
    return parseResponse(res);
  },

  async post(payload = {}) {
    const res = await fetch(proxyUrl(), {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    return parseResponse(res);
  },
};
