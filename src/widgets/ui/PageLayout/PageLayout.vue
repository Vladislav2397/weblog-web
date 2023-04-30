<template lang="pug">

.b-page-layout
    .__container
        h2.__title {{ title }}
        slot

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export type PageLayoutProps = {
    //
}

@Component
export default class PageLayout extends Vue {
    @Prop() readonly title!: string
}
</script>

<style lang="scss" src="./PageLayout.critical.scss" />
<!-- <style lang="scss" src="./PageLayout.main.scss" /> -->
