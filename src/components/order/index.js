
var app = require('appModule');
var _ = require('underscore');
var global = require('global');
var jquery = require('jquery');
var form = require('util/form.js');

require('serve/order.js');
require('serve/auth.js');
require('serve/personAddress.js');
require('serve/region.js');
require('serve/org.js');


var order = app.controller('orderCtrl', function ($scope, $rootScope, $log, $location, $stateParams, $anchorScroll, $modal, $cookies, authService, orderService, regionService, personAddressService, orgService) {
    $scope.$parent.shopStep = 2;
    $scope.thismallId = $stateParams.cartMallId;
    $scope.page = 0;
    $scope.rows = 256;
    $scope.shoperBargain = false;
    $scope.cartId = $cookies.get('cart_id');
    $scope.productList = null;
    $scope.invoices = {
        'invoiceContentType' : 'detail'
    };

    /**
     * 获取登录信息*/
    $scope.ifSign = function () {
        authService.get(function (data) {
            if(data==null){
                window.location = $scope.getLoginUrlMall();
            }
        });
    };
    $scope.ifSign();


    /**
     * 设置修改发票弹层高度*/
    var height = document.body.scrollHeight;
    jquery('#bill-pop').css('height', height+200);
    jquery('#bill-pop').css('top', '-200px');

    /**
     * 订单列表*/
    $scope.refresh = function() {
        $scope.noPay = false;
        orderService.getList($scope.choiceAddressId, $scope.cartId, $scope.thismallId, function(data) {
            $scope.productList = data;
            if(data.payPrice>20000 && $cookies.get('orgId')=='58609'){
                //如果是湖南大学，订单总额超过2万，不容许下单;
                swal({
                    text: "根据学校要求，单笔订单总额超过2万元，无法下单！",
                    type: 'warning',
                    buttons: {confirm:{text:'确定'}}
                }).then(function(isConfirm) {
                    if (isConfirm === true) {
                        window.location = '/#/cart';
                    }
                });
            }
            _.each($scope.productList.cartBos, function(cart){
                //如果有不支购买的商品，则显示不能提交按钮
                if(cart.canBuy == false){
                    $scope.noPay = true;
                }
                //如果有某商品数量大于十个
                if(cart.num>10){
                    $scope.reminder = true;
                }
                //计算总的节省金额
                $rootScope.savesPay += (cart.unitPriceShow - cart.unitPrice)*cart.num;
            });
            //发票类型
            $scope.invoiceTypes = data.invoiceTypes;
            $scope.invoiceType = $scope.invoiceTypes[0].code;
            //学校发票信息
            $scope.schoolInvoiceMsg = data.invoiceSchools;
            $scope.invoiceScholl = $scope.schoolInvoiceMsg[0];
            $scope.invoiceCtn = '商品明细';
            //个人发票信息(无需报销)
            $scope.personInvoiceMsg = data.invoices;
            $scope.invoicePerson = $scope.personInvoiceMsg[0];

            //是否协议商城
            $scope.esMall = data.esmall;
            $rootScope.savesPay = 0;
            $rootScope.allPay = data.sumPrice;
        });
    };

    //获取地址列表
    $scope.getAddressList = function(){
        personAddressService.getList($scope.page, $scope.rows, $scope.thismallId, function(data){
            $scope.originAddress = data;
            $scope.addressList = data;
            if(data.length>3){
                $scope.showBtn = true;
                $scope.showMoreBtn = true;
                $scope.addressList = data.slice(0,3);
            }
            if(data.length > 0){
                $scope.choiceAddressId = data[0].id;
                $scope.sureAddress = _.find($scope.addressList, function(address){
                    return address.defaults == true;
                });
                //如果没有默认地址
                if(!$scope.sureAddress){
                    $scope.sureAddress = $scope.addressList[0]
                }
                $scope.refresh();
            }else {
                $scope.updateAddress();
            }
        });
    };

    /**点击显示跟多地址**/
    $scope.moreAdress = function (type){
        if(type == true){
            $scope.addressList = $scope.originAddress;
            $scope.showMoreBtn = false;
        }else {
            $scope.addressList = $scope.originAddress.slice(0,3);
            $scope.showMoreBtn = true;
        }
    };
    $scope.getAddressList();

    $scope.region = '';
    $scope.addressCity = false;
    $scope.personAddress = {};

    if($scope.thismallId == 'JD'){
        $scope.regions = $rootScope.regionsJd;
    }else {
        $scope.regions = $rootScope.regionsYct;
    }

    /**
     * 解析初始化地址列表*/
    $scope.address = function (ad) {
        $scope.provinceList = _.filter($scope.regions, function (data) {
            return data.level == 1;
        });
        $scope.pVal = ad.provinceName;
        if(ad.cityName) {
            $scope.cVal = ad.cityName;
            $scope.cityList = _.filter($scope.regions, function (data) {
                return data.code_parent == ad.province;
            });
        }
        if(ad.countyName) {
            $scope.cyVal = ad.countyName;
            $scope.countyList = _.filter($scope.regions, function (data) {
                return data.code_parent == ad.city;
            });
        }
        if(ad.townName) {
            $scope.tVal = ad.townName;
            $scope.townList = _.filter($scope.regions, function (data) {
                return data.code_parent == ad.county;
            });
        }
    };

    /**
     * 新增地址*/
    $scope.addAddress = function () {
        $scope.maskShow = true;
        $scope.listP = false;
        $scope.listCity = false;
        $scope.listCot = false;
        $scope.listT = false;
        authService.get(function(data){
            $scope.personAddress.name = data.p.name;
            $scope.personAddress.phone = data.p.mobile;
            $scope.personAddress.email = data.p.email;
            $scope.personAddress.defaults = true;
        });
        /**
         * 用户地址*/
        orgService.defaultAdress($cookies.get('orgId'), $scope.thismallId, function (data) {
            if(data.town){
                $scope.personAddress.region = data.town;
            }else if(data.county){
                $scope.personAddress.region = data.county;
            }else if(data.city){
                $scope.personAddress.region = data.city;
            }else {
                $scope.personAddress.region = data.province;
            }
            $scope.personAddress.address = data.address;
            $scope.address(data);
        });
    };

    /**修改地址**/
    $scope.updateAddress = function (id) {
        $scope.maskShow = true;
        $scope.listP = false;
        $scope.listCity = false;
        $scope.listCot = false;
        $scope.listT = false;
        personAddressService.get(id, $scope.thismallId, function(data){
            $scope.personAddress = data;
            $scope.personAddress.region = data.region;
            $scope.address(data.area);
        });
    };

    /**点击省**/
    $scope.chPro = function (pId, n) {
        $scope.pVal = n;
        $scope.listP = false;
        $scope.cVal='请选择';
        $scope.countyList = null;
        $scope.townList = null;
        $scope.cityList = _.filter($scope.regions, function (data) {
            return data.code_parent == pId;
        });
    };

    /**点击市**/
    $scope.chCty = function (cId, n) {
        $scope.cVal = n;
        $scope.listCity = false;
        $scope.cyVal='请选择';
        $scope.townList = null;
        $scope.personAddress.region = null;
        $scope.countyList = _.filter($scope.regions, function (data) {
            return data.code_parent == cId;
        });
    };

    /**点击区**/
    $scope.chCounty = function (cyId, n) {
        $scope.cyVal = n;
        $scope.listCot = false;
        $scope. tVal='请选择';
        $scope.townList = _.filter($scope.regions, function (data) {
            return data.code_parent == cyId;
        });
        if($scope.townList.length>0){
            $scope.personAddress.region = null;
        }else {
            $scope.personAddress.region = cyId;
        }
    };

    /**点击乡镇**/
    $scope.chTown = function (twId, n) {
        $scope.tVal = n;
        $scope.listT = false;
        $scope.personAddress.region = twId;
    };

    /**
     * 提交地址信息*/
    $scope.addSubmit = function () {
        if (!form.validate($scope.form)) {
            return;
        }
        if (!$scope.personAddress.region) {
            alert('请选择地区');
            return;
        }

        //电话验证
        /*var reg1 =  /^(\d3,4|\d{3,4}-)?\d{7,8}$/ ; //座机   */
        var reg2 =  /^[1][3,4,5,7,8][0-9]{9}$/ ;
        if( !($scope.personAddress.phone.match(reg2)) ){
            alert('请输入正确的电话号码');
            return;
        }

        $scope.personAddress.regionName = $scope.pVal + $scope.cVal + $scope.cyVal;
        if ($scope.id) {
            personAddressService.insert($scope.id, $scope.personAddress, $scope.thismallId, function (data) {
                swal({
                    text: '修改收货地址成功!',
                    type: 'success',
                    buttons: {confirm:{text:'确定'}}
                });
                $scope.maskShow = false;
            },function(){
                swal({
                    text: '修改失败，请稍后重试!',
                    type: 'error',
                    buttons: {confirm:{text:'确定'}}
                });
            });
        } else {
            personAddressService.insert(0, $scope.personAddress, $scope.thismallId, function () {
                swal({
                    text: '添加收货地址成功!',
                    type: 'success',
                    buttons: {confirm:{text:'确定'}}
                });
                $scope.maskShow = false;
            },function(){
                swal({
                    text: '添加失败，请稍后重试!',
                    type: 'error',
                    buttons: {confirm:{text:'确定'}}
                });
            });
        }
    };

    /**
     * 删除地址*/
    $scope.deleteAddress = function(id){
        swal({
            text: "确认删除地址？",
            type: 'warning',
            buttons:{
                cancel: {text: '取消', visible: true},
                confirm: {text: '确定'}
            }
        }).then(function(isConfirm) {
            if (isConfirm === true) {
                personAddressService.deleteAddr(id, $scope.thismallId, function(){
                    swal({
                        text: '地址已删除!',
                        type: 'success',
                        buttons: {confirm:{text:'确定'}}
                    });
                    $scope.getAddressList();
                }, function(){
                    swal({
                        text: '删除失败，请稍后重试!',
                        type: 'error',
                        buttons: {confirm:{text:'确定'}}
                    });
                });
            } else {
            }
        });
    };

    /**选择收货地址**/
    $scope.choiceAddress = function(address){
        $scope.sureAddress = address;
        $scope.choiceAddressId = address.id;
        $scope.refresh();
    };

    /**个人发票信息**/
    $scope.getInvoicePerson = function () {
        orderService.getInvoicePerson(function (data) {
            $scope.personInvoiceMsg = data;
            $scope.invoicePerson = $scope.personInvoiceMsg[0];
        });
    };

    /**
     * 新增无需报销发票信息*/
    $scope.saveInvoicePerson = function () {
        if(!$scope.newInvoice.tin){
            alert('请输入纳税识别号码');
            return false;
        }
        if(!$scope.newInvoice.phone){
            alert('请输入手机号码');
            return false;
        }
        orderService.addInvoicePerson(0, $scope.newInvoice, function () {
            $scope.addCnt = false;
            $scope.newInvoice = {};
            $scope.getInvoicePerson();
        })
    };

    /**
     * 删除无需报销发票信息*/
    $scope.delInvoicePerson = function (invoiceId) {
        orderService.delInvoicePerson(invoiceId, function () {
            $scope.getInvoicePerson();
        })
    };

    /**
     * 选择报销方式*/
    $scope.choosePayType = function (invoiceTy) {
        $scope.alertNeedAt = false;
        $scope.invoices.invoiceSubmit = invoiceTy;
        if(invoiceTy == 'school'){
            //学校报销
            $scope.invoiceTitle = $scope.invoiceScholl.name;
            $scope.invoices.invoiceId = $scope.invoiceScholl.id;
            //默认支付方式
            $scope.PaymentType = $scope.productList.payTypes.school[0].code;

        }else if(invoiceTy == 'other'){
            //不需学校报销
            $scope.invoiceTitle = $scope.invoicePerson.name;
            $scope.invoices.invoiceId = $scope.invoicePerson.id;
            //默认支付方式
            $scope.PaymentType = $scope.productList.payTypes.other[0].code;
        }
    };

    /**
     * 弹出提示信息*/
    $scope.messagess = function(){
        if($scope.shoperBargain == true){
            return "订单提交成功，请及时联系供应商议价!";
        }else {
            return '订单提交成功，正在等待供应商确认！';
        }
    };

    /**提交订单**/
    $scope.submit = function(){
        $scope.ifSign();
        if($scope.sureAddress == null){
            //是否有收货地址
            swal({
                text: '提交失败，请添加收货地址！',
                type: 'warning',
                buttons: {confirm:{text:'确定'}}
            }).then(function(isConfirm) {
                if (isConfirm === true) {
                    $scope.updateAddress();
                }
            });
            return false;
        }
        if($scope.thismallId == 'JD'){
            if(!$scope.needAcount){
                //需要选择支付方式；
                $scope.alertNeedAt = true;
                return false;
            }
        }

        //要提交的订单新消息
        $scope.orders = {
            'cartId': $scope.cartId,
            'personAddressId': $scope.sureAddress.id,
            'shoperBargain' : $scope.shoperBargain,
            'invoiceType' : $scope.invoiceType,
            'payType' : $scope.PaymentType,
            'mallId': $scope.thismallId,
            'shoperRemark': $scope.shoperRemark,
            'invoiceSubmit': $scope.invoices.invoiceSubmit,
            'invoiceContentType': $scope.invoices.invoiceContentType,
            'invoiceId': $scope.invoices.invoiceId
        };
        $scope.doSub = true;

        orderService.insert($scope.orders, function(data){
            if(data.toPayUrl == true){
                //填写经费
                window.location = data.payUrl;
            }else {
                window.location = '/#/pay';
            }
        },function(data){
            $scope.doSub = false;
            swal({
                text: '提交失败,服务器内部错误,请稍后再试',
                type: 'error',
                confirmButtonText: '确定'
            }).then(function(){
                window.location = '/#/cart';
            });
        });
    };

    //线下议价 信息
    orderService.getOrgMsg($scope.cartId, $scope.thismallId, function (data) {
        $scope.orgMsg = data;
    })
});

module.exports = order;







