var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlTwelve', function ($scope, productService) {

    /*
    * 专业投影*/
    var pIds01 = ['3278367', '3927706', '4415695', '5252132', '5252134', '3927762', '4415683', '4415697'];
    $scope.product01 = [];
    _.each(pIds01, function (pId) {
        productService.get('JD', pId, function (data) {
            $scope.product01.push(data);
            data.pic = data.pic.split(',')[0];
            // console.log(data);
        })
    })


});

module.exports = hotSale;

