import Vue from 'vue';
import Vuex from 'vuex';

import Defaults from './aeDefaults';
import { cloneObject, mergeObject } from './aeUtils';

Vue.use(Vuex);

export default function(configs) {
    let defaults = cloneObject(Defaults);
    if (typeof configs === 'object') mergeObject(defaults, configs);

    return new Vuex.Store({
        modules: {
            global: {
                namespaced: true,
                state: {
                    configs: defaults,
                    viewer: null,
                    viewers: [],
                    total: 1
                },
                getters: {
                    numViewers: state => {
                        return state.viewers.length;
                    }
                },
                mutations: {
                    setViewer: (state, viewer) => {
                        state.viewer = viewer;
                    },
                    addViewer: (state, viewer) => {
                        state.viewers.push(viewer);
                    },
                    delViewer: (state, viewer) => {
                        for (let i = 0; i < state.viewers.length; ++i) {
                            if (state.viewers[i] !== viewer) continue;
                            state.viewers.splice(i--, 1);
                            break;
                        }
                    },
                    setTotal: (state, num) => {
                        if (num > 0 && num < 10) state.total = num;
                    }
                },
                actions: {}
            }
        }
    });
}
