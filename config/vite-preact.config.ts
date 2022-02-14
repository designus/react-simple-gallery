import { mergeConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import commonConfig from './common';

export default mergeConfig(commonConfig, {
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  },
  build: {
    outDir: './dist/preact',
    rollupOptions: {
      plugins: [
        typescript({ outDir: './dist/preact'})
      ]
    }
  }
})
