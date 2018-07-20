var global = require('global');
var _ = require('underscore');
var url = {
    url: function (path, params, prefix) {
        if (!path) {
            return path;
        }
        path += (path.indexOf("?") == -1) ? "?" : "&";
        _.map(params, function (k, v) {
            if (k != null && v != null) {
                if (_.isArray(k)) {
                    _.map(k, function (num) {
                        path += "&" + v + "=" + encodeURIComponent(num);
                    })
                } else {
                    path += "&" + v + "=" + encodeURIComponent(k);
                }
            }
        });
        if (!prefix) {
            prefix = global.api.url;
        }
        return prefix + path;
    }
};

module.exports = url;