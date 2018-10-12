
var _ = require('underscore');
var app = require('appModule');
var global = require('global');
var jquery = require('jquery');

require('serve/product.js');
require('serve/personAddress.js');


var product = app.controller('productCtrl', function ($scope, $log, $location, $stateParams, $anchorScroll, $modal, $http,  $rootScope, $cookies, $filter, productService, personAddressService) {

    $scope.categoryId = $stateParams.categoryId || null;
    $rootScope.keyword = $stateParams.keyword || null;
    $rootScope.brand = $stateParams.brand || null;
    $scope.page = 1;
    $scope.rows = 20;
    $scope.minp = null;
    $scope.maxp = null;
    $scope.property = {};
    $scope.imported = null;
    $scope.sort = 'scale desc';
    $scope.allChooseArr = [];

    /*
     * title*/
    if($rootScope.keyword){
        $rootScope.titleTab = $rootScope.keyword +  '-' + $rootScope.titleMall;
    }else if($scope.categoryId){
        productService.getCategory($stateParams.mallId, $scope.categoryId, function (data) {
            $rootScope.categoryName = data.name;
            $rootScope.titleTab = $rootScope.categoryName +'-'+ $rootScope.titleMall;
        });
    }else {
        $rootScope.titleTab = '商品列表-' + $rootScope.titleMall;
    }

    if($stateParams.mallId){
        $scope.mallId = $stateParams.mallId;
        //地区获取
        $rootScope.getRegion($scope.mallId);
    }else {
        $scope.showMallType = true;
        $scope.mallId = null;
    }

    /**
     * 获取品牌*/
    if($scope.brand){
        $scope.isShowBrand=true;
        $scope.allChooseArr.push({'chType':'品牌', 'chName':$scope.brand});
    }

    /**
     * 商品库存状态*/
    $scope.haveProductCount = function () {
        productService.haveProductCount($rootScope.region, $scope.mallProIds, function (data) {
            $scope.productCountState = {};
            _.each(data, function (item) {
                $scope.productCountState[item.productId] = item.stock;
            });
        })
    };

    /**
     * 获取商品数据**/
    $scope.getList = function () {
        $scope.watiList = true;
        productService.getList($scope.mallId, $scope.categoryId, $rootScope.keyword, $scope.brand, $scope.page-1, $scope.rows, $scope.property, $scope.minp, $scope.maxp, $scope.imported, $scope.sort, function(data){
            $scope.watiList = false;
            //判断某个频道种类商品库存 获取价格
            $scope.mallProIds = '';
            _.each(data.product.rs, function (good) {
                $scope.mallProIds += good.mallId + '.' + good.productId + ',';
            });

            if($scope.mallId){
                //有mallId时候才有$rootScope.region
                $scope.haveProductCount();
            }else {
                $scope.productCountState = {};
            }
            //价格
            $rootScope.productPrice($scope.mallProIds);

            window.scrollTo(0,0);
            $scope.products = data;

            //获取所有的拼音数组；
            $scope.letters = data.brandAggregate.pinyinAggr;
            if($scope.letters){
                $scope.letters.unshift('所有品牌');
                $scope.letters.splice(1,1);
            }
            //获取所有的品牌列表
            $scope.brandAggregate = data.brandAggregate;

            if($scope.brandAggregate.brandList){
                $scope.brandNamesOrigin = data.brandAggregate.brandList;
                $scope.brandNames = data.brandAggregate.brandList;
                if($scope.brandNames.length>22){
                    //显示更多按钮
                    $scope.bBtn = true;
                }
            }

            //获取商品列表；
            $scope.goods = data.product.rs;
            if($scope.goods.length==0){
                $scope.ifList = true;
            }

            //图片改为小尺寸的；
            _.each($scope.goods, function (item) {
                item.pic = item.pic.replace('/n0/', '/n1/');
            });

            //获取总共商品数量
            $scope.listCount = data.product.count;
            $scope.pagesCount = parseInt($scope.listCount/20) + 1;
            if($scope.listCount>10){
                if($scope.listCount>9999){
                    $scope.productCounts = parseInt($scope.listCount/10000) + '万+';
                }else {
                    $scope.productCounts = parseInt($scope.listCount/10)*10 + '+';
                }
            }else {
                $scope.productCounts = $scope.listCount;
            }
        });
        $scope.ifList = false;
    };
    $scope.getList();

    /**
     * 确定价格区间*/
    $scope.priceSection = function () {
        var min = $scope.minpIpt;
        var max = $scope.maxpIpt;
        if(Number(min)>Number(max)){
            $scope.minp = max;
            $scope.maxp = min;
        }else {
            $scope.minp = min;
            $scope.maxp = max;
        }
        $scope.getList();
    };

    /**
     * 商品类型过滤*/
    $scope.checkMallType = function (mallId) {
        $scope.mallId = mallId;
        if(mallId){
            $rootScope.getRegion(mallId, function () {
                $scope.getList();
            });
        }else {
            $scope.getList();
        }

    };

    /**
     * 选择地区*/
    jquery('.addr-sl').mouseover(function () {
        jquery('.tab-address').show();
    });
    jquery('.addr-sl').mouseout(function () {
        jquery('.tab-address').hide();
    });
    $scope.addressChoose = function (ad, adId, adName) {
        $rootScope.addressChooseAll($scope.mallId, ad, adId, adName, function () {
            $scope.getList();
        });
    };

    /**
     *  当鼠标滑过品牌字母列表时，选择以该字母开头的品牌；**/
    $scope.brandChoose = function (letter) {
        $scope.brandNames = _.filter($scope.products.brandAggregate.brandList,function (item) {
            if(letter == '所有品牌'){
                return item;
            }else {
                return item.pinyin == letter;
            }
        });
    };

    /**
     * 当点击选择品某个牌时**/
    $scope.brandChooseThis = function (brand) {
        $scope.brand = brand;
        $scope.getList();
        $scope.isShowBrand=true;
        $scope.allChooseArr.push({'chType':'品牌', 'chName':brand});
    };

    /**
     * 当点击选择摸个价格区间时*/
    $scope.priceChooseThis = function (minp, maxp) {
        $scope.minp = minp;
        $scope.maxp = maxp;
        $scope.getList();
        $scope.isShowPrice=true;
        $scope.allChooseArr.push({'chType':'价格', 'chName':$scope.minp+'-'+$scope.maxp});
    };

    /**
     * 点击某个动态分类**/
    $scope.ctSpChoose = function (nameT, name, code) {
        $scope.property[code] = name;
        $scope.allChooseArr.push({'chType':nameT, 'chName':name, 'code':code});
        $scope.getList();
    };

    /**
     * 选择国别**/
    $scope.impChoose = function (imPname, bl) {
        $scope.imported = bl;
        $scope.allChooseArr.push({'chType':'产国', 'chName':imPname});
        $scope.ifImp = true;
        $scope.getList();
    };

    /**
     * 点击关闭所选择的时**/
    $scope.closeChoose = function (chType, code) {
        delete $scope.property[code];

        for(var i=0; i<$scope.allChooseArr.length; i++){
            if(chType == $scope.allChooseArr[i].chType){
                $scope.allChooseArr.splice(i,1);
            }
            if(chType == '品牌'){
                $scope.brand = null;
                $scope.isShowBrand=false;
            }
            else if(chType == '分类'){
                $scope.categoryId = null;
                $scope.isShowCt = false;
            }
            else if(chType == '产国'){
                $scope.imported = null;
                $scope.ifImp = false;
            }
            else if(chType == '价格'){
                $scope.minp = null;
                $scope.maxp = null;
                $scope.isShowPrice=false;
            }
        }
        $scope.getList();
        $scope.ifList = false;
    };

    /**
     * 未找到商品*/
    $scope.noData = function () {
        $scope.categoryId = null;
        $rootScope.keyword = null;
        $rootScope.brand = null;
        $scope.getList();
        $scope.ifList = false;
    };

    /**
     * 获取对比列表**/
    $scope.getCompare = function () {
        productService.getCompare(0, function (data) {
            $scope.cpCount = data.products.length;
            if($scope.cpCount>0){
                $scope.showComp = true;
            }
            $scope.compList = data.products;
        })
    };
    $scope.getCompare();

    /**
     * 加入对比**/
    $scope.addCompare = function (contrastId, pId, price) {
        if($scope.o){
            if(price){
                $scope.showComp = true;
                if($scope.cpCount<4){
                    productService.addCompare(contrastId, pId, function (data) {
                        swal({
                            text: '加入成功',
                            icon: "success",
                            buttons: {confirm:{text:'确定'}}
                        }).then(function (isConfirm) {
                            if(isConfirm === true){
                                $scope.getCompare();
                            }
                        });
                    }, function (data) {
                        swal({
                            text: '加入失败,失败原因：'+ data,
                            icon: 'error',
                            buttons: {confirm:{text:'确定'}}
                        })
                    });
                }else {
                    swal({
                        text: '对比栏已满，您可以删除不需要的栏内商品再继续添加哦！',
                        icon: 'error',
                        buttons: {confirm:{text:'确定'}}
                    });
                }
            }else {
                swal({
                    text: '抱歉，您无权加入对比！',
                    icon: 'warning',
                    buttons: {confirm:{text:'确定'}}
                });
            }
        }else {
            if($scope.canTwoCode){
                $scope.loginMask = true;
            }else {
                window.location = $scope.getLoginUrlMall();
            }
        }
    };

    /**
     * 删除对比**/
    $scope.delCompare =  function (pId) {
        if($scope.cpCount>0){
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
        }
    };

    /**
     * 动态分类 是否显示更多按钮**/
    $scope.mBtn = {};
    $scope.IfshowM = function (id, ct) {
        $scope.mBtn[ct] = false;
        var plist = jquery('#'+id).height();
        if(plist>25){
            $scope.mBtn[ct] = true;
        }
    };

    /**
     * 品牌 更多按钮**/
    $scope.showM = function () {
        var ulist = jquery('#brands').height();
        if(ulist>30){

        }
    };
});

module.exports = product;


