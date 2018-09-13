
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var homeService = app.service('homeService', function ($http) {
    //获取热卖商品以及热卖分类
    this.getList = function(mallId, f) {
        $http.get(url.url('/homerecommend/content', {
            'mallId' : mallId
        },global.mall.api)).then(f);
    };

    //获取依洛凯登录链接
    this.getUrlYNK = function (ynkMallId, f) {
        $http.get(url.url('/sso/url', {
            'mallId': ynkMallId
        },global.mall.api)).then(f)
    };

    //公告
    this.publics = function (mallId, f) {
        $http.get(url.url('/announcement/content', {
            'mallId' : mallId
        }, global.mall.api)).then(f)
    }
});

module.exports = homeService;

