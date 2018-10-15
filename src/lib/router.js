
var contentCart = require('../components/views/content_cart.html');
var contentBack = require('../components/views/content_black.html');
var contentOrder = require('../components/views/content_order.html');
var contentOffical = require('../components/views/content_offical.html');
var contentLogin = require('../components/views/content_login.html');
var contentNo = require('../components/views/content_no.html');
var contentPerson = require('../components/views/content_person.html');
var header = require('../components/views/common/head.html');
var footer = require('../components/views/common/foot.html');
var content = require('../components/views/content.html');
var contentJs = require('../components/views/content.js');
var contentOfficalJs = require('../components/views/content_offical.js');
var app = require('appModule');

var router = app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('content', {
            abstract: true,
            url: "/?mallId",
            views: {
                "": {
                    template: content,
                    controller: 'contentCtrl',
                    resolve: {
                        lazyLoad: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({
                                    name: 'app'
                                });
                                deferred.resolve(contentJs);
                            });
                            return deferred.promise;
                        }]
                    }
                },
                "head@content": {template: header},
                "foot@content": {template: footer}
            }
        })
        .state('contentOrder', {
            abstract: true,
            url: "/",
            views: {
                "": {
                    template: contentOrder,
                    controller: 'contentCtrl',
                    resolve: {
                        lazyLoad: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({
                                    name: 'app'
                                });
                                deferred.resolve(contentJs);
                            });
                            return deferred.promise;
                        }]
                    }
                },
                "head@contentOrder": {template: header},
                "foot@contentOrder": {template: footer}
            }
        })
        .state('contentCart', {
            abstract: true,
            url: "/",
            views: {
                "": {
                    template: contentCart,
                    controller: 'contentCtrl',
                    resolve: {
                        lazyLoad: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({
                                    name: 'app'
                                });
                                deferred.resolve(contentJs);
                            });
                            return deferred.promise;
                        }]
                    }
                },
                "head@contentCart": {template: header},
                "foot@contentCart": {template: footer}
            }
        })
        .state('contentBack', {
            abstract: true,
            url: "/",
            views: {
                "": {
                    template: contentBack
                },
                "head@contentBack": {template: header},
                "foot@contentBack": {template: footer}
            }
        })
        .state('contentPerson', {
            abstract: true,
            url: "/",
            views: {
                "": {
                    template: contentPerson
                },
                "head@contentPerson": {template: header},
                "foot@contentPerson": {template: footer}
            }
        })
        .state('contentOffical', {
            abstract: true,
            url: "/",
            views: {
                "": {
                    template: contentOffical,
                    controller: 'contentCtrl',
                    resolve: {
                        lazyLoad: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({
                                    name: 'app'
                                });
                                deferred.resolve(contentOfficalJs);
                            });
                            return deferred.promise;
                        }]
                    }
                }
            }
        })
        .state('contentNo', {
            abstract: true,
            url: "/",
            views: {
                "": {
                    template: contentNo
                }
            }
        })
        .state('contentLogin', {
            abstract: true,
            url: "/",
            views: {
                "": {
                    template: contentLogin
                }
            }
        });



    $stateProvider
        .state('content.home', {
            url: '',
            data: {
                code: 'home',
                title: '',
                pathCode: 'home'
            },
            templateProvider: function ($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/home/home.html'))}, 'homeCtrl');
                });
            },
            controller: 'homeCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/home/home.js'));
                    }, 'homeCtrl');
                    return deferred.promise;
                }
            }
        })
}]);


module.exports = router;








