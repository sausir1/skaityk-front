import Vue from "vue"

const eventBus = new Vue();

export default {
    install(Vue) {
        Vue.prototype.$eventBus = eventBus

        eventBus.confirm = () => {
            return new Promise(resolve => {
                eventBus.$emit('modal-open', { component: null, title: null })

                eventBus.$on('confirm-answer', answer => {
                    resolve(answer)
                })
            })
        }
    }
}