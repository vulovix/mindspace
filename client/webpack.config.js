const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const crypto = require('crypto');
// eslint-disable-next-line camelcase
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm === 'md4' ? 'sha256' : algorithm);

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dev'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader' }],
      },
      {
        test: /\.(jpe?g|png|gif|woff2?|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 15000 },
          },
        ],
      },
    ],
  },
  resolve: {
    // allows us to do absolute imports from "src"
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  devtool: 'eval-source-map',
  devServer: {
    static: path.join(__dirname, 'dev'),
    historyApiFallback: true,
    hot: true,
    port: 10000,
    // proxy: {
    //   '/stream': {
    //     target: 'http://127.0.0.1:10001',
    //     // pathRewrite: { '^/api': '' },
    //   },
    // },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      favicon: path.join(__dirname, 'src/favicon.png'),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      API_URL: 'http://localhost:10001',
      // 'process.env': JSON.stringify(process.env),
    }),
  ],
};
