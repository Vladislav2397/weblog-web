import Vue from 'vue'
import createApp from './app'
import '../../public/libs/scrollLockPoly'
import cssVars from 'css-vars-ponyfill'

// import './../../public/libs/requestAnimationFramePolyfill'
// import './../../public/libs/polyfill-promise-find-findIndex-isNan'

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options

        if (asyncData) {
            asyncData({
                store: this.$store,
                router: this.$router,
                route: to,
            })
                .then(next)
                .catch(next)
        } else {
            next()
        }
    },
})

const { app, store, router } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c)
        })

        const asyncDataHooks = activated
            .map(c => {
                return c.options?.methods?.asyncData
            })
            .filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }

        // bar.start()
        Promise.all(
            asyncDataHooks.map(hook => {
                return hook({ store, route: to, router })
            }),
        )
            .then(() => {
                // bar.finish()
                next()
            })
            .catch(next)
    })

    // actually mount to DOM
    app.$mount('#app')
})

if (window.location.protocol === 'https:' && navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js')
}

cssVars({
    // Targets
    rootElement: document,
    shadowDOM: true,

    // Sources
    include: 'link[rel=stylesheet],style',
    exclude: '',
    variables: {},

    // Options
    onlyLegacy: true,
    preserveStatic: true,
    preserveVars: false,
    silent: false,
    updateDOM: true,
    updateURLs: true,
    watch: false,
})
