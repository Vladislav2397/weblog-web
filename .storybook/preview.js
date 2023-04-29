import '../src/app/styles/critical.scss'
import '../src/app/styles/main.scss'
import '../src/app/styles/utility/animations.scss'

import createRouter from '../src/app/providers/router'

import Vue from 'vue'
import clickOutside from '../src/shared/lib/directives/click-outside'
import lazysizesDirective from '../src/shared/lib/directives/lazysizes'
import 'lazysizes'
import 'lazysizes/plugins/blur-up/ls.blur-up'
import RouterLink from './RouterLink.vue'
import {provideFunc} from './libs/stories-utils'

Vue.directive('click-outside', clickOutside)
Vue.directive('lazysizes', lazysizesDirective)

Vue.component('router-link', RouterLink)

export const decorators = [
    story => ({
        components: { story },
        router: createRouter(),
        ...provideFunc(),
        template: '<story />'
    })
]

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    viewport: {
        viewports: {
            mobile: {
                name: 'Mobile 320px',
                type: 'mobile',
                styles: {
                    width: '320px',
                    height: '600px'
                }
            },
            tablet: {
                name: 'Tablet 650px',
                type: 'tablet',
                styles: {
                    width: '650px',
                    height: '600px'
                }
            },
            tabletLate: {
                name: 'Tablet Late 768px',
                type: 'tablet',
                styles: {
                    width: '768px',
                    height: '600px'
                }
            },
            desktop: {
                name: 'Desktop 1200px',
                type: 'desktop',
                styles: {
                    width: '1200px',
                    height: '600px'
                }
            }
        }
    }
}
