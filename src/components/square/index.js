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

var square = app.controller('squareCtrl', function ($scope, $rootScope, $cookies, mallService, categoryService, orgService, productService, homeService) {

    $scope.orgId = $cookies.get('orgId');

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
    timer1 = setInterval(autoPlay,20);
    var  num1 = 0;
    var  timer1 = null;
    var  ul = document.getElementById("scroll");
    function autoPlay() {
        num1--;
        num1<=-1600 ? num1 = 0 : num1;
        ul.style.marginLeft = num1 + "px";
    }
    scroll.onmouseover = function() {  // 鼠标经过大盒子  停止定时器
        clearInterval(timer1);
    }
    scroll.onmouseout = function() {
        timer1 = setInterval(autoPlay,20);  // 开启定时器
    }

});


module.exports = square;