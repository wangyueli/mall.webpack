var routes = {
    defaultRoute: '/',
    routes : {
        '/': {
            title      : '',
            templateUrl: 'home.html',
            controller : 'home',
            rootRouter : 'content',
            name       : 'home'
        },
        '/channel?mallId':{
            title: '频道首页-',
            templateUrl: '/channel/index.html',
            controller : '/channel/index',
            rootRouter : 'content',
            name       : 'channel'
        },
        '/product?keyword&categoryId&brand&mallId': {
            title      : '商品列表-',
            templateUrl: '/product/index.html',
            controller : '/product/index',
            rootRouter : 'content',
            name       : 'product'
        },
        '/product/detail?mallId&id': {
            title      : '商品详情-',
            templateUrl: '/product/detail.html',
            controller : '/product/detail',
            rootRouter : 'content',
            name       : 'product-id'
        },
        '/cart': {
            title      : '我的购物车-',
            templateUrl: '/cart/index.html',
            controller : '/cart/index',
            rootRouter : 'content_cart',
            name       : 'cart'
        },
        '/order?cartMallId': {
            title      : '订单信息-',
            templateUrl: '/order/index.html',
            controller : '/order/index',
            rootRouter : 'content_cart',
            name       : 'order'
        },
        '/pay': {
            title      : '订单提交成功-',
            templateUrl: '/order/pay.html',
            controller : 'order/pay',
            rootRouter : 'content_cart',
            name       : 'pay'
        },
        '/orders': {
            title      : '我的订单列表-',
            templateUrl: '/orders/index.html',
            controller : '/orders/index',
            rootRouter : 'content_order',
            name       : 'orders'
        },
        '/orders/detail?id': {
            title      : '我的订单详情-',
            templateUrl: '/orders/detail.html',
            controller : '/orders/detail',
            rootRouter : 'content_black',
            name       : 'orders-detail'
        },
        '/orders/asset?id': {
            title      : '资产入账-',
            templateUrl: '/orders/asset.html',
            controller : '/orders/asset',
            rootRouter : 'content_order',
            name       : 'orders-asset'
        },
        '/store?id': {
            title      : '我的店铺-',
            templateUrl: '/store/index.html',
            controller : '/store/index',
            rootRouter : 'content',
            name       : 'store'
        },
        '/compare' : {
            title      : '对比页面-',
            templateUrl: '/compare/index.html',
            controller : '/compare/index',
            rootRouter : 'content',
            name       : 'compare'
        },
        '/org' : {
            title      : '供应商名录-',
            templateUrl: '/org/index.html',
            controller : '/org/index',
            rootRouter : 'content',
            name       : 'org'
        },
        '/bind' : {
            title      : '如何绑定资采通-',
            templateUrl: 'how_bind.html',
            controller : 'home',
            rootRouter : 'content_black',
            name       : 'how_bind'
        },
        '/mall' : {
            title      : '云采通-商城首页-',
            templateUrl: 'wwwHome/index.html',
            controller : 'wwwHome/index',
            rootRouter : 'content_mall',
            name       : 'www_home'
        },
        '/login' : {
            title      : '教师登录-',
            templateUrl: 'login/login.html',
            controller : 'login/login',
            rootRouter : 'content_login',
            name       : 'login'
        },
        '/helper?mallId' : {
            title      : '精准扶贫-',
            templateUrl: 'helpPoor/index.html',
            controller : 'helpPoor/index',
            rootRouter : 'content',
            name       : 'help'

        }
    }
};
module.exports = routes;
