/**
 * Created by wangyueli on 2018/7/27.
 */

var app = require('appModule');
require('serve/order.js');

var paySuccessWait = app.controller('paySuccessWaitCtrl', function ($scope, $stateParams, $interval, $timeout, orderService) {
    console.log('等待支付成功的消息');
    $scope.timer = 5;
    var inter = $interval(function () {
        $scope.timer-=1;
        if($scope.timer==1){
            $interval.cancel(inter);
            orderService.payResult($stateParams.id, function (data) {
                console.log(data);
                if(data.success==true){
                    window.location = '/#/pay-success';
                }else {
                    $scope.hideLoad = true;
                    $scope.showAgain = true;
                }
            });
        }
    }, 1000);
    $scope.again = function () {
        orderService.payResult($stateParams.id, function (data) {
            if(data.success==true){
                window.location = '/#/pay-success';
            }else {
                console.log('联系客服');
                $scope.showAgain = false;
                $scope.payFailed = true;
            }
        });
    }

});
module.exports = paySuccessWait;