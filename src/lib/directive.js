/*var WdatePicker = require('My97DatePicker/WdatePicker.js');*/
var wangEditor = require('../asset/wangeditor/wangEditor.js');
var angular = require('angular');
var $ = require('jquery');
var _ = require('underscore');
require('jquery.cookie');
require('serve/document.js');
var WebUploader = require('webuploader');
var global = require('global');
var dictionary = require('lib/dictionary');
var dateUtil = require('util/date.js');
var module = require('appModule');

module.directive('replace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A',
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});
/*module.directive('auth', ['$http', function ($http) {
    return {
        restrict: 'EA', // E = element（元素）, A = attribute（属性）, C
        // =
        // class, M = comment
        scope: {
            // @ reads the attribute value, = provides two-way
            // binding, &
            // works with functions
            // @ 读取属性值， = 提供双向绑定， & 以函数一起工作
            orgId: '=orgId',
            value: '=value'
        },
        template: require('../components/common/auth.html'),
        link: function ($scope) {
            $scope.$watch('orgId', function (orgId) {
                if (orgId !== undefined) {
                    $http.get(global.app.api + '/auth/' + orgId).then(function (data) {
                        $scope.auth = data;
                        $scope.value = data.certified && data.orgCertified && data.warn && data.bill;
                    });
                }
            });
        }
    };
}]);*/

/***************************************************************kalinaUploader**************************************************************/
    //多张图片上传；
module.directive('imageUpload', ['$http', function ($http) {
    return {
        require: '?ngModel',
        restrict: 'EA',
        scope: {
            // @ reads the attribute value, = provides two-way binding,
            // &
            // works with functions
            // @ 读取属性值， = 提供双向绑定， & 以函数一起工作
            num: "@"
        },
        template: '<div class="image-upload-box"><div class="image_upload" ng-repeat="image in images" ng-mouseenter="hover(image)" ng-mouseleave="hover(image)"><a ng-href="' + global.file.url + '/{{image.id}}.png" target="_blank"><img ng-src="' + global.file.url + '/{{image.id}}" /></a><i class="iconfont icon-delete" ng-click="del($index)" ng-show="image.hover"></i></div><div class="image_upload add" ng-hide="image_container"><div style="font-size:22px;font-weight:bold;margin-top:30px; color: #00a0ea">+</div><p style="font-weight: bold; color: #c0c0c0">请选择图片</p></div></div>',
        link: function ($scope, element, attrs, ngModel) {
            ngModel.$formatters.push(function (modelValue) {
                var images = new Array();
                if (!ngModel.$isEmpty(modelValue)) {
                    var values = modelValue.split(",");
                    for (var j = 0; j < values.length; j++) {
                        images.push({
                            'id': values[j]
                        });
                    }
                }
                return images;
            });
            /*ngModel.$parsers.push(function (viewValue) {
                var s = "";
                for (var j = 0; j < viewValue.length; j++) {
                    if (viewValue[j].id != null) {
                        if (j > 0) {
                            s += ",";
                        }
                        s += viewValue[j].id;
                    }
                }
                return s;
            });*/
            ngModel.$render = function () {
                $scope.images = ngModel.$viewValue;
            };

            //modelValue数组改变为字符串
            $scope.changeModel = function (images) {
                var value = "";
                for (var j = 0; j < images.length; j++) {
                    if (images[j].id != null) {
                        if (j > 0) {
                            value += ",";
                        }
                        value += images[j].id;
                    }
                }
                return value;
            };

            $scope.del = function (i) {
                $scope.images.splice(i, 1);
                ngModel.$setViewValue($scope.changeModel($scope.images));
            };
            $scope.hover = function (image) {
                image.hover = !image.hover;
            };

            var opts = angular.extend({}, $scope.$eval(attrs.opts));

            var placeholder = element[0].lastElementChild;
            placeholder.id = "image_upload_" + Math.floor(Math.random() * 10000);

            var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,
                // swf文件路径
                swf: global.static.url + 'asset/webuploader-0.1.5/Uploader.swf',
                // 文件接收服务端。
                server: opts.uploader || global.file.url,
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                // pick: '.add',
                pick: '#' + placeholder.id + ' .add',
                duplicate: true,
                // 只允许选择图片文件。
                accept: {
                    title: 'Image Files',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/gif,image/jpeg,image/bmp,image/png'
                },
                fileSingleSizeLimit: '2MB',
                fileNumLimit: $scope.num
            });

            // 当有文件添加进来的时候
            uploader.on('fileQueued', function (file) {
                file.image = {};
                $scope.$apply(function () {
                    $scope.images.push(file.image);
                });

                var thumbnailWidth = 100;
                var thumbnailHeight = 100;

                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        // console.log(error);
                        // file.image.thumbnail
                        // $img.replaceWith('<span>不能预览</span>');
                        return;
                    }

                    $scope.$apply(function () {
                        file.image.src = src;
                    });

                }, thumbnailWidth, thumbnailHeight);
            });
            uploader.on('uploadProgress', function (file, percentage) {
                $scope.$apply(function () {
                    file.image.percentage = percentage;
                });
            });
            uploader.on('uploadSuccess', function (file, response) {
                $scope.$apply(function () {
                    file.image.id = response.id;
                });
            });
            uploader.on('uploadFinished', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue($scope.changeModel($scope.images));
                });
            });
            uploader.on("error", function (type) {
                if (type == "F_EXCEED_SIZE") {
                    alert("图片大小不能超过2M");
                } else if (type == "F_TYPE_DENIED") {
                    alert("请上传JPG、PNG、GIF、BMP格式文件");
                } else if (type == "Q_EXCEED_NUM_LIMIT") {
                    alert("只能上传" + $scope.num + "张图片");
                }
                else {
                    alert("上传出错！请检查后重新上传！错误代码" + type);
                }
            });
        }
    };
}]);

//多文件上传;
module.directive('filesUpload', ['$http', 'documentService',function ($http, documentService) {
    return {
        require: '?ngModel',
        restrict: 'EA',
        scope: {
            // @ reads the attribute value, = provides two-way binding,
            // &
            // works with functions
            // @ 读取属性值， = 提供双向绑定， & 以函数一起工作
        },
        template: '<div class="file-Upload-box" style="width: 200px;">'
        + '<div class="file_upload_cont" ng-repeat="image in images" ng-mouseenter="hover(image)" ng-mouseleave="hover(image)">'
        + '<div class="cover">'
        + '<a ng-href="' + global.file.url + '/{{image.id}}"  class="file_names" target="_blank">{{image.name}}</a><i style="position: absolute; right: 0;" class="iconfont icon-delete" ng-click="del($index)" ng-show="image.hover"></i>'
        + '</div></div>'
        + '<div class="file_upload add" ng-hide="image_container"></div></div>',
        link: function ($scope, element, attrs, ngModel) {

            ngModel.$formatters.push(function (modelValue) {
                var images = new Array();
                if (!ngModel.$isEmpty(modelValue)) {
                    var values = modelValue.split(",");
                    for (var j = 0; j < values.length; j++) {
                        documentService.getList(values[j], function (data) {
                            if (data != null) {
                                _.each(data, function (dataImage) {
                                    images.push({
                                        'id': dataImage.id,
                                        'name': dataImage.name
                                    });
                                });
                            }
                        });
                    }
                }
                return images;
            });
            /*ngModel.$parsers.push(function (viewValue) {
                var s = "";
                for (var j = 0; j < viewValue.length; j++) {
                    if (viewValue[j].id != null) {
                        if (j > 0) {
                            s += ",";
                        }
                        s += viewValue[j].id;
                    }
                }
                return s;
            });*/

            $scope.changeModel = function (images) {
                var value = "";
                for (var j = 0; j < images.length; j++) {
                    if (images[j].id != null) {
                        if (j > 0) {
                            value += ",";
                        }
                        value += images[j].id;
                    }
                }
                return value;
            };
            ngModel.$render = function () {
                $scope.images = ngModel.$viewValue;
            };

            $scope.del = function (i) {
                $scope.images.splice(i, 1);
                ngModel.$setViewValue($scope.changeModel($scope.images));
            };
            $scope.hover = function (image) {
                image.hover = !image.hover;
            };

            var opts = angular.extend({}, $scope.$eval(attrs.opts));
            var type = opts.type || "Attach";

            var fileTypeDesc = global.fileTypeDescs[type];
            var fileTypeExt = global.fileTypeExts[type];
            var fileTypeMime = global.fileTypeMimes[type];
            var fileSizeLimit = global.fileSizeLimits[type];

            var placeholder = element[0].lastElementChild;
            placeholder.id = "file_upload" + Math.floor(Math.random() * 10000);

            var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,
                swf: global.static.url + '/asset/webuploader-0.1.5/Uploader.swf',
                // 文件接收服务端。
                server: opts.uploader || global.file.url,
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                // pick: '.add',
                pick: {
                    id: '#' + placeholder.id + ' .add',
                    innerHTML: opts.buttonText || '<i class="iconfont icon-upload2"></i>&nbsp;请选择文件'
                },
                duplicate: true,
                accept: {
                    title: fileTypeDesc,
                    extensions: fileTypeExt,
                    mimeTypes: fileTypeMime
                },
                fileSingleSizeLimit: fileSizeLimit
            });

            // 当有文件添加进来的时候
            uploader.on('uploadSuccess', function (file, response) {
                file.image = {};
                file.image.name = response.name;
                file.image.id = response.id;

                $scope.$apply(function () {
                    $scope.images.push(file.image);
                });
            });
            uploader.on('uploadFinished', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue($scope.changeModel($scope.images));
                });
            });
            uploader.on("error", function (type) {
                if (type == "Q_EXCEED_SIZE_LIMIT") {
                    alert("文件大小不能超过10M");
                } else if (type == 'Q_TYPE_DENIED') {
                    alert("请上传" + fileTypeExt + "格式文件");
                } else {
                    alert("上传出错！请检查后重新上传！错误代码" + type);
                }
            });
        }
    };
}]);

//单文件上传；
module.directive('fileUpload', ['$http', 'documentService', function ($http, documentService) {
    return {
        require: '?ngModel',
        restrict: 'EA',
        scope: {
            // @ reads the attribute value, = provides two-way binding,
            // &
            // works with functions
            // @ 读取属性值， = 提供双向绑定， & 以函数一起工作
            excel: '='
        },
        template: '<style>.progress{position:relative;height:2px;display:block;width:100%;background-color:#acece6;border-radius:2px;overflow:hidden}.progress .determinate{position:absolute;top:0;left:0;bottom:0;background-color:#26a69a;-webkit-transition:width .3s linear;transition:width .3s linear}</style><div class="file-Upload-box" style="width: 100px"><div class="file_upload_cont image_container" style="display: none" ng-mouseenter="hover(image)" ng-mouseleave="hover(image)"><div class="cover">'
        + '<a ng-href="' + global.file.url + '/{{image.id}}" class="file_names" target="_blank">{{image.name}}</a><i style="position: absolute; right: 0; z-index: 999" class="iconfont icon-delete" ng-click="del($index)" ng-show="image.hover"></i>'
        + '</div></div><div class="file_upload add image_button"></div></div>',
        link: function ($scope, element, attrs, ngModel) {

            var opts = angular.extend({}, $scope.$eval(attrs.opts)),
                type = opts.type || "Attach",
                fileTypeDesc = global.fileTypeDescs[type],
                fileTypeExt = global.fileTypeExts[type],
                fileTypeMime = global.fileTypeMimes[type],
                fileSizeLimit = global.fileSizeLimits[type],
                placeholder = element[0].lastElementChild;
            placeholder.id = "file_upload" + Math.floor(Math.random() * 10000);
            var $this = $('#' + placeholder.id);

            ngModel.$formatters.push(function (modelValue) {
                var image = {};
                if (!ngModel.$isEmpty(modelValue)) {
                    documentService.getList(modelValue, function (data) {
                        if (data != null) {
                            $this.find('.image_container').show();
                            $this.find('.image_button').hide();
                            image.id = data[0].id;
                            image.name = data[0].name;
                        }
                    });
                }
                return image;
            });
            ngModel.$render = function () {
                $scope.image = ngModel.$viewValue;
            };

            var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,
                // swf文件路径
                swf: global.static.url + 'asset/webuploader-0.1.5/Uploader.swf',
                // 文件接收服务端。
                server: opts.uploader || global.file.url,
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                // pick: '.add',
                pick: {
                    id: '#' + placeholder.id + ' .add',
                    innerHTML: '<i class="iconfont icon-upload2"></i>&nbsp;' + (opts.buttonText || '选择文件')
                },
                duplicate: true,
                accept: {
                    title: fileTypeDesc,
                    extensions: fileTypeExt,
                    mimeTypes: fileTypeMime
                },
                fileNumLimit: 1,
                fileSingleSizeLimit: fileSizeLimit
            });

            $scope.del = function (i) {
                $scope.image = null;
                ngModel.$setViewValue($scope.image);
                $this.find('.image_container').hide();
                $this.find('.image_button').show();
                uploader.trigger('fileDequeued');
            };
            $scope.hover = function (image) {
                if (image) {
                    if (image.hasOwnProperty('hover')) {
                        image.hover = !image.hover;
                    } else {
                        image.hover = true;
                    }
                }
            };
            uploader.on('beforeFileQueued', function (handler) {
                $this.find('.image_container').show();
                $this.find('.image_button').hide();
            });
            uploader.on('fileQueued', function (file) {
                $scope.image = {
                    "hover": false
                }
            });
            uploader.on('uploadProgress', function (file, percentage) {
                var $li = $('#' + placeholder.id),
                    $percent = $li.find('.progress .determinate');
                if (!$percent.length) {
                    $percent = $('<div class="progress-box" style="display: inline-block"><div class="progress"><div class="determinate" style="width: 10%;"></div></div><p class="state"></p></div>').appendTo($li);
                }

                $li.find('p.state').text('已上传' + percentage * 100 + '%');
                $percent.css('width', percentage * 100 + '%');
            });

            uploader.on('uploadSuccess', function (file, response) {
                $scope.$apply(function () {
                    $scope.image = {
                        'name': response.name,
                        'id': response.id
                    };
                    if ($scope.excel) {
                        ngModel.$setViewValue(response._raw);
                        $scope.image.name = file.name;
                    } else {
                        ngModel.$setViewValue($scope.image.id);
                    }
                });
            });
            uploader.on('uploadComplete', function (file) {
                $('.progress-box', '#' + placeholder.id).detach();
            });
            uploader.on("error", function (type) {
                if (type == "Q_EXCEED_SIZE_LIMIT") {
                    alert("文件大小不能超过10M");
                } else if (type == 'Q_TYPE_DENIED') {
                    alert("请上传" + fileTypeExt + "格式文件");
                } else if (type == "Q_EXCEED_NUM_LIMIT") {
                    alert("只能上传一个文件，请勿重复上传");
                } else {
                    alert("上传出错！请检查后重新上传！错误代码" + type);
                }
            });
        }
    };
}]);

module.directive('slider', function ($interval) {
    return {
        scope: {
            'slides': '=',
            'src': '@',
            'interval': '='
        },
        template: '<img ng-src="{{src}}" />',
        link: function ($scope, element, attr, ctrl) {
            var i = 0;
            var interval = $interval(function () {
                if (i >= $scope.slides.length) {
                    i = 0;
                }
                $scope.src = $scope.slides[i].image;
                i++;
            }, $scope.interval);

            $scope.$on("$destroy", function (event) {
                $interval.cancel(interval);
            });
        }
    };
});

module.directive('mobile', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            ctrl.$parsers.push(function (value) {
                if (value == null || value == "") {
                    ctrl.$setValidity('mobile', true);
                } else {
                    var mobile = /^1\d{10}$/;
                    ctrl.$setValidity('mobile', mobile.test(value));
                }
                return value;
            });
        }
    };
});

module.directive('email', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            ctrl.$parsers
                .push(function (value) {
                    if (value == null || value == "") {
                        ctrl.$setValidity('email', true);
                    } else {
                        var email = /^[a-zA-Z0-9.!$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                        ctrl.$setValidity('email', email.test(value));
                    }
                    return value;
                });
        }
    };
});

module.directive('username', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            ctrl.$parsers
                .push(function (value) {
                    if (value == null || value == "") {
                        ctrl.$setValidity('username', true);
                    } else {
                        var mobile = /^1\d{10}$/;
                        var email = /^[a-zA-Z0-9.!$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                        ctrl.$setValidity('username', (mobile.test(value)) || email.test(value));
                    }
                    return value;
                });
        }
    };
});

module.directive('money', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            ctrl.$parsers.push(function (value) {
                if (value == null || value == "") {
                    ctrl.$setValidity('money', true);
                } else {
                    var money = /(^[1-9]\d*(\.\d{1,2})?$)|(^[0]{1}(\.\d{1,2})?$)/;
                    ctrl.$setValidity('money', money.test(value));
                }
                return value;
            });
        }
    };
});

module.directive('number', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            ctrl.$parsers.push(function (value) {
                if (value == null || value == "") {
                    ctrl.$setValidity('number', true);
                } else {
                    var number = /^\d+$/;
                    ctrl.$setValidity('number', number.test(value));
                }
                return value;
            });
        }
    };
});

module.directive('idCard', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            ctrl.$parsers.push(function (value) {
                if (value == null || value == "") {
                    ctrl.$setValidity('idCard', true);
                } else {
                    var idTest18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                    var idTest15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
                    ctrl.$setValidity('idCard', idTest18.test(value) || idTest15.test(value));
                }
                return value;
            });
        }
    };
});

module.directive('countdown', [
    '$log',
    function ($log) {
        return {
            restrict: 'EA', // E = element（元素）, A =
            // attribute（属性）, C =
            // class, M = comment
            scope: {
                // @ reads the attribute value, = provides
                // two-way binding, &
                // works with functions
                // @ 读取属性值， = 提供双向绑定， & 以函数一起工作
                endTime: '=',
                seconds: '=',
                nowTime: '=',
                interval: '@',
                finishCallback: '&'
            },
            link: function ($scope, element, attrs, ngModel) {
                function updateTime() {
                    var t = (time - new Date().getTime() - ($scope.nowTime | 0)) / 1000 | 0;
                    if (t <= 0) {
                        clearInterval(intervalId);
                        element.css("display", "");
                        element.html('<em>已结束</em>');
                        $scope.finishCallback();
                        $scope.$apply();
                    } else {
                        var d = t / (24 * 60 * 60) | 0;
                        t = t % (24 * 60 * 60);
                        var h = t / (60 * 60) | 0;
                        if (h < 10) {
                            h = '0' + h;
                        }
                        t = t % (60 * 60);
                        var m = t / 60 | 0;
                        if (m < 10) {
                            m = '0' + m;
                        }
                        t = t % 60 | 0;
                        var s = t;
                        if (s < 10) {
                            s = '0' + s;
                        }
                        element.html(format.replace('${d}', d).replace('${h}', h).replace('${m}', m)
                            .replace('${s}', s));
                        element.css("display", "");
                    }
                }

                var format = element.html();
                var time;
                var intervalId;

                element.css("display", "none");
                element.bind("$destroy", function () {
                    clearInterval(intervalId);
                });

                $scope.$watch('endTime', function (endTime) {
                    if (endTime != null) {
                        time = endTime;
                        intervalId = setInterval(updateTime, parseInt($scope.interval | 1000));
                    }
                });

                $scope.$watch('seconds', function (seconds) {
                    if (seconds != null && seconds > 0) {
                        time = new Date().getTime() + seconds * 1000;
                        intervalId = setInterval(updateTime, parseInt($scope.interval | 1000));
                    }
                });
            }
        };
    }]);

module.directive('loginDialog', ['$sce', '$cookies', 'httpAuthService', '$interval', function ($sce, $cookies, httpAuthService, $interval) {
    return {
        restrict: 'A',
        template: '<div ng-if="visible"><article class="fly-bg"><div class="relist fly-bg-bg"><p class="delete-tit-close" ng-click="close()"></p><iframe ng-src="{{getLoginUrl()}}"></iframe></div></article></div>',
        link: function (scope) {
            scope.visible = false;
            scope.$on('event:auth-loginRequired', function (rejection, response) {
                if (response.data == null || response.data == '') {
                    scope.intervalCookies = $interval(function () {
                        $cookies.get('access_token');
                    }, 1000);
                    scope.visible = true;
                } else {
                    $.cookie('access_token', response.data, {
                        'domain': global.domain,
                        'path': '/'
                    });
                    httpAuthService.loginConfirmed();
                }
            });
            scope.$on('event:auth-loginConfirmed', function () {
                $interval.cancel(scope.intervalCookies);
                scope.visible = false;
            });
            scope.$on('event:auth-loginCancelled', function () {
                $interval.cancel(scope.intervalCookies);
                scope.visible = false;
            });

            scope.getLoginUrl = function () {
                var url = global.app.url + '/login_inner.html?dialog=1';
                return $sce.trustAsResourceUrl(url);
            };

            scope.close = function () {
                httpAuthService.loginCancelled();
            };
            scope.$watch(function () {
                return $cookies.get('access_token');
            }, function (newValue, oldValue) {
                httpAuthService.loginConfirmed();
            });
        }
    };
}]);

module.directive('loginmallDialog', ['$sce', '$cookies', 'httpAuthService',
    function ($sce, $cookies, httpAuthService) {
        return {
            restrict: 'A',
            link: function (scope) {
                scope.$on('event:auth-loginRequired', function (rejection, response) {
                    if (response.data == null || response.data == '') {
                        /*window.location = global.mall.url + '/login.html?url=' + encodeURIComponent(window.location);*/
                    } else {
                        $.cookie('access_token', response.data, {
                            'domain': global.domain,
                            'path': '/'
                        });
                        httpAuthService.loginConfirmed();
                    }
                });
                scope.$on('event:auth-loginConfirmed', function () {
                    scope.visible = false;
                });
                scope.$on('event:auth-loginCancelled', function () {
                    scope.visible = false;
                });

                scope.getLoginUrl = function () {
                    var url = global.mall.url + '/login.html?url=' + encodeURIComponent(window.location);
                    return $sce.trustAsResourceUrl(url);
                };

                scope.close = function () {
                    httpAuthService.loginCancelled();
                };

                scope.$watch(function () {
                    return $cookies.get('access_token');
                }, function (newValue, oldValue) {
                    httpAuthService.loginConfirmed();
                });
            }
        };
    }]);

module.directive('repeatFinish', ['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                var emitMessage = attr['repeatFinish'] || 'repeatFinish';
                $timeout(function () {
                    scope.$eval(emitMessage);
                });
            }
        }
    }
}]);

module.directive('editor', ['$http', function ($http) {
    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function ($scope, element, attrs, ngModel) {
            // 创建编辑器，查看参数http://www.wangeditor.com
            var editor = new wangEditor(element[0]);
            var xhrUrl = 'https://file.yuncaitong.cn';
            //debug模式下，有 JS 错误会以throw Error方式提示出来
            editor.customConfig.debug = true;
            editor.customConfig = {
                uploadImgServer: xhrUrl,
                uploadImgMaxSize: 5 * 1024 * 1024,
                uploadFileName: 'file',
                uploadImgHooks: {
                    before: function (xhr, editor, files) {
                    },
                    success: function (xhr, editor, result) {
                    },
                    fail: function (xhr, editor, result) {
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                        alert('图片插入错误，请检查图片格式是否正确');
                    },
                    error: function (xhr, editor) {
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                        alert('图片上传错误，请稍后重试');
                    },
                    timeout: function (xhr, editor) {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                        alert('图片上传超时，请重新上传');
                    },
                    customInsert: function (insertImg, result, editor) {
                        var url = xhrUrl + '/' + result.id;
                        insertImg(url);
                    }
                }
            };

            editor.customConfig.onchange = function () {
                $scope.$apply(function () {
                    var html = editor.txt.html();
                    ngModel.$setViewValue(html);
                });
            };
            editor.create();
            ngModel.$render = function () {
                editor.txt.html(ngModel.$viewValue);
            };

        }
    }
}]);

module.directive('compile', ['$compile', '$timeout', function ($compile, $timeout) {
    return function (scope, element, attrs) {
        scope.$watch(function (scope) {
                return scope.$eval(attrs.compile);
            },
            function (value) {
                if (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                }
            }
        );
        scope.$watch(function () {
                return element[0].firstChild;
            },
            function (value) {
                if (!_.isEmpty(value)) {
                    var emitMessage = attrs['loadFun'] || 'loadFun';
                    $timeout(function () {
                        scope.$eval(emitMessage);
                    });
                }
            }
        );
    };
}]);

module.directive('loginBind', ['$http', function ($http) {
    return {
        restrict: 'EA',
        scope: {
            token: '@accessToken',
            showBind: '&',
            closeBind: '&'
        },
        template: require('../components/loginBind/bind.html'),
        link: function ($scope) {
           //32位随机uuid
            function guid() {
                return 'xxxxxxxxxxxxxx4xxxxyxxxyxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            }
            $scope.uuid = guid();
            //二维码
            $scope.codeImg = global.mall.api + '/auths/wxQrCode?uuid='+$scope.uuid + '&type=BANDING' + '&access_token=' + $scope.token;

            //有没有扫码, 有没有过期
            $scope.Ifoverdue = function () {
                 $http.get(global.mall.api + '/auths/wxResult?uuid='+$scope.uuid).then(function (res) {
                     console.log(res);
                     if(res.type == 'NO_ACTION'){
                         //没有扫
                         console.log('没有扫');
                     }
                     else if(res.type == 'ACTION'){
                         //已被扫码
                         $scope.alreadyScan = true;
                     }else if(res.type == 'TIMEOUT'){
                         //二维码过期
                         $scope.msg = '二维码已失效';
                         $scope.alreadyScan = false;
                         $scope.codeOut = true;
                         clearInterval(timerInterval);

                     }else if(res.type == 'OK'){
                         //绑定操作成
                         $scope.alreadyScan = false;
                         $scope.bindSucces = true;
                         clearInterval(timerInterval);
                         setTimeout($scope.closeBind, 1000);
                     }else {
                         $scope.msg = res.msg;
                         $scope.alreadyScan = false;
                         $scope.codeOut = true;
                         clearInterval(timerInterval);
                         console.log('出现意料之外的错误');
                     }
                 });
             };
            var timerInterval = setInterval(function () {
                $scope.Ifoverdue();
            }, 1500);

            $scope.closeBindOwn = function () {
                clearInterval(timerInterval);
                $scope.closeBind();
            };

            $scope.refresh = function () {
                $scope.uuid = guid();
                //二维码
                $scope.codeImg = global.mall.api + '/auths/wxQrCode?uuid='+$scope.uuid + '&type=BANDING' + '&access_token=' + $scope.token;
                $scope.codeOut = false;
                timerInterval = setInterval(function () {
                    $scope.Ifoverdue();
                }, 1500);
            }
        }
    }
}]);

module.directive('toLogin', ['$http', function ($http) {
    return{
        restrict: 'EA',
        scope: {
            closeLogin: '&'
        },
        template: require('../components/loginBind/login.html'),
        link: function ($scope) {
            //32位随机uuid
            function guid() {
                return 'xxxxxxxxxxxxxx4xxxxyxxxyxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            }
            $scope.uuid = guid();
            //二维码
             $scope.codeImg =  global.mall.api + '/auths/wxQrCode?uuid='+$scope.uuid + '&type=LOGIN';

            //有没有扫码, 有没有过期
            $scope.Ifoverdue = function () {
                $http.get(global.mall.api + '/auths/wxResult?uuid='+$scope.uuid).then(function (res) {
                    console.log(res);
                    if(res.type == 'NO_ACTION'){
                        //没有扫
                        console.log('没有扫');
                    }
                    else if(res.type == 'ACTION'){
                        //已被扫码
                        $scope.alreadyScan = true;
                    }else if(res.type == 'TIMEOUT'){
                        //二维码过期
                        $scope.msg = '二维码已失效';
                        $scope.alreadyScan = false;
                        $scope.codeOut = true;
                        clearInterval(timerInterval);
                    }else if(res.type == 'OK'){
                        //绑定操作成
                        $.cookie('access_token', res.token, {
                            'domain': global.domain,
                            'path': '/'
                        });
                        $scope.alreadyScan = false;
                        $scope.loginSucces = true;
                        clearInterval(timerInterval);
                        setTimeout($scope.closeLogin, 1000);
                    }else {
                        $scope.msg = res.msg;
                        $scope.alreadyScan = false;
                        $scope.codeOut = true;
                        clearInterval(timerInterval);
                        console.log('出现意料之外的错误');
                    }
                });
            };
            var timerInterval = setInterval(function () {
                $scope.Ifoverdue();
            }, 1500);

            $scope.closeLoginOwn = function () {
                clearInterval(timerInterval);
                $scope.closeLogin();
            };

            $scope.refresh = function () {
                $scope.uuid = guid();
                //二维码
                $scope.codeImg =  global.mall.api + '/auths/wxQrCode?uuid='+$scope.uuid + '&type=LOGIN';
                $scope.codeOut = false;
                timerInterval = setInterval(function () {
                    $scope.Ifoverdue();
                }, 1500);
            }
        }
    }
}]);

module.exports = module;