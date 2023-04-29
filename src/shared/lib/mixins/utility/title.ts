import { Component, Vue, Watch } from 'vue-property-decorator'

export type Meta = {
    title: string
    description: string
    shareImage: string
}

@Component
export default class MetaTitle extends Vue {
    vueEnv = process.env.VUE_ENV === 'server'

    meta: Meta = {
        title: '',
        description: '',
        shareImage: ''
    }

    getBrowser(vm: Vue): boolean {
        // @ts-ignore
        const { browser } = vm.$options
        if (browser) {
            return typeof browser === 'function'
                ? browser.call(vm)
                : browser
        }
        return false
    }

    setTitle(): void {
        const { title } = this.meta
        const meta = this.meta.description
        const browser = this.getBrowser(this)
        const { shareImage } = this.meta

        if (this.vueEnv) {
            if (title) {
                this.$ssrContext.title = `${title}`
            }
            if (meta) {
                this.$ssrContext.meta = `${meta}`
            }
            if (browser) {
                this.$ssrContext.browser = `${browser}`
            }

            if (shareImage) {
                this.$ssrContext.shareImage = `${shareImage}`
            }
        } else {
            const titleElement = document.querySelector('meta[property="og:title"]') as HTMLMetaElement
            const descriptionNameElement = document.querySelector('meta[name="description"]') as HTMLMetaElement
            const descriptionPropertyElement = document.querySelector('meta[property="og:description"]') as HTMLMetaElement
            const imageLinkElement = document.querySelector('link[rel="image_src"]') as HTMLMetaElement
            const imagePropertyElement = document.querySelector('meta[property="og:image"]') as HTMLMetaElement
            const imageTwitterElement = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement
            const imageTwitterSrcElement = document.querySelector('meta[name="twitter:image:src"]') as HTMLMetaElement
            const descriptionTwitterElement = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement

            if (document) {
                if (title && titleElement) {
                    document.title = `${title}`
                    titleElement.content = `${title}`
                }
                if (meta && descriptionNameElement && descriptionPropertyElement && descriptionTwitterElement) {
                    descriptionNameElement.content = `${meta}`
                    descriptionPropertyElement.content = `${meta}`
                }
                if (shareImage && imageLinkElement && imagePropertyElement && imageTwitterElement && imageTwitterSrcElement) {
                    imageLinkElement.content = `${shareImage}`
                    imagePropertyElement.content = `${shareImage}`
                    imageTwitterElement.content = `${shareImage}`
                    imageTwitterSrcElement.content = `${shareImage}`
                }
            }
        }
    }

    @Watch('$route')
    onChangeRoute(): void {
        this.setTitle()
    }

    mounted(): void {
        if (!this.vueEnv) {
            this.setTitle()
        }
    }

    created(): void {
        if (this.vueEnv) {
            this.setTitle()
        }
    }
}
