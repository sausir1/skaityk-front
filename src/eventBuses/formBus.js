import Vue from "vue";

const formBus = new Vue();

export default {
    install(Vue) {
        Vue.prototype.$formBus = formBus
    }
}
