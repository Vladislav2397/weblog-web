import createApp from './app'

const isProd = process.env.NODE_ENV === 'production'

export default context =>
    new Promise(async (resolve, reject) => {
        const s = !isProd && Date.now()
        const { app, store, router } = createApp()

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
            const matchedComponents = router.getMatchedComponents()

            // no matched routes
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            console.log('route', router.currentRoute.path)

            // Call fetchData hooks on components matched by the route.
            // A preFetch hook dispatches a store action and returns a Promise,
            // which is resolved when the action is complete and store state has been
            // updated.
            Promise.all(
                matchedComponents.map(component => {
                    console.log(
                        'server method async data',
                        component.sealedOptions?.methods?.asyncData,
                    )
                    return (
                        component.sealedOptions?.methods?.asyncData &&
                        component.sealedOptions.methods
                            .asyncData({
                                store,
                                router,
                                route: router.currentRoute,
                            })
                            .then(() => {
                                console.log('server resolve async data hook')
                            })
                            .catch(() => {
                                console.log('server reject async data hook')
                            })
                    )
                }),
                // matchedComponents.map(({ asyncData }) => {
                //     return (
                //         asyncData &&
                //         asyncData({
                //             store,
                //             router,
                //             route: router.currentRoute,
                //         })
                //     )
                // }),
            )
                .then(() => {
                    !isProd &&
                        console.log(`data pre-fetch: ${Date.now() - s}ms`)

                    // After all preFetch hooks are resolved, our store is now
                    // filled with the state needed to render the app.
                    // Expose the state on the render context, and let the request handler
                    // inline the state in the HTML response. This allows the client-side
                    // store to pick-up the server-side state without having to duplicate
                    // the initial data fetching on the client.
                    context.state = store.state
                    resolve(app)
                })
                .catch(reject)
        }, reject)
    })
