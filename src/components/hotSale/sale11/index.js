var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlEleven', function ($scope, productService) {

    /*
    * 10人办公组*/
    var pIds01 = ['5602175', '5675807', '5602175', '5602177','3836894', '3400523'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


    /*
    * 50人工作群*/
    var pIds02 = ['5872629', '5602161', '5936932', '5602159', '2619408', '2619479'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * 200人规模企业*/
    var pIds03 = ['5756286', '5756292', '5936956', '5756296', '5756318', '5756294', '5602195'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 金融机构适用*/
    var pIds04 = ['5602163', '5756290', '5602161', '5756288', '5570500', '5602161', '5756286', '3125257', '3554758'];
    $scope.product04 = [];
    _.each(pIds04, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product04.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })

   /* 设计院适用*/
    var pIds05 = ['5756296', '5756276', '5756322', '3244132', '2927842'];
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

