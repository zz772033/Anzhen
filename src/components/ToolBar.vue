<template>
    <div class="ae-tool-bar">
        <i-button v-if="getValid('Test')" :type="getActive('Test') ? 'primary' : 'default'" @click="toggleActive('Test')" icon="logo-android">测试</i-button>
        <MultiView v-if="getValid('MultiView')" />
        <Test v-if="getValid('Test')" />
    </div>
</template>
<script>
import Mixin from '../js/aeMixin';
import MultiView from './MultiView';
import Test from './Test';

export default {
    name: 'ToolBar',
    components: {
        MultiView,
        Test
    },
    mixins: [Mixin],
};
</script>

<style>
.ae-tool-bar {
    position: absolute;
    z-index: 800;
    top: 10px;
    right: 10px;
    padding: 4px;
    display: flex;
    align-items: center;
}

.ae-tool-bar > .ivu-btn,
.ae-tool-bar > :not(.ivu-btn) > .ivu-btn:first-child,
.ae-tool-bar
    > :not(.ivu-btn)
    > :not(.ivu-btn):first-child
    > .ivu-btn:first-child,
.ae-tool-bar
    > :not(.ivu-btn)
    > :not(.ivu-btn):first-child
    > :not(.ivu-btn):first-child
    > .ivu-btn:first-child {
    border-radius: 0;
}
</style>
