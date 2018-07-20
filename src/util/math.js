module.exports = {
    //加法函数，用来得到精确的加法结果
    //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
    //调用：accAdd(arg1,arg2)
    //返回值：arg1加上arg2的精确结果
    accAdd: function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },

    //加法函数，用来得到精确的加法结果
    //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
    //调用：accAdd(arg1,arg2)
    //返回值：arg1加上arg2的精确结果
    accSub: function (arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        //last modify by deeka
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },

    //除法函数，用来得到精确的除法结果
    //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
    //调用：accDiv(arg1,arg2)
    //返回值：arg1除以arg2的精确结果
    accDiv: function (arg1, arg2) {
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        } catch (e) {
        }
        /*with (Math) {
         r1 = Number(arg1.toString().replace(".", ""));
         r2 = Number(arg2.toString().replace(".", ""));
         return (r1 / r2) * pow(10, t2 - t1);
         }*/
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    },

    //乘法函数，用来得到精确的乘法结果
    //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
    //调用：accMul(arg1,arg2)
    //返回值：arg1乘以arg2的精确结果
    accMul: function (arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },

    //自动转换数字金额为大小写中文字符,返回大小写中文字符串，最大处理到999兆
    numToCny: function (money) {
        var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
        // 汉字的数字
        var cnIntRadice = new Array("", "拾", "佰", "仟");
        // 基本单位
        var cnIntUnits = new Array("", "万", "亿", "兆");
        // 对应整数部分扩展单位
        var cnDecUnits = new Array("角", "分", "毫", "厘");
        // 对应小数部分单位
        var cnInteger = "整";
        // 整数金额时后面跟的字符
        var cnIntLast = "元";
        // 整型完以后的单位
        var maxNum = Number.MAX_VALUE;
        // 最大处理的数字

        var IntegerNum;
        // 金额整数部分
        var DecimalNum;
        // 金额小数部分
        var cny = "";
        // 输出的中文金额字符串
        var parts;
        // 分离金额后用的数组，预定义

        if (!money) {
            return "";
        }

        money = parseFloat(money);

        if (money >= maxNum) {
            // console.log('超出最大处理数字');
            return "";
        }

        if (money == 0) {
            cny = cnNums[0] + cnIntLast + cnInteger;
            return cny;
        }

        money = money.toString();
        // 转换为字符串

        if (money.indexOf(".") == -1) {
            IntegerNum = money;
            DecimalNum = '';
        } else {
            parts = money.split(".");
            IntegerNum = parts[0];
            DecimalNum = parts[1].substr(0, 4);
        }

        if (parseInt(IntegerNum, 10) > 0) {// 获取整型部分转换
            var zeroCount = 0;
            var IntLen = IntegerNum.length;
            for (var i = 0; i < IntLen; i++) {
                n = IntegerNum.substr(i, 1);
                p = IntLen - i - 1;
                q = p / 4;
                m = p % 4;
                if (n == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        cny += cnNums[0];
                    }
                    zeroCount = 0;
                    // 归零
                    cny += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    cny += cnIntUnits[q];
                }
            }
            cny += cnIntLast;
            // 整型部分处理完毕
        }
        if (DecimalNum != '') {// 小数部分
            var decLen = DecimalNum.length;
            for (var i = 0; i < decLen; i++) {
                n = DecimalNum.substr(i, 1);
                if (n != '0') {
                    cny += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (cny == '') {
            cny += cnNums[0] + cnIntLast + cnInteger;
        } else if (DecimalNum == '') {
            cny += cnInteger;
        }
        return cny;
    }
};

