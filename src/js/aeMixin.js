import Vue from 'vue';

export default {
    computed: {
        debug() {
            return process.env.NODE_ENV === 'development';
        },
        configs() {
            return this.$store.state.global.configs;
        },
        event() {
            return this.$root.bus;
        },
        viewer() {
            return this.$store.state.global.viewer;
        },
        valid: {
            get() {
                return this.getComponent(this.$options.name).valid;
            },
            set(valid) {
                this.getComponent(this.$options.name).valid = valid;
            }
        },
        active: {
            get() {
                return this.getComponent(this.$options.name).active;
            },
            set(active) {
                this.getComponent(this.$options.name).active = active;
            }
        }
    },
    methods: {
        getComponent(name) {
            if (!this.configs) return { valid: true, active: true };
            let components = this.configs.components;
            if (!components) return { valid: true, active: true };
            let component = components[name];
            if (typeof component === 'object') return component;
            return Vue.set(components, name, {
                // valid: typeof component === 'boolean' ? component : this.debug,
                valid: typeof component === 'boolean' ? component : false,
                active: false
            });
        },
        getValid(name) {
            return this.getComponent(name).valid;
        },
        setValid(name, valid) {
            this.getComponent(name).valid = valid;
        },
        toggleValid(name) {
            this.getComponent(name).valid = !this.getComponent(name).valid;
        },
        getActive(name) {
            return this.getComponent(name).active;
        },
        setActive(name, active) {
            this.getComponent(name).active = active;
        },
        toggleActive(name) {
            this.getComponent(name).active = !this.getComponent(name).active;
        }
    }
};
