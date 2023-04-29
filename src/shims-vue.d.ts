import Vue from 'vue'
import type { DeviceProviderValue } from '@/shared/lib/providers/device'

declare module '*.vue' {
    // @ts-ignore

    export default Vue
}

declare module 'vue/types/vue' {
    interface Vue {
        $device: DeviceProviderValue
        $scrollLock: {
            disablePageScroll: () => void
            enablePageScroll: () => void
            addFillGapTarget: (element: HTMLElement) => void
            setFillGapMethod: (method: 'margin' | 'padding') => void
        }
    }
}
