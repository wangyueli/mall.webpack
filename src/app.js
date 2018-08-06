/**
 * Created by wangyueli on 2018/7/10.
 */

/**
 * webpack入口文件
 * 设置window全局对象
 */
window.WEB_VERSION = '201711170000';
/*window.jQuery = window.$ = require('jquery');*/
require('./css/page/master.scss');
require('./lib/router');
require('./lib/filter');
require('./lib/directive');
require('./app.controller.js');