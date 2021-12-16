import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
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