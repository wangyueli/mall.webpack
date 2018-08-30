var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlTen', function ($scope, productService) {

    /*
    * 品牌爆品*/
    var pIds01 = ['5464265', '5464261', '5557742', '5853593', '5853579', '5924244', '6055050', '6055054', '7080822', '7294309', '6940276', '4914531'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


    /*
    * 热销商品*/
    var pIds02 = ['7146636', '7134172', '7348209', '7106178', '7320003', '7319975', '5572390', '5257665','4255683', '4635250', '3445231', '4428640'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * 平板酷玩*/
    var pIds03 = ['5605012', '4561935', '4215115', '5127282', '4589413', '5910146'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 智能网络*/
    var pIds04 = ['5257665', '5360861', '5123258', '2297839', '3348710', '3369436', '4912606', '2297813'];
    $scope.product04 = [];
    _.each(pIds04, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product04.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })

   /* 炫彩配件*/
    var pIds05 = ['5289698', '6363490','4635250', '4635258', '3969281', '439744', '2210885', '4964266', '4595301', '4428640', '2988013', '2768837', '3238112', '1700895', '6227023', '3533659', '2688322', '3533643'];
    $scope.product05 = [];
    _.each(pIds05, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product05.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


});

module.exports = hotSale;

