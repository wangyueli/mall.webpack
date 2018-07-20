/**
 * Created by wangyueli on 2018/7/9.
 */

var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var uglifyJsPlugin = require('uglifyjs-webpack-plugin');
require('babel-polyfill');

var config = {
    entry:{
        app: ['babel-polyfill', './src/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "",
        filename: 'bundle.js?[hash:5]',
        chunkFilename: "components/[name].js?[chunkhash:5]"
    },
    devtool: false,
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
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }]
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
            template: path.resolve(__dirname, 'index.online.html'),
            minify: {
                removeComments: true, //删除注释
                collapseWhitespace: true //删除空格
            },
            hash: true
        }),
        new extractTextPlugin('./css/master.css'),
        new uglifyJsPlugin({
            sourceMap: false,
            uglifyOptions: {
                mangle: false //压缩不混淆
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendors-manifest.json')
        })
    ]

};
module.exports = config;