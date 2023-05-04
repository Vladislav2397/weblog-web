<template lang="pug">

.b-the-header
    router-link.__logo(
        to="/"
    ) WebLog
    .__links
        router-link.__item(
            tag="a"
            to="/articles"
        ) Blog

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export type TheHeaderProps = {
    //
}

@Component
export default class TheHeader extends Vue {
    //
}
</script>

<style lang="scss" src="./TheHeader.critical.scss" />
<!-- <style lang="scss" src="./TheHeader.main.scss" /> -->
