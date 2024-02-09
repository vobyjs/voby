import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

import { defineConfig } from 'rollup'
export default defineConfig({
  input: 'dist/index.js',
  output: [{
    format: 'module',
    file: 'dist/index.min.js',
  }, {
    format: 'cjs',
    file: 'dist/index.min.cjs',
  }],
  plugins: [nodeResolve(), terser()]
})
