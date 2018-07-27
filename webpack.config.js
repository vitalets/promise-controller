const path = require('path');

const outPath = path.resolve(__dirname, 'lib');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const filename = mode === 'production' ? 'bundle.prod.js' : 'bundle.dev.js';
  return {
    mode,
    entry: './src',
    output: {
      path: outPath,
      library: 'PromiseController',
      libraryTarget: 'umd',
      filename,
      // see: https://github.com/markdalgleish/static-site-generator-webpack-plugin/issues/130
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        }
      ]
    },
  };
};
