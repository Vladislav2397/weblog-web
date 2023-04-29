<template lang="pug">

.b-article
    .__container
        h2 Article
        .__title {{ article.title }}
        .__description {{ article.description }}
        .__content(
            v-html="article.content"
        )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export type ArticleProps = {
    //
}

@Component
export default class Article extends Vue {
    get article() {
        return {
            title: 'title',
            description: 'description',
            content: '<p>Content</p>',
        }
    }
}
</script>

<!-- <style lang="scss" src="./Article.critical.scss" /> -->
<!-- <style lang="scss" src="./Article.main.scss" /> -->
