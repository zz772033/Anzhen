<template>
    <div class="ae-cesium-viewer">
    </div>
</template>

<script>
import Mixin from '../js/aeMixin';
import ImageryManager from '../js/aeImageryManager';

export default {
    name: 'CesiumViewer',
    mixins: [Mixin],
    data() {
        return {
            newViewer: null
        };
    },
    mounted() {
        this.newViewer = new Cesium.Viewer(this.$el, this.configs.viewer);
        this.newViewer._cesiumWidget._creditContainer.style.display = 'none';

        if (this.configs) {
            if (this.newViewer.scene.imageryLayers) {
                let imageries = this.configs.imageries;
                if (imageries && Array.isArray(imageries)) {
                    this.newViewer.scene.imageryLayers.removeAll(true);
                    imageries.slice().reverse().forEach((imagery, index) => {
                        if (!imagery.load) return;
                        ImageryManager.addImagery(this.newViewer, ImageryManager.genImageryFromObject(imagery));
                    });
                }
            }
        }

        if (!this.viewer) {
            if (this.configs) {
                let vp = this.configs.viewpoint;
                if (vp) {
                    if (vp.position && vp.orientation) this.newViewer.camera.flyTo({ destination: vp.position, orientation: vp.orientation, duration: vp.duration || Number.MIN_VALUE });
                    else if (vp.longitude && vp.latitude && vp.range) this.newViewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(vp.longitude, vp.latitude, vp.range), duration: vp.duration || Number.MIN_VALUE });
                }
            }
            this.$store.commit('global/setViewer', this.newViewer);
        } else {
            this.newViewer.camera.direction = this.viewer.camera.direction;
            this.newViewer.camera.position = this.viewer.camera.position;
            this.newViewer.camera.right = this.viewer.camera.right;
            this.newViewer.camera.up = this.viewer.camera.up;
        }
        this.$store.commit('global/addViewer', this.newViewer);
    },
    beforeDestroy() {
        this.$store.commit('global/delViewer', this.newViewer);
    }
};
</script>

<style>
.ae-cesium-viewer {
    width: 100%;
    height: 100%;
}
</style>
