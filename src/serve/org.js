
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var orgService = app.service('orgService', function ($http) {
	this.get = function(id, f) {
		$http.get(url.url('/org/' + id, null, global.app.api)).then(function(data) {
			f(data);
		});
	};
	//获取商城供应商名录
	this.getMorgList = function(orgId, page, rows, category, keyword, f) {
		$http.get(url.url('/mallStore/', {
			'orgId' : orgId,
			'page' : page,
			'rows' : rows,
			'category' : category,
			'keyword' : keyword
		}, global.mall.api)).then(function(data) {
			f(data);
		});
	};

	//获取店铺
	this.getStore = function(sf, ff) {
		$http.get(url.url('/store/0', null, global.mallSell.api)).then(sf, ff);
	};

	//获取学校信息
	this.getSchool = function (orgId, f) {
		$http.get(url.url('/orgspread/detail', {
			'orgId': orgId
		}, global.mall.api)).then(f);
	};

	//获取学校下可以访问商城
	this.getUseMall = function (orgId, f) {
		$http.get(url.url('/mall/org', {
			'orgId': orgId
		}, global.mall.api)).then(f);
	};

	//供应商名录 分类
	this.getCt = function (orgId, f) {
		$http.get(url.url('/mallStore/category', {
			'orgId' : orgId
		}, global.mall.api)).then(f);
	};

	//登录人默认地
	this.defaultAdress = function (orgId, mallId, f) {
		$http.get(url.url('/mall/region', {
			'orgId' : orgId,
			'mallId' : mallId
		}, global.mall.api)).then(f)
	};
});

module.exports = orgService;


