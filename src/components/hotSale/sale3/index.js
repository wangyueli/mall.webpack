var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlThree', function ($scope, productService) {

    /*
    * 好物搭配*/
    var pIds01 = ['3909771', '7326342', '5173437', '7171439', '5127545', '2327261'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


    /*
    * 品质精选*/
    var pIds02 = ['6938900', '4351728', '2271530', '5128667', '219337', '5983888', '7553513'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * 家宴尝鲜*/
    var pIds03 = ['935386', '3649986', '2168291', '5849931', '777240', '3564062'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 精选月饼*/
    var pIds04 = ['4859097', '8577083', '1765256', '3001687', '8502755', '8502743', '8895071', '1765231', '1765258', '4688623', '8683836', '8364798', '8577129', '4688693', '4688653'];
    $scope.product04 = [];
    _.each(pIds04, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product04.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })

   /* 水产生鲜*/
    var pIds05 = ['7678744', '7678662', '4922289', '3740686', '7943037', '7725382', '3740740', '4508479', '7814052', '8040809', '7938109', '4490057', '4490017', '4489993', '7943017', '8894935', '7891635'];
    $scope.product05 = [];
    _.each(pIds05, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product05.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })
   /* 酒水饮料*/
    var pIds06 = ['3486003', '1137881', '3261776', '3140254', '4285030', '1239538', '1061466', '332121', '332115', '4330491', '1083799', '4330479', '1083798', '3734315', '2207447', '3034138', '2150234', '3046062', '1101239', '1307575', '1075534', '2249835', '4936565', '620187', '3236620', '1020958', '5786085'];
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

