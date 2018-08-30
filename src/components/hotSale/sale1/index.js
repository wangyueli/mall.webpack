var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlOne', function ($scope, $stateParams, productService) {


    $scope.products = [];

    /************专区01************/
    if($stateParams.id == 1){
        /*
         * 寝室*/
        var pIds11 = ['6888588', '6072622', '3948470', '4932622', '6004883', '1295110', '2185974', '2297839', '4983458', '2796134', '385620', '6138191'];
        $scope.product11 = [];
        _.each(pIds11, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product11.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds11.length-1){
                    $scope.products.push({
                        name: '寝室',
                        data: $scope.product11
                    })
                }
            })
        });

        /*
         * 操场*/
        var pIds12 = ['2323438', '4943315','5185333','1436707', '3233275', '5639808', '7302439', '643094', '6522861', '1759465', '776715', '4413265', '348143'];
        $scope.product12 = [];
        _.each(pIds12, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product12.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds12.length-1){
                    $scope.products.push({
                        name: '操场',
                        data: $scope.product12
                    })
                }
            })
        });

        /*
         * 教室*/
        var pIds13 = ['1201473', '3766807','1184404','2238360', '4075816', '6576348', '7964229', '971876', '1173636', '6083573', '1299472', '4682026', '241191'];
        $scope.product13 = [];
        _.each(pIds13, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product13.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds13.length-1){
                    $scope.products.push({
                        name: '教室',
                        data: $scope.product13
                    })
                }
            })
        });

        /*
         * 出游*/
        var pIds14 = ['2554181','3965552'];
        $scope.product14 = [];
        _.each(pIds14, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product14.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds14.length-1){
                    $scope.products.push({
                        name: '出游',
                        data: $scope.product14
                    })
                }
            })
        })
    }

    /************专区01************/
    if($stateParams.id == 2){
        /*
         * 新品必备*/
        var pIds21 = ['7296649', '7297505', '3443540', '1058537', '4294806', '7265675', '6410755'];
        $scope.product21 = [];
        _.each(pIds21, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product21.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds21.length-1){
                    $scope.products.push({
                        name: '新品必备',
                        data: $scope.product21
                    })
                }
            })
        });

        /*
         * 学习休闲*/
        var pIds22 = ['6372983', '6864653', '7295395', '7093746', '6410795', '6410731', '5379160', '6815969'];
        $scope.product22 = [];
        _.each(pIds22, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product22.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds22.length-1){
                    $scope.products.push({
                        name: '学习休闲',
                        data: $scope.product22
                    })
                }
            })
        });

        /*
         * 户外运动*/
        var pIds23 = ['7147529', '4325170', '7534083', '4577137', '703431', '7703417', '6509943'];
        $scope.product23 = [];
        _.each(pIds23, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product23.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds23.length-1){
                    $scope.products.push({
                        name: '户外运动',
                        data: $scope.product23
                    })
                }
            })
        })


        /*
         * 高清大屏*/
        var pIds24 = ['5056175', '5278192', '2175277', '4296978', '5251868', '3597936'];
        $scope.product24 = [];
        _.each(pIds24, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product24.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds24.length-1){
                    $scope.products.push({
                        name: '高清大屏',
                        data: $scope.product24
                    })
                }
            })
        })


    }

/*    /!*
    * 寝室*!/
    var pIds01 = ['6888588', '6072622', '3948470', '4932622', '6004883', '1295110', '2185974', '2297839', '4983458', '2796134', '385620', '6138191'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /!*
    * 操场*!/
    var pIds02 = ['2323438', '4943315','5185333','1436707', '3233275', '5639808', '7302439', '643094', '6522861', '1759465', '776715', '4413265', '348143'];
    $scope.product02 = [];
    _.each(pIds02, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product02.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /!*
   * 教室*!/
    var pIds03 = ['1201473', '3766807','1184404','2238360', '4075816', '6576348', '7964229', '971876', '1173636', '6083573', '1299472', '4682026', '241191'];
    $scope.product03 = [];
    _.each(pIds03, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product03.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })


    /!*
  * 出游*!/
    var pIds04 = ['2554181','3965552'];
    $scope.product04 = [];
    _.each(pIds04, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product04.push(data);
            data.pic = data.pic.split(',')[0];
            console.log(data);
        })
    })*/


});

module.exports = hotSale;

