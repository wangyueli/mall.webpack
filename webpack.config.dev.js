/**
 * Created by wangyueli on 2018/7/9.
 */

var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "",
        filename: 'bundle.js?[hash:5]',
        chunkFilename: "components/[name].js?[chunkhash:5]"
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true,
        compress: true,
        port: 8084,
        host: 'malls.yct.com',
        watchOptions: {
            aggregateTimeout: 1000,
            poll: 1000
        }
    },
    resolve: {
        alias: {
            lib: path.resolve(__dirname, 'src/lib'),
            util: path.resolve(__dirname, 'src/util'),
            serve: path.resolve(__dirname, 'src/serve'),
            appModule: path.resolve(__dirname, 'src/app.module'),
            global: path.resolve(__dirname, 'src/lib/global')
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ]
                })
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(png)|(jpg)|(gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        outputPath: 'images/',
                        limit: 8192,
                        name: '[name].[ext]?[hash:5]',
                        useRelativePath: true
                    }
                }]
            }

        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new extractTextPlugin('./css/master.css'),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendors-manifest.json')
        })
    ]

};
module.exports = config;