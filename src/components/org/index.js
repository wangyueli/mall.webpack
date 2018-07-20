
var app = require('appModule');
var _ = require('underscore');
var global = require('global');

require('serve/org.js');

var org = app.controller('orgCtrl', function ($scope, $cookies, orgService) {
    $scope.keywordTemp = null;
    $scope.page = 1;
    $scope.rows = 10;
    $scope.categories = [];
    $scope.orgList = [];

    /**获取行业**/
    orgService.getCt($cookies.get('orgId'), function (categoryList) {
        $scope.idParent = categoryList;
    });


    /**行业选择全(不)选**/
    $scope.choice = function(category){
        var indx = $scope.categories.indexOf(category);
        if(indx == -1){
            $scope.categories.push(category);

        }else {
            $scope.categories.splice(indx, 1);
        }
        $scope.getList();
    };

    $scope.empty = function(){
        $scope.categories = [];
        $scope.keywordTemp = null;
        $scope.page = 1;
        $scope.getList();
    };

    $scope.getList = function(page){
        $scope.page = page ? page : 1;
        $scope.orgIconLoader = true;
        orgService.getMorgList($cookies.get('orgId'), $scope.page - 1, $scope.rows, $scope.categories, $scope.keywordTemp, function(orgList){
            if(_.isEmpty(orgList.stores)){
                $scope.orgMore = true;
                $scope.orgList = [];
            }else {
                if(!page){
                    $scope.orgList = orgList.stores;
                }else {
                    $scope.orgList = $scope.orgList.concat(orgList.stores);
                }
                orgList.stores.length < $scope.rows ? $scope.orgMore = true : $scope.orgMore = false;
            }

            $scope.orgIconLoader = false;

            if($scope.orgList.length == 0){
                $scope.ifList = true;
            }
        })
    };
    $scope.getList();

    //搜索
    $scope.search = function () {
        $scope.getList();
    };

    $scope.keySearch = function (e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
            $scope.getList();
        }
    };
});
module.exports = org;




