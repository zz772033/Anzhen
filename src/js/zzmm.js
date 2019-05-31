import Vue from 'vue';
import Vuex from 'vuex';
import { cloneObject } from '../aeUtils';

Vue.use(Vuex);
function fixCommonDefinition(definition) {
    return key => {
        if (!definition || typeof definition !== 'object') return null;
        if (!definition.hasOwnProperty(key)) return null;  // definition为对象 key为所要判断的字符串
        return definition[key];
    };
}

function genEntity(options) {
    if (!options) return null;
    options = cloneObject(options);
    if (options.billboard) options.billboard = fixBillboardOptions(options.billboard);
    if (options.box) options.box = fixBoxOptions(options.box);
    if (options.label) options.label = fixLabelOptions(options.label);
    if (options.model) options.model = fixModelOptions(options.model);
    if (options.corridor) options.corridor = fixCorridor(options.corridor);
    if (options.point) options.point = fixPointOptions(options.point);
    if (options.polygon) options.polygon = fixPolygonOptions(options.polygon);
    if (options.polyline) options.polyline = fixPolylineOptions(options.polyline);
    if (options.position) options.position = fixPosition(options.position);
    if (options.orientation) options.orientation = fixOrientation(options.position, options.orientation);
    if (options.properties && typeof options.properties === 'object' && !(options.properties instanceof Cesium.PropertyBag)) options.properties = new Cesium.PropertyBag(options.properties);
    let feature = new Cesium.Entity(options);
    // if (feature) {
    //     feature.name = name;
    //     feature.type = 'feature';
    //     feature.show = visible;
    // }
    return feature;
}

function fixBillboardOptions(options) {
    // image
    // shou 一个数字属性，指定要应用于图像大小的比例。
    if (options.horizontalOrigin)options.horizontalOrigin = fixHorizontalOrigin(options.horizontalOrigin)
}

function fixHorizontalOrigin(key) {
    return fixCommonDefinition(Cesium.horizontalOrigin)(key.toUpperCasse());

}

export default { genEntity };