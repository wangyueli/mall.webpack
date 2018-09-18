
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var orgService = app.service('orgService', function ($http) {

	//获取商城供应商名录
	this.getMorgList = function(page, rows, category, keyword, f) {
		$http.get(url.url('/mallStore/', {
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
	this.getSchool = function (f) {
		$http.get(url.url('/orgspread/detail', null, global.mall.api)).then(f);
	};

	//获取学校下可以访问商城
	this.getUseMall = function (f) {
		$http.get(url.url('/mall/org', null, global.mall.api)).then(f);
	};

	//供应商名录 分类
	this.getCt = function (f) {
		$http.get(url.url('/mallStore/category', null, global.mall.api)).then(f);
	};

	//登录人默认地
	this.defaultAdress = function (mallId, f) {
		$http.get(url.url('/mall/region', {
			'mallId' : mallId
		}, global.mall.api)).then(f)
	};

	//已绑定用户
	this.getBindUsers = function (f) {
		$http.get(url.url('/wx/bandingUsers', null, global.mall.api)).then(f);
	};

	//解除绑定
	this.delBindUser = function (id, sf, ff) {
		$http.put(url.url('/wx/unbind', null, global.mall.api), {'id': id}).then(sf, ff);
	};

});

module.exports = orgService;


