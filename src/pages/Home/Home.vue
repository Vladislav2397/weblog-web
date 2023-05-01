<template lang="pug">

.home-page
    page-layout(
        title="Home page"
    )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PageLayout } from '@/widgets/ui/PageLayout'

@Component({
    components: {
        'page-layout': PageLayout,
    },
})
export default class Home extends Vue {
    //
}
</script>
