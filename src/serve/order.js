
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var orderService = app.service('orderService', function ($http) {
	//获取待提交订单商品列表
	this.getList = function(personAddressId, thismallId, f) {
		$http.get(url.url('/orders/cart/0/product', {
			'personAddressId' : personAddressId,
			'mallId' : thismallId
		}, global.mall.api)).then(f);
	};

	//发票信息个人
	this.getInvoicePerson = function (f) {
		$http.get(url.url('/invoices', null, global.mall.api)).then(f);
	};

	//新增 修改个人发票信息
	this.addInvoicePerson = function (invoiceId, invoiceContent, sf, ff) {
		$http.post(url.url('/invoices/' + invoiceId, null, global.mall.api), invoiceContent).then(sf, ff);
	};

	//删除个人发票信息
	this.delInvoicePerson = function (invoiceId, sf, ff) {
		$http.delete(url.url('/invoices/' + invoiceId, null, global.mall.api)).then(sf, ff);
	};

	//支付方式(共同)
	this.getPay  = function (mallId, invoiceSubmit, f) {
		$http.get(url.url('/orders/cart/0/payType', {
			'mallId': mallId,
			'invoiceSubmit' : invoiceSubmit
		}, global.mall.api)).then(f);
	};

	//线下议价 显示供应商信息
	this.getOrgMsg = function (mallId, f) {
		$http.get(url.url('/orders/cart/0/list', {
			"mallId": mallId
		}, global.mall.api)).then(f);
	};

	//提交订单
	this.insert = function(orders, sf, ff) {
		$http.post(url.url('/orders', null, global.mall.api), orders).then(sf, ff);
	};

	//提交后跳转地址获取
	this.toWitchUrl = function (orderId, f) {
		$http.get(url.url('/orders/' + orderId+ '/topay', null, global.mall.api)).then(f);
	};

	//支付方式获取
	this.payTypes = function (orderId, f) {
		$http.get(url.url('/orders/' + orderId+ '/payType', null, global.mall.api)).then(f);
	};

	//支付地址获取
	this.payUrl = function (orderId, code, f) {
		$http.get(url.url('/orders/' + orderId+ '/paymentUrl', {
			'code': code
		}, global.mall.api)).then(f);
	};

	//支付结果
	this.payResult = function (orderId, f) {
		$http.get(url.url('/orders/'+ orderId+ '/payResult', null, global.mall.api)).then(f);
	}
});

module.exports = orderService;

