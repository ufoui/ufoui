/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import fs from 'fs';

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

    // generuje package.json do dist
    {
      name: 'write-package-json',
      closeBundle() {
        const pkg = {
          name: '@ufoui/core',
          version: '0.0.1',
          description: 'Lightweight Material Design 3 UI components for React',

          type: 'module',
          main: './index.mjs',
          module: './index.mjs',
          types: './index.d.ts',

          license: 'Apache-2.0',
          author: 'ufoui',

          repository: {
            type: 'git',
            url: 'https://github.com/ufoui/ufoui.git',
          },

          keywords: ['react', 'components', 'ui', 'ufoui', 'core'],

          peerDependencies: {
            react: '^18.0.0',
            'react-dom': '^18.0.0',
            '@material/material-color-utilities': '^0.3.0',
          },
          "sideEffects": [
            "*.css"
          ],

          exports: {
            '.': {
              import: './index.mjs',
              types: './index.d.ts',
            },
            './style.css': './index.css',
            './style': './index.css',
          },
        };

        fs.writeFileSync(
          path.resolve(__dirname, '../../dist/libs/ufo-ui/package.json'),
          JSON.stringify(pkg, null, 2),
        );
      },
    },
  ],

  build: {
    outDir: '../../dist/libs/ufo-ui',
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
