var app = require('appModule');
require('serve/compare.js');
require('serve/product.js');

var compare = app.controller('compareCtrl', function ($scope, compareService, productService) {

    /**获取对比列表**/
    $scope.getCompare = function () {
        productService.getCompare(0, function (data) {
            $scope.compList = data.products;
            var addList = [];
            var addCount  = 4-data.products.length;
            for(var i=0; i<addCount; i++){
                addList.push({});
            }
            $scope.addList = addList;
            $scope.prtyList = data.properties[0];
        })
    };
    $scope.getCompare();

    /**删除对比**/
    $scope.delCompare =  function (pId) {
        productService.delCompare(0, pId, function (data) {
            swal({
                text: '删除成功！',
                icon: 'success',
                buttons: {confirm:{text:'确定'}}
            }).then(function(isConfirm) {
                if (isConfirm === true) {
                    $scope.getCompare();
                }
            });
        }, function (data) {
            swal({
                text: '删除失败',
                icon: 'error',
                buttons: {confirm:{text:'确定'}}
            });
        });
    };

    //搜索
    $scope.keySearch = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search();
        }
    };
    $scope.search = function () {
        if ($scope.keyword != null && $scope.keyword != '') {
            window.location = '/#/product?keyword=' + encodeURIComponent($scope.keyword);
        }
    };
});