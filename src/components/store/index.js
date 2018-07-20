

var app = require('appModule');
var global = require('global');
require('serve/store.js');

var store = app.controller('storeCtrl', function ($scope, $stateParams, $cookies, storeService) {
    $scope.page = 1;
    $scope.rows = 20;

    /*
     * 获取公司信息*/
    storeService.get($stateParams.id, function(data){
        $scope.store = data;
        $scope.pageChanged();
    });


    /*
     * 该公司所售商品*/
    $scope.pageChanged = function(){
        storeService.getList($cookies.get('orgId'), $stateParams.id, $scope.page-1, $scope.rows, function(data){
            $scope.list = data.product.rs;
            $scope.listCount = data.product.count;
        });
    };

});
module.exports = store;
