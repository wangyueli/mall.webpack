var global = {
    domain: '192.168.1.200',
    www: {
        url: '//192.168.1.200',
        api: '//192.168.1.18:8080/yct.www.api'
    },
    app: {
        url: '//192.168.1.200:8100',
        api: '//192.168.1.18:8080/yct.app.api'
    },
    sell: {
        url: '//192.168.1.200:8400',
        api: '//192.168.1.18:8080/yct.sell.api'
    },
    shop: {
        url: '//192.168.1.200:8200',
        api: '//192.168.1.18:8080/yct.shop.api'
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
        url: '//192.168.1.200:8300',
        api: '//192.168.1.18:8080/yct.mall.api'
    },
    mallCm: {
        url: 'https://cm.mall.yuncaitong.cn',
        api: 'https://cm.mall.yuncaitong.cn/api'
    },
    mallEs: {
        url: 'https://es.mall.yuncaitong.cn',
        api: 'https://es.mall.yuncaitong.cn/api'
    },
    mallJd: {
        url: 'https://jd.mall.yuncaitong.cn',
        api: 'https://jd.mall.yuncaitong.cn/api'
    },
    weixin: {
        url: 'https://weixin.yuncaitong.cn',
        api: 'https://weixin.yuncaitong.cn/api'
    },
    supplier:{
        url:"https://supplierapi.yuncaitong.cn"
    },
    "static": {
        url: 'https://static.yuncaitong.cn'
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
module.exports = global;



