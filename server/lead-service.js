const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 120, email: 240, message: 4000 };

export function validateLead(input = {}) {
  const name = String(input.name ?? '').trim();
  const email = String(input.email ?? '').trim().toLowerCase();
  const message = String(input.message ?? '').trim();
  const consent = input.consent === true;
  const website = String(input.website ?? '').trim();
  const errors = {};

  if (!name) errors.name = 'Name is required';
  if (!email || !EMAIL_PATTERN.test(email)) errors.email = 'A valid email is required';
  if (!message) errors.message = 'A short description is required';
  if (!consent) errors.consent = 'Consent is required';
  for (const [field, limit] of Object.entries(MAX_LENGTHS)) {
    if (String(input[field] ?? '').length > limit) errors[field] = `${field} is too long`;
  }

  return { valid: Object.keys(errors).length === 0 && !website, errors, value: { name, email, message, consent, website } };
}

export function createLeadPayload(lead, request = {}) {
  return {
    event: 'signal.lead.created',
    receivedAt: new Date().toISOString(),
    source: 'signal-systems-landing',
    page: request.page || '/',
    referrer: request.referrer || '',
    lead: { name: lead.name, email: lead.email, message: lead.message, consent: lead.consent },
  };
}

export function createRateLimiter({ windowMs = 10 * 60 * 1000, max = 5 } = {}) {
  const requests = new Map();
  return (key) => {
    const now = Date.now();
    const active = (requests.get(key) || []).filter((timestamp) => now - timestamp < windowMs);
    active.push(now);
    requests.set(key, active);
    return { allowed: active.length <= max, retryAfter: Math.max(1, Math.ceil((windowMs - (now - active[0])) / 1000)) };
  };
}

export async function deliverLead(payload, { webhookUrl = process.env.LEAD_WEBHOOK_URL, fetchImpl = fetch } = {}) {
  if (!webhookUrl) return { delivered: false, configured: false };
  const response = await fetchImpl(webhookUrl, { method: 'POST', headers: { 'content-type': 'application/json', 'x-signal-event': payload.event }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(`Lead webhook returned ${response.status}`);
  return { delivered: true, configured: true };
}
