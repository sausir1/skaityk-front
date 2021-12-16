import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store/store'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from './axios'
import eventBus from './eventBuses/eventBus'
import formBus from './eventBuses/formBus'


import ApiForm from './components/Form/ApiForm.vue'
import FormItem from './components/Form/FormItem.vue'
// import GlobalNotification from './components/layout/GlobalNotification.vue'
import DataTable from './components/layout/DataTable.vue'
import FormItemSelect from './components/Form/FormitemSelect.vue'

Vue.component('ApiForm', ApiForm)
Vue.component('FormItem', FormItem)
Vue.component('FormItemSelect', FormItemSelect)
Vue.component('DataTable', DataTable)
// Vue.component('GlobalNotification', GlobalNotification)


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(axios)
Vue.use(eventBus)
Vue.use(formBus)


const app = new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

app.$axios.interceptors.request.use(request => {
  if (app.$store.getters.loggedIn) {
    const token = app.$store.getters.token
    request.headers.common.Authorization = `Bearer ${token}`
  }
  return request
})