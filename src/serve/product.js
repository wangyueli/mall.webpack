
var global = require('global');
var app = require('appModule');
var url = require('util/url.js');
var productService = app.service('productService', function ($http) {
    //获取列表数据
    this.getList = function(mallId, categoryId, keyword, brand, page, rows, property, minp, maxp, imported, sort, f) {
        $http.get(url.url('/mall/search', {
            'keyword' : keyword,
            'categoryId': categoryId,
            'brand' : brand,
            'page' : page,
            'rows' : rows,
            'property' : JSON.stringify(property),
            'minPrice' : minp,
            'maxPrice' : maxp,
            'imported' : imported,
            'sort' : sort,
            'mallId': mallId
        }, global.mall.api)).then(f);
    };

    //获取商品列表 （简化）
    this.getListCache = function(params, f) {
        $http.get(url.url('/homerecommend/product/content', params, global.mall.api)).then(f);
    };

    //获取详情页面数据;
    this.get = function(mallId, id, f) {
        $http.get(url.url('/mallproduct/detail', {
            'mallId': mallId,
            'productId': id
        }, global.mall.api)).then(f);
    };

    //获取详情页面数据cache;
    this.getDetailCache = function(mallId, id, f) {
        $http.get(url.url('/mallproduct/detail/cache', {
            'mallId': mallId,
            'productId': id
        }, global.mall.api)).then(f);
    };


    //获取路由里分类
    this.getCategory = function (mallId, categoryId, f) {
        $http.get(url.url('/category/detail', {
            'id': categoryId,
            'mallId': mallId
        }, global.mall.api)).then(f);
    };

    //加入对比
    this.addCompare = function (contrastId, pId, sf, ff) {
        $http.post(url.url('/contrast/'+ contrastId+ '/'+ pId, null, global.mall.api)).then(sf, ff);
    };

    //删除对比
    this.delCompare = function (contrastId, pId, sf, ff) {
        $http.delete(url.url('/contrast/'+ contrastId+ '/'+ pId, null, global.mall.api)).then(sf, ff);
    };

    //获取对比列表
    this.getCompare = function (contrastId, f) {
        $http.get(url.url('/contrast/'+ contrastId, null, global.mall.api)).then(f);
    };

    //获取该商品所能发货的地址
    this.surportRegion = function (produtId, f) {
        $http.get(url.url('/mallproduct/'+ produtId +'/region', null, global.mall.api)).then(f);
    };

    //获取关搜索键字列表
    this.getKeys = function (key, f) {
        $http.get(url.url('/product/sug', {
            'keyword': key
        }, global.mall.api)).then(f)
    };

    //查询商品列表是否有货
    this.haveProductCount = function (regionId, mallProIds, f) {
        $http.get(url.url('/product/stock', {
            'regionCode': regionId,
            'ids' : mallProIds
        }, global.mall.api)).then(f)
    };

    //商品价格
    this.productPrice = function (mallProIds, f) {
        $http.get(url.url('/product/price', {
            'ids' : mallProIds
        }, global.mall.api)).then(f);
    };

    //推荐商品
    this.recommendPrt = function (mallId, productId, f) {
        $http.get(url.url('/recommend/product/content', {
            'mallId': mallId,
            'productId': productId
        }, global.mall.api)).then(f);
    };

    //值得购买
    this.worthBuy = function (sbj, type, page, rows, f) {
        $http.get(url.url('/recommendSquare/list', {
            'subject': sbj,
            'type': type,
            'page': page,
            'rows': rows
        }, global.mall.api)).then(f);
    };
    
    //商品详情赠品
    this.getGifs = function (mallId, productId, regionCode, num, f) {
        $http.get(url.url('/mallproduct/gifts', {
            'mallId': mallId,
            'productId': productId,
            'regionCode': regionCode,
            'num': num
        }, global.mall.api)).then(f);
    }



});

module.exports = productService;
