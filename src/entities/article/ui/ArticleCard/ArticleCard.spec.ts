import { shallowMount } from '@vue/test-utils'
import ArticleCard from './ArticleCard.vue'

describe('ArticleCard spec', () => {
    it('Snapshot', () => {
        const wrapper = shallowMount(ArticleCard)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
