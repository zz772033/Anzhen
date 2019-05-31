<template>
    <i-modal v-model="active" :closable="false" title="configs">
        <textarea v-model="info" style="width: 100%; height: 400px;" readonly />
        <i-button slot="footer" type="primary" @click="active = false">确认</i-button>
    </i-modal>
</template>

<script>
import Mixin from '../js/aeMixin';

export default {
    name: 'Test',
    mixins: [Mixin],
    computed: {
        info() {
            return JSON.stringify(this.configs, null, 4);
        }
    }
};
</script>

<style>
</style>
