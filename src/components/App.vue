<template>
    <div class="ae-app">
        <i-row :style="style" style="float: left;">
            <i-col v-for="i in total" :key="i" :style="cellStyle">
                <CesiumViewer />
            </i-col>
        </i-row>
        <ToolBar v-if="getValid('ToolBar')" />
        <SideBar v-if="getValid('SideBar')" />
        <StatusBar v-if="getValid('StatusBar')" />
    </div>
</template>+

<script>
import Mixin from '../js/aeMixin';
import CesiumViewer from './CesiumViewer';
import ToolBar from './ToolBar';
import SideBar from './SideBar';
import StatusBar from './StatusBar';

function getRowCount(total) {
    switch (total) {
        case 1: case 2: return 1;
        case 3: case 4: case 5: case 6: return 2;
        case 7: case 8: case 9: return 3;
    }
    return 1;
}

function getColCount(total) {
    switch (total) {
        case 1: return 1;
        case 2: case 3: case 4: return 2;
        case 5: case 6: case 7: case 8: case 9: return 3;
    }
    return 1;
}

function onResize(target) {
    let w = target.$el.offsetWidth;
    let h = target.$el.offsetHeight;
    let t = target.total;
    target.cellStyle = {
        width: (100.0 / (w > h ? getColCount(t) : getRowCount(t))) + '%',
        height: (100.0 / (w > h ? getRowCount(t) : getColCount(t))) + '%',
        float: 'left'
    };
    target.timeoutHandle = null;
    target.event.$emit('resized');
}

export default {
    name: 'App',
    components: {
        CesiumViewer,
        ToolBar,
        SideBar,
        StatusBar
    },
    mixins: [Mixin],
    data() {
        return {
            timeoutHandle: null,
            style: {
                width: '100%',
                height: '100%'
            },
            cellStyle: {
                width: '100%',
                height: '100%',
                float: 'left'
            }
        };
    },
    computed: {
        total() {
            return this.$store.state.global.total;
        }
    },
    watch: {
        total() {
            onResize(this);
        }
    },
    mounted() {
        window.addEventListener('resize', () => { if (!this.timeoutHandle) this.timeoutHandle = setTimeout(onResize, 200, this); }, false);
    },
};
</script>

<style>
.ae-app {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000000;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    white-space: nowrap;
}
</style>
