
var app = require('appModule');
var _ = require('underscore');
var global = require('global');
var jquery = require('jquery');

require('swiper');
require('serve/home.js');
require('serve/product.js');
require('serve/org.js');
require('serve/category.js');

var home = app.controller('homeCtrl', function ($scope, $rootScope, $location, $filter, homeService, productService, orgService, categoryService, $stateParams) {
    $scope.IEVersion = function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            $rootScope.itIe = true;
        }else if(isIE11) {
            $rootScope.itIe = true;
        }else if(isEdge) {
            //edge
        }else{
            //不是ie浏览器；
        }
    };
    $scope.IEVersion();

    $rootScope.Tabtitle = $scope.title + $rootScope.titleMall;

    /**
     * 获取orgId*/
    orgService.getSchool($stateParams.orgId, function (data) {
        $scope.orgId = data.id;
        orgService.getUseMall($scope.orgId, function (data) {
            //判断是否开通京东
            _.each(data, function (item) {
                if(item.mallId=='JD'){
                    $rootScope.haveJd = true;
                }
            });
            //banner 初始化
            var mySwiper1= new Swiper(".swiper-container",{
                autoplay:6000,
                loop:true,
                autoplayDisableOnInteraction:false,
                pagination:".swiper-pagination",
                paginationClickable :true
            });
        });
        $scope.getHot();
        /* 公告*/
        homeService.publics($scope.orgId, null, function (data) {
            $scope.publics = data;
        })

    });

    /*
    * 热卖订单*/
    $scope.hotOrders = [];
    orgService.getSchool('', function (data) {
        categoryService.get('', data.id, function (cary) {
            _.each(cary.data, function (item) {
                homeService.getPrtList(null, cary.data.categoryId, 'salesNum desc', 'brandAggregate', function (prts) {
                    if(prts.product.rs.length>0){
                        _.each(prts.product.rs, function (prt) {
                             if(prt.salesNum>0){
                                $scope.hotOrders.push(prt);
                            }
                        })
                    }
                })
            })
        });
    });

    /**
     * 热卖商品 热卖品类*/
    $scope.mallProIds = '';
    $scope.getHot = function () {
        homeService.getList(null, $scope.orgId, function (data) {
            $scope.allHots =data;
            //图片改为小尺寸的
            if(data.hots){
                _.each(data.hots.children, function (good) {
                    if(good.data.pic){
                        good.data.pic = good.data.pic.replace('/n0/', '/n2/');
                        $scope.mallProIds += good.data.mallId + '.' + good.data.productId + ',';
                    }
                    if(good.targetMallId=='JD'){
                        $scope.haveJd = true;
                    }
                });
                $scope.hotProducts = data.hots.children;
                console.log($scope.hotProducts);
                $rootScope.productPrice($scope.mallProIds);
            }
            if(data.shows){
                $scope.hotCategorys = data.shows.children;
            }
        });
    };

    /* --------无缝滚动---------*/
    var timer1 = setInterval(autoPlay,10);
    var num1 = 0;
    var ul = document.getElementById("scroll");
    function autoPlay() {
        num1--;
        num1<=-1600 ? num1 = 0 : num1;
        ul.style.marginLeft = num1 + "px";
    }
    ul.onmouseover = function() {  // 鼠标经过大盒子  停止定时器
        clearInterval(timer1);
    }
    ul.onmouseout = function() {
        timer1 = setInterval(autoPlay,10);  // 开启定时器
    }

});

module.exports = home;
