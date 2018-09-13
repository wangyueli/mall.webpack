
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

    /*
     * 值得购买*/
    if($stateParams.mallId == 'JD'){
        $scope.worthProts = [];
        $scope.pagePrt = 0;
        $scope.getRecommend = function () {
            productService.worthBuy('JD-Promo-20180828', 'worthToBuyProduct', $scope.pagePrt, '10', function (data) {
                if(data.length>0){
                    _.each(data, function (item) {
                        productService.getDetailCache(item.mallId, item.value, function (detail) {
                            detail.pic = detail.pic.split(',')[0];
                            $scope.worthProts.push(detail);
                        })
                    });
                }else {
                    clearInterval(timer);
                }
            });
        };
        $scope.getRecommend();
        var timer = setInterval(function () {
            $scope.pagePrt++;
            $scope.getRecommend();
        }, 2000);
    }

    /**
     * 热卖商品 热卖品类*/
    $scope.mallProIds = '';
    homeService.getList($stateParams.mallId, function (data) {
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
    $scope.getCayPrtList = function (cayId, floor, parentIndex, index) {
        $scope.paramsCary = {
            'sort': 'discountRate desc',
            'categoryId': cayId,
            'page': 0,
            'rows': 12
        };
        productService.getListCache($scope.paramsCary, function (prot) {
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

});

module.exports = channel;