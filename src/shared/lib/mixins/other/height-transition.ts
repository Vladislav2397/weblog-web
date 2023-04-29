import {Component, Vue, Ref, VModel, Watch} from 'vue-property-decorator'
import {Maybe} from '../../../types/helpers'

@Component
export default class HeightTransition extends Vue {
    @Ref('content') contentRef!: HTMLDivElement

    @VModel() valueModel!: boolean

    isShowSlot = false

    isTransition = false

    styles = {
        maxHeight: null as null | string,
        transition: null as null | string,
    }

    readonly animationDuration = 233
    animationTimeout = {} as ReturnType<typeof setTimeout>

    toggleCollapse(): void {
        this.toggleValue()
        this.animateHeight()
    }

    toggleValue(): void {
        this.isShowSlot = !this.isShowSlot
    }

    setStyle(name: 'maxHeight' | 'transition', value: Maybe<string>): void {
        // @ts-ignore
        this.styles[name] = value
    }

    animateHeight(): void {
        clearTimeout(this.animationTimeout)
        this.isTransition = true
        this.setStyle('transition', `max-height ${this.animationDuration}ms ease`)

        const height = `${this.contentRef ? this.contentRef.getBoundingClientRect().height : 0}px`

        this.$nextTick(() => {
            this.setStyle('maxHeight', height)
            if (this.isShowSlot) {
                requestAnimationFrame(() => {
                    this.setStyle('maxHeight', `${this.contentRef.getBoundingClientRect().height}px`)
                })
            } else {
                requestAnimationFrame(() => {
                    this.setStyle('maxHeight', '0px')
                })
            }

            this.animationTimeout = setTimeout(() => {
                this.setStyle('maxHeight', null)
                this.setStyle('transition', null)
                this.isTransition = false
            }, this.animationDuration + 50)
        })
    }

    @Watch('valueModel')
    onChangeIsShowSlot(newValue: boolean): void {
        this.valueModel = newValue
    }

    created(): void {
        this.isShowSlot = this.valueModel
    }

    beforeDestroy(): void {
        clearTimeout(this.animationTimeout)
    }
}
