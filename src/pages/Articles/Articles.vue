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
    },
})
export default class Articles extends Vue {
    get articles() {
        return this.$store.getters?.['articles/list'] ?? []
    }

    async asyncData({ store }) {
        // await getArticles()
        try {
            await store.dispatch('articles/fetch')
        } catch (error) {
            console.log('fail article fetch')
            console.log('error', error)
        }
    }
}
</script>

<style lang="scss" src="./Articles.critical.scss" />
<!-- <style lang="scss" src="./Articles.main.scss" /> -->
