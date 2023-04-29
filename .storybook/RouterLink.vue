<template lang="pug">
    a(
        :href="to"
    )
        slot

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RouterLink extends Vue {
    @Prop() readonly to!: string
}
</script>
