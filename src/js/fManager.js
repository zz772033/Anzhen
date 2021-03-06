export default fixFeature;
function fixCommonDefinition(definition) {
    return key => {
        if (!definition || typeof definition !== 'object') return null;
        if (!definition.hasOwnProperty(key)) return null;
        return definition[key];
    };
}

function fixJulianDate(date) {
    return Cesium.JulianDate.fromDate(date);
}

function fixArray(arr) {
    return Array.isArray(arr) ? arr : null;
}

function fixFeature(options) {
    // id: string
    // name: string
    if (options.availability) options.availability = fixAvailability(options.availability);
    // show: boolean
    // description: string
    if (options.position) options.position = fixPosition(options.position);
    if (options.orientation) options.orientation = fixOrientation(options.position, options.orientation);
    if (options.viewFrom) options.viewFrom = fixViewFrom(options.position, options.viewFrom);
    // parent: entity;
    if (options.billboard) options.billboard = fixBillboard(options.billboard);
    if (options.box) options.box = fixBox(options.box);
    if (options.corridor) options.corridor = fixCorridor(options.corridor);
    if (options.cylinder) options.cylinder = fixCylinder(options.cylinder);
    if (options.ellipse) options.ellipse = fixEllipse(options.ellipse);
    if (options.ellipsoid) options.ellipsoid = fixEllipsoid(options.ellipsoid);
    if (options.label) options.label = fixLabel(options.label);
    if (options.model) options.model = fixModel(options.model);
    // if (options.path) options.path = fixPath(options.path);
    if (options.plane) options.plane = fixPlane(options.plane);
    if (options.point) options.point = fixPoint(options.point);
    if (options.polygon) options.polygon = fixPolygon(options.polygon);
    if (options.polyline) options.polyline = fixPolyline(options.polyline);
    if (options.properties) options.properties = fixProperties(options.properties);
    if (options.polylineVolume) options.polylineVolume = fixPolylineVolume(options.polylineVolume);
    if (options.rectangle) options.rectangle = fixRectangle(options.rectangle);
    if (options.wall) options.wall = fixWall(options.wall);
    return options;
}

function fixAvailability(options) {
    if (!Array.isArray(options)) return null;
    return options.map(ti => fixTimeInterval(ti));
}

function fixTimeInterval(options) {
    if (options.start) return fixJulianDate(options.start);
    if (options.stop) return fixJulianDate(options.stop);
    // isStartIncluded: boolean
    // isStopIncluded: boolean
    // data: Object
    return new Cesium.TimeInterval(options);
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

function fixViewFrom(position, viewfrom) {
    return fixOrientation(position, viewfrom);
}

function fixBillboard(options) {
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

f

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

function fixHeightReference(key) {
    return fixCommonDefinition(Cesium.HeightReference)(key.toUpperCase());
}


function fixDistanceDisplayCondition(option) {
    return option instanceof Cesium.DistanceDisplayCondition ? option : new Cesium.DistanceDisplayCondition(option.near, option.far);
}

function fixBox(options) {
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

function fixCylinder(options) {
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    // length: number;
    // topRadius: number
    // bottomRadius: number
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixColor(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // numberOfVerticalLines: number
    // slices: number
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    return options;
}

function fixEllipse(options) {
    // semiMajorAxis
    // semiMinorAxis
    // height: number
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    // extrudedHeight
    // extrudedHeightReference
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixColor(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // numberOfVerticalLines: number
    // rotation: number
    // stRotation: number
    // granularity: number
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    if (options.classificationType) options.classificationType = fixClassificationType(options.classificationType);
    // zIndex: number
    return options;
}

function fixEllipsoid(options) {
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    if (options.radii) options.radii = fixCartesian3(options.radii);
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixColor(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // subdivisions: number
    // stackPartitions: number
    // slicePartitions: number
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    return options;
}

function fixLabel(options) {
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

function fixModel(options) {
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

function fixPlane(options) {
    if (options.plane) options.plane = fixPlaneNormal(options.plane);
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

function fixPlaneNormal(option) {
    if (option.normal) option.normal = fixCartesian3(option.normal);
    // distance: number
    return option;
}
function fixColor(option) {
    return typeof option === 'string' ? Cesium.Color.fromCssColorString(option) : null;
}
function fixPoint(options) {
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

function fixPolygon(options) {
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
                options.repeat = options.repeat;
            } else if (options.type === 'Fade' && typeof options.repeat === 'boolean') {
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
        if (options.channel) ['r', 'g', 'b', 'a'].indexOf(options.channel.toLowerCase()) !== -1 ? (options.channel = options.channel.toLowerCase()) : (options.channels = null);
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
            case 'GUIDEPATH': {
                return new Cesium.PolylineGuidePathMaterialProperty(options);
            }
        }
    }
    return null;
}

function fixArcType(key) {
    return fixCommonDefinition(Cesium.ArcType)(key.toUpperCase());
}

function fixPolyline(options) {
    if (options.positions) options.positions = fixPositions(options.positions);
    if (options.arcType) options.arcType = fixArcType(options.arcType);
    // clampToGround: boolean
    // width: number
    // show: boolean
    if (options.material) options.material = fixMaterialProperty(options.material);
    if (options.depthFailMaterial) options.depthFailMaterial = fixMaterialProperty(options.depthFailMaterial);
    if (options.granularity) options.granularity = fixGranularity(options.granularity);
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    if (options.classificationType) options.classificationType = fixClassificationType(options.classificationType);
    // zindex: number
    return options;
}
function fixGranularity(key) {
    return fixCommonDefinition(Cesium.Math)(key.toUpperCase());
}

function fixProperties(option) {
    if (option.value) option.value = fixValue(option.value);
    if (option.createPropertyCallback) option.createPropertyCallback = fixCreatePropertyCallback(option.createPropertyCallback);
    return option;
}c

function fixValue(value) {
    return typeof value === 'object' && !Array.isArray(value) ? value : null;
}



function fixCreatePropertyCallback(fun) {
    return typeof fun === 'function' ? fun : null;
}

function fixPolylineVolume(options) {
    if (options.positions) options.positions = fixPositions(options.positions);
    if (option.shape) options.shape = fixShape(options.shape);
    if (options.cornerType) options.cornerType = fixCornerType(options.cornerType);
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixMaterialProperty(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // granularity: property
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    return options;
}

function fixShape(arr) {
    if (!Array.isArray(arr)) return null;
    arr.map(item => {
        return fixCartesian2(item);
    });
    return arr;
}

function fixRectangle(options) {
    if (options.coordinates) options.coordinates = fixCoordinates(options.coordinates);
    // height: number
    if (options.heightReference) options.heightReference = fixHeightReference(options.heightReference);
    // extrudedHeight: number
    // extrudedHeightReference
    // show: boolean
    // fill: boolean
    if (options.material) options.material = fixMaterialProperty(options.material);
    // outline: boolean
    if (options.outlineColor) options.outlineColor = fixColor(options.outlineColor);
    // outlineWidth: number
    // rotation: number
    // stRotation: number
    // granularity: number
    if (options.shadows) options.shadows = fixShadows(options.shadows);
    if (options.distanceDisplayCondition) options.distanceDisplayCondition = fixDistanceDisplayCondition(options.distanceDisplayCondition);
    if (options.classificationType) options.classificationType = fixClassificationType(options.classificationType);
    // zIndex: number
    return options;
}

function fixCoordinates(option) {
    return option instanceof Cesium.Rectangle ? option : new Cesium.Rectangle(option.west, option.south, option.east, option.north);
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
