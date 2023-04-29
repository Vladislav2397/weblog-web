import {Component, Provide, Vue} from 'vue-property-decorator'

import { detectIE } from '@/shared/lib/utils/other/detectIE'
import { detectFirefox } from '@/shared/lib/utils/other/detectFirefox'

export type BrowserProviderValue = {
    IE: boolean
    firefox: boolean
}
@Component
export default class IEProvider extends Vue {
    @Provide('$scroll') browsers: BrowserProviderValue = {
        IE: false,
        firefox: false,
    }

    mounted() {
        this.browsers.IE = detectIE()
        this.browsers.firefox = detectFirefox()
    }
}
