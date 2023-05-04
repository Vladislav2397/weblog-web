<template lang="pug">

.b-page-layout
    .__container(
        :class="`page-layout__container--size-${size}`"
    )
        h2.__title {{ title }}
        slot

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import type { PartialPick } from '@/globals'

export type PageLayoutProps = Pick<PageLayout, 'title'> &
    PartialPick<PageLayout, 'size'>

@Component
export default class PageLayout extends Vue {
    @Prop() readonly title!: string
    @Prop({ default: 'm' }) readonly size!: 's' | 'm'
}
</script>

<style lang="scss" src="./PageLayout.critical.scss" />
<!-- <style lang="scss" src="./PageLayout.main.scss" /> -->
