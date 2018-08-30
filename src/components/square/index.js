var app = require('appModule');
var jquery = require('jquery');
require('swiper');

require('serve/mall.js');

var square = app.controller('squareCtrl', function ($scope, mallService) {

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
    /*timer1 = setInterval(autoPlay,20);
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
    }*/

    /*
    * 展示订单*/
    mallService.getOrders(0, 20, function(orders){
        $scope.orders = orders;
        console.log(orders);
    });
});


module.exports = square;