const path = require('path');
const base = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { baseCss } = require('./webpack.ayudas');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          ...baseCss
        ]
      }
    ]
  }
});
