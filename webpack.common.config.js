const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {basename} = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


const PATHS = {
  public: path.resolve(__dirname, 'public'),
};

module.exports = {
  entry: PATHS.public + '/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
    sourceMapFilename: '[name].[fullhash:8].map',
    chunkFilename: '[id].[fullhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]',
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

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new FaviconsWebpackPlugin({
      logo: 'public/oscar.png',
      inject: (htmlPlugin) =>
        basename(htmlPlugin.options.filename) === 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/sw.js',
          to: '',
        },
        {
          from: 'public/firebase-messaging-sw.js',
          to: '',
        },
      ],
    }),
  ],
};
