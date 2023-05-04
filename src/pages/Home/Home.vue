<template lang="pug">

.home-page
    page-layout(
        title="WebLog"
    )
        p Тестовый сайт статьи созданный для выражения знаний и умений на деле

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
