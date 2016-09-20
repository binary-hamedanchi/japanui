var webpack = require('webpack');
var path = require('path');

module.exports = function(grunt) {
    return {
        compile_dev: {
            entry: [
                'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/only-dev-server',
                process.cwd() + '/src/js/index.jsx',
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
                root: path.resolve(process.cwd()),
                extensions: ['', '.js', '.jsx'],
                alias: {
                    config: process.cwd() + '/src/js/config',
                },
            },
            output: {
                path: process.cwd() + '/' + global.dist,
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
        },
        compile: {
            entry: [
                process.cwd() + '/src/js/index.jsx',
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
                root: path.resolve(process.cwd()),
                alias: {
                    config: process.cwd() + '/src/js/config.production',
                },
            },
            output: {
                path: process.cwd() + '/' + global.dist,
                publicPath: '/',
                filename: 'bundle' + (grunt.option('production') ? '' : '_beta') + '.js',
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
        }
    }
};
