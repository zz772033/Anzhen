<template>
    <div class="ae-side-bar">
        <div v-if="!active" @click="active = true" @mouseover="hover = true" @mouseout="hover = false" :style="{ height: '100%', 'background-color': hover ? 'rgba(255, 255, 255, 0.6)' : 'initial' }">
            <i-icon v-if="hover" type="ios-arrow-forward" size="24" />
            <i-icon v-else type="ios-arrow-back" size="24" style="color: #ffffff;" />
        </div>
        <i-drawer title="场景管理" placement="left" :closable="true" :mask="false" v-model="active" :width="320" class-name="sideBar_container">
            <i-button slot="close" size="small" type="primary" icon="md-close" @click="hover = false" />
            <i-tree :data="tree" @on-check-change="checkNodes" :render="renderContent" show-checkbox />
        </i-drawer>
    </div>
</template>

<script>
import Mixin from '../js/aeMixin';

export default {
    name: 'SideBar',
    mixins: [Mixin],
    data() {
        return {
            hover: false,
            buttonProps: {
                type: 'error',
                size: 'small',
            },
        };
    },
    computed: {
        imageries() {
            if (!this.viewer) return [];
            let imageries = [];
            let ils = this.viewer.scene.imageryLayers; if (!ils || ils.length === 0) return imageries;
            for (let i = ils.length - 1; i >= 0; --i) {
                let il = ils.get(i);
                if (il.type !== 'imagery') continue;
                imageries.push({
                    id: il.id,
                    title: il.name || '未命名',
                    expand: true,
                    checked: il.show,
                    type: 'imagery',
                    index: i
                });
            }
            return imageries;
        },
        tree() {
            return [
                {
                    title: '场景',
                    expand: true,
                    children: [
                        {
                            title: '影像',
                            expand: true,
                            children: this.imageries
                        }
                    ]
                }
            ];
        }
    },
    methods: {
        renderContent(h, { root, node, data }) {
            return h('span', {
                style: { cursor: 'pointer' },
                on: { click: () => { this.flyToNode(data); } }
            }, data.title);
        },
        checkNodes(nodes) {
            let ilVisibles = [];
            let ils = this.viewer.scene.imageryLayers;
            if (ils && ils.length > 0) {
                for (let i = 0; i < ils.length; ++i) ilVisibles.push(false);
                for (let node of nodes) if (node.type === 'imagery') if (node.index < ils.length) ilVisibles[node.index] = true;
                for (let i = 0; i < ils.length; ++i) if (ils.get(i).type === 'imagery') if (ils.get(i).show !== ilVisibles[i]) ils.get(i).show = ilVisibles[i];
            }
        }
    }
};
</script>

<style>
.ae-side-bar {
    position: absolute;
    z-index: 900;
    top: 0px;
    left: 0px;
    height: 100%;
}

.sideBar_container .ivu-drawer-content {
    color: #000000;
    font-weight: bold;
    text-shadow: 0px 0px 1px #ffffff;
    background-color: rgba(255, 255, 255, 0.6);
}
</style>
