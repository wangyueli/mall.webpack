var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var helperService = app.service('helperService', function ($http) {
    //获取商品列表 （简化）
    this.getPrtList = function(orgId, mallId, f) {
        $http.get(url.url('/homerecommend/product/content', {
            'orgId': orgId,
            'mallId' : mallId,
            'content' : 'detail'
        }, global.mall.api)).then(f);
    };
});

module.exports = helperService;
