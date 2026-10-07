const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { NextResponse } = require('next/server');

function load(file, overrides = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(source, {
    exports, URL, AbortSignal, console: { error() {} },
    require: name => name === '@/lib/instagram' ? instagram : { NextResponse },
    ...overrides,
  }, { filename: file });
  return exports;
}
const instagram = load('src/lib/instagram.ts');
const post = { id: '123', media_url: 'https://scontent.cdninstagram.com/image.jpg',
  permalink: 'https://www.instagram.com/p/123/', caption: 'A'.repeat(200) };
const env = { INSTAGRAM_ACCESS_TOKEN: 'private-test-token', INSTAGRAM_USER_ID: '12345' };
function route(fetch, environment = env) {
  return load('src/app/api/instagram/route.ts', { fetch, process: { env: environment } });
}

test('URL validation rejects script schemes, deceptive hosts, credentials and ports', () => {
  for (const value of ['javascript:alert(1)', 'http://instagram.com/p/x',
    'https://instagram.com.evil.test/p/x', 'https://evilinstagram.com',
    'https://user:pass@instagram.com/p/x', 'https://instagram.com:8443/p/x', null]) {
    assert.equal(instagram.safeInstagramUrl(value), '');
  }
  assert.equal(instagram.safeInstagramUrl('https://www.instagram.com/p/x'), 'https://www.instagram.com/p/x');
  assert.equal(instagram.safeInstagramUrl('https://scontent.cdninstagram.com/x', true), 'https://scontent.cdninstagram.com/x');
  assert.equal(instagram.safeInstagramUrl('https://cdninstagram.com.evil.test/x', true), '');
});

test('missing configuration returns empty posts without exposing environment details', async () => {
  const response = await route(() => assert.fail('No upstream request expected'), {}).GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { posts: [] });
});

test('invalid account identifiers fail before an upstream request', async () => {
  const response = await route(() => assert.fail('No upstream request expected'), {
    ...env, INSTAGRAM_USER_ID: '../invalid?access_token=injected',
  }).GET();
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('upstream credentials use headers, successful posts are bounded and unsafe links are dropped', async () => {
  const response = await route(async (url, options) => {
    assert.equal(url.searchParams.has('access_token'), false);
    assert.equal(options.headers.Authorization, 'Bearer private-test-token');
    assert.equal(options.next.revalidate, 3600);
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ data: [post, { ...post, permalink: 'javascript:alert(1)' },
      { ...post, media_url: 'https://evil.test/pixel' }, null,
      { ...post, id: 'last' }, { ...post, id: 'outside-limit' }] });
  }).GET();
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.count, 2);
  assert.equal(data.posts[0].caption.length, 150);
  assert.equal(data.posts[1].id, 'last');
  assert.ok(response.headers.get('cache-control').includes('s-maxage=3600'));
});

test('videos prefer thumbnail images', async () => {
  const response = await route(async () => Response.json({ data: [{ ...post,
    media_type: 'VIDEO', thumbnail_url: 'https://scontent.fbcdn.net/thumbnail.jpg' }] })).GET();
  assert.equal((await response.json()).posts[0].imageUrl, 'https://scontent.fbcdn.net/thumbnail.jpg');
});

test('provider errors, malformed responses and timeouts return private non-cacheable failures', async () => {
  for (const fetch of [
    async () => new Response('secret upstream details private-test-token', { status: 400 }),
    async () => Response.json({ data: {}, error: { message: 'secret' } }),
    async () => new Response('not JSON'),
    async () => { throw new DOMException('secret timeout', 'TimeoutError'); },
  ]) {
    const response = await route(fetch).GET();
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await response.json(), { posts: [], error: 'Instagram unavailable' });
  }
});
