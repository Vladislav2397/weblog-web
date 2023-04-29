import type { RouteConfig } from 'vue-router'
import Home from '@/pages/Home/Home.vue'

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: 'not-found',
        name: 'not-found',
        component: () => import('@/pages/NotFound/NotFound.vue')
    },
    {
        path: '*',
        redirect: '/',
    },
]


export default routes

