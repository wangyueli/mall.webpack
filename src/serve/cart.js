var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var cartService = app.service('cartService', function ($http) {
	//获取购物车里商品数据(公共)
	this.get = function(id, f){
		$http.get(url.url('/cart/' + id, null, global.mall.api)).then(f);
	};

	//加入购物车
	this.insert = function(cartId, productId, mallId, cartNum, sf, ff) {
		$http.post(url.url('/cart/' + cartId + '/' + productId, {
			'mallId': mallId
		}, global.mall.api), cartNum).then(sf, ff);
	};

	//修改商品数量
	this.updateNum = function(id, cartNum, sf, ff) {
		$http.put(url.url('/cart/product/' + id , null, global.mall.api), cartNum).then(sf, ff);
	};

	//修改购物车商品的选中状态;
	this.updateProduct = function(id, checked, sf, ff){
		$http.put(url.url('/cart/product/' + id + '/checked', null ,global.mall.api), ''+checked).then(sf, ff);
	};

	//修改店铺的选中状态；
	this.updateStore = function (cartId, storeId, checked, sf, ff) {
		$http.put(url.url('/cart/product/checked',{
			'cartId': cartId,
			'storeId': storeId
		}, global.mall.api), ''+checked).then(sf, ff);
	};

	//修改商城的选中状态；
	this.updateMall = function (cartId, mallId, checked, sf, ff) {
		$http.put(url.url('/cart/product/checked',{
			'cartId': cartId,
			'mallId': mallId
		}, global.mall.api), ''+checked).then(sf, ff);
	};

	//删除购物车中商品所有选中的
	this.deletePrt = function(id, mallId, sf, ff) {
		$http.delete(url.url('/cart/' + id + '/checked',{
			'mallId': mallId
		},global.mall.api)).then(sf, ff);
	};

	//下单前校验（公共）
	this.Checkout = function (cartId, mallId, f) {
		$http.get(url.url('/cart/'+ cartId +'/verification', {
			'mallId': mallId
		}, global.mall.api)).then(f);

	};
});

module.exports = cartService;