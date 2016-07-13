const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './app/entry.js'
    ],
    output: {
        filename: 'bundle-[hash].js',
        publicPath: '/',
        path: path.join(__dirname, 'public', 'javascripts')
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [{
          test: /(\.js$)/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel']
        }, {
          include: /\.json$/,
          loaders: ['json-loader']
        }]
    },
    eslint: {
        configFile: '.eslintrc'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            hash: false,
            inject: 'body',
            filename: path.join(__dirname, 'public', 'index.html'),
            template: path.join(__dirname, 'public', 'template.html')
        }),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true,
            'process.env': {
              NODE_ENV: JSON.stringify('development')
            }
        })
    ]
}
