<template>
    <i-button @click="setViewCount" icon="ios-desktop">{{viewCount}}</i-button>
</template>

<script>
import Mixin from '../js/aeMixin';
export default {
    name: 'MultiView',
    mixins: [Mixin],
    computed: {
        viewCount() {
            const infos = ['无', '单', '双', '三', '四', '五', '六', '七', '八', '九'];
            return infos[this.$store.state.global.total] + '屏';
        }
    },
    methods: {
        setViewCount() {
            this.$store.commit('global/setTotal', this.$store.state.global.total === 1 ? 2 : 1);
        }
    }
};
</script>

<style>
</style>
