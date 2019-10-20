import banner from 'rollup-plugin-banner';
import babel from 'rollup-plugin-babel';
import del from 'rollup-plugin-delete';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [{
    file: pkg.browser,
    format: 'cjs'
  }],
  plugins: [
    del({targets: 'lib/*'}),
    resolve(),
    commonjs(),
    babel({
      presets: ['@babel/preset-env'],
      exclude: 'node_modules/**'
    }),
    banner('<%= pkg.name %> v<%= pkg.version %> by <%= pkg.author.name %>')
  ]
};
