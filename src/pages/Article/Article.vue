<template lang="pug">

.b-article
    page-layout(
        v-if="article"
        :title="article.title"
    )
        .__image
            img(
                :src="article.image.src"
                :alt="article.image.alt"
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
    },
})
export default class Article extends Vue {
    get article() {
        return this.$store.getters?.['articles/active']
    }

    async asyncData({ route, store }) {
        console.log('Article.vue call async data')
        const { id } = route.params

        await store.dispatch('articles/fetchItem', id)
    }
}
</script>

<style lang="scss" src="./Article.critical.scss" />
<!-- <style lang="scss" src="./Article.main.scss" /> -->
