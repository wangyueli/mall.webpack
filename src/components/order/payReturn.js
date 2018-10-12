/**
 * Created by wangyueli on 2018/7/23.
 */

var app = require('appModule');
var global = require('global');
var url = require('util/url.js');
require('serve/order.js');

var payReturn = app.controller('payReturnCtrl', function ($scope, $stateParams, orderService) {
    //跳转地址
    orderService.toWitchUrl($stateParams.id, function (data) {
        console.log(data);
        if(data.toPage=='pay'){
            //支付方式选择界面
            //支付方式
            orderService.payTypes($stateParams.id, function (data) {
                console.log(data);
                //目前只有支付宝，先默认选择支付宝，直接传给后台，获取到支付宝的地址链接
                $scope.payCode = data.payTypes[0].code;
                console.log($scope.payCode);

                /*orderService.payUrl($stateParams.id, $scope.payCode, function (url) {
                    window.location.href = "/#/orders?from='payReturn'";
                    var newWindow = window.open();
                    newWindow.location = url.payUrl;
                });*/

                $.ajax({
                    method: 'GET',
                    url: global.mall.api + '/orders/' + $stateParams.id+ '/paymentUrl',
                    async: false, //设置为同步请求 ,解决浏览器拦截
                    data: {'code': $scope.payCode},
                    success: function(data){
                        window.location.href = "/#/orders?from='payReturn'";
                        window.open(data.payUrl);
                    }
                })
            })
        }else if(data.toPage=='list'){
            //订单列表
            window.location = '/#/orders';
        }else if(data.toPage=='success'){
            //订单提交成功
            window.location = '/#/pay-success';
        }else {
            //其他意外bug
            console.log(data);
        }
    });
});
module.exports = payReturn;



