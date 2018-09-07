
var _ = require('underscore');
var app = require('appModule');
var global = require('global');
var jquery = require('jquery');

require('serve/product.js');
require('serve/org.js');
require('serve/auth.js');
require('serve/category.js');
require('serve/store.js');
require('serve/personAddress.js');

var productDetail = app.controller('productDetailCtrl', function ($scope, $rootScope, $log, $location, $stateParams, $anchorScroll, $modal, $filter, $cookies, $http, authService, productService, personAddressService) {
	$scope.id = $stateParams.id;
	$scope.num = 1;
	$scope.detailMallId = $stateParams.mallId;

	/**
	 * 该商品库存状态*/
	$scope.haveProductCount = function (mallProId) {
		productService.haveProductCount($rootScope.region, mallProId, function (data) {
			$scope.haveProduct = data[0];
		})
	};

	//获取详情页数据；
	$scope.getDetail = function () {
		productService.get($stateParams.mallId, $scope.id, function(data) {
			$scope.detail = data;
			$scope.imgSrcs = (data.pic).split(",");
			$scope.bigImg = $scope.imgSrcs[0];
			$scope.haveProductCount(data.mallId+ '.' + data.productId);
			$rootScope.Tabtitle = data.name + '-' + $rootScope.titleMall;

			var categoryLength = $scope.detail.categories.length;
			$scope.categoryIdLast = $scope.detail.categories[categoryLength-1].id;
			var random = Math.floor(Math.random()*categoryLength);
			$scope.categoryId = $scope.detail.categories[random].id;

			//品牌优惠
			$scope.paramsReduce = {
				'mallId': $stateParams.mallId,
				'orgId':  $cookies.get('orgId'),
				'categoryId': $scope.categoryId,
				'brand': $scope.detail.brand,
				'page': 0,
				'rows': 10,
				'sort': 'discountRate desc'
			};
			productService.getListCache($scope.paramsReduce, function (data) {
				$scope.bGoods = data.product.rs;
				$scope.mallProIds = '';
				_.each($scope.bGoods, function (good) {
					$scope.mallProIds +=  good.mallId + '.' + good.productId + ',';
				});
				//是否有货
				productService.haveProductCount($rootScope.region, $scope.mallProIds, function (data) {
					$scope.bProductCountState = {};
					_.each(data, function (item) {
						$scope.bProductCountState[item.productId] = item.stock;
					});
				});
				//价格
				$rootScope.productPrice($scope.mallProIds);
			});

			//新品上市
			$scope.paramsNew = {
				'mallId': $stateParams.mallId,
				'orgId':  $cookies.get('orgId'),
				'categoryId': $scope.categoryId,
				'brand': $scope.detail.brand,
				'page': 0,
				'rows': 10,
				'sort': 'upTime desc'
			};
			productService.getListCache($scope.paramsNew, function (data) {
				$scope.nGoods = data.product.rs;
				$scope.mallProIdsNew = '';
				_.each($scope.nGoods, function (good) {
					$scope.mallProIdsNew +=  good.mallId + '.' + good.productId + ',';
				});
				//是否有货
				productService.haveProductCount($rootScope.region, $scope.mallProIdsNew, function (data) {
					$scope.nProductCountState = {};
					_.each(data, function (item) {
						$scope.nProductCountState[item.productId] = item.stock;
					});
				});
				//价格
				$rootScope.productPrice($scope.mallProIdsNew);
			})
		});

		//推荐商品
		productService.recommendPrt($stateParams.mallId, $scope.id, function (data) {
			$scope.recommends = [];
			_.each(data.productIds, function (id, index) {
				if(index<6){
					productService.get(data.mallId, id, function (data) {
						$scope.recommends.push(data);
					});
				}
			})
		});
	};

    /**
     * 获取地址数据*/
    $rootScope.getRegion($stateParams.mallId, $scope.getDetail());

	/**
	 * 选择地区*/
	$scope.addressChoose1 = function (ad, adId, adName) {
		$rootScope.addressChooseAll($stateParams.mallId, ad, adId, adName, function () {
			$scope.getDetail();
		});
	};

	//购物车数量添加；
	$scope.shop = function (type) {
		if (type == 'add') {
			if (9999 > $scope.num) {
				$scope.num++;
			}
		} else {
			if ($scope.num >= 2) {
				$scope.num--;
			}
		}
	};
	$scope.chageNum = function() {
		if ($scope.num <= 0 || $scope.num > 9999) {
			swal({
				text : '请检查购买数量!',
				icon : 'error',
				buttons: {confirm:{text:'确定'}}
			});
			$scope.num = 1;
		}
	};

	/**放大镜**/
	var objDemo = document.getElementById("for-bigsee");
	var objMark = document.getElementById("mark");
	var objFloatBox = document.getElementById("float-box");
	var objBigBox = document.getElementById("big-box");
	var objBigBoxImage = objBigBox.getElementsByTagName("img")[0];

	objMark.onmouseover = function () {
		objFloatBox.style.display = "block";
		objBigBox.style.display = "block";
		objMark.style.cursor = "move";
	};
	objMark.onmouseout = function () {
		objFloatBox.style.display = "none";
		objBigBox.style.display = "none";
	};
	objMark.onmousemove = function (ev) {
		var _event = ev || window.event;  //兼容多个浏览器的event参数模式
		var left = _event.clientX - objDemo.offsetLeft - objFloatBox.offsetWidth / 2;
		var top = _event.clientY - objDemo.offsetTop - objFloatBox.offsetHeight / 2 - 140;

		//设置边界处理，防止移出小图片
		if (left < 0) {
			left = 0;
		}else if (left > (objMark.offsetWidth - objFloatBox.offsetWidth)) {
			left = objMark.offsetWidth - objFloatBox.offsetWidth;
		}

		if(top<0){
			top = 0
		}else if(top > (objMark.offsetHeight - objFloatBox.offsetHeight)){
			top = objMark.offsetHeight - objFloatBox.offsetHeight;
		}

		objFloatBox.style.left = left+10 + "px";   //oSmall.offsetLeft的值是相对什么而言
		objFloatBox.style.top = top+10 + "px";

		//求其比值
		var percentX = left / (objMark.offsetWidth - objFloatBox.offsetWidth);
		var percentY = top / (objMark.offsetHeight - objFloatBox.offsetHeight);

		//方向相反，小图片鼠标移动方向与大图片相反，故而是负值
		objBigBoxImage.style.left = -percentX * (objBigBoxImage.offsetWidth - objBigBox.offsetWidth) + "px";
		objBigBoxImage.style.top = -percentY * (objBigBoxImage.offsetHeight - objBigBox.offsetHeight) + "px";
	};

	/**
	 * 推荐商品动画*/
	$scope.showName = function(i) {
		jquery(".hotp-name" + i).css('display','block');
		jquery(".hotp-name" + i).animate({top: "114px"},400);
	};
	$scope.hideName = function(i) {
		jquery(".hotp-name" + i).css({'display':'none', 'top':'150px'});
	};

	/**
	 * 店铺热卖*/
	$scope.showNameHot = function(i) {
		jquery(".hot-item-name" + i).css('display','block');
		jquery(".hot-item-name" + i).animate({top: "133"},400);
	};
	$scope.hideNameHot = function(i) {
		jquery(".hot-item-name" + i).css({'display':'none', 'top':'170px'});
	};

	/*
	* 店铺关注
	* */
	var box = document.getElementsByClassName("my-save")[0];
	var icon = box.getElementsByTagName("i")[0];
    var count = 0;
    box.onclick = function() {
        count++;
        if (count%2 == 1) {
            icon.style.color = "#e11e2d";
        }else {
            icon.style.color = "#ccc";
        }
    }

});

module.exports = productDetail;
