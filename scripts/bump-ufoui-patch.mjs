/**
 * Increments patch (X.Y.Z → X.Y.Z+1) in packages/ufoui/package.json.
 * Expects plain semver without prerelease (e.g. 0.0.6, not 1.0.0-beta.1).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const pkgPath = path.join(repoRoot, 'packages', 'ufoui', 'package.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const parts = String(pkg.version).split('.');

if (parts.length !== 3 || parts.some(p => !/^\d+$/.test(p))) {
    console.error(`bump-ufoui-patch: expected X.Y.Z (digits only), got "${pkg.version}"`);
    process.exit(1);
}

const patch = Number(parts[2]) + 1;
pkg.version = `${parts[0]}.${parts[1]}.${patch}`;

fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
console.info(pkg.version);
