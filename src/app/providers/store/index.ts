import Vue from 'vue'
import Vuex, { type Store, type StoreOptions } from 'vuex'
import { getArticle, getArticles } from '@/shared/api'

Vue.use(Vuex)

export type StateRoot = {}

const store: StoreOptions<StateRoot> = {
    modules: {
        articles: {
            namespaced: true,
            state: () => ({
                list: [],
                active: null
            }),
            getters: {
                list(state) {
                    return state.list
                },
                active(state) {
                    return state.active
                }
            },
            mutations: {
                updateList(state, list) {
                    state.list = list
                },
                updateActive(state, active) {
                    state.active = active
                }
            },
            actions: {
                async fetch({ commit }) {
                    try {
                        const { data } = await getArticles()

                        console.log('response', data)
                        commit('updateList', data)
                    } catch (error) {
                        console.log('fail fetch getArticles')
                        console.error(error)
                    }
                },
                async fetchItem({ commit }, id) {
                    const { article } = await getArticle(id)

                    commit('updateActive', article)
                }
            },
        },
    },
}

function createStore(): Store<StateRoot> {
    return new Vuex.Store<StateRoot>(store)
}

export default createStore
