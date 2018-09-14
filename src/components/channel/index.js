
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
    $scope.recommendCays = '';
    $scope.recomendPrts = {};
    $scope.mallCayProIds = '';
    $scope.paramsCary = {
        'sort': 'discountRate desc',
        'page': 0,
        'rows': 12
    };
    if($stateParams.mallId == 'JD'){
        productService.worthBuy('JD-Promo-20180828', 'productCategory', function (cays) {
            $scope.recommendCays = cays;
            console.log(cays);
            _.each($scope.recommendCays, function (cay, index) {
                $scope.paramsCary.categoryId = cay.value;
                productService.getListCache($scope.paramsCary, function (prot) {
                    $scope.recomendPrts[cay.value] = prot.product.rs;
                    if(index == 0){
                        $scope.cayIndex = cay.value;
                        $scope.recomendPrt = prot.product.rs
                    }
                    //图片改为小尺寸的；
                    _.each(prot.product.rs, function (good, indexChid) {
                        good.pic = good.pic.replace('/n0/', '/n2/');
                        $scope.mallCayProIds += good.mallId + '.' + good.productId + ',';
                        if(indexChid==prot.product.rs.length-1 && index==cays.length-1){
                            //等到便利到最后一次时再掉价格接口；
                            $rootScope.productPrice($scope.mallCayProIds);
                        }
                    });
                });
            });
        });
    }
    $scope.findRecommend = function (cayId) {
        $scope.recomendPrt = $scope.recomendPrts[cayId];
        $scope.cayIndex = cayId;
    };

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