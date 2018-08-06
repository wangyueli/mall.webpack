
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

	//获取省
	this.getProvinces = function(mallId, f) {
		$http.get(url.url('/area/province', {
			'mallId': mallId
		}, global.mall.api)).then(f);
	};

	//获取市
	this.getCities = function(mallId, provinceId, f) {
		$http.get(url.url('/area/city', {
			'mallId': mallId,
			'provinceId': provinceId
		}, global.mall.api)).then(f);
	};

	//获取县
	this.getCounties = function(mallId, cityId, f) {
		$http.get(url.url('/area/county', {
			'mallId': mallId,
			'cityId': cityId
		}, global.mall.api)).then(f);
	};

	//获取镇
	this.getTowns = function(mallId, countyId, f) {
		$http.get(url.url('/area/town', {
			'mallId': mallId,
			'countyId': countyId
		}, global.mall.api)).then(f);
	}
});

module.exports = personAddressService;


