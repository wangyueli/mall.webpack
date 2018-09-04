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
    $scope.orgId = $cookies.get('orgId');

    /*
    * 热卖订单*/
    $scope.hotOrders = [];
    $scope.paramsHotOrd  = {
        'sort': 'salesNum desc',
        'excludeFields': 'brandAggregate',
        'page': 0,
        'rows': 10
    };
    orgService.getSchool('', function (data) {
        categoryService.get('', data.id, function (cary) {
            _.each(cary.data, function (item) {
                $scope.paramsHotOrd.categoryId = item.data.categoryId;
                homeService.getPrtList($scope.paramsHotOrd, function (prts) {
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

    /*
    * 值得购买*/
    $scope.worthProts = [];
    productService.worthBuy('JD-Promo-20180828', 'worthToBuyProduct', function (data) {
        _.each(data, function (item) {
            productService.get(item.mallId, item.value, function (detail) {
                detail.pic = detail.pic.split(',')[0];
                $scope.worthProts.push(detail);
            })
        });
    });

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