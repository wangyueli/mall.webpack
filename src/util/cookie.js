var global = require('global');
var jquery = require('jquery');
require('jquery.cookie');

var cookie = {
    set: function (k, v, expires) {
        jquery.cookie(k, v, {
            'expires': expires,
            'domain': global.domain,
            'path': '/'
        });
    },
    get: function (k) {
        return jquery.cookie(k);
    },
    del: function (k) {
        jquery.cookie(k, null, {
            expires: -1,
            domain: global.domain,
            path: '/'
        });
    }
};
module.exports = cookie;