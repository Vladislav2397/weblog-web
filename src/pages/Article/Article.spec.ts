import { shallowMount } from '@vue/test-utils'
import Article from './Article.vue'

describe('Article spec', () => {
    it('Snapshot', () => {
        const wrapper = shallowMount(Article)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
