import { Story } from '@storybook/vue'

import ArticleCard, { type ArticleCardProps } from './ArticleCard.vue'

export default {
    title: 'undefined-path/ArticleCard',
    component: ArticleCard,
    argTypes: {},
}

const Template: Story<ArticleCardProps> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { ArticleCard },
    methods: {},
    template: `<ArticleCard v-bind="$props">ArticleCard</ArticleCard>`,
})

export const Default = Template.bind({})
Default.args = {
    //
}
