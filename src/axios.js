import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://www.raganaitedoli.lt/api/',
    timeout: 3000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    }
})


export default {
    install(Vue) {
        Vue.prototype.$axios = axiosInstance
    }
}