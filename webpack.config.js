require('dotenv').load();

const path = require('path');

const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './client/src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env',
              '@babel/react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './client/static/index.html')
    }),
    new webpack.EnvironmentPlugin(['MAPBOX_PUBLIC_KEY'])
  ],
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
};
