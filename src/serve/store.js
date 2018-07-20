

var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var storeService = app.service('storeService', function ($http) {
	//获取店铺商品列表
	this.getList = function(orgId, storeId, page, rows, f) {
		$http.get(url.url('/mall/search', {
			orgId: orgId,
			storeId: storeId,
			page : page,
			rows : rows
		}, global.mall.api)).then(f);
	};

	//获取店铺信息
	this.get = function(id, f){
		$http.get(url.url('/store/' + id + '/detail', null, global.mall.api)).then(f);
	};
});

module.exports = storeService;
