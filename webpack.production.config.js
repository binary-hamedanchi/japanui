var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
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
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(__dirname),
    alias: {
      config: __dirname + '/src/js/config.production',
    },
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
