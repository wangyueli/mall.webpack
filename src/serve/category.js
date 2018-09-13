var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var categoryService = app.service('categoryService', function ($http) {
	//获取分类列表
	this.get = function(mallId, f) {
		$http.get(url.url('/category/list', {
			'mallId': mallId
		}, global.mall.api)).then(f);
	};
});

module.exports = categoryService;
