<template lang="pug">

.b-articles
    .__container
        h2.__title Articles
        .__list
            article-card.__item(
                v-for="article in articles"
                :article="article"
            )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ArticleCard } from '@/entities/article/ui/ArticleCard'
// import { getArticles } from '@/shared/api'

export type ArticlesProps = {
    //
}

@Component({
    components: {
        'article-card': ArticleCard,
    }
})
export default class Articles extends Vue {
    async fetchArticles() {
        await this.$store.dispatch('articles/fetch')
    }

    get articles() {
        return this.$store.getters?.['articles/list'] ?? []
    }

    beforeMount() {
        if (this.articles.length) return

        this.fetchArticles()
    }

    async serverPrefetch() {
        // @ts-ignore
        await this.fetchArticles()
    }
}
</script>

<style lang="scss" src="./Articles.critical.scss" />
<!-- <style lang="scss" src="./Articles.main.scss" /> -->
