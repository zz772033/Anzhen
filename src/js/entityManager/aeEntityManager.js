import Vue from 'vue';
import Vuex from 'vuex';
import { cloneObject } from '../aeUtils';

Vue.use(Vuex);


//   label  還沒有進行防裝
function genEntity(options) {
    if (!options) return null;
    options = cloneObject(options);
    if (options.billboard) options.billboard = fixBillboardOptions(options.billboard);
    if (options.box) options.box = fixBoxOptions(options.box);
    if (options.label) options.label = fixLabelOptions(options.label);
    if (options.model) options.model = fixModelOptions(options.model);
    if (options.corridor) options.corridor = fixCorridor(options.corridor);
    if (options.point) options.point = fixPointOptions(options.point);
    if (options.plane) options.plane = fixPlaneOptions(options.plane);
    if (options.polygon) options.polygon = fixPolygonOptions(options.polygon);
    if (options.polyline) options.polyline = fixPolylineOptions(options.polyline);
    if (options.position) options.position = fixPosition(options.position);
    if (options.orientation) options.orientation = fixOrientation(options.position, options.orientation);
    if (options.properties) options.properties = fixProperties(options.properties);
    if (options.properties && typeof options.properties === 'object' && !(options.properties instanceof Cesium.PropertyBag)) options.properties = new Cesium.PropertyBag(options.properties);
    if (options.wall) options.wall =fixWall(options.properties);

    if (options.path) options.path = fixPath(options.path);
    let feature = new Cesium.Entity(options);
    // if (feature) {
    //     feature.name = name;
    //     feature.type = 'feature';
    //     feature.show = visible;
    // }
    return feature;
}
function fixPath(options) {
    // leadTime: number
    // trailTime: number
    // show: boolean
    // width: number
    if (options.material) options.material = fixColor(options.material);
    // resolution: number
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);

    return options;
}

function fixWall(options) {
    if (options.positions) options.positions = fixPositions(options.positions);
    if (options.maximumHeights) options.maximumHeights = fixArray(options.maximumHeights);
    if (options.minimumHeights) options.minimumHeights = fixArray(options.minimumHeights);
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixMaterialProperty(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // granularity: number
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    return options;
}
function fixArray(arr) {
    return Array.isArray(arr) ? arr : null;
}
function fixProperties(option) {
    if (option.value) option.value = fixValue(option.value);
    if (option.createPropertyCallback) option.createPropertyCallback = fixCreatePropertyCallback(option.createPropertyCallback);
    return option;
}
function fixCreatePropertyCallback(fun) {
    return typeof fun === 'function' ? fun : null;
}
function fixValue(value) {
    return typeof value === 'object' && !Array.isArray(value) ? value : null;
}
function fixPlaneOptions(options) {
    if (options.plane) options.plane = fixPlane(options.plane);
    if (options.dimensions) opktions.dimensions = fixCartesian2(options.dimensions);
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixColor(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);

    return options;
}
function fixPlane(option) {
    if (option && (typeof option === 'string')) {
    switch (option) {
    case 'x':
    return option = new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0);
    case 'y':
    return option = new Cesium.Plane(Cesium.Cartesian3.UNIT_Y, 0.0);
    case 'z':
    return option = new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0);
    }
    }
    return null;
    }



function fixHorizontalOrigin(key) {
    return fixCommonDefinition(Cesium.HorizontalOrigin)(key.toUpperCase());
}

function fixVerticalOrigin(key) {
    return fixCommonDefinition(Cesium.VerticalOrigin)(key.toUpperCase());
}

function fixCartesian2(option) {
    return option instanceof Cesium.Cartesian2 ? option : new Cesium.Cartesian2(option.x, option.y);
}

function fixCartesian3(option) {
    return option instanceof Cesium.Cartesian3 ? option : new Cesium.Cartesian3(option.x, option.y, option.z);
}


function fixPosition(position) {
    if (position instanceof Cesium.Cartesian3) return position;
    if (position.latitude && position.longitude) {
        if (-Math.PI <= position.longitude && position.longitude <= Math.PI && -Math.PI / 2 <= position.latitude && position.latitude <= Math.PI / 2) {
            position = Cesium.Cartesian3.fromRadians(position.longitude, position.latitude, position.height);
        } else {
            position = Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.height);
        }
    } else {
        position = new Cesium.Cartesian3(position.x, position.y, position.z);
    }
    return position;
}

function fixOrientation(position, orientation) {
    if (orientation instanceof Cesium.VelocityOrientationProperty) return orientation;
    if (orientation instanceof Cesium.Quaternion) return orientation;
    if (position instanceof Cesium.SampledPositionProperty && orientation === 'auto') return new Cesium.VelocityOrientationProperty(position);
    if (!(position instanceof Cesium.Cartesian3)) return null;
    if (-Math.TWO_PI <= orientation.heading && orientation.heading <= Math.TWO_PI && -Math.TWO_PI <= orientation.pitch && orientation.pitch <= Math.TWO_PI && -Math.TWO_PI <= orientation.roll && orientation.roll <= Math.TWO_PI) {
        return Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(orientation.heading, orientation.pitch, orientation.roll));
    }
    return Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(orientation.heading), Cesium.Math.toRadians(orientation.pitch), Cesium.Math.toRadians(orientation.roll)));
}



function fixBillboardOptions(options) {
    // image : uri
    // show: true
    // scale: 1.0
    if (options.horizontalOrigin) options.horizontalOrigin = fixHorizontalOrigin(options.horizontalOrigin);
    if (options.verticalOrigin) options.verticalOrigin = fixVerticalOrigin(options.verticalOrigin);
    if (options.eyeOffset) options.eyeOffset = fixCartesian3(options.eyeOffset);
    if (options.pixelOffset) options.pixelOffset = fixCartesian2(options.pixelOffset);
    // rotation: number
    if (options.alignedAxis) options.alignedAxis = fixCartesian3(options.alignedAxis);
    // width: number
    // height: number
    if (options.color) options.color = fixColor(options.color);
    if (options.scaleByDistance) options.scaleByDistance = fixScaleByDistance(options.scaleByDistance);
    if (options.translucencyByDistance) options.translucencyByDistance = fixTranslucencyByDistance(options.translucencyByDistance);
    if (options.pixelOffsetScaleByDistance) options.pixelOffsetScaleByDistance = fixPixelOffsetScaleByDistance(options.pixelOffsetScaleByDistance);
    if (options.imageSubRegion) options.imageSubRegion = fixImageSubRegion(options.imageSubRegion);
    // sizeInMeters: boolean
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    // disableDepthTestDistance: number
    return options;
}

function fixCommonDefinition(definition) {
    return key => {
        if (!definition || typeof definition !== 'object') return null;
        if (!definition.hasOwnProperty(key)) return null;
        return definition[key];
    };
}


function fixColor(option) {
    return typeof option === 'string' ? Cesium.Color.fromCssColorString(option) : null;
}

function fixNearFarScalar(option) {
    return option instanceof Cesium.NearFarScalar ? option : new Cesium.NearFarScalar(option.near, option.nearValue, option.far, option.farValue);
}

function fixScaleByDistance(option) {
    return fixNearFarScalar(option);
}

function fixTranslucencyByDistance(option) {
    return fixNearFarScalar(option);
}

function fixPixelOffsetScaleByDistance(option) {
    return fixNearFarScalar(option);
}

function fixImageSubRegion(option) {
    return option instanceof Cesium.BoundingRectangle ? option : new Cesium.BoundingRectangle(option.x, option.y, option.width, option.height);
}



function fixDistanceDisplayCondition(option) {
    return option instanceof Cesium.DistanceDisplayCondition ? option : new Cesium.DistanceDisplayCondition(option.near, option.far);
}


function fixBoxOptions(options) {
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    if (options.dimensions) options.dimensions = fixCartesian3(options.dimensions);
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixColor(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    return options;
}

function fixMaterial(options) {
    if (typeof options === 'string') {
        return fixColor(options);
    } else if (typeof options === 'object' && !(options instanceof Cesium.MaterialProperty)) {
        options.type = {
            COLOR: 'Color',
            IMAGE: 'Image',
            DIFFUSEMAP: 'DiffuseMap',
            ALPHAMAP: 'AlphaMap',
            SPECULARMAP: 'SpecularMap',
            EMISSIONMAP: 'EmissionMap',
            BUMPMAP: 'BumpMap',
            NORMALMAP: 'NormalMap',
            GRID: 'Grid',
            STRIPE: 'Stripe',
            CHECKERBOARD: 'Checkerboard',
            DOT: 'Dot',
            WATER: 'Water',
            RIMLIGHTING: 'RimLighting',
            FADE: 'Fade',
            POLYLINEARROW: 'PolylineArrow',
            POLYLINEDASH: 'PolylineDash',
            POLYLINEGLOW: 'PolylineGlow',
            POLYLINEOUTLINE: 'PolylineOutline',
            ELEVATIONCONTOUR: 'ElevationContour',
            ELEVATIONRAMP: 'ElevationRamp',
            GUIDEPATH: 'GUIDEPATH',
            SLOPERAMP: 'SlopeRamp',
            ASPECTRAMP: 'AspectRamp'
        }[options.type.toUpperCase()];

        if (options.repeat) {
            if (options.type === 'Stripe' && typeof options.repeat === 'number') {
                // eslint-disable-next-line no-self-assign
                options.repeat = options.repeat;
            } else if (options.type === 'Fade' && typeof options.repeat === 'boolean') {
                // eslint-disable-next-line no-self-assign
                options.repeat = options.repeat;
            } else {
                options.repeat = fixCartesian2(options.repeat);
            }
        }
        if (options.channels) {
            if (options.channels.length === 3) {
                for (let i = 0, len = options.channels.toLowerCase().length; i < len; ++i) {
                    ['r', 'g', 'b', 'a'].indexOf(options.channels.toLowerCase()[i]) === -1 ? (options.channels = null) : (options.channels = options.channels.toLowerCase());
                }
            } else {
                options.channels = null;
            }
        }
        if (options.channel)['r', 'g', 'b', 'a'].indexOf(options.channel.toLowerCase()) !== -1 ? (options.channel = options.channel.toLowerCase()) : (options.channels = null);
        if (options.strength) parseFloat(options.strength) > 0 && parseFloat(options.strength) < 1 ? (options.strength = options.strength) : (options.strength = null);
        if (options.cellAlpha) parseFloat(options.cellAlpha) > 0 && parseFloat(options.cellAlpha) < 1 ? (options.cellAlpha = options.cellAlpha) : (options.cellAlpha = null);
        if (options.lineCount) options.lineCount = fixCartesian2(options.lineCount);
        if (options.lineThickness) options.lineThickness = fixCartesian2(options.lineThickness);
        if (options.lineOffset) options.lineOffset = fixCartesian2(options.lineOffset);
        // Stripe: horizontal : boole 判断条纹是水平还是垂直;
        // Stripe: offset:number
        // Stripe: repeat: number 条纹重复多少次
        if (options.evenColor) options.evenColor = fixColor(options.evenColor);
        if (options.oddColor) options.oddColor = fixColor(options.oddColor);
        if (options.lightColor) options.lightColor = fixColor(options.lightColor);
        if (options.darkColor) options.darkColor = fixColor(options.darkColor);
        if (options.baseWaterColor) options.baseWaterColor = fixColor(options.baseWaterColor);
        if (options.blendColor) options.blendColor = fixColor(options.blendColor);
        // water:specularMap
        // water:normalMap
        // water:animationSpeed
        // water:amplitude
        // water:specularIntensity
        // RimLighting:color
        if (options.rimColor) options.rimColor = fixColor(options.rimColor);
        // RimLighting: width
        if (options.fadeInColor) options.fadeInColor = fixColor(options.fadeInColor);
        if (options.fadeOutColor) options.fadeOutColor = fixColor(options.fadeOutColor);
        // Fade: maximumDistance : number (between 0.0 and 1.0)
        // Fade: repeat : true/false
        if (options.fadeDirection) options.fadeDirection = fixCartesian2(options.fadeDirection);
        if (options.time) options.time = fixCartesian2(options.time);
        // PolylineArrow : color
        if (options.color) options.color = fixColor(options.color);
        if (options.gapColor) options.gapColor = fixColor(options.gapColor);
        // PolylineDash : dashLength : pixels
        // PolylineDash : dashPattern
        // PolylineGlow : color,
        // PolylineGlow : glowPower (percentage of the total line width (less than 1.0)).
        // PolylineOutline: color
        if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
        // PolylineOutline: outlineWidth : number (pixels)
        // ElevationContour: color
        // ElevationContour: spacing: number
        // ElevationContour: width: number
        // ElevationRamp image: string (color ramp image to use for coloring the terrain)
        // ElevationRamp : minimumHeight: number
        // ElevationRamp: maximumHeight: number
        // SlopeRamp: image: string
        // AspectRamp: image: string

        if (options.type === 'GUIDEPATH') return new Cesium.PolylineGuidePathMaterialProperty(options);

        return Cesium.Material.fromType(options.type, options);
    }
    return null;
}

function fixShadows(key) {
    return fixCommonDefinition(Cesium.ShadowMode)(key.toUpperCase());
}

function fixCorridor(options) {
    if (options.positions) options.positions = fixPositions(options.positions);
    // width: number
    if (options.cornerType) options.cornerType = fixCornerType(options.cornerType);
    // height: number
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    // extrudedHeight
    // extrudedHeightReference
    // show: boolean
    // fill: bollean
    if (options.material) options.material = fixColor(options.material);
    // outline: bollean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // granularity: number
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    if (options.classificationType) options.classificationType = fixClassificationType(options.classificationType);
    // zIndex: number
    return options;
}

function fixPositions(positions) {
    if (!Array.isArray(positions)) return null;
    return positions.map(item => fixPosition(item));
}

function fixCornerType(key) {
    return fixCommonDefinition(Cesium.CornerType)(key.toUpperCase());
}

function fixClassificationType(key) {
    return fixCommonDefinition(Cesium.ClassificationType)(key.toUpperCase());
}


function fixLabelOptions(options) {
    // text: string
    // font: string
    if (options.style) options.style = fixStyle(options.style);
    if (options.fillColor) options.fillColor = fixColor(options.fillColor);
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // show: boolean
    // showBackground: boolean
    if (options.backgroundColor) options.backgroundColor = fixColor(options.backgroundColor);
    if (options.backgroundPadding) options.backgroundPadding = fixCartesian2(options.backgroundPadding);
    // scale: number
    if (options.horizontalOrigin) options.horizontalOrigin = fixHorizontalOrigin(options.horizontalOrigin);
    if (options.verticalOrigin) options.verticalOrigin = fixVerticalOrigin(options.verticalOrigin);
    if (options.eyeOffset) options.eyeOffset = fixCartesian3(options.eyeOffset);
    if (options.pixelOffset) options.eyeOffset = fixCartesian2(options.pixelOffset);
    if (options.translucencyByDistance) options.translucencyByDistance = fixTranslucencyByDistance(options.translucencyByDistance);
    if (options.pixelOffsetScaleByDistance) options.pixelOffsetScaleByDistance = fixPixelOffsetScaleByDistance(options.pixelOffsetScaleByDistance);
    if (options.scaleByDistance) options.scaleByDistance = fixScaleByDistance(options.scaleByDistance);
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    // disableDepthTestDistance: number
    return options;
}

function fixStyle(key) {
    return fixCommonDefinition(Cesium.LabelStyle)(key.toUpperCase());
}

function fixModelOptions(options) {
    // uri: string
    // show: boolean
    // scale: number
    // minimumPixelSize: number
    // maximumScale: number
    // incrementallyLoadTextures: boolean
    // runAnimations: boolean
    // clampAnimations: boolean
    if (options.nodeTransformations) options.nodeTransformations = fixNodeTransformations(options.nodeTransformations);
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    if (options.silhouetteColor) options.silhouetteColor = fixColor(options.silhouetteColor);
    // silhouetteSize: number
    if (options.color) options.color = fixColor(options.color);
    if (options.colorBlendMode) options.colorBlendMode = fixColorBlendMode(options.colorBlendMode);
    // colorBlendAmount: number
    // clippingPlanes///////////
    if (options.imageBasedLightingFactor) options.imageBasedLightingFactor = fixCartesian2(options.imageBasedLightingFactor);
    if (options.lightColor) options.lightColor = fixColor(options.lightColor);
    return options;
}

function fixNodeTransformations(options) {
    if (option.translation) options.translation = fixCartesian3(options.translation);
    if (option.rotation) options.rotation = fixRotation(options.rotation);
    if (option.scale) options.scale = fixCartesian3(options.scale);
    return options;
}

function fixRotation(option) {
    return option instanceof Cesium.Quaternion ? option : new Cesium.Quaternion(option.x, option.y, option.z, option.w);
}

function fixColorBlendMode(key) {
    return fixCommonDefinition(Cesium.Cesium3DTileColorBlendMode)(key.toUpperCase());
}

function fixPointOptions(options) {
    if (options.color) options.color = fixColor(options.color);
    // pixelSize: number
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // show: boolean
    if (options.scaleByDistance) options.scaleByDistance = fixScaleByDistance(options.scaleByDistance);
    if (options.translucencyByDistance) options.translucencyByDistance = fixTranslucencyByDistance(options.translucencyByDistance);
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    // disableDepthTestDistance: number
    return options;
}

function fixPolygonOptions(options) {
    if (options.hierarchy) options.hierarchy = fixHierarchy(options.hierarchy);
    // height: number
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    if (options.extrudedHeight) options.extrudedHeight = fixExtrudedHeight(options.extrudedHeight);
    if (options.extrudedHeightReference) options.extrudedHeightReference = fixExtrudedHeight(option.extrudedHeightReference);
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixMaterialProperty(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // stRotation: number
    if (options.granularity) options.granularity = fixGranularity(options.granularity);
    // perPositionHeight: boolean
    // closeTop: boolean
    // closeBottom: boolean
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    if (options.classificationType) options.classificationType = fixClassificationType(options.classificationType);
    if (options.arcType) options.arcType = fixArcType(options.arcType);
    // zIndx: number

    return options;
}

function fixExtrudedHeight(key) {
    return fixCommonDefinition(Cesium.HeightReference)(key.toUpperCase());
}

function fixHierarchy(option) {
    if (option.positions) option.positions = fixPositions(option.positions);
    // holes:
    return option;
}

function fixMaterialProperty(options) {
    if (typeof options === 'string') {
        return fixColor(options);
    } else if (typeof options === 'object' && !(options instanceof Cesium.MaterialProperty)) {
        if (options.color) options.color = fixColor(options.color);
        if (options.evenColor) options.evenColor = fixColor(options.evenColor);
        if (options.oddColor) options.oddColor = fixColor(options.oddColor);
        if (options.cellAlpha) parseFloat(options.cellAlpha) > 0 && parseFloat(options.cellAlpha) < 1 ? (options.cellAlpha = options.cellAlpha) : (options.cellAlpha = null);
        if (options.lineCount) options.lineCount = fixCartesian2(options.lineCount);
        if (options.lineThickness) options.lineThickness = fixCartesian2(options.lineThickness);
        if (options.lineOffset) options.lineOffset = fixCartesian2(options.lineOffset);
        if (options.image) options.image = typeof options.image === 'string' ? options.image : null;
        if (options.repeat) options.repeat = options.type.toUpperCase() === 'STRIPE' ? options.repeat : fixCartesian2(options.repeat);
        if (options.gapColor) options.gapColor = fixColor(options.gapColor);
        if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
        if (options.orientation) options.orientation = fixCommonDefinition(Cesium.StripeOrientation)(options.orientation.toUpperCase());

        switch (options.type.toUpperCase()) {
            case 'COLOR':
                return new Cesium.ColorMaterialProperty(options.color || null);
            case 'CHECKERBOARD':
                return new Cesium.CheckerboardMaterialProperty(options);
            case 'COMPOSITE':
                return new Cesium.CompositeMaterialProperty();
            case 'GRID':
                return new Cesium.GridMaterialProperty(options);
            case 'IMAGE':
                return new Cesium.ImageMaterialProperty(options);
            case 'POLYLINEARROW':
                return new Cesium.PolylineArrowMaterialProperty(options.color || null);
            case 'POLYLINEDASH':
                return new Cesium.PolylineDashMaterialProperty(options);
            case 'POLYLINEGLOW':
                return new Cesium.PolylineGlowMaterialProperty(options);
            case 'POLYLINEOUTLINE':
                return new Cesium.PolylineOutlineMaterialProperty(options);
            case 'STRIPE':
                return new Cesium.StripeMaterialProperty(options);
            case 'GUIDEPATH':
                {
                    return new Cesium.PolylineGuidePathMaterialProperty(options);
                }
        }
    }
    return null;
}

function fixArcType(key) {
    return fixCommonDefinition(Cesium.ArcType)(key.toUpperCase());
}

function fixPolylineOptions(options) {
    if (options.positions) options.positions = fixPositions(options.positions);
    if (options.arcType) options.arcType = fixArcType(options.arcType);
    if (options.material) options.material = fixMaterialProperty(options.material);
    if (options.depthFailMaterial) options.depthFailMaterial = fixMaterialProperty(options.depthFailMaterial);
    if (options.granularity) options.granularity = fixGranularity(options.granularity);
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    if (options.classificationType) options.classificationType = fixClassificationType(options.classificationType);
    return options;
}

function fixGranularity(key) {
    // eslint-disable-next-line no-tabs
    return fixCommonDefinition(Cesium.Math)(key.toUpperCase());
}

export default { genEntity, };