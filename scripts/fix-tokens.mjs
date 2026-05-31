import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const PAIRS = [
  // Verbose overline labels → .text-overline
  ['text-xs tracking-widest text-[var(--bp-brown)] uppercase font-semibold', 'text-overline'],
  ['text-xs tracking-widest text-[var(--bp-muted)] uppercase font-semibold', 'text-overline text-[var(--bp-muted)]'],
  ['text-xs tracking-widest text-[var(--bp-gold)] uppercase font-semibold', 'text-overline text-[var(--bp-gold)]'],
  ['text-xs tracking-widest text-[var(--bp-gold-light)] uppercase font-semibold', 'text-overline text-[var(--bp-gold-light)]'],
  ['text-xs font-semibold uppercase tracking-widest text-[var(--bp-brown)]', 'text-overline'],
  ['text-xs font-medium tracking-widest uppercase text-[var(--bp-gold)]', 'text-overline text-[var(--bp-gold)]'],
  // Hardcoded dark bg
  ['bg-[#5C4A2A]', 'bg-[var(--bp-brown-deep)]'],
]

function walk(dir) {
  const entries = readdirSync(dir)
  const files = []
  for (const e of entries) {
    const full = join(dir, e)
    if (statSync(full).isDirectory()) files.push(...walk(full))
    else if (e.endsWith('.tsx') || e.endsWith('.ts')) files.push(full)
  }
  return files
}

const files = walk(join(ROOT, 'app'))
let changed = 0
for (const f of files) {
  let c = readFileSync(f, 'utf8')
  const orig = c
  for (const [from, to] of PAIRS) c = c.replaceAll(from, to)
  if (c !== orig) {
    writeFileSync(f, c, 'utf8')
    console.log('  updated:', f.replace(ROOT, ''))
    changed++
  }
}
console.log(`\nDone. ${changed} files updated.`)
