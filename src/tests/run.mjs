// Test runner: bundles each src/tests/*.test.ts with esbuild and executes them.
// Usage: node src/tests/run.mjs   (exit code 1 if any suite fails)
import { build } from 'esbuild';
import { readdirSync, writeFileSync, unlinkSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const files = readdirSync('src/tests').filter((f) => f.endsWith('.test.ts')).sort();
const dir = mkdtempSync(join(tmpdir(), 'cadet-tests-'));
let failed = [];

for (const f of files) {
  const outfile = join(dir, f.replace('.ts', '.mjs'));
  await build({
    entryPoints: [join('src/tests', f)],
    bundle: true, platform: 'node', format: 'esm', outfile,
    external: ['react', 'react-dom'], logLevel: 'silent',
  });
  const code = await new Promise((res) => {
    const p = spawn(process.execPath, [outfile], { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (out += d));
    p.on('close', (c) => res({ c, out }));
  });
  const pass = (code.out.match(/✅/g) || []).length;
  const failLines = code.out.split('\n').filter((l) => l.startsWith('❌'));
  console.log(`${code.c === 0 ? '✅' : '❌'} ${f} — ${pass} assertions${failLines.length ? '\n   ' + failLines.join('\n   ') : ''}`);
  if (code.c !== 0) failed.push(f);
  try { unlinkSync(outfile); } catch {}
}
console.log(failed.length ? `\nFAILED SUITES: ${failed.join(', ')}` : `\nAll ${files.length} test suites passed.`);
process.exit(failed.length ? 1 : 0);
