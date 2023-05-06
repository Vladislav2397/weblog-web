<template lang="pug">

.b-article
    page-layout(
        v-if="article"
        :title="article.title"
        size="s"
    )
        .__image
            img(
                :src="article.image.src"
                :alt="article.image.alt"
                :width="imageSize[0]"
                :height="imageSize[1]"
            )
        .__description {{ article.description }}
        .__content.text(
            v-html="article.content"
        )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line import/no-extraneous-dependencies
import MarkdownIt from 'markdown-it'
import { PageLayout } from '@/widgets/ui/PageLayout'

export type ArticleProps = {
    //
}

@Component({
    components: {
        'page-layout': PageLayout,
    },
})
export default class Article extends Vue {
    get activeArticle() {
        return this.$store.getters?.['articles/active']
    }

    get imageSize() {
        if (this.$device.size.maxMobile) return ['320', '240']
        return ['650', '420']
    }

    get content() {
        const article = this.activeArticle

        if (!article) return ''

        return article.content.trim().replace(/\n\s+/g, '\n')
    }

    get article() {
        const article = this.activeArticle

        if (!article) return

        const md = new MarkdownIt()

        return {
            ...article,
            content: md.render(this.content),
        }
    }

    async asyncData({ route, store }) {
        const { id } = route.params

        await store.dispatch('articles/fetchItem', id)
    }
}
</script>

<style lang="scss" src="./Article.critical.scss" />
<!-- <style lang="scss" src="./Article.main.scss" /> -->
