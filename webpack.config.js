const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const PATHS = {
  public: path.resolve(__dirname, 'public'),
};

module.exports = {
  entry: PATHS.public + '/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=static/fonts/[name].[ext]!static',
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },

      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
    ],
  },

  devServer: {
    contentBase: 'server',
    historyApiFallback: true,
    hot: true,
    port: 8087,
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
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],

  optimization: {
    minimize: true,
    splitChunks: {
      minChunks: Infinity,
      chunks: 'all',
    },
  },
};
