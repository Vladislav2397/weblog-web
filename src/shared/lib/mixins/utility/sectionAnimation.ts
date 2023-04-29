import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import { ScrollPositionProviderValue } from '@/shared/lib/providers/scroll-position'
import isAnyElementInViewport from '@/shared/lib/utils/other/isAnyElementInViewport'
import { Maybe } from '@/shared/types/helpers'
import { BrowserProviderValue } from '@/shared/lib/providers/browsers'

export type AnimationState = {
    ready: boolean
    complete: boolean
}

const completeSections: string[] = []

@Component
export default class SectionAnimation extends Vue {
    @Inject('$scroll') $scroll!: ScrollPositionProviderValue

    animation: AnimationState = {
        ready: false,
        complete: false,
    }

    animationContainer: Maybe<HTMLElement> = null

    timeout = {} as ReturnType<typeof setTimeout>

    startAnimation() {
        if (
            this.animation.ready &&
            this.animationContainer &&
            isAnyElementInViewport(this.animationContainer)
        ) {
            if (this.$vnode.componentOptions?.tag) {
                completeSections.push(this.$vnode.componentOptions?.tag)
            }
            this.$nextTick(() => {
                this.animation.complete = true
            })
            this.timeout = setTimeout(() => {
                this.animation.ready = false
                this.animation.complete = false
            }, this.animationTime)
        }
    }

    setAnimationContainer() {
        this.animationContainer = (this.$el.querySelector(
            '.animation-container',
        ) || this.$el) as HTMLElement
    }

    get animationTime(): number {
        throw new Error('you need implement animation time')
    }

    get isAnimationComplete(): boolean {
        return Boolean(
            this.$vnode.componentOptions?.tag &&
                !completeSections.includes(this.$vnode.componentOptions.tag),
        )
    }

    get animationClasses() {
        return {
            'animation-ready': this.animation.ready,
            'animation-complete': this.animation.complete,
        }
    }

    mounted() {
        if (this.isAnimationComplete) {
            this.setAnimationContainer()
            this.startAnimation()
        }
    }

    created() {
        if (this.isAnimationComplete) {
            this.animation.ready = true
        }
    }

    @Watch('$scroll.position')
    onScroll() {
        this.startAnimation()
    }
}
