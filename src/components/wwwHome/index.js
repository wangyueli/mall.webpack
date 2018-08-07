var app = require('appModule');
var jquery = require('jquery');
require('swiper');
require('serve/mall.js');

var wwwHome = app.controller('wwwHomeCtrl', function ($scope, $rootScope,  mallService) {

    //banner 初始化
    var mySwiper1= new Swiper(".swiper-container",{
        autoplay:6000,
        loop:true,
        autoplayDisableOnInteraction:false,
        pagination:".swiper-pagination",
        paginationClickable :true
    });

    /**
     * 成交订单*/
    mallService.getOrders($scope.page, $scope.rows, function(orders){
        $scope.orders = orders;
        $scope.orderFinish = function () {
            setTimeout(function () {
                new Swiper('.order-swiper', {
                    direction: 'vertical',
                    slidesPerView: 5,
                    autoplay: 2500,
                    noSwiping: true,
                    loop: true
                });
            }, 500);
        }
    });

    /**
     * 商城*/
    mallService.getMalls(function (malls) {
        $scope.malls = malls;
        /*$scope.mallFinish = function () {
         setTimeout(function () {
         jquery('.banner-li').each(function (index) {
         switch ((index) % 4){
         case 0 :
         $(this).find('.mall-link').addClass('mall-violet');
         break;
         case 1 :
         $(this).find('.mall-link').addClass('mall-blue');
         break;
         case 2 :
         $(this).find('.mall-link').addClass('mall-brown');
         break;
         case 3 :
         $(this).find('.mall-link').addClass('mall-yellow');
         break;
         default:
         $(this).find('.mall-link').addClass('mall-violet');
         }
         });
         new Swiper('.mall-swiper', {
         nextButton: '.banner-arrow.next',
         prevButton: '.banner-arrow.prev',
         slidesPerView: 4,
         paginationClickable: true,
         grabCursor: true,
         spaceBetween: 13.3
         });

         }, 100);
         }*/
    });

    /**
     * 热销商品*/
    mallService.getHotProducts($scope.page, $scope.rows, function (hot) {
        $scope.hotProducts = hot;
    });

    /**
     * 活跃商家*/
    mallService.getSeller($scope.page, $scope.rows, function (seller) {
        $scope.sellers = seller;
    });

    /**
     * 成交订单动画*/
    setInterval(function () {
        jquery('.label_main_b').find("ul:first").animate({
            marginTop:"-90px"
        },500,function(){
            jquery(this).css({marginTop:"0px"}).find("li:first").appendTo(this);

        });
    },2000);


    /**
     * 海量品类动画*/
    function $$(id) {return document.getElementById(id)}
    var box = document.getElementsByClassName("section_top")[0];
    box.onmouseover = function() {
        $$("arr").style.display = "block";
    };
    box.onmouseout = function() {
        $$("arr").style.display = "none";
    };
    $$("right").onclick = function() {
        target -=1200;
    };
    $$("left").onclick = function() {
        target +=1200;
    };

    //缓动动画
    var leader = 0,target = 0;
    setInterval(function() {
        if(target >= 0)
        {
            target = 0;
        }
        else if(target <=-2400)
        {
            target = -2400;
        }
        leader = leader + (target - leader) /5;
        $$("silder").style.left = leader + "px";
    },20);

    /**
     * 点击去商城*/
    $scope.toMall = function (univer) {
       /* if(univer.orgId=='58212' || univer.orgId=='10359' || univer.orgId=='58609' || univer.orgId=='15CAA78F25D2000163E006BB64C3E008' || univer.orgId=='15CCEAE93B72000163E006BB65C13007' ){
            window.open(univer.hrefUrl);
        }else {
            $scope.noOpen = univer.orgId;
        }*/
        window.open(univer.hrefUrl);
    }
});
module.exports = wwwHome;