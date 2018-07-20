
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var ordersService = app.service('ordersService', function ($http) {
    //获取订单列表
    this.getList = function(state, ifPay, keyword, page, rows, f) {
        $http.get(url.url('/orders', {
            status: state,
            expense: ifPay,
            keyword: keyword,
            page: page,
            rows: rows
        } , global.mall.api)).then(f);
    };

    //获取订单详细信息
    this.get = function(id, f) {
        $http.get(url.url('/orders/' + id, null, global.mall.api)).then(f);
    };

    //取消订单
    this.delOrder = function (id, sf, ff) {
        $http.put(url.url('/orders/' + id + '/cancel', null , global.mall.api)).then(sf, ff);
    };

    //获取物流详情
    this.getTrack = function (id, f) {
        $http.get(url.url('/orders/' + id, null, global.mall.api)).then(f);
    };

    //获取订单状态追踪
    this.getFollow = function (id, f) {
        $http.get(url.url('/orders/' + id + '/follow', null, global.mall.api)).then(f);
    };

    //订单状态数量
    this.getStatus = function (ifPay, keyword, f) {
        $http.get(url.url('/orders/groupcount', {
            expense: ifPay,
            keyword: keyword
        }, global.mall.api)).then(f);
    };

    //获取所有的订单数量
    this.getCount = function (state, keyword, f) {
        $http.get(url.url('/orders/count', {
            status: state,
            keyword: keyword
        }, global.mall.api)).then(f);

    };

    //获取去确认经费的payUrl
    this.getPayUrl = function (orderId, f) {
        $http.get(url.url('/orders/' +orderId+ '/payUrl', null, global.mall.api)).then(f);
    };

    //确认收货
    this.surGet = function (orderId, sf, ff) {
        $http.put(url.url('/orders/' +orderId+ '/finished', null, global.mall.api)).then(sf, ff);
    };

    //资产验收
    this.toAsset = function (orderId, sf, ff) {
        $http.put(url.url('/orders/' +orderId+ '/assets/recoreded', null, global.mall.api)).then(sf, ff);
    };

    //补全发票
    this.overInvCode = function (orderId, invNo, sf, ff) {
        $http.put(url.url('/orders/' +orderId+ '/inv', null, global.mall.api), invNo).then(sf, ff);
    };
});

module.exports = ordersService;


