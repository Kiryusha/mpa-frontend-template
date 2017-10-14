const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const src = {root: path.resolve(__dirname, 'src/')};
Object.assign(src, {
  img: path.resolve(src.root, 'img/'),
  font: path.resolve(src.root, 'font/'),
  ico: path.resolve(src.root, 'ico/'),
  pug: path.resolve(src.root, 'pug/')
});

const dist = {root: path.resolve(__dirname, 'dist/')};

const config = {
  context: src.root,
  entry: './',
  resolve: {
    alias: {
      Img: src.img,
      Font: src.font
    }
  },
  output: {
    path: dist.root,
    filename: './js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: src.root,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        include: src.root,
        use: ExtractTextPlugin.extract({
          fallback: {loader: 'style-loader', options: {sourceMap: true}},
          use: [
            {loader: 'css-loader', options: {sourceMap: true}},
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            {loader: 'stylus-loader', options: {sourceMap: true}}
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg|woff)$/,
        include: src.root,
        exclude: src.ico,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: src.ico,
        use: ['svg-sprite-loader', 'svgo-loader']
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].html',
              context: src.pug
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              exports: false,
              doctype: 'html'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/app.css')
  ]
};

module.exports = config;
