var _ = require('underscore');
var message = require('./message.js');
var form = {
    validate: function (form) {
        var i = 0;
        _.each(form.$error, function (v, k) {
            _.each(v, function (field) {
                if (field.$setDirty == null) {
                    field.$setViewValue(field.$viewValue);
                } else {
                    field.$setDirty();
                }
                if (i == 0) {
                    var element = document.getElementsByName(field.$name)[0];
                    if (element != null) {
                        element.focus();
                    }
                }
                i++;
            });
        });
        if (form.$valid) {
            return true;
        } else {
            // message.message('请检查表单必填项，以及数据的正确性');
            return false;
        }
    }
};
module.exports = form;