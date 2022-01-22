import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import typescript from '@rollup/plugin-typescript';
import * as path from 'path';

export default defineConfig({
  plugins: [
    svgr(),
    react()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'ReactSimpleGallery',
      fileName: (format) => `react-simple-gallery.${format}.js`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        path.resolve(__dirname, 'src/App.tsx'),
        path.resolve(__dirname, 'src/main.tsx')
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      plugins: [
        typescript()
      ]
    }
  }
})
