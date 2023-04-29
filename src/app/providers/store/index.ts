import Vue from 'vue'
import Vuex, { type Store, type StoreOptions } from 'vuex'
import { getArticles } from '@/shared/api'

Vue.use(Vuex)

export type StateRoot = {}

const store: StoreOptions<StateRoot> = {
    modules: {
        articles: {
            namespaced: true,
            state: () => ({
                list: [],
            }),
            getters: {
                list(state) {
                    return state.list
                },
            },
            mutations: {
                updateList(state, list) {
                    state.list = list
                },
            },
            actions: {
                async fetch({ commit }) {
                    const { data } = await getArticles()

                    console.log('response', data)
                    commit('updateList', data)
                },
            },
        },
    },
}

function createStore(): Store<StateRoot> {
    return new Vuex.Store<StateRoot>(store)
}

export default createStore
