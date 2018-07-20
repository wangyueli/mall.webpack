
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var mallService = app.service('mallService', function ($http) {
    this.getOrders = function(page, rows, sf) {
        $http.get(url.url('/orders/www',{
            'page': page,
            'rows': rows
        }, global.mall.api)).then(sf);
    };
    this.getSurvey = function(page, rows, sf) {
        $http.get(url.url('/survey/www',{
            'page': page,
            'rows': rows
        }, global.survey.api)).then(sf);
    };
    this.getHotProducts = function(page, rows, sf) {
        $http.get(url.url('/product/www',{
            'page': page,
            'rows': rows
        }, global.mall.api)).then(sf);
    };
    this.getSeller = function(page, rows, sf) {
        $http.get(url.url('/store/www',{
            'page': page,
            'rows': rows
        }, global.mall.api)).then(sf);
    };
    this.getMalls = function(sf) {
        $http.get(url.url('/orgspread/www', null, global.mall.api)).then(sf);
    };
});

module.exports = mallService;


