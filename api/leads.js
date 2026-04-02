import { createLeadPayload, createRateLimiter, deliverLead, validateLead } from '../server/lead-service.js';

const limit = createRateLimiter();

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const ip = request.headers['x-forwarded-for']?.split(',')[0]?.trim() || request.socket?.remoteAddress || 'unknown';
  const rate = limit(ip);
  if (!rate.allowed) { response.setHeader('retry-after', String(rate.retryAfter)); return response.status(429).json({ error: 'Too many requests' }); }

  const result = validateLead(request.body);
  if (result.value.website) return response.status(204).end();
  if (!result.valid) return response.status(400).json({ error: 'Please check the submitted fields', fields: result.errors });

  try {
    const delivery = await deliverLead(createLeadPayload(result.value, { page: request.body.page, referrer: request.headers.referer }));
    if (!delivery.configured) return response.status(503).json({ error: 'Lead delivery is not configured' });
    return response.status(202).json({ ok: true });
  } catch (error) {
    console.error('Lead delivery failed', error);
    return response.status(502).json({ error: 'Lead delivery is temporarily unavailable' });
  }
}
