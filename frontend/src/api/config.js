// API Base URL — persisted in localStorage
const DEFAULT_API_BASE = 'http://localhost:8083';

export function getApiBase() {
  return localStorage.getItem('budgetApiBase') || DEFAULT_API_BASE;
}

export function setApiBase(url) {
  localStorage.setItem('budgetApiBase', url.trim().replace(/\/$/, ''));
}

// Force-update if user still has old 8080 default stored
(function migrateOldDefault() {
  const stored = localStorage.getItem('budgetApiBase');
  if (stored === 'http://localhost:8080') {
    localStorage.setItem('budgetApiBase', DEFAULT_API_BASE);
  }
})();

export async function apiFetch(url, opts = {}) {
  const base = getApiBase();
  const fullUrl = base + url;
  console.log('[BudgetFlow] API →', opts.method || 'GET', fullUrl);

  let res;
  try {
    res = await fetch(fullUrl, {
      headers: { 'Content-Type': 'application/json' },
      ...opts,
    });
  } catch (err) {
    // Network error / CORS blocked / backend down
    console.error('[BudgetFlow] Network error:', err.message);
    throw new Error('Cannot reach backend at ' + base + '. Is the server running?');
  }

  if (!res.ok) {
    let detail = res.status + ' ' + res.statusText;
    try {
      const body = await res.text();
      if (body) detail += ' — ' + body.substring(0, 200);
    } catch {}
    console.error('[BudgetFlow] API error:', detail);
    throw new Error(detail);
  }

  return res.json();
}
