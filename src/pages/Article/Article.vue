<template lang="pug">

.b-article
    page-layout(
        v-if="article"
        :title="article.title"
    )
        .__description {{ article.description }}
        .__content.text(
            v-html="article.content"
        )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PageLayout } from '@/widgets/ui/PageLayout'

export type ArticleProps = {
    //
}

@Component({
    components: {
        'page-layout': PageLayout,
    }
})
export default class Article extends Vue {
    // get article() {
    //     return {
    //         title: 'Article title',
    //         description: 'description',
    //         content: '<p>Content</p>',
    //     }
    // }

    async fetchArticle() {
        await this.$store.dispatch('articles/fetchItem', this.$route.params.id)
    }

    get article() {
        return this.$store.getters?.['articles/active']
    }

    beforeMount() {
        if (this.article) return

        this.fetchArticle()
    }

    async serverPrefetch() {
        await this.fetchArticle()
    }
}
</script>

<!-- <style lang="scss" src="./Article.critical.scss" /> -->
<!-- <style lang="scss" src="./Article.main.scss" /> -->
