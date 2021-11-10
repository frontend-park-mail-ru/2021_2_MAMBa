const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const config = {
  optimization: {
    minimize: true,
  },
};

module.exports = merge(commonConfig, {
  ...config,
});
