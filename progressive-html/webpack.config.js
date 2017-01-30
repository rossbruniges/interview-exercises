var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var buildPath = path.join(__dirname, 'assets/build');

var plugins = [
    new ExtractTextPlugin('index.css'),
    new webpack.optimize.CommonsChunkPlugin(
        'index',
        'index.bundle.js'
    ),
];

module.exports = {
    name: 'js',
    entry: {
        index: './assets/dev/es6/index.js',
        styles: './assets/dev/scss/index.scss',
    },
    output: {
        path: buildPath,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [path.join(__dirname, 'assets/dev/es6')],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: [
                        ['transform-es2015-classes', { 'loose': true }]
                    ]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css!sass'
                )
            },
            {
                test: /\.(svg)$/,
                include: path.resolve('./assets/images'),
                loader: 'svg-url-loader'
            }
        ]
    },
    plugins: plugins,
};
