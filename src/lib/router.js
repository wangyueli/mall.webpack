
var header = require('../components/views/common/head.html');
var footer = require('../components/views/common/foot.html');
var content = require('../components/views/content.html');
var contentJs = require('../components/views/content.js');
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








