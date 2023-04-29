<template lang="pug">

.b-not-found
    h2 Not found

</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'

@Component
export default class NotFoundPage extends Vue {
    @Inject('$device') $device!: any

    get buttonProps() {
        return {
            size: this.$device.size.maxMobile ? 'm' : 'l',
        }
    }

    created() {
        // console.log('notFoundPage')
    }

    onClick() {
        // this.$router.push({ name: 'main' })
    }
}
</script>
