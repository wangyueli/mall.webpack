/**
 * Created by wangyueli on 2018/6/13.
 */
var app = require('appModule');
require('serve/orders.js');

var asset = app.controller('assetCtrl', function ($scope, $rootScope, $stateParams, ordersService) {
    ordersService.get($stateParams.id, function (data) {
        $scope.products = data.productList;
    })
});
module.exports = asset;
