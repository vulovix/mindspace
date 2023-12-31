const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: path.join(__dirname, 'src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[hash].js',
    publicPath: '/',
    hashFunction: 'xxhash64',
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: '[name]-[hash].[ext]', limit: 10000 },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name]-[hash].[ext]' },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      favicon: path.join(__dirname, 'src/favicon.png'),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      API_URL: '/api',
    }),
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
  ],
};
