
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');

var orderService = app.service('orderService', function ($http) {
	//获取待提交订单商品列表
	this.getList = function(personAddressId, cartId, thismallId, f) {
		$http.get(url.url('/orders/cart/'+cartId+'/product', {
			'cartId' : cartId,
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
	this.getOrgMsg = function (cartId, mallId, f) {
		$http.get(url.url('/orders/cart/' + cartId + '/list', {
			"mallId": mallId
		}, global.mall.api)).then(f);
	};

	//提交订单
	this.insert = function(orders, sf, ff) {
		$http.post(url.url('/orders', null, global.mall.api), orders).then(sf, ff);
	};

	//提交后跳转地址获取
	this.toPay = function (orderId, f) {
		$http.get(url.url('/orders' + orderId+ 'payType', null, global.mall.api)).then(f);
	}

});

module.exports = orderService;

