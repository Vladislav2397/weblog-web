import { Story } from '@storybook/vue'

import PageLayout, { type PageLayoutProps } from './PageLayout.vue'

export default {
    title: 'undefined-path/PageLayout',
    component: PageLayout,
    argTypes: {},
}

const Template: Story<PageLayoutProps> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { PageLayout },
    methods: {},
    template: `<PageLayout v-bind="$props">PageLayout</PageLayout>`,
})

export const Default = Template.bind({})
Default.args = {
    //
}
