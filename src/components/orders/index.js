
var app = require('appModule');
var _ = require('underscore');
var global = require('global');

require('serve/orders.js');
require('serve/cart.js');
require('serve/auth.js');
require('serve/org.js');

var orders = app.controller('ordersCtrl', function ($scope, $rootScope, $location, $stateParams, $cookies, ordersService, cartService, authService, orgService) {
    $scope.keyword = null;
    $scope.state = null;
    $scope.ifPay = null;
    $scope.page = 1;
    $scope.rows = 10;

    /**
     * 获取登录信息*/
    $scope.ifSign();

    /**
     * 获取当前学校 logo name**/
    orgService.getSchool($cookies.get('orgId'),function (data) {
        $scope.schoolId = data.id;
        $rootScope.titleMall = data.name + '采购商城';
        $rootScope.Tabtitle = $scope.title + $rootScope.titleMall;
        $rootScope.tlImg = global.file.url+ '/'+ data.logo;
    });

    /**获取订单信息**/
    $scope.getList = function () {
        ordersService.getList($scope.state, $scope.ifPay, $scope.keyword, $scope.page-1, $scope.rows, function (data) {
            $scope.orderList = data;
            $scope.getOrgList();
            $scope.getStatus();
        })
    };
    $scope.getList();

    /**
     * 是否需要报销*/
    $scope.checkPay = function (ifNeed) {
        if(ifNeed=='需要'){
            if($scope.ifPay == null){
                $scope.ifPay = 'school';
            }else {
                $scope.ifPay = null;
            }
        }else {
            if($scope.ifPay == null){
                $scope.ifPay = 'other';
            }else {
                $scope.ifPay = null;
            }
        }
        $scope.getList();
    };

    /**获取订单总数**/
    $scope.getOrgList = function () {
        ordersService.getCount($scope.state, $scope.keyword, function (data) {
            $scope.listCount = data;
        });
    };

    /**订单状态数**/
    $scope.getStatus = function () {
        ordersService.getStatus($scope.ifPay, $scope.keyword, function (data) {
            $scope.statusList = data;
        });
    };

    $scope.supNumber = function (status) {
        var rt = _.find($scope.statusList, function (data) {
            return data.status == status;
        });
        return rt;
    };

    /**取消订单**/
    $scope.delOrder = function (id, text) {
        swal({
            text: '订单取消后将无法恢复，\n 如订单已发货，\n 建议收货后再办理退货手续！\n 敬告：由于货到付款，供应商会产生物流成本，频繁取消订单将导致个人或单位的采购权限被冻结，请谨慎操作！',
            icon: 'warning',
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
                        text:  text+'成功！',
                        icon: 'success',
                        confirmButtonText: '确定'
                    }).then(function () {
                        $scope.getList();
                    });
                }, function (data) {
                    alert('订单取消失败');
                });
            }
        })
    };

    //获取所有订单总价格
    $scope.productPrice = function(data) {
        var price = 0;
        _.each(data, function(item) {
            if(item.unitPrice){
                price += item.unitPrice * item.num;
            }
        });
        return price;
    };

    $scope.productPriceMin = function(data) {
        var priceMin = 0;
        _.each(data, function(item) {
            if(item.unitPriceMin){
                priceMin += item.unitPriceMin + item.num;
            }
        });
        return priceMin;
    };

    $scope.productPriceMax = function(data) {
        var priceMax = 0;
        _.each(data, function(item) {
            if(item.unitPriceMax){
                priceMax += item.unitPriceMax + item.num;
            }
        });
        return priceMax;
    };

    /**立即购买**/
    $scope.copy = function(order) {
        var cartId = $cookies.cart_id;
        _.each(order.productList, function(product) {
            cartService.insert(cartId, product.productId, order.mallId, product.num, function(data) {
                window.location = '/#/cart';
            }, function() {
            });
        });
    };

    /**去确认经费**/
    $scope.toPayCard = function (orderId) {
        var newWin = window.open();
        ordersService.getPayUrl(orderId, function (data) {
            swal({
                icon: 'warning',
                buttons:{
                    cancel: {
                        text: '确认经费失败',
                        visible: true
                    },
                    confirm: {text: '确定经费成功'}
                }
            }).then(function() {
                $scope.getList();
            });
            newWin.location = data.payUrl;
        });
    };

    /**去支付**/
    $scope.toPay = function (orderId) {
        window.location = '/#/pay-return?id=' + orderId;
    };

    /**
     * 确认收货*/
    $scope.sureGet = function (orderId) {
        ordersService.surGet(orderId, function (data) {
            swal({
                icon: 'success',
                confirmButtonText: '确定收货成功',
                confirmButtonClass: 'btn confirm'
            }).then(function() {
                $scope.getList();
            });
        }, function (error) {
            alert(error);
        })
    }
});


module.exports = orders;