
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
     * 获取当前学校 logo name**/
    orgService.getSchool($stateParams.orgId, function (data) {
        $scope.schoolId = data.id;
        $scope.schoolName = data.name;
        if($scope.currentPath=='mall'){
            //www 上的特殊title设置
            $rootScope.Tabtitle = '云采通-专业科教商城';
            $rootScope.tlImg = 'images/favicon.ico'
        }else {
            if(data.id==58212){
                $rootScope.titleMall = data.name + '采购商城';
            }else {
                $rootScope.titleMall = data.name + '网上商城';
            }
            if($scope.currentPath=='product?keyword&categoryId&brand&mallId'){
                $rootScope.Tabtitle = $rootScope.keyword +'-'+ $rootScope.titleMall;
            }else {
                $rootScope.Tabtitle = $scope.title + $rootScope.titleMall;
            }
            $rootScope.tlImg = global.file.url+ '/'+ data.logo;
            //返回的orgId 存cookie；
            jquery.cookie('orgId', data.id, {
                'domain': global.domain,
                'path': '/'
            });
            //获取所有频道的品类 合并
            categoryService.get('', data.id, function (cary) {
                $rootScope.goodsType = cary.data;
            });
            $scope.getUseMall(data.id);
            $scope.getGoodsTy(data.id);
        }
    });

    /**
     * 获取该学校下 可访问频道*/
    $scope.getUseMall = function(orgId){
        orgService.getUseMall(orgId, function (data) {
            $scope.mallMsg = data;
            var esMall = _.find(data, function (item) {
                return item.mallBussinessType == 'esmall'
            });
            if(esMall && $scope.currentPath==''){
                //如果有协议供货频道 获取协议供货热卖
                homeService.getList(esMall.mallId, orgId, function (data) {
                    if(data.hots){
                        $scope.mallProIds = '';
                        _.each(data.hots.children, function (good) {
                            $scope.mallProIds += good.data.mallId + '.' + good.data.productId + ',';
                        });
                        $scope.esMallPros = data.hots.children;
                        $rootScope.productPrice($scope.mallProIds);
                    }
                });
            }

            //更多协议热卖
            $scope.moreEsmallHot = function () {
                window.open('/#/product?mallId=' + esMall.mallId);
            };
            if($stateParams.mallId){
                //设置当前搜索频道
                var nowChannel = _.find(data, function (item) {
                    return item.mallId == $stateParams.mallId;
                });
                $scope.nowMall = nowChannel.mallSimpleName;
                if($scope.currentPath=='channel?mallId'){
                    $rootScope.Tabtitle = $scope.nowMall +'-'+ $rootScope.titleMall;
                }
            }
        });
    };

    /**
     * 获取导航分类 频道**/
    $scope.getGoodsTy = function (orgId) {
        if($scope.currentPath == 'channel?mallId' || $scope.currentPath=='helper?mallId'){
            categoryService.get($stateParams.mallId, orgId, function (data) {
                $rootScope.goodsTypeChannel = data.data;
                $rootScope.goodsTypeChannelBack = data.data;
            })
        }
    };

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
            $location.url('channel?orgId=' + $cookies.get('orgId') + '&mallId=' +mall.mallId);
        }
    };

    /**
     * 获取屏幕高度 当购物车为空时，设置最小高度，将页面撑满*/
    var h = jquery(window).height();
    jquery('#main-content').css({minHeight: (h-260) });
});

module.exports = content;


