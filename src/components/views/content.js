
var jquery = require('jquery');
var _ = require('underscore');
var app = require('appModule');
var global = require('global');

require('serve/org.js');
require('serve/home.js');
require('serve/category.js');

var content = app.controller('contentCtrl', function ($scope, $stateParams, $http, $cookies, $rootScope, $location, productService, orgService, homeService, categoryService) {

    $rootScope.nowMallId = $stateParams.mallId;

    //////////////////////////////////商城顶部配置////////////////////////////////////

    /**
     * 获取该学校下 可访问频道*/
    orgService.getUseMall(function (data) {
        $scope.mallMsg = data;
        $scope.haveEsmall = _.find(data, function (item) {
            return item.mallBussinessType == 'esmall';
        });
        /*var esMall = _.find(data, function (item) {
         return item.mallBussinessType == 'esmall'
         });
         if(esMall && $scope.currentPath==''){
         //如果有协议供货频道 获取协议供货热卖
         homeService.getList(esMall.mallId, function (data) {
         if(data.hots){
         $scope.mallProIds = '';
         _.each(data.hots.children, function (good) {
         $scope.mallProIds += good.data.mallId + '.' + good.data.productId + ',';
         });
         $scope.esMallPros = data.hots.children;
         $rootScope.productPrice($scope.mallProIds);
         }
         });
         }*/
        if($location.path() == '/channel'){
            //设置当前搜索频道
            var nowChannel = _.find(data, function (item) {
                return item.mallId == $stateParams.mallId;
            });
            $scope.nowMall = nowChannel.mallSimpleName;
            $rootScope.titleTab = $scope.nowMall +'-'+ $rootScope.titleMall;
        }
    });

    /*
    * 获取所有频道的品类*/
    categoryService.get('', function (cary) {
        $rootScope.goodsType = cary.data;
    });

    /*
    * 获取导航分类 频道*/
    if($scope.currentPath == 'channel?mallId' || $scope.currentPath=='helper?mallId'){
        categoryService.get($stateParams.mallId, function (data) {
            $rootScope.goodsTypeChannel = data.data;
            $rootScope.goodsTypeChannelBack = data.data;
        })
    }

    /////////////////////////////////////end///////////////////////////////////////

    /**
     * 选择不同的商城**/
    $scope.chooseMall = function (mall) {
        if(mall.mallId=='YNK'){
            var newWin = window.open();
            //跳到伊洛凯
            homeService.getUrlYNK(mall.mallId, function (data) {
                var ylkUrl = data.urlPath;
                var ylkDatas = data.param;

                function openPostWindow(url, params) {
                    newWin.location = url;
                    var formStr = '';
                    //设置样式为隐藏，打开新标签再跳转页面前，如果有可现实的表单选项，用户会看到表单内容数据
                    formStr = '<form style="visibility:hidden;" method="POST" action="' + url + '">' +
                        '<input type="hidden" name="ssoCode" value="' + params.ssoCode + '" />' +
                        '<input type="hidden" name="ssoCodeEncrypt" value="' + params.ssoCodeEncrypt + '" />' +
                        '</form>';
                    newWin.document.body.innerHTML = formStr;
                    newWin.document.forms[0].submit();

                    return newWin;
                }
                openPostWindow(ylkUrl, ylkDatas);
            });
        }else if(mall.mallId=='15E83983E00005C0241002C062006843'){
            $location.url('helper?mallId='+mall.mallId);
        }else {
            $location.url('channel?mallId='+ mall.mallId);
        }
    };

    /**
     * 获取屏幕高度 当购物车为空时，设置最小高度，将页面撑满*/
    var h = jquery(window).height();
    jquery('#main-content').css({minHeight: (h-260) });
});

module.exports = content;


