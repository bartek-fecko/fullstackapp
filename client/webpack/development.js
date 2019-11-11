const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: `http://[::1]:1648`,
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});
