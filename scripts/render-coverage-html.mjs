import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const coveragePkgDir = path.dirname(require.resolve('@vitest/coverage-v8/package.json'));
const coverageRequire = createRequire(path.join(coveragePkgDir, 'index.js'));
const { createCoverageMap } = coverageRequire('istanbul-lib-coverage');
const { createContext } = coverageRequire('istanbul-lib-report');
const reports = coverageRequire('istanbul-reports');

const coverageDir = path.resolve('coverage/libs/ufo-ui');
const coverageFile = path.join(coverageDir, 'coverage-final.json');

if (!fs.existsSync(coverageFile)) {
    throw new Error(`Coverage file not found: ${coverageFile}`);
}

const normalizePath = filePath => {
    const normalized = path.normalize(filePath);
    return normalized.length >= 2 && normalized[1] === ':'
        ? `${normalized[0].toUpperCase()}${normalized.slice(1)}`
        : normalized;
};

const rawCoverage = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
const normalizedCoverage = createCoverageMap({});

for (const fileCoverage of Object.values(rawCoverage)) {
    const next = {
        ...fileCoverage,
        path: normalizePath(fileCoverage.path),
    };

    normalizedCoverage.merge({
        [next.path]: next,
    });
}

fs.writeFileSync(
    coverageFile,
    `${JSON.stringify(normalizedCoverage.toJSON(), null, 2)}\n`,
);

const context = createContext({
    dir: coverageDir,
    coverageMap: normalizedCoverage,
    defaultSummarizer: 'pkg',
});

reports.create('text').execute(context);
reports.create('html').execute(context);
