var app = require('appModule');
var _ = require('underscore');
var global = require('global');

require('serve/orders.js');
require('serve/cart.js');
require('serve/org.js');
require('serve/auth.js');

var orderDetail = app.controller('orderDetailCtrl', function ($scope, $rootScope, $cookies, $location, $stateParams, $interval, ordersService, cartService, orgService, authService) {
    $scope.id = $stateParams.id;

    /**
     * 获取登录信息*/
    authService.get(function (data) {
        if(data==null){
            window.location = $scope.getLoginUrlMall();
        }
    });

    /**
     * 获取当前学校 logo name**/
    orgService.getSchool($cookies.orgId, function (data) {
        $scope.schoolId = data.id;
        $rootScope.titleMall = data.name + '采购商城';
        $rootScope.tlImg = global.file.url+ '/'+ data.logo;
    });

    /**获取订单信息**/
    $scope.getDetail = function(){
        ordersService.get($scope.id, function (data) {
            $scope.order  = data;
            $rootScope.Tabtitle = $scope.title + $rootScope.titleMall;
            $scope.orderTime = data.createTime;
            $scope.lastTime();
        });
    };
    $scope.getDetail();


    /**
     * 支付倒计时*/
    $scope.lastTime = function () {
        var orderTime = $scope.orderTime + 604800000;
        var nowTime = new Date().getTime();
        $scope.differTime = orderTime-nowTime;
        if($scope.differTime>0){
            $scope.day =Math.floor($scope.differTime/86400000);
            $scope.hour = Math.floor(($scope.differTime-86400000*$scope.day)/3600000);
            $scope.minute = Math.floor(($scope.differTime-86400000*$scope.day-3600000*$scope.hour)/60000);
            $scope.second = Math.floor(($scope.differTime-86400000*$scope.day-3600000*$scope.hour-60000*$scope.minute)/1000);
        }
    };
    $interval(function () {
        $scope.lastTime();
    }, 1000);


    /**
     * 获取订单状态追踪*/
    $scope.getFoll = function () {
        ordersService.getFollow($scope.id, function (data) {
            $scope.follow = data;
        });
    };
    $scope.getFoll();


    /**取消订单**/
    $scope.delOrder = function (id) {
        swal({
            text: '订单取消后将无法恢复，\n 如订单已发货，\n 建议收货后再办理退货手续！\n 敬告：由于货到付款，供应商会产生物流成本，频繁取消订单将导致个人或单位的采购权限被冻结，请谨慎操作！',
            type: 'warning',
            buttons:{
                cancel: {
                    text: '取消',
                    visible: true
                },
                confirm: {text: '确定'}
            }
        }).then(function (isConfirm) {
            if(isConfirm==true){
                ordersService.delOrder(id, function (data) {
                    swal({
                        text:  '取消订单成功！',
                        type: 'success',
                        confirmButtonText: '确定'
                    }).then(function () {
                        $scope.getDetail();
                        $scope.getFoll();
                    });
                },function (data) {
                    alert('订单取消失败');
                });
            }

        });
    };

    /**去确认经费**/
    $scope.toPay = function (orderId) {
        var newWin = window.open();
        ordersService.getPayUrl(orderId, function (data) {
            swal({
                type: 'warning',
                buttons:{
                    cancel: {
                        text: '确认经费失败',
                        visible: true
                    },
                    confirm: {text: '确定经费成功'}
                }
            }).then(function() {
                window.reload();
            });
            newWin.location = data.payUrl;
        });
    };

    /**验收入账**/
    $scope.toAsset = function (orderId) {
        $scope.toAssetWd = '响应中...';
        ordersService.toAsset(orderId, function () {
            $location.url('orders/asset?id='+ orderId);
        }, function (error) {
            $scope.toAssetWd = '验收入账';
            swal({
                text: error,
                type: 'warning',
                confirmButtonText: '确认'
            });
            $scope.tipInv=true;
        })
    };

    /**
     * 确认收货*/
    $scope.sureGet = function (orderId) {
        ordersService.surGet(orderId, function (data) {
            swal({
                type: 'success',
                confirmButtonText: '确定收货成功',
                confirmButtonClass: 'btn confirm'
            }).then(function() {
                $scope.getList();
            });
        }, function (error) {
            alert(error);
        })
    };

    /**再次购买**/
    $scope.copy = function(order) {
        var cartId = $cookies.cart_id;
        _.each(order.productList, function(product) {
            cartService.insert(cartId, product.productId, order.mallId, product.num, function(data) {
                window.location = '/#/cart';
            }, function() {
            });
        });
    };

    /**补全发票**/
    $scope.overInvCode = function () {
        $scope.invNos = {'invNo' : $scope.invNo};
        ordersService.overInvCode($scope.order.id, $scope.invNos, function () {
            $scope.invNoYes = true;
            $scope.getDetail();
        },function (error) {
            alert('提交失败！');
        })
    }

});
module.exports = orderDetail;

