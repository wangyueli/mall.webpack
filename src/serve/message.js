var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var messageService = app.service('messageService', function ($http) {
	this.getListCount = function(readed, f) {
		$http.get(url.url('/message/count',{
			'readed': readed
		}, global.app.api)).then(f);
	};
	this.getList = function(page, rows, f) {
		$http.get(url.url('/message', {
			'page' : page,
			'rows' : rows
		}, global.app.api)).then(f);
	};
	this.get = function(id, f) {
		$http.get(url.url('/message/' + id, null, global.app.api)).then(f);
	};
});

module.exports = messageService;

