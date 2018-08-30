var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlEight', function ($scope, productService) {

    /*
    * 配件*/
    var pIds01 = ['4857155', '2448112', '7125726', '5413372'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


    /*
    * 笔记本*/
    var pIds02 = ['5054216', '5050164', '4468800', '4380852'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * 台式机*/
    var pIds03 = ['7306983', '7306981', '7306959', '7306961', '7108222', '6043234', '6512785', '6469219', '6512799', '6325898', '8086041'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 显示器*/
    var pIds04 = ['2316995', '2452950', '3367360', '3058557', '7576263', '7362130', '6455708', '6652399'];
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

