import { Languages } from '../entities/content'

/**
 * @param store {Store}
 * @param router {VueRouter}
 * @param cookieObj {Record<string, string>}
 * @returns {Promise<void>}
 */
export async function init(store, router, cookieObj) {
    const lang =
        router.currentRoute.params.lang || cookieObj.lang || Languages.RUSSIAN

    await store.dispatch('content/changeActive', lang)
}
