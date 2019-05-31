import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    // mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'App',
            component: () => import(/* webpackChunkName: "App" */ '../components/App.vue')
        }
    ]
});
