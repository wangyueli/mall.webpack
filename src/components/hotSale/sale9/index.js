var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlNine', function ($scope, productService) {

    /*
    * iPhone 专区*/
    var pIds01 = ['6233669', '5089271', '5604281', '6176812', '6176816', '6176814', '5757752', '5757780'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


    /*
    * iPad 专区*/
    var pIds02 = ['5222158', '1892018', '1892028', '4325427', '4325429', '5222160', '5222162', '4669048', '4669026', '4669010'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * Mac 专区*/
    var pIds03 = ['5225340', '4335045', '4331183', '4331185', '4331143', '5225342', '4335133', '4331151', '5225340', '4335021', '4335131', '334875', '4335105', '4334877'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 配件 专区*/
    var pIds04 = ['3563660', '1861424', '6518073', '771920', '4406753'];
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

