import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loggedIn: false,
        userInfo: {},
        token: '',
        can: {
            authors: false,
            books: false,
            comments: false,
            user: false
        }
    },
    mutations: {
        login(state, info) {
            state.loggedIn = true
            state.token = info.token
            state.userInfo = info.user
            state.can = {
                authors: !!info.user.is_admin,
                books: !!info.user.is_admin,
                comments: true,
                user: true
            }
        },
        userInfo(state, info) {
            state.userInfo = info
        },
        token(state, token) {
            state.token = token
        },
        loggedIn(state, value) {
            state.loggedIn = value
        },
        logout(state) {
            state.userInfo = {}
            state.token = {}
            state.loggedIn = false
            state.can = {
                authors: false,
                books: false,
                comments: false,
                user: false
            }
        }
    },
    getters: {
        token: state => {
            return state.token
        },
        loggedIn: state => {
            return state.loggedIn
        },
        userInfo: state => {
            return state.userInfo
        }
    }
})
