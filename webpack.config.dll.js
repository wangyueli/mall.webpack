/**
 * Created by wangyueli on 2018/7/20.
 */
const webpack = require('webpack');
const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const vendors = ['angular', 'angular-cookies', 'angular-sanitize', 'angular-local-storage', 'angular-ui-router', 'oclazyload', 'jquery', 'jquery.cookie', 'underscore', './src/asset/My97DatePicker/WdatePicker.js', './src/asset/angular-http-auth/http-auth-interceptor.js', './src/asset/angular-ui-bootstrap/ui-bootstrap-tpls.js', './src/asset/wangeditor/wangEditor.js', 'webuploader'];

module.exports = {
    entry: {
        vendors: vendors
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new uglifyJsPlugin({}),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist/[name]-manifest.json'),
            name: '[name]'
        })
    ]
};