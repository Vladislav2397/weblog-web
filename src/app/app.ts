import 'lazysizes'
import 'lazysizes/plugins/blur-up/ls.blur-up'
import Vue from 'vue'

import { providers } from '../shared/lib'
import getOs from '../shared/lib/utils/other/getOs'

import App from './App.vue'

import createRouter from './providers/router'
import createStore from './providers/store'

const scrollLock = () =>
    import(
        /* webpackChunkName: "chunks/scroll-lock" */
        'scroll-lock'
    )

scrollLock().then(response => {
    Vue.prototype.$scrollLock = response.default
})

Vue.prototype.$os = getOs()

Vue.mixin({
    inject: {
        $device: {
            default: { size: { desktop: false, tablet: false, maxMobile: true } },
            from: '$device',
        }
    }
})

export default function createApp() {
    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        name: 'App',
        router,
        store,
        mixins: [providers.DeviceProvider],
        render: h => h(App),
    })

    return { app, router, store }
}
