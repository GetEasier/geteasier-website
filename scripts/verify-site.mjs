// Verificação do site construído: `npm run build && npm run verify`.
// Arranca `next start` numa porta livre (ou usa BASE_URL), percorre todas as páginas do sitemap e as
// páginas legais com o Playwright a 390 px, a 1440 px e com "reduzir movimento", e falha (exit 1) se:
// - houver erros ou avisos na consola, pedidos falhados ou respostas 4xx/5xx;
// - o título ou a descrição faltarem, saírem dos limites (título ≤ 60; descrição 120–155) ou se repetirem;
// - o canonical faltar ou não for o URL da página;
// - houver mais de um h1 (ou nenhum) ou imagens sem alt;
// - algum JSON-LD for inválido;
// - alguma ligação interna não devolver 200;
// - um URL desconhecido não devolver 404, ou a 404 não tiver noindex (ou tiver canonical);
// - os breadcrumbs visíveis não coincidirem com o BreadcrumbList;
// - houver scroll horizontal.
// Capturas de ecrã em .verify/screens (ignorado pelo git).
//
// Variáveis: BASE_URL (servidor já a correr), PW_CHROMIUM (caminho do Chromium, opcional).

import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { createServer } from 'node:net'
import { chromium } from 'playwright'

const SITE_URL = 'https://geteasier.pt'
const SHOTS = '.verify/screens'
const LEGAL = ['/privacy-policy', '/terms-and-conditions']
const UNKNOWN = ['/esta-pagina-nao-existe', '/en/this-page-does-not-exist', '/time-easier/xyz']
const VIEWS = [
  { name: 'm390', viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' },
  { name: 'd1440', viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' },
  { name: 'rm390', viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' },
]

const failures = []
const fail = (where, msg) => failures.push(`${where}: ${msg}`)

function freePort() {
  return new Promise((resolve) => {
    const s = createServer()
    s.listen(0, () => {
      const { port } = s.address()
      s.close(() => resolve(port))
    })
  })
}

async function waitFor(url, ms = 30000) {
  const end = Date.now() + ms
  while (Date.now() < end) {
    try {
      const r = await fetch(url)
      if (r.status < 500) return
    } catch {}
    await new Promise((r) => setTimeout(r, 300))
  }
  throw new Error(`O servidor não respondeu em ${url}`)
}

let server
let BASE = process.env.BASE_URL?.replace(/\/$/, '')
if (!BASE) {
  const port = await freePort()
  BASE = `http://localhost:${port}`
  server = spawn('npx', ['next', 'start', '-p', String(port)], { stdio: 'ignore', detached: true })
  await waitFor(BASE)
}

const toPath = (u) => {
  const url = new URL(u, BASE)
  return url.pathname + url.search
}
const canonicalFor = (path) => (path === '/' ? SITE_URL : SITE_URL + path)

try {
  // 1. Sitemap e robots
  const sitemapRes = await fetch(`${BASE}/sitemap.xml`)
  if (sitemapRes.status !== 200) fail('/sitemap.xml', `estado ${sitemapRes.status}`)
  const sitemap = await sitemapRes.text()
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (!locs.length) fail('/sitemap.xml', 'sem URLs')
  if (/<priority>|<changefreq>/.test(sitemap)) fail('/sitemap.xml', 'tem priority ou changefreq')
  const pages = [...new Set([...locs.map((l) => (l === SITE_URL ? '/' : l.replace(SITE_URL, ''))), ...LEGAL])]

  const robots = await fetch(`${BASE}/robots.txt`)
  if (robots.status !== 200 || !(await robots.text()).includes(`${SITE_URL}/sitemap.xml`)) fail('/robots.txt', 'em falta ou sem sitemap')

  // 2. URLs desconhecidos
  for (const u of UNKNOWN) {
    const r = await fetch(BASE + u)
    const html = await r.text()
    if (r.status !== 404) fail(u, `devolve ${r.status} em vez de 404`)
    if (!/<meta name="robots" content="[^"]*noindex/.test(html)) fail(u, '404 sem noindex')
    if (/rel="canonical"/.test(html)) fail(u, '404 com canonical')
    if (locs.some((l) => l.endsWith(u))) fail(u, '404 está no sitemap')
  }

  // 3. Páginas no browser
  mkdirSync(SHOTS, { recursive: true })
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {})
  const titles = new Map()
  const descriptions = new Map()
  const internal = new Set()

  for (const view of VIEWS) {
    const context = await browser.newContext({ viewport: view.viewport, reducedMotion: view.reducedMotion })
    for (const path of pages) {
      const where = `${path} [${view.name}]`
      const page = await context.newPage()
      page.on('console', (m) => {
        if (m.type() === 'error' || m.type() === 'warning') fail(where, `consola ${m.type()}: ${m.text()}`)
      })
      page.on('pageerror', (e) => fail(where, `erro de JS: ${e.message}`))
      page.on('requestfailed', (r) => {
        // Pedidos de pré-carregamento cancelados pela própria navegação não são falhas.
        if (!/ERR_ABORTED/.test(r.failure()?.errorText ?? '')) fail(where, `pedido falhado: ${r.url()} ${r.failure()?.errorText}`)
      })
      page.on('response', (r) => {
        if (r.status() >= 400) fail(where, `${r.status()} em ${r.url()}`)
      })

      const res = await page.goto(BASE + path, { waitUntil: 'networkidle' })
      if (!res || res.status() !== 200) fail(where, `estado ${res?.status()}`)

      const info = await page.evaluate(() => {
        const meta = (sel) => document.querySelector(sel)?.getAttribute('content') ?? null
        const crumbNav = document.querySelector('nav[aria-label="Caminho de navegação"], nav[aria-label="Breadcrumb"]')
        return {
          lang: document.documentElement.lang,
          title: document.title,
          description: meta('meta[name="description"]'),
          robots: meta('meta[name="robots"]'),
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
          h1: document.querySelectorAll('h1').length,
          imgNoAlt: [...document.querySelectorAll('img:not([alt])')].map((i) => i.getAttribute('src')),
          jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
          crumbs: crumbNav
            ? [...crumbNav.querySelectorAll('li')].map((li) => ({
                name: li.querySelector('a, [aria-current="page"]')?.textContent?.trim() ?? '',
                href: li.querySelector('a')?.getAttribute('href') ?? null,
                current: !!li.querySelector('[aria-current="page"]'),
              }))
            : null,
          links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
          overflow: document.documentElement.scrollWidth > window.innerWidth,
        }
      })

      if (view.name === 'd1440') {
        // Metadados: basta verificar uma vez por página.
        const expectLang = path === '/en' || path.startsWith('/en/') ? 'en' : 'pt-PT'
        if (info.lang !== expectLang) fail(path, `lang "${info.lang}", esperado "${expectLang}"`)
        if (!info.title) fail(path, 'sem title')
        else if (info.title.length > 60) fail(path, `title com ${info.title.length} caracteres (máx. 60)`)
        if (!info.description) fail(path, 'sem meta description')
        else if (info.description.length < 120 || info.description.length > 155)
          fail(path, `description com ${info.description.length} caracteres (120–155)`)
        if (info.title) titles.set(info.title, [...(titles.get(info.title) ?? []), path])
        if (info.description) descriptions.set(info.description, [...(descriptions.get(info.description) ?? []), path])
        if (info.robots && /noindex/.test(info.robots)) fail(path, 'página do sitemap com noindex')
        if (info.canonical !== canonicalFor(path)) fail(path, `canonical "${info.canonical}", esperado "${canonicalFor(path)}"`)
        if (info.h1 !== 1) fail(path, `${info.h1} elementos h1`)
        if (info.imgNoAlt.length) fail(path, `imagens sem alt: ${info.imgNoAlt.join(', ')}`)

        // JSON-LD
        let breadcrumbList = null
        if (!info.jsonld.length) fail(path, 'sem JSON-LD')
        for (const raw of info.jsonld) {
          try {
            const data = JSON.parse(raw)
            if (data['@context'] !== 'https://schema.org') fail(path, 'JSON-LD sem @context schema.org')
            const nodes = data['@graph'] ?? [data]
            for (const n of nodes) if (!n['@type']) fail(path, 'nó JSON-LD sem @type')
            if (nodes.some((n) => 'aggregateRating' in n || 'review' in n)) fail(path, 'JSON-LD com avaliações')
            breadcrumbList = nodes.find((n) => n['@type'] === 'BreadcrumbList') ?? breadcrumbList
          } catch (e) {
            fail(path, `JSON-LD inválido: ${e.message}`)
          }
        }

        // Breadcrumbs visíveis = BreadcrumbList
        if (path !== '/' && path !== '/en') {
          if (!info.crumbs) fail(path, 'sem breadcrumbs')
          else if (!breadcrumbList) fail(path, 'breadcrumbs sem BreadcrumbList')
          else {
            const items = breadcrumbList.itemListElement
            if (items.length !== info.crumbs.length) fail(path, 'breadcrumbs e BreadcrumbList com tamanhos diferentes')
            info.crumbs.forEach((c, i) => {
              const item = items[i]
              if (!item) return
              if (item.name !== c.name) fail(path, `breadcrumb ${i + 1}: "${c.name}" ≠ "${item.name}"`)
              const itemPath = item.item === SITE_URL ? '/' : item.item.replace(SITE_URL, '')
              const crumbPath = c.href ?? path
              if (itemPath !== crumbPath) fail(path, `breadcrumb ${i + 1}: ${crumbPath} ≠ ${itemPath}`)
              if (i === info.crumbs.length - 1 && !c.current) fail(path, 'último breadcrumb sem aria-current')
            })
          }
        }

        for (const href of info.links) {
          if (href.startsWith('/') && !href.startsWith('//')) internal.add(toPath(href))
          else if (href.startsWith(SITE_URL)) internal.add(toPath(href.replace(SITE_URL, '') || '/'))
        }
      }

      if (info.overflow) fail(where, 'scroll horizontal')
      await page.screenshot({ path: `${SHOTS}/${view.name}${path.replace(/\//g, '_') || '_'}.png`, fullPage: true })
      await page.close()
    }
    await context.close()
  }
  await browser.close()

  for (const [t, where] of titles) if (where.length > 1) fail(where.join(', '), `title repetido: "${t}"`)
  for (const [d, where] of descriptions) if (where.length > 1) fail(where.join(', '), `description repetida: "${d.slice(0, 50)}…"`)

  // 4. Ligações internas
  for (const link of internal) {
    const clean = link.split('#')[0] || '/'
    const r = await fetch(BASE + clean, { redirect: 'manual' })
    if (r.status !== 200) fail(clean, `ligação interna devolve ${r.status}`)
  }

  console.log(`Páginas: ${pages.length} × ${VIEWS.length} vistas; ligações internas: ${internal.size}`)
} catch (e) {
  fail('verify', e.stack ?? String(e))
} finally {
  if (server) process.kill(-server.pid)
}

if (failures.length) {
  console.error(`\n${failures.length} problema(s):`)
  for (const f of failures) console.error(`- ${f}`)
  process.exit(1)
}
console.log('Tudo certo.')
