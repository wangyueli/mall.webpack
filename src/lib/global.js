var global = {
    domain: 'yct.com',
    www: {
        url: 'http://www.yct.com/',
        api: 'https://www.yuncaitong.cn/api'
    },
    app: {
        url: 'http://app.yct.com/',
        /*api: 'http://192.168.1.147:8100/api'*/
        api: 'http://192.168.1.18:8080/yct.app.api'
    },
    appSy: {
        url: 'http://192.168.1.105:88/yct.app.api'
    },
    sell: {
        url: 'http://sell.yct.com/',
        /*api: 'http://192.168.1.147:8400/api'*/
        api: 'http://192.168.1.18:8080/yct.sell.api'
    },
    mallSell: {
        url: 'http://sell.mall.yct.com/',
        api: 'http://mallapi.yct.com:8084/yct.mall.sell.api'
    },
    sellSy:{
        api: 'http://192.168.1.105:88/yct.sell.api'
    },
    shop: {
        url: 'http://shop.yct.com/',
        api: 'http://192.168.1.147:8300/api'
    },
    survey:{
        api: 'http://mallapi.yct.com:8084/yct.survey.api'
    },
    /*file: {
     url: 'http://192.168.1.147:9800'
     },*/
    file: {
        url: 'https://file.yuncaitong.cn'
    },
    help: {
        url: 'http://192.168.1.147:8800'
    },
    api: {
        url: 'http://192.168.1.147:8900'
    },
    mall: {
        url: 'http://mall.yct.com/',
        api: 'http://mallapi.yct.com:8084/yct.mall.api'
    },
    mallJd: {
        url: 'http://jd.mall.yct.com/',
        api: 'http://mallapi.yct.com:8081/yct.mall.jd.api'
    },
    mallCm: {
        url: 'http://cm.mall.yct.com/',
        api: 'http://192.168.1.147:8520/api'
    },
    mallEs: {
        url: 'http://es.mall.yct.com/',
        api: 'http://192.168.1.147:8510/api'
    },
    weixin: {
        url: 'http://weixin.yct.cn',
        api: 'http://weixin.yct.cn/api'
    },
    pay: {
        url: 'http://pay.yuncaitong.cn/'
    },
    cms: {
        api: 'https://cms.yuncaitong.cn/sfw/'
    },
    "static": {
        url: 'http://static.yct.com'
    },
    fileTypeMimes: {
        "Attach": "*",
        "Image" : "image/gif,image/jpeg,image/bmp,image/png",
        "Pdf"   : "application/pdf",
        "Excel" : "application/vnd.ms-excel",
        "ImgPdf": "image/gif,image/jpeg,image/bmp,image/png,application/pdf"
    },
    fileTypeExts: {
        "Image" : "gif,jpg,jpeg,bmp,png",
        "Attach": "*",
        "Pdf"   : "pdf",
        "Excel" : "xla,xlc,xls,xlt,xlw,xlsx",
        "ImgPdf": "gif,jpg,jpeg,bmp,png,pdf"
    },
    fileTypeDescs: {
        "Image" : "Image Files",
        "Attach": "Attach Files",
        "Pdf"   : "Pdf Files",
        "Excel" : "Excel Files",
        "ImgPdf": "ImgPdf Files"
    },
    fileSizeLimits: {
        "Image" : "2MB",
        "Attach": "10MB",
        "Pdf"   : "10MB",
        "Excel" : "10MB",
        "ImgPdf": "10MB"
    }
};

if (define) {
    define(global);
}

window.domain = 'yct.com';



