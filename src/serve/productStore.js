
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var productStoreService = app.service('productStoreService', function ($http) {
    //获取在售商品列表
    this.getList = function(storeId, mallId, page, rows, f) {
        $http.get(url.url('/mall/' + mallId + '/product', {
            'storeId' : storeId,
            'page' : page,
            'rows' : rows
        }, global.mall.api)).then(f);
    };
});

module.exports = productStoreService;

