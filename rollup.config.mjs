import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts';
import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    external: [
      'react',
      'react/jsx-runtime',
      'react-dom',
      '@emotion/react',
      '@emotion/react/jsx-runtime',
      '@emotion/styled',
    ],
    output: [
      {
        file: 'build/tock-react-kit.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'build/tock-react-kit-standalone.umd.js',
        format: 'umd',
        name: 'TockReact',
        sourcemap: true,
      },
      {
        file: 'build/tock-react-kit-standalone.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser(),
    ],
  },
  {
    // path to your declaration files root
    input: 'src/index.ts',
    output: [{ file: 'build/tock-react-kit.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
