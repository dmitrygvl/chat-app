const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    clean: true,
    filename: '[name].bundle.[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'hidden-source-map'
      : 'eval-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    watchFiles: ['*.html'],
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    ...(isDev
      ? [new MiniCssExtractPlugin()]
      : [
          new MiniCssExtractPlugin({
            chunkFilename: '[name].[contenthash].css',
            filename: '[name].[contenthash].css',
          }),
        ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new FaviconsWebpackPlugin('src/assets/img/favicon.png'),
    new webpack.DefinePlugin({
      'process.env': {
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        FIREBASE_STORAGE_BUCKET: JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET,
        ),
        FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID,
        ),
        FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID),
        FIREBASE_MEASUREMENT_ID: JSON.stringify(
          process.env.FIREBASE_MEASUREMENT_ID,
        ),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|ts)$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
    ],
  },
};
