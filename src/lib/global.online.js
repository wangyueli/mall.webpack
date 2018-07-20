var global = {
    domain: 'yuncaitong.cn',
    www: {
        url: 'https://www.yuncaitong.cn',
        api: 'https://www.yuncaitong.cn/api'
    },
    app: {
        url: 'https://app.yuncaitong.cn',
        api: 'https://app.yuncaitong.cn/api'
    },
    sell: {
        url: 'https://sell.yuncaitong.cn',
        api: 'https://sell.yuncaitong.cn/api'
    },
    mallSell: {
        url: 'https://supplier.yuncaitong.cn',
        api: 'https://supplierapi.yuncaitong.cn'
    },
    shop: {
        url: 'https://shop.yuncaitong.cn',
        api: 'https://shop.yuncaitong.cn/api'
    },
    file: {
        url: 'https://file.yuncaitong.cn'
    },
    help: {
        url: 'https://help.yuncaitong.cn'
    },
    api: {
        url: 'https://api.yuncaitong.cn'
    },
    pay: {
        url: 'https://pay.yuncaitong.cn'
    },
    cms: {
        api: 'https://cms.yuncaitong.cn/sfw/'
    },
    mall: {
        url: 'https://mall.yuncaitong.cn',
        api: 'https://mallapi.yuncaitong.cn'
    },
    mallJd: {
        url: 'https://mall.yuncaitong.cn/#/?mallId=JD',
        api: 'https://malljdapi.yuncaitong.cn'
    },
    survey: {
        url: 'https://survey.yuncaitong.cn',
        api: 'https://surveyapi.yuncaitong.cn'
    },
    mallCm: {
        url: 'https://cm.mall.yuncaitong.cn',
        api: 'https://cm.mall.yuncaitong.cn/api'
    },
    mallEs: {
        url: 'https://es.mall.yuncaitong.cn',
        api: 'https://es.mall.yuncaitong.cn/api'
    },
    weixin: {
        url: 'https://weixin.yuncaitong.cn',
        api: 'https://weixin.yuncaitong.cn/api'
    },
    "static": {
        url: 'http://staticmall.yuncaitong.cn'
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

document.domain = 'yuncaitong.cn';

try {
    define(global);
} catch (err) {
}
