const del = require('del');
const path = require('path');
const distPath = path.join(__dirname, 'public');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

del.sync(distPath);

module.exports = {
  entry: {
    main: [
      './js/index.js'
    ]
  },
  output: {
    publicPath: '//narr.github.io/webpack-jquery-example/',
    // publicPath: '//192.168.0.2:8080/',
    // publicPath: '//localhost:8080/',
    path: distPath,
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
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[path][name].[ext]?[hash]',
          'image-webpack?progressive&optimizationLevel=7'
        ]
      }, {
        test: /\.js$/,
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
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true
      },
      template: './index.html',
      inject: 'body'
    }),
    // https://github.com/webpack/docs/wiki/optimization#deduplication
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      }
    }),
    new CopyWebpackPlugin(
      [
        // from: relative path to context path
        { from: './node_modules/jquery/dist/jquery.min.js', to: 'lib' },
        { from: './lib/skrollr.min.js', to: 'lib' }
      ],
      {
        ignore: [
          '.DS_Store'
        ]
      }
    ),
    function failOnError() {
      this.plugin('done', stats => {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          // console.log(stats.compilation.errors);
          console.log(stats.compilation.errors[0].toString());
          process.exit(1);
        }
      });
    }
  ],
  resolve: {
    root: './'
  }
};
