
var contentCart = require('../components/views/content_cart.html');
var contentBack = require('../components/views/content_black.html');
var contentOrder = require('../components/views/content_order.html');
var contentOffical = require('../components/views/content_offical.html');
var contentLogin = require('../components/views/content_login.html');
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
            url: "/?orgId&mallId",
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
        .state('content.product', {
            url: 'product?keyword&categoryId&brand&mallId',
            data: {
                code: 'product',
                title: '商品列表-',
                pathCode: 'product'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/product/index.html'))}, 'productCtrl');
                });
            },
            controller: 'productCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/product/index.js'));
                    }, 'productCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('content.channel', {
            url: 'channel?mallId',
            data: {
                code: 'channel',
                title: '频道首页-',
                pathCode: 'channel'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/channel/index.html'))}, 'channelCtrl');
                });
            },
            controller: 'channelCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/channel/index.js'));
                    }, 'channelCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('content.org', {
            url: 'org',
            data: {
                code: 'org',
                title: '供应商名录-',
                pathCode: 'org'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/org/index.html'))}, 'orgCtrl');
                });
            },
            controller: 'orgCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/org/index.js'));
                    }, 'orgCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('content.productDetail', {
            url: 'product/detail?mallId&id',
            data: {
                code: 'productDetail',
                title: '商品详情-',
                pathCode: 'productDetail'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/product/detail.html'))}, 'productDetailCtrl');
                });
            },
            controller: 'productDetailCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/product/detail.js'));
                    }, 'productDetailCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentCart.cart', {
            url: 'cart',
            data: {
                code: 'cart',
                title: '我的购物车-',
                pathCode: 'cart'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/cart/index.html'))}, 'cartCtrl');
                });
            },
            controller: 'cartCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/cart/index.js'));
                    }, 'cartCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentOrder.order', {
            url: 'order?cartMallId',
            data: {
                code: 'order',
                title: '订单信息-',
                pathCode: 'order'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/order/index.html'))}, 'orderCtrl');
                });
            },
            controller: 'orderCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/order/index.js'));
                    }, 'orderCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentLogin.orderPayReturn', {
            url: 'pay-return?id',
            data: {
                code: 'orderPayReturn',
                title: '',
                pathCode: 'orderPayReturn'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/order/payReturn.html'))}, 'payReturnCtrl');
                });
            },
            controller: 'payReturnCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/order/payReturn.js'));
                    }, 'payReturnCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentLogin.orderPaySuccessWait', {
            url: 'pay-success-waiting?id',
            data: {
                code: 'orderPaySuccessWait',
                title: '',
                pathCode: 'orderPaySuccessWait'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/order/paySuccessWait.html'))}, 'paySuccessWaitCtrl');
                });
            },
            controller: 'paySuccessWaitCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/order/paySuccessWait.js'));
                    }, 'paySuccessWaitCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentOrder.orderPaySuccess', {
            url: 'pay-success',
            data: {
                code: 'orderPaySuccess',
                title: '订单信息-',
                pathCode: 'orderPaySuccess'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/order/paySuccess.html'))}, 'paySuccessCtrl');
                });
            },
            controller: 'paySuccessCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/order/paySuccess.js'));
                    }, 'paySuccessCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentPerson.orders', {
            url: 'orders',
            data: {
                code: 'orders',
                title: '我的订单列表-',
                pathCode: 'orders'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/orders/index.html'))}, 'ordersCtrl');
                });
            },
            controller: 'ordersCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/orders/index.js'));
                    }, 'ordersCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentBack.ordersDetail', {
            url: 'orders/detail?id',
            data: {
                code: 'ordersDetail',
                title: '我的订单详情-',
                pathCode: 'ordersDetail'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/orders/detail.html'))}, 'orderDetailCtrl');
                });
            },
            controller: 'orderDetailCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/orders/detail.js'));
                    }, 'orderDetailCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentOrder.ordersAsset', {
            url: 'orders/asset?id',
            data: {
                code: 'ordersAsset',
                title: '资产入账-',
                pathCode: 'ordersAsset'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/orders/asset.html'))}, 'assetCtrl');
                });
            },
            controller: 'assetCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/orders/asset.js'));
                    }, 'assetCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentOrder.store', {
            url: 'store?id',
            data: {
                code: 'store',
                title: '我的店铺-',
                pathCode: 'store'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/store/index.html'))}, 'storeCtrl');
                });
            },
            controller: 'storeCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/store/index.js'));
                    }, 'storeCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('content.helpPoor', {
            url: 'helper?mallId',
            data: {
                code: 'helpPoor',
                title: '精准扶贫-',
                pathCode: 'helpPoor'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/helpPoor/index.html'))}, 'helpPoorCtrl');
                });
            },
            controller: 'helpPoorCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/helpPoor/index.js'));
                    }, 'helpPoorCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('content.hotSale1', {
            url: 'sale1',
            data: {
                code: 'hotSale1',
                title: '热卖商品1-',
                pathCode: 'hotSale1'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/hotSale/sale1/index.html'))}, 'hotSaleCtrlOne');
                });
            },
            controller: 'hotSaleCtrlOne',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/hotSale/sale1/index.js'));
                    }, 'hotSaleCtrlOne');
                    return deferred.promise;
                }
            }
        })
/*
        .state('content.hotSale2', {
            url: 'sale2',
            data: {
                code: 'hotSale2',
                title: '热卖商品2-',
                pathCode: 'hotSale2'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/hotSale/sale2/index.html'))}, 'hotSaleCtrlOne');
                });
            },
            controller: 'hotSaleCtrlOne',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/hotSale/sale2/index.js'));
                    }, 'hotSaleCtrlOne');
                    return deferred.promise;
                }
            }
        })
*/
        .state('contentBack.bindLogin', {
            url: 'bind',
            data: {
                code: 'bindLogin',
                title: '如何绑定资采通-',
                pathCode: 'bindLogin'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/bindLogin/index.html'))}, 'bindLogin');
                });
            }
        })
        .state('contentOffical.mall', {
            url: 'mall',
            data: {
                code: 'mall',
                title: '云采通-商城首页--',
                pathCode: 'mall'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/wwwHome/index.html'))}, 'wwwHomeCtrl');
                });
            },
            controller: 'wwwHomeCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/wwwHome/index.js'));
                    }, 'wwwHomeCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentLogin.login', {
            url: 'login',
            data: {
                code: 'login',
                title: '教师登录--',
                pathCode: 'login'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/login/index.html'))}, 'loginCtrl');
                });
            },
            controller: 'loginCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/login/index.js'));
                    }, 'loginCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('content.compare', {
            url: 'compare',
            data: {
                code: 'compare',
                title: '我的对比--',
                pathCode: 'compareCtrl'
            },
            templateProvider: function($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/compare/index.html'))}, 'compareCtrl');
                });
            },
            controller: 'compareCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/compare/index.js'));
                    }, 'compareCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentPerson.evaluate', {
            url: 'person/evaluate',
            data: {
                code: 'evaluate',
                title: '评价--',
                pathCode: 'evaluateCtrl'
            },
            templateProvider: function ($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/person/evaluate.html'))}, 'evaluateCtrl');
                });
            },
            controller: 'evaluateCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/person/evaluate.js'));
                    }, 'evaluateCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentPerson.address', {
            url: 'person/address',
            data: {
                code: 'address',
                title: '我的地址信息--',
                pathCode: 'personAddrCtrl'
            },
            templateProvider: function ($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/person/address/evaluate.html'))}, 'personAddrCtrl');
                });
            },
            controller: 'personAddrCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/person/address/evaluate.js'));
                    }, 'personAddrCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentPerson.core', {
            url: 'person/core',
            data: {
                code: 'core',
                title: '个人信息--',
                pathCode: 'personCoreCtrl'
            },
            templateProvider: function ($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/person/core/index.html'))}, 'personCoreCtrl');
                });
            },
            controller: 'personCoreCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/person/core/index.js'));
                    }, 'personCoreCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('contentPerson.collect', {
            url: 'person/collect',
            data: {
                code: 'collect',
                title: '个人收藏--',
                pathCode: 'personCollectCtrl'
            },
            templateProvider: function ($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/person/collect/index.html'))}, 'personCollectCtrl');
                });
            },
            controller: 'personCollectCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/person/collect/index.js'));
                    }, 'personCollectCtrl');
                    return deferred.promise;
                }
            }
        })
        .state('content.square', {
            url: 'square',
            data: {
                code: 'square',
                title: 'square',
                pathCode: 'square'
            },
            templateProvider: function ($q) {
                return $q(function(resolve) {
                    require.ensure([], function(){return resolve(require('../components/square/index.html'))}, 'squareCtrl');
                });
            },
            controller: 'squareCtrl',
            resolve: {
                lazyLoad: function($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        $ocLazyLoad.load({name: 'app'});
                        deferred.resolve(require('../components/square/index.js'));
                    }, 'squareCtrl');
                    return deferred.promise;
                }
            }
        })




}]);


module.exports = router;








