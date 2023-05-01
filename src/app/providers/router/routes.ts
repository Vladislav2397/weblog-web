import type { RouteConfig } from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import Article from '@/pages/Article/Article.vue'

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
        component: Article,
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
