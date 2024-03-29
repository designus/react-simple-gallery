import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import cssInject from './cssInjectedByJsPlugin';

export default defineConfig({
  plugins: [
    react(),
    cssInject()
  ],
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, '../src/components/index.ts'),
      name: 'ReactSimpleGallery',
      fileName: (format) => `react-simple-gallery.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        path.resolve(__dirname, '../src/App.tsx'),
        path.resolve(__dirname, '../src/main.tsx'),
        path.resolve(__dirname, '../public')
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
