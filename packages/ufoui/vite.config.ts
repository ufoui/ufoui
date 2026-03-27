/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import fs from 'fs';

const packageJsonPath = path.join(__dirname, 'package.json');

export default defineConfig(({ mode }) => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/ufo-ui',

  plugins: [
    react(),
    nxViteTsPaths(),

    // kopiuje README / LICENSE do dist
    nxCopyAssetsPlugin([
      '../../README.md',
      '../../TRADEMARK.md',
      '../../LICENSE',
    ]),

    // generuje index.d.ts
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),

    // kopiuje package.json do dist (manifest publikacji — źródło: packages/ufoui/package.json)
    {
      name: 'write-package-json',
      closeBundle() {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as Record<
          string,
          unknown
        >;

        fs.writeFileSync(
          path.resolve(__dirname, '../../dist/packages/ufoui/package.json'),
          `${JSON.stringify(pkg, null, 2)}\n`,
        );
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
      reportsDirectory: '../../coverage/libs/ufo-ui',
      provider: 'v8',
    },
  },
}));
