import { nodeResolve } from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    nodeResolve({ extensions: ['.js', '.ts'] }),
    cleanup({ comments: 'none', extensions: ['.ts'] }),
    swc(),
  ],
  context: 'this',
};
