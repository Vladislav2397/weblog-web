import { Story } from '@storybook/vue'

import TheHeader, { type TheHeaderProps } from './TheHeader.vue'

export default {
    title: 'undefined-path/TheHeader',
    component: TheHeader,
    argTypes: {},
}

const Template: Story<TheHeaderProps> = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { TheHeader },
    methods: {},
    template: `<TheHeader v-bind="$props">TheHeader</TheHeader>`,
})

export const Default = Template.bind({})
Default.args = {
    //
}
