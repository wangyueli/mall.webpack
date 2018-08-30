var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlTwo', function ($scope, productService) {

    /*
    * 新品必备*/
    var pIds01 = ['7296649', '7297505', '3443540', '1058537', '4294806', '7265675', '6410755'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
        })
    })


    /*
    * 学习休闲*/
    var pIds02 = ['6372983', '6864653', '7295395', '7093746', '6410795', '6410731', '5379160', '6815969'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * 户外运动*/
    var pIds03 = ['7147529', '4325170', '7534083', '4577137', '703431', '7703417', '6509943'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 高清大屏*/
    var pIds04 = ['5056175', '5278192', '2175277', '4296978', '5251868', '3597936'];
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

