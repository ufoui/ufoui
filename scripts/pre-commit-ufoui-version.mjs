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
const touchesLib = staged.some((f) => norm(f).startsWith('packages/ufoui/'));

if (!touchesLib) {
  process.exit(0);
}

execSync('node scripts/bump-ufoui-patch.mjs', { stdio: 'inherit', cwd: root });
execSync('git add packages/ufoui/package.json', { stdio: 'inherit', cwd: root });
