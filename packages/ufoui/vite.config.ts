/// <reference types="vitest" />
import { defineConfig, transformWithEsbuild } from 'vite';
import { gzipSync } from 'zlib';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import fs from 'fs';

const packageJsonPath = path.join(__dirname, 'package.json');
const distDir = path.resolve(__dirname, '../../dist/packages/ufoui');
const stylesDir = path.resolve(__dirname, 'src/styles');
const cssLayers = ['reset', 'styles', 'index'] as const;

function readCss(file: string): string {
  const dir = path.dirname(file);
  return fs.readFileSync(file, 'utf8').replace(
    /@import\s+(?:url\()?['"]([^'")]+)['"]\)?;?/g,
    (_match, rel) => readCss(path.resolve(dir, rel)),
  );
}

async function buildCssLayer(name: (typeof cssLayers)[number]): Promise<void> {
  const { css } = await postcss([autoprefixer]).process(
    readCss(path.join(stylesDir, `${name}.css`)),
    { from: undefined },
  );
  const output = (await transformWithEsbuild(css, `${name}.css`, { loader: 'css', minify: true }))
    .code;

  fs.writeFileSync(path.join(distDir, `${name}.css`), output);
  console.log(`${name}.css  ${(output.length / 1024).toFixed(2)} kB │ gzip: ${(
    gzipSync(output).length / 1024
  ).toFixed(2)} kB`);
}

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/ufo-ui',

  plugins: [
    react(),
    nxViteTsPaths(),

    nxCopyAssetsPlugin([
      '../../README.md',
      '../../TRADEMARK.md',
      '../../LICENSE',
    ]),

    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),

    {
      name: 'write-package-json',
      closeBundle() {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as Record<
          string,
          unknown
        >;

        fs.writeFileSync(
          path.join(distDir, 'package.json'),
          `${JSON.stringify(pkg, null, 2)}\n`,
        );
      },
    },

    {
      name: 'write-css-layers',
      async closeBundle() {
        for (const name of cssLayers) {
          await buildCssLayer(name);
        }
      },
    },
  ],

  build: {
    outDir: '../../dist/packages/ufoui',
    emptyOutDir: true,
    reportCompressedSize: true,

    lib: {
      entry: 'src/index.ts',
      name: 'ufo-ui',
      fileName: 'index',
      formats: ['es'],
    },

    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@material/material-color-utilities',
      ],
      plugins:
        mode === 'analyze'
          ? [
              visualizer({
                filename: path.resolve(
                  __dirname,
                  '../../dist/libs/ufo-ui/bundle-report.html',
                ),
                template: 'treemap',
                gzipSize: true,
                brotliSize: true,
                open: false,
              }),
            ]
          : [],
    },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/libs/ufo-ui',
      reporter: ['json'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.*', 'src/**/index.ts', 'src/**/*.d.ts'],
    },
  },
}));
