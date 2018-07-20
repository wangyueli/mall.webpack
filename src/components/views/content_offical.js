/**
 * Created by wangyueli on 2018/5/2.
 */

var jquery = require('jquery');
var _ = require('underscore');
var app = require('appModule');

var contentMall = app.controller('contentMall', function ($scope, $stateParams, $http, $cookies, $rootScope) {
    /**
     * www 顶部搜索*/
    $('.select-wpr').on('mouseenter', function(){
        /* $('.select-wpr-list').css('display', 'block');*/
        $scope. chaDown=true;
    });
    $('.select-wpr').on('mouseleave', function(){
        $('.select-wpr-list').css('display', 'none');
    });
    $('.select-wpr-list .item').on('click', function(e){
        $('.select-wpr-list').css('display', 'none');
    });

    $scope.keySearchMall = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.searchMall();
        }
    };
    $scope.searchMall = function () {
        if ($scope.keywordMall != null && $scope.keywordMall != '') {
            window.location = global.www.url + '/publish/' + $scope.searchType + '.shtml?keyword='
                + encodeURIComponent($scope.keywordMall);
        }
    };

    $rootScope.Tabtitle = '云采通-采购商城';

    /**
     * 客服电话动画*/
    jquery('.menu-right > .item').hover(function () {
        jquery('.has-drop',this).addClass('arrow-v-tran arrow-v');
        jquery('.dorpmenu',this).stop().fadeIn(200);
    }, function () {
        jquery('.has-drop',this).removeClass('arrow-v');
        jquery('.dorpmenu',this).fadeOut('fast');
    });
    /*返回顶部*/
    jquery("#backTop").on('click',function(){
        jquery('body,html').animate({scrollTop:0},500);
    });

});

module.exports = contentMall;



