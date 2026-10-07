const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync('src/lib/send-email.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
function load(env, fetch = () => assert.fail('Unexpected request'), send = () => assert.fail('Unexpected EmailJS send')) {
  const exports = {};
  vm.runInNewContext(source, { exports, AbortSignal, process: { env }, fetch,
    require: () => ({ default: { send } }),
  });
  return exports.sendContactEmail;
}
const data = { name: ' Ana ', email: ' ana@example.test ', message: ' Olá ', interest: 'demo' };

test('Web3Forms-only configuration sends a valid bounded request with product context', async () => {
  let calls = 0;
  await load({ NEXT_PUBLIC_WEB3FORMS_KEY: 'public-test-key' }, async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.web3forms.com/submit');
    assert.equal(options.method, 'POST');
    assert.ok(options.signal instanceof AbortSignal);
    const payload = JSON.parse(options.body);
    assert.equal(payload.access_key, 'public-test-key');
    assert.equal(payload.name, 'Ana');
    assert.equal(payload.email, 'ana@example.test');
    assert.equal(payload.message, 'Interesse: Demonstração de produto — TimeEasier\n\nOlá');
    return Response.json({ success: true });
  })(data, 'TimeEasier');
  assert.equal(calls, 1);
});

test('complete EmailJS configuration keeps using its configured template', async () => {
  let calls = 0;
  await load({ NEXT_PUBLIC_EMAILJS_SERVICE_ID: 'service', NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: 'template',
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'key', NEXT_PUBLIC_WEB3FORMS_KEY: 'fallback',
  }, undefined, async (service, template, payload, options) => {
    calls++;
    assert.equal(service, 'service');
    assert.equal(template, 'template');
    assert.equal(payload.reply_to, 'ana@example.test');
    assert.equal(options.publicKey, 'key');
  })(data);
  assert.equal(calls, 1);
});

test('partial EmailJS configuration falls back to Web3Forms', async () => {
  await load({ NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'key', NEXT_PUBLIC_WEB3FORMS_KEY: 'fallback' },
    async () => Response.json({ success: true }))(data);
});

test('missing configuration, provider errors and network failures never report success', async () => {
  await assert.rejects(load({})(data), /unavailable/);
  for (const fetch of [
    async () => Response.json({ success: false }),
    async () => Response.json({ success: true }, { status: 500 }),
    async () => new Response('not JSON'),
    async () => { throw new DOMException('Timeout', 'TimeoutError'); },
  ]) await assert.rejects(load({ NEXT_PUBLIC_WEB3FORMS_KEY: 'key' }, fetch)(data));
});
