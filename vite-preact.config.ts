import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import typescript from '@rollup/plugin-typescript';
import * as path from 'path';
import cssInject from './cssInjectedByJsPlugin';

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    cssInject()
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  },
  build: {
    sourcemap: true,
    outDir: './dist/preact',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'ReactSimpleGallery',
      fileName: (format) => `react-simple-gallery.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        path.resolve(__dirname, 'src/App.tsx'),
        path.resolve(__dirname, 'src/main.tsx'),
        path.resolve(__dirname, 'public')
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      plugins: [
        typescript({ outDir: './dist/preact'})
      ]
    }
  }
})
