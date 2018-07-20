var app = require('appModule');
var jquery = require('jquery');
var login = app.controller('loginCtrl', function ($scope, $rootScope, $interval, $http) {
    $http.get('https://zct.speedit.cn/sfw/e?page=zct.yct.loginqrcode&window_=json').then(function(data){
        $scope.qrCode = 'https://zct.speedit.cn/sfw/rm/qrcodecreate?content=' + data.url;
        $scope.qrSeq = data.seq;

        $scope.qrcodeInterval = $interval(function () {
            $http.get('https://zct.speedit.cn/sfw/e?page=zct.yct.loginstate&seq='+ $scope.qrSeq +'&window_=json').then(function(data){
                if(data.state == 2){
                    jquery.cookie('access_token', data.accessToken, {
                        'domain': global.domain,
                        'path': '/'
                    });
                    window.location = '#'
                }
            })
        }, 2000);
    }, function (error) {
        alert('请求错误，请刷新页面重试!')
    });

    $scope.$on('$destroy', function () {
        $interval.cancel($scope.qrcodeInterval);
    });
    $rootScope.Tabtitle = $scope.title + $rootScope.titleMall;
});
module.exports = login;
