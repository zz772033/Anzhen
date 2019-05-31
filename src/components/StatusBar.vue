<template>
    <div class="ae-status-bar">
        <div style="float: right;">
            <span> 经度: {{ position.longitude.toFixed(6) }}</span>
            <span> 纬度: {{ position.latitude.toFixed(6) }}</span>
            <span v-if="viewer && viewer.terrainProvider && viewer.terrainProvider.credit"> 海拔: {{ position.height.toFixed(3) }}</span>
            <span> 视点高度: {{ position.vpheight.toFixed(3) }}</span>
        </div>
    </div>
</template>

<script>
import Mixin from '../js/aeMixin';

export default {
    name: 'StatusBar',
    mixins: [Mixin],
    data() {
        return {
            position: { longitude: 0.0, latitude: 0.0, height: 0.0, vpheight: 0.0 },
        };
    },
    mounted() {
        let self = this;
        for (let i = 0; i < this.$store.state.global.viewers.length; ++i) {
            let viewer = this.$store.state.global.viewers[i]; if (!viewer) continue;
            let canvas = viewer.canvas; if (!canvas) continue;

            let camera = viewer.camera;
            if (camera) {
                viewer.camera.changed.addEventListener((percentageChanged) => {
                    let positionCartographic = camera.positionCartographic;
                    if (positionCartographic) self.position.vpheight = camera.positionCartographic.height;

                    let scene = viewer.scene; if (!scene) return;
                    let globe = scene.globe; if (!globe) return;
                    let ellipsoid = globe.ellipsoid; if (!ellipsoid) return;
                    let cartesian = camera.pickEllipsoid(new Cesium.Cartesian2(canvas.clientWidth / 2, canvas.clientHeight / 2)); if (!cartesian) return;
                    let cartographic = ellipsoid.cartesianToCartographic(cartesian); if (!cartographic) return;
                    self.position.longitude = Cesium.Math.toDegrees(cartographic.longitude);
                    self.position.latitude = Cesium.Math.toDegrees(cartographic.latitude);
                    self.position.height = cartographic.height;
                });
            }

            let handler = new Cesium.ScreenSpaceEventHandler(canvas);
            if (handler) {
                handler.setInputAction(function (movement) {
                    let scene = viewer.scene; if (!scene) return;
                    let globe = scene.globe; if (!globe) return;
                    let ellipsoid = globe.ellipsoid; if (!ellipsoid) return;
                    let camera = viewer.camera; if (!camera) return;
                    let positionCartographic = camera.positionCartographic;
                    if (positionCartographic) self.position.vpheight = camera.positionCartographic.height;
                    let cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid); if (!cartesian) return;
                    let cartographic = ellipsoid.cartesianToCartographic(cartesian); if (!cartographic) return;
                    self.position.longitude = Cesium.Math.toDegrees(cartographic.longitude);
                    self.position.latitude = Cesium.Math.toDegrees(cartographic.latitude);
                    self.position.height = cartographic.height;
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

                handler.setInputAction(function (wheelment) {
                    let camera = viewer.camera; if (!camera) return;
                    let positionCartographic = camera.positionCartographic; if (!positionCartographic) return;
                    self.position.vpheight = camera.positionCartographic.height;
                }, Cesium.ScreenSpaceEventType.WHEEL);
            }
        }
    }
};
</script>

<style>
.ae-status-bar {
    position: absolute;
    z-index: 700;
    padding: 4px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    color: #ffffff;
    background-color: #00000040;
}
</style>
