import { cloneObject } from './aeUtils';

class ImageryManager {
    static genImageryFromObject({ name, visible, provider, options }) {
        return this.genImagery(name, visible, provider, options);
    }

    static genImagery(name, visible, provider, options) {
        if (!name || !provider || !options) return null;
        options = cloneObject(options);

        if (options.tilingScheme && options.tilingScheme.toUpperCase() === 'GEOGRAPHIC') options.tilingScheme = new Cesium.GeographicTilingScheme();
        else if (options.tilingScheme && options.tilingScheme.toUpperCase() === 'WEBMERCATOR') options.tilingScheme = new Cesium.WebMercatorTilingScheme();

        if (options.rectangle) {
            if (options.rectangle.west && options.rectangle.south && options.rectangle.east && options.rectangle.north) {
                if (-Math.PI <= options.rectangle.west && options.rectangle.west <= Math.PI && -Math.PI / 2 <= options.rectangle.south && options.rectangle.south <= Math.PI / 2 && -Math.PI <= options.rectangle.east && options.rectangle.east <= Math.PI && -Math.PI / 2 <= options.rectangle.north && options.rectangle.north <= Math.PI / 2) {
                    options.rectangle = Cesium.Rectangle.fromRadians(options.rectangle.west, options.rectangle.south, options.rectangle.east, options.rectangle.north);
                } else {
                    options.rectangle = Cesium.Rectangle.fromDegrees(options.rectangle.west, options.rectangle.south, options.rectangle.east, options.rectangle.north);
                }
            }
        }

        let ip = null;
        if (typeof provider !== 'string') return null;
        switch (provider.toUpperCase()) {
            case 'ARCGISMAPSERVER':
                ip = new Cesium.ArcGisMapServerImageryProvider(options);
                break;
            case 'BINGMAPS':
                ip = new Cesium.BingMapsImageryProvider(options);
                break;
            case 'CREATEOPENSTREETMAP':
                ip = Cesium.createOpenStreetMapImageryProvider(options);
                break;
            case 'CREATETILEMAPSERVICE':
                ip = Cesium.createTileMapServiceImageryProvider(options);
                break;
            case 'CREATEWORLDIMAGERY':
                ip = Cesium.createWorldImagery(options);
                break;
            case 'GOOGLEEARTHENTERPRISE':
                ip = new Cesium.GoogleEarthEnterpriseImageryProvider(options);
                break;
            case 'GRID':
                ip = new Cesium.GridImageryProvider(options);
                break;
            case 'ION':
                ip = new Cesium.IonImageryProvider(options);
                break;
            case 'MAPBOX':
                ip = new Cesium.MapboxImageryProvider(options);
                break;
            case 'SINGLETILE':
                ip = new Cesium.SingleTileImageryProvider(options);
                break;
            case 'TILECOORDINATES':
                ip = new Cesium.TileCoordinatesImageryProvider(options);
                break;
            case 'URLTEMPLATE':
                ip = new Cesium.UrlTemplateImageryProvider(options);
                break;
            case 'WEBMAPSERVICE':
                ip = new Cesium.WebMapServiceImageryProvider(options);
                break;
            case 'WEBMAPTILESERVICE':
                ip = new Cesium.WebMapTileServiceImageryProvider(options);
                break;
        }
        if (!ip) return null;

        let il = new Cesium.ImageryLayer(ip);
        if (il) {
            il.name = name;
            il.type = 'imagery';
            il.show = visible;
        }
        return il;
    }

    static addImagery(viewer, imagery, index) {
        if (!viewer || !viewer.scene || !imagery || !(imagery instanceof Cesium.ImageryLayer) || imagery.type !== 'imagery') return null;
        viewer.scene.imageryLayers.add(imagery, index);
        return imagery;
    }

    static delImagery(viewer, name, multi = true) {
        if (!viewer || !viewer.scene) return false;
        let ils = viewer.scene.imageryLayers;
        for (let i = 0; i < ils.length; ++i) {
            let imagery = ils.get(i);
            if (imagery.type !== 'imagery') continue;
            if (name && imagery.name !== name) continue;
            ils.remove(imagery);
            if (!multi) break;
            --i;
        }
        return true;
    }

    static getImagery(viewer, name) {
        if (!viewer || !viewer.scene || !name) return null;
        let ils = viewer.scene.imageryLayers;
        for (let i = 0; i < ils.length; ++i) {
            let imagery = ils.get(i);
            if (imagery.type !== 'imagery') continue;
            if (imagery.name !== name) continue;
            return imagery;
        }
        return null;
    }

    static getImageries(viewer, name) {
        let ret = [];
        if (!viewer || !viewer.scene) return ret;
        let ils = viewer.scene.imageryLayers;
        for (let i = 0; i < ils.length; ++i) {
            let imagery = ils.get(i);
            if (imagery.type !== 'imagery') continue;
            if (name && imagery.name !== name) continue;
            ret.push(imagery);
        }
        return ret;
    }
}

export default ImageryManager;
