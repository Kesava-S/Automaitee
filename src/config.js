/**
 * config.js — client-side configuration.
 *
 * The real Sheets URL and API key now live in server-side env vars
 * (SHEETS_API_URL, SHEETS_API_KEY in .env.local) and are never sent
 * to the browser.
 *
 * The browser only needs to know *whether* Sheets is enabled so it can
 * decide to sync or fall back to localStorage.
 *
 * Set one of these in .env.local to enable Sheets mode:
 *   NEXT_PUBLIC_SHEETS_ENABLED=true        ← preferred (explicit flag)
 *   NEXT_PUBLIC_SHEETS_API_URL=<url>       ← legacy, still supported
 */

const hasSheetsEnabled =
  (typeof process !== 'undefined' &&
    process.env?.NEXT_PUBLIC_SHEETS_ENABLED === 'true') ||
  Boolean(
    typeof process !== 'undefined' &&
      process.env?.NEXT_PUBLIC_SHEETS_API_URL
  );

export const config = {
  /** True → use Google Sheets (via /api/sheets proxy). False → localStorage only. */
  SHEETS_ENABLED: hasSheetsEnabled,

  // Legacy fields kept for any direct consumers (sheetsApi reads these too).
  SHEETS_API_URL: null, // URL lives server-side now; do not use client-side
  SHEETS_API_KEY: null, // Key lives server-side now; do not use client-side
};
