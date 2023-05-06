import type { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackMode: "lazy", webpackChunkName: "routes/home" */'@/pages/Home/Home.vue'),
    },
    {
        path: '/articles',
        name: 'Articles',
        component: () => import(/* webpackMode: "lazy", webpackChunkName: "routes/articles" */'@/pages/Articles/Articles.vue'),
    },
    {
        path: '/articles/:id',
        name: 'Article',
        component: () => import(/* webpackMode: "lazy", webpackChunkName: "routes/article" */'@/pages/Article/Article.vue'),
    },
    {
        path: '/not-found',
        name: 'NotFound',
        component: () => import(/* webpackMode: "lazy", webpackChunkName: "routes/not-found" */ '@/pages/NotFound/NotFound.vue'),

    },
    {
        path: '*',
        redirect: {
            name: 'NotFound'
        },
    },
]

export default routes
