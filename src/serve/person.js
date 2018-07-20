
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var personService = app.service('personService', function ($http) {
	this.getList = function(orgName, f) {
		$http.get(util.url('/person', {
			'orgName' : orgName
		}, global.app.api)).then(function(data) {
			f(data);
		});
	};
	this.get = function(f) {
		$http.get(util.url('/person/0', null, global.app.api)).then(f);
	};

	this.password = function(oldPassword, newPassword, sf, ff) {
		$http.put(util.url('/person/password'), {
			'oldPassword' : oldPassword,
			'newPassword' : newPassword
		}, global.app.api).then(sf, ff);
	};

	this.getMobileVerify = function(mobile, sf, ff) {
		$http.get(util.url('/person/0/mobile/' + mobile + '/verify', null, global.app.api)).then(sf, ff);
	};
	this.getEmailVerify = function(email, sf, ff) {
		$http.get(util.url('/person/0/email/' + email + '/verify', null, global.app.api)).then(sf, ff);
	};
	this.updateMobile = function(mobile, verify, password, sf, ff) {
		$http.put(util.url('/person/0/mobile', null, global.app.api), {
			'mobile' : mobile,
			'verify' : verify,
			'password' : password
		}).then(sf, ff);
	};
	this.updateEmail = function(email, verify, password, sf, ff) {
		$http.put(util.url('/person/0/email', null, global.app.api), {
			'email' : email,
			'verify' : verify,
			'password' : password
		}).then(sf, ff);
	};

	this.updateAnswerVerify = function(answers, sf, ff) {
		$http.post(util.url('/person/0/answer/verify', null, global.app.api), answers).then(sf, ff);
	};
	this.updateAnswer = function(answers, sf, ff) {
		$http.put(util.url('/person/0/answer', null, global.app.api), answers).then(sf, ff);
	};
});

module.exports = personService;


