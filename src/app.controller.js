var app = require('appModule');
var jquery = require('jquery');
var _ = require('underscore');
var global = require('global');
var cookie = require('util/cookie');
require('sweetalert');
var regionsYct = require('./asset/address/mallRegions.js');
var regionsJd = require('./asset/address/mallJdRegions.js');
require('serve/auth.js');
require('serve/project.js');
require('serve/message.js');
require('serve/project.js');
require('serve/org.js');
require('serve/product.js');
require('serve/home.js');
require('serve/cart.js');
var AppController =app.controller("AppController",
    function($scope, $log, $sce, $http, $filter, $location, $rootScope, $cookieStore, $cookies, $state, $stateParams, authService , projectService, messageService, cartService, categoryService, orgService, productService, homeService) {

        $scope.global = global;
        $rootScope.regionsYct = regionsYct;
        $rootScope.regionsJd = regionsJd;

        /**登录**/
        //老师
        $scope.getLoginUrlMall = function() {
            return '/#/login';
        };
        //供应商
        $scope.getLoginUrlBack = function() {
            return global.app.url + '/login.html?url=' + encodeURIComponent(window.location);
        };

        /**登出**/
        $scope.logout = function() {
            $cookieStore.remove("access_token");
            jquery.cookie('cart_id', null, {
                'expires': -1,
                'domain': global.domain,
                'path': '/'
            });
            jquery.cookie('access_token', null, {
                'expires': -1,
                'domain': global.domain,
                'path': '/'
            });
            $scope.p = null;
            $scope.o = null;
            $scope.cartId = 0;
            $scope.getCartList();
        };

        $scope.$watch(function() {
            return $cookies.get('access_token');
        }, function(newValue, oldValue, scope) {
            if (newValue != null) {
                $scope.getUserInfo();
                $scope.getCartList();
            }
        });
        $scope.getUserInfo = function() {
            authService.get(function(a) {
                if (a != null) {
                    $scope.p = a.p;
                    $scope.o = _.find(a.o, function(o) {
                        return o.current == true;
                    });
                    //判断是老师还是供应商登陆人
                    $scope.orgType = $scope.o.type;

                    //获取进行中项目数，
                    projectService.getListCount(0, function (data) {
                        $scope.liveCountNum = data;
                    });
                    //消息数量
                    messageService.getListCount(false, function(messageListCount) {
                        $scope.messageListCount = messageListCount;
                    });
                }
            });
        };

        /**
         * 如果登陆人是供应商，判断是否开过店铺 www*/
        orgService.getStore(function (store) {
            if(store.audited == 1){
                $scope.haveStore = true;
            }else {
                $scope.onHave = true;
            }
        },function (nosotre) {});

        /**
         * 待处理订单 www*/
        authService.getOrderCount(function (count) {
            $scope.runningCount = count;
        });

        /**一开始设置cart_id**/
        jquery.cookie('cart_id', 0, {
            'domain' : global.domain,
            'path' : '/'
        });
        $scope.cartId = 0;

        /**刷新购物车列表**/
        $scope.getCartList = function(){
            cartService.get($scope.cartId, function(data) {
                $scope.cartList = data;
                $scope.addUnitPrice();
            });
        };
        $scope.getCartList();

        /**
         * 计算总价，数量
         */
        $scope.addUnitPrice = function(){
            var priceMap = {};
            var priceMapMin = {};
            var priceMapMax = {};
            var allNum = 0;
            _.each($scope.cartList, function(cart){
                if(cart.hasOwnProperty('unitPrice')){
                    if (priceMap[cart.currency] == null) {
                        priceMap[cart.currency] = 0;
                    }
                    priceMap[cart.currency] += cart.unitPrice*cart.num;
                }
                if(cart.hasOwnProperty('unitPriceMin')){
                    if (priceMapMin[cart.currency] == null) {
                        priceMapMin[cart.currency] = 0;
                    }
                    priceMapMin[cart.currency] += cart.unitPriceMin*cart.num;
                }
                if(cart.hasOwnProperty('unitPriceMax')){
                    if (priceMapMax[cart.currency] == null) {
                        priceMapMax[cart.currency] = 0;
                    }
                    priceMapMax[cart.currency] += cart.unitPriceMax*cart.num;
                }
                allNum += cart.num;
            });
            $scope.allPriceMap = priceMap;
            $scope.allPriceMapMin = priceMapMin;
            $scope.allPriceMapMax = priceMapMax;
            $scope.allCartNum = allNum;
        };

        /*
         加入购物车
         */
        $scope.addGoods = function(product,  cartNum){
            //是否能购买
            if($scope.o){
                cartService.insert($scope.cartId, product.productId, product.mallId, cartNum, function(data){
                    swal({
                        text: '成功加入购物车!',
                        icon: "success",
                        buttons:{
                            cancel: {
                                text: '继续购物',
                                visible: true
                            },
                            confirm: {text: '去购物车'}
                        }
                    }).then(function (isConfirm) {
                        if(isConfirm == true){
                            window.open('/#/cart');
                        }
                    });
                    if($scope.cartId == 0){
                        jquery.cookie('cart_id', data.cartId, {
                            'domain': global.domain,
                            'path': '/'
                        });
                        $scope.cartId = data.cartId;
                    }
                    $scope.getCartList(0);
                },function(data){
                    swal({
                        text: '加入购物车失败! 失败原因'+data,
                        type: 'error',
                        buttons:{confirm: {text: '确定'}}
                    });
                })

            }else{
                window.location = $scope.getLoginUrlMall();
            }
        };
        /*
         删除商品
         */
        $scope.dellCart = function(id){
            swal({
                text: "确认删除选中的商品？",
                type: 'warning',
                buttons:{
                    cancel: {text: '取消', visible: true},
                    confirm: {text: '确定'}
                }
            }).then(function(isConfirm) {
                if (isConfirm === true) {
                    cartService.updateNum(id, '0',  function(){
                        swal({
                            text: '商品删除成功!',
                            type: 'success',
                            buttons:{confirm: {text: '确定'}}
                        });
                        $scope.getCartList();
                    },function(){
                        swal({
                            text: '删除失败，请稍后重试!',
                            type: 'error',
                            buttons:{confirm: {text: '确定'}}
                        });
                    });
                }
            });
        };

        /**
         * 折扣*/
        $scope.disCount = function (num) {
            var disNum = $filter('number')(num*10, 1);
            if(disNum%1===0){
                disNum = Math.round(disNum);
                if(disNum==0){
                    disNum = 0.1;
                }
            }
            return disNum;
        };

        /*
         * 获取当前用户所在地址*/
        $rootScope.getRegion = function (mallId) {
            orgService.defaultAdress($cookies.get('orgId'), mallId, function (data) {
                if(data){
                    //如果后台有配数据
                    $scope.address = data.provinceName + data.cityName;
                    if(data.countyName){
                        //有三级地址
                        $scope.address += data.countyName;
                        $rootScope.region = data.city;
                    }
                    if(data.townName){
                        //有四级地址
                        $scope.address += data.townName;
                        $rootScope.region = data.town;
                    }
                }else {
                    //默认北京
                    if(mallId=='JD'){
                        $scope.address = '北京海淀区三环以内';
                        $rootScope.region = 2848;
                    }else {
                        $scope.address = '北京东城区';
                        $rootScope.region = 110101;
                    }
                }
                //地址数据（京东 云采通 两套）
                if(mallId == 'JD'){
                    $rootScope.regions = regionsJd;
                }else {
                    $rootScope.regions = regionsYct;
                }
                //获取省份
                $rootScope.provinceList = _.filter($rootScope.regions, function (data) {
                    return data.code_parent == 000000;
                });
                $rootScope.act = '省';
            });
        };

        /**
         * 商品价格*/
        $scope.prices = {};
        $rootScope.productPrice = function (mallProIds) {
            productService.productPrice(mallProIds, function (data) {
                _.each(data, function (item) {
                    $scope.prices[item.productId] = item;
                });
            })
        };

        $scope.json2object = function(s) {
            if(s){
                return JSON.parse(s);
            }
        };

        /**
         * 客服返回顶部*/
        $scope.toWindowTop = function () {
            jquery('body,html').animate({scrollTop:0},500);
        };
        /**
         * 退出登录*/
        $scope.showQuit = function () {
            jquery('.has-drop').addClass('arrow-v-tran arrow-v');
            jquery('.dorpmenu').stop().fadeIn(200);
        };
        $scope.hideQuit = function () {
            jquery('.has-drop').removeClass('arrow-v');
            jquery('.dorpmenu').fadeOut('fast');
        }
    });

module.exports = AppController;