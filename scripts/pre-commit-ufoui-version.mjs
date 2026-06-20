/**
 * pre-commit: bump @ufoui/core patch when any path under packages/ufoui/ is staged.
 */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const staged = execSync('git diff --cached --name-only --diff-filter=ACM', {
  encoding: 'utf8',
  cwd: root,
})
  .split(/\r?\n/)
  .filter(Boolean);

const norm = (f) => f.replace(/\\/g, '/');
const touchesLib = staged.some((f) => norm(f).startsWith('packages/ufoui/') && !norm(f).startsWith('packages/ufoui-extra/'));
const touchesExtra = staged.some((f) => norm(f).startsWith('packages/ufoui-extra/'));

if (touchesLib) {
  execSync('node scripts/bump-ufoui-patch.mjs', { stdio: 'inherit', cwd: root });
  execSync('git add packages/ufoui/package.json', { stdio: 'inherit', cwd: root });
}

if (touchesExtra) {
  execSync('node scripts/bump-ufoui-extra-patch.mjs', { stdio: 'inherit', cwd: root });
  execSync('git add packages/ufoui-extra/package.json', { stdio: 'inherit', cwd: root });
}

if (!touchesLib && !touchesExtra) {
  process.exit(0);
}
