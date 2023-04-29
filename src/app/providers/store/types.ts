import {Store} from "vuex";
import Router, {Route} from "vue-router";
import {StateRoot} from "@/app/providers/store/index";

export type ActionType<F> = F extends (state: infer S, payload: infer P) => infer R ? (payload: P) => Promise<R> : never
export type MutationType<F> = F extends (state: infer S, payload: infer P) => infer R ? (payload: P) => R : never

export type AsyncData = {
    store: Store<StateRoot>
    router: Router
    route: Route
}
