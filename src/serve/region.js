
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var regionService = app.service('regionService', function ($http) {
	this.getList = function(parentCode, f) {
		$http.get(util.url('/region', {
			'parentCode' : parentCode == null ? '000000' : parentCode
		}, global.api.url)).then(f);
	};
	this.getCityList = function(f) {
		$http.get(util.url('/region', null, global.api.url)).then(f);
	};

	this.get = function(code, f) {
		$http.get(util.url('/region/' + code, null, global.appSy.url)).then(f);
	};
});

module.exports = regionService;
