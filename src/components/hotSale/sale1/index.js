var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlOne', function ($scope, productService) {

    /*
    * 寝室*/
    var pIds01 = ['6888588', '6072622', '5363894', '3948470', '4932622', '1436707', '6004883', '1295110', '2185974', '2297839', '4983458', '2796134', '385620', '6138191'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


    /*
    * 操场*/
    var pIds02 = ['2323438', '4943315','5185333','1436707', '3233275', '5639808', '5979401', '4255683', '7302439', '643094', '6522861', '1759465', '776715', '4413265', '348143'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * 教室*/
    var pIds03 = ['1201473', '3766807','1184404','2238360', '4075816', '4400730', '3177775', '6576348', '7964229', '971876', '1173636', '6083573', '1299472', '4682026', '241191'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 出游*/
    var pIds04 = ['1482791', '2554181','3965552'];
    $scope.product04 = [];
    _.each(pIds04, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product04.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


});

module.exports = hotSale;

