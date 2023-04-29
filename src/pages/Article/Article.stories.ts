import { Story } from '@storybook/vue'

import Article, { type ArticleProps } from './Article.vue'

export default {
    title: 'undefined-path/Article',
    component: Article,
    argTypes: {},
}

const Template: Story<ArticleProps> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Article },
    methods: {},
    template: `<Article v-bind="$props">Article</Article>`,
})

export const Default = Template.bind({})
Default.args = {
    //
}
