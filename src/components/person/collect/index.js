/**
 * Created by wangyueli on 2018/7/30.
 */
var app = require('appModule');
var _ = require('underscore');
require('serve/product.js');

var evaluate = app.controller('personCollectCtrl', function ($scope, $rootScope, productService) {
    /**
     * 关注列表*/
    $scope.getWatch = function () {
        productService.getWatch(function (data) {
            console.log(data);
            $scope.products = data;
            $scope.mallProIds = '';
            _.each(data, function (good) {
                $scope.mallProIds += good.mallId + '.' + good.productId + ',';
            });
            //价格
            $rootScope.productPrice($scope.mallProIds);
        });
    }
    $scope.getWatch();

    /**
     * 取消关注*/
    $scope.removeCollect = function (id) {
        productService.delWatch(id, function () {
            swal({
                text: '取消关注成功',
                icon: 'success',
                buttons:{confirm: {text: '确定'}}
            }).then(function (isConfirm) {
                if(isConfirm == true){
                    $scope.getWatch();
                }
            });
        }, function (err) {
            swal({
                text: '取消关注失败',
                icon: 'error',
                buttons:{confirm: {text: '确定'}}
            });
        })
    }
});
module.exports = evaluate;
