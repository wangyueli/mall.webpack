var _ = require('underscore');
var message = {
    message: function (s, f) {
        alert(s);
        if (f) {
            f();
        }
    },
    confirm: function (s, yf, nf) {
        var wc = window.confirm;
        if (wc(s)) {
            if (yf) {
                yf();
            }
        } else {
            if (nf) {
                nf();
            }
        }
    }
};
module.exports = message;