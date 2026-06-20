/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import fs from 'fs';

const packageJsonPath = path.join(__dirname, 'package.json');

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/ufoui-extra',

  plugins: [
    react(),
    nxViteTsPaths(),

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
          path.resolve(__dirname, '../../dist/packages/ufoui-extra/package.json'),
          `${JSON.stringify(pkg, null, 2)}\n`,
        );
      },
    },
  ],

  build: {
    outDir: '../../dist/packages/ufoui-extra',
    emptyOutDir: true,
    reportCompressedSize: true,

    lib: {
      entry: 'src/index.ts',
      name: 'ufoui-extra',
      fileName: 'index',
      formats: ['es'],
    },

    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@ufoui/core',
        '@tanstack/react-table',
      ],
    },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
  },
});
