// Gera src/lib/lastmod.json: data do último commit de cada ficheiro de conteúdo e de página.
// O sitemap usa estas datas como <lastmod>. O ficheiro é versionado porque o build na Vercel
// pode ter um clone raso (sem histórico): nesse caso, ou sem git, mantém-se o ficheiro que existe.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const OUT = 'src/lib/lastmod.json'
const DIRS = ['src/content', 'src/components/pages', 'src/components/demos']

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
}

try {
  if (git('rev-parse', '--is-shallow-repository') === 'true') throw new Error('clone raso')
  const files = git('ls-files', ...DIRS).split('\n').filter(Boolean)
  const dates = {}
  for (const f of files) {
    const d = git('log', '-1', '--format=%cI', '--', f)
    if (d) dates[f] = d
  }
  const previous = existsSync(OUT) ? readFileSync(OUT, 'utf8') : ''
  const next = JSON.stringify(dates, null, 2) + '\n'
  if (next !== previous) writeFileSync(OUT, next)
  console.log(`lastmod: ${Object.keys(dates).length} ficheiros`)
} catch (e) {
  if (!existsSync(OUT)) writeFileSync(OUT, '{}\n')
  console.log(`lastmod: sem histórico git (${e.message}), mantém ${OUT}`)
}
