import test from 'node:test';
import assert from 'node:assert/strict';
import { createLeadPayload, createRateLimiter, deliverLead, validateLead } from '../server/lead-service.js';

const validLead = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'Research takes too long.', consent: true };

test('validates a complete lead', () => {
  const result = validateLead(validLead);
  assert.equal(result.valid, true);
  assert.deepEqual(result.value, { ...validLead, website: '' });
});

test('rejects missing consent and malformed email', () => {
  const result = validateLead({ ...validLead, email: 'not-an-email', consent: false });
  assert.equal(result.valid, false);
  assert.equal(result.errors.email, 'A valid email is required');
  assert.equal(result.errors.consent, 'Consent is required');
});

test('marks a honeypot submission invalid', () => {
  assert.equal(validateLead({ ...validLead, website: 'bot' }).valid, false);
});

test('creates a privacy-safe delivery payload', () => {
  const payload = createLeadPayload({ ...validLead, website: '' }, { page: '/#contact', referrer: 'https://example.com' });
  assert.equal(payload.event, 'signal.lead.created');
  assert.equal(payload.source, 'signal-systems-landing');
  assert.equal(payload.lead.email, validLead.email);
  assert.equal(payload.referrer, 'https://example.com');
});

test('rate limiter blocks the sixth request in its window', () => {
  const check = createRateLimiter({ windowMs: 1000, max: 5 });
  for (let i = 0; i < 5; i += 1) assert.equal(check('test-ip').allowed, true);
  assert.equal(check('test-ip').allowed, false);
  assert.equal(check('other-ip').allowed, true);
});

test('delivers a lead to a configured webhook', async () => {
  let received;
  const result = await deliverLead({ event: 'signal.lead.created' }, { webhookUrl: 'https://hooks.example.test', fetchImpl: async (url, options) => { received = { url, options }; return new Response('', { status: 202 }); } });
  assert.equal(result.delivered, true);
  assert.equal(received.url, 'https://hooks.example.test');
  assert.equal(received.options.method, 'POST');
});
