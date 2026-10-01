// Gera as imagens Open Graph (1200×630) de cada página em public/og/{id}-{pt|en}.png.
// Uso: node --experimental-strip-types scripts/og-images.mjs
// Usa o Playwright (dependência de desenvolvimento) e as fontes do site. Correr quando os títulos mudam.
import { chromium } from 'playwright'
import { mkdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { ROUTE_LIST } from '../src/lib/seo.config.ts'

const OUT = 'public/og'
mkdirSync(OUT, { recursive: true })

const font = (f) => `data:font/woff2;base64,${readFileSync(resolve('src/fonts', f)).toString('base64')}`
const logo = readFileSync('public/logo.svg', 'utf8')
  .replace(/<\?xml[^>]*>/, '')
  .replace('.st1{fill:#FFFFFF;}', '.st1{fill:#06083C;}')

function html(title, lang) {
  const url = 'geteasier.pt'
  const tag = lang === 'en' ? 'Software team, Portugal' : 'Equipa de software, Portugal'
  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
  @font-face{font-family:Geist;src:url(${font('geist-latin-wght100-900.woff2')}) format('woff2');font-weight:100 900}
  @font-face{font-family:GeistMono;src:url(${font('geist-mono-latin-wght100-900.woff2')}) format('woff2');font-weight:100 900}
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#F4F6F9;color:#06083C;font-family:Geist;position:relative;overflow:hidden}
  .grid{position:absolute;inset:0;background-image:linear-gradient(#C9D1DE 1px,transparent 1px),linear-gradient(90deg,#C9D1DE 1px,transparent 1px);background-size:40px 40px;opacity:.45}
  .ruler{position:absolute;left:72px;top:88px;bottom:88px;width:1px;background:#06083C}
  .ruler:before,.ruler:after{content:'';position:absolute;left:-8px;width:17px;height:1px;background:#06083C}
  .ruler:before{top:0}.ruler:after{bottom:0}
  .box{position:absolute;left:120px;right:96px;top:88px;bottom:88px;display:flex;flex-direction:column;justify-content:space-between}
  .logo svg{height:56px;width:auto}
  h1{font-size:68px;line-height:1.05;font-weight:700;letter-spacing:-0.03em;max-width:900px;text-wrap:balance}
  .foot{display:flex;justify-content:space-between;font-family:GeistMono;font-size:24px;color:#4A5263}
  .dot{position:absolute;right:96px;top:96px;width:18px;height:18px;border-radius:50%;background:#18DDBA;border:2px solid #06083C}
  </style><body><div class="grid"></div><div class="ruler"></div><span class="dot"></span>
  <div class="box"><div class="logo">${logo}</div><h1>${title}</h1><div class="foot"><span>${tag}</span><span>${url}</span></div></div></body></html>`
}

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium' })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
let n = 0
for (const r of ROUTE_LIST) {
  for (const lang of ['pt', 'en']) {
    const loc = lang === 'en' ? r.en : r.pt
    if (!loc) continue
    const title = r.id === 'home' ? loc.title.replace(/^GetEasier \| /, '') : loc.title.replace(/ \| GetEasier$/, '')
    await page.setContent(html(title, lang === 'pt' ? 'pt-PT' : 'en'), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `${OUT}/${r.id}-${lang}.png` })
    n++
  }
}
await browser.close()
console.log(`og: ${n} imagens em ${OUT}`)
