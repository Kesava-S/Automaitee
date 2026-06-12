/**
 * pages/api/sheets.js — proxy to Google Apps Script
 *
 * Why: Google Apps Script can't answer CORS preflight, so the browser
 * calls this same-origin endpoint and we forward server-side.
 *
 * Required in .env.local:
 *   APPSCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *   NEXT_PUBLIC_SHEETS_ENABLED=true
 */

export default async function handler(req, res) {
  // Return 503 (not 500) so sheetsApi.isConfigured() fall-back logic triggers
  if (!process.env.APPSCRIPT_URL) {
    return res.status(503).json({
      success: false,
      error: 'APPSCRIPT_URL not configured — add it to .env.local and restart the server',
    });
  }

  try {
    let upstream;

    if (req.method === 'POST') {
      // Build target URL — no redirect needed for server-to-server Apps Script calls
      upstream = await fetch(process.env.APPSCRIPT_URL, {
        method:   'POST',
        headers:  { 'Content-Type': 'application/json' },
        body:     req.body !== undefined ? JSON.stringify(req.body) : undefined,
        redirect: 'follow',
      });
    } else {
      // GET — forward all query params (?action=getAll, ?email=..., etc.)
      const qs = new URLSearchParams(req.query).toString();
      upstream = await fetch(
        qs ? `${process.env.APPSCRIPT_URL}?${qs}` : process.env.APPSCRIPT_URL,
        { redirect: 'follow' }
      );
    }

    // Apps Script returns text/html when it crashes or isn't deployed with "Anyone" access.
    // Detect this before trying to parse as JSON so we can surface a helpful error.
    const contentType = upstream.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json') && !contentType.includes('text/plain')) {
      const preview = (await upstream.text()).slice(0, 300);
      return res.status(502).json({
        success: false,
        error:   'Apps Script returned a non-JSON response (HTML error page or auth redirect). '
               + 'Ensure the deployment access is set to "Anyone" and setupSheets() has been run.',
        preview,
      });
    }

    const data = await upstream.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(502).json({ success: false, error: err.message });
  }
}
