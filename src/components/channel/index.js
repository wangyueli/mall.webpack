
var app = require('appModule');
var _ = require('underscore');
var global = require('global');
var jquery = require('jquery');
require('swiper');
require('serve/home.js');
require('serve/product.js');

var channel = app.controller('channelCtrl', function ($scope, $rootScope, $filter, homeService, productService, $stateParams, $http, $cookies) {

    //banner 初始化
    var mySwiper1= new Swiper(".swiper-container",{
        autoplay:6000,
        loop:true,
        autoplayDisableOnInteraction:false,
        pagination:".swiper-pagination",
        paginationClickable :true
    });

    /**
     * 热卖商品 热卖品类*/
    $scope.mallProIds = '';
    $scope.getHot = function () {
        homeService.getList($stateParams.mallId, $cookies.get('orgId'), function (data) {
            $scope.allHots =data;
            //图片改为小尺寸的
            if(data.hots){
                _.each(data.hots.children, function (good) {
                    if(good.data.pic){
                        good.data.pic = good.data.pic.replace('/n0/', '/n2/');
                        $scope.mallProIds += good.data.mallId + '.' + good.data.productId + ',';
                    }
                });
                $scope.hotProducts = data.hots.children;
                $rootScope.productPrice($scope.mallProIds);
            }
            if(data.shows){
                $scope.hotCategorys = data.shows.children;
            }
        });
    };

    $scope.getCayPrtList = function (cayId, floor, parentIndex, index) {
        homeService.getPrtList($cookies.get('orgId'), cayId, 'discountRate desc', null, function (prot) {
            //图片改为小尺寸的；
            _.each(prot.product.rs, function (good) {
                good.pic = good.pic.replace('/n0/', '/n2/');
                $scope.mallProIds += good.mallId + '.' + good.productId + ',';
            });

            floor[cayId] = prot;
            if(index==0){
                $scope['activeId'+parentIndex] = cayId;
            }
            if(parentIndex==$scope.hotCategorys.length-1 && index==floor.children.length-1){
                //等到便利到最后一次时再掉价格接口；
                $rootScope.productPrice($scope.mallProIds);
            }
        });
    };

    $scope.findContent = function (cayId, parentIndex) {
        $scope['activeId'+parentIndex] = cayId;

    };
    $scope.getHot();

});

module.exports = channel;