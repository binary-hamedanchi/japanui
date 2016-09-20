var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/js/index.jsx',
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader',
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    }],
  },
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx'],
    alias: {
      config: __dirname + '/src/js/config',
    },
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle_dev.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
