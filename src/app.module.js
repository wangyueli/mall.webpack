/**
 * @angular-ui-bootstrap
 * 修改服务$modal,组件pagination
 */
var angular = require('angular');
var jquery = require('jquery');
var _ = require('underscore');
var global = require('global');
var dictionary = require('lib/dictionary');
require('./asset/angular-ui-bootstrap/ui-bootstrap-tpls.js');
require('./asset/angular-http-auth/http-auth-interceptor.js');
require('jquery.cookie');
require('angular-cookies');
require('angular-sanitize');
require('angular-local-storage');
require('angular-ui-router');
require('oclazyload');

var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'ngSanitize', 'ngCookies', 'LocalStorageModule', 'http-auth-interceptor', 'ui.bootstrap']);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix(global.domain).setDefaultToCookie(true).setStorageCookie(0, '/', false).setStorageCookieDomain(global.domain).setNotify(true, true);
});
app.config(['$cookiesProvider', function ($cookiesProvider) {
    $cookiesProvider.defaults = {
        path: '/',
        domain: global.domain,
        secure: false
    };
}]);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.run([
    '$rootScope', '$cookies',
    function ($rootScope, $cookies) {
        $rootScope.$on('$stateChangeStart', function () {
            if (jquery("#progress").hasClass("done")) {
                jquery("#progress").removeClass("done");
            }
            $rootScope.ajaxCount = 0;
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            var _hmt = _hmt || [];
            _hmt.push(['_trackPageview', encodeURIComponent('/#' + toState.url)]);
            if (toState.url != null) {
                $rootScope.title = toState.data.title;
                $rootScope.currentPath = toState.url;
            }
            $rootScope.title = toState.data.title;
            if (toState.data.pathCode) {
                $rootScope.accessToken = $cookies.get("access_token");

                $rootScope.currentMenu = _.find(dictionary.MENUS, function (menu) {
                    return menu.code == toState.data.pathCode;
                });
                if ($rootScope.currentMenu) {
                    _.each($rootScope.currentMenu.list, function (list) {
                        list.active = false;
                        if (list.code == toState.data.code) {
                            list.active = true;
                        }
                    });
                }
            }
            setTimeout(function () {
                jquery("#progress").addClass("done");
            }, 6000);
        });

        $rootScope.$on('$stateChangeError', function () {
            jquery("#progress").removeClass("done");
        });

    }]);

app.factory('sessionInjector', ['$q', '$cookies', '$log', '$document', '$rootScope', 'localStorageService',
    function ($q, $cookies, $log, $document, $rootScope, localStorageService) {
        var sessionInjector = {
            request: function (config) {
                if (typeof $rootScope.ajaxCount == 'undefined') {
                    $rootScope.ajaxCount = 0;
                } else {
                    $rootScope.ajaxCount++;
                }
                if (config.url == null) {
                    return config;
                }
                // TODO 控制版本
                if (config.url.indexOf('api') != -1 || config.url.substr(0, global.api.url.length) == global.api.url) {
                    config.headers = config.headers || {};
                    if ($cookies.get('access_token')) {
                        config.headers.Authorization = 'Bearer ' + $cookies.get('access_token');
                    }
                } else if (config.url.substr(0, 1) == "/") {
                    config.url += (config.url.indexOf("?") == -1) ? "?" : "&";
                    config.url += WEB_VERSION;
                }
                return config;
            },
            response: function (response) {
                if (response.status == 204) {
                    response.data = null;
                }
                $rootScope.ajaxCount--;
                if ($rootScope.ajaxCount == 0) {
                    setTimeout(function () {
                        jquery("#progress").addClass("done");
                    }, 500);
                }
                return response.data;
            },
            'responseError': function (rejection) {
                if (rejection.config.url == null || rejection.status != 401) {
                    return $q.reject(rejection.data);
                }
                return $q.reject(rejection);
            }
        };
        return sessionInjector;
    }]);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

module.exports = app;