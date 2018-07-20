
var _ = require('underscore');
var app = require('appModule');
var global = require('global');

require('serve/product.js');
require('serve/org.js');
require('serve/auth.js');
require('serve/category.js');
require('serve/store.js');

var productDetail = app.controller('productDetailCtrl', function ($scope, $rootScope, $log, $location, $stateParams, $anchorScroll, $modal, $filter, $cookies, $http, authService, productService) {
	$scope.id = $stateParams.id;
	$scope.num = 1;
	$scope.detailMallId = $stateParams.mallId;

	/**
	 * 获取地址数据*/
	$rootScope.getRegion($stateParams.mallId);

	$scope.titleProv = '请选择';
	$scope.titleCity = '请选择';
	$scope.titleCounty = '请选择';
	$scope.titleTown = '请选择';
	/**
	 * 地址筛选*/
	$scope.addressChoose = function (ad, adId, adName) {
		if(ad=='provice'){
			$scope.titleProv = adName;
			$scope.address = $scope.titleProv;
			$scope.cityList = _.filter($scope.regions, function (data) {
				return data.code_parent == adId;
			});
			$scope.act = '市';
			$scope.actTitle = 1;
		}else if(ad=='city'){
			$scope.titleCity = adName;
			$scope.address = $scope.titleProv + $scope.titleCity;
			$scope.countyList = _.filter($scope.regions, function (data) {
				return data.code_parent == adId;
			});
			if($scope.countyList.length>0){
				$scope.act='县';
				$scope.actTitle = 2;
			}else {
				$scope.region = adId;
				$scope.getDetail();
				$scope.ifAddrShow = false;
			}
		}else if(ad=='county'){
			$scope.titleCounty = adName;
			$scope.address =  $scope.titleProv + $scope.titleCity + $scope.titleCounty;
			$scope.townList = _.filter($scope.regions, function (data) {
				return data.code_parent == adId;
			});
			if($scope.townList.length > 0){
				$scope.act='乡';
				$scope.actTitle = 3;
			}else {
				$scope.region = adId;
				$scope.getDetail();
				$scope.ifAddrShow = false;
			}
		}else if(ad=='town'){
			$scope.titleTown = adName;
			$scope.region = adId;
			$scope.address = $scope.titleProv + $scope.titleCity + $scope.titleCounty + $scope.titleTown;
			$scope.ifAddrShow = false;
			$scope.getDetail();
		}
	};

	//点击不同地址title时；
	$scope.actTitleClick = function (act) {
		if(act==0){
			$scope.actTitle = 0;
			$scope.titleCity = '请选择';
			$scope.titleCounty = '请选择';
			$scope.titleTown = '请选择';
		}else if(act==1){
			$scope.actTitle = 1;
			$scope.titleCounty = '请选择';
			$scope.titleTown = '请选择';
		}else {
			$scope.actTitle = 2;
			$scope.titleTown = '请选择';
		}
	};


	/**
	 * 商品库存状态*/
	$scope.haveProductCount = function () {
		productService.haveProductCount($scope.region, $scope.mallProIds, function (data) {
			$scope.haveProduct = data[0];
		})
	};

	//获取详情页数据；
	$scope.getDetail = function () {
		productService.get($stateParams.mallId, $scope.id, function(data) {
			$scope.detail = data;
			$scope.imgSrcs = (data.pic).split(",");
			$scope.bigImg = $scope.imgSrcs[0];
			$scope.mallProIds = data.mallId + '.' + data.productId;
			$scope.haveProductCount();
			$rootScope.Tabtitle = data.name + '-' + $rootScope.titleMall;
		});
	};
	$scope.getDetail();


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
				type : 'error',
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
});

module.exports = productDetail;
