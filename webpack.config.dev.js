const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [
      './js/index.js'
    ]
  },
  output: {
    filename: 'js/[name].bundle.js?[hash]'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loaders: ['eslint']
    }],
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css?sourceMap', 'postcss', 'sass'])
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=/[path][name].[ext]?[hash]'
        ]
      }, {
        test: /\.(mp4)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=/[path][name].[ext]?[hash]'
        ]
      }, {
        test: /\.js?$/,
        exclude: [/node_modules/],
        loaders: ['babel']
      }
    ]
  },
  postcss: () => [autoprefixer({ browsers: 'last 3 versions' })],
  plugins: [
    new ExtractTextPlugin('css/[name].bundle.css?[contenthash]'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.dev.html',
      inject: 'body'
    })
  ],
  resolve: {
    root: './'
  },
  devtool: 'source-map'
};
