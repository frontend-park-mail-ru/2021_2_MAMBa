const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.config');

const config = {
  devServer: {
    contentBase: 'server',
    historyApiFallback: true,
    port: 8088,
    hot: true,
    proxy: {
      '/api': {
        target: {
          host: '0.0.0.0',
          protocol: 'http:',
          port: 8085,
        },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(commonConfig, {
  ...config,
});
