export default {
    name: 'index',
    components: {
        ToolBar: true,
        SideBar: true,
        StatusBar: true
    },
    viewer: {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        scene3DOnly: true,
        shouldAnimate: true,
        delay: Number.MIN_VALUE
    },
    viewpoint: {
        name: '默认',
        longitude: 121.552222,
        latitude: 29.863333,
        range: 10000.0
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
    ]
};
