import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLeadPayload, createRateLimiter, deliverLead, validateLead } from './lead-service.js';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = join(root, 'dist');
const port = Number(process.env.PORT || 4173);
const limit = createRateLimiter();
const contentTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };

function json(response, status, body, headers = {}) { response.writeHead(status, { 'content-type': 'application/json', ...headers }); response.end(JSON.stringify(body)); }

async function readJson(request) {
  let raw = '';
  for await (const chunk of request) raw += chunk;
  if (raw.length > 12000) throw new Error('Payload too large');
  return JSON.parse(raw || '{}');
}

const server = createServer(async (request, response) => {
  try {
    if (request.url === '/api/leads' && request.method === 'POST') {
      const ip = request.socket.remoteAddress || 'unknown';
      const rate = limit(ip);
      if (!rate.allowed) return json(response, 429, { error: 'Too many requests' }, { 'retry-after': rate.retryAfter });
      const body = await readJson(request);
      const result = validateLead(body);
      if (!result.valid) return json(response, 400, { error: 'Please check the submitted fields', fields: result.errors });
      if (result.value.website) { response.writeHead(204); return response.end(); }
      const delivery = await deliverLead(createLeadPayload(result.value, { page: body.page, referrer: request.headers.referer }));
      if (!delivery.configured) return json(response, 503, { error: 'Lead delivery is not configured' });
      return json(response, 202, { ok: true });
    }
    if (!['GET', 'HEAD'].includes(request.method)) return json(response, 405, { error: 'Method not allowed' });
    const requested = normalize(join(dist, new URL(request.url, 'http://localhost').pathname));
    let file = requested.startsWith(dist) ? requested : join(dist, 'index.html');
    let body;
    try { body = await readFile(file); } catch { file = join(dist, 'index.html'); body = await readFile(file); }
    response.writeHead(200, { 'content-type': contentTypes[extname(file)] || 'application/octet-stream', 'cache-control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    if (error instanceof SyntaxError || error.message === 'Payload too large') return json(response, 400, { error: 'Invalid request' });
    console.error(error);
    return json(response, 500, { error: 'Internal server error' });
  }
});

server.listen(port, () => console.log(`Signal Systems production server running at http://localhost:${port}`));
