const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const PATHS = {
  public: path.resolve(__dirname, 'public'),
};

const PAGES_DIR = `${PATHS.public}/views/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  entry: {
    'bundle': PATHS.public + '/main.js',
  },
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].[fullhash:8].map',
    chunkFilename: '[id].[fullhash:8].js'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]!static'
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
        ]
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
    ]
  },

  devServer: {
    contentBase: 'public',
    historyApiFallback: true,
    hot: true,
    port: 3000,
    watchContentBase: true,
  },

  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`
    })),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
  ],

  optimization: {
    minimize: true,
    splitChunks: {
      minChunks: Infinity,
      chunks: 'all'
    }
  }
};