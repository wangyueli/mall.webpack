var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlSix', function ($scope, productService) {

    /*
    * 热销爆款 特惠专区*/
    var pIds01 = ['3462538', '4264874', '4996702', '4232972'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


    /*
    * 清雅 · 绿茶专区*/
    var pIds02 = ['1624560', '2207673'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * 优雅 · 红茶专区*/
    var pIds03 = ['3643760', '1256832', '3600987'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 儒雅 · 普洱茶专区*/
    var pIds04 = ['1037583', '4184826', '1812092'];
    $scope.product04 = [];
    _.each(pIds04, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product04.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })

   /* 典雅 · 乌龙茶专区*/
    var pIds05 = ['3757577', '1200964', '4236376'];
    $scope.product05 = [];
    _.each(pIds05, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product05.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })
   /* 更多好茶专区*/
    var pIds06 = ['5162832', '1273862', '4839053', '2098795', '4521540', '2206912', '4996700', '4928228'];
    $scope.product06 = [];
    _.each(pIds06, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product06.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })

});

module.exports = hotSale;

