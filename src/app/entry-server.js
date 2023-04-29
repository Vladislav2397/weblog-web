import createApp from './app'

export default context =>
    new Promise(async (resolve, reject) => {
        const { app, router } = createApp()

        const { url } = context
        const { fullPath } = router.resolve(url).route

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }

        router.push(url).catch(error => {
            if (error.name !== 'NavigationDuplicated') {
                throw error
            }
        })

        router.onReady(() => {
            resolve(app)
        }, reject)
    })
