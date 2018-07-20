
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var projectService = app.service('projectService', function ($http) {
	this.getListCount = function(win, f) {
		$http.get(util.url('/project/count', {
			'win' : win
		}, global.sell.api)).then(function(data) {
			f(data);
		});
	};
	this.getList = function(page, rows, win, f) {
		$http.get(util.url('/project', {
			'page' : page,
			'rows' : rows,
			'win' : win
		}, global.sell.api)).then(function(data) {
			f(data);
		});
	};
});

module.exports = projectService;
