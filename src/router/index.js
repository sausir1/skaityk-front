// import Home from './views/Home'
import VueRouter from 'vue-router'

export const routes = [
    {
        path: '/',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/auth',
        component: () => import('./views/Profile.vue')
    },
    {
        path: '/authors',
        component: () => import('./views/Authors.vue'),
    },
    {
        path: '/authors/:id',
        component: () => import('./views/SingleAuthor.vue'),
    },
    {
        name: "single-book",
        path: '/authors/:id/books/:sl',
        component: () => import('./views/SingleBook.vue'),
    },
]
export default new VueRouter({
    linkActiveClass: 'active-link',
    routes
})

