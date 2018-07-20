
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var homeService = app.service('homeService', function ($http) {
    //获取热卖商品以及热卖分类
    this.getList = function(mallId, orgId, f) {
        $http.get(url.url('/homerecommend/content', {
            'orgId' : orgId,
            'mallId' : mallId
        },global.mall.api)).then(f);
    };

    //获取依洛凯登录链接
    this.getUrlYNK = function (ynkMallId, f) {
        $http.get(url.url('/sso/url', {
            'mallId': ynkMallId
        },global.mall.api)).then(f)
    };

    //获取商品列表 （简化）
    this.getPrtList = function(orgId, categoryId, sort, f) {
        $http.get(url.url('/homerecommend/product/content', {
            'categoryId': categoryId,
            'orgId': orgId,
            'sort' : sort
        }, global.mall.api)).then(f);
    };

    //公告
    this.publics = function (orgId, mallId, f) {
        $http.get(url.url('/announcement/content', {
            'orgId' : orgId,
            'mallId' : mallId
        }, global.mall.api)).then(f)
    }
});

module.exports = homeService;

