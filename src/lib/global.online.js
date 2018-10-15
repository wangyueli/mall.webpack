var global = {
    domain: 'yuncaitong.cn',
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
