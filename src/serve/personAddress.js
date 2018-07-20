
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var personAddressService = app.service('personAddressService', function ($http) {
	//获取所有地址列表
	this.getList = function(page, rows, thisMallId, f) {
		$http.get(url.url('/person/address',{
			'page' : page,
			'rows' : rows,
			'mallId': thisMallId
		}, global.mall.api)).then(f);
	};

	//添加新的地址 或者 修改地址
	this.insert = function(id, address, thisMallId, sf, ff) {
		$http.post(url.url('/person/address/' + id, {
			'mallId': thisMallId
		}, global.mall.api), address).then(sf, ff);
	};

	//修改地址时获取原始地址
	this.get = function(id, thisMallId, f) {
		$http.get(url.url('/person/address/' + id, {
			'mallId': thisMallId
		}, global.mall.api)).then(f);
	};

	//删除地址信息
	this.deleteAddr = function(id, thisMallId, sf, ff) {
		$http.delete(url.url('/person/address/' + id, {
			'mallId': thisMallId
		}, global.mall.api)).then(sf, ff);
	};

});

module.exports = personAddressService;


