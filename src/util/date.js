module.exports = {
    //对Date的扩展，将 Date 转化为指定格式的String
    //月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    //年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    //例子：
    //(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    //(new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    format: function (d, fmt) {// author: meizz
        var o = {
            "M+": d.getMonth() + 1, // 月份
            "d+": d.getDate(), // 日
            "h+": d.getHours(), // 小时
            "m+": d.getMinutes(), // 分
            "s+": d.getSeconds(), // 秒
            "q+": Math.floor((d.getMonth() + 3) / 3), // 季度
            "S": d.getMilliseconds()
            // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    /**
     * 将日期格式的字符串转换称 js的Date
     */
    parseDate: function (s, ignoreTimezone) {// ignoreTimezone defaults to true
        if (typeof s == 'object') {// already a Date object
            return s;
        }
        if (typeof s == 'number') {// a UNIX timestamp
            return new Date(s * 1000);
        }
        if (typeof s == 'string') {
            if (s.match(/^\d+$/)) {// a UNIX timestamp
                return new Date(parseInt(s, 10) * 1000);
            }
            if (ignoreTimezone === undefined) {
                ignoreTimezone = true;
            }
            return parseISO8601(s, ignoreTimezone) || ( s ? new Date(s) : null);
        }

        return null;
    },

    parseISO8601: function (s, ignoreTimezone) {// ignoreTimezone defaults to false
        // derived from http://delete.me.uk/2005/03/iso8601.html
        var m = s.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?$/);
        if (!m) {
            return null;
        }
        var date = new Date(m[1], 0, 1);
        if (ignoreTimezone || !m[14]) {
            var check = new Date(m[1], 0, 1, 9, 0);
            if (m[3]) {
                date.setMonth(m[3] - 1);
                check.setMonth(m[3] - 1);
            }
            if (m[5]) {
                date.setDate(m[5]);
                check.setDate(m[5]);
            }
            this.fixDate(date, check);
            if (m[7]) {
                date.setHours(m[7]);
            }
            if (m[8]) {
                date.setMinutes(m[8]);
            }
            if (m[10]) {
                date.setSeconds(m[10]);
            }
            if (m[12]) {
                date.setMilliseconds(Number("0." + m[12]) * 1000);
            }
            this.fixDate(date, check);
        } else {
            date.setUTCFullYear(m[1], m[3] ? m[3] - 1 : 0, m[5] || 1);
            date.setUTCHours(m[7] || 0, m[8] || 0, m[10] || 0, m[12] ? Number("0." + m[12]) * 1000 : 0);
            var offset = Number(m[16]) * 60 + Number(m[17]);
            offset *= m[15] == '-' ? 1 : -1;
            date = new Date(+date + (offset * 60 * 1000));
        }
        return date;
    },
    fixDate: function (d, check) {// force d to be on check's YMD, for daylight savings purposes
        if (+d) {// prevent infinite looping on invalid dates
            while (d.getDate() != check.getDate()) {
                d.setTime(+d + (d < check ? 1 : -1) * HOUR_MS);
            }
        }
    }
};
