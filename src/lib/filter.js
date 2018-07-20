var app = require('appModule');
var _ = require('underscore');
var math = require('util/math');
var dictionary = require('./dictionary');

app.filter('dictionary', function () {
    return function (value, name) {
        if (_.isArray(dictionary[name])) {
            var co = _.find(dictionary[name], function (o) {
                return o.code == value;
            });
            return co == null ? null : co.name;
        } else {
            return dictionary[name][value];
        }
    };
});
app.filter('unsafe', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
});
app.filter('currency', function () {
    return function (currencyCode) {
        return dictionary.currency[currencyCode];
    };
});
app.filter('currencyName', function () {
    return function (currencyCode) {
        return dictionary.currencyName[currencyCode];
    };
});
app.filter('cny', function () {
    return function (money) {
        return math.numToCny(money);
    };
});
app.filter('urlEncode', function () {
    return function (url) {
        return encodeURIComponent(url);
    };
});
app.filter('shopUrl', function () {
    return function (url, orgId) {
        return getShopUrl(orgId, url);
    };
});
app.filter('trusted', function ($sce) {
    return function (html) {
        if (typeof html == 'string') {
            return $sce.trustAsHtml(html);
        }
    };
});
app.filter('searchLight', function ($sce) {
    return function (name, keyword) {
        var reg = new RegExp(keyword, "g");
        var result = "";
        if (keyword.length != 0 && name.indexOf(keyword) > -1) {
            result = name.replace(reg, '<span class=\'highlight\'>' + keyword + '</span>');
        } else {
            result = name;
        }
        return $sce.trustAsHtml(result);
    };
});

module.exports = app;
