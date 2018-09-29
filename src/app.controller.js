var app = require('appModule');
var jquery = require('jquery');
var _ = require('underscore');
var global = require('global');
require('sweetalert');
require('serve/auth.js');
require('serve/project.js');
require('serve/message.js');
require('serve/org.js');
require('serve/product.js');
require('serve/home.js');
require('serve/cart.js');
require('serve/personAddress.js');

var AppController =app.controller("AppController",
    function($scope, $log, $sce, $http, $filter, $location, $rootScope, $cookieStore, $cookies, $state, $stateParams, authService , projectService, messageService, cartService, categoryService, orgService, productService, homeService, personAddressService) {
        $scope.global = global;

        /*皮肤定制*/
        var windowUrl = window.location.href;
        var linkNode = document.createElement("link");
        linkNode.setAttribute("rel","stylesheet");
        linkNode.setAttribute("type","text/css");
        if(windowUrl.indexOf('https://scu-mall') != -1){
            //四川大学（深红色）
            linkNode.setAttribute("href","skin-css/scu-skin.css");
        }else if(windowUrl.indexOf('https://hfut-mall') != -1){
            //合肥工大（红棕色）
            linkNode.setAttribute("href","skin-css/hfut-skin.css");
        }else if(windowUrl.indexOf('https://hnu-mall') != -1){
            //湖南大学 （深红色）
            linkNode.setAttribute("href","skin-css/scu-skin.css");
        }else if(windowUrl.indexOf('https://bnu-mall') != -1){
            //北京师范（深蓝色）
            linkNode.setAttribute("href","skin-css/bnu-skin.css");
        }else if(windowUrl.indexOf('https://nankai-mall') != -1){
            //南开大学（紫色）
            linkNode.setAttribute("href","skin-css/nankai-skin.css");
        }else if(windowUrl.indexOf('https://jiangnan-mall') != -1){
            //江南大学 （深蓝色）
            linkNode.setAttribute("href","skin-css/bnu-skin.css");
        }else if(windowUrl.indexOf('https://fjmu-mall') != -1){
            //福建医科大（深蓝色）
            linkNode.setAttribute("href","skin-css/bnu-skin.css");
        }else if(windowUrl.indexOf('https://cd120-mall') != -1){
            //四川大学华西医院 棕色）
            linkNode.setAttribute("href","skin-css/cd120-skin.css");
        }else if(windowUrl.indexOf('https://uestc-mall') != -1){
            //电子科技大成都学院（深蓝色）
            linkNode.setAttribute("href","skin-css/bnu-skin.css");
        }else if(windowUrl.indexOf('https://hbgyzy-mall') != -1){
            //湖北职业技术学院 （深蓝色）
            linkNode.setAttribute("href","skin-css/bnu-skin.css");
        }else if(windowUrl.indexOf('https://neu-mall') != -1){
            //东北大学（深蓝色）
            linkNode.setAttribute("href","skin-css/bnu-skin.css");
        }else if(windowUrl.indexOf('https://swufe-mall') != -1){
            //西南财经（深蓝色）
            linkNode.setAttribute("href","skin-css/bnu-skin.css");
        }else if(windowUrl.indexOf('https://ahu-mall') != -1){
            //安徽大学（深蓝色）
            linkNode.setAttribute("href","skin-css/bnu-skin.css");
        }else {
            //默认云采通红
            linkNode.setAttribute("href","skin-css/yct-skin.css");
        }
        document.head.appendChild(linkNode);

        /**
         * 获取当前学校信息**/
        orgService.getSchool(function (data) {
            $scope.schoolName = data.name;
            $scope.orgId = data.id;
            $scope.canTwoCode = data.wxValid;
            $scope.schoolLoginUrl = data.schoolLoginUrl;
            if(data.id==58212){
                $rootScope.titleMall = data.name + '采购商城';
            }else {
                $rootScope.titleMall = data.name + '网上商城';
            }
            $rootScope.tlImg = global.file.url+ '/'+ data.logo;
            if($location.path() == '/'){
                $rootScope.titleTab = $rootScope.titleMall;
            }
            if($location.search().login == 'true'){
                $scope.ifSign();
            }
        });

        /**
         * 是否登录*/
        $scope.ifSign = function () {
            authService.get(function (data) {
                if(data==null){
                    if($scope.canTwoCode){
                        $scope.loginMask = true;
                    }else {
                        window.location = $scope.getLoginUrlMall();
                    }
                }
            });
        };

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
            jquery.cookie('access_token', null, {
                'expires': -1,
                'domain': global.domain,
                'path': '/'
            });
            $scope.p = null;
            $scope.o = null;
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
                    //如果登录了，可以弹出让他绑定微信，手机
                    $scope.accessToken = $cookies.get('access_token');
                    //绑定微信权利
                    $http.get(global.mall.api + '/auths/userMsg').then(function (data) {
                        if(data.canBandingWx == true){
                            if(data.bandingWx == false){
                                //没有绑定微信
                                $scope.noBindWeixin = true;
                                if($location.path() == '/'){
                                    $scope.showBind();
                                }
                            }else {
                                $scope.noBindWeixin = false;
                            }
                        }else {
                            $scope.noOpenWeixin = true;
                        }
                        //是否有权限到采购人平台
                        if(data.powers.length>0){
                            $scope.toShop = true;
                        }
                    });

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

        /**刷新购物车列表**/
        $scope.getCartList = function(){
            cartService.get(function(data) {
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
                cartService.insert(product.productId, product.mallId, cartNum, function(data){
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
                    $scope.getCartList(0);
                },function(data){
                    swal({
                        text: '加入购物车失败! 失败原因'+data,
                        icon: 'error',
                        buttons:{confirm: {text: '确定'}}
                    });
                })

            }else{
                if($scope.canTwoCode){
                    $scope.loginMask = true;
                }else {
                    window.location = $scope.getLoginUrlMall();
                }
            }
        };
        /*
         * 立即购买*/
        $scope.buyNow = function (pId, mallId) {
            if($scope.o){
                cartService.insert(pId, mallId, 1, function(data) {
                    window.location = '/#/cart';
                }, function() {
                });
            }else {
                if($scope.canTwoCode){
                    $scope.loginMask = true;
                }else {
                    window.location = $scope.getLoginUrlMall();
                }
            }
        };
        /*
         删除商品
         */
        $scope.dellCart = function(id){
            swal({
                text: "确认删除选中的商品？",
                icon: 'warning',
                buttons:{
                    cancel: {text: '取消', visible: true},
                    confirm: {text: '确定'}
                }
            }).then(function(isConfirm) {
                if (isConfirm === true) {
                    cartService.updateNum(id, '0',  function(){
                        swal({
                            text: '商品删除成功!',
                            icon: 'success',
                            buttons:{confirm: {text: '确定'}}
                        });
                        $scope.getCartList();
                    },function(){
                        swal({
                            text: '删除失败，请稍后重试!',
                            icon: 'error',
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
        $rootScope.getRegion = function (mallId, f) {
            orgService.defaultAdress(mallId, function (data) {
                if(data){
                    //如果后台有配数据
                    $scope.address = data.provinceName + data.cityName;
                    if(data.townName){
                        //有四级地址
                        $scope.address += data.townName;
                        $rootScope.region = data.town;
                    }else if(data.countyName){
                        //有三级地址
                        $scope.address += data.countyName;
                        $rootScope.region = data.county;
                    }else {
                        //只到二级
                        $rootScope.region = data.city;
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
                //获取省份
                personAddressService.getProvinces(mallId, function (data) {
                    $rootScope.provinceList = data;
                });
                $scope.actRegion = '省';
                $scope.actTitle = 0;
                f();
            });
        };

        /**
         * 点击不同地址title时*/
        $scope.titleProv = '请选择';
        $scope.titleCity = '请选择';
        $scope.titleCounty = '请选择';
        $scope.titleTown = '请选择';
        $scope.actTitleClick = function (act) {
            if(act==0){
                $scope.actTitle = 0;
                $scope.actRegion='省';
                $scope.titleCity = '请选择';
                $scope.titleCounty = '请选择';
                $scope.titleTown = '请选择';
            }else if(act==1){
                $scope.actTitle = 1;
                $scope.actRegion='市';
                $scope.titleCounty = '请选择';
                $scope.titleTown = '请选择';
            }else if(act==2) {
                $scope.actTitle = 2;
                $scope.actRegion='县';
                $scope.titleTown = '请选择';
            }else {
                $scope.actTitle = 3;
                $scope.actRegion='乡';
            }
        };

        /**
         * 地址筛选*/
        $rootScope.addressChooseAll = function (mallId, ad, adId, adName, f) {
            if(ad=='provice'){
                $scope.titleProv = adName;
                $scope.address = $scope.titleProv;
                personAddressService.getCities(mallId, adId, function (data) {
                    $scope.cityList = data;
                    $scope.actRegion = '市';
                    $scope.actTitle = 1;
                })
            }else if(ad=='city'){
                $scope.titleCity = adName;
                $scope.address = $scope.titleProv + $scope.titleCity;
                personAddressService.getCounties(mallId, adId, function (data) {
                    $scope.countyList = data;
                    if($scope.countyList.length>0){
                        $scope.actRegion='县';
                        $scope.actTitle = 2;
                    }else {
                        $rootScope.region = adId;
                        f();
                        jquery('.tab-address').hide();
                    }
                })
            }else if(ad=='county'){
                $scope.titleCounty = adName;
                $scope.address =  $scope.titleProv + $scope.titleCity + $scope.titleCounty;
                personAddressService.getCounties(mallId, adId, function (data) {
                    $scope.townList = data;
                    if($scope.townList.length > 0){
                        $scope.actRegion='乡';
                        $scope.actTitle = 3;
                    }else {
                        $rootScope.region = adId;
                        f();
                        jquery('.tab-address').hide();
                    }
                })
            }else if(ad=='town'){
                $scope.titleTown = adName;
                $rootScope.region = adId;
                $scope.address = $scope.titleProv + $scope.titleCity + $scope.titleCounty + $scope.titleTown;
                jquery('.tab-address').hide();
                f();
            }
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
        * 搜索*/
       //到商品列表
        $scope.search = function () {
            if ($rootScope.keyword != null && $rootScope.keyword != '') {
                $scope.downSearch = false;
                if($location.search().keyword == $rootScope.keyword){
                    console.log('相等');
                    $location.url('/product?keyword=');
                    document.location.reload();
                }
                $location.url('/product?keyword=' + encodeURIComponent($rootScope.keyword));
            }
        };
        //enter键
        var keyCount = -1;
        $scope.keySearch = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.search();
            }else if(keycode == 38){
                keyCount--;
                if(keyCount < 0){
                    keyCount = 0;
                }
                $rootScope.keyword = $scope.keys[keyCount][0];
            }else if(keycode == 40){
                keyCount++;
                if(keyCount > $scope.keys.length-1){
                    keyCount = $scope.keys.length-1;
                }
                $rootScope.keyword = $scope.keys[keyCount][0];
            }else {
                $scope.getKeys();
            }
            $scope.thisKey = keyCount;
        };
        //关键字实时获取
        $scope.getKeys = function () {
            productService.getKeys($rootScope.keyword, function (data) {
                $scope.keys = data.result;
            });
        };
        $scope.getKeys();

        /**
         * 客服返回顶部*/
        $scope.toWindowTop = function () {
            jquery('body,html').animate({scrollTop:0},500);
        };

        /**
         * 已绑定微信用户*/
        $scope.weiUsers = function () {
            orgService.getBindUsers(function (data) {
                $scope.weiBindings = data;
            });
        };

        /**
         * 退出登录*/
        $scope.showQuit = function () {
            jquery('.has-drop2').addClass('arrow-v-tran arrow-v');
            jquery('.dorpmenu2').stop().fadeIn(200);
        };
        $scope.hideQuit = function () {
            jquery('.has-drop2').removeClass('arrow-v');
            jquery('.dorpmenu2').fadeOut('fast');
        };
        $scope.showQuit1 = function () {
            jquery('.has-drop1').addClass('arrow-v-tran arrow-v');
            jquery('.dorpmenu1').stop().fadeIn(200);
        };
        $scope.hideQuit1 = function () {
            jquery('.has-drop1').removeClass('arrow-v');
            jquery('.dorpmenu1').fadeOut('fast');
        };

        $scope.showLogin = function () {
            $scope.loginMask = true;
        };

        $scope.closeLogin = function () {
            $scope.loginMask = false;
        };

        $scope.showBind = function () {
            $scope.bindMask = true;
        };

        $scope.closeBind = function () {
            $scope.bindMask = false;
        };
        $scope.bindAlready = function () {
            $scope.noBindWeixin = false;
        }

    });

module.exports = AppController;