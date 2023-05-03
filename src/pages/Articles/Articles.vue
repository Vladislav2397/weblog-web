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
        console.log('Articles.vue calling async data')

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
