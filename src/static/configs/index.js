/* eslint-disable no-unused-vars */
const configs = {
    name: 'index',
    components: {
        ToolBar: true,
        SideBar: true,
        StatusBar: true,
        MultiView: true,
        Test: true
    },
    viewpoint: {
        name: '默认',
        longitude: 120.12896,
        latitude: 30.268288,
        range: 5000,
        duration: 3
    },
    imageries: [
        {
            name: '路网标注',
            load: true,
            visible: true,
            provider: 'WebMapTileService',
            options: {
                url: 'http://t0.tianditu.com/cia_w/wmts?tk=1dfcf1a2b70604242eb5c6abe8ee9703',
                layer: 'cia',
                style: 'default',
                format: 'tiles',
                tileMatrixSetID: 'w',
                maximumLevel: 18
            }
        },
        {
            name: '卫星影像',
            load: true,
            visible: true,
            provider: 'ArcGisMapServer',
            options: {
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
                maximumLevel: 18
            }
        }
    ],
    models: [
        /*
        {
            load: true,
            name: '黄龙体育中心',
            visible: true,
            options: {
                url: 'http://bentley.cnanzhen.com/data/HL-TYC-FD/Scene/Production_2mces3m2.json',
                maximumScreenSpaceError: 2,
                maximumNumberOfLoadedTiles: 1000,
                maximumMemoryUsage: 128
            }
        },
        {
            load: true,
            name: '人民大会堂',
            visible: true,
            options: {
                url: 'http://bentley.cnanzhen.com/data/RMDHT/Scene/Production_4mces3m1.json',
                maximumScreenSpaceError: 2,
                maximumNumberOfLoadedTiles: 1000,
                maximumMemoryUsage: 128
            }
        },
        {
            load: true,
            name: '玫瑰园',
            visible: true,
            options: {
                url: 'http://bentley.cnanzhen.com/meiguiyuan/Scene/Production_2mces3d.json',
                maximumScreenSpaceError: 2,
                maximumNumberOfLoadedTiles: 1000,
                maximumMemoryUsage: 128
            }
        },
        */
        {
            name: '大莲花',
            load: true,
            treeRoot: '莲花模型',
            visible: true,
            position: {
                longitude: 120.224463,
                latitude: 30.23163,
                height: 0.0
            },
            rotation: {
                heading: 0.57864931190564135,
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/dlh/tileset.json'
            }
        },
        {
            name: '小莲花',
            load: true,
            treeRoot: '莲花模型',
            visible: true,
            position: {
                longitude: 120.228985,
                latitude: 30.229898,
                height: 5.0
            },
            rotation: {
                heading: 0.60864931190564135,
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/xlh/tileset.json'
            }
        },
        {
            name: '博览中心',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.234171,
                latitude: 30.232168,
                height: 12.5
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/guobo-near/tileset.json'
            }
        },
        {
            name: '地形',
            load: true,
            treeRoot: '其它模型',
            visible: true,
            position: {
                longitude: 120.22633 + 0.0013,
                latitude: 30.230503 - 0.0004,
                height: 44.0
            },
            rotation: {
                heading: Cesium.Math.toRadians(34.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/DX/tileset.json'
            }
        },
        {
            name: '会议四层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.234351,
                latitude: 30.232078,
                height: 19
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/4F/tileset.json'
            }
        },
        {
            name: '会议三层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.2325643,
                latitude: 30.232881,
                height: 18.5
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/3F-hy/tileset.json'
            }
        },
        {
            name: '会议二层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.2325808,
                latitude: 30.2328842,
                height: 8
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/2F-hy/tileset.json'
            }
        },
        {
            name: '会议一层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.2325965,
                latitude: 30.232899,
                height: 2
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/1F-hy/tileset.json'
            }
        },
        {
            name: '展厅三四层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.234496,
                latitude: 30.2322953,
                height: 3.5
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/3F-zt/tileset.json'
            }
        },
        {
            name: '展厅三四层精细',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.23475205,
                latitude: 30.23199775,
                height: 17.1
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/3F-zt-jx/tileset.json'
            }
        },
        {
            name: '展厅二层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.234462,
                latitude: 30.2322533,
                height: -5.25
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/2F-zt/tileset.json'
            }
        },
        {
            name: '展厅二层精细',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.2346323,
                latitude: 30.2320263,
                height: 9
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/2F-zt-jx/tileset.json'
            }
        },
        {
            name: '展厅一层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.234511,
                latitude: 30.2322673,
                height: -15.25
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/1F-zt/tileset.json'
            }
        },
        {
            name: '展厅一层精细',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.2346979 - 0.0000049,
                latitude: 30.2320131 - 0.0000061,
                height: 5.5
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/1F-zt-jx/tileset.json'
            }
        },
        {
            name: '地下一层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.233978,
                latitude: 30.232,
                height: -11
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/B1/tileset.json'
            }
        },
        {
            name: '地下一层精细',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.23400101,
                latitude: 30.23197723,
                height: -9.7
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/B1-jx/tileset.json'
            }
        },
        {
            name: '地下二层',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.234019,
                latitude: 30.232022,
                height: -17.0
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/B2/tileset.json'
            }
        },
        {
            name: '地下二层精细',
            load: true,
            treeRoot: '国博模型',
            visible: true,
            position: {
                longitude: 120.2339895,
                latitude: 30.232006,
                height: -15.5
            },
            rotation: {
                heading: Cesium.Math.toRadians(33.5),
                pitch: 0.0,
                roll: 0.0
            },
            options: {
                url: 'http://122.112.206.126:81/models/guobo/B2-jx/tileset.json'
            }
        }
    ]
};
