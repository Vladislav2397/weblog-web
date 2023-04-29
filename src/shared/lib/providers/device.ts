import { Component, Mixins, Provide } from 'vue-property-decorator'
import Resize from '@/shared/lib/mixins/utility/resize'
import { getDeviceBreakpoints } from '@/shared/lib/utils/other/getDeviceBreakpoints'

export type DeviceProviderValue = {
    size: {
        maxMobile: boolean
        maxMobileLate: boolean
        maxTablet: boolean
        tablet: boolean
        tabletLate: boolean
        desktop: boolean
    }
    type: {
        desktop: boolean
        mobile: boolean
    }
}

@Component
export default class DeviceProvider extends Mixins(Resize) {
    @Provide('$device') device: DeviceProviderValue = {
        size: {
            maxMobile: false,
            maxMobileLate: false,
            maxTablet: false,
            tablet: false,
            tabletLate: false,
            desktop: false,
        },
        type: {
            desktop: false,
            mobile: false,
        },
    }

    isMobile(): boolean {
        return Boolean(
            navigator.userAgent.match(
                /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i,
            ),
        )
    }

    mounted(): void {
        this.setSize()
        this.setType()
        this.addResizeWidthEvent(this.setSize)
    }

    beforeDestroy(): void {
        this.removeResizeWidthEvent()
    }

    setSize(): void {
        this.device.size = getDeviceBreakpoints()
    }

    setType(): void {
        this.device.type.desktop = !this.isMobile()
        this.device.type.mobile = this.isMobile()
    }
}
