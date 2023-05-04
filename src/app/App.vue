<template lang="pug">

#app
    the-header
    router-view

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TheHeader } from '@/widgets/ui/TheHeader'

@Component({
    components: {
        'the-header': TheHeader,
    },
})
export default class Root extends Vue {
    //
}
</script>

<style lang="scss">
@import './styles/utility/reset.scss';

html {
    font-family: sans-serif;
}

a,
a:visited {
    color: #000;
    font-size: 16px;
    line-height: 20px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
}

h2 {
    font-size: 20px;
    font-weight: bold;
}
</style>
