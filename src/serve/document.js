var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var documentService = app.service('documentService', function ($http) {
	this.getList = function(ids, f) {
		$http.get(url.url('/', {
			'id' : ids
		}, global.file.url)).then(f);
	};
});

module.exports = documentService;
