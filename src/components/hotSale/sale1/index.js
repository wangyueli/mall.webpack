var app = require('appModule');
var _ = require('underscore');


require('serve/product.js');

var hotSale = app.controller('hotSaleCtrlOne', function ($scope, $stateParams, productService) {

    $scope.page = $stateParams.id;
    $scope.products = [];
    /************专区01************/
    if($stateParams.id == 1){
        /*
         * 寝室*/
        var pIds11 = ['6888588', '6072622', '3948470', '4932622', '6004883', '1295110', '2185974', '2297839', '4983458', '2796134', '385620', '6138191'];
        $scope.product11 = [];
        _.each(pIds11, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product11.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds11.length-1){
                    $scope.products.push({
                        name: '寝室',
                        data: $scope.product11
                    })
                }
            })
        });

        /*
         * 操场*/
        var pIds12 = ['2323438', '4943315','5185333','1436707', '3233275', '5639808', '7302439', '643094', '6522861', '1759465', '776715', '4413265', '348143'];
        $scope.product12 = [];
        _.each(pIds12, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product12.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds12.length-1){
                    $scope.products.push({
                        name: '操场',
                        data: $scope.product12
                    })
                }
            })
        });

        /*
         * 教室*/
        var pIds13 = ['1201473', '3766807','1184404','2238360', '4075816', '6576348', '7964229', '971876', '1173636', '6083573', '1299472', '4682026', '241191'];
        $scope.product13 = [];
        _.each(pIds13, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product13.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds13.length-1){
                    $scope.products.push({
                        name: '教室',
                        data: $scope.product13
                    })
                }
            })
        });

        /*
         * 出游*/
        var pIds14 = ['2554181','3965552'];
        $scope.product14 = [];
        _.each(pIds14, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product14.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds14.length-1){
                    $scope.products.push({
                        name: '出游',
                        data: $scope.product14
                    })
                }
            })
        })
    }

    /************专区01************/
    if($stateParams.id == 2){
        /*
         * 新品必备*/
        var pIds21 = ['7296649', '7297505', '3443540', '1058537', '4294806', '7265675', '6410755'];
        $scope.product21 = [];
        _.each(pIds21, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product21.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds21.length-1){
                    $scope.products.push({
                        name: '新品必备',
                        data: $scope.product21
                    })
                }
            })
        });

        /*
         * 学习休闲*/
        var pIds22 = ['6372983', '6864653', '7295395', '7093746', '6410795', '6410731', '5379160', '6815969'];
        $scope.product22 = [];
        _.each(pIds22, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product22.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds22.length-1){
                    $scope.products.push({
                        name: '学习休闲',
                        data: $scope.product22
                    })
                }
            })
        });

        /*
         * 户外运动*/
        var pIds23 = ['7147529', '4325170', '7534083', '4577137', '703431', '7703417', '6509943'];
        $scope.product23 = [];
        _.each(pIds23, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product23.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds23.length-1){
                    $scope.products.push({
                        name: '户外运动',
                        data: $scope.product23
                    })
                }
            })
        })


        /*
         * 高清大屏*/
        var pIds24 = ['5056175', '5278192', '2175277', '4296978', '5251868', '3597936'];
        $scope.product24 = [];
        _.each(pIds24, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product24.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds24.length-1){
                    $scope.products.push({
                        name: '高清大屏',
                        data: $scope.product24
                    })
                }
            })
        })


    }

   /* ***************专区03****************/
    if($stateParams.id == 3){
        /*
         * 好物搭配*/
        var pIds31 = ['3909771', '7326342', '5173437', '7171439', '5127545', '2327261'];
        $scope.product31 = [];
        _.each(pIds31, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product31.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds31.length-1){
                    $scope.products.push({
                        name: '好物搭配',
                        data: $scope.product31
                    })
                }
            })
        });

        /*
         * 品质精选*/
        var pIds32 = ['6938900', '4351728', '5128667', '219337', '5983888', '7553513'];
        $scope.product32 = [];
        _.each(pIds32, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product32.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds32.length-1){
                    $scope.products.push({
                        name: '品质精选',
                        data: $scope.product32
                    })
                }
            })
        });

        /*
         * 家宴尝鲜**/
        var pIds33 = ['935386', '3649986', '2168291', '5849931', '777240', '3564062'];
        $scope.product33 = [];
        _.each(pIds33, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product33.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds33.length-1){
                    $scope.products.push({
                        name: '家宴尝鲜',
                        data: $scope.product33
                    })
                }
            })
        });

        /*
         *  精选月饼*/
        var pIds34 = ['4859097', '8577083', '1765256', '3001687', '8502755', '8502743', '8895071', '1765231', '1765258',  '8683836', '8364798', '8577129', '4688693', '4688653'];
        $scope.product34 = [];
        _.each(pIds34, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product34.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds34.length-1){
                    $scope.products.push({
                        name: '精选月饼',
                        data: $scope.product34
                    })
                }
            })
        })


        /*
        *  水产生鲜*/
        var pIds35 = ['7678744', '7678662', '4922289', '3740686', '7943037', '7725382', '3740740', '4508479', '7814052', '8040809', '7938109', '4490057', '4490017', '4489993', '7943017', '8894935', '7891635'];
        $scope.product35 = [];
        _.each(pIds35, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product35.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds35.length-1){
                    $scope.products.push({
                        name: '水产生鲜',
                        data: $scope.product35
                    })
                }
            })
        })


        /*
       *  酒水饮料*/
        var pIds36 = ['3486003', '1137881', '3261776', '3140254', '4285030', '1239538', '1061466', '332121', '332115', '4330491', '1083799', '4330479', '1083798', '3734315', '2207447', '3034138', '2150234', '3046062', '1101239', '1307575', '1075534', '2249835', '4936565', '620187', '3236620', '1020958', '5786085'];
        $scope.product36 = [];
        _.each(pIds36, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product36.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds36.length-1){
                    $scope.products.push({
                        name: '酒水饮料',
                        data: $scope.product36
                    })
                }
            })
        })
    }

    /* ***************专区04****************/
    if($stateParams.id == 4){
        /*
         * 精选食品*/
        var pIds41 = ['2156342', '3995878', '3337468', '2990259', '6939819', '3987510', '2340268', '4227751', '1195329', '2248414', '4261626', '3554085', '6279643', '4622537', '3397560', '5903062', '1278112'];
        $scope.product41 = [];
        _.each(pIds41, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product41.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds41.length-1){
                    $scope.products.push({
                        name: '精选食品',
                        data: $scope.product41
                    })
                }
            })
        });

        /*
         * 精选酒水*/
        var pIds42 = ['5920265', '4232917', '16017732211', '565624', '5771437', '11307675041', '15963443187', '3261393', '1150981249', '12945627100', '3758979', '6314015', '16182654270', '4508134', '2979170', '4679170', '904455', '5204146', '2433067', '2750459', '899496', '16605798511', '17925404863', '4571375', '12593910521'];
        $scope.product42 = [];
        _.each(pIds42, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product42.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds42.length-1){
                    $scope.products.push({
                        name: '精选酒水',
                        data: $scope.product42
                    })
                }
            })
        });

        /*
         * 精选礼盒**/
        var pIds43 = ['4869471', '4528705', '7741104', '7953979', '4922289', '4489993', '3740686', '3017423', '5277070', '4490035', '917346', '7943037', '3740740', '5283082', '1734332', '7938129', '3260527', '7725382'];
        $scope.product43 = [];
        _.each(pIds43, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product43.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds43.length-1){
                    $scope.products.push({
                        name: '精选礼盒',
                        data: $scope.product43
                    })
                }
            })
        });

        /*
         *  精选好茶*/
        var pIds44 = ['3806523', '698334', '5964698', '1729944', '4309994', '1624571', '3462538', '1645554', '1781126', '6893269', '5810203', '1823311','698316', '7634335', '2644288', '4139646'];
        $scope.product44 = [];
        _.each(pIds44, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product44.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds44.length-1){
                    $scope.products.push({
                        name: '精选好茶',
                        data: $scope.product44
                    })
                }
            })
        })


        /*
        *  精选水饮*/
        var pIds45 = ['4103763', '285480', '789775', '4983908', '5275534', '2293339', '3313643', '930747', '1044735', '1137881', '1044732', '923621', '3941519', '1088243', '952862', '848852', '848851', '848849', '847394', '1044728'];
        $scope.product45 = [];
        _.each(pIds45, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product45.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds45.length-1){
                    $scope.products.push({
                        name: '精选水饮',
                        data: $scope.product45
                    })
                }
            })
        })


        /*
       *  酒水饮料*/
        var pIds46 = ['3459111', '3342934', '3915436', '2169072', '3042629', '6262070', '3017389', '2239275', '7571206'];
        $scope.product46 = [];
        _.each(pIds46, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product46.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds46.length-1){
                    $scope.products.push({
                        name: '酒水饮料',
                        data: $scope.product46
                    })
                }
            })
        })
    }

    /* ***************专区05****************/
    if($stateParams.id == 5){
        /*
         * 多功能一体机*/
        var pIds51 = ['4073319', '4843786', '4998626'];
        $scope.product51 = [];
        _.each(pIds51, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product51.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds51.length-1){
                    $scope.products.push({
                        name: '一体机',
                        data: $scope.product51
                    })
                }
            })
        });

        /*
         * 打印机*/
        var pIds52 = ['5494136', '4615591', '7894727'];
        $scope.product52 = [];
        _.each(pIds52, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product52.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds52.length-1){
                    $scope.products.push({
                        name: '打印机',
                        data: $scope.product52
                    })
                }
            })
        });


    }

    /************专区06************/
    if($stateParams.id == 6){
        /*
         * 热销爆款 特惠专区**/
        var pIds61 = ['3462538', '4264874', '4996702', '4232972'];
        $scope.product61 = [];
        _.each(pIds61, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product61.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds61.length-1){
                    $scope.products.push({
                        name: '热销爆款 特惠专区',
                        data: $scope.product61
                    })
                }
            })
        });

        /*
         * 清雅 · 绿茶专区*/
        var pIds62 = ['1624560', '2207673'];
        $scope.product62 = [];
        _.each(pIds62, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product62.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds62.length-1){
                    $scope.products.push({
                        name: '清雅·绿茶专区',
                        data: $scope.product62
                    })
                }
            })
        });

        /*
         *优雅 · 红茶专区*/
        var pIds63 = ['3643760', '1256832', '3600987'];
        $scope.product63 = [];
        _.each(pIds63, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product63.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds63.length-1){
                    $scope.products.push({
                        name: '优雅·红茶专区',
                        data: $scope.product63
                    })
                }
            })
        })


        /*
         * 儒雅 · 普洱茶专区*/
        var pIds64 = ['1037583', '4184826', '1812092'];
        $scope.product64 = [];
        _.each(pIds64, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product64.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds64.length-1){
                    $scope.products.push({
                        name: '儒雅·普洱茶专区',
                        data: $scope.product64
                    })
                }
            })
        })


        /*
        *典雅 · 乌龙茶专区 */
        var pIds65 = ['3757577', '1200964', '4236376'];
        $scope.product65 = [];
        _.each(pIds65, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product65.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds65.length-1){
                    $scope.products.push({
                        name: '典雅·乌龙茶专区',
                        data: $scope.product65
                    })
                }
            })
        })



        /*
        * 更多好茶专区 */
        var pIds66 = ['5162832', '1273862', '4839053', '2098795', '4521540', '2206912', '4996700', '4928228'];
        $scope.product66 = [];
        _.each(pIds66, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product66.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds66.length-1){
                    $scope.products.push({
                        name: '更多好茶专区',
                        data: $scope.product66
                    })
                }
            })
        })



    }

    /* ***************专区07****************/
    if($stateParams.id == 7) {
        /*
         * 摄像头专区*/
        var pIds71 = ['27627630328', '24206598209', '10064731907', '10275148398'];
        $scope.product71 = [];
        _.each(pIds71, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product71.push(data);
                data.pic = data.pic.split(',')[0];
                if (index == pIds71.length - 1) {
                    $scope.products.push({
                        name: '摄像头专区',
                        data: $scope.product71
                    })
                }
            })
        });

        /*
         * 录像机专区*/
        var pIds72 = [];
        $scope.product72 = ['1469455597', '1512860089'];
        _.each(pIds72, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product72.push(data);
                data.pic = data.pic.split(',')[0];
                if (index == pIds72.length - 1) {
                    $scope.products.push({
                        name: '录像机专区',
                        data: $scope.product72
                    })
                }
            })
        });

        /*
         * 配件专区**/
        var pIds73 = ['28786010829', '27425521862', '24869631535'];
        $scope.product73 = [];
        _.each(pIds73, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product73.push(data);
                data.pic = data.pic.split(',')[0];
                if (index == pIds73.length - 1) {
                    $scope.products.push({
                        name: '配件专区',
                        data: $scope.product73
                    })
                }
            })
        });

    }

    /* ***************专区08****************/
    if($stateParams.id == 8){
        /*
         * 配件*/
        var pIds81 = ['4857155', '2448112', '7125726', '5413372'];
        $scope.product81 = [];
        _.each(pIds81, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product81.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds81.length-1){
                    $scope.products.push({
                        name: '配件',
                        data: $scope.product81
                    })
                }
            })
        });

        /*
         * 笔记本*/
        var pIds82 = ['5054216', '5050164', '4468800', '4380852'];
        $scope.product82 = [];
        _.each(pIds82, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product82.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds82.length-1){
                    $scope.products.push({
                        name: '笔记本',
                        data: $scope.product82
                    })
                }
            })
        });

        /*
         * 台式机**/
        var pIds83 = ['7306983', '7306981', '7306959', '7306961', '7108222', '6043234', '6512785', '6469219', '6512799', '6325898', '8086041'];
        $scope.product83 = [];
        _.each(pIds83, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product83.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds83.length-1){
                    $scope.products.push({
                        name: '台式机',
                        data: $scope.product83
                    })
                }
            })
        });

        /*
         *  显示器*/
        var pIds84 = ['2316995', '2452950', '3367360', '3058557', '7576263', '7362130', '6455708', '6652399'];
        $scope.product84 = [];
        _.each(pIds84, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product84.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds84.length-1){
                    $scope.products.push({
                        name: '显示器',
                        data: $scope.product84
                    })
                }
            })
        })


    }

    /* ***************专区09****************/
    if($stateParams.id == 9){
        /*
         * iPhone专区*/
        var pIds91 = ['6233669', '5089271', '5604281', '6176812', '6176816', '6176814', '5757752', '5757780'];
        $scope.product91 = [];
        _.each(pIds91, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product91.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds91.length-1){
                    $scope.products.push({
                        name: 'iPhone专区',
                        data: $scope.product91
                    })
                }
            })
        });

        /*
         * iPad专区*/
        var pIds92 = ['5222158', '1892018', '1892028', '4325427', '4325429', '5222160', '5222162', '4669048', '4669026', '4669010'];
        $scope.product92 = [];
        _.each(pIds92, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product92.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds92.length-1){
                    $scope.products.push({
                        name: 'iPad专区',
                        data: $scope.product92
                    })
                }
            })
        });

        /*
         * Mac专区**/
        var pIds93 = ['5225340', '4335045', '4331183', '4331185', '4331143', '5225342', '4335133', '4331151', '5225340', '4335021', '4335131', '334875', '4335105', '4334877'];
        $scope.product93 = [];
        _.each(pIds93, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product93.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds93.length-1){
                    $scope.products.push({
                        name: 'Mac专区',
                        data: $scope.product93
                    })
                }
            })
        });

        /*
         *  配件专区*/
        var pIds94 = ['3563660', '1861424', '6518073', '771920', '4406753'];
        $scope.product94 = [];
        _.each(pIds94, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product94.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds94.length-1){
                    $scope.products.push({
                        name: '配件专区',
                        data: $scope.product94
                    })
                }
            })
        })

    }

    /* ***************专区10****************/
    if($stateParams.id == 10){
        /*
         *品牌爆品 */
        var pIds101 = ['5464265', '5464261', '5557742', '5853593', '5853579', '5924244', '6055050', '6055054', '7080822', '7294309', '6940276', '4914531'];
        $scope.product101 = [];
        _.each(pIds101, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product101.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds101.length-1){
                    $scope.products.push({
                        name: '品牌爆品',
                        data: $scope.product101
                    })
                }
            })
        });

        /*
         * 热销商品*/
        var pIds102 = ['7146636', '7134172', '7348209', '7106178', '7320003', '7319975', '5572390', '5257665','4255683', '4635250', '3445231', '4428640'];
        $scope.product102 = [];
        _.each(pIds102, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product102.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds102.length-1){
                    $scope.products.push({
                        name: '热销商品',
                        data: $scope.product102
                    })
                }
            })
        });

        /*
         * 平板酷玩**/
        var pIds103 = ['5605012', '4561935', '4215115', '5127282', '4589413', '5910146'];
        $scope.product103 = [];
        _.each(pIds103, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product103.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds103.length-1){
                    $scope.products.push({
                        name: '平板酷玩',
                        data: $scope.product103
                    })
                }
            })
        });

        /*
         *  智能网络*/
        var pIds104 = ['5257665', '5360861', '5123258', '2297839', '3348710', '3369436', '4912606', '2297813'];
        $scope.product104 = [];
        _.each(pIds104, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product104.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds104.length-1){
                    $scope.products.push({
                        name: '智能网络',
                        data: $scope.product104
                    })
                }
            })
        })


        /*
        *  炫彩配件*/
        var pIds105 = ['5289698', '6363490','4635250', '4635258', '3969281', '439744', '2210885', '4964266', '4595301', '4428640', '2988013', '2768837', '3238112', '1700895', '6227023', '3533659', '2688322', '3533643'];
        $scope.product105 = [];
        _.each(pIds105, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product105.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds105.length-1){
                    $scope.products.push({
                        name: '炫彩配件',
                        data: $scope.product105
                    })
                }
            })
        })

    }

    /* ***************专区11****************/
    if($stateParams.id == 11){
        /*
         * 10人办公组*/
        var pIds111 = ['5602175', '5675807', '5602175', '5602177','3836894', '3400523'];
        $scope.product111 = [];
        _.each(pIds111, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product111.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds111.length-1){
                    $scope.products.push({
                        name: '10人办公组',
                        data: $scope.product111
                    })
                }
            })
        });

        /*
         * 50人工作群*/
        var pIds112 = ['5872629', '5602161', '5936932', '5602159', '2619408', '2619479'];
        $scope.product112 = [];
        _.each(pIds112, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product112.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds112.length-1){
                    $scope.products.push({
                        name: '50人工作群',
                        data: $scope.product112
                    })
                }
            })
        });


        /*
        * 200人规模企业*/
        var pIds113 = ['5756286', '5756292', '5936956', '5756296', '5756318', '5756294', '5602195'];
        $scope.product113 = [];
        _.each(pIds113, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product113.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds113.length-1){
                    $scope.products.push({
                        name: '200人规模企业',
                        data: $scope.product113
                    })
                }
            })
        });

        /*
       * 金融机构适用*/
        var pIds114 = ['5602163', '5756290', '5602161', '5756288', '5570500', '5602161', '5756286', '3125257', '3554758'];
        $scope.product114 = [];
        _.each(pIds114, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product114.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds114.length-1){
                    $scope.products.push({
                        name: '金融机构适用',
                        data: $scope.product114
                    })
                }
            })
        });

        /*
      * 设计院适用*/
        var pIds115 = ['5756296', '5756276', '5756322', '3244132', '2927842'];
        $scope.product115 = [];
        _.each(pIds115, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product115.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds115.length-1){
                    $scope.products.push({
                        name: '设计院适用',
                        data: $scope.product115
                    })
                }
            })
        });
    }

    /* ***************专区12****************/
    if($stateParams.id == 12){
        /*
         * 专业投影*/
        var pIds121 = ['3278367', '3927706', '4415695', '5252132', '5252134', '3927762', '4415683', '4415697'];
        $scope.product121 = [];
        _.each(pIds121, function (pId, index) {
            productService.get('JD', pId, function (data) {
                $scope.product121.push(data);
                data.pic = data.pic.split(',')[0];
                if(index == pIds121.length-1){
                    $scope.products.push({
                        name: '专业投影',
                        data: $scope.product121
                    })
                }
            })
        });

    }

});

module.exports = hotSale;

