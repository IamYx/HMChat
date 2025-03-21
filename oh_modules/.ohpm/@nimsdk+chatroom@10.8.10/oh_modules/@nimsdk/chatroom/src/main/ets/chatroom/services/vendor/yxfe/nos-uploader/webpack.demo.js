const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base');
fs.copyFileSync(path.resolve(__dirname, 'demo', 'vconsole.min.js'), path.resolve(__dirname, 'dist', 'vconsole.min.js'));
Object.assign(config, {
    entry: {
        demo: [path.resolve(__dirname, 'demo', 'index.js')]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        compress: false,
        open: false,
        host: '0.0.0.0',
        port: '4002',
        disableHostCheck: true,
        stats: { colors: true },
        filename: '[name].chunk.js',
        headers: { 'Access-Control-Allow-Origin': '*' },
        open: true,
        https: false,
        key: fs.readFileSync('./ssh/key.pem'),
        cert: fs.readFileSync('./ssh/cert.pem'),
        contentBase: path.resolve('./dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: path.resolve(__dirname, 'demo', 'index.html'),
            inject: true,
            chunks: ['demo']
        })
    ]
});
module.exports = config;
