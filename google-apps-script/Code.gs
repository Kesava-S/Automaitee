/**
 * Automaitee Portal — Google Apps Script Web App Backend
 *
 * DEPLOY:
 *   Apps Script editor → Deploy → New deployment
 *   Type: Web App | Execute as: Me | Access: Anyone
 *   Copy the /exec URL → paste into APPSCRIPT_URL in .env.local
 *
 * ONE-TIME SETUP:
 *   1. Set SPREADSHEET_ID below (see comment).
 *   2. Run setupSheets() from the editor to create all required sheets.
 *   3. Add your test client row to "Automaitee Digital".
 */

// ── CONFIG ────────────────────────────────────────────────────────────────────

/**
 * Your Google Spreadsheet ID.
 * Find it in the Sheet URL: docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 *
 * Required when this script is a STANDALONE Apps Script (created from
 * script.google.com).  Leave as '' only if the script is BOUND to the
 * spreadsheet (created via Extensions → Apps Script inside the sheet itself).
 */
var SPREADSHEET_ID = ''; // ← paste your Sheet ID here

/** Name of the sheet that holds client / user records. */
var CLIENT_SHEET = 'Automaitee Digital';

// ── SPREADSHEET HELPER ────────────────────────────────────────────────────────

function getSpreadsheet() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      'Could not open the spreadsheet. ' +
      'Set SPREADSHEET_ID at the top of Code.gs, then redeploy.'
    );
  }
  return ss;
}

// ── ENTRY POINTS ──────────────────────────────────────────────────────────────

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

// ── ROUTER ────────────────────────────────────────────────────────────────────

function handleRequest(e) {
  try {
    // Parse POST body
    var body = {};
    if (e.postData && e.postData.contents) {
      try { body = JSON.parse(e.postData.contents); } catch (_) {}
    }

    // Action: query string param (GET) or body field (POST)
    var action = (e.parameter && e.parameter.action) || body.action || '';

    if (action === 'authenticate')       return jsonResponse(authenticateUser(body.data));
    if (action === 'acceptTerms')        return jsonResponse({ success: true, data: acceptTermsAction(body.data) });
    if (action === 'updatePassword')     return jsonResponse({ success: true, data: updatePasswordAction(body.data) });
    if (action === 'completeOnboarding') return jsonResponse({ success: true, data: completeOnboardingAction(body.data) });

    if (action === 'getUser') {
      var emailParam = (body.data && body.data.email) || (e.parameter && e.parameter.email) || '';
      return jsonResponse({ success: true, data: getUserData(emailParam) });
    }

    if (action === 'checkUser') {
      var checkEmail = (body.data && body.data.email) || (e.parameter && e.parameter.email) || '';
      var found = findClientByEmail(readSheet(CLIENT_SHEET), checkEmail);
      return jsonResponse({ success: true, data: { exists: found !== null } });
    }

    if (action === 'getAll') {
      var allEmail = (e.parameter && e.parameter.email) || (body.data && body.data.email) || '';
      return jsonResponse({ success: true, data: getAllData(allEmail) });
    }
    if (action === 'getClients')       return jsonResponse({ success: true, data: readSheet(CLIENT_SHEET) });
    if (action === 'getRequests')      return jsonResponse({ success: true, data: readSheet('Requests') });
    if (action === 'getInvoices')      return jsonResponse({ success: true, data: readSheet('Invoices') });
    if (action === 'getAnnouncements') return jsonResponse({ success: true, data: readSheet('Announcements') });

    if (action === 'updateClient')       return jsonResponse({ success: true, data: updateClientRow(body.data) });
    if (action === 'createRequest')      return jsonResponse({ success: true, data: appendRow('Requests', body.data) });
    if (action === 'updateRequests')     return jsonResponse({ success: true, data: replaceSheet('Requests', body.data) });
    if (action === 'updateInvoices')     return jsonResponse({ success: true, data: replaceSheet('Invoices', body.data) });
    if (action === 'updateAnnouncements') return jsonResponse({ success: true, data: replaceSheet('Announcements', body.data) });

    return jsonResponse({ success: false, error: 'Unknown action: "' + action + '"' });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ── AUTH ──────────────────────────────────────────────────────────────────────

function authenticateUser(data) {
  if (!data || !data.email) {
    return { success: false, error: 'Email is required' };
  }
  if (!data.password) {
    return { success: false, error: 'Password is required' };
  }

  var clients = readSheet(CLIENT_SHEET);
  var user    = findClientByEmail(clients, data.email);

  if (!user) {
    return { success: false, error: 'No account found for that email address' };
  }

  if (String(user.accountStatus || '').toLowerCase() === 'cancelled') {
    return { success: false, error: 'Account has been cancelled. Please contact support.' };
  }

  var temp    = String(user.temporaryPassword || '').trim();
  var custom  = String(user.customPassword    || '').trim();
  var changed = normBool(user.passwordChanged);
  var input   = String(data.password).trim();

  // First-time login: verify against temporaryPassword.
  // After password change: verify against customPassword only.
  var expected   = changed ? custom : temp;
  var passwordOk = expected !== '' && input === expected;

  if (!passwordOk) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  return { success: true, data: normalizeClient(user) };
}

// ── ONBOARDING MUTATIONS ──────────────────────────────────────────────────────

function acceptTermsAction(data) {
  if (!data || !data.email) throw new Error('Email is required');
  var user = requireClient(data.email);
  var updated = merge(user, {
    name:           data.userName || '',  // legal name from T&C becomes the display name
    tcAccepted:     true,
    tcAcceptedName: data.userName || '',
    tcAcceptedDate: data.tcAcceptedDate || new Date().toISOString(),
  });
  writeRow(CLIENT_SHEET, updated, 'userid');
  return normalizeClient(updated);
}

function updatePasswordAction(data) {
  if (!data || !data.email)  throw new Error('Email is required');
  if (!data.newPassword)     throw new Error('newPassword is required');
  var user = requireClient(data.email);
  var updated = merge(user, {
    customPassword:  data.newPassword,
    passwordChanged: true,
  });
  writeRow(CLIENT_SHEET, updated, 'userid');
  return normalizeClient(updated);
}

function completeOnboardingAction(data) {
  if (!data || !data.email) throw new Error('Email is required');
  var user = requireClient(data.email);
  var updated = merge(user, {
    onboardingComplete: true,
    accountStatus:      'active',
  });
  writeRow(CLIENT_SHEET, updated, 'userid');
  return normalizeClient(updated);
}

function getUserData(email) {
  if (!email) throw new Error('Email is required');
  return normalizeClient(requireClient(email));
}

function updateClientRow(data) {
  if (!data) throw new Error('data is required');
  writeRow(CLIENT_SHEET, toSheetKeys(data), 'userid');
  return data;
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function requireClient(email) {
  var user = findClientByEmail(readSheet(CLIENT_SHEET), email);
  if (!user) throw new Error('No account found for: ' + email);
  return user;
}

function findClientByEmail(rows, email) {
  if (!email) return null;
  var lc = String(email).toLowerCase().trim();
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].email && String(rows[i].email).toLowerCase().trim() === lc) {
      return rows[i];
    }
  }
  return null;
}

/** Shallow-merge: returns a new object with `updates` applied on top of `base`. */
function merge(base, updates) {
  var result = {};
  var keys = Object.keys(base);
  for (var i = 0; i < keys.length; i++) result[keys[i]] = base[keys[i]];
  var ukeys = Object.keys(updates);
  for (var j = 0; j < ukeys.length; j++) result[ukeys[j]] = updates[ukeys[j]];
  return result;
}

/**
 * Map camelCase JS key 'userId' → sheet key 'userid'.
 * All other fields pass through unchanged.
 */
function toSheetKeys(data) {
  var d = merge(data, {});
  if (d.userId !== undefined && d.userid === undefined) {
    d.userid = d.userId;
    delete d.userId;
  }
  return d;
}

/**
 * Return a clean client object using camelCase 'userId' for the frontend.
 * Handles both 'userid' (sheet column) and 'userId' (if already mapped).
 */
function normalizeClient(user) {
  return {
    userId:             String(user.userid || user.userId || ''),
    name:               String(user.name               || ''),
    email:              String(user.email              || ''),
    company:            String(user.company            || ''),
    plan:               String(user.plan               || ''),
    temporaryPassword:  String(user.temporaryPassword  || ''),
    customPassword:     String(user.customPassword     || ''),
    passwordChanged:    normBool(user.passwordChanged),
    tcAccepted:         normBool(user.tcAccepted),
    tcAcceptedName:     String(user.tcAcceptedName     || ''),
    tcAcceptedDate:     user.tcAcceptedDate            || null,
    onboardingComplete: normBool(user.onboardingComplete),
    accountStatus:      String(user.accountStatus      || 'pending'),
    createdAt:          String(user.createdAt          || ''),
    contractExpiryDate: String(user.contractExpiryDate || ''),
    customServices:     Array.isArray(user.customServices) ? user.customServices : [],
    dueNotification:    String(user.dueNotification    || ''),
  };
}

function normBool(val) {
  if (typeof val === 'boolean') return val;
  var s = String(val).toUpperCase().trim();
  return s === 'TRUE' || s === '1' || s === 'YES';
}

// ── SERIALIZATION ─────────────────────────────────────────────────────────────

function serialize(val) {
  if (val === null || val === undefined) return '';
  if (Array.isArray(val) || (typeof val === 'object')) return JSON.stringify(val);
  return val;
}

function deserialize(val) {
  if (typeof val !== 'string' || val.length === 0) return val;
  var t = val.trim();
  if ((t[0] === '[' && t[t.length - 1] === ']') ||
      (t[0] === '{' && t[t.length - 1] === '}')) {
    try { return JSON.parse(t); } catch (_) {}
  }
  return val;
}

// ── SHEET I/O ─────────────────────────────────────────────────────────────────

/**
 * Read all data rows from a sheet as an array of plain objects.
 * Row 1 is always the header. Returns [] when the sheet is missing or empty.
 */
function readSheet(sheetName) {
  var ss    = getSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 1) return []; // no data rows

  var values  = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = values[0];

  var result = [];
  for (var r = 1; r < values.length; r++) {
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      if (headers[c]) obj[headers[c]] = deserialize(values[r][c]);
    }
    result.push(obj);
  }
  return result;
}

function getAllData(email) {
  var clients = readSheet(CLIENT_SHEET);
  var client  = email ? findClientByEmail(clients, email) : null;
  if (!client && clients.length > 0) client = clients[0]; // fallback to first row

  var allRequests      = readSheet('Requests');
  var allInvoices      = readSheet('Invoices');
  var allAnnouncements = readSheet('Announcements');

  // Filter rows that belong to this specific user
  if (client) {
    var uid = String(client.userid || client.userId || '').trim();
    if (uid) {
      allRequests = allRequests.filter(function(r) {
        return String(r.userid || '').trim() === uid;
      });
      allInvoices = allInvoices.filter(function(r) {
        return String(r.userid || '').trim() === uid;
      });
    }
  }

  return {
    client:        client ? normalizeClient(client) : null,
    requests:      allRequests,
    invoices:      allInvoices,
    announcements: allAnnouncements,
  };
}

/**
 * Append a single row to a sheet.
 * Keys in `data` are matched to the header row.
 */
function appendRow(sheetName, data) {
  if (!data) throw new Error('appendRow: data is required');
  var ss    = getSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error('Sheet not found: ' + sheetName);

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var row = [];
  for (var i = 0; i < headers.length; i++) {
    row.push(data[headers[i]] !== undefined ? serialize(data[headers[i]]) : '');
  }
  sheet.appendRow(row);
  return data;
}

/**
 * Find a row by keyColumn value and update it in place.
 * Falls back to appendRow when the row isn't found yet.
 */
function writeRow(sheetName, data, keyColumn) {
  if (!data) throw new Error('writeRow: data is required');
  var ss    = getSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error('Sheet not found: ' + sheetName);

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) return appendRow(sheetName, data);

  var values  = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = values[0];
  var keyIdx  = headers.indexOf(keyColumn);

  if (keyIdx === -1) {
    throw new Error(
      'Key column "' + keyColumn + '" not found in sheet "' + sheetName + '". ' +
      'Run setupSheets() to fix the headers.'
    );
  }

  var keyValue = String(data[keyColumn]);
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][keyIdx]) === keyValue) {
      var newRow = [];
      for (var c = 0; c < headers.length; c++) {
        newRow.push(data[headers[c]] !== undefined ? serialize(data[headers[c]]) : values[i][c]);
      }
      sheet.getRange(i + 1, 1, 1, headers.length).setValues([newRow]);
      return data;
    }
  }

  // Row not found — append as new
  return appendRow(sheetName, data);
}

/**
 * Overwrite all data rows (keeping header) with a new array of objects.
 */
function replaceSheet(sheetName, rows) {
  if (!rows) throw new Error('replaceSheet: rows is required');
  var ss    = getSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error('Sheet not found: ' + sheetName);

  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) return rows;

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
  if (!rows.length) return rows;

  var newData = [];
  for (var r = 0; r < rows.length; r++) {
    var row = [];
    for (var c = 0; c < headers.length; c++) {
      row.push(rows[r][headers[c]] !== undefined ? serialize(rows[r][headers[c]]) : '');
    }
    newData.push(row);
  }
  sheet.getRange(2, 1, newData.length, headers.length).setValues(newData);
  return rows;
}

// ── RESPONSE ──────────────────────────────────────────────────────────────────

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── ONE-TIME SETUP ────────────────────────────────────────────────────────────

/**
 * Run this ONCE from the Apps Script editor (Run → setupSheets) before first use.
 * Creates all four sheets with correct headers if they don't already exist.
 */
function setupSheets() {
  var ss = getSpreadsheet();

  var schemas = {
    'Automaitee Digital': [
      'userid', 'email', 'temporaryPassword', 'customPassword',
      'passwordChanged', 'tcAccepted', 'tcAcceptedName', 'tcAcceptedDate',
      'onboardingComplete', 'accountStatus', 'createdAt',
      'name', 'company', 'plan', 'contractExpiryDate',
      'dueNotification', 'customServices',
    ],
    'Requests': [
      'userid', 'id', 'title', 'type', 'details', 'status', 'submittedDate', 'latestUpdate',
    ],
    'Invoices': [
      'userid', 'id', 'month', 'year', 'amount', 'status', 'dueDate', 'invoiceNumber',
    ],
    'Announcements': [
      'id', 'title', 'content', 'date',
    ],
  };

  var names = Object.keys(schemas);
  for (var i = 0; i < names.length; i++) {
    var name   = names[i];
    var cols   = schemas[name];
    var sheet  = ss.getSheetByName(name) || ss.insertSheet(name);
    sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
  }

  Logger.log('setupSheets complete. Sheets: ' + names.join(', '));
}

/**
 * Quick smoke-test — run from the editor to confirm the script can reach the spreadsheet.
 */
function testConnection() {
  var ss = getSpreadsheet();
  Logger.log('Connected to: ' + ss.getName());
  var sheet = ss.getSheetByName(CLIENT_SHEET);
  if (!sheet) {
    Logger.log('WARNING: Sheet "' + CLIENT_SHEET + '" not found. Run setupSheets() first.');
  } else {
    var rows = readSheet(CLIENT_SHEET);
    Logger.log('Client rows found: ' + rows.length);
  }
}
