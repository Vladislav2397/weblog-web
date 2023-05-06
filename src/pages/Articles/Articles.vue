<template lang="pug">

.b-articles
    page-layout(
        title="Articles"
    )
        .__list
            article-card.__item(
                v-for="article in articles"
                :article="article"
            )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ArticleCard } from '@/entities/article/ui/ArticleCard'
import { PageLayout } from '@/widgets/ui/PageLayout'

export type ArticlesProps = {
    //
}

@Component({
    components: {
        'page-layout': PageLayout,
        'article-card': ArticleCard,
    },
})
export default class Articles extends Vue {
    get articles() {
        return this.$store.getters?.['articles/list'] ?? []
    }

    async asyncData({ store }) {
        try {
            await store.dispatch('articles/fetch')
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="scss" src="./Articles.critical.scss" />
<!-- <style lang="scss" src="./Articles.main.scss" /> -->
