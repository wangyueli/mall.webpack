var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlFour', function ($scope, productService) {

    /*
    * 精选食品*/
    var pIds01 = ['2156342', '3995878', '3337468', '2990259', '6939819', '3987510', '2340268', '4227751', '1195329', '2248414', '4261626', '3554085', '6279643', '4622537', '3397560', '5903062', '1278112'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


    /*
    * 精选酒水*/
    var pIds02 = ['5920265', '4232917', '16017732211', '565624', '5771437', '11307675041', '15963443187', '3261393', '1150981249', '12945627100', '3758979', '6314015', '16182654270', '4508134', '2979170', '7748353', '4679170', '904455', '5204146', '2433067', '2750459', '899496', '16605798511', '17925404863', '4571375', '12593910521'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
   * 精选礼盒*/
    var pIds03 = ['4869471', '4528705', '7741104', '7953979', '4922289', '4489993', '3740686', '3017423', '5277070', '4490035', '917346', '7943037', '3740740', '5283082', '1734332', '7938129', '3260527', '7725382'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /*
  * 精选好茶*/
    var pIds04 = ['3806523', '698334', '5964698', '1729944', '4309994', '1624571', '3462538', '1645554', '1781126', '6893269', '5810203', '1823311','698316', '7634335', '2644288', '4139646'];
    $scope.product04 = [];
    _.each(pIds04, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product04.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })

   /* 精选水饮*/
    var pIds05 = ['4103763', '285480', '789775', '4983908', '5275534', '2293339', '3313643', '930747', '1044735', '1137881', '1044732', '923621', '3941519', '1088243', '952862', '848852', '848851', '848849', '1069325', '847394', '1044728'];
    $scope.product05 = [];
    _.each(pIds05, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product05.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })
   /* 酒水饮料*/
    var pIds06 = ['3459111', '3342934', '3915436', '2169072', '3042629', '6262070', '3017389', '2239275', '7571206'];
    $scope.product06 = [];
    _.each(pIds06, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product06.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })

});

module.exports = hotSale;

