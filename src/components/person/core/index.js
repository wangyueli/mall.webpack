/**
 * Created by wangyueli on 2018/7/30.
 */
var app = require('appModule');
require('serve/org.js');

var evaluate = app.controller('personCoreCtrl', function ($scope, orgService) {

    $scope.weiUsers();

    /**
     * 解除绑定*/
    $scope.delBindUser = function (id) {
        orgService.delBindUser(id, function () {
            swal({
                text: '解除绑定成功！',
                icon: 'success',
                buttons: {
                    confirm: {text: '确定'}
                }
            }).then(function (isConfirm) {
                if(isConfirm == true){
                    $scope.weiUsers();
                }
            })
        }, function (err) {
            swal({
                text: '解除绑定失败! 失败原因'+err,
                icon: 'error',
                buttons:{confirm: {text: '确定'}}
            });
        })
    }
});
module.exports = evaluate;
