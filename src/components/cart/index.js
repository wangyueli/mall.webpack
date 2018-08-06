var app = require('appModule');
var _ = require('underscore');
var global = require('global');
var jquery = require('jquery');

require('serve/auth.js');
require('serve/cart.js');

var cart = app.controller('cartCtrl', function ($scope, $rootScope, $cookies, $log, $location, $stateParams, $anchorScroll, $modal, authService, cartService) {
	$scope.$parent.shopStep = 1;
	$scope.cartId = $cookies.get('cart_id');
	$scope.storeList = null;

	/**
	 * 获取登录信息*/
	$scope.ifSign();

	/**获取购物车列表**/
	$scope.refresh = function () {
		cartService.get($scope.cartId, function(data) {
			$scope.originData = data;
			var mallMap = {};
			_.each(data, function(product) {
				var mall = mallMap[product.mallId];
				if (mall == null) {
					mall = {
						'id' : product.mallId,
						'name' : product.mallName,
						'logo' : product.mallLogo,
						'storeList' : {}
					};
					mallMap[product.mallId] = mall;
				}
				var store = mall.storeList[product.storeId];
				if (store == null) {
					store = {
						'id' : product.storeId,
						'name' : product.storeName,
						'productList': []
					};
					mall.storeList[product.storeId] = store;
				}
				store.productList.push(product);
			});
			$scope.mallList = _.values(mallMap);
		});
	};

	$scope.refresh();

	//勾选购物车中某一个商品
	$scope.checkProduct = function(product, checked) {
		cartService.updateProduct(product.id, checked, function() {
			product.checked = checked;
		});
	};

	//勾选购物车中的某一个店铺
	$scope.checkStore = function(store) {
		var checked = !$scope.isStoreChecked(store);
		cartService.updateStore($scope.cartId, store.id, checked, function() {
			_.each(store.productList, function(product) {
				product.checked = checked;
			});
		});
	};

	//勾选购物车中的某一个商城
	$scope.checkMall = function(mall) {
		var checked = !$scope.isMallChecked(mall);
		cartService.updateMall($scope.cartId, mall.id, checked, function() {
			_.each(mall.storeList, function (store) {
				_.each(store.productList, function(product) {
					product.checked = checked;
				});
			});
		});
	};

	//勾选全选
	$scope.checkMallAll = function(mallId) {
		var checked = !$scope.isMallAllChecked();
		cartService.updateMall($scope.cartId, mallId, checked, function() {
			_.each($scope.originData, function (product) {
				product.checked = checked;
			});
		});

	};

	//判断店铺是否为选中状态；
	$scope.isStoreChecked = function(store) {
		var product = _.find(store.productList, function(product) {
			return product.checked == false;
		});
		return product == null;
	};

	//判断商城是否为选中状态
	$scope.isMallChecked = function(mall) {
		var store = _.find(mall.storeList, function(store) {
			return $scope.isStoreChecked(store) == false;
		});
		return store == null;
	};


	//判断是否为全选状态；
	$scope.isMallAllChecked = function() {
		var product = _.find($scope.originData, function(product) {
			return product.checked == false;
		});
		if(product){
			return false;
		}else {
			return true;
		}
	};

	//遍历出所有选中的商品；
	$scope.getTotalNum = function(mall) {
		var num = 0;
		_.each(mall.storeList, function (store) {
			_.each(store.productList, function(product) {
				if (product.checked) {
					num += Number(product.num);
				}
			});
		});
		return num;
	};

	//计算所有选中商品的总价格；
	/*一口价*/
	$scope.getTotalPrice = function(mall) {
		var priceMap = {};
		_.each(mall.storeList, function (store) {
			_.each(store.productList, function(product) {
				if (product.checked == true) {
					if(product.hasOwnProperty('unitPrice')){
						if (priceMap[product.currency] == null) {
							priceMap[product.currency] = 0;
						}
						priceMap[product.currency] += product.unitPrice * product.num;
					}
				}
			});
		});
		return priceMap;
	};
	/*节省金额*/
	$scope.getSaveTotal = function (mall) {
		var savePirceMap = {};
		_.each(mall.storeList, function (store) {
			_.each(store.productList, function (product) {
				if(product.checked){
					if(product.hasOwnProperty('unitPriceShow')){
						if (savePirceMap[product.currency] == null) {
							savePirceMap[product.currency] = 0;
						}
						savePirceMap[product.currency] += (product.unitPriceShow - product.unitPrice) * product.num;
					}
				}
			})
		});
		return savePirceMap;
	};

	/*最小价*/
	$scope.getTotalPriceMin = function(mall) {
		var priceMapMin = {};
		_.each(mall.storeList, function (store) {
			_.each(store.productList, function(product) {
				if (product.checked == true) {
					if(product.hasOwnProperty('unitPriceMin')){
						if (priceMapMin[product.currency] == null) {
							priceMapMin[product.currency] = 0;
						}
						priceMapMin[product.currency] += product.unitPriceMin * product.num;
					}
				}
			});
		});
		return priceMapMin;
	};

	/*最大价*/
	$scope.getTotalPriceMax = function(mall) {
		var priceMapMax = {};
		_.each(mall.storeList, function (store) {
			_.each(store.productList, function(product) {
				if (product.checked == true) {
					if(product.hasOwnProperty('unitPriceMax')){
						if (priceMapMax[product.currency] == null) {
							priceMapMax[product.currency] = 0;
						}
						priceMapMax[product.currency] += product.unitPriceMax * product.num;
					}
				}
			});
		});
		return priceMapMax;
	};



	/**输入数量**/
	$scope.blurCart = function(cart){
		if(cart.num < 1 || cart.num >9999){
			swal({
				text: '请检查购买数量!',
				icon: 'error',
                buttons: {confirm:{text:'确定'}}
			});
			$scope.refresh();
		}else{
			cartService.updateNum(cart.id, cart.num,  function(data){
				$scope.refresh();
			}, function(){
			});
		}
	};

	/**添加数量**/
	$scope.addCart = function(cart){
		if(cart.num < 9999){
			cartService.updateNum(cart.id, cart.num + 1,  function(){
				cart.num++;
			});

		}
	};
	/**减少数量**/
	$scope.reduceCart = function(cart){
		if(cart.num > 1){
			cartService.updateNum(cart.id, cart.num - 1,  function(){
				cart.num--;
			});
		}
	};

	/**限制数量只能输入正整数**/
	$scope.checkNun = function (num) {
		if(num){
			var type="^([1-9]\\d*|[0]{1,1})$";
			var re = new RegExp(type);
			if(num.match(re)==null) {
				alert("请输入整数!");
			}
		}
	};

	/**删除商品**/
	$scope.cartDelete = function(id, mallId){
		swal({
			text: "确认删除选中的商品？",
			icon: 'warning',
			buttons:{
				cancel: {
					text: '取消',
					visible: true
				},
				confirm: {text: '确定'}
			}
		}).then(function(isConfirm) {
			if (isConfirm === true) {
				//删除某一个商品
				if (id) {
					cartService.updateNum(id, '0', function () {
						swal({
							text: '商品删除成功!',
							icon: 'success',
                            buttons: {confirm:{text:'确定'}}
						});
						$scope.refresh();
					}, function () {
						swal({
							text: '删除失败，请稍后重试!',
							icon: 'error',
                            buttons: {confirm:{text:'确定'}}
						});
					});
				} else {
					//删除某个商城下多个商品；
					cartService.deletePrt($scope.cartId, mallId, function () {
						swal({
							text: '选中的商品已删除!',
							icon: 'success',
                            buttons: {confirm:{text:'确定'}}
						});
						$scope.refresh();
					}, function () {
						swal({
							text: '删除失败，请稍后重试!',
							icon: 'error',
                            buttons: {confirm:{text:'确定'}}
						});
					});
				}
			}
		});
	};

	/**立即下单**/
	$scope.order = function(mallId) {
		var product = _.find($scope.originData, function(product) {
			return product.checked == true;
		});
		// 必须有商品
		if (product) {
			if($scope.o){
				//后台校验
				cartService.Checkout($scope.cartId, mallId, function (data) {
					if(data.success == true){
						window.location = data.hrefUrl +  '/#/order?cartMallId=' +mallId;
					}else {
						if(data.code == 'not_login'){
							window.location = $scope.getLoginUrlMall();
						}else {
							swal({
								text: data.message,
								icon: 'error',
								buttons:{confirm: {text: '确定'}}
							});
						}
					}
				});
			}else {
				window.location = $scope.getLoginUrlMall();
			}
		}else {
			swal({
				text : '您还未选择商品!',
				icon : 'warning',
				buttons:{confirm: {text: '确定'}}
			});
		}
	};
});

module.exports = cart;