import Vue from 'vue';
import iView from 'iview';

import API from './js/aeApi';
import Mixin from './js/aeMixin';
// import Router from './js/aeRouter';
import Store from './js/aeStore';

import App from './components/App';

import 'iview/dist/styles/iview.css';
import './css/aeStyles.css';

Vue.use(iView);
Vue.config.productionTip = false;

export function mount(target, configs) {
    return new Vue({
        el: target,
        // router: Router,
        store: Store(configs),
        mixins: [Mixin, API],
        data() {
            return {
                bus: new Vue()
            };
        },
        // render: h => h('router-view')
        render: h => h(App)
    });
}