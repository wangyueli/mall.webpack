var app = require('appModule');
var jquery = require('jquery');
var global = require('global');
var _ = require('underscore');
require('swiper');

require('serve/mall.js');
require('serve/category.js');
require('serve/org.js');
require('serve/product.js');
require('serve/home.js');

var square = app.controller('squareCtrl', function ($scope, $rootScope, $cookies, $stateParams, mallService, categoryService, orgService, productService, homeService) {

    var where = $stateParams.where;
    if(where == 'more'){
        //到值得买



    }

    /*
     * 动态订单*/
    $scope.mallOrderIds = '';
    $scope.hotOrders = [];
    $scope.paramsHotOrd = {
        'sort': 'salesNum desc',
        'excludeFields': 'brandAggregate',
        'page': 0,
        'rows': 10
    };

    categoryService.get('', function (cary) {
        _.each(cary.data, function (item, parentIndex) {
            $scope.paramsHotOrd.categoryId = item.data.categoryId;
            productService.getListCache($scope.paramsHotOrd, function (prts) {
                if(prts.product.rs.length>0){
                    _.each(prts.product.rs, function (good, index) {
                        if(good.salesNum>0){
                            $scope.hotOrders.push(good);
                            $scope.mallOrderIds += good.mallId + '.' + good.productId + ',';
                        }
                        if(parentIndex == cary.data.length-1 && index == prts.product.rs.length-1){
                            //等到便利到最后一次时再掉价格接口；
                            $rootScope.productPrice($scope.mallOrderIds);
                        }
                    })
                }
            })
        })
    });



    /*
    * 值得购买*/
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

    //banner 初始化
    var mySwiper1= new Swiper(".swiper-container",{
        autoplay:6000,
        loop:true,
        autoplayDisableOnInteraction:false,
        pagination:".swiper-pagination",
        paginationClickable :true,
        grabCursor: true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next'

    });

    /* --------无缝滚动---------*/
    var timer1 = setInterval(autoPlay,10);
    var num1 = 0;
    var scroll = document.getElementById("scroll");
    function autoPlay() {
        num1--;
        num1<=-2000 ? num1 = 0 : num1;
        scroll.style.marginLeft = num1 + "px";
    }
    scroll.onmouseover = function() {  // 鼠标经过大盒子  停止定时器
        clearInterval(timer1);
    }
    scroll.onmouseout = function() {
        timer1 = setInterval(autoPlay,10);  // 开启定时器
    }

});


module.exports = square;