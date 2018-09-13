var app = require('appModule');
var _ = require('underscore');
require('swiper');
require('serve/helper.js');

var helpPoor = app.controller('helpPoorCtrl', function ($scope, $cookies, $stateParams, $rootScope, helperService) {

    var mySwiper1= new Swiper(".swiper-container1",{
        autoplay:3000,
        loop:true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        autoplayDisableOnInteraction:false,
        pagination:".swiper-pagination",
        paginationClickable:true
    });

    var mySwiper2 = new Swiper(".swiper-container2",{
        autoplay:6000,
        loop:true,
        autoplayDisableOnInteraction:false,
        paginationClickable:true
    });

    var mySwiper3= new Swiper(".swiper-container3",{
        autoplay:9000,
        loop:true,
        autoplayDisableOnInteraction:false,
        paginationClickable:true
    });

    helperService.getPrtList($cookies.get('orgId'), $stateParams.mallId,  function (data) {
        $scope.mallProIds = '';
        _.each(data.product.rs, function (good) {
            $scope.mallProIds += good.mallId + '.' + good.productId + ',';
        });
        //价格
        $rootScope.productPrice($scope.mallProIds);
        $scope.helpPrts =data.product.rs;

    });
});
module.exports = helpPoor;

