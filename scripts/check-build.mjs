import fs from 'node:fs'
import assert from 'node:assert/strict'
import data from '../src/data/invitation.js'

const base = process.argv[2]
assert(base?.startsWith('/') && base.endsWith('/'), 'Supply the expected build base')
const html = fs.readFileSync('dist/index.html', 'utf8')
assert(!html.includes('/src/') && !html.includes('.jsx'), 'Source entry found: deploy compiled assets only')
assert(html.includes(`href="${base}favicon.svg"`), 'Incorrect favicon URL')
assert(fs.existsSync('public/favicon.svg'), 'Missing source favicon')
assert(new RegExp('src="' + base + 'assets/[^" ]+\\.js"').test(html), 'Missing generated JavaScript entry')
assert(new RegExp('href="' + base + 'assets/[^" ]+\\.css"').test(html), 'Missing generated CSS entry')
const fallback = fs.readFileSync('dist/404.html', 'utf8')
assert(fallback.includes(`location.replace(\`${base}?__route=`), 'Incorrect 404 base')
assert(!html.includes('%BASE_URL%') && !fallback.includes('%BASE_URL%'), 'Unresolved base placeholder')
for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"?]+)"/g)) {
  assert(url.startsWith(base), `Incorrect HTML asset base: ${url}`)
  assert(fs.existsSync('dist/' + url.slice(base.length)), `Missing HTML asset: ${url}`)
}
const bundle = fs.readdirSync('dist/assets').filter(f => /\.(js|css)$/.test(f))
  .map(f => fs.readFileSync('dist/assets/' + f, 'utf8')).join('\n')
const assets = new Set()
function visit(value) {
  if (typeof value === 'string' && /^\/(images|audio)\//.test(value)) assets.add(value.slice(1))
  else if (value && typeof value === 'object') Object.values(value).forEach(visit)
}
visit(data)
for (const asset of assets) {
  for (const root of ['public', 'dist']) {
    let directory = root
    for (const part of asset.split('/')) {
      assert(fs.readdirSync(directory).includes(part), `Missing or incorrect case: ${directory}/${part}`)
      directory += '/' + part
    }
  }
  assert(bundle.includes(asset), `Asset missing from bundle: ${asset}`)
}
assert(bundle.includes(base), 'Build base missing from bundle')
if (base === '/') assert(!bundle.includes('/wedding-invitation/'), 'GitHub base leaked into root build')
assert(fs.existsSync('dist/.htaccess'), 'Missing Hostinger routing rules')
console.log(`Verified ${assets.size} public assets, HTML entry assets, and routing fallback for ${base}`)
