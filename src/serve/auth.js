var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var authService = app.service('authService', function ($http) {
	this.get = function(f) {
		$http.get(url.url('/auth', null, global.app.api)).then(f);
	};
	this.getWeixinQrcode = function(f) {
		$http.get(url.url('/auth/weixin/qrcode', null, global.app.api)).then(f);
	};
	this.changeOrg = function(orgId, f) {
		$http.put(url.url('/auth/' + orgId, null, global.app.api)).then(f);
	};

	this.getAccessToken = function(f) {
		$http.get(url.url('/auth/access_token', null, global.app.api)).then(f);
	};

	this.getCertified = function(orgId, f) {
		$http.get(url.url('/auth/' + orgId, null, global.app.api)).then(f);
	};

	this.logout = function(f) {
		$http['delete'](url.url('/auth', null, global.app.api)).then(f, f);
	};

	this.proxy = function(mobile, f) {
		$http.post(url.url('/auth/proxy/' + mobile, null, global.app.api)).then(f);
	};

	//获取待处理订单数量
	this.getOrderCount = function (f) {
		$http.get(url.url('/orders/count', {
			'running': true
		}, global.mallSell.api)).then(f);
	};
});
module.exports = authService;
