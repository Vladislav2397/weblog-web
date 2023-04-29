import createApp from './app'
import '../../public/libs/scrollLockPoly'
import cssVars from 'css-vars-ponyfill'

import './../../public/libs/requestAnimationFramePolyfill'
import './../../public/libs/polyfill-promise-find-findIndex-isNan'

const { app, store, router } = createApp()

router.onReady(() => {
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
