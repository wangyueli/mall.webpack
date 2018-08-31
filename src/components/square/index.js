var app = require('appModule');
var jquery = require('jquery');
var global = require('global');
var _ = require('underscore');
require('swiper');

require('serve/mall.js');
require('serve/category.js');
require('serve/org.js');

require('serve/product.js');

var square = app.controller('squareCtrl', function ($scope, $rootScope, mallService, categoryService, orgService, productService) {

    /*
    * 热卖订单*/
    $scope.hotOrders = [];
    orgService.getSchool('', function (data) {
        categoryService.get('', data.id, function (cary) {
            _.each(cary.data, function (item) {
                productService.getList(null, null, cary.data.categoryId, null, null, 0, 10, null, null, null, null, 'salesNum desc', function (prts) {
                    if(prts.product.rs.length>0){
                        _.each(prts.product.rs, function (prt) {
                            // if(prt.salesNum>0){
                                $scope.hotOrders.push(prt);
                                console.log($scope.hotOrders);
                            // }
                        })
                    }
                })
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