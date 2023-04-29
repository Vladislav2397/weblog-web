import type { RouteConfig } from 'vue-router'
import Home from '@/pages/Home/Home.vue'

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/articles',
        name: 'Articles',
        component: () => import('@/pages/Articles/Articles.vue'),
    },
    {
        path: '/articles/:id',
        name: 'Article',
        component: () => import('@/pages/Article/Article.vue'),
    },
    {
        path: 'not-found',
        name: 'not-found',
        component: () => import('@/pages/NotFound/NotFound.vue'),
    },
    {
        path: '*',
        redirect: '/',
    },
]

export default routes
