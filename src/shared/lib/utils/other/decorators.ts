import { mapActions, mapGetters, mapState } from 'vuex'
import { createDecorator } from 'vue-class-component'

export const State = createDecoratorFactory('computed', mapState)
export const Getter = createDecoratorFactory('computed', mapGetters)
export const Action = createDecoratorFactory('methods', mapActions)

function createDecoratorFactory(
    optionsKey: 'computed' | 'methods',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapFn: any,
) {
    return (storeKey: string) =>
        createDecorator((options, key) => {
            const mapObject = { [key]: storeKey }

            if (typeof options[optionsKey] === 'undefined') {
                // eslint-disable-next-line no-param-reassign
                options[optionsKey] = {}
            }

            if (typeof options[optionsKey]![key] !== 'undefined') {
                return
            }

            // eslint-disable-next-line no-param-reassign
            options[optionsKey]![key] = mapFn(mapObject)[key]
        })
}
