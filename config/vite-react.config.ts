import { mergeConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import commonConfig from './common';

export default mergeConfig(commonConfig, {
  build: {
    outDir: './dist/react',
    rollupOptions: {
      plugins: [
        typescript({ outDir: './dist/react'})
      ]
    }
  }
})