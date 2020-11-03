const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    usedExports: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  watchOptions: {
    ignored: ['/node_modules/'],
  },
});
