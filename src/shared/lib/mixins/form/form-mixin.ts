import { Component, Inject, Ref, Vue } from 'vue-property-decorator'
import { DeviceProviderValue } from '@/shared/lib/providers/device'
import { Maybe } from '@/shared/types/helpers'

@Component
export default class FormMixin extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Ref('form') formRef!: HTMLElement

    isSend = false
    height: Maybe<string> = null

    setIsSend(value: boolean) {
        this.isSend = value
        this.setHeight()
    }

    setHeight() {
        this.height = `${this.formRef?.getBoundingClientRect().height}px`
    }
}
