import Vue from 'vue'
import Vuex, { type Store, type StoreOptions } from 'vuex'

Vue.use(Vuex)

export type StateRoot = {}

const store: StoreOptions<StateRoot> = {
    modules: {},
}

function createStore(): Store<StateRoot> {
    return new Vuex.Store<StateRoot>(store)
}

export default createStore
